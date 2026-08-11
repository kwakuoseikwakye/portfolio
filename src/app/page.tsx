import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  about,
  capabilities,
  education,
  experience,
  profile,
  projects,
  stats,
} from "@/lib/content";

const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex h-11 items-center font-mono text-sm tracking-[0.14em] text-foreground"
        >
          {profile.initials}
        </a>

        {/* h-11 on every link: the text is 20px tall, which is under the 24px
            minimum target size on touch. */}
        <nav className="flex items-center gap-x-5 text-[13px] text-muted sm:gap-x-7 sm:text-sm">
          <a
            href="#work"
            className="inline-flex h-11 items-center transition-colors hover:text-foreground"
          >
            Work
          </a>
          {/* Dropped on the narrowest phones so the row never wraps. */}
          <a
            href="#experience"
            className="hidden h-11 items-center transition-colors hover:text-foreground min-[400px]:inline-flex"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-[4px] border border-line-strong px-3 transition-colors hover:border-foreground hover:text-foreground"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="wrap pb-20 pt-32 md:pb-28 md:pt-44">
      <div className="grid gap-14 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <p className="rise label">
            {profile.role} · {profile.location}
          </p>

          <h1 className="rise display mt-6 [animation-delay:60ms]">
            Kwaku Osei
            <br />
            Kwakye
          </h1>

          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-muted [animation-delay:120ms]">
            {profile.lede}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3 [animation-delay:180ms]">
            <a
              href="#work"
              className="inline-flex h-11 items-center rounded-[4px] bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              View work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center rounded-[4px] border border-line-strong px-5 text-sm font-medium transition-colors hover:border-foreground"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="rise [animation-delay:240ms]">
          <Image
            src="/kwaku.webp"
            alt={`${profile.name}, ${profile.role}`}
            width={640}
            height={800}
            priority
            className="w-full max-w-[10rem] rounded-[4px] border border-line object-cover md:max-w-[17rem]"
          />
        </div>
      </div>

      <ul className="mt-20 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-10">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="font-mono text-4xl tracking-tight">
              {stat.value}
              <span className="text-accent">{stat.unit}</span>
            </p>
            <p className="mt-3 max-w-[17rem] text-sm leading-relaxed text-subtle">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap doc-grid">
        <h2 className="label md:pt-1.5">About</h2>

        <div>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-14 grid sm:grid-cols-2 sm:gap-x-12">
            {capabilities.map((capability) => (
              <div
                key={capability.label}
                className="border-t border-line py-5"
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                  {capability.label}
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-subtle">
                  {capability.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap doc-grid">
        <h2 className="label md:pt-1.5">Selected work</h2>

        <ul>
          {projects.map((project, index) => {
            const body = (
              <>
                <span className="font-mono text-xs text-subtle md:pt-2">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                    {project.title}
                    {project.url && (
                      <span className="ml-2 font-mono text-xs font-normal tracking-normal text-subtle">
                        {hostOf(project.url)}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p className="mt-4 font-mono text-xs text-subtle">
                    {project.tags.join("  ·  ")}
                  </p>
                </div>

                {project.url && (
                  <ArrowUpRight
                    aria-hidden
                    className="hidden h-5 w-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:mt-2 md:block"
                  />
                )}
              </>
            );

            const layout =
              "grid gap-3 py-8 md:grid-cols-[2.5rem_1fr_1.5rem] md:gap-6";

            return (
              <li
                key={project.title}
                className="group border-t border-line first:-mt-8 first:border-t-0"
              >
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={layout}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={layout}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap doc-grid">
        <h2 className="label md:pt-1.5">Experience</h2>

        <ol>
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-4 border-t border-line py-9 first:border-t-0 first:pt-0 md:grid-cols-[10rem_1fr] md:gap-10"
            >
              <div className="font-mono text-xs leading-relaxed">
                <p className="text-muted">{job.period}</p>
                <p className="text-subtle">{job.location}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium tracking-tight">
                  {job.role}
                  <span className="text-subtle"> at {job.company}</span>
                </h3>

                <ul className="mt-4 max-w-2xl space-y-3">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="relative pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line-strong"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          <li className="grid gap-4 border-t border-line py-9 md:grid-cols-[10rem_1fr] md:gap-10">
            <div className="font-mono text-xs leading-relaxed">
              <p className="text-muted">{education.period}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium tracking-tight">
                {education.degree}
                <span className="text-subtle"> at {education.school}</span>
              </h3>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap doc-grid">
        <h2 className="label md:pt-1.5">Contact</h2>

        <div>
          <p className="label flex items-center gap-2 text-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.available}
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block break-words font-medium leading-tight tracking-tight transition-colors hover:text-accent"
            style={{ fontSize: "clamp(1.15rem, 4.6vw, 2.5rem)" }}
          >
            {profile.email}
          </a>

          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            I&apos;m in Takamatsu. I&apos;ve worked remotely with teams in New
            York and Accra before, so a few time zones apart is fine by me.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="icon-link link-underline"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="icon-link link-underline"
            >
              LinkedIn
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="icon-link link-underline"
            >
              Résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-3 py-10 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p className="tracking-[0.14em] text-muted">{profile.initials}</p>
        <p>
          {profile.role} · {profile.location}
        </p>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
