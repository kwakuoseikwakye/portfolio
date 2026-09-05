import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Contact, FileDown, Image as ImageIcon, Wallet } from "lucide-react";
import { profile } from "@/lib/content";
import { DotField } from "../interactive";
import { Divider, SectionHead, Shell, SiteFooter } from "../shell";
import { CardBack, CardFrame, CardFront } from "./card";

const description =
  "A two-sided business card — download it as an image, a print-ready PDF, a contact file, or add it to Apple Wallet.";

export const metadata: Metadata = {
  title: `Business card — ${profile.name}`,
  description,
  alternates: { canonical: "/card" },
  openGraph: {
    type: "website",
    url: "/card",
    title: `Business card — ${profile.name}`,
    description,
  },
};

/* The Wallet pass only exists once it has been signed with an Apple Pass Type
   ID certificate (see scripts/build-pass.mjs). Checked at build time so the
   button never links at a file that isn't there. */
const passPath = join(process.cwd(), "public", "card", "kwaku-osei-kwakye.pkpass");
const hasPass = existsSync(passPath);

const downloads = [
  {
    href: "/card/card-front.png",
    label: "Front",
    hint: "PNG · 1004×650 · 300 dpi",
    Icon: ImageIcon,
  },
  {
    href: "/card/card-back.png",
    label: "Back",
    hint: "PNG · 1004×650 · 300 dpi",
    Icon: ImageIcon,
  },
  {
    href: "/card/kwaku-osei-kwakye-card.pdf",
    label: "Print PDF",
    hint: "85×55 mm · both sides",
    Icon: FileDown,
  },
  {
    href: "/card/kwaku-osei-kwakye.vcf",
    label: "Contact",
    hint: "vCard · photo included",
    Icon: Contact,
  },
];

const sharing = [
  {
    title: "Send it to someone",
    body: "Download the contact file and AirDrop or message it. It arrives with the portrait attached, so it lands as a face rather than a grey silhouette — on iPhone, Android and Outlook alike.",
  },
  {
    title: "NameDrop — hold two iPhones together",
    body: "NameDrop only ever shares your own Contacts “My Card”, and Apple gives apps and websites no way to trigger it. To make it send this identity: open the contact file on your iPhone, save it, then go to Settings → Contacts → My Info and pick it. After that the gesture shares this card, photo and all.",
  },
  {
    title: "Tap-to-share on a physical card",
    body: "For the actual tap gesture with someone who is not on an iPhone, an NFC tag programmed with the site URL is the way — every iPhone since the XS reads them with no app open. That is a sticker or a card, not something the site can do on its own.",
  },
];

export default function CardPage() {
  return (
    <Shell>
      <main>
        <div className="screen-line-bottom h-24 w-full sm:h-32" aria-hidden>
          <DotField />
        </div>

        <SectionHead
          id="card"
          title="Business card"
          aside={
            <span className="font-mono text-[11px] text-muted-foreground">
              85 × 55 mm
            </span>
          }
        />
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <Divider />

        {/* A tinted surface so the pale back face still reads as an object. */}
        <div className="flex flex-wrap items-start justify-center gap-8 bg-muted px-4 py-8 sm:px-6 sm:py-10">
          <CardFrame label="Front">
            <CardFront />
          </CardFrame>
          <CardFrame label="Back">
            <CardBack />
          </CardFrame>
        </div>

        <Divider />

        <SectionHead id="download" title="Download" />
        <ul className="grid grid-cols-2 gap-2 px-4 py-5 sm:px-5 md:grid-cols-4">
          {downloads.map(({ href, label, hint, Icon }) => (
            <li key={href} className="flex min-w-0">
              <a
                href={href}
                download
                data-ui-feedback="tap"
                className="flex w-full flex-col gap-1 rounded-md border border-border bg-background p-3 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {label}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {hint}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Divider />

        <SectionHead id="sharing" title="Sharing" />
        <ul className="pt-px">
          {sharing.map((s) => (
            <li key={s.title} className="screen-line-bottom relative last:after:hidden">
              <div className="flex gap-3 p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-700 dark:bg-neutral-300"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="text-balance text-base font-medium leading-snug">
                    {s.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Divider />

        <SectionHead id="wallet" title="Apple Wallet" />
        <div className="px-4 py-5 sm:px-6">
          {hasPass ? (
            <>
              <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                On an iPhone or iPad, open this on Safari and tap to add the card
                to Wallet.
              </p>
              <a
                href="/card/kwaku-osei-kwakye.pkpass"
                data-ui-feedback="tap"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Wallet className="size-4" aria-hidden />
                Add to Apple Wallet
              </a>
            </>
          ) : (
            <div className="max-w-2xl rounded-md border border-border bg-muted p-4">
              <p className="text-sm font-medium">Not signed yet</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Apple requires every <code className="font-mono">.pkpass</code>{" "}
                to be signed with a Pass Type ID certificate from the Apple
                Developer Program — it cannot be generated in the browser or from
                an unsigned build. The pass is fully built and ready in{" "}
                <code className="font-mono">scripts/build-pass.mjs</code>; add the
                certificate and this section turns into a working button.
              </p>
            </div>
          )}
        </div>

        <div className="screen-line-top screen-line-bottom relative mt-1 flex w-full items-center justify-center gap-2 px-4 py-2">
          <Link
            href="/"
            data-ui-feedback="tap"
            className="inline-flex h-8 items-center gap-2 rounded-md bg-foreground px-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </Shell>
  );
}
