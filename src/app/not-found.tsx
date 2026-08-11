import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="wrap flex min-h-screen flex-col justify-center py-24">
      <p className="label">Error 404</p>
      <h1 className="display mt-6">Not found.</h1>
      <p className="mt-8 max-w-md leading-relaxed text-muted">
        That page doesn&apos;t exist. It either moved or never shipped.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 w-fit items-center rounded-[4px] border border-line-strong px-5 text-sm font-medium transition-colors hover:border-foreground"
      >
        Back to home
      </Link>
    </main>
  );
}
