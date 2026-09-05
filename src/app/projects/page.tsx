import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile, projects } from "@/lib/content";
import { DotField } from "../interactive";
import { Divider, ProjectCard, SectionHead, Shell, SiteFooter } from "../shell";

const description =
  "Every project — automation services, AI pipelines, dashboards and the APIs behind them.";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: `Projects — ${profile.name}`,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <Shell>
      <main>
        <div className="screen-line-bottom h-24 w-full sm:h-32" aria-hidden>
          <DotField />
        </div>

        <SectionHead
          id="projects"
          title="Projects"
          aside={
            <span className="font-mono text-[11px] text-muted-foreground">
              {projects.length} total
            </span>
          }
        />
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <Divider />

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 hidden w-px bg-border sm:block"
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`relative ${
                  i < projects.length - 1 ? "max-sm:screen-line-bottom" : ""
                } ${i < projects.length - 2 ? "sm:screen-line-bottom" : ""}`}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  clampDescription={false}
                />
              </div>
            ))}
          </div>
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
