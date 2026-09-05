import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[715px] flex-col justify-center px-4 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-normal tracking-tight">Not found.</h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
        That page doesn&apos;t exist. It either moved or never shipped.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-9 w-fit items-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to home
      </Link>
    </main>
  );
}
