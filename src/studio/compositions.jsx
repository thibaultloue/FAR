import { asset } from "./asset.js";
import { Body, Display, FarMark, Kicker, LogoMark, Photo, Reveal, Source } from "./primitives.jsx";
import { BarChart, FlowChart, Timeline, NodeFlow, formatAmount, sumValues } from "./diagrams.jsx";
import {
  CloseTimeline,
  CreatorScale,
  DeviceArch,
  FormatProductFit,
  GameBoard,
  ProductAnnotate,
  YoutubeProof,
} from "./decks/toinelagBouyguesKidsWatch.layouts.jsx";

const LAYOUTS = {
  cover: Cover,
  insight: Insight,
  concept: Concept,
  creator: Creator,
  case: CaseStudy,
  mechanic: Mechanic,
  budget: Budget,
  social: Social,
  closing: Closing,
  repertoire: Repertoire,
  cases: DualCase,
  opportunity: Opportunity,
  paths: Paths,
  pilot: Pilot,
  device: Device,
  framework: Framework,
  figures: Figures,
  ecosystem: Ecosystem,
  group: GroupHub,
  bridges: Bridges,
  formats: Formats,
  portraitCover: PortraitCover,
  editorialPath: EditorialPath,
  channelSpread: ChannelSpread,
  socialBeyond: SocialBeyond,
  groupPortfolio: GroupPortfolio,
  dualProof: DualProof,
  brandCase: BrandCase,
  openBridges: OpenBridges,
  partnershipArc: PartnershipArc,
  typeClose: TypeClose,
  campaignCover: CampaignCover,
  creatorSplit: CreatorSplit,
  tripleProof: TripleProof,
  linkMechanic: LinkMechanic,
  storyboard: Storyboard,
  productRole: ProductRole,
  heroDevice: HeroDevice,
  closeCalendar: CloseCalendar,
  creatorScale: CreatorScale,
  youtubeProof: YoutubeProof,
  formatProductFit: FormatProductFit,
  gameBoard: GameBoard,
  productAnnotate: ProductAnnotate,
  deviceArch: DeviceArch,
  closeTimeline: CloseTimeline,
};

function SlideShell({ kicker, source, sourceLinks, children, style }) {
  return (
    <div className="far-studio-slide" style={style}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
      <SourceBlock source={source} sourceLinks={sourceLinks} />
    </div>
  );
}

function SourceBlock({ source, sourceLinks }) {
  if (sourceLinks?.length) {
    return (
      <Source>
        {sourceLinks.map((it, i) => (
          <span key={it.label}>
            {i ? " · " : ""}
            {it.href ? (
              <a href={it.href} target="_blank" rel="noreferrer">
                {it.label}
              </a>
            ) : (
              it.label
            )}
          </span>
        ))}
        {source ? <span>{sourceLinks.length ? " · " : ""}{source}</span> : null}
      </Source>
    );
  }
  if (!source) return null;
  return <Source>{source}</Source>;
}

const NIGHT = {
  background: "#071E32",
  color: "#F5F8FA",
  ["--fs-ink"]: "#F5F8FA",
  ["--fs-muted"]: "rgba(245,248,250,.7)",
  ["--fs-faint"]: "rgba(245,248,250,.48)",
  ["--fs-line"]: "rgba(245,248,250,.16)",
  ["--fs-surface"]: "rgba(255,255,255,.06)",
  ["--fs-accent"]: "#009CCC",
};

const DAY = {
  background: "#F5F8FA",
};

export function Cover({ slide, theme, logos }) {
  const photo = slide.photo;
  const variant = slide.variant === "type" ? "type" : "photo";
  if (variant === "type") {
    return (
      <Reveal>
        <SlideShell kicker={slide.kicker} source={slide.source} style={{ justifyContent: "space-between", background: "var(--fs-contrast)", color: "var(--fs-contrast-ink)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <FarMark variant={theme?.logo === "yellow" ? "yellow" : "white"} size={88} />
            <LogoRow logos={logos || slide.logos} invert />
          </div>
          <div>
            <Display size="lg">{slide.title}</Display>
            {slide.hook ? (
              <Body lead style={{ marginTop: "calc(18px * var(--fs-u))", color: "inherit", maxWidth: "16em" }}>
                {slide.hook}
              </Body>
            ) : null}
            {slide.context ? <Body style={{ marginTop: "calc(14px * var(--fs-u))", color: "inherit", opacity: 0.78, maxWidth: "18em" }}>{slide.context}</Body> : null}
          </div>
        </SlideShell>
      </Reveal>
    );
  }
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%" }}>
        <div className="far-studio-grid-12" style={{ height: "100%", gap: 0, flex: 1 }}>
          <div style={{ gridColumn: "1 / 6", padding: "var(--fs-pad)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={82} />
              <LogoRow logos={logos || slide.logos} invert={theme?.id === "ink"} />
            </div>
            <div>
              {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
              <Display size="lg" style={{ marginTop: "calc(14px * var(--fs-u))" }}>{slide.title}</Display>
              {slide.hook ? (
                <Body lead style={{ marginTop: "calc(16px * var(--fs-u))", maxWidth: "16em" }}>
                  {slide.hook}
                </Body>
              ) : null}
              {slide.context ? <Body style={{ marginTop: "calc(12px * var(--fs-u))" }}>{slide.context}</Body> : null}
            </div>
            {slide.source ? <Source>{slide.source}</Source> : <div />}
          </div>
          <Photo
            src={photo.src}
            alt={photo.alt}
            focus={photo.focus}
            credit={photo.credit}
            style={{ gridColumn: "6 / 13", height: "100%" }}
          />
        </div>
      </div>
    </Reveal>
  );
}

export function Insight({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Constat"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(10px * var(--fs-u)) 0 calc(18px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          <div style={{ gridColumn: "1 / 8", display: "flex", flexDirection: "column", gap: "calc(16px * var(--fs-u))" }}>
            <Body lead>{slide.body}</Body>
            {slide.proofs?.length ? (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))" }}>
                {slide.proofs.map((p) => (
                  <li key={p} className="far-studio-body" style={{ paddingLeft: "calc(14px * var(--fs-u))", borderLeft: "3px solid var(--fs-accent)" }}>{p}</li>
                ))}
              </ul>
            ) : null}
            {slide.consequence ? <Body lead style={{ marginTop: "auto" }}>{slide.consequence}</Body> : null}
          </div>
          {slide.photo ? (
            <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ gridColumn: "8 / 13", height: "100%", borderRadius: "var(--fs-radius)" }} />
          ) : null}
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Concept({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Concept"} source={slide.source}>
        <div className="far-studio-grid-12" style={{ flex: 1, marginTop: "calc(8px * var(--fs-u))" }}>
          <div style={{ gridColumn: "1 / 7", display: "flex", flexDirection: "column", gap: "calc(14px * var(--fs-u))" }}>
            <Display>{slide.title}</Display>
            {slide.hook ? <Body lead>{slide.hook}</Body> : null}
            <Body>{slide.body}</Body>
          </div>
          <div style={{ gridColumn: "7 / 13", minHeight: 0, height: "100%" }}>
            {slide.visual?.kind === "youtube" ? (
              <div className="far-studio-yt" style={{ width: "100%", height: "100%", aspectRatio: "auto" }}>
                <img src={asset(slide.visual.src)} alt={slide.visual.alt} />
              </div>
            ) : slide.photo ? (
              <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ height: "100%", borderRadius: "var(--fs-radius)" }} />
            ) : null}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Creator({ slide, onOpen }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Créateur"} source={slide.source}>
        <div className="far-studio-grid-12" style={{ flex: 1, marginTop: "calc(8px * var(--fs-u))" }}>
          <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ gridColumn: "1 / 6", height: "100%", borderRadius: "var(--fs-radius)" }} />
          <div style={{ gridColumn: "6 / 13", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
            <Display size="md">{slide.title}</Display>
            <Body>{slide.body}</Body>
            {slide.points?.length ? (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "calc(8px * var(--fs-u))" }}>
                {slide.points.map((p) => (
                  <li key={p.label} style={{ paddingLeft: "calc(12px * var(--fs-u))", borderLeft: "3px solid var(--fs-accent)" }}>
                    <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(20px * var(--fs-u))", fontWeight: 700 }}>{p.label}</div>
                    <Body style={{ fontSize: "calc(18px * var(--fs-u))", margin: 0 }}>{p.body}</Body>
                  </li>
                ))}
              </ul>
            ) : null}
            {slide.detail ? (
              <Photo
                src={slide.detail.src}
                alt={slide.detail.alt}
                focus={slide.detail.focus}
                style={{ height: "calc(140px * var(--fs-u))", borderRadius: "var(--fs-radius-sm)", flexShrink: 0 }}
              />
            ) : null}
            {slide.metrics?.length ? (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(slide.metrics.length, 4)}, minmax(0, 1fr))`, gap: "calc(12px * var(--fs-u))", marginTop: "auto" }}>
                {slide.metrics.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => m.detail && onOpen?.({ title: m.label, body: m.detail })}
                    style={{
                      background: "none",
                      border: 0,
                      padding: 0,
                      textAlign: "left",
                      color: "inherit",
                      cursor: m.detail ? "pointer" : "default",
                    }}
                  >
                    <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(34px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.04em" }}>{m.value}</div>
                    <div className="far-studio-caption">{m.label}{m.asOf ? ` · ${m.asOf}` : ""}</div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function CaseStudy({ slide }) {
  const bits = [
    slide.context && { k: "Contexte", v: slide.context },
    slide.response && { k: "Réponse", v: slide.response },
    slide.result && { k: "Résultat", v: slide.result },
    slide.lesson && { k: "Enseignement", v: slide.lesson },
  ].filter(Boolean);
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Cas"} source={slide.source}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, margin: "calc(8px * var(--fs-u)) 0 calc(16px * var(--fs-u))" }}>
          <Display size="md" style={{ flex: 1 }}>{slide.title}</Display>
          {slide.logo ? <LogoMark src={slide.logo.src} alt={slide.logo.alt} height={42} /> : null}
        </div>
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          {slide.photo ? (
            <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ gridColumn: "1 / 6", height: "100%", borderRadius: "var(--fs-radius)" }} />
          ) : null}
          <div style={{ gridColumn: slide.photo ? "6 / 13" : "1 / 13", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))" }}>
            {bits.map((b) => (
              <div key={b.k}>
                <Kicker>{b.k}</Kicker>
                <Body style={{ marginTop: 4, fontSize: "calc(20px * var(--fs-u))" }}>{b.v}</Body>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Mechanic({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Mécanique"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(8px * var(--fs-u)) 0 calc(16px * var(--fs-u))" }}>{slide.title}</Display>
        {slide.kind === "timeline" ? (
          <Timeline steps={slide.steps} uid={slide.uid || "fs-time"} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "calc(16px * var(--fs-u))", flex: 1 }}>
            {slide.steps?.map((step, i) => (
              <div key={step.id || i} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: "calc(8px * var(--fs-u))", borderTop: "3px solid var(--fs-accent)" }}>
                <Kicker>{step.when || `0${i + 1}`}</Kicker>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(26px * var(--fs-u))", fontWeight: 700 }}>{step.title}</div>
                <Body style={{ fontSize: "calc(19px * var(--fs-u))" }}>{step.body}</Body>
              </div>
            ))}
          </div>
        )}
      </SlideShell>
    </Reveal>
  );
}

export function Budget({ slide, onOpen, activeId }) {
  const items = slide.items || [];
  const total = sumValues(items);
  const unit = slide.unit || "";
  const Chart = slide.chart === "flow" ? FlowChart : BarChart;
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Budget"} source={slide.source}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, margin: "calc(6px * var(--fs-u)) 0 calc(14px * var(--fs-u))" }}>
          <Display size="md">{slide.title}</Display>
          <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(36px * var(--fs-u))", fontWeight: 750 }}>
            {formatAmount(total, unit)}
          </div>
        </div>
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          <div style={{ gridColumn: "1 / 8", display: "flex", minHeight: 0 }}>
            <Chart
              items={items}
              unit={unit}
              uid={slide.uid || "fs-budget"}
              source={slide.flowSource}
              onSelect={(item) => item.note && onOpen?.({ title: item.label, body: `${formatAmount(item.value, unit)} · ${item.note}` })}
              activeId={activeId}
            />
          </div>
          <div style={{ gridColumn: "8 / 13", display: "flex", flexDirection: "column", justifyContent: "center", gap: "calc(12px * var(--fs-u))" }}>
            {slide.arbitration ? <Body lead>{slide.arbitration}</Body> : null}
            {slide.note ? <Body style={{ fontSize: "calc(18px * var(--fs-u))" }}>{slide.note}</Body> : null}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Social({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Social"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(8px * var(--fs-u)) 0 calc(16px * var(--fs-u))" }}>{slide.title}</Display>
        <div style={{ display: "flex", alignItems: "center", gap: "calc(28px * var(--fs-u))", flex: 1, minHeight: 0 }}>
          {slide.formats?.map((f) => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {f.kind === "story" ? (
                <div className="far-studio-phone"><div><img src={asset(f.src)} alt={f.alt} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} /></div></div>
              ) : f.kind === "post" ? (
                <div className="far-studio-post"><img src={asset(f.src)} alt={f.alt} /></div>
              ) : (
                <div className="far-studio-yt"><img src={asset(f.src)} alt={f.alt} /></div>
              )}
              <div className="far-studio-caption">{f.label}</div>
            </div>
          ))}
          {slide.body ? <Body style={{ flex: 1, marginBottom: "calc(28px * var(--fs-u))" }}>{slide.body}</Body> : null}
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Closing({ slide, theme }) {
  if (slide.photo) {
    return (
      <Reveal>
        <div className="far-studio-slide" style={{ padding: 0, height: "100%" }}>
          <div className="far-studio-grid-12" style={{ height: "100%", gap: 0, flex: 1 }}>
            <div style={{ gridColumn: "1 / 7", padding: "var(--fs-pad)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={76} />
              <div>
                {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
                <Display size="lg" style={{ marginTop: "calc(12px * var(--fs-u))", maxWidth: "12em" }}>{slide.title}</Display>
                {slide.action ? <Body lead style={{ marginTop: "calc(18px * var(--fs-u))" }}>{slide.action}</Body> : null}
                {slide.contact ? (
                  <Body style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(18px * var(--fs-u))", whiteSpace: "pre-line" }}>{slide.contact}</Body>
                ) : null}
              </div>
              {slide.source ? <Source>{slide.source}</Source> : <div />}
            </div>
            <Photo
              src={slide.photo.src}
              alt={slide.photo.alt}
              focus={slide.photo.focus}
              credit={slide.photo.credit}
              style={{ gridColumn: "7 / 13", height: "100%" }}
            />
          </div>
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ justifyContent: "space-between" }}>
        <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={76} />
        <div>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="lg" style={{ marginTop: "calc(12px * var(--fs-u))", maxWidth: "14em" }}>{slide.title}</Display>
          {slide.action ? <Body lead style={{ marginTop: "calc(22px * var(--fs-u))" }}>{slide.action}</Body> : null}
          {slide.contact ? <Body style={{ marginTop: "calc(14px * var(--fs-u))", whiteSpace: "pre-line" }}>{slide.contact}</Body> : null}
        </div>
        {slide.source ? <Source>{slide.source}</Source> : <div />}
      </div>
    </Reveal>
  );
}

export function Repertoire({ slide, onOpen }) {
  const videos = slide.videos || [];
  const featured = videos[0];
  const rest = videos.slice(1, 3);
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Répertoire"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(6px * var(--fs-u)) 0 calc(14px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          {featured ? (
            <VideoTile
              video={featured}
              featured
              onOpen={onOpen}
              style={{ gridColumn: "1 / 8", height: "100%" }}
            />
          ) : null}
          <div style={{ gridColumn: "8 / 13", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
            {rest.map((video) => (
              <VideoTile key={video.id || video.title} video={video} onOpen={onOpen} style={{ flex: 1, minHeight: 0 }} />
            ))}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function DualCase({ slide, onOpen }) {
  const cases = slide.cases || [];
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Preuves"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(12px * var(--fs-u))" }}>{slide.title}</Display>
        {slide.lead ? <Body style={{ marginBottom: "calc(12px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))" }}>{slide.lead}</Body> : null}
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          {cases.map((item, i) => (
            <button
              key={item.partner}
              type="button"
              className="far-studio-plain-btn"
              onClick={() =>
                onOpen?.({
                  title: `${item.partner}, ${item.year}`,
                  body: item.detail || item.result,
                  href: item.href,
                  hrefLabel: item.hrefLabel || "Voir la vidéo",
                })
              }
              style={{
                gridColumn: i === 0 ? "1 / 7" : "7 / 13",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                minHeight: 0,
                height: "100%",
              }}
            >
              <Photo src={item.photo.src} alt={item.photo.alt} focus={item.photo.focus} style={{ height: "calc(248px * var(--fs-u))", borderRadius: "var(--fs-radius)", flexShrink: 0 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "calc(12px * var(--fs-u))", gap: 10 }}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(26px * var(--fs-u))", fontWeight: 700 }}>{item.partner}</div>
                <Kicker>{item.year}</Kicker>
              </div>
              <Body style={{ fontSize: "calc(18px * var(--fs-u))", marginTop: 6 }}>{item.idea}</Body>
              <div style={{ paddingTop: "calc(12px * var(--fs-u))" }}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.03em" }}>{item.resultValue}</div>
                <div className="far-studio-caption">{item.resultLabel}</div>
              </div>
            </button>
          ))}
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Opportunity({ slide, onOpen }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Intérêt"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(10px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1 }}>
          <div style={{ gridColumn: "1 / 7", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
            <Body>{slide.body}</Body>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))" }}>
              {(slide.links || []).map((link) => (
                <li
                  key={link.id}
                  style={{
                    padding: "calc(10px * var(--fs-u)) calc(12px * var(--fs-u))",
                    borderLeft: "3px solid var(--fs-accent)",
                    background: link.featured ? "var(--fs-accent-soft)" : "transparent",
                  }}
                >
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 700 }}>{link.title}</div>
                  <Body style={{ fontSize: "calc(18px * var(--fs-u))", margin: 0 }}>{link.body}</Body>
                </li>
              ))}
            </ul>
            <NodeFlow
              nodes={slide.flow}
              uid={slide.uid || "fs-opp"}
              onSelect={(node) => node.detail && onOpen?.({ title: node.label, body: node.detail })}
            />
          </div>
          {slide.photo ? (
            <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ gridColumn: "7 / 13", height: "100%", borderRadius: "var(--fs-radius)" }} />
          ) : null}
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Paths({ slide }) {
  const items = slide.paths || [];
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Collaborer"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(12px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1, alignItems: "stretch" }}>
          {items.map((path, i) => {
            const featured = Boolean(path.featured);
            return (
              <div
                key={path.id}
                style={{
                  gridColumn: featured ? "5 / 10" : i === 0 ? "1 / 5" : "10 / 13",
                  display: "flex",
                  flexDirection: "column",
                  gap: "calc(10px * var(--fs-u))",
                  minHeight: 0,
                }}
              >
                {path.photo ? (
                  <Photo
                    src={path.photo.src}
                    alt={path.photo.alt}
                    focus={path.photo.focus}
                    style={{
                      height: featured ? "calc(280px * var(--fs-u))" : "calc(170px * var(--fs-u))",
                      borderRadius: "var(--fs-radius)",
                      flexShrink: 0,
                    }}
                  />
                ) : null}
                <Kicker>{path.kicker || (featured ? "À privilégier" : `0${i + 1}`)}</Kicker>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: featured ? "calc(28px * var(--fs-u))" : "calc(22px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {path.title}
                </div>
                <Body style={{ fontSize: "calc(18px * var(--fs-u))" }}>{path.body}</Body>
              </div>
            );
          })}
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Pilot({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Piste"} source={slide.source}>
        <div className="far-studio-grid-12" style={{ flex: 1, marginTop: "calc(4px * var(--fs-u))" }}>
          <div style={{ gridColumn: "1 / 6", display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))", minHeight: 0 }}>
            <Display size="md">{slide.title}</Display>
            {slide.hook ? <Body lead style={{ fontSize: "calc(22px * var(--fs-u))" }}>{slide.hook}</Body> : null}
            <Body style={{ fontSize: "calc(19px * var(--fs-u))" }}>{slide.body}</Body>
            {slide.role ? (
              <div style={{ paddingLeft: "calc(12px * var(--fs-u))", borderLeft: "3px solid var(--fs-accent)", marginTop: "auto" }}>
                <Kicker>Rôle proposé</Kicker>
                <Body style={{ fontSize: "calc(18px * var(--fs-u))", marginTop: 4 }}>{slide.role}</Body>
              </div>
            ) : null}
          </div>
          <div style={{ gridColumn: "6 / 13", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
            {slide.photo ? (
              <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} credit={slide.photo.credit} style={{ flex: "1.2", borderRadius: "var(--fs-radius)", minHeight: 0 }} />
            ) : null}
            {slide.thumb ? (
              <div style={{ display: "flex", gap: "calc(12px * var(--fs-u))", alignItems: "center", flexShrink: 0 }}>
                <div className="far-studio-yt" style={{ width: "calc(280px * var(--fs-u))" }}>
                  <img src={asset(slide.thumb.src)} alt={slide.thumb.alt} />
                </div>
                <Body style={{ fontSize: "calc(16px * var(--fs-u))", margin: 0 }}>{slide.thumb.caption}</Body>
              </div>
            ) : null}
            <ol style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "calc(10px * var(--fs-u))", listStyle: "none", margin: 0, padding: 0, flexShrink: 0 }}>
              {(slide.plans || []).map((plan, i) => (
                <li key={plan.id || i} style={{ borderTop: "3px solid var(--fs-accent)", paddingTop: "calc(8px * var(--fs-u))" }}>
                  <Kicker>0{i + 1}</Kicker>
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 700, marginTop: 4 }}>{plan.title}</div>
                  <Body style={{ fontSize: "calc(16px * var(--fs-u))", margin: 0 }}>{plan.body}</Body>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

export function Device({ slide, onOpen }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Dispositif"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(10px * var(--fs-u))" }}>{slide.title}</Display>
        <NodeFlow
          nodes={slide.flow}
          uid={slide.uid || "fs-device"}
          onSelect={(node) => node.detail && onOpen?.({ title: node.label, body: node.detail })}
        />
        <div style={{ display: "flex", alignItems: "stretch", gap: "calc(18px * var(--fs-u))", flex: 1, minHeight: 0, marginTop: "calc(14px * var(--fs-u))" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1.4", minWidth: 0 }}>
            <div className="far-studio-yt" style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}>
              <img src={asset(slide.youtube.src)} alt={slide.youtube.alt} />
            </div>
            <div className="far-studio-caption">{slide.youtube.label}</div>
          </div>
          {(slide.verticals || []).map((v) => (
            <div key={v.label} style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              <div className="far-studio-phone">
                <div>
                  <img src={asset(v.src)} alt={v.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: v.focus || "center", borderRadius: "inherit" }} />
                </div>
              </div>
              <div className="far-studio-caption">{v.label}</div>
            </div>
          ))}
          {slide.partnerZone ? (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                background: "var(--fs-surface)",
                border: "1px solid var(--fs-line)",
                borderRadius: "var(--fs-radius)",
                padding: "calc(16px * var(--fs-u))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Kicker>{slide.partnerZone.kicker}</Kicker>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 700 }}>{slide.partnerZone.title}</div>
              <Body style={{ fontSize: "calc(17px * var(--fs-u))", margin: 0 }}>{slide.partnerZone.body}</Body>
            </div>
          ) : null}
        </div>
        {slide.perimeter ? <Body style={{ fontSize: "calc(17px * var(--fs-u))", marginTop: "calc(10px * var(--fs-u))" }}>{slide.perimeter}</Body> : null}
      </SlideShell>
    </Reveal>
  );
}

export function Framework({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker || "Cadre"} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(12px * var(--fs-u))" }}>{slide.title}</Display>
        <Timeline steps={slide.steps} uid={slide.uid || "fs-frame"} />
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, marginTop: "calc(14px * var(--fs-u))" }}>
          {slide.photo ? (
            <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ gridColumn: "1 / 6", height: "100%", borderRadius: "var(--fs-radius)" }} />
          ) : null}
          <div style={{ gridColumn: slide.photo ? "6 / 13" : "1 / 13", display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))", minHeight: 0 }}>
            {(slide.roles || []).map((role) => (
              <div key={role.who}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(20px * var(--fs-u))", fontWeight: 700 }}>{role.who}</div>
                <Body style={{ fontSize: "calc(18px * var(--fs-u))", margin: 0 }}>{role.body}</Body>
              </div>
            ))}
            {slide.pricing ? (
              <div style={{ marginTop: "auto", paddingTop: "calc(10px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
                <Kicker>À chiffrer ensemble</Kicker>
                <Body style={{ fontSize: "calc(17px * var(--fs-u))", marginTop: 4 }}>{slide.pricing}</Body>
              </div>
            ) : null}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

function VideoTile({ video, featured, onOpen, style }) {
  return (
    <button
      type="button"
      className="far-studio-plain-btn"
      onClick={() =>
        onOpen?.({
          title: `${video.title} · ${video.year}`,
          body: video.detail || video.role,
          href: video.href,
          hrefLabel: "Voir sur YouTube",
        })
      }
      style={{ display: "flex", flexDirection: "column", minHeight: 0, height: "100%", textAlign: "left", ...style }}
    >
      <div className="far-studio-yt" style={{ width: "100%", height: featured ? "auto" : "100%", flex: featured ? undefined : 1, aspectRatio: featured ? "16 / 9" : undefined, minHeight: 0 }}>
        <img src={asset(video.src)} alt={video.alt} />
      </div>
      <div style={{ paddingTop: "calc(8px * var(--fs-u))", flexShrink: 0 }}>
        <Kicker>{video.year} · {video.kind}</Kicker>
        <div style={{ fontFamily: "var(--fs-font-display)", fontSize: featured ? "calc(22px * var(--fs-u))" : "calc(17px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>
          {video.title}
        </div>
        {video.result ? (
          <div style={{ fontFamily: "var(--fs-font-display)", fontSize: featured ? "calc(28px * var(--fs-u))" : "calc(22px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.04em", marginTop: 6 }}>
            {video.result}
          </div>
        ) : null}
        {video.role ? <Body style={{ fontSize: "calc(16px * var(--fs-u))", margin: video.result ? "2px 0 0" : 0 }}>{video.role}</Body> : null}
      </div>
    </button>
  );
}

/** Chiffres amples — une mesure = un bloc dominant. */
export function Figures({ slide }) {
  const metrics = slide.metrics || [];
  const contrast = slide.variant === "contrast";
  return (
    <Reveal>
      <SlideShell
        kicker={slide.kicker}
        source={slide.source}
        style={
          contrast
            ? {
                background: "var(--fs-contrast)",
                color: "var(--fs-contrast-ink)",
                justifyContent: "space-between",
                ["--fs-muted"]: "rgba(244,240,232,.58)",
                ["--fs-faint"]: "rgba(244,240,232,.42)",
                ["--fs-ink"]: "var(--fs-contrast-ink)",
              }
            : undefined
        }
      >
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(18px * var(--fs-u))", color: "inherit" }}>
          {slide.title}
        </Display>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))`,
            gap: "calc(22px * var(--fs-u))",
            flex: 1,
            alignItems: "center",
          }}
        >
          {metrics.map((m) => (
            <div key={m.label} style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--fs-font-display)",
                  fontSize: "calc(110px * var(--fs-u))",
                  fontWeight: 750,
                  letterSpacing: "-0.06em",
                  lineHeight: 0.92,
                  color: "var(--fs-accent)",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--fs-font-display)",
                  fontSize: "calc(24px * var(--fs-u))",
                  fontWeight: 700,
                  marginTop: "calc(14px * var(--fs-u))",
                  letterSpacing: "-0.03em",
                  color: "inherit",
                }}
              >
                {m.label}
              </div>
              {m.asOf ? (
                <div className="far-studio-caption" style={{ marginTop: 6 }}>
                  {m.asOf}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SlideShell>
    </Reveal>
  );
}

/** Cartographie éditoriale : YouTube dominant, Instagram, LinkedIn. */
export function Ecosystem({ slide }) {
  const channels = slide.channels || [];
  const lead = channels[0];
  const rest = channels.slice(1);
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(14px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0 }}>
          {lead ? (
            <div style={{ gridColumn: "1 / 8", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
              <Kicker>{lead.handle || lead.label}</Kicker>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>{lead.title || lead.label}</div>
              <Body lead style={{ fontSize: "calc(22px * var(--fs-u))" }}>{lead.body}</Body>
              {lead.photo ? (
                <div className="far-studio-yt" style={{ width: "100%", maxWidth: "100%", aspectRatio: "16 / 9", marginTop: "auto" }}>
                  <img src={asset(lead.photo.src)} alt={lead.photo.alt || ""} />
                </div>
              ) : null}
            </div>
          ) : null}
          <div style={{ gridColumn: "8 / 13", display: "flex", flexDirection: "column", gap: "calc(14px * var(--fs-u))", minHeight: 0 }}>
            {rest.map((ch) => (
              <div
                key={ch.id || ch.label}
                style={{
                  flex: 1,
                  minHeight: 0,
                  padding: "calc(16px * var(--fs-u))",
                  background: "var(--fs-surface)",
                  border: "1px solid var(--fs-line)",
                  borderRadius: "var(--fs-radius)",
                  borderTop: "3px solid var(--fs-accent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Kicker>{ch.handle || ch.label}</Kicker>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(24px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>{ch.title || ch.label}</div>
                <Body style={{ fontSize: "calc(19px * var(--fs-u))", margin: 0 }}>{ch.body}</Body>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

/** Hub entrepreneurial : groupe au centre, branches autour. */
export function GroupHub({ slide }) {
  const branches = slide.branches || [];
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source}>
        <Display size="md" style={{ margin: "calc(2px * var(--fs-u)) 0 calc(8px * var(--fs-u))" }}>{slide.title}</Display>
        {slide.body ? <Body style={{ marginBottom: "calc(14px * var(--fs-u))", fontSize: "calc(21px * var(--fs-u))" }}>{slide.body}</Body> : null}
        <div
          style={{
            alignSelf: "center",
            padding: "calc(14px * var(--fs-u)) calc(28px * var(--fs-u))",
            borderRadius: 999,
            background: "var(--fs-contrast)",
            color: "var(--fs-contrast-ink)",
            fontFamily: "var(--fs-font-display)",
            fontSize: "calc(22px * var(--fs-u))",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "calc(16px * var(--fs-u))",
          }}
        >
          {slide.hub || "Groupe La Porte"}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "calc(10px * var(--fs-u))",
            flex: 1,
            minHeight: 0,
          }}
        >
          {branches.map((b) => (
            <div
              key={b.id || b.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "calc(12px * var(--fs-u))",
                background: "var(--fs-surface)",
                border: "1px solid var(--fs-line)",
                borderRadius: "var(--fs-radius)",
                borderTop: "3px solid var(--fs-accent)",
                minHeight: 0,
              }}
            >
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(17px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{b.name}</div>
              <Body style={{ fontSize: "calc(15px * var(--fs-u))", margin: 0 }}>{b.role}</Body>
              {b.example ? (
                <div style={{ marginTop: "auto", paddingTop: 8, borderTop: "1px solid var(--fs-line)" }}>
                  <div className="far-studio-caption">{b.example}</div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SlideShell>
    </Reveal>
  );
}

/** Atout → objectif, trois lignes. */
export function Bridges({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(16px * var(--fs-u))" }}>{slide.title}</Display>
        <div style={{ display: "flex", flexDirection: "column", gap: "calc(14px * var(--fs-u))", flex: 1, justifyContent: "center" }}>
          {(slide.bridges || []).map((row) => (
            <div
              key={row.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.05fr auto 1fr",
                gap: "calc(16px * var(--fs-u))",
                alignItems: "center",
                padding: "calc(16px * var(--fs-u)) calc(18px * var(--fs-u))",
                background: row.featured ? "var(--fs-accent-soft)" : "var(--fs-surface)",
                border: "1px solid var(--fs-line)",
                borderRadius: "var(--fs-radius)",
              }}
            >
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(23px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                {row.from}
              </div>
              <div aria-hidden style={{ color: "var(--fs-accent)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 700 }}>
                →
              </div>
              <div>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(23px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  {row.to}
                </div>
                {row.body ? <Body style={{ fontSize: "calc(18px * var(--fs-u))", margin: "6px 0 0" }}>{row.body}</Body> : null}
              </div>
            </div>
          ))}
        </div>
      </SlideShell>
    </Reveal>
  );
}

/** Trois formats éditoriaux égaux, sans photo. */
export function Formats({ slide }) {
  const items = slide.formats || slide.paths || [];
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source}>
        <Display size="md" style={{ margin: "calc(4px * var(--fs-u)) 0 calc(18px * var(--fs-u))" }}>{slide.title}</Display>
        <div className="far-studio-grid-12" style={{ flex: 1, alignItems: "stretch" }}>
          {items.map((item, i) => (
            <div
              key={item.id || item.title}
              style={{
                gridColumn: `${i * 4 + 1} / ${i * 4 + 5}`,
                display: "flex",
                flexDirection: "column",
                gap: "calc(10px * var(--fs-u))",
                padding: "calc(18px * var(--fs-u))",
                background: "var(--fs-surface)",
                border: "1px solid var(--fs-line)",
                borderRadius: "var(--fs-radius)",
                borderTop: "3px solid var(--fs-accent)",
                minHeight: 0,
              }}
            >
              <Kicker>{item.kicker || `0${i + 1}`}</Kicker>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.03em" }}>{item.title}</div>
              <Body style={{ fontSize: "calc(20px * var(--fs-u))" }}>{item.body}</Body>
            </div>
          ))}
        </div>
        {slide.signature ? (
          <Body style={{ marginTop: "calc(16px * var(--fs-u))", fontSize: "calc(18px * var(--fs-u))" }}>{slide.signature}</Body>
        ) : null}
      </SlideShell>
    </Reveal>
  );
}

const EDITORIAL_PAD = "calc(58px * var(--fs-u))";

function YtFit({ src, alt }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "left center",
        display: "block",
      }}
    />
  );
}

function YtIntact({ src, alt, style }) {
  return (
    <div className="far-studio-yt-intact" style={style}>
      <img src={asset(src)} alt={alt} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
    </div>
  );
}

/** Couverture portrait ~2/3, nom et chaînes en premier. */
export function PortraitCover({ slide, theme, logos }) {
  const photo = slide.photo;
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%" }}>
        <div className="far-studio-grid-12" style={{ height: "100%", gap: 0, flex: 1 }}>
          <div
            style={{
              gridColumn: "1 / 5",
              padding: EDITORIAL_PAD,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={80} />
              <LogoRow logos={logos || slide.logos} invert={theme?.id === "ink"} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
              {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
              <Display
                size="lg"
                style={{
                  marginTop: "calc(18px * var(--fs-u))",
                  fontSize: "calc(104px * var(--fs-u))",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                {slide.title}
              </Display>
              {slide.channels ? (
                <div
                  style={{
                    marginTop: "calc(16px * var(--fs-u))",
                    fontFamily: "var(--fs-font-display)",
                    fontSize: "calc(22px * var(--fs-u))",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {slide.channels}
                </div>
              ) : null}
              {slide.hook ? (
                <Body lead style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(26px * var(--fs-u))", fontWeight: 500 }}>
                  {slide.hook}
                </Body>
              ) : null}
            </div>
            {slide.source ? <Source>{slide.source}</Source> : null}
          </div>
          {photo ? (
            <Photo
              src={photo.src}
              alt={photo.alt}
              focus={photo.focus}
              credit={photo.credit}
              style={{ gridColumn: "5 / 13", height: "100%" }}
            />
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

/** Double page éditoriale : visuel + trois repères ouverts. */
export function EditorialPath({ slide }) {
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%" }}>
        <div className="far-studio-grid-12" style={{ height: "100%", gap: 0, flex: 1 }}>
          {slide.photo ? (
            <Photo
              src={slide.photo.src}
              alt={slide.photo.alt}
              focus={slide.photo.focus}
              credit={slide.photo.credit}
              style={{ gridColumn: "1 / 6", height: "100%" }}
            />
          ) : null}
          <div
            style={{
              gridColumn: "6 / 13",
              padding: EDITORIAL_PAD,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              minWidth: 0,
            }}
          >
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display size="md" style={{ marginTop: "calc(10px * var(--fs-u))", fontSize: "calc(42px * var(--fs-u))", lineHeight: 1.08 }}>
              {slide.title}
            </Display>
            {slide.body ? (
              <Body style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(23px * var(--fs-u))", fontWeight: 400 }}>
                {slide.body}
              </Body>
            ) : null}
            <div
              style={{
                marginTop: "calc(28px * var(--fs-u))",
                display: "flex",
                flexDirection: "column",
                gap: "calc(18px * var(--fs-u))",
                flex: 1,
                justifyContent: "center",
              }}
            >
              {(slide.markers || []).map((item) => (
                <div key={item.id || item.label} style={{ paddingTop: "calc(10px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
                  <div
                    style={{
                      fontFamily: "var(--fs-font-display)",
                      fontSize: "calc(22px * var(--fs-u))",
                      fontWeight: 650,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {item.label}
                  </div>
                  <Body style={{ margin: "4px 0 0", fontSize: "calc(20px * var(--fs-u))", fontWeight: 400 }}>{item.body}</Body>
                </div>
              ))}
            </div>
            {slide.source ? <Source>{slide.source}</Source> : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MetricBand({ metrics, compact }) {
  if (!metrics?.length) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
        gap: "calc(16px * var(--fs-u))",
        flexShrink: 0,
        paddingTop: "calc(12px * var(--fs-u))",
        borderTop: "1px solid var(--fs-line)",
      }}
    >
      {metrics.map((m) => (
        <div key={m.label}>
          <div
            style={{
              fontFamily: "var(--fs-font-display)",
              fontSize: compact ? "calc(36px * var(--fs-u))" : "calc(44px * var(--fs-u))",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              whiteSpace: "nowrap",
            }}
          >
            {m.value}
          </div>
          <div className="far-studio-caption" style={{ marginTop: 4, fontSize: "calc(14px * var(--fs-u))", color: "inherit", opacity: 0.62 }}>
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function FamilyList({ families, columns = 1 }) {
  if (!families?.length) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "calc(16px * var(--fs-u))",
        minHeight: 0,
      }}
    >
      {families.map((row) => (
        <div key={row.label} style={{ paddingTop: "calc(8px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
          <Kicker>
            {row.n} {row.label}
          </Kicker>
          {row.verb ? (
            <div
              style={{
                fontFamily: "var(--fs-font-display)",
                fontSize: "calc(22px * var(--fs-u))",
                fontWeight: 650,
                letterSpacing: "-0.03em",
                marginTop: 6,
              }}
            >
              {row.verb}
            </div>
          ) : null}
          <Body style={{ marginTop: 4, fontSize: "calc(18px * var(--fs-u))", fontWeight: 400, maxWidth: "none" }}>{row.body}</Body>
        </div>
      ))}
    </div>
  );
}

/** Page chaîne : identité, trois repères, familles, une référence réelle. */
export function ChannelSpread({ slide, onOpen }) {
  const example = slide.example;
  const families = slide.families || [];
  const metrics = slide.metrics || [];
  const isStudio = slide.variant === "studio";
  const openExample = () => {
    if (!example) return;
    onOpen?.({
      title: example.title,
      body: example.detail || example.caption,
      href: example.href,
      hrefLabel: example.hrefLabel || "Voir la vidéo",
    });
  };
  const exampleBlock = example ? (
    <button type="button" className="far-studio-plain-btn" onClick={openExample} style={{ textAlign: "left", width: "100%", minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <YtIntact src={example.src} alt={example.alt} />
      <div style={{ marginTop: "calc(10px * var(--fs-u))", flexShrink: 0 }}>
        <Kicker>
          {example.year}
          {example.result ? ` · ${example.result}` : ""}
        </Kicker>
        <div
          style={{
            fontFamily: "var(--fs-font-display)",
            fontSize: "calc(20px * var(--fs-u))",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            marginTop: 4,
          }}
        >
          {example.title}
        </div>
      </div>
    </button>
  ) : null;

  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD, gap: "calc(12px * var(--fs-u))" }}>
        <div style={{ flexShrink: 0 }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="md" style={{ marginTop: "calc(6px * var(--fs-u))", fontSize: "calc(52px * var(--fs-u))", color: "inherit", maxWidth: "14em" }}>
            {slide.title}
          </Display>
          {slide.subtitle ? (
            <Body lead style={{ marginTop: "calc(8px * var(--fs-u))", fontSize: "calc(26px * var(--fs-u))", fontWeight: 500, color: "inherit", maxWidth: "18em" }}>
              {slide.subtitle}
            </Body>
          ) : null}
        </div>
        {isStudio ? (
          <>
            <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, alignItems: "stretch", gap: "calc(24px * var(--fs-u))" }}>
              <div style={{ gridColumn: "1 / 8", minHeight: 0, minWidth: 0 }}>
                <FamilyList families={families} columns={2} />
              </div>
              <div style={{ gridColumn: "8 / 13", minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {exampleBlock}
              </div>
            </div>
            <MetricBand metrics={metrics} compact />
          </>
        ) : (
          <>
            <MetricBand metrics={metrics} />
            <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, alignItems: "stretch", gap: "calc(24px * var(--fs-u))" }}>
              <div style={{ gridColumn: "1 / 6", minHeight: 0, minWidth: 0 }}>
                <FamilyList families={families} columns={1} />
              </div>
              <div style={{ gridColumn: "6 / 13", minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {exampleBlock}
              </div>
            </div>
          </>
        )}
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

/** Instagram visuel + autres canaux nommés, sans additionner les audiences. */
export function SocialBeyond({ slide }) {
  const ig = slide.instagram;
  const channels = slide.channels || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ margin: "calc(8px * var(--fs-u)) 0 calc(18px * var(--fs-u))", fontSize: "calc(48px * var(--fs-u))", maxWidth: "14em" }}>
          {slide.title}
        </Display>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0 }}>
          {slide.photo ? (
            <Photo
              src={slide.photo.src}
              alt={slide.photo.alt}
              focus={slide.photo.focus}
              style={{ gridColumn: "1 / 8", height: "100%", borderRadius: "var(--fs-radius)" }}
            />
          ) : null}
          <div
            style={{
              gridColumn: "8 / 13",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              paddingLeft: "calc(8px * var(--fs-u))",
            }}
          >
            <div>
              <Kicker>Instagram</Kicker>
              {ig?.value ? (
                <div
                  style={{
                    fontFamily: "var(--fs-font-display)",
                    fontSize: "calc(72px * var(--fs-u))",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.92,
                    marginTop: "calc(8px * var(--fs-u))",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ig.value}
                </div>
              ) : null}
              {ig?.label ? (
                <div className="far-studio-caption" style={{ marginTop: 6, fontSize: "calc(15px * var(--fs-u))" }}>
                  {ig.label}
                </div>
              ) : null}
              {ig?.body ? (
                <Body style={{ marginTop: "calc(10px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))", fontWeight: 400 }}>
                  {ig.body}
                </Body>
              ) : null}
            </div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))" }}>
              {channels.map((ch) => (
                <div key={ch.id} style={{ paddingTop: "calc(10px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
                  <Kicker>{ch.title}</Kicker>
                  <Body style={{ marginTop: 4, fontSize: "calc(18px * var(--fs-u))", fontWeight: 400 }}>{ch.body}</Body>
                </div>
              ))}
            </div>
          </div>
        </div>
        {slide.note ? (
          <Body style={{ marginTop: "calc(10px * var(--fs-u))", fontSize: "calc(16px * var(--fs-u))", fontWeight: 400, flexShrink: 0 }}>
            {slide.note}
          </Body>
        ) : null}
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

function VentureMedia({ item }) {
  if (item.names) {
    return (
      <div
        style={{
          flex: "1 1 0",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "calc(12px * var(--fs-u))",
          background: "color-mix(in srgb, var(--fs-ink) 6%, var(--fs-slide))",
          borderRadius: "var(--fs-radius)",
        }}
      >
        {item.names.map((n) => (
          <div
            key={n}
            style={{
              fontFamily: "var(--fs-font-display)",
              fontSize: "calc(20px * var(--fs-u))",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
            }}
          >
            {n}
          </div>
        ))}
      </div>
    );
  }
  if (item.logo) {
    return (
      <div
        style={{
          flex: "1 1 0",
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderRadius: "var(--fs-radius)",
          padding: "calc(16px * var(--fs-u))",
        }}
      >
        <LogoMark src={item.logo} alt={item.title} height={64} />
      </div>
    );
  }
  if (item.photo) {
    return (
      <Photo
        src={item.photo.src}
        alt={item.photo.alt}
        fit={item.fit || "cover"}
        focus={item.photo.focus}
        style={{
          flex: "1 1 0",
          minHeight: 0,
          borderRadius: "var(--fs-radius)",
          background: item.fit === "contain" ? "rgba(255,255,255,.7)" : undefined,
        }}
      />
    );
  }
  return <div style={{ flex: "1 1 0", minHeight: 0, background: "var(--fs-line)", borderRadius: "var(--fs-radius)" }} />;
}

/** Cinq activités, même largeur, mêmes cadres. */
export function GroupPortfolio({ slide }) {
  const ventures = slide.ventures || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD, gap: "calc(12px * var(--fs-u))" }}>
        <div style={{ flexShrink: 0 }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="md" style={{ marginTop: 6, fontSize: "calc(44px * var(--fs-u))", maxWidth: "16em", lineHeight: 1.06 }}>
            {slide.title}
          </Display>
          {slide.subtitle ? (
            <Body style={{ marginTop: 6, fontSize: "calc(20px * var(--fs-u))", fontWeight: 500 }}>{slide.subtitle}</Body>
          ) : null}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "calc(12px * var(--fs-u))",
            flex: 1,
            minHeight: 0,
            alignItems: "stretch",
          }}
        >
          {ventures.map((item) => (
            <div key={item.id} style={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, gap: "calc(8px * var(--fs-u))" }}>
              <VentureMedia item={item} />
              <div style={{ flexShrink: 0, minHeight: "calc(108px * var(--fs-u))" }}>
                <div
                  style={{
                    fontFamily: "var(--fs-font-display)",
                    fontSize: "calc(16px * var(--fs-u))",
                    fontWeight: 650,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </div>
                <Body style={{ margin: "4px 0 0", fontSize: "calc(15px * var(--fs-u))", fontWeight: 400 }}>{item.body}</Body>
              </div>
            </div>
          ))}
        </div>
        {slide.tagline ? (
          <Body style={{ flexShrink: 0, fontSize: "calc(16px * var(--fs-u))", fontWeight: 500 }}>{slide.tagline}</Body>
        ) : null}
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

/** Deux preuves 16:9 intactes, sans cartes étirées. */
export function DualProof({ slide, onOpen }) {
  const cases = slide.cases || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ margin: "calc(6px * var(--fs-u)) 0 calc(16px * var(--fs-u))", fontSize: "calc(44px * var(--fs-u))", maxWidth: "16em" }}>
          {slide.title}
        </Display>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, height: "auto", alignItems: "start" }}>
          {cases.map((item, i) => (
            <button
              key={item.partner}
              type="button"
              className="far-studio-plain-btn"
              onClick={() =>
                onOpen?.({
                  title: `${item.partner}, ${item.year}`,
                  body: item.detail || item.result,
                  href: item.href,
                  hrefLabel: item.hrefLabel || "Voir la vidéo",
                })
              }
              style={{
                gridColumn: i === 0 ? "1 / 7" : "7 / 13",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                minHeight: 0,
                gap: "calc(10px * var(--fs-u))",
              }}
            >
              <YtIntact src={item.photo.src} alt={item.photo.alt} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(26px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {item.partner}
                </div>
                <Kicker>{item.year}</Kicker>
              </div>
              {item.idea ? <Body style={{ fontSize: "calc(19px * var(--fs-u))", fontWeight: 500, margin: 0 }}>{item.idea}</Body> : null}
              {item.detailLine ? <Body style={{ fontSize: "calc(17px * var(--fs-u))", fontWeight: 400, margin: 0 }}>{item.detailLine}</Body> : null}
              <div>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 650, letterSpacing: "-0.03em" }}>
                  {item.resultValue}
                </div>
                <div className="far-studio-caption">{item.resultLabel}</div>
              </div>
            </button>
          ))}
        </div>
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

/** Cas marque : vidéo 16:9, mécanique, un résultat documenté. */
export function BrandCase({ slide }) {
  const mechanics = slide.mechanics || [];
  const href = slide.href || null;
  const media = (
    <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" style={{ position: "absolute", inset: 0 }}>
          <YtFit src={slide.thumb.src} alt={slide.thumb.alt} />
        </a>
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <YtFit src={slide.thumb.src} alt={slide.thumb.alt} />
        </div>
      )}
    </div>
  );
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexShrink: 0 }}>
          <Kicker>{slide.kicker}</Kicker>
          <Kicker>Cyril / FAR</Kicker>
        </div>
        <Display
          size="md"
          style={{
            flexShrink: 0,
            marginTop: "calc(8px * var(--fs-u))",
            fontSize: "calc(52px * var(--fs-u))",
            lineHeight: 1.04,
            maxWidth: "18em",
          }}
        >
          {slide.title}
        </Display>
        {slide.context ? (
          <Body style={{ flexShrink: 0, marginTop: "calc(6px * var(--fs-u))", fontSize: "calc(21px * var(--fs-u))", fontWeight: 400, maxWidth: "42em" }}>
            {slide.context}
          </Body>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.28fr 1fr",
            gap: "calc(28px * var(--fs-u))",
            flex: 1,
            minHeight: 0,
            marginTop: "calc(12px * var(--fs-u))",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, gap: "calc(8px * var(--fs-u))" }}>
            {media}
            <div
              style={{
                flexShrink: 0,
                fontFamily: "var(--fs-font-display)",
                fontSize: "calc(21px * var(--fs-u))",
                fontWeight: 650,
                letterSpacing: "-0.03em",
                lineHeight: 1.25,
              }}
            >
              {slide.filmTitle}
            </div>
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "baseline",
                gap: "calc(14px * var(--fs-u))",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "calc(16px * var(--fs-u))", fontWeight: 600 }}>{slide.chain}</span>
              {href ? (
                <a className="far-studio-case-link" href={href} target="_blank" rel="noreferrer">
                  Voir la vidéo ↗
                </a>
              ) : null}
              {slide.guest ? (
                <span style={{ fontSize: "calc(16px * var(--fs-u))", color: "var(--fs-muted)" }}>{slide.guest}</span>
              ) : null}
            </div>
            {slide.excerpt ? (
              <div style={{ flexShrink: 0, paddingTop: "calc(10px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
                <Kicker>{slide.excerptKicker || "Extrait documenté"}</Kicker>
                <Body style={{ marginTop: 6, fontSize: "calc(16px * var(--fs-u))", fontWeight: 400 }}>{slide.excerpt}</Body>
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))", minHeight: 0 }}>
              {mechanics.map((row) => (
                <div key={row.label} style={{ paddingTop: "calc(8px * var(--fs-u))", borderTop: "1px solid var(--fs-line)", flexShrink: 0 }}>
                  <Kicker>
                    {row.n} {row.label}
                  </Kicker>
                  <Body style={{ marginTop: 6, fontSize: "calc(22px * var(--fs-u))", fontWeight: 400, maxWidth: "none" }}>{row.body}</Body>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto", paddingTop: "calc(12px * var(--fs-u))", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "var(--fs-font-display)",
                  fontSize: "calc(72px * var(--fs-u))",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                  whiteSpace: "nowrap",
                }}
              >
                {slide.resultValue}
              </div>
              <div style={{ fontSize: "calc(18px * var(--fs-u))", color: "var(--fs-muted)", marginTop: 6 }}>{slide.resultUnit}</div>
            </div>
          </div>
        </div>
        {slide.source ? (
          <div style={{ flexShrink: 0 }}>
            <Source>{slide.source}</Source>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Trois rapprochements, ou matrice enjeu / appui / proposition. */
export function OpenBridges({ slide }) {
  const columns = slide.columns || [];
  const rows = slide.rows || [];
  const matrix = columns.length === 3 && rows.length;
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ margin: "calc(8px * var(--fs-u)) 0 calc(22px * var(--fs-u))", fontSize: "calc(44px * var(--fs-u))", maxWidth: "16em", lineHeight: 1.06 }}>
          {slide.title}
        </Display>
        {matrix ? (
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "calc(24px * var(--fs-u))", flexShrink: 0 }}>
              {columns.map((col) => (
                <Kicker key={col}>{col}</Kicker>
              ))}
            </div>
            {rows.map((row) => (
              <div
                key={row.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "calc(24px * var(--fs-u))",
                  paddingTop: "calc(16px * var(--fs-u))",
                  marginTop: "calc(14px * var(--fs-u))",
                  borderTop: row.featured ? "3px solid var(--fs-accent)" : "1px solid var(--fs-line)",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {(row.cells || []).map((cell, i) => (
                  <div
                    key={`${row.id}-${i}`}
                    style={{
                      fontFamily: i === 0 ? "var(--fs-font-display)" : "var(--fs-font-body)",
                      fontSize: i === 0 ? "calc(24px * var(--fs-u))" : "calc(20px * var(--fs-u))",
                      fontWeight: i === 0 ? 700 : 400,
                      letterSpacing: i === 0 ? "-0.03em" : "0",
                      lineHeight: 1.25,
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="far-studio-grid-12" style={{ flex: 1, alignItems: "start" }}>
            {(slide.bridges || []).map((row, i) => (
              <div
                key={row.id}
                style={{
                  gridColumn: `${i * 4 + 1} / ${i * 4 + 5}`,
                  paddingTop: "calc(12px * var(--fs-u))",
                  borderTop: row.featured ? "3px solid var(--fs-accent)" : "1px solid var(--fs-line)",
                }}
              >
                {row.kicker ? <Kicker>{row.kicker}</Kicker> : null}
                <div
                  style={{
                    fontFamily: "var(--fs-font-display)",
                    fontSize: "calc(28px * var(--fs-u))",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    marginTop: 8,
                    lineHeight: 1.15,
                  }}
                >
                  {row.title}
                </div>
                <Body style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))", fontWeight: 400 }}>{row.body}</Body>
              </div>
            ))}
          </div>
        )}
        {slide.note ? (
          <Body style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(16px * var(--fs-u))", fontWeight: 400, flexShrink: 0 }}>{slide.note}</Body>
        ) : null}
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

/** Un partenariat, trois moments reliés, même poids. */
export function PartnershipArc({ slide }) {
  const moments = slide.moments || [];
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ margin: "calc(8px * var(--fs-u)) 0 0", fontSize: "calc(44px * var(--fs-u))", maxWidth: "16em", lineHeight: 1.06 }}>
          {slide.title}
        </Display>
        {slide.lead ? (
          <Display size="md" as="p" style={{ margin: "calc(4px * var(--fs-u)) 0 0", fontSize: "calc(36px * var(--fs-u))", maxWidth: "16em", fontWeight: 600 }}>
            {slide.lead}
          </Display>
        ) : null}
        {slide.body ? (
          <Body style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", fontWeight: 400, maxWidth: "36em" }}>
            {slide.body}
          </Body>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "calc(28px * var(--fs-u))",
            flex: 1,
            alignItems: "start",
            marginTop: "calc(28px * var(--fs-u))",
          }}
        >
          {moments.map((item, i) => (
            <div key={item.id} style={{ paddingTop: "calc(14px * var(--fs-u))", borderTop: "1px solid var(--fs-line)" }}>
              <Kicker>{item.kicker || `0${i + 1}`}</Kicker>
              <div
                style={{
                  fontFamily: "var(--fs-font-display)",
                  fontSize: "calc(26px * var(--fs-u))",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginTop: 10,
                  lineHeight: 1.15,
                }}
              >
                {item.title}
              </div>
              <Body style={{ marginTop: 10, fontSize: "calc(20px * var(--fs-u))", fontWeight: 400 }}>{item.body}</Body>
            </div>
          ))}
        </div>
        {slide.signature ? (
          <Body style={{ marginTop: "calc(8px * var(--fs-u))", fontSize: "calc(16px * var(--fs-u))", fontWeight: 400 }}>{slide.signature}</Body>
        ) : null}
        {slide.source ? <Source>{slide.source}</Source> : null}
      </div>
    </Reveal>
  );
}

/** Conclusion typographique, contact cliquable. */
export function TypeClose({ slide, theme }) {
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: EDITORIAL_PAD }}>
        <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={80} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="lg" style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(72px * var(--fs-u))", maxWidth: "12em", fontWeight: 700, lineHeight: 0.95 }}>
            {slide.title}
          </Display>
          {slide.title2 ? (
            <Display size="lg" as="p" style={{ marginTop: "calc(4px * var(--fs-u))", fontSize: "calc(72px * var(--fs-u))", maxWidth: "12em", fontWeight: 700, lineHeight: 0.95 }}>
              {slide.title2}
            </Display>
          ) : null}
          {slide.lead ? (
            <Body style={{ marginTop: "calc(18px * var(--fs-u))", fontSize: "calc(24px * var(--fs-u))", fontWeight: 400, maxWidth: "22em" }}>{slide.lead}</Body>
          ) : null}
          {slide.channels ? (
            <Body style={{ marginTop: "calc(16px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))", fontWeight: 500 }}>{slide.channels}</Body>
          ) : null}
        </div>
        <div>
          {slide.org ? (
            <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 650, letterSpacing: "-0.03em" }}>
              {slide.org}
            </div>
          ) : null}
          {slide.contactName ? (
            <Body style={{ marginTop: 6, fontSize: "calc(24px * var(--fs-u))", fontWeight: 500, color: "var(--fs-ink)" }}>{slide.contactName}</Body>
          ) : null}
          {slide.contactHref ? (
            <a className="far-studio-mail" href={slide.contactHref} style={{ display: "inline-block", marginTop: 8 }}>
              {slide.contactDetail}
            </a>
          ) : slide.contactDetail ? (
            <Body style={{ marginTop: 8 }}>{slide.contactDetail}</Body>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

/** Couverture immersive : photo pleine page, titre en overlay. */
export function CampaignCover({ slide, logos }) {
  const photo = slide.photo;
  const packshot = slide.packshot;
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%", background: "#071E32", color: "#F5F8FA" }}>
        {photo ? (
          <Photo src={photo.src} alt={photo.alt} focus={photo.focus} style={{ position: "absolute", inset: 0, height: "100%", borderRadius: 0 }} />
        ) : null}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(7,30,50,.92) 0%, rgba(7,30,50,.58) 42%, rgba(7,30,50,.12) 68%, rgba(7,30,50,.28) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "calc(36px * var(--fs-u)) calc(44px * var(--fs-u))",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <FarMark variant="yellow" size={78} />
            <LogoRow logos={logos || slide.logos} invert={false} />
          </div>
          <div style={{ maxWidth: "22em" }}>
            {slide.kicker ? <Kicker style={{ whiteSpace: "nowrap" }}>{slide.kicker}</Kicker> : null}
            <Display
              size="lg"
              style={{
                marginTop: "calc(14px * var(--fs-u))",
                fontSize: "calc(44px * var(--fs-u))",
                lineHeight: 1.06,
                color: "inherit",
              }}
            >
                {String(slide.title).split("\n").map((line) => (
                <span key={line} style={{ display: "block", whiteSpace: "nowrap" }}>{line}</span>
              ))}
            </Display>
            {slide.context ? (
              <Body lead style={{ marginTop: "calc(16px * var(--fs-u))", fontSize: "calc(22px * var(--fs-u))", color: "inherit", opacity: 0.88 }}>
                {slide.context}
              </Body>
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div style={{ fontSize: "calc(13px * var(--fs-u))", letterSpacing: "0.04em", color: "rgba(245,248,250,.55)" }}>{slide.tag}</div>
            {slide.photoCaption ? (
              <div className="far-studio-caption" style={{ color: "rgba(255,255,255,.7)", textShadow: "0 1px 8px rgba(0,0,0,.55)" }}>
                {slide.photoCaption}
              </div>
            ) : null}
          </div>
        </div>
        {packshot ? (
          <img
            src={asset(packshot.src)}
            alt={packshot.alt}
            style={{
              position: "absolute",
              right: "calc(36px * var(--fs-u))",
              bottom: "calc(32px * var(--fs-u))",
              height: "calc(148px * var(--fs-u))",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 14px 28px rgba(0,0,0,.5))",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        ) : null}
      </div>
    </Reveal>
  );
}

/** Portrait éditorial + chiffres amples + takeaways. */
export function CreatorSplit({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source} sourceLinks={slide.sourceLinks} style={DAY}>
        <div className="far-studio-grid-12" style={{ flex: 1, marginTop: "calc(8px * var(--fs-u))", gap: "calc(28px * var(--fs-u))" }}>
          <Photo
            src={slide.photo.src}
            alt={slide.photo.alt}
            focus={slide.photo.focus}
            credit={slide.photo.credit}
            style={{ gridColumn: "1 / 6", height: "100%", borderRadius: "var(--fs-radius)" }}
          />
          <div style={{ gridColumn: "6 / 13", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Display size="md" style={{ fontSize: "calc(40px * var(--fs-u))", maxWidth: "11em", lineHeight: 1.05 }}>
              {slide.title}
            </Display>
            <Body style={{ marginTop: "calc(12px * var(--fs-u))", fontSize: "calc(20px * var(--fs-u))", maxWidth: "28em" }}>{slide.body}</Body>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "calc(20px * var(--fs-u))",
                marginTop: "calc(22px * var(--fs-u))",
              }}
            >
              {(slide.metrics || []).map((m) => (
                <div key={m.label} style={{ borderTop: "3px solid var(--fs-accent)", paddingTop: "calc(10px * var(--fs-u))" }}>
                  <div
                    style={{
                      fontFamily: "var(--fs-font-display)",
                      fontSize: "calc(48px * var(--fs-u))",
                      fontWeight: 750,
                      letterSpacing: "-0.045em",
                      lineHeight: 1,
                    }}
                  >
                    {m.value}
                  </div>
                  <div className="far-studio-caption" style={{ marginTop: 8, fontSize: "calc(14px * var(--fs-u))" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "calc(12px * var(--fs-u))" }}>
              {(slide.takeaways || []).map((t) => (
                <div key={t.title} style={{ borderLeft: "2px solid var(--fs-accent)", paddingLeft: "calc(12px * var(--fs-u))" }}>
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {t.title}
                  </div>
                  <Body style={{ margin: "4px 0 0", fontSize: "calc(16px * var(--fs-u))", lineHeight: 1.35 }}>{t.body}</Body>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

function PlayMark() {
  return (
    <div className="far-studio-play" aria-hidden>
      <svg viewBox="0 0 48 48" width="100%" height="100%">
        <circle cx="24" cy="24" r="23" fill="rgba(7,30,50,.55)" stroke="#009CCC" strokeWidth="1.5" />
        <polygon points="20,15 20,33 34,24" fill="#F5F8FA" />
      </svg>
    </div>
  );
}

function openCase(onOpen, item) {
  onOpen?.({
    title: item.title,
    body: item.detail || item.nature,
    href: item.href,
    hrefLabel: item.hrefLabel || "Ouvrir la source",
  });
}

/** Preuve YouTube : featured + rail, pas une grille plate. */
export function TripleProof({ slide, onOpen }) {
  const cases = slide.cases || [];
  const featured = cases.find((c) => c.featured) || cases[0];
  const rail = cases.filter((c) => c !== featured);
  return (
    <Reveal>
      <div className="far-studio-slide far-studio-yt-stage" style={{ ...NIGHT, padding: "calc(26px * var(--fs-u)) calc(36px * var(--fs-u)) calc(18px * var(--fs-u))" }}>
        <div style={{ flexShrink: 0 }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="md" style={{ marginTop: 6, fontSize: "calc(32px * var(--fs-u))", color: "inherit", maxWidth: "20em", lineHeight: 1.08 }}>
            {slide.title}
          </Display>
          {slide.conclusion ? (
            <Body lead style={{ margin: "8px 0 0", fontSize: "calc(17px * var(--fs-u))", color: "inherit", maxWidth: "34em", opacity: 0.86 }}>
              {slide.conclusion}
            </Body>
          ) : null}
        </div>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, marginTop: "calc(14px * var(--fs-u))", gap: "calc(16px * var(--fs-u))" }}>
          {featured ? (
            <button
              type="button"
              className="far-studio-plain-btn"
              onClick={() => openCase(onOpen, featured)}
              style={{ gridColumn: "1 / 8", display: "flex", flexDirection: "column", minHeight: 0, textAlign: "left", color: "inherit" }}
            >
              <div className="far-studio-yt-player" style={{ flex: 1, minHeight: 0 }}>
                <img src={asset(featured.photo.src)} alt={featured.photo.alt} />
                <PlayMark />
                {featured.tag ? <span className="far-studio-yt-chip">{featured.tag}</span> : null}
                <span className="far-studio-yt-views" style={{ fontSize: "calc(28px * var(--fs-u))" }}>{featured.value}</span>
              </div>
              <div style={{ marginTop: "calc(8px * var(--fs-u))" }}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(17px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.25 }}>
                  {featured.title}
                </div>
                <div className="far-studio-caption" style={{ marginTop: 3, color: "rgba(245,248,250,.55)" }}>{featured.label} · {featured.nature}</div>
              </div>
            </button>
          ) : null}
          <div style={{ gridColumn: "8 / 13", display: "flex", flexDirection: "column", minHeight: 0, gap: "calc(10px * var(--fs-u))" }}>
            {rail.map((item) => (
              <button
                key={item.id}
                type="button"
                className="far-studio-plain-btn"
                onClick={() => openCase(onOpen, item)}
                style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", textAlign: "left", color: "inherit" }}
              >
                <div className="far-studio-yt-player far-studio-yt-player-sm" style={{ flex: 1, minHeight: 0 }}>
                  <img src={asset(item.photo.src)} alt={item.photo.alt} />
                  {item.tag ? <span className="far-studio-yt-chip">{item.tag}</span> : null}
                  <span className="far-studio-yt-views" style={{ fontSize: "calc(22px * var(--fs-u))" }}>{item.value}</span>
                </div>
                <div style={{ marginTop: 6, fontFamily: "var(--fs-font-display)", fontSize: "calc(15px * var(--fs-u))", fontWeight: 650, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
                  {item.title}
                </div>
                <div className="far-studio-caption" style={{ color: "rgba(245,248,250,.5)" }}>{item.label}</div>
              </button>
            ))}
          </div>
        </div>
        <SourceBlock source={slide.source} sourceLinks={slide.sourceLinks} />
      </div>
    </Reveal>
  );
}

/** Split schématique : deux mondes, la montre comme pont. */
export function LinkMechanic({ slide }) {
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%", ...NIGHT }}>
        <div style={{ padding: "calc(26px * var(--fs-u)) calc(40px * var(--fs-u)) calc(10px * var(--fs-u))", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div>
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display size="md" style={{ marginTop: 6, fontSize: "calc(36px * var(--fs-u))", color: "inherit", maxWidth: "14em" }}>
              {slide.title}
            </Display>
          </div>
          {slide.beat ? (
            <Body lead style={{ margin: 0, fontSize: "calc(18px * var(--fs-u))", color: "inherit", maxWidth: "18em", textAlign: "right" }}>
              {slide.beat}
            </Body>
          ) : null}
        </div>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, gap: 0, position: "relative" }}>
          <SplitPane side={slide.left} column="1 / 6" />
          <div
            style={{
              gridColumn: "6 / 8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "calc(8px * var(--fs-u))",
              position: "relative",
              minHeight: 0,
              background: "#071E32",
            }}
          >
            <div className="far-studio-link-line" aria-hidden style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "#009CCC" }} />
            {slide.packshot ? (
              <img
                src={asset(slide.packshot.src)}
                alt={slide.packshot.alt}
                style={{
                  height: "calc(150px * var(--fs-u))",
                  width: "auto",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                  filter: "drop-shadow(0 8px 18px rgba(0,0,0,.5))",
                }}
              />
            ) : null}
            <div
              style={{
                fontFamily: "var(--fs-font-display)",
                fontSize: "calc(11px * var(--fs-u))",
                fontWeight: 650,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#009CCC",
                position: "relative",
                zIndex: 1,
              }}
            >
              {slide.linkLabel}
            </div>
          </div>
          <SplitPane side={slide.right} column="8 / 13" />
        </div>
        {slide.schemaNote ? (
          <div className="far-studio-caption" style={{ padding: "calc(10px * var(--fs-u)) calc(40px * var(--fs-u)) calc(16px * var(--fs-u))", color: "rgba(245,248,250,.45)" }}>
            {slide.schemaNote}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function SplitPane({ side, column }) {
  if (!side) return null;
  const top = side.labelPos === "top";
  return (
    <div style={{ gridColumn: column, position: "relative", minHeight: 0, height: "100%" }}>
      <Photo src={side.photo.src} alt={side.photo.alt} focus={side.photo.focus} style={{ height: "100%" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: top
            ? "linear-gradient(180deg, rgba(7,30,50,.58) 0%, rgba(7,30,50,.08) 36%, transparent 55%)"
            : "linear-gradient(180deg, rgba(7,30,50,.06) 42%, rgba(7,30,50,.78) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 18, right: 18, ...(top ? { top: 16 } : { bottom: 16 }) }}>
        <Kicker>{side.kicker}</Kicker>
        <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(26px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>
          {side.title}
        </div>
        {side.caption ? (
          <div className="far-studio-caption" style={{ marginTop: 4, color: "rgba(255,255,255,.7)" }}>{side.caption}</div>
        ) : null}
      </div>
    </div>
  );
}

/** Storyboard cinématographique en 3 actes. */
export function Storyboard({ slide }) {
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%", ...NIGHT }}>
        <div style={{ padding: "calc(24px * var(--fs-u)) calc(36px * var(--fs-u)) calc(12px * var(--fs-u))", flexShrink: 0 }}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display size="md" style={{ marginTop: 6, fontSize: "calc(36px * var(--fs-u))", color: "inherit" }}>
            {slide.title}
          </Display>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.15fr 1fr 1.1fr", gap: "calc(8px * var(--fs-u))", padding: "0 calc(36px * var(--fs-u)) calc(24px * var(--fs-u))" }}>
          {(slide.scenes || []).map((scene) => (
            <div key={scene.id} style={{ position: "relative", minHeight: 0, borderRadius: "var(--fs-radius)", overflow: "hidden" }}>
              <Photo src={scene.photo.src} alt={scene.photo.alt} focus={scene.photo.focus} style={{ height: "100%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,30,50,.15) 30%, rgba(7,30,50,.88) 100%)" }} />
              <div style={{ position: "absolute", left: 16, right: 16, top: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Kicker>{scene.kicker}</Kicker>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 750, letterSpacing: "-0.04em", color: "#5EC8E8", textShadow: "0 2px 10px rgba(0,0,0,.55)" }}>
                  {scene.n}
                </div>
              </div>
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}>
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  {scene.title}
                </div>
                <Body style={{ margin: "6px 0 0", fontSize: "calc(16px * var(--fs-u))", color: "inherit", lineHeight: 1.3 }}>{scene.line}</Body>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** Produit dans l’histoire : packshot + 3 scènes d’usage. */
export function ProductRole({ slide }) {
  return (
    <Reveal>
      <SlideShell kicker={slide.kicker} source={slide.source} sourceLinks={slide.sourceLinks} style={DAY}>
        <Display size="md" style={{ margin: "calc(2px * var(--fs-u)) 0 calc(14px * var(--fs-u))", fontSize: "calc(36px * var(--fs-u))" }}>
          {slide.title}
        </Display>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, gap: "calc(20px * var(--fs-u))" }}>
          <div
            style={{
              gridColumn: "1 / 5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#071E32",
              borderRadius: "var(--fs-radius)",
              minHeight: 0,
              padding: "calc(18px * var(--fs-u))",
            }}
          >
            <img
              src={asset(slide.packshot.src)}
              alt={slide.packshot.alt}
              style={{ height: "calc(280px * var(--fs-u))", width: "auto", maxWidth: "88%", objectFit: "contain" }}
            />
            {slide.split ? (
              <div style={{ marginTop: "calc(16px * var(--fs-u))", color: "#F5F8FA", textAlign: "center" }}>
                <Body style={{ margin: 0, fontSize: "calc(15px * var(--fs-u))", color: "inherit", lineHeight: 1.35 }}>{slide.split.kids}</Body>
                <Body style={{ margin: "6px 0 0", fontSize: "calc(15px * var(--fs-u))", color: "rgba(245,248,250,.7)", lineHeight: 1.35 }}>{slide.split.parents}</Body>
              </div>
            ) : null}
          </div>
          <div style={{ gridColumn: "5 / 13", display: "flex", flexDirection: "column", minHeight: 0, gap: "calc(10px * var(--fs-u))" }}>
            {(slide.usages || []).map((u) => (
              <div key={u.id} style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "calc(14px * var(--fs-u))", alignItems: "stretch" }}>
                <div style={{ borderRadius: "var(--fs-radius-sm)", overflow: "hidden", minHeight: 0 }}>
                  <Photo src={u.photo.src} alt={u.photo.alt} focus={u.photo.focus} style={{ height: "100%" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "2px solid var(--fs-accent)", paddingTop: "calc(8px * var(--fs-u))" }}>
                  <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(24px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {u.title}
                  </div>
                  <Body style={{ margin: "4px 0 0", fontSize: "calc(18px * var(--fs-u))", lineHeight: 1.3 }}>{u.story}</Body>
                </div>
              </div>
            ))}
            <div style={{ flexShrink: 0 }}>
              <Body style={{ margin: 0, fontSize: "calc(14px * var(--fs-u))" }}>{slide.productNote}</Body>
              {slide.modelNote ? <div className="far-studio-caption" style={{ marginTop: 4 }}>{slide.modelNote}</div> : null}
            </div>
          </div>
        </div>
      </SlideShell>
    </Reveal>
  );
}

/** Hero content dominant + extensions secondaires. */
export function HeroDevice({ slide }) {
  const hero = slide.hero || {};
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: "calc(26px * var(--fs-u)) calc(36px * var(--fs-u))", height: "100%", ...NIGHT }}>
        {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
        <Display size="md" style={{ marginTop: 6, fontSize: "calc(32px * var(--fs-u))", color: "inherit", maxWidth: "18em" }}>
          {slide.title}
        </Display>
        <div className="far-studio-grid-12" style={{ flex: 1, minHeight: 0, marginTop: "calc(14px * var(--fs-u))", gap: "calc(16px * var(--fs-u))" }}>
          <div style={{ gridColumn: "1 / 9", position: "relative", minHeight: 0, borderRadius: "var(--fs-radius)", overflow: "hidden" }}>
            {hero.photo ? <Photo src={hero.photo.src} alt={hero.photo.alt} focus={hero.photo.focus} style={{ height: "100%" }} /> : null}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,30,50,.05) 40%, rgba(7,30,50,.82) 100%)" }} />
            <PlayMark />
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
              <Kicker>{hero.kicker}</Kicker>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(28px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>
                {hero.title}
              </div>
              <Body style={{ margin: "6px 0 0", fontSize: "calc(16px * var(--fs-u))", color: "inherit", maxWidth: "28em" }}>{hero.body}</Body>
              {hero.caption ? <div className="far-studio-caption" style={{ marginTop: 6, color: "rgba(255,255,255,.62)" }}>{hero.caption}</div> : null}
            </div>
          </div>
          <div style={{ gridColumn: "9 / 13", display: "flex", flexDirection: "column", minHeight: 0, gap: "calc(10px * var(--fs-u))" }}>
            {(slide.modules || []).map((m, i) => (
              <div
                key={m.id}
                style={{
                  flex: 1,
                  minHeight: 0,
                  borderTop: i === 0 ? "2px solid #009CCC" : "1px solid rgba(245,248,250,.16)",
                  paddingTop: "calc(10px * var(--fs-u))",
                }}
              >
                <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(18px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {m.title}
                </div>
                <Body style={{ margin: "6px 0 0", fontSize: "calc(15px * var(--fs-u))", color: "inherit", lineHeight: 1.35 }}>{m.body}</Body>
              </div>
            ))}
            {slide.season ? (
              <div className="far-studio-caption" style={{ color: "rgba(245,248,250,.55)" }}>{slide.season}</div>
            ) : null}
          </div>
        </div>
        {slide.perimeter ? (
          <div className="far-studio-caption" style={{ marginTop: "calc(10px * var(--fs-u))", color: "rgba(245,248,250,.45)" }}>
            {slide.perimeter}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Clôture : photo + timeline + statement. */
export function CloseCalendar({ slide, theme }) {
  return (
    <Reveal>
      <div className="far-studio-slide" style={{ padding: 0, height: "100%", ...NIGHT }}>
        <div className="far-studio-grid-12" style={{ height: "100%", gap: 0, flex: 1 }}>
          <div
            style={{
              gridColumn: "1 / 7",
              padding: "calc(32px * var(--fs-u)) calc(40px * var(--fs-u))",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <FarMark variant={theme?.id === "ink" ? "yellow" : "black"} size={68} />
            </div>
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display size="md" style={{ marginTop: "calc(8px * var(--fs-u))", fontSize: "calc(34px * var(--fs-u))", color: "inherit", maxWidth: "12em" }}>
              {slide.title}
            </Display>
            {slide.window ? (
              <div
                style={{
                  marginTop: "calc(12px * var(--fs-u))",
                  fontFamily: "var(--fs-font-display)",
                  fontSize: "calc(16px * var(--fs-u))",
                  fontWeight: 650,
                  color: "#5EC8E8",
                }}
              >
                {slide.window}
              </div>
            ) : null}
            <div style={{ marginTop: "calc(20px * var(--fs-u))", display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "calc(8px * var(--fs-u))" }}>
              {(slide.markers || []).map((m, i) => (
                <div key={m.when} style={{ borderTop: i === 0 ? "3px solid #009CCC" : "1px solid rgba(245,248,250,.2)", paddingTop: "calc(8px * var(--fs-u))" }}>
                  <Kicker>{m.when}</Kicker>
                  <Body style={{ margin: "6px 0 0", fontSize: "calc(14px * var(--fs-u))", color: "inherit", lineHeight: 1.3 }}>{m.title}</Body>
                </div>
              ))}
            </div>
            {slide.statement ? (
              <Body lead style={{ marginTop: "auto", fontSize: "calc(20px * var(--fs-u))", color: "inherit", whiteSpace: "pre-line", maxWidth: "18em" }}>
                {slide.statement}
              </Body>
            ) : (
              <Body lead style={{ marginTop: "auto", fontSize: "calc(20px * var(--fs-u))", color: "inherit" }}>
                {slide.action}
              </Body>
            )}
            <div style={{ marginTop: "calc(14px * var(--fs-u))" }}>
              <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(16px * var(--fs-u))", fontWeight: 650 }}>{slide.org}</div>
              <Body style={{ margin: "2px 0 0", fontSize: "calc(16px * var(--fs-u))", color: "inherit" }}>{slide.contactName}</Body>
              {slide.contactHref ? (
                <a className="far-studio-mail" href={slide.contactHref} style={{ display: "inline-block", marginTop: 4, fontSize: "calc(15px * var(--fs-u))", color: "inherit" }}>
                  {slide.contactDetail}
                </a>
              ) : null}
              {slide.disclaimer ? (
                <div className="far-studio-caption" style={{ marginTop: 8, color: "rgba(245,248,250,.45)" }}>{slide.disclaimer}</div>
              ) : null}
            </div>
          </div>
          <div style={{ gridColumn: "7 / 13", position: "relative", minHeight: 0, height: "100%" }}>
            {slide.photo ? <Photo src={slide.photo.src} alt={slide.photo.alt} focus={slide.photo.focus} style={{ height: "100%" }} /> : null}
            {slide.photoCaption ? (
              <div className="far-studio-caption" style={{ position: "absolute", left: 14, bottom: 12, color: "rgba(255,255,255,.78)", maxWidth: "90%" }}>
                {slide.photoCaption}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}


function LogoRow({ logos, invert }) {
  if (!logos?.length) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "calc(14px * var(--fs-u))" }}>
      {logos.map((logo) => (
        <LogoMark
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          height={logo.height || 28}
          invert={logo.keepColor ? false : invert}
        />
      ))}
    </div>
  );
}

export function StudioLayout({ slide, ...ctx }) {
  const Cmp = LAYOUTS[slide.layout] || Insight;
  return <Cmp slide={slide} {...ctx} />;
}
