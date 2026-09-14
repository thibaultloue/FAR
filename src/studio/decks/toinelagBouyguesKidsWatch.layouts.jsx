import { Body, Display, FarMark, Kicker, Photo, Reveal, Source } from "../primitives.jsx";
import { asset } from "../asset.js";

const CYAN = "#009CCC";
const ORANGE = "#E8580C";
const NIGHT = "#071E32";
const PAPER = "#F5F8FA";
const PAD = "calc(56px * var(--fs-u))";

function Lines({ text, as = "h1", style }) {
  return (
    <Display as={as} size="md" style={style}>
      {String(text).split("\n").map((line) => (
        <span key={line} style={{ display: "block" }}>{line}</span>
      ))}
    </Display>
  );
}

function Foot({ source, sourceLinks }) {
  if (!source && !sourceLinks?.length) return null;
  return (
    <Source>
      {sourceLinks?.map((it, i) => (
        <span key={it.label}>
          {i ? " · " : ""}
          {it.href ? (
            <a href={it.href} target="_blank" rel="noreferrer">{it.label}</a>
          ) : it.label}
        </span>
      ))}
      {source ? <span>{sourceLinks?.length ? " · " : ""}{source}</span> : null}
    </Source>
  );
}

function PlayGlyph({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="23" fill="rgba(7,30,50,.5)" stroke={CYAN} strokeWidth="1.5" />
      <polygon points="20,15 20,33 34,24" fill={PAPER} />
    </svg>
  );
}

function WatchGlyph({ size = 54 }) {
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 72 92" aria-hidden>
      <rect x="26" y="2" width="20" height="12" rx="3" fill={NIGHT} />
      <rect x="16" y="14" width="40" height="52" rx="11" fill={NIGHT} />
      <rect x="24" y="22" width="24" height="24" rx="4" fill={CYAN} opacity="0.35" />
      <rect x="24" y="22" width="24" height="24" rx="4" fill="none" stroke={CYAN} strokeWidth="1.5" />
      <rect x="26" y="68" width="20" height="22" rx="3" fill={NIGHT} />
    </svg>
  );
}

function PhoneGlyph({ size = 36 }) {
  return (
    <svg width={size} height={size * 1.8} viewBox="0 0 40 72" aria-hidden>
      <rect x="2" y="2" width="36" height="68" rx="6" fill={NIGHT} />
      <rect x="8" y="10" width="24" height="40" rx="2" fill={CYAN} opacity="0.28" />
      <circle cx="20" cy="60" r="4" fill="none" stroke={PAPER} strokeWidth="1.5" />
    </svg>
  );
}

/** S2 — ampleur chaîne + audience, portrait au tiers. */
export function CreatorScale({ slide }) {
  const power = (slide.metrics || []).filter((m) => m.group === "power");
  const audience = (slide.metrics || []).filter((m) => m.group === "audience");
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: PAD, background: PAPER, color: NIGHT }}>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, gap: "calc(36px * var(--fs-u))" }}>
          <Photo
            src={slide.photo.src}
            alt={slide.photo.alt}
            focus={slide.photo.focus}
            credit={slide.photo.credit}
            style={{ gridColumn: "1 / 5", height: "100%", borderRadius: "var(--fs-radius)" }}
          />
          <div style={{ gridColumn: "5 / 13", display: "flex", flexDirection: "column", minHeight: 0, minWidth: 0 }}>
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display size="md" style={{ marginTop: 6, fontSize: "calc(44px * var(--fs-u))", maxWidth: "12em", lineHeight: 1.04 }}>
              {slide.title}
            </Display>
            <Body style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", maxWidth: "32em", lineHeight: 1.35 }}>
              {slide.body}
            </Body>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "calc(8px * var(--fs-u)) calc(28px * var(--fs-u))", marginTop: "calc(28px * var(--fs-u))" }}>
              {power.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(64px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.05em", lineHeight: 0.92, color: NIGHT }}>
                    {m.value}
                  </div>
                  <div className="far-studio-caption" style={{ marginTop: 8, fontSize: "calc(16px * var(--fs-u))", color: "rgba(26,26,26,.55)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(26,26,26,.14)", margin: "calc(18px * var(--fs-u)) 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "calc(8px * var(--fs-u)) calc(28px * var(--fs-u))" }}>
              {audience.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(44px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                    {m.value}
                  </div>
                  <div className="far-studio-caption" style={{ marginTop: 6, fontSize: "calc(16px * var(--fs-u))", color: "rgba(26,26,26,.55)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            {slide.conclusion ? (
              <Body lead style={{ marginTop: "auto", paddingTop: "calc(18px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", maxWidth: "28em" }}>
                {slide.conclusion}
              </Body>
            ) : null}
          </div>
        </div>
        <Foot source={slide.source} sourceLinks={slide.sourceLinks} />
      </div>
    </Reveal>
  );
}

function YtThumb({ item, featured }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 0,
        flex: featured ? 1 : undefined,
        aspectRatio: featured ? undefined : "16 / 9",
        background: "#041018",
        overflow: "hidden",
        borderRadius: "calc(10px * var(--fs-u))",
      }}
    >
      <img
        src={asset(item.thumb.src)}
        alt={item.thumb.alt}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
      {featured ? (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <PlayGlyph size={52} />
        </div>
      ) : null}
    </div>
  );
}

function YtMeta({ item, featured }) {
  return (
    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 3, flexShrink: 0 }}>
      {item.channel ? (
        <div style={{ fontSize: "calc(12px * var(--fs-u))", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,248,250,.55)" }}>
          YouTube · {item.channel}
        </div>
      ) : null}
      <div style={{ fontFamily: "var(--fs-font-display)", fontSize: featured ? "calc(20px * var(--fs-u))" : "calc(17px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, color: PAPER }}>
        {item.title}
      </div>
      <div style={{ fontSize: "calc(16px * var(--fs-u))", color: CYAN, fontWeight: 650 }}>
        {item.views}
        {item.note ? <span style={{ color: "rgba(245,248,250,.55)", fontWeight: 400 }}> · {item.note}</span> : null}
      </div>
    </div>
  );
}

function YtLink({ item, featured, children }) {
  const style = {
    color: "inherit",
    textDecoration: "none",
    display: featured ? "flex" : "grid",
    flexDirection: featured ? "column" : undefined,
    gridTemplateColumns: featured ? undefined : "44% 1fr",
    gap: featured ? "calc(8px * var(--fs-u))" : "calc(12px * var(--fs-u))",
    alignItems: featured ? undefined : "center",
    minWidth: 0,
    minHeight: 0,
    height: featured ? "100%" : undefined,
  };
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" style={style} className="far-studio-plain-btn">
        {children}
      </a>
    );
  }
  return <div style={style}>{children}</div>;
}

/** S3 — YouTube réel : 16:9 intactes, titres complets, vues en métadonnées. */
export function YoutubeProof({ slide }) {
  const featured = slide.featured;
  const rail = slide.rail || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: "calc(40px * var(--fs-u)) calc(48px * var(--fs-u)) calc(22px * var(--fs-u))", background: NIGHT, color: PAPER }}>
        <div style={{ flexShrink: 0, maxWidth: "34em" }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="md" style={{ marginTop: 6, fontSize: "calc(36px * var(--fs-u))", color: "inherit", lineHeight: 1.08 }}>
            {slide.title}
          </Display>
          {slide.subtitle ? (
            <Body style={{ margin: "8px 0 0", fontSize: "calc(20px * var(--fs-u))", color: "rgba(245,248,250,.78)", maxWidth: "32em" }}>
              {slide.subtitle}
            </Body>
          ) : null}
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "52% 1fr", gap: "calc(22px * var(--fs-u))", marginTop: "calc(12px * var(--fs-u))", alignItems: "stretch" }}>
          <YtLink item={featured} featured>
            <YtThumb item={featured} featured />
            <YtMeta item={featured} featured />
          </YtLink>
          <div style={{ display: "flex", flexDirection: "column", gap: "calc(14px * var(--fs-u))", minHeight: 0, justifyContent: "center" }}>
            {rail.map((item) => (
              <YtLink key={item.id} item={item}>
                <YtThumb item={item} />
                <YtMeta item={item} />
              </YtLink>
            ))}
          </div>
        </div>
        {slide.quote ? (
          <div style={{ marginTop: "calc(14px * var(--fs-u))", paddingTop: "calc(12px * var(--fs-u))", borderTop: "1px solid rgba(245,248,250,.16)", flexShrink: 0 }}>
            <div className="far-studio-caption" style={{ color: CYAN, letterSpacing: "0.08em", textTransform: "uppercase" }}>{slide.quote.label}</div>
            <Body style={{ margin: "6px 0 0", fontSize: "calc(20px * var(--fs-u))", color: "inherit", fontStyle: "italic", maxWidth: "40em" }}>
              « {slide.quote.text} »
            </Body>
            <div className="far-studio-caption" style={{ marginTop: 4, color: "rgba(245,248,250,.5)" }}>{slide.quote.attr}</div>
          </div>
        ) : null}
        <Foot source={slide.source} sourceLinks={slide.sourceLinks} />
      </div>
    </Reveal>
  );
}

/** S4 — synergie format × produit, aucune photo. */
export function FormatProductFit({ slide }) {
  const format = slide.format || {};
  const product = slide.product || {};
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: PAD, background: PAPER, color: NIGHT }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Lines text={slide.title} style={{ marginTop: 6, fontSize: "calc(44px * var(--fs-u))", lineHeight: 1.05, maxWidth: "16em" }} />
        {slide.hook ? (
          <Body lead style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", maxWidth: "34em" }}>
            {slide.hook}
          </Body>
        ) : null}
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "calc(18px * var(--fs-u))", marginTop: "calc(22px * var(--fs-u))", alignItems: "stretch" }}>
          <FitColumn kicker={format.kicker} lines={format.lines} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "calc(10px * var(--fs-u))", minWidth: "calc(72px * var(--fs-u))" }}>
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(42px * var(--fs-u))", fontWeight: 750, color: CYAN, lineHeight: 1 }}>×</div>
            <svg width="2" height="100%" viewBox="0 0 2 120" preserveAspectRatio="none" aria-hidden style={{ flex: 1, minHeight: 48, overflow: "visible" }}>
              <line x1="1" y1="0" x2="1" y2="120" stroke={CYAN} strokeWidth="2" />
            </svg>
          </div>
          <FitColumn kicker={product.kicker} lines={product.lines} />
        </div>
        <div style={{ marginTop: "calc(8px * var(--fs-u))", borderTop: `3px solid ${CYAN}`, paddingTop: "calc(14px * var(--fs-u))" }}>
          <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(13px * var(--fs-u))", fontWeight: 650, letterSpacing: "0.14em", textTransform: "uppercase", color: CYAN }}>
            {slide.equation}
          </div>
          <Lines text={slide.conclusion} style={{ marginTop: 6, fontSize: "calc(32px * var(--fs-u))", lineHeight: 1.12, maxWidth: "22em" }} />
        </div>
        <div style={{ display: "flex", gap: "calc(32px * var(--fs-u))", marginTop: "calc(16px * var(--fs-u))", paddingTop: "calc(12px * var(--fs-u))", borderTop: "1px solid rgba(26,26,26,.12)" }}>
          {(slide.readings || []).map((r) => (
            <div key={r.kicker} style={{ flex: 1, minWidth: 0 }}>
              <Kicker>{r.kicker}</Kicker>
              <Body style={{ margin: "6px 0 0", fontSize: "calc(18px * var(--fs-u))", lineHeight: 1.35 }}>{r.body}</Body>
            </div>
          ))}
        </div>
        {slide.targeting ? (
          <div className="far-studio-caption" style={{ marginTop: "calc(10px * var(--fs-u))", fontSize: "calc(14px * var(--fs-u))" }}>
            {slide.targeting}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function FitColumn({ kicker, lines }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: "calc(4px * var(--fs-u))" }}>
      <Kicker>{kicker}</Kicker>
      <div style={{ marginTop: "calc(12px * var(--fs-u))", display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))" }}>
        {(lines || []).map((line) => (
          <div key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 18, height: 2, background: CYAN, marginTop: 11, flexShrink: 0 }} />
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.25 }}>
              {line}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloorPlanSvg() {
  return (
    <svg viewBox="0 0 640 360" width="100%" height="100%" aria-hidden style={{ display: "block" }}>
      <rect x="12" y="12" width="616" height="336" rx="10" fill="#E7EEF2" stroke={NIGHT} strokeWidth="2" />
      <text x="28" y="36" fill={NIGHT} fontSize="13" letterSpacing="1.4" fontFamily="Figtree, sans-serif">PIÈCE SECRÈTE</text>
      <rect x="36" y="56" width="160" height="130" rx="6" fill={PAPER} stroke={NIGHT} strokeWidth="1.8" />
      <rect x="52" y="118" width="128" height="50" rx="3" fill="none" stroke={CYAN} strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="116" cy="143" r="4" fill={CYAN} />
      <text x="116" y="80" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif">01</text>
      <text x="116" y="200" textAnchor="middle" fill={NIGHT} fontSize="13" fontFamily="Figtree, sans-serif">Meuble · cachette</text>
      <rect x="236" y="48" width="168" height="112" rx="4" fill={PAPER} stroke={NIGHT} strokeWidth="1.8" />
      <polygon points="268,132 296,72 324,132" fill="none" stroke={NIGHT} strokeWidth="2" />
      <circle cx="360" cy="102" r="22" fill="none" stroke={NIGHT} strokeWidth="2" />
      <rect x="392" y="80" width="36" height="36" fill="none" stroke={NIGHT} strokeWidth="2" />
      <text x="320" y="40" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif">02</text>
      <text x="320" y="180" textAnchor="middle" fill={NIGHT} fontSize="13" fontFamily="Figtree, sans-serif">Panneau de symboles</text>
      <rect x="460" y="88" width="140" height="200" rx="4" fill={PAPER} stroke={NIGHT} strokeWidth="1.8" />
      <g fill="none" stroke={CYAN} strokeWidth="2">
        <circle cx="496" cy="188" r="14" />
        <circle cx="530" cy="188" r="14" />
        <circle cx="564" cy="188" r="14" />
      </g>
      <g stroke={NIGHT} strokeWidth="1.6">
        <line x1="496" y1="188" x2="506" y2="178" />
        <line x1="530" y1="188" x2="540" y2="178" />
        <line x1="564" y1="188" x2="574" y2="178" />
      </g>
      <text x="530" y="80" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif">03</text>
      <text x="530" y="310" textAnchor="middle" fill={NIGHT} fontSize="13" fontFamily="Figtree, sans-serif">Porte · 3 molettes</text>
      <path d="M116 196 C116 250, 320 230, 320 196 C320 250, 530 250, 530 298" fill="none" stroke={CYAN} strokeWidth="2.4" />
      <circle cx="116" cy="196" r="5" fill={CYAN} />
      <circle cx="320" cy="196" r="5" fill={CYAN} />
      <circle cx="530" cy="298" r="5" fill={CYAN} />
    </svg>
  );
}

function AccomplicePlanSvg() {
  return (
    <svg viewBox="0 0 280 160" width="100%" height="100%" aria-hidden style={{ display: "block" }}>
      <rect x="8" y="8" width="264" height="144" rx="6" fill={PAPER} stroke={NIGHT} strokeWidth="1.6" />
      <rect x="24" y="28" width="64" height="48" fill="none" stroke={CYAN} strokeWidth="1.6" />
      <text x="56" y="56" textAnchor="middle" fontSize="12" fill={NIGHT} fontFamily="Figtree, sans-serif">01</text>
      <rect x="108" y="28" width="64" height="48" fill="none" stroke={NIGHT} strokeWidth="1.5" />
      <text x="140" y="56" textAnchor="middle" fontSize="12" fill={NIGHT} fontFamily="Figtree, sans-serif">02</text>
      <rect x="192" y="28" width="56" height="80" fill="none" stroke={NIGHT} strokeWidth="1.5" />
      <text x="220" y="72" textAnchor="middle" fontSize="12" fill={NIGHT} fontFamily="Figtree, sans-serif">03</text>
      <path d="M56 84 H140 H220" fill="none" stroke={CYAN} strokeWidth="1.6" />
      <text x="140" y="140" textAnchor="middle" fontSize="11" fill={NIGHT} fontFamily="Figtree, sans-serif">Plan distant · même décor</text>
    </svg>
  );
}

/** S5 — plan de jeu illustré, sans photographie. */
export function GameBoard({ slide }) {
  const steps = slide.steps || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: "calc(36px * var(--fs-u)) calc(44px * var(--fs-u)) calc(18px * var(--fs-u))", background: PAPER, color: NIGHT }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexShrink: 0 }}>
          <div>
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Lines text={slide.title} style={{ marginTop: 4, fontSize: "calc(34px * var(--fs-u))", lineHeight: 1.06 }} />
          </div>
          {slide.rule ? (
            <Body style={{ margin: 0, fontSize: "calc(18px * var(--fs-u))", maxWidth: "22em", textAlign: "right" }}>{slide.rule}</Body>
          ) : null}
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.35fr calc(72px * var(--fs-u)) 0.95fr", gap: "calc(12px * var(--fs-u))", marginTop: "calc(12px * var(--fs-u))" }}>
          <div style={{ minHeight: 0, borderRadius: "var(--fs-radius)", overflow: "hidden", background: "#E7EEF2" }}>
            <FloorPlanSvg />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <WatchGlyph size={44} />
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(11px * var(--fs-u))", fontWeight: 650, letterSpacing: "0.1em", textTransform: "uppercase", color: CYAN, textAlign: "center", lineHeight: 1.3 }}>
              montre ↔ téléphone
            </div>
            <svg width="100%" height="6" viewBox="0 0 80 6" aria-hidden>
              <line x1="0" y1="3" x2="80" y2="3" stroke={CYAN} strokeWidth="2" />
            </svg>
            <PhoneGlyph size={26} />
          </div>
          <div style={{ border: "1px solid rgba(26,26,26,.14)", borderRadius: "var(--fs-radius)", padding: "calc(12px * var(--fs-u))", display: "flex", flexDirection: "column", minHeight: 0, background: "#FFF", gap: "calc(8px * var(--fs-u))" }}>
            <Kicker>Poste du complice</Kicker>
            <div style={{ flex: "0 0 38%", minHeight: 0 }}><AccomplicePlanSvg /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {steps.map((step) => (
                <div key={step.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(14px * var(--fs-u))", fontWeight: 750, color: CYAN }}>{step.n}</span>
                  <span style={{ fontSize: "calc(14px * var(--fs-u))", lineHeight: 1.3 }}>
                    <strong>{step.title}</strong> · {step.channel}
                  </span>
                </div>
              ))}
            </div>
            <Body style={{ marginTop: "auto", fontSize: "calc(14px * var(--fs-u))", lineHeight: 1.35 }}>{slide.accompliceNote}</Body>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "calc(16px * var(--fs-u))", marginTop: "calc(10px * var(--fs-u))", flexShrink: 0 }}>
          {steps.map((step) => (
            <Body key={step.id} style={{ margin: 0, fontSize: "calc(15px * var(--fs-u))", lineHeight: 1.35 }}>{step.body}</Body>
          ))}
        </div>
        {slide.payoff ? (
          <Body lead style={{ margin: "calc(8px * var(--fs-u)) 0 0", fontSize: "calc(20px * var(--fs-u))" }}>{slide.payoff}</Body>
        ) : null}
        {slide.schemaNote ? (
          <div className="far-studio-caption" style={{ marginTop: 4 }}>{slide.schemaNote}</div>
        ) : null}
      </div>
    </Reveal>
  );
}

function Annot({ item, side }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: side === "right" ? "right" : "left", flexDirection: side === "right" ? "row-reverse" : "row" }}>
      <div style={{ width: 28, height: 1, background: side === "left" ? CYAN : ORANGE, marginTop: 12, flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
          {item.title}
        </div>
        <Body style={{ margin: "4px 0 0", fontSize: "calc(16px * var(--fs-u))", lineHeight: 1.35 }}>{item.body}</Body>
      </div>
    </div>
  );
}

/** S6 — produit annoté, un visuel officiel, pas de mosaïque. */
export function ProductAnnotate({ slide }) {
  const left = slide.game || [];
  const right = slide.parents || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: PAD, background: PAPER, color: NIGHT }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Lines text={slide.title} style={{ marginTop: 4, fontSize: "calc(40px * var(--fs-u))", lineHeight: 1.05 }} />
        {slide.definition ? (
          <Body style={{ marginTop: 8, fontSize: "calc(20px * var(--fs-u))", maxWidth: "36em" }}>{slide.definition}</Body>
        ) : null}
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1.35fr 1fr", gap: "calc(16px * var(--fs-u))", marginTop: "calc(12px * var(--fs-u))", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "calc(16px * var(--fs-u))", justifyContent: "center" }}>
            <Kicker>Ce qu’elle apporte au jeu</Kicker>
            {left.map((item) => <Annot key={item.title} item={item} side="left" />)}
          </div>
          <div style={{ minHeight: 0, height: "100%", borderRadius: "var(--fs-radius)", overflow: "hidden", background: "#E8E4DC" }}>
            <img
              src={asset(slide.product.src)}
              alt={slide.product.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "calc(16px * var(--fs-u))", justifyContent: "center" }}>
            <Kicker>Ce que les parents comprennent</Kicker>
            {right.map((item) => <Annot key={item.title} item={item} side="right" />)}
          </div>
        </div>
        {slide.conclusion ? (
          <Body lead style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", maxWidth: "34em" }}>
            {slide.conclusion}
          </Body>
        ) : null}
        {slide.modelNote ? <div className="far-studio-caption" style={{ marginTop: 4 }}>{slide.modelNote}</div> : null}
        <Foot source={slide.source} sourceLinks={slide.sourceLinks} />
      </div>
    </Reveal>
  );
}

/** S7 — 1 vidéo socle + deux options, aucune photo. */
export function DeviceArch({ slide }) {
  const core = slide.core || {};
  const branches = slide.branches || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: PAD, background: PAPER, color: NIGHT }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Lines text={slide.title} style={{ marginTop: 4, fontSize: "calc(40px * var(--fs-u))", lineHeight: 1.05 }} />
        <div
          style={{
            flex: "1.15 1 0",
            minHeight: 0,
            marginTop: "calc(16px * var(--fs-u))",
            border: `2px solid ${NIGHT}`,
            borderRadius: "var(--fs-radius)",
            padding: "calc(20px * var(--fs-u)) calc(24px * var(--fs-u))",
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr",
            gap: "calc(20px * var(--fs-u))",
            alignItems: "center",
          }}
        >
          <div>
            <Kicker>Socle proposé</Kicker>
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(36px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 8 }}>
              {core.title}
            </div>
            <Body style={{ marginTop: 10, fontSize: "calc(20px * var(--fs-u))", maxWidth: "28em" }}>{core.body}</Body>
            <Body style={{ marginTop: 8, fontSize: "calc(18px * var(--fs-u))", maxWidth: "30em" }}>{core.role}</Body>
          </div>
          <div style={{ border: `1.5px solid ${CYAN}`, borderRadius: 8, aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center", background: NIGHT, color: PAPER }}>
            <div style={{ textAlign: "center" }}>
              <PlayGlyph size={40} />
              <div style={{ marginTop: 8, fontSize: "calc(13px * var(--fs-u))", letterSpacing: "0.1em", textTransform: "uppercase", color: CYAN }}>16:9 · chaîne principale</div>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 400 28" width="100%" height="28" aria-hidden>
          <line x1="200" y1="0" x2="200" y2="12" stroke={NIGHT} strokeWidth="2" />
          <line x1="80" y1="12" x2="320" y2="12" stroke={NIGHT} strokeWidth="2" strokeDasharray="5 4" />
          <line x1="80" y1="12" x2="80" y2="28" stroke={NIGHT} strokeWidth="2" strokeDasharray="5 4" />
          <line x1="320" y1="12" x2="320" y2="28" stroke={NIGHT} strokeWidth="2" strokeDasharray="5 4" />
        </svg>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "calc(18px * var(--fs-u))", flex: "0.85 1 0", minHeight: 0 }}>
          {branches.map((b, i) => (
            <div key={b.id} style={{ border: `1px dashed rgba(26,26,26,.28)`, borderRadius: "var(--fs-radius)", padding: "calc(14px * var(--fs-u))", display: "grid", gridTemplateColumns: "auto 1fr", gap: "calc(14px * var(--fs-u))", alignItems: "center" }}>
              {i === 0 ? (
                <div style={{ width: "calc(42px * var(--fs-u))", aspectRatio: "9 / 16", border: `1.5px solid ${CYAN}`, borderRadius: 6, background: NIGHT }} />
              ) : (
                <svg width="88" height="52" viewBox="0 0 88 52" aria-hidden>
                  <rect x="4" y="8" width="28" height="36" rx="3" fill="none" stroke={NIGHT} strokeWidth="1.5" />
                  <rect x="56" y="8" width="28" height="36" rx="3" fill="none" stroke={NIGHT} strokeWidth="1.5" />
                  <line x1="32" y1="26" x2="56" y2="26" stroke={CYAN} strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              )}
              <div>
                <div style={{ fontSize: "calc(12px * var(--fs-u))", letterSpacing: "0.12em", textTransform: "uppercase", color: ORANGE, fontWeight: 650 }}>Option</div>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(20px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>{b.title}</div>
                <Body style={{ margin: "6px 0 0", fontSize: "calc(16px * var(--fs-u))", lineHeight: 1.35 }}>{b.body}</Body>
              </div>
            </div>
          ))}
        </div>
        {slide.benefit ? (
          <Body lead style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))", maxWidth: "38em" }}>{slide.benefit}</Body>
        ) : null}
        {slide.note ? <div className="far-studio-caption" style={{ marginTop: 6 }}>{slide.note}</div> : null}
      </div>
    </Reveal>
  );
}

/** S8 — calendrier vertical + décisions, aucune photo. */
export function CloseTimeline({ slide, theme }) {
  const steps = slide.steps || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: PAD, background: NIGHT, color: PAPER }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={64} />
        </div>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ marginTop: 6, fontSize: "calc(36px * var(--fs-u))", color: "inherit", maxWidth: "16em" }}>
          {slide.title}
        </Display>
        {slide.window ? (
          <div style={{ marginTop: 8, fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 650, color: CYAN }}>
            {slide.window}
          </div>
        ) : null}
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, marginTop: "calc(18px * var(--fs-u))", gap: "calc(28px * var(--fs-u))" }}>
          <div style={{ gridColumn: "1 / 9", display: "flex", flexDirection: "column", position: "relative", paddingLeft: "calc(22px * var(--fs-u))" }}>
            <div aria-hidden style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: "rgba(0,156,204,.45)" }} />
            {steps.map((st) => (
              <div key={st.when} style={{ position: "relative", paddingBottom: "calc(16px * var(--fs-u))", flex: 1, minHeight: 0 }}>
                <div style={{ position: "absolute", left: "calc(-22px * var(--fs-u) + 1px)", top: 6, width: 10, height: 10, borderRadius: "50%", background: CYAN }} />
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(16px * var(--fs-u))", fontWeight: 750, letterSpacing: "0.06em", textTransform: "uppercase", color: CYAN }}>
                  {st.when}
                </div>
                <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {(st.bullets || []).map((b) => (
                    <li key={b} style={{ display: "flex", gap: 8, fontSize: "calc(18px * var(--fs-u))", lineHeight: 1.35 }}>
                      <span style={{ color: ORANGE, flexShrink: 0 }}>·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ gridColumn: "9 / 13", display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(245,248,250,.16)", paddingLeft: "calc(22px * var(--fs-u))" }}>
            <Kicker>À valider ensemble</Kicker>
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(26px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginTop: 10, whiteSpace: "pre-line" }}>
              {slide.action}
            </div>
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 650 }}>{slide.org}</div>
              <Body style={{ margin: "4px 0 0", fontSize: "calc(18px * var(--fs-u))", color: "inherit" }}>{slide.contactName}</Body>
              {slide.contactHref ? (
                <a className="far-studio-mail" href={slide.contactHref} style={{ display: "inline-block", marginTop: 6, fontSize: "calc(16px * var(--fs-u))", color: "inherit" }}>
                  {slide.contactDetail}
                </a>
              ) : null}
            </div>
          </div>
        </div>
        {slide.disclaimer ? (
          <div className="far-studio-caption" style={{ marginTop: "calc(10px * var(--fs-u))", color: "rgba(245,248,250,.45)" }}>{slide.disclaimer}</div>
        ) : null}
      </div>
    </Reveal>
  );
}
