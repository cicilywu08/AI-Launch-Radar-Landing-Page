/* global React, LRMark, AmbientGlow, LaunchRadarDense */
// Launch Radar — landing page.
// Trimmed to two beats: hero (subscribe) + live email preview. Everything
// below the preview was deleted on request. Tweakable copy and layout flags
// are passed in via props from the host HTML's TWEAK_DEFAULTS block.

const { useState, useEffect } = React;

// Reactive viewport check — narrow == phones / tablet-portrait. Drives padding,
// type scale, and whether the preview renders in mobile-email layout.
function useIsNarrow(bp = 720) {
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" && window.innerWidth < bp
  );
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < bp);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bp]);
  return narrow;
}

function LandingPage({ sample, t }) {
  const narrow = useIsNarrow();
  return (
    <div
      style={{
        position: "relative",
        background: "var(--cw-white)",
        color: "var(--cw-indigo-8)",
        fontFamily: "var(--cw-font-body)",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <AmbientGlow height={narrow ? 560 : 780} />
      {t.showTopBar && <TopBar narrow={narrow} />}
      <Hero
        narrow={narrow}
        headline={t.headlineLead}
        highlight={t.headlineHighlight}
        eyebrow={t.eyebrowText}
        subhead={t.subhead}
        ctaText={t.ctaText}
        showTrust={t.showTrustLine}
        stats={sample.stats}
      />
      <PreviewSection
        narrow={narrow}
        sample={sample}
        previewHeight={t.previewHeight}
        showFade={t.showPreviewFade}
        ctaText={t.ctaText}
      />
      <Footer narrow={narrow} />
    </div>
  );
}

// ───────────── Top bar ─────────────
function TopBar({ narrow }) {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: narrow ? "18px 20px 0" : "26px 48px 0",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LRMark size={28} />
        <span
          style={{
            font: "700 16px/1 var(--cw-font-display)",
            letterSpacing: "-0.02em",
            color: "var(--cw-indigo-9)",
          }}
        >
          Launch Radar
        </span>
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <a
          href="#sample"
          style={{
            font: "500 13px/1 var(--cw-font-micro)",
            color: "rgba(37,56,88,0.7)",
            textDecoration: "none",
          }}
        >
          Sample
        </a>
        <a
          href="#subscribe"
          style={{
            font: "600 13px/1 var(--cw-font-micro)",
            color: "var(--cw-indigo-9)",
            padding: "9px 14px",
            borderRadius: 999,
            background: "rgba(9,30,66,0.06)",
            textDecoration: "none",
          }}
        >
          Subscribe
        </a>
      </nav>
    </header>
  );
}

// ───────────── Hero ─────────────
function Hero({ narrow, headline, highlight, eyebrow, subhead, ctaText, showTrust, stats }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        padding: narrow ? "36px 20px 32px" : "72px 48px 56px",
        maxWidth: 1100,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
          padding: "7px 14px 7px 7px",
          borderRadius: 999,
          border: "1px solid rgba(9,30,66,0.08)",
          background: "rgba(9,30,66,0.02)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 9px",
            borderRadius: 999,
            background: "var(--cw-gradient)",
            color: "#fff",
            font: "600 10.5px/1 var(--cw-font-micro)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          New
        </span>
        <span
          style={{
            font: `500 ${narrow ? 11 : 12}px/1.3 var(--cw-font-micro)`,
            letterSpacing: "0.04em",
            color: "rgba(37,56,88,0.8)",
            textAlign: "left",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <h1
        style={{
          margin: 0,
          font: "700 clamp(40px, 7.4vw, 92px)/0.98 var(--cw-font-display)",
          letterSpacing: "-0.04em",
          color: "var(--cw-indigo-9)",
          maxWidth: 980,
          marginInline: "auto",
          textWrap: "balance",
        }}
      >
        {headline}{" "}
        <span
          style={{
            background: "var(--cw-gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {highlight}
        </span>
      </h1>

      <p
        style={{
          margin: narrow ? "20px auto 0" : "26px auto 0",
          maxWidth: 620,
          font: `400 ${narrow ? 15 : 18}px/1.55 var(--cw-font-body)`,
          color: "rgba(37,56,88,0.78)",
          textWrap: "pretty",
        }}
      >
        {subhead}
      </p>

      <SubscribeForm ctaText={ctaText} />

      {showTrust && (
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            font: "500 12px/1 var(--cw-font-micro)",
            letterSpacing: "0.04em",
            color: "rgba(37,56,88,0.55)",
            flexWrap: "wrap",
          }}
        >
          <ReaderAvatars />
          <span>{stats.builders * 12}+ subscribers</span>
          <Dot />
          <span>Free</span>
          <Dot />
          <span>Unsubscribe anytime</span>
        </div>
      )}
    </section>
  );
}

function ReaderAvatars() {
  const tints = [
    "linear-gradient(135deg, rgba(255,175,71,0.95), rgba(255,71,240,0.6))",
    "linear-gradient(135deg, rgba(255,71,240,0.85), rgb(210,133,255))",
    "linear-gradient(135deg, rgb(210,133,255), rgba(10,93,255,0.95))",
    "linear-gradient(135deg, rgba(10,93,255,0.9), rgba(255,175,71,0.6))",
  ];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {tints.map((bg, i) => (
        <span
          key={i}
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            background: bg,
            border: "2px solid var(--cw-white)",
            marginLeft: i === 0 ? 0 : -7,
          }}
        />
      ))}
    </div>
  );
}

function Dot() {
  return (
    <span
      style={{
        width: 3,
        height: 3,
        borderRadius: 999,
        background: "rgba(9,30,66,0.25)",
      }}
    />
  );
}

// ───────────── Subscribe form ─────────────
function SubscribeForm({ ctaText = "Subscribe" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Subscribe failed");
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  };
  const done = state === "done";

  return (
    <form
      id="subscribe"
      onSubmit={submit}
      style={{
        marginTop: 36,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        gap: 8,
        maxWidth: 520,
        marginInline: "auto",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: "1 1 280px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 16px",
          height: 52,
          borderRadius: 999,
          background: "var(--cw-white)",
          border:
            state === "error"
              ? "1.5px solid #E14C4C"
              : "1.5px solid rgba(9,30,66,0.12)",
          boxShadow:
            "0 1px 2px rgba(9,30,66,0.04), 0 12px 32px -22px rgba(9,30,66,0.18)",
          minWidth: 0,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            color: "rgba(37,56,88,0.55)",
          }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path
              d="M2 1.5h12v9H2v-9Zm0 0 6 5 6-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          type="email"
          required
          placeholder={done ? "you're in." : "you@workshop.dev"}
          value={done ? "you@workshop.dev" : email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          disabled={done}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "500 15px/1 var(--cw-font-body)",
            color: "var(--cw-indigo-9)",
            minWidth: 0,
          }}
        />
        {done && (
          <span
            style={{
              font: "600 12px/1 var(--cw-font-micro)",
              color: "#1F8A5B",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ✓ Subscribed
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={done || state === "sending"}
        style={{
          flex: "0 0 auto",
          height: 52,
          padding: "0 24px",
          borderRadius: 999,
          border: "none",
          cursor: done ? "default" : "pointer",
          background: done ? "rgba(9,30,66,0.08)" : "var(--cw-gradient)",
          color: done ? "var(--cw-indigo-9)" : "#fff",
          font: "600 14px/1 var(--cw-font-display)",
          letterSpacing: "-0.005em",
          boxShadow: done
            ? "none"
            : "0 10px 28px -10px rgba(123,85,252,0.55), 0 1px 2px rgba(9,30,66,0.06)",
          transition: "transform .15s, box-shadow .15s",
        }}
      >
        {state === "sending"
          ? "Subscribing…"
          : done
          ? "See you tomorrow"
          : ctaText}
      </button>
    </form>
  );
}

// ───────────── Preview section ─────────────
// Email body height is tweakable — readers can see more or less of the
// digest before the fade. With showFade off, the cap is removed entirely
// and the full email scrolls inline.
function PreviewSection({ narrow, sample, previewHeight = 1400, showFade = true, ctaText }) {
  // On narrow viewports cap the crop a bit tighter so the page stays scannable.
  const cropH = narrow ? Math.min(previewHeight, 1100) : previewHeight;
  return (
    <section
      id="sample"
      style={{
        position: "relative",
        padding: narrow ? "8px 12px 56px" : "24px 24px 96px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 22,
        }}
      >
        <span style={{ width: 18, height: 1, background: "var(--cw-gradient)" }} />
        <span
          style={{
            font: "500 11px/1 var(--cw-font-micro)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(37,56,88,0.7)",
          }}
        >
          Yesterday's digest · live preview
        </span>
        <span style={{ width: 18, height: 1, background: "var(--cw-gradient)" }} />
      </div>

      <div
        style={{
          position: "relative",
          margin: "0 auto",
          maxWidth: 760,
          borderRadius: narrow ? 14 : 18,
          overflow: "hidden",
          background: "var(--cw-white)",
          boxShadow:
            "0 1px 2px rgba(9,30,66,0.05), 0 32px 80px -30px rgba(9,30,66,0.25), 0 0 0 1px rgba(9,30,66,0.06)",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: narrow ? 8 : 10,
            padding: narrow ? "10px 12px" : "13px 16px",
            background: "#F7F7FB",
            borderBottom: "1px solid rgba(9,30,66,0.06)",
          }}
        >
          <span style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: c,
                }}
              />
            ))}
          </span>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              font: "500 11.5px/1 var(--cw-font-micro)",
              color: "#5B6473",
              letterSpacing: "0.02em",
            }}
          >
            mail.google.com · Inbox
          </span>
          <span style={{ width: 50 }} />
        </div>

        {/* Email "From" header */}
        <div
          style={{
            padding: narrow ? "12px 14px 12px" : "16px 22px 14px",
            borderBottom: "1px solid rgba(9,30,66,0.06)",
          }}
        >
          <div
            style={{
              font: `600 ${narrow ? 14 : 16}px/1.3 var(--cw-font-display)`,
              color: "#0B0F1A",
              letterSpacing: "-0.01em",
              marginBottom: 6,
            }}
          >
            Daily Radar · 22 signals from 30 builders
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: narrow ? 8 : 10,
              font: `400 ${narrow ? 11 : 12}px/1.3 var(--cw-font-body)`,
              color: "#5B6473",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: narrow ? 20 : 22,
                height: narrow ? 20 : 22,
                borderRadius: 999,
                background: "var(--cw-gradient)",
                color: "#fff",
                font: "700 10px/1 var(--cw-font-display)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              LR
            </span>
            <span>
              <b style={{ color: "#0B0F1A", fontWeight: 600 }}>Launch Radar</b>
              {narrow ? "" : " <digest@launchradar.local>"}
            </span>
            <span style={{ marginLeft: "auto", color: "#8A93A4", whiteSpace: "nowrap" }}>
              {narrow ? "7:02 AM" : "Sun, May 24 · 7:02 AM"}
            </span>
          </div>
        </div>

        {/* Email body */}
        <div
          style={{
            position: "relative",
            background: "#F2F3F6",
            padding: narrow ? 10 : 20,
          }}
        >
          <div
            style={{
              maxHeight: showFade ? cropH : "none",
              overflow: "hidden",
              borderRadius: narrow ? 10 : 12,
              position: "relative",
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LaunchRadarDense data={sample} mobile={narrow} />
            </div>
            {showFade && (
              <>
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 220,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,1) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <a
                  href="#subscribe"
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 24,
                    transform: "translateX(-50%)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 18px",
                    borderRadius: 999,
                    background: "var(--cw-indigo-9)",
                    color: "#fff",
                    font: "600 12.5px/1 var(--cw-font-micro)",
                    letterSpacing: "-0.005em",
                    textDecoration: "none",
                    boxShadow: "0 10px 28px -10px rgba(9,30,66,0.45)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ctaText || "Get tomorrow's in your inbox"}
                  <span style={{ fontSize: 12 }}>↗</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── Footer ─────────────
function Footer({ narrow }) {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(9,30,66,0.07)",
        padding: narrow ? "24px 20px 28px" : "28px 48px 32px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: narrow ? "column" : "row",
        alignItems: narrow ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: narrow ? 28 : 16,
      }}
    >
      {/* Left: branding + copyright */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LRMark size={22} />
          <span
            style={{
              font: "700 14px/1 var(--cw-font-display)",
              letterSpacing: "-0.02em",
              color: "var(--cw-indigo-9)",
            }}
          >
            Launch Radar
          </span>
        </div>
        <span
          style={{
            font: "400 12px/1.4 var(--cw-font-body)",
            color: "rgba(37,56,88,0.45)",
            marginLeft: 30,
          }}
        >
          © {new Date().getFullYear()} Cicily Wu · All rights reserved
        </span>
      </div>

      {/* Right: contact */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: narrow ? "flex-start" : "flex-end",
          gap: 10,
        }}
      >
        <span
          style={{
            font: "500 11px/1 var(--cw-font-micro)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(37,56,88,0.4)",
          }}
        >
          Suggest a builder · share feedback
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="https://www.linkedin.com/in/cicily-wu-749983177/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(9,30,66,0.10)",
              background: "rgba(9,30,66,0.02)",
              font: "500 12px/1 var(--cw-font-micro)",
              color: "var(--cw-indigo-9)",
              textDecoration: "none",
              transition: "background .15s, border-color .15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(9,30,66,0.06)";
              e.currentTarget.style.borderColor = "rgba(9,30,66,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(9,30,66,0.02)";
              e.currentTarget.style.borderColor = "rgba(9,30,66,0.10)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="mailto:wucicily@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(9,30,66,0.10)",
              background: "rgba(9,30,66,0.02)",
              font: "500 12px/1 var(--cw-font-micro)",
              color: "var(--cw-indigo-9)",
              textDecoration: "none",
              transition: "background .15s, border-color .15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(9,30,66,0.06)";
              e.currentTarget.style.borderColor = "rgba(9,30,66,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(9,30,66,0.02)";
              e.currentTarget.style.borderColor = "rgba(9,30,66,0.10)";
            }}
          >
            <svg width="13" height="11" viewBox="0 0 16 12" fill="none">
              <path d="M2 1.5h12v9H2v-9Zm0 0 6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            wucicily@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LandingPage });
