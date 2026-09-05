/**
 * Builds and signs the Apple Wallet business card (.pkpass).
 *
 *   PASS_TYPE_ID=pass.io.github.kwakuoseikwakye.card \
 *   PASS_TEAM_ID=ABCDE12345 \
 *   PASS_CERT_P12=secrets/pass.p12 \
 *   PASS_CERT_PASSWORD=... \
 *   PASS_WWDR_PEM=secrets/AppleWWDRCAG4.pem \
 *   node scripts/build-pass.mjs
 *
 * Apple will not open an unsigned pass, and the signature must be made with a
 * Pass Type ID certificate issued to your team — there is no way to produce a
 * working pass without one, from a browser or anywhere else. Without the env
 * vars this script builds the unsigned bundle and stops, so you can inspect
 * exactly what would be signed.
 *
 * Getting the inputs:
 *   1. developer.apple.com → Certificates, Identifiers & Profiles
 *   2. Identifiers → + → Pass Type IDs → create e.g.
 *      pass.io.github.kwakuoseikwakye.card
 *   3. Certificates → + → Pass Type ID Certificate → pick that identifier,
 *      upload a CSR from Keychain Access, download the .cer
 *   4. Import the .cer into Keychain, then export it *with* its private key
 *      as a .p12
 *   5. Download the "Worldwide Developer Relations" G4 intermediate from
 *      apple.com/certificateauthority and convert it:
 *      openssl x509 -inform DER -in AppleWWDRCAG4.cer -out AppleWWDRCAG4.pem
 *
 * Keep the .p12 out of git. In CI put it in an encrypted secret and write it
 * to disk in the workflow step that runs this script.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { avatar } from "./portrait.mjs";

const OUT = "public/card/kwaku-osei-kwakye.pkpass";
const SITE = "https://kwakuoseikwakye.github.io";
const EMAIL = "kwakuoseikwakye@gmail.com";

const {
  PASS_TYPE_ID = "pass.io.github.kwakuoseikwakye.card",
  PASS_TEAM_ID,
  PASS_CERT_P12,
  PASS_CERT_PASSWORD,
  PASS_WWDR_PEM,
} = process.env;

const work = mkdtempSync(join(tmpdir(), "pkpass-"));
const cleanup = () => rmSync(work, { recursive: true, force: true });

try {
  /* ---- pass.json ------------------------------------------------------- */
  const pass = {
    formatVersion: 1,
    passTypeIdentifier: PASS_TYPE_ID,
    teamIdentifier: PASS_TEAM_ID ?? "REPLACE_WITH_TEAM_ID",
    serialNumber: "kok-card-001",
    organizationName: "Kwaku Osei Kwakye",
    description: "Kwaku Osei Kwakye — business card",
    logoText: "Kwaku Osei Kwakye",
    foregroundColor: "rgb(250,250,250)",
    backgroundColor: "rgb(10,10,10)",
    labelColor: "rgb(140,140,140)",
    sharingProhibited: false,
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: SITE,
        messageEncoding: "iso-8859-1",
        altText: "kwakuoseikwakye.github.io",
      },
    ],
    associatedStoreIdentifiers: undefined,
    generic: {
      primaryFields: [
        { key: "role", label: "", value: "Software / AI Engineer" },
      ],
      secondaryFields: [
        { key: "based", label: "BASED IN", value: "Takamatsu, Japan" },
        {
          key: "status",
          label: "STATUS",
          value: "Open to new work",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        { key: "email", label: "EMAIL", value: EMAIL },
      ],
      backFields: [
        { key: "site", label: "Website", value: SITE },
        {
          key: "github",
          label: "GitHub",
          value: "https://github.com/kwakuoseikwakye",
        },
        {
          key: "linkedin",
          label: "LinkedIn",
          value: "https://linkedin.com/in/kwakuoseikwakye",
        },
        {
          key: "about",
          label: "About",
          value:
            "Builds automation services, AI and agent workflows, dashboards, and the APIs behind them. Seven years on the software companies run on internally.",
        },
      ],
    },
  };
  // Drop undefined keys — Apple rejects nulls in pass.json.
  writeFileSync(
    join(work, "pass.json"),
    JSON.stringify(pass, (_k, v) => (v === undefined ? undefined : v), 2),
  );

  /* ---- images ---------------------------------------------------------- */
  // Wallet wants @1x/@2x/@3x. Thumbnail is the portrait; icon and logo are the
  // pixel wordmark lifted straight off the printed card, so all three artefacts
  // stay visually identical.
  const front = "public/card/card-front.png";

  for (const [name, size] of [["thumbnail", 90], ["thumbnail@2x", 180], ["thumbnail@3x", 270]]) {
    await avatar(size).png().toFile(join(work, `${name}.png`));
  }

  // KOK wordmark region of the card front, on its black ground.
  const mark = sharp(front).extract({ left: 428, top: 40, width: 108, height: 56 });
  for (const [name, w, h] of [["logo", 108, 56], ["logo@2x", 216, 112], ["logo@3x", 324, 168]]) {
    await mark.clone().resize(w, h).png().toFile(join(work, `${name}.png`));
  }
  // Icon is square and renders as small as 29px on the lock screen, where a
  // cropped wordmark turns to mush — the face stays recognisable.
  for (const [name, size] of [["icon", 29], ["icon@2x", 58], ["icon@3x", 87]]) {
    await avatar(size).png().toFile(join(work, `${name}.png`));
  }

  /* ---- manifest -------------------------------------------------------- */
  const manifest = {};
  for (const f of readdirSync(work)) {
    if (f === "manifest.json" || f === "signature") continue;
    manifest[f] = createHash("sha1").update(readFileSync(join(work, f))).digest("hex");
  }
  writeFileSync(join(work, "manifest.json"), JSON.stringify(manifest, null, 2));

  /* ---- signature ------------------------------------------------------- */
  const canSign = PASS_TEAM_ID && PASS_CERT_P12 && PASS_CERT_PASSWORD && PASS_WWDR_PEM;
  if (!canSign) {
    const missing = Object.entries({
      PASS_TEAM_ID,
      PASS_CERT_P12,
      PASS_CERT_PASSWORD,
      PASS_WWDR_PEM,
    })
      .filter(([, v]) => !v)
      .map(([k]) => k);
    // Staged outside public/ so an unsigned bundle can never ship to the site.
    const staged = ".pass-build";
    rmSync(staged, { recursive: true, force: true });
    mkdirSync(staged, { recursive: true });
    for (const f of readdirSync(work)) copyFileSync(join(work, f), join(staged, f));
    console.log(
      `Built the unsigned bundle in ${staged}\n` +
        `Not signed — missing: ${missing.join(", ")}\n` +
        `Apple will refuse an unsigned .pkpass, so no ${OUT} was written.\n` +
        `See the header of this file for how to get a Pass Type ID certificate.`,
    );
    process.exit(0);
  }

  if (!existsSync(PASS_CERT_P12)) throw new Error(`PASS_CERT_P12 not found: ${PASS_CERT_P12}`);
  if (!existsSync(PASS_WWDR_PEM)) throw new Error(`PASS_WWDR_PEM not found: ${PASS_WWDR_PEM}`);

  const certPem = join(work, "_cert.pem");
  const keyPem = join(work, "_key.pem");

  /* Keychain exports .p12 with RC2/3DES, which OpenSSL 3 only reads with
     -legacy — but OpenSSL 1.x has no such flag. Try plain, then legacy. */
  const pkcs12 = (args) => {
    try {
      execFileSync("openssl", ["pkcs12", ...args], { stdio: "pipe" });
    } catch {
      execFileSync("openssl", ["pkcs12", "-legacy", ...args], { stdio: "pipe" });
    }
  };
  pkcs12(["-in", PASS_CERT_P12, "-clcerts", "-nokeys", "-out", certPem,
          "-passin", `pass:${PASS_CERT_PASSWORD}`]);
  pkcs12(["-in", PASS_CERT_P12, "-nocerts", "-nodes", "-out", keyPem,
          "-passin", `pass:${PASS_CERT_PASSWORD}`]);
  execFileSync("openssl", [
    "smime", "-binary", "-sign",
    "-certfile", PASS_WWDR_PEM,
    "-signer", certPem,
    "-inkey", keyPem,
    "-in", join(work, "manifest.json"),
    "-out", join(work, "signature"),
    "-outform", "DER", "-noattr",
  ]);
  rmSync(certPem, { force: true });
  rmSync(keyPem, { force: true });

  /* ---- zip ------------------------------------------------------------- */
  rmSync(OUT, { force: true });
  const entries = readdirSync(work);
  execFileSync("zip", ["-q", "-X", join(process.cwd(), OUT), ...entries], { cwd: work });
  rmSync(".pass-build", { recursive: true, force: true });

  console.log(`${OUT} — signed, ${entries.length} entries`);
} finally {
  cleanup();
}
