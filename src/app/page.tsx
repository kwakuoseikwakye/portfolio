import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
  Video,
} from "lucide-react";
import {
  about,
  connect,
  duration,
  education,
  experience,
  featuredProjects,
  focus,
  formatMonth,
  outcomes,
  profile,
  projects,
  skills,
  taglines,
} from "@/lib/content";
import { logos } from "@/lib/logos";
import { getContributions, type Contributions } from "@/lib/github";
import { Avatar, DotField, MagneticCTA, RotatingRole } from "./interactive";
import {
  Divider,
  ProjectCard,
  SectionHead,
  Shell,
  SiteFooter,
} from "./shell";

const connectIcons = {
  file: FileText,
  send: Send,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export default async function Home() {
  const contributions = await getContributions(profile.githubUser);
  const now = new Date();

  return (
    <Shell>
      <main>
        <div className="screen-line-bottom h-24 w-full sm:h-32" aria-hidden>
          <DotField />
        </div>

        <Hero now={now} />
        <Divider />
        <About />
        <Divider />
        <Connect />
        <Divider />
        <Experience now={now} />
        <Divider />
        <Activity data={contributions} />
        <Divider />
        <Work />
        <Divider />
        <Skills />
        <Divider />
        <Achievements />
        <Focus />
      </main>
      <SiteFooter />
    </Shell>
  );
}

function Hero({ now }: { now: Date }) {
  const since = duration(experience[0].start, null, now);

  return (
    <header className="flex w-full items-start">
      <div className="p-3 sm:p-4">
        <Avatar
          photo={profile.photo}
          photoAlt={profile.photoAlt}
          name={profile.name}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0 pt-3 sm:pt-4">
        <h1 className="text-xl font-medium text-neutral-700 md:text-2xl dark:text-neutral-50">
          {profile.name}
        </h1>
        <p className="flex min-h-6 items-center text-sm font-medium text-neutral-500/80 md:text-base dark:text-neutral-400">
          <RotatingRole roles={taglines} />
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${profile.email}?subject=Intro%20call`}
            data-ui-feedback="tap"
            className="btn-solid"
          >
            <Video
              className="size-3.5 shrink-0 text-yellow-400 dark:text-yellow-600"
              aria-hidden
            />
            Book a call
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-ui-feedback="tap"
            className="btn-solid"
          >
            <Mail className="size-3.5 shrink-0" aria-hidden />
            Send an email
          </a>
        </div>
        <p className="sr-only">
          {profile.role} in {profile.location}. {since} at{" "}
          {experience[0].company}.
        </p>
      </div>
    </header>
  );
}

/** Renders `**bold**` runs the way the reference emphasises stack names. */
function Emphasise({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <b
            key={i}
            className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100"
          >
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}

function About() {
  return (
    <section aria-labelledby="about">
      <SectionHead id="about" title="About" />
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <ul className="list-disc space-y-2.5 pl-4 text-base font-normal leading-relaxed text-neutral-800 dark:text-neutral-300">
          {about.map((line) => (
            <li key={line}>
              <Emphasise text={line} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section aria-labelledby="connect">
      <SectionHead id="connect" title="Connect" />
      <ul className="connect-grid grid grid-cols-3 gap-2 px-4 py-5 sm:px-5 md:grid-cols-5">
        {connect.map((c) => {
          const Icon = connectIcons[c.icon as keyof typeof connectIcons];
          const external = c.href.startsWith("http");
          return (
            <li key={c.label} className="flex min-w-0">
              <a
                href={c.href}
                data-ui-feedback="tap"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="btn-solid w-full"
              >
                <Icon className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Experience({ now }: { now: Date }) {
  return (
    <section aria-labelledby="experience">
      <SectionHead id="experience" title="Experience" />
      <ul className="space-y-5 px-4 py-5 sm:px-6">
        {experience.map((job) => (
          <li key={job.company} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 select-none items-center justify-center">
              {job.logo ? (
                <Image
                  src={job.logo}
                  alt=""
                  width={80}
                  height={80}
                  className="size-10 rounded-[10px] border border-border object-contain"
                />
              ) : (
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-[10px] border border-border bg-muted font-mono text-[11px] text-muted-foreground"
                >
                  {job.company
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="min-w-0 truncate text-[15px] font-semibold leading-snug text-foreground">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline rounded-sm"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {formatMonth(job.start)} -{" "}
                  {job.end ? formatMonth(job.end) : "Present"}
                </p>
              </div>
              <p className="truncate text-[13px] leading-snug text-muted-foreground">
                {job.role} <span aria-hidden>•</span> {job.location} -{" "}
                {duration(job.start, job.end, now)}
              </p>
            </div>
          </li>
        ))}
        <li className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-muted font-mono text-[11px] text-muted-foreground"
          >
            BSc
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="min-w-0 truncate text-[15px] font-semibold leading-snug">
                {education.school}
              </h3>
              <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {education.period.replace(" to ", " - ")}
              </p>
            </div>
            <p className="truncate text-[13px] leading-snug text-muted-foreground">
              {education.degree}
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}

function Activity({ data }: { data: Contributions }) {
  const cols = data.weeks.length;

  return (
    <section aria-labelledby="activity">
      <SectionHead id="activity" title="Activity" />
      <div className="relative px-4 py-5">
        <div className="overflow-x-auto pb-1">
          <div style={{ minWidth: cols * 13 - 3 }}>
            <div
              aria-hidden
              className="mb-1 grid gap-[3px] font-mono text-[10px] text-muted-foreground"
              style={{ gridTemplateColumns: `repeat(${cols}, 10px)` }}
            >
              {data.months.map((m) => (
                <span
                  key={m.label + m.col}
                  style={{ gridColumnStart: m.col + 1 }}
                  className="whitespace-nowrap"
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div
              className="grid grid-flow-col gap-[3px]"
              style={{ gridTemplateRows: "repeat(7, 10px)" }}
              role="img"
              aria-label={
                data.real
                  ? `${data.total ?? "Some"} contributions in the last year`
                  : "Decorative activity grid"
              }
            >
              {data.weeks.flatMap((week, w) =>
                week.map((day, d) => (
                  <span
                    key={`${w}-${d}`}
                    title={day ? `${day.date}` : undefined}
                    className="size-2.5 rounded-[2px]"
                    style={{
                      background: day
                        ? `var(--contrib-${day.level})`
                        : "transparent",
                    }}
                  />
                )),
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
          <span>
            {data.real && data.total
              ? `${data.total.toLocaleString()} contributions in ${data.range}`
              : "Commits, most weeks"}
          </span>
          <span className="flex items-center gap-1.5">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className="size-2.5 rounded-[2px]"
                style={{ background: `var(--contrib-${l})` }}
              />
            ))}
            More
          </span>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section aria-labelledby="projects">
      <SectionHead
        id="projects"
        title="Projects"
        aside={
          <span className="font-mono text-[11px] text-muted-foreground">
            {featuredProjects.length} of {projects.length}
          </span>
        }
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 hidden w-px bg-border sm:block"
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              className={`relative ${
                i < featuredProjects.length - 1 ? "max-sm:screen-line-bottom" : ""
              } ${
                i < featuredProjects.length - 2 ? "sm:screen-line-bottom" : ""
              }`}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
      <div className="screen-line-top screen-line-bottom relative mt-1 flex w-full items-center justify-center gap-2 px-4 py-2">
        <Link
          href="/projects"
          data-ui-feedback="tap"
          className="inline-flex h-8 items-center gap-2 rounded-md bg-foreground px-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          See all projects
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section aria-labelledby="skills">
      <SectionHead
        id="skills"
        title="Skills"
        aside={
          <span className="font-mono text-[11px] text-muted-foreground">
            {skills.length}
          </span>
        }
      />
      <ul className="flex flex-wrap gap-2 px-4 py-5 sm:px-5">
        {skills.map((skill) => {
          const logo = logos[skill];
          return (
            <li key={skill} className="flex">
              <span className="inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                {logo && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="size-3.5 shrink-0"
                    fill={logo.colour ?? "currentColor"}
                  >
                    <path d={logo.d} />
                  </svg>
                )}
                {skill}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Achievements() {
  return (
    <section aria-labelledby="achievements">
      <SectionHead id="achievements" title="Achievements" />
      <ul className="pt-px">
        {outcomes.map((o) => (
          <li key={o.title} className="screen-line-bottom relative last:after:hidden">
            <div className="flex gap-3 p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-700 dark:bg-neutral-300"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="min-w-0 text-balance text-base font-medium leading-snug">
                    {o.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                    {o.note}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {o.detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Focus() {
  const [top, left, right, bottom] = focus;
  const label =
    "absolute text-[10px] text-foreground/50 sm:text-xs md:text-sm";

  return (
    <div>
      <Divider />
      <section
        aria-label="Areas of focus"
        className="screen-line-top screen-line-bottom relative border-x border-border px-5 py-8"
      >
        <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg">
          <div className="relative aspect-square w-full">
            {[
              "left-1/2 top-0 -translate-x-1/2",
              "left-[2%] top-[22%]",
              "right-[2%] top-[22%]",
              "bottom-0 left-1/2 -translate-x-1/2",
            ].map((pos) => (
              <div
                key={pos}
                aria-hidden
                className={`absolute h-[55%] w-[55%] rounded-full border border-foreground/10 ${pos}`}
              />
            ))}

            <span
              className={`${label} left-1/2 top-[14%] max-w-[46%] -translate-x-1/2 -translate-y-1/2 text-balance text-center`}
            >
              {top}
            </span>
            <span
              className={`${label} left-[15%] top-1/2 max-w-[28%] -translate-x-1/2 -translate-y-1/2 text-balance text-center`}
            >
              {left}
            </span>
            <span
              className={`${label} right-[15%] top-1/2 max-w-[28%] -translate-y-1/2 translate-x-1/2 text-balance text-center`}
            >
              {right}
            </span>
            <span
              className={`${label} bottom-[14%] left-1/2 max-w-[46%] -translate-x-1/2 translate-y-1/2 text-balance text-center leading-tight`}
            >
              {bottom}
            </span>

            <Image
              src={profile.photo}
              alt=""
              aria-hidden
              width={160}
              height={160}
              className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-background object-cover shadow-md sm:size-16 sm:border-4 md:size-20"
            />
          </div>
        </div>

        <div
          id="contact"
          className="flex w-full flex-col items-center px-5 pb-0 pt-2 sm:px-10"
        >
          <p className="mb-5 text-balance text-center text-sm opacity-70 md:text-lg">
            Still reading? That means something clicked. Let&apos;s talk.
          </p>
          <MagneticCTA
            href={`mailto:${profile.email}?subject=Let%27s%20talk`}
            photo={profile.photo}
            label="Book a free call"
          />
        </div>
      </section>
    </div>
  );
}
