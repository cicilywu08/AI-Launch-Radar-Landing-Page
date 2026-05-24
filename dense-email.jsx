/* global React, LRMark, AmbientGlow */
// Dense / long-form Launch Radar — built for ~20+ items per day, the realistic
// volume from a scraping agent. Optimized for scanability: tight typography,
// no per-item card chrome, section headers do the heavy lifting.

function LaunchRadarDense({ data, mobile = false }) {
  const { date, dateShort, sections, stats, generator } = data;
  const totalItems = sections.reduce((n, s) => n + s.items.length, 0);

  // Width + spacing differ between desktop (~640) and mobile (390).
  const W = mobile ? 390 : 640;
  const padX = mobile ? 22 : 48;
  const heroSize = mobile ? 36 : 50;
  const bodyFs = mobile ? 13 : 14;
  const subjectFs = mobile ? 14 : 15.5;

  return (
    <div
      style={{
        position: "relative",
        width: W,
        background: "var(--cw-white)",
        color: "var(--cw-indigo-8)",
        fontFamily: "var(--cw-font-body)",
        overflow: "hidden",
      }}
    >
      <AmbientGlow height={mobile ? 360 : 380} />

      {/* ─── Masthead ─────────────────────────────── */}
      <header
        style={{
          position: "relative",
          padding: `${mobile ? 24 : 32}px ${padX}px 0`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: mobile ? 28 : 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LRMark size={mobile ? 22 : 24} />
            <span
              style={{
                font: "600 11px/1 var(--cw-font-micro)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(37,56,88,0.7)",
              }}
            >
              Launch Radar
            </span>
          </div>
          <span
            style={{
              font: "500 11px/1 var(--cw-font-micro)",
              letterSpacing: "0.04em",
              color: "rgba(37,56,88,0.6)",
            }}
          >
            {mobile ? dateShort : date}
          </span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 18,
              height: 1,
              background: "var(--cw-gradient)",
            }}
          />
          <span
            style={{
              font: "500 10px/1 var(--cw-font-micro)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(37,56,88,0.7)",
            }}
          >
            Daily digest · {date}
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            font: `700 ${heroSize}px/0.98 var(--cw-font-display)`,
            letterSpacing: "-0.035em",
            color: "var(--cw-indigo-9)",
          }}
        >
          {totalItems} signals from the{" "}
          <span
            style={{
              background: "var(--cw-gradient)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            builder feed.
          </span>
        </h1>

        {/* Stat strip */}
        <div
          style={{
            marginTop: mobile ? 18 : 22,
            paddingTop: 16,
            borderTop: "1px solid rgba(9,30,66,0.08)",
            display: "flex",
            alignItems: "center",
            gap: mobile ? 10 : 14,
            flexWrap: "wrap",
            font: "500 11px/1 var(--cw-font-micro)",
            color: "rgba(37,56,88,0.7)",
            letterSpacing: "0.04em",
          }}
        >
          <Stat n={stats.builders} label="builders" />
          <Sep />
          <Stat n={stats.posts} label="posts" />
          <Sep />
          <Stat n={stats.github} label="GH" />
          <Sep />
          <Stat n={stats.hn} label="HN" />
          <Sep />
          <Stat n={stats.qualified} label="qualified" emphasis />
          {!mobile && <span style={{ flex: 1 }} />}
          <span style={{ flex: mobile ? 1 : 0 }} />
          <span
            style={{
              font: "500 10px/1 var(--cw-font-micro)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(37,56,88,0.5)",
            }}
          >
            via {generator}
          </span>
        </div>

        {/* Jump-nav: the section labels as chips. Lets readers scan the day's
         * shape before scrolling, and links straight to a section anchor.
         * Hidden on mobile to keep the masthead compact. */}
        {!mobile && (
          <nav
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              paddingBottom: 4,
            }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(9,30,66,0.08)",
                  font: "500 11px/1 var(--cw-font-micro)",
                  color: "var(--cw-indigo-8)",
                  textDecoration: "none",
                  background: "rgba(9,30,66,0.02)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 11 }}>{s.icon}</span>
                {s.title}
                <span
                  style={{
                    font: "500 10px/1 var(--cw-font-micro)",
                    color: "rgba(37,56,88,0.55)",
                  }}
                >
                  {s.items.length}
                </span>
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ─── Sections ─────────────────────────────── */}
      <main
        style={{
          position: "relative",
          padding: `${mobile ? 28 : 40}px ${padX}px ${mobile ? 16 : 24}px`,
          display: "flex",
          flexDirection: "column",
          gap: mobile ? 28 : 36,
        }}
      >
        {sections.map((s) => (
          <DenseSection
            key={s.id}
            section={s}
            mobile={mobile}
            bodyFs={bodyFs}
            subjectFs={subjectFs}
          />
        ))}
      </main>

      {/* ─── Footer ───────────────────────────────── */}
      <footer
        style={{
          position: "relative",
          padding: `${mobile ? 22 : 28}px ${padX}px ${mobile ? 32 : 40}px`,
          borderTop: "1px solid rgba(9,30,66,0.08)",
          marginTop: mobile ? 12 : 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              font: "600 11.5px/1.4 var(--cw-font-micro)",
              color: "var(--cw-indigo-9)",
            }}
          >
            Generated via {generator}
          </div>
          <div
            style={{
              font: "400 11px/1.5 var(--cw-font-body)",
              color: "rgba(37,56,88,0.7)",
              marginTop: 2,
            }}
          >
            {stats.builders} active builders · {stats.posts} posts ·{" "}
            {stats.qualified} qualified
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <DenseChip>Tune sources</DenseChip>
          <DenseChip>Pause</DenseChip>
        </div>
      </footer>
    </div>
  );
}

// ───────────── Section block ─────────────
function DenseSection({ section, mobile, bodyFs, subjectFs }) {
  return (
    <section id={section.id}>
      {/* Section header: emoji + title + count, with a gradient underline
       * that runs the full row width. */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          paddingBottom: 10,
          marginBottom: 4,
          borderBottom: "1px solid rgba(9,30,66,0.08)",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: mobile ? 16 : 18,
            transform: "translateY(2px)",
          }}
        >
          {section.icon}
        </span>
        <h2
          style={{
            margin: 0,
            font: `700 ${mobile ? 16 : 18}px/1.2 var(--cw-font-display)`,
            letterSpacing: "-0.02em",
            color: "var(--cw-indigo-9)",
          }}
        >
          {section.title}
        </h2>
        <span
          style={{
            font: "500 11px/1 var(--cw-font-micro)",
            letterSpacing: "0.06em",
            color: "rgba(37,56,88,0.55)",
            textTransform: "uppercase",
          }}
        >
          {section.items.length} {section.items.length === 1 ? "item" : "items"}
        </span>
        {/* Gradient accent peeking out under the right edge */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            bottom: -1,
            width: 80,
            height: 2,
            background: "var(--cw-gradient)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Item list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {section.items.map((it, i) => (
          <DenseItem
            key={i}
            item={it}
            mobile={mobile}
            bodyFs={bodyFs}
            subjectFs={subjectFs}
            isLast={i === section.items.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// ───────────── Single item ─────────────
function DenseItem({ item, mobile, bodyFs, subjectFs, isLast }) {
  return (
    <article
      style={{
        padding: `${mobile ? 12 : 14}px 0`,
        borderBottom: isLast ? "none" : "1px solid rgba(9,30,66,0.06)",
      }}
    >
      {/* Top meta row: @handle / subject / chips. Always one short line. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        {item.who && (
          <span
            style={{
              font: `600 ${mobile ? 11.5 : 12.5}px/1 var(--cw-font-micro)`,
              letterSpacing: "-0.01em",
              color: "var(--cw-indigo-9)",
            }}
          >
            <span
              style={{
                background: "var(--cw-gradient)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginRight: 1,
              }}
            >
              @
            </span>
            {item.who.replace(/^@/, "")}
          </span>
        )}
        {item.who && item.subject && (
          <span style={{ color: "rgba(9,30,66,0.25)", fontSize: 11 }}>·</span>
        )}
        {item.subject && (
          <span
            style={{
              font: `600 ${subjectFs}px/1.3 var(--cw-font-display)`,
              letterSpacing: "-0.015em",
              color: "var(--cw-indigo-9)",
            }}
          >
            {item.subject}
          </span>
        )}
        {item.stars && (
          <span
            style={{
              font: "500 10.5px/1 var(--cw-font-micro)",
              color: "rgba(37,56,88,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            ★ {item.stars}
          </span>
        )}
        {item.source && (
          <SourceMicro source={item.source} />
        )}
      </div>

      {/* Body text */}
      <p
        style={{
          margin: 0,
          font: `400 ${bodyFs}px/1.55 var(--cw-font-body)`,
          color: "var(--cw-indigo-8)",
          textWrap: "pretty",
        }}
      >
        {item.body}
        {item.link && (
          <>
            {" "}
            <a
              href={`https://${item.link}`}
              style={{
                color: "var(--cw-indigo-9)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(9,30,66,0.25)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {item.link}
              <span
                style={{
                  marginLeft: 3,
                  background: "var(--cw-gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ↗
              </span>
            </a>
          </>
        )}
      </p>
    </article>
  );
}

// ───────────── Tiny helpers ─────────────
function Stat({ n, label, emphasis }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 4,
        color: emphasis ? "var(--cw-indigo-9)" : "inherit",
      }}
    >
      <span
        style={{
          font: "700 13px/1 var(--cw-font-display)",
          color: emphasis ? "var(--cw-indigo-9)" : "var(--cw-indigo-9)",
          letterSpacing: "-0.02em",
        }}
      >
        {n}
      </span>
      <span
        style={{
          font: "400 11px/1 var(--cw-font-body)",
          color: "rgba(37,56,88,0.65)",
        }}
      >
        {label}
      </span>
    </span>
  );
}

function Sep() {
  return (
    <span
      style={{
        width: 1,
        height: 10,
        background: "rgba(9,30,66,0.15)",
      }}
    />
  );
}

function SourceMicro({ source }) {
  const isGH = source === "GitHub";
  const dot = isGH ? "#6438D0" : source === "Codeberg" ? "#2185D0" : "#FF6600";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        font: "500 10px/1 var(--cw-font-micro)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "rgba(37,56,88,0.65)",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: dot,
        }}
      />
      {source}
    </span>
  );
}

function DenseChip({ children }) {
  return (
    <span
      style={{
        font: "500 11px/1 var(--cw-font-micro)",
        color: "var(--cw-indigo-9)",
        padding: "7px 10px",
        borderRadius: 999,
        background: "rgba(9,30,66,0.05)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

Object.assign(window, { LaunchRadarDense });
