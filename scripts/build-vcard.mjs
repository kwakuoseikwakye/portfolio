/**
 * Builds the contact file with the portrait embedded.
 *
 *   node scripts/build-vcard.mjs
 *
 * The photo matters more than it looks: NameDrop and Contact Posters share
 * whatever is on your Contacts "My Card", so a vCard carrying the portrait is
 * what makes the hand-over look like the printed card. A bare text vCard
 * imports as a grey silhouette.
 *
 * vCard 3.0 rather than 4.0 — iOS, Android and Outlook all read 3.0, and 4.0
 * buys nothing here. Lines are folded to 75 octets per RFC 2426; unfolded
 * base64 is the single most common reason a vCard photo silently fails.
 */
import { writeFile } from "node:fs/promises";
import { avatar } from "./portrait.mjs";

const OUT = "public/card/kwaku-osei-kwakye.vcf";

// Same avatar the Wallet pass uses — see scripts/portrait.mjs.
const photo = await avatar(500).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

const fields = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Kwakye;Kwaku Osei;;;",
  "FN:Kwaku Osei Kwakye",
  "TITLE:Software / AI Engineer",
  "ROLE:Software / AI Engineer",
  "ORG:Kirirom Digital",
  "EMAIL;type=INTERNET;type=WORK;type=pref:kwakuoseikwakye@gmail.com",
  "URL;type=WORK;type=pref:https://kwakuoseikwakye.github.io",
  "URL;type=WORK:https://github.com/kwakuoseikwakye",
  "URL;type=WORK:https://linkedin.com/in/kwakuoseikwakye",
  "ADR;type=WORK:;;;Takamatsu;;;Japan",
  "NOTE:Builds automation services, AI and agent workflows, dashboards and the APIs behind them. Open to new work.",
  `PHOTO;ENCODING=b;TYPE=JPEG:${photo.toString("base64")}`,
  "END:VCARD",
];

/** RFC 2426 folding: 75 octets per line, continuations start with one space. */
function fold(line) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out = [bytes.subarray(0, 75).toString("utf8")];
  for (let i = 75; i < bytes.length; i += 74) {
    out.push(" " + bytes.subarray(i, i + 74).toString("utf8"));
  }
  return out.join("\r\n");
}

// CRLF throughout — some parsers (Outlook especially) reject bare LF.
const vcf = fields.map(fold).join("\r\n") + "\r\n";
await writeFile(OUT, vcf, "utf8");

console.log(
  `${OUT} — ${Math.round(Buffer.byteLength(vcf) / 1024)}KB, ` +
    `photo ${Math.round(photo.length / 1024)}KB embedded, ` +
    `${vcf.split("\r\n").length - 1} folded lines`,
);
