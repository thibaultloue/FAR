import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resolveTheme } from "./themes.js";
import { renderLayout } from "./compositions.jsx";
import { prefersReducedMotion } from "./asset.js";

const REF_H = 765;

export function StudioReader({ deck, onBack, locked }) {
  const slides = deck.slides;
  const hashBase = deck.id;
  const [curId, setCurId] = useState(() => readSlideRef(slides, window.location.hash));
  const [toc, setToc] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const index = Math.max(0, slides.findIndex((s) => s.id === curId));
  const slide = slides[index] || slides[0];
  const theme = resolveTheme(slide.theme || deck.theme, deck.themeOverrides);
  const n = slides.length;
  const dialogBtn = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const [frame, setFrame] = useState({ w: REF_H * (16 / 9), h: REF_H, u: 1 });

  const go = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(next, n - 1));
      const id = slides[clamped].id;
      setCurId(id);
      setDialog(null);
      const url = new URL(window.location.href);
      url.hash = `#${hashBase}/${id}`;
      window.history.replaceState(null, "", url.toString());
    },
    [hashBase, n, slides],
  );

  useEffect(() => {
    const onHash = () => {
      const id = readSlideRef(slides, window.location.hash);
      setCurId((prev) => (prev === id ? prev : id));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [slides]);

  useEffect(() => {
    document.documentElement.setAttribute("data-far-studio", "1");
    document.documentElement.setAttribute("data-far-deck", deck.id);
    return () => {
      document.documentElement.removeAttribute("data-far-studio");
      document.documentElement.removeAttribute("data-far-deck");
    };
  }, [deck.id]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const apply = () => {
      const aw = stage.clientWidth;
      const ah = stage.clientHeight;
      const w = Math.max(1, Math.min(aw, (ah * 16) / 9));
      const h = w * (9 / 16);
      setFrame({ w, h, u: h / REF_H });
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const onKey = useCallback(
    (e) => {
      const el = e.target;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) return;
      if (dialog && (e.key === "Escape" || e.key === "Enter")) {
        e.preventDefault();
        setDialog(null);
        return;
      }
      if (toc && e.key === "Escape") {
        e.preventDefault();
        setToc(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Escape" && !locked && onBack) {
        onBack();
      }
    },
    [dialog, go, index, locked, onBack, toc],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    if (!dialog) return;
    dialogBtn.current?.focus();
  }, [dialog]);

  const reduce = prefersReducedMotion();
  const ctx = useMemo(
    () => ({
      theme,
      onOpen: (d) => setDialog(d),
      activeId: dialog?.title,
    }),
    [dialog, theme],
  );

  const enterFs = async () => {
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      await root.requestFullscreen?.();
      setExpanded(true);
    } else {
      await document.exitFullscreen?.();
      setExpanded(false);
    }
  };

  return (
    <div
      className="far-studio"
      data-theme={theme.id}
      data-engine="far-studio-v1"
      style={{
        "--fs-accent": theme.accent,
        "--fs-accent-soft": `color-mix(in srgb, ${theme.accent} 18%, transparent)`,
        "--fs-page": theme.page,
        "--fs-slide": theme.slide,
        "--fs-ink": theme.ink,
      }}
    >
      <div className="far-studio-shell" style={{ "--fs-u": frame.u, background: theme.page }}>
        <header className="far-studio-header far-chrome far-studio-chrome">
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            {!locked && onBack ? (
              <button type="button" className="far-studio-btn" onClick={onBack}>
                ← Retour
              </button>
            ) : null}
            <strong style={{ fontFamily: "var(--fs-font-display)", fontSize: 16, letterSpacing: "-0.03em" }}>{deck.title}</strong>
            <span className="far-studio-caption">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="far-studio-progress" aria-hidden>
            <span style={{ width: `${((index + 1) / n) * 100}%` }} />
          </div>
        </header>

        <div className="far-studio-stage" ref={stageRef}>
          <div
            ref={frameRef}
            className="far-studio-frame"
            data-ratio="16/9"
            style={{
              width: frame.w,
              aspectRatio: "16 / 9",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              boxSizing: "border-box",
              background: "var(--fs-slide)",
            }}
          >
            <div
              className="far-studio-canvas far-slide-inner"
              data-slide-id={slide.id}
              style={{ "--fs-u": frame.u }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  {renderLayout(slide, ctx)}
                </motion.div>
              </AnimatePresence>
              {dialog ? (
                <div className="far-studio-dialog-root" role="presentation" onClick={() => setDialog(null)}>
                  <div
                    className="far-studio-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="fs-dialog-title"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 id="fs-dialog-title" className="far-studio-display far-studio-title-md">{dialog.title}</h2>
                    <p className="far-studio-body" style={{ marginTop: 12 }}>{dialog.body}</p>
                    <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
                      {dialog.href ? (
                        <a className="far-studio-btn" href={dialog.href} target="_blank" rel="noreferrer">
                          {dialog.hrefLabel || "Ouvrir le lien"}
                        </a>
                      ) : null}
                      <button ref={dialogBtn} type="button" className="far-studio-btn" onClick={() => setDialog(null)}>
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {toc ? (
                <nav className="far-studio-toc far-chrome" aria-label="Sommaire">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        go(i);
                        setToc(false);
                      }}
                      className="far-studio-btn"
                      style={{
                        display: "block",
                        width: "calc(100% - 24px)",
                        margin: "4px 12px",
                        textAlign: "left",
                        opacity: s.id === slide.id ? 1 : 0.55,
                        borderColor: s.id === slide.id ? "var(--fs-accent)" : "transparent",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} · {s.title || s.id}
                    </button>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
        </div>

        <div className="far-studio-dock far-chrome far-studio-chrome">
          <button type="button" className="far-studio-btn" onClick={() => setToc((v) => !v)}>
            Sommaire
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="far-studio-btn" disabled={index === 0} onClick={() => go(index - 1)}>
              ←
            </button>
            <button type="button" className="far-studio-btn" disabled={index === n - 1} onClick={() => go(index + 1)}>
              →
            </button>
          </div>
          <button type="button" className="far-studio-btn" onClick={enterFs}>
            {expanded ? "Quitter" : "Agrandir"}
          </button>
        </div>
      </div>
    </div>
  );
}

function readSlideRef(slides, hash) {
  const raw = (hash || "").replace(/^#/, "").split("/")[1];
  if (!raw) return slides[0]?.id;
  const asNum = parseInt(raw, 10);
  if (String(asNum) === raw && asNum >= 0 && asNum < slides.length) return slides[asNum].id;
  const hit = slides.find((s) => s.id === raw);
  return hit ? hit.id : slides[0]?.id;
}

export function isStudioDeckId(id, registry) {
  return Boolean(id && registry?.[id]);
}
