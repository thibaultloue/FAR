import { FarMark, Photo, Reveal } from "../primitives.jsx";
import { asset } from "../asset.js";
import { ASSETS } from "./toinelagBouyguesKidsWatch.assets.js";
import { ASSETS as SFR_ASSETS } from "./toinelagSfrKidsWatch.assets.js";
import { ASSETS as MSC_ASSETS } from "./cyrilMscYachtClub.assets.js";
import "./toinelagBouyguesKidsWatch.css";

const CYAN = "#009CCC";
const PAPER = "#F5F8FA";

function brandOf(slide) {
  if (slide?.brand === "sfr") {
    return { deck: "toinelag-sfr", logo: SFR_ASSETS.logoSfr, accent: "#EB0004" };
  }
  if (slide?.brand === "msc") {
    return { deck: "cyril-msc", logo: MSC_ASSETS.logoMsc, accent: "#C6A15A" };
  }
  return { deck: "toinelag-bt", logo: ASSETS.logoBouygues, accent: CYAN };
}

function PlayGlyph({ size = 42, color = CYAN }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="23" fill="rgba(7,30,50,.55)" stroke={color} strokeWidth="1.5" />
      <polygon points="20,15 20,33 34,24" fill={PAPER} />
    </svg>
  );
}

function BtLogo({ className = "", tone = "color", logo = ASSETS.logoBouygues }) {
  return (
    <img
      className={className}
      src={asset(logo.src)}
      alt={logo.alt}
      draggable={false}
      style={tone === "white" && !logo.keepOnDark ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

function BtSlide({ id, ink = false, wd = false, deck = "toinelag-bt", children }) {
  return (
    <div data-deck={deck} className="toinelag-bt">
      <section className={`bt-slide${ink ? " is-ink" : ""}${wd ? " is-wd" : ""}`} data-slide-id={id}>
        {children}
      </section>
    </div>
  );
}

/** S2 — portrait + chiffres + insight parents. */
export function CreatorScale({ slide }) {
  const brand = brandOf(slide);
  const power = (slide.metrics || []).filter((m) => m.group === "power");
  const audience = (slide.metrics || []).filter((m) => m.group === "audience");
  return (
    <Reveal>
      <BtSlide id={slide.id || "creator"} deck={brand.deck}>
        <BtLogo className="bt-brand-corner" logo={brand.logo} />
        <figure className="bt-creator-photo">
          <Photo
            src={slide.photo.src}
            alt={slide.photo.alt}
            focus={slide.photo.focus}
            style={{ width: "100%", height: "100%", borderRadius: 0 }}
          />
        </figure>
        <div className="bt-creator-copy">
          <p className="bt-kicker">{slide.kicker}</p>
          <h1 className="bt-nowrap">{slide.title}</h1>
          <p className="bt-creator-body">
            {String(slide.body || "").split("\n").map((line) => (
              <span key={line} style={{ display: "block" }}>{line}</span>
            ))}
          </p>
          <div className="bt-metrics">
            {power.map((m) => (
              <div key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="bt-metrics is-secondary">
            {audience.map((m) => (
              <div key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          {slide.insight ? <p className="bt-creator-insight">{slide.insight}</p> : null}
          {slide.conclusion ? <p className="bt-creator-close">{slide.conclusion}</p> : null}
        </div>
      </BtSlide>
    </Reveal>
  );
}

/** S3 — expliquer le format, puis trois preuves YouTube. */
export function YoutubeProof({ slide }) {
  const brand = brandOf(slide);
  const videos = [slide.featured, ...(slide.rail || [])].filter(Boolean);
  return (
    <Reveal>
      <BtSlide id={slide.id || "proof"} ink deck={brand.deck}>
        <h1 data-section-title>{slide.title}</h1>
        <div className="bt-proof-cluster">
          {slide.definition ? <p className="bt-proof-def">{slide.definition}</p> : null}
          {slide.subtitle ? <p className="bt-lead is-on-dark">{slide.subtitle}</p> : null}
          <div className="bt-players">
            {videos.map((item) => {
              const inner = (
                <>
                  <div className="bt-player-frame">
                    <img src={asset(item.thumb.src)} alt={item.thumb.alt} draggable={false} />
                    <div className="bt-yt-play" aria-hidden>
                      <PlayGlyph size={44} color={brand.accent} />
                    </div>
                  </div>
                  <h2>{item.title}</h2>
                  <p>
                    {item.views}
                    {item.note ? <span> · {item.note}</span> : null}
                  </p>
                </>
              );
              return item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bt-player far-studio-plain-btn"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.id} className="bt-player">{inner}</div>
              );
            })}
          </div>
          {slide.message ? <p className="bt-proof-message">{slide.message}</p> : null}
        </div>
      </BtSlide>
    </Reveal>
  );
}

/** S5 — format recommandé, structure White Desert (hero + social). */
export function VideoFormat({ slide }) {
  const blocks = [
    { key: "hero", data: slide.hero },
    { key: "moments", data: slide.moments },
    { key: "social", data: slide.social },
    { key: "options", data: slide.options },
  ].filter((b) => b.data);
  const brand = brandOf(slide);
  const left = blocks.filter((b) => b.key === "hero" || b.key === "moments");
  const right = blocks.filter((b) => b.key === "social" || b.key === "options");
  return (
    <Reveal>
      <BtSlide id={slide.id || "idea"} wd deck={brand.deck}>
        <BtLogo className="bt-brand-corner" tone="white" logo={brand.logo} />
        <p className="bt-kicker bt-abs-kicker">{slide.kicker || "Format recommandé"}</p>
        <h1 className="bt-fmt-title">{slide.title}</h1>
        <div className="bt-fmt-grid">
          <article>
            {left.map((b) => (
              <section key={b.key}>
                <span>{b.data.label}</span>
                {(b.data.lines || []).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </section>
            ))}
          </article>
          <article>
            {right.map((b) => (
              <section key={b.key}>
                <span>{b.data.label}</span>
                {(b.data.lines || []).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
        {slide.productNote ? <p className="bt-fmt-note">{slide.productNote}</p> : null}
      </BtSlide>
    </Reveal>
  );
}

/** S4 — concept, image immersive + panneau (forme FastGood × BP). */
export function GameBoard({ slide }) {
  const brand = brandOf(slide);
  const beats = slide.beats || [];
  const photo = slide.photo;
  return (
    <Reveal>
      <BtSlide id={slide.id || "rundown"} deck={brand.deck}>
        {photo ? (
          <figure className="bt-concept-photo">
            <Photo src={photo.src} alt={photo.alt} focus={photo.focus} />
          </figure>
        ) : null}
        <div className="bt-concept-veil" />
        <BtLogo className="bt-brand-corner" tone="white" logo={brand.logo} />
        <div className="bt-concept-panel">
          <h1>{slide.kicker || "Concept"}</h1>
          {slide.rule ? <p className="bt-concept-intro">{slide.rule}</p> : null}
          <div className="bt-concept-phases">
            {beats.map((beat) => (
              <section key={beat.id}>
                <span>{beat.n}</span>
                <div>
                  <h2>{beat.title}</h2>
                  <p>{beat.body}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </BtSlide>
    </Reveal>
  );
}

/** S7 — bénéfices, grille 2×2 White Desert. */
export function BrandBenefits({ slide }) {
  const brand = brandOf(slide);
  const items = slide.items || [];
  return (
    <Reveal>
      <BtSlide id={slide.id || "product"} wd deck={brand.deck}>
        <BtLogo className="bt-brand-corner" tone="white" logo={brand.logo} />
        <p className="bt-kicker bt-abs-kicker">{slide.kicker || "Bénéfices"}</p>
        <h1 className="bt-ben-title">{slide.title}</h1>
        <div className="bt-ben-stack">
          {slide.lead ? <p className="bt-ben-lead">{slide.lead}</p> : null}
          <div className="bt-ben-grid">
            {items.map((item, i) => (
              <article key={item.title || item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  {item.title ? <h2>{item.title}</h2> : null}
                  <p>{item.body || item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </BtSlide>
    </Reveal>
  );
}

/** S6 — 3 rôles égaux + barre objectif. */
export function DeviceArch({ slide }) {
  const brand = brandOf(slide);
  const cards = slide.cards || slide.rays || [];
  return (
    <Reveal>
      <BtSlide id={slide.id || "device"} wd deck={brand.deck}>
        <BtLogo className="bt-brand-corner" tone="white" logo={brand.logo} />
        <p className="bt-kicker bt-abs-kicker">{slide.kicker || "Dispositif"}</p>
        <h1 className="bt-dev-title">{slide.title}</h1>
        <div className="bt-act-stack">
          <div className="bt-act-grid">
            {cards.map((card) => (
              <article key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          {slide.benefit ? (
            <div className="bt-idea-objective">
              <span>{slide.objectiveLabel || "Objectif"}</span>
              <p>{slide.benefit}</p>
            </div>
          ) : null}
        </div>
      </BtSlide>
    </Reveal>
  );
}

/** S8 — timeline, liste White Desert. */
export function CloseTimeline({ slide }) {
  const brand = brandOf(slide);
  const steps = slide.steps || [];
  return (
    <Reveal>
      <BtSlide id={slide.id || "close"} wd deck={brand.deck}>
        <div className="bt-close-mark">
          <FarMark variant="yellow" size={56} />
        </div>
        <p className="bt-kicker bt-abs-kicker">{slide.kicker || "Timeline"}</p>
        <h1 className="bt-close-title">{slide.title}</h1>
        <ol className="bt-close-list">
          {steps.map((st) => (
            <li key={st.when}>
              <strong>{st.when}</strong>
              <span>{(st.bullets || []).join(" ")}</span>
            </li>
          ))}
        </ol>
        <footer className="bt-close-foot">
          {slide.action ? (
            <p className="bt-close-action">{String(slide.action).replace(/\n/g, " ")}</p>
          ) : null}
          <div className="bt-close-contact">
            <strong>{slide.org}</strong>
            <span>{slide.contactName}</span>
            {slide.contactHref ? (
              <a className="far-studio-mail" href={slide.contactHref}>{slide.contactDetail}</a>
            ) : null}
          </div>
        </footer>
      </BtSlide>
    </Reveal>
  );
}
