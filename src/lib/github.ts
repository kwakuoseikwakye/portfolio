/* Contribution grid, read once at build time (the site is a static export).
   GitHub's /contributions fragment needs no auth. If it is unreachable the
   build still succeeds — `real: false` renders a decorative grid instead. */

export type Day = { date: string; level: number };
export type Contributions = {
  real: boolean;
  total: number | null;
  range: string;
  weeks: (Day | null)[][];
  months: { label: string; col: number }[];
};

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  // Pad so row 0 is always Sunday, matching GitHub's grid.
  let week: (Day | null)[] = Array(new Date(days[0].date + "T00:00:00Z").getUTCDay()).fill(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  return weeks;
}

function monthLabels(weeks: (Day | null)[][]) {
  const months: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const first = week.find(Boolean);
    if (!first) return;
    const d = new Date(first.date + "T00:00:00Z");
    // Label a column only when its month starts inside it.
    if (d.getUTCDate() > 7) return;
    const label = MONTHS[d.getUTCMonth()];
    if (months.at(-1)?.label === label) return;
    months.push({ label, col });
  });
  return months;
}

function decorative(): Contributions {
  let seed = 42;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const start = new Date(Date.UTC(2025, 8, 1));
  const days: Day[] = Array.from({ length: 364 }, (_, i) => {
    const d = new Date(start.getTime() + i * 86400000);
    return {
      date: d.toISOString().slice(0, 10),
      level: rnd() > 0.52 ? Math.min(4, Math.floor(rnd() * 4) + 1) : 0,
    };
  });
  const weeks = toWeeks(days);
  return { real: false, total: null, range: "", weeks, months: monthLabels(weeks) };
}

export async function getContributions(user: string): Promise<Contributions> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { "user-agent": "Mozilla/5.0", accept: "text/html" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const days: Day[] = [
      ...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g),
    ].map((m) => ({ date: m[1], level: Number(m[2]) }));
    if (days.length < 300) throw new Error(`only ${days.length} days parsed`);
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Guard the match: a miss would make Number("") === 0, and 0 is finite,
    // so the page would confidently claim "0 contributions".
    const countMatch = html.match(/([\d,]+)\s*\n?\s*contributions/);
    const total = countMatch ? Number(countMatch[1].replace(/,/g, "")) : NaN;
    const y0 = days[0].date.slice(0, 4);
    const y1 = days.at(-1)!.date.slice(0, 4);

    const weeks = toWeeks(days);
    return {
      real: true,
      total: Number.isFinite(total) && total > 0 ? total : null,
      range: y0 === y1 ? y0 : `${y0}-${y1.slice(2)}`,
      weeks,
      months: monthLabels(weeks),
    };
  } catch (err) {
    console.warn(
      `[github] contribution fetch failed, using decorative grid:`,
      (err as Error).message,
    );
    return decorative();
  }
}
