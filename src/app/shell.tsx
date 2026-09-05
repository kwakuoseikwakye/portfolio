import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { profile, type Project } from "@/lib/content";
import {
  CommandMenu,
  Controls,
  Cursor,
  MobileNav,
  SearchTrigger,
  type CommandItem,
} from "./interactive";

const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Card", href: "/card" },
  { label: "Contact", href: `mailto:${profile.email}` },
];

const COMMANDS: CommandItem[] = [
  { group: "Pages", label: "Home", href: "/" },
  { group: "Pages", label: "All projects", href: "/projects" },
  { group: "Pages", label: "Business card", href: "/card" },
  { group: "Links", label: "Save contact (vCard)", href: "/card/kwaku-osei-kwakye.vcf" },
  // "/#id" so these still work from /projects, where the section is absent.
  { group: "Sections", label: "About", href: "/#about" },
  { group: "Sections", label: "Connect", href: "/#connect" },
  { group: "Sections", label: "Experience", href: "/#experience" },
  { group: "Sections", label: "Activity", href: "/#activity" },
  { group: "Sections", label: "Projects", href: "/#projects" },
  { group: "Sections", label: "Skills", href: "/#skills" },
  { group: "Sections", label: "Achievements", href: "/#achievements" },
  { group: "Links", label: "GitHub", href: profile.github, external: true },
  { group: "Links", label: "LinkedIn", href: profile.linkedin, external: true },
  { group: "Links", label: "Résumé", href: profile.resume, external: true },
  { group: "Links", label: "Email", href: `mailto:${profile.email}` },
  { group: "Settings", label: "Toggle theme", action: "theme" },
  { group: "Settings", label: "Toggle interface sound", action: "sound" },
];

/** Centred 715px column with the edge rules, sticky header and bottom fade. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Cursor />
      <CommandMenu items={COMMANDS} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <SiteHeader />

      {/* Mobile: search lives in a floating pill above the thumb. */}
      <div className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit md:hidden">
        <SearchTrigger className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background/90 px-4 text-sm shadow-lg backdrop-blur">
          <Search className="size-4" aria-hidden />
          <span>Search</span>
        </SearchTrigger>
      </div>

      <div className="mx-auto w-full px-4 md:max-w-[715px] md:px-0">
        <div className="relative">
          {/* The visible column rules: 24px strips parked outside the column. */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0 z-0 hidden border-r border-border md:-left-6 md:block md:w-6 dark:opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0 z-0 hidden border-l border-border md:-right-6 md:block md:w-6 dark:opacity-60"
          />
          {/* tabIndex -1 so the skip link can actually move focus here. */}
          <div id="main" tabIndex={-1} className="relative z-10 outline-none">
            {children}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-10 select-none bg-gradient-to-t from-background to-transparent backdrop-blur-[5px] [mask-image:linear-gradient(to_top,black_10%,transparent)] dark:[mask-image:linear-gradient(to_top,black_20%,transparent)]"
      />
    </div>
  );
}

function SiteHeader() {
  return (
    <div className="sticky top-0 isolate z-50 w-full bg-background pt-1">
      <div className="mx-auto w-full px-4 md:max-w-[715px] md:px-0">
        <div className="screen-line-top screen-line-bottom relative mt-1 flex w-full items-center justify-between gap-2 px-4 py-1.5">
          <Link href="/" className="rounded-sm">
            <span className="font-pixel text-2xl uppercase leading-none tracking-wide">
              {profile.initials}
            </span>
            <span className="sr-only">— home</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-sm text-sm font-light underline-offset-[5px] hover:underline"
                >
                  {l.label}
                </Link>
              ))}
              <SearchTrigger className="inline-flex h-7 items-center gap-2 rounded-full border border-border bg-background px-2.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground">
                <Search className="size-3.5" aria-hidden />
                <span>Search</span>
                <kbd className="rounded bg-muted px-1 py-px font-mono text-[10px] leading-4 text-muted-foreground">
                  ⌘K
                </kbd>
              </SearchTrigger>
            </nav>

            <span aria-hidden className="hidden h-4 w-px bg-border md:block" />
            <Controls />
            <div className="border-l border-border pl-1 md:hidden">
              <MobileNav links={NAV} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Divider() {
  return <div aria-hidden className="h-px w-full shrink-0 bg-border" />;
}

export function SectionHead({
  id,
  title,
  aside,
}: {
  id: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="screen-line-bottom relative flex w-full items-center justify-between gap-4 px-4 py-1">
      <h2
        id={id}
        className="scroll-mt-20 text-xl font-normal tracking-tight sm:text-2xl"
      >
        {title}
      </h2>
      {aside}
    </div>
  );
}

const pillBase =
  "inline-flex items-center rounded-md border border-border bg-background text-foreground font-medium whitespace-nowrap transition-colors select-none hover:border-neutral-400 dark:hover:border-neutral-600";

export function ProjectCard({
  project,
  index,
  clampDescription = true,
}: {
  project: Project;
  index: number;
  clampDescription?: boolean;
}) {
  const primary = project.url ?? project.repo;

  return (
    <div className="relative flex flex-col p-4">
      <div className="group/card relative flex flex-1 flex-col gap-2">
        <Media project={project} index={index} href={primary} />

        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate text-[15px] font-semibold leading-snug">
            {primary ? (
              <a
                href={primary}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm transition-colors hover:text-muted-foreground"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-ui-feedback="tap"
                className={`${pillBase} gap-1 px-1.5 py-0.5 text-xs`}
              >
                Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-ui-feedback="tap"
                className={`${pillBase} gap-1 px-1.5 py-0.5 text-xs`}
              >
                Code
              </a>
            )}
          </div>
        </div>

        <p
          className={`text-[13px] text-muted-foreground ${
            clampDescription ? "truncate leading-snug" : "leading-relaxed"
          }`}
        >
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li key={t} className="flex">
              <span className={`${pillBase} gap-1 px-1.5 py-0.5 text-[11px]`}>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Screenshot when there is a public site to shoot; otherwise a cover built
   from the site's own dot grid so the grid never shows an empty frame. */
function Media({
  project,
  index,
  href,
}: {
  project: Project;
  index: number;
  href?: string;
}) {
  const frame =
    "group/media block overflow-hidden rounded-md border border-border";

  const inner = project.image ? (
    <Image
      src={project.image}
      alt={`${project.title} screenshot`}
      width={1200}
      height={630}
      className="h-44 w-full object-cover object-top transition-transform duration-500 ease-out group-hover/media:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/media:scale-100 sm:h-48"
    />
  ) : (
    <div className="dot-band flex h-44 w-full flex-col justify-between bg-muted p-4 sm:h-48">
      <span className="font-mono text-[11px] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-pixel text-xl uppercase leading-none tracking-wide text-foreground/70">
        {project.title}
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={frame}>
      {inner}
    </a>
  ) : (
    <div className={frame}>{inner}</div>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Divider />
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-center text-sm text-foreground/70">
          Designed and developed by{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-semibold text-foreground/90"
          >
            {profile.name}
          </a>
          <br />© {new Date().getFullYear()}. Built in the open.
        </p>
      </div>
      <Divider />
      <div className="screen-line-bottom relative w-full py-2">
        <div
          aria-hidden
          className="dot-band flex h-28 min-h-20 w-full items-center justify-center px-1.5 sm:h-32"
        />
      </div>
    </footer>
  );
}
