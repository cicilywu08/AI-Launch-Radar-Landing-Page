/* global React */
// Shared bits used by both the mobile and desktop Launch Radar email mocks.
// Light theme — paper canvas, indigo-9 ink, gradient reserved for accents.

const { useMemo } = React;

// ───────────── Source pill ─────────────
// Tiny chip telling you where a launch came from. Colored dot does the
// signalling; chip itself stays quiet so product names dominate.
function SourcePill({ source }) {
  const isGH = source === "GitHub";
  const dot = isGH ? "#6438D0" : "#FF6600";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px 4px 8px",
        borderRadius: 999,
        background: "rgba(9,30,66,0.04)",
        border: "1px solid rgba(9,30,66,0.08)",
        font: "500 11px/1 var(--cw-font-micro)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--cw-indigo-8)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />
      {source}
    </span>
  );
}

// ───────────── Meta tag ("AI", "Infra", etc) ─────────────
function MetaTag({ children }) {
  return (
    <span
      style={{
        font: "500 10.5px/1 var(--cw-font-micro)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(37,56,88,0.7)",
        padding: "4px 9px",
        borderRadius: 6,
        background: "rgba(9,30,66,0.04)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// ───────────── Brand mark ─────────────
// "LR" monogram in a gradient-filled rounded square — same gradient as the
// Cloudways carousel. The mark stays vivid on white.
function LRMark({ size = 28 }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 8,
        background: "var(--cw-gradient)",
        color: "var(--cw-white)",
        font: "700 12px/1 var(--cw-font-display)",
        letterSpacing: "-0.02em",
        boxShadow: "0 6px 20px -8px rgba(123,85,252,0.35)",
        flexShrink: 0,
      }}
    >
      LR
    </span>
  );
}

// ───────────── Ambient gradient backdrop ─────────────
// A whisper of the signature gradient bleeding off the top edge of the
// canvas. On a light canvas it reads as paper near a window, not as a
// "dark mode" wash.
function AmbientGlow({ height = 360 }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: `0 0 auto 0`,
        height,
        pointerEvents: "none",
        opacity: 0.55,
        background:
          "radial-gradient(70% 60% at 92% -10%, rgba(255,71,240,0.12) 0%, rgba(255,71,240,0) 60%), radial-gradient(60% 50% at 8% -10%, rgba(255,175,71,0.10) 0%, rgba(255,175,71,0) 60%), radial-gradient(90% 70% at 50% -30%, rgba(10,93,255,0.10) 0%, rgba(10,93,255,0) 60%)",
      }}
    />
  );
}

// ───────────── Numerals ─────────────
// 01 / 02 / 03 — set big, gradient-filled, tracked tight.
function IndexNumeral({ n, fontSize = 56 }) {
  return (
    <span
      style={{
        font: `700 ${fontSize}px/0.9 var(--cw-font-display)`,
        letterSpacing: "-0.04em",
        background: "var(--cw-gradient)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        fontFeatureSettings: '"tnum" 1',
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

Object.assign(window, { SourcePill, MetaTag, LRMark, AmbientGlow, IndexNumeral });
