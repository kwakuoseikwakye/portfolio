import Image from "next/image";
import { Github, Globe, Mail } from "lucide-react";
import { focus, profile } from "@/lib/content";
import { qrModules, qrPath } from "@/lib/qr";

/* The card is artwork, not themed UI: it renders at a fixed 1004x650 with
   fixed colours, which is exactly 85x55mm at 300dpi. Everything downloadable
   is captured from these two components, so there is one source of truth. */

export const CARD_W = 1004;
export const CARD_H = 650;

const INK = "#0A0A0A";
const PAPER = "#FAFAFA";
const RULE_ON_DARK = "rgba(255,255,255,0.13)";

/** Scales a full-size card down to fit the page without touching its layout. */
export function CardFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <figure className="m-0">
      <div className="relative h-[215px] w-[331px] overflow-hidden rounded-[10px] shadow-[0_20px_44px_-18px_rgba(0,0,0,0.55)] ring-1 ring-black/15 sm:h-[293px] sm:w-[452px] md:h-[364px] md:w-[562px] dark:ring-white/15">
        <div
          className="absolute left-0 top-0 origin-top-left scale-[0.3297] sm:scale-[0.4502] md:scale-[0.5598]"
          aria-hidden
        >
          {children}
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

export function CardFront() {
  const rows = [
    { Icon: Mail, value: profile.email },
    { Icon: Globe, value: "kwakuoseikwakye.github.io" },
    { Icon: Github, value: "github.com/kwakuoseikwakye" },
  ];

  return (
    <div
      data-card="front"
      style={{ width: CARD_W, height: CARD_H, background: INK }}
      className="relative overflow-hidden font-sans"
    >
      {/* Portrait bleeds off the left edge; its own dark backdrop lets the
          hard edge read as an edit rather than a cut-out. */}
      <div className="absolute inset-y-0 left-0" style={{ width: 380 }}>
        <Image
          src="/card/portrait.jpg"
          alt=""
          width={864}
          height={1184}
          priority
          className="h-full w-full object-cover"
          style={{ objectPosition: "47% 26%" }}
        />
        {/* Lifts the shadow side just enough to separate hair from background. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.55) 100%)",
          }}
        />
      </div>
      <div
        className="absolute inset-y-0"
        style={{ left: 380, width: 1, background: RULE_ON_DARK }}
      />

      {/* Wordmark */}
      <div
        className="absolute font-pixel uppercase leading-none text-white"
        style={{ left: 440, top: 52, fontSize: 34, letterSpacing: "0.06em" }}
      >
        {profile.initials}
      </div>
      <Rule x={440} y={100} w={504} />

      {/* Identity */}
      <div
        className="absolute font-medium leading-none text-white"
        style={{ left: 440, top: 152, fontSize: 48, letterSpacing: "-0.022em" }}
      >
        {profile.name}
      </div>
      <div
        className="absolute leading-none"
        style={{
          left: 440,
          top: 212,
          fontSize: 23,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {profile.role}
      </div>
      <Rule x={440} y={266} w={504} />

      {/* Contact */}
      {rows.map(({ Icon, value }, i) => (
        <div
          key={value}
          className="absolute flex items-center font-mono"
          style={{
            left: 440,
            top: 306 + i * 40,
            fontSize: 18,
            gap: 12,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          <Icon
            style={{ width: 17, height: 17, color: "rgba(255,255,255,0.45)" }}
            aria-hidden
          />
          {value}
        </div>
      ))}
      <Rule x={440} y={420} w={504} />

      {/* Footer: place + availability on the left, scan target on the right. */}
      <div
        className="absolute font-mono leading-none"
        style={{
          left: 440,
          top: 500,
          fontSize: 16,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {profile.location}
      </div>
      <div
        className="absolute flex items-center font-mono leading-none"
        style={{
          left: 440,
          top: 534,
          fontSize: 16,
          gap: 9,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "#4ADE80",
            display: "inline-block",
          }}
        />
        {profile.available}
      </div>

      {/* 175px / 37 modules = 0.4mm per module at 300dpi, the usual floor for
          a QR that still scans off printed stock. Smaller and it stops working
          on paper even though it looks fine on screen. */}
      <div className="absolute" style={{ left: 769, top: 435 }}>
        <Qr size={175} color="rgba(255,255,255,0.94)" />
      </div>
    </div>
  );
}

export function CardBack() {
  const [top, left, right, bottom] = focus;
  const dim = "rgba(10,10,10,0.42)";

  return (
    <div
      data-card="back"
      style={{ width: CARD_W, height: CARD_H, background: PAPER }}
      className="relative overflow-hidden font-sans"
    >
      {/* The site's four-circle focus diagram, dropped back to a watermark. */}
      <div
        className="absolute"
        style={{ left: (CARD_W - 500) / 2, top: (CARD_H - 500) / 2, width: 500, height: 500 }}
      >
        {[
          { left: "50%", top: 0, tx: "-50%" },
          { left: "2%", top: "22%", tx: "0" },
          { right: "2%", top: "22%", tx: "0" },
          { left: "50%", bottom: 0, tx: "-50%" },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              width: "55%",
              height: "55%",
              borderRadius: 999,
              border: "1px solid rgba(10,10,10,0.13)",
              left: pos.left,
              right: pos.right,
              top: pos.top,
              bottom: pos.bottom,
              transform: `translateX(${pos.tx})`,
            }}
          />
        ))}

        {/* width is sized so no label wraps into the ring it sits in. */}
        <Label style={{ left: "50%", top: "13%", transform: "translate(-50%,-50%)", width: 200 }}>
          {top}
        </Label>
        <Label style={{ left: "17%", top: "50%", transform: "translate(-50%,-50%)", width: 176 }}>
          {left}
        </Label>
        <Label style={{ right: "17%", top: "50%", transform: "translate(50%,-50%)", width: 176 }}>
          {right}
        </Label>
        <Label style={{ left: "50%", bottom: "13%", transform: "translate(-50%,50%)", width: 200 }}>
          {bottom}
        </Label>

        {/* Wordmark sits on a paper disc so the rings pass behind it cleanly. */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 148,
            height: 148,
            borderRadius: 999,
            background: PAPER,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="font-pixel uppercase leading-none"
            style={{ fontSize: 46, letterSpacing: "0.06em", color: INK }}
          >
            {profile.initials}
          </span>
        </div>
      </div>

      <div
        className="absolute font-mono leading-none"
        style={{ left: 56, bottom: 52, fontSize: 16, color: dim }}
      >
        kwakuoseikwakye.github.io
      </div>
      <div
        className="absolute font-mono uppercase leading-none"
        style={{
          right: 56,
          bottom: 52,
          fontSize: 16,
          letterSpacing: "0.14em",
          color: dim,
        }}
      >
        {profile.name}
      </div>
    </div>
  );
}

function Rule({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{ left: x, top: y, width: w, height: 1, background: RULE_ON_DARK }}
    />
  );
}

function Label({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <span
      className="absolute text-center leading-tight"
      style={{
        fontSize: 13.5,
        whiteSpace: "nowrap",
        color: "rgba(10,10,10,0.42)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Qr({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${qrModules} ${qrModules}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <path d={qrPath} stroke={color} strokeWidth={1} fill="none" />
    </svg>
  );
}
