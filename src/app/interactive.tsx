"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Moon, Plus, Search, Sun, Volume2, VolumeX } from "lucide-react";

/* Shared theme state — kept in sync via the <html> class, so every control
   (nav pill, command menu) reflects the same value. */
function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const read = () =>
      setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.theme = next ? "dark" : "light";
    } catch {}
  }, []);

  return [dark, toggle] as const;
}

/* ------------------------------------------------------------------ *
 * Liquid dot field — ambient sine drift + cursor repulsion on canvas.
 * ------------------------------------------------------------------ */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = 22;
    const mouse = { x: -999, y: -999 };
    let dots: {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    }[] = [];
    let raf = 0;

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = gap / 2; y < r.height; y += gap)
        for (let x = gap / 2; x < r.width; x += gap)
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
    };

    const ink = () => getComputedStyle(canvas).color;

    const frame = () => {
      const r = canvas.getBoundingClientRect();
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.fillStyle = ink();
      for (const d of dots) {
        const wave = Math.sin(d.ox * 0.03 + d.oy * 0.02 + t * 1.1) * 1.6;
        const tx = d.ox + wave;
        const ty = d.oy + wave * 0.6;

        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const push = (1 - dist / 120) * 3.2;
          d.vx += (dx / (dist || 1)) * push;
          d.vy += (dy / (dist || 1)) * push;
        }

        d.vx += (tx - d.x) * 0.06;
        d.vy += (ty - d.y) * 0.06;
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.fillStyle = ink();
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.ox, d.oy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    build();
    if (reduce) drawStatic();
    else raf = requestAnimationFrame(frame);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onOut = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) drawStatic();
    });
    ro.observe(canvas);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none block h-full w-full"
      style={{ color: "var(--dot)" }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Rotating job title — slides one line up, next line in.
 * ------------------------------------------------------------------ */
export function RotatingRole({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span aria-live="off">
      <span className="sr-only">{roles.join(" · ")}</span>
      <span
        aria-hidden
        className="relative inline-grid h-6 overflow-hidden align-bottom md:h-7"
      >
        {/* Every role stacked in one grid cell, so the box takes the widest
            RENDERED width. Sizing by character count clips wider glyphs. */}
        {roles.map((role) => (
          <span
            key={role}
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
          >
            {role}
          </span>
        ))}
        {roles.map((role, n) => (
          <span
            key={role}
            className="absolute inset-0 flex items-center whitespace-nowrap transition-[transform,opacity] duration-500 ease-out"
            style={{
              transform: `translateY(${(n - i) * 100}%)`,
              opacity: n === i ? 1 : 0,
            }}
          >
            {role}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Hero avatar — framed portrait with a switch that crossfades photos.
 * ------------------------------------------------------------------ */
export function Avatar({
  photo,
  photoAlt,
  name,
}: {
  photo: string;
  photoAlt: string;
  name: string;
}) {
  const [second, setSecond] = useState(false);

  return (
    <div className="flex w-fit flex-col items-center gap-2">
      <div className="w-fit rounded-[8px] border border-border p-[2.7px] dark:border-neutral-700">
        <div className="relative box-border size-14 select-none overflow-hidden rounded-[7px] border border-border bg-neutral-200 p-0.5 sm:size-20 md:size-[84px] dark:bg-neutral-800">
          <Image
            src={photo}
            alt={name}
            width={168}
            height={168}
            priority
            className="box-border size-full rounded-[5px] object-cover transition-opacity duration-300"
            style={{ opacity: second ? 0 : 1 }}
          />
          <Image
            src={photoAlt}
            alt=""
            aria-hidden
            width={168}
            height={168}
            className="absolute inset-1 box-border size-[calc(100%-0.5rem)] rounded-[5px] object-cover transition-opacity duration-300"
            style={{ opacity: second ? 1 : 0 }}
          />
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={second}
        aria-label="Show alternate photo"
        onClick={() => setSecond((v) => !v)}
        data-ui-feedback="tap"
        className="relative h-[18px] w-8 shrink-0 cursor-pointer rounded-full border border-border bg-neutral-200 transition-colors dark:bg-neutral-800"
      >
        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-sm transition-[left] duration-200 dark:bg-neutral-900"
          style={{ left: second ? "calc(100% - 14px)" : "2px" }}
        />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Custom cursor — a filled arrow at the pointer, "hi" pill trailing it.
 * ------------------------------------------------------------------ */
export function Cursor() {
  const arrow = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices keep their native cursor and never wire any of this up.
    if (matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("cursor-none");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lag = { ...pos };
    let shown = false;
    let raf = 0;

    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      if (arrow.current)
        arrow.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      if (pill.current)
        pill.current.style.transform = `translate(${lag.x + 20}px, ${lag.y + 16}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const show = () => {
      if (shown) return;
      shown = true;
      if (arrow.current) arrow.current.style.opacity = "1";
      if (pill.current) pill.current.style.opacity = "1";
    };
    const hide = () => {
      shown = false;
      if (arrow.current) arrow.current.style.opacity = "0";
      if (pill.current) pill.current.style.opacity = "0";
    };
    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      show();
    };
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) hide();
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", out);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", out);
      window.removeEventListener("blur", hide);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  // Rendered unconditionally: both layers start at opacity 0, so on touch
  // devices (where the effect bails) they stay invisible and inert.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={arrow}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-150"
        style={{ transformOrigin: "0% 0%" }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          style={{ display: "block", overflow: "visible" }}
        >
          <path
            d="M5 3 L23 14 L14 16 L11 24 Z"
            fill="oklch(var(--fg-oklch))"
            stroke="oklch(var(--base-oklch))"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        ref={pill}
        className="absolute left-0 top-0 select-none rounded-full bg-foreground px-2.5 py-1 text-[13px] font-semibold leading-none text-background opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] transition-opacity duration-150"
        style={{ transformOrigin: "0% 50%" }}
      >
        hi
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Sound — a short synthesized tick on anything marked data-ui-feedback.
 * State lives at module level: several components read and toggle it, and
 * per-component state would mean one listener (and one tick) each.
 * ------------------------------------------------------------------ */
let soundOn = false;
let soundInstalled = false;
let audio: AudioContext | null = null;
const soundSubscribers = new Set<() => void>();

function playTick() {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audio ||= new AC();
    const c = audio;
    if (c.state === "suspended") void c.resume();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(880, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(240, c.currentTime + 0.05);
    g.gain.setValueAtTime(0.05, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.08);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.09);
  } catch {
    /* no audio, no problem */
  }
}

function installSound() {
  if (soundInstalled || typeof document === "undefined") return;
  soundInstalled = true;
  try {
    soundOn = localStorage.sound === "on";
  } catch {}
  // One listener for the page's lifetime; it reads the live flag each time.
  document.addEventListener("pointerdown", (e) => {
    if (!soundOn) return;
    if (!(e.target as Element | null)?.closest?.("[data-ui-feedback]")) return;
    playTick();
  });
}

function useSound() {
  const on = useSyncExternalStore(
    (notify) => {
      installSound();
      soundSubscribers.add(notify);
      return () => {
        soundSubscribers.delete(notify);
      };
    },
    () => soundOn,
    () => false, // server render: silent until the client hydrates
  );

  const toggle = useCallback(() => {
    soundOn = !soundOn;
    try {
      localStorage.sound = soundOn ? "on" : "off";
    } catch {}
    soundSubscribers.forEach((fn) => fn());
  }, []);

  return [on, toggle] as const;
}

/* ------------------------------------------------------------------ *
 * Command menu — native <dialog>, so Esc and the focus trap come free.
 * ------------------------------------------------------------------ */
export type CommandItem = {
  group: string;
  label: string;
  href?: string;
  action?: "theme" | "sound";
  external?: boolean;
};

const CommandContext = { open: () => {} };

export function CommandMenu({ items }: { items: CommandItem[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const activeRow = useRef<HTMLLIElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [, toggleTheme] = useTheme();
  const [, toggleSound] = useSound();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? items.filter((i) => (i.label + " " + i.group).toLowerCase().includes(q))
      : items;
  }, [items, query]);

  const close = useCallback(() => {
    ref.current?.close();
    setQuery("");
    setActive(0);
  }, []);

  const open = useCallback(() => {
    ref.current?.showModal();
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    CommandContext.open = open;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (ref.current?.open) close();
        else open();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Focus stays in the input, so keep the highlighted row scrolled into view.
  useEffect(() => {
    activeRow.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = useCallback(
    (item: CommandItem) => {
      close();
      if (item.action === "theme") return toggleTheme();
      if (item.action === "sound") return toggleSound();
      if (!item.href) return;
      if (item.external) return void window.open(item.href, "_blank", "noopener");

      // "/#skills" scrolls when that section is on this page, else navigates.
      const hash = item.href.startsWith("#")
        ? item.href
        : item.href.includes("#")
          ? item.href.slice(item.href.indexOf("#"))
          : null;
      const target = hash ? document.querySelector(hash) : null;
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = item.href;
    },
    [close, toggleTheme, toggleSound],
  );

  // Group headers resolved before render, so nothing mutates during it.
  const rows = results.map((item, n) => ({
    item,
    n,
    header: item.group !== results[n - 1]?.group ? item.group : null,
  }));

  return (
    <dialog
      ref={ref}
      aria-label="Command menu"
      onClose={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((v) => (v + 1) % Math.max(1, results.length));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive(
            (v) => (v - 1 + Math.max(1, results.length)) % Math.max(1, results.length),
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (results[active]) run(results[active]);
        }
      }}
      className="w-[min(92vw,32rem)] rounded-lg border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-2 border-b border-border px-3">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        {/* Combobox pattern: focus never leaves this input, so the arrow-key
            selection and the thing Enter runs are always the same item. */}
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Jump to a page, open a link, or change a setting."
          aria-label="Search commands"
          role="combobox"
          aria-expanded
          aria-controls="command-list"
          aria-autocomplete="list"
          aria-activedescendant={results[active] ? `command-${active}` : undefined}
          // The bordered row already reads as focused; a ring would double it.
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <kbd className="shrink-0 rounded bg-muted px-1 py-px font-mono text-[10px] leading-4 text-muted-foreground">
          Esc
        </kbd>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      <ul
        id="command-list"
        role="listbox"
        aria-label="Commands"
        className="max-h-[60vh] overflow-y-auto p-1.5"
      >
        {results.length === 0 && (
          <li
            role="presentation"
            className="px-2.5 py-6 text-center text-sm text-muted-foreground"
          >
            Nothing matches “{query}”.
          </li>
        )}
        {rows.map(({ item, n, header }) => (
          <Fragment key={item.group + item.label}>
            {header && (
              <li
                role="presentation"
                className="px-2.5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {header}
              </li>
            )}
            {/* An option, not a button: keeping rows out of the tab order is
                what stops focus and the active index from disagreeing. */}
            <li
              id={`command-${n}`}
              role="option"
              aria-selected={n === active}
              ref={n === active ? activeRow : undefined}
              data-ui-feedback="tap"
              onMouseEnter={() => setActive(n)}
              onClick={() => run(item)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                n === active ? "bg-accent" : ""
              }`}
            >
              <span>{item.label}</span>
              {item.external && (
                <span aria-hidden className="text-xs text-muted-foreground">
                  ↗
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
    </dialog>
  );
}

/** Opens the command menu rendered elsewhere on the page. */
export function SearchTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-ui-feedback="tap"
      // No aria-label: the visible "Search" text is the accessible name, so
      // voice-control users can say what they see.
      onClick={() => CommandContext.open()}
      className={className}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Header controls — sound + theme in one pill, matching the reference.
 * ------------------------------------------------------------------ */
export function Controls() {
  const [sound, toggleSound] = useSound();
  const [dark, toggleTheme] = useTheme();

  const btn =
    "grid size-7 place-items-center rounded-full text-foreground/75 transition-colors hover:bg-black/5 dark:hover:bg-white/10";

  return (
    <div className="flex h-8 items-center gap-0.5 rounded-full bg-black/5 p-0.5 dark:bg-neutral-800">
      <button
        type="button"
        role="switch"
        aria-checked={sound}
        // A switch is named for what it controls; aria-checked carries the state.
        aria-label="Interface sound"
        onClick={toggleSound}
        data-ui-feedback="tap"
        className={btn}
      >
        {sound ? (
          <Volume2 className="size-[14px]" />
        ) : (
          <VolumeX className="size-[14px]" />
        )}
      </button>
      <button
        type="button"
        aria-label="Toggle theme"
        aria-pressed={dark}
        onClick={toggleTheme}
        data-ui-feedback="tap"
        className={btn}
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </div>
  );
}

/* Mobile nav — a details/summary disclosure, no dropdown library needed. */
export function MobileNav({ links }: { links: { label: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // <details> has no built-in dismiss; wire up Esc and outside-click.
    const close = () => {
      if (ref.current) ref.current.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <details ref={ref} className="relative md:hidden">
      <summary
        aria-label="Open menu"
        className="grid size-8 cursor-pointer list-none place-items-center rounded-full transition-colors hover:bg-accent [&::-webkit-details-marker]:hidden"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </summary>
      <nav className="absolute right-0 z-50 mt-1 w-40 rounded-lg border border-border bg-background p-1 shadow-lg">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-ui-feedback="tap"
            className="block rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}

/* ------------------------------------------------------------------ *
 * Closing CTA — the gap between avatar and label opens on hover.
 * ------------------------------------------------------------------ */
export function MagneticCTA({
  href,
  photo,
  label,
}: {
  href: string;
  photo: string;
  label: string;
}) {
  return (
    <a
      href={href}
      data-ui-feedback="tap"
      className="group inset-highlight inline-flex cursor-pointer items-center self-center rounded-md border border-black/10 bg-black/[0.03] px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/15 dark:text-white"
    >
      <span className="relative z-20 flex items-center gap-2 transition-[gap] duration-300 group-hover:gap-8">
        <span className="size-5 shrink-0 overflow-hidden rounded-full">
          <Image
            src={photo}
            alt=""
            width={20}
            height={20}
            className="size-full object-cover"
          />
        </span>
        <span
          aria-hidden
          className="absolute left-6 flex -translate-x-full items-center opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <Plus className="size-3" />
          <span className="ml-1 mr-2 flex size-5 items-center justify-center rounded-full bg-black/10 text-[8px] dark:bg-white/10">
            You
          </span>
        </span>
        <span className="relative ml-0 block whitespace-nowrap text-sm font-bold transition-[margin-left] duration-300 group-hover:ml-4">
          {label}
        </span>
      </span>
    </a>
  );
}
