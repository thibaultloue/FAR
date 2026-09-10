import { asset } from "./asset.js";
import { Body, Display, FarMark, Kicker, LogoMark, Photo, Reveal, Source } from "./primitives.jsx";
import { BarChart, FlowChart, Timeline, NodeFlow, formatAmount, sumValues } from "./diagrams.jsx";

export const LAYOUTS = {
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
};

function SlideShell({ kicker, source, children, style }) {
  return (
    <div className="far-studio-slide" style={style}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
      {source ? <Source>{source}</Source> : null}
    </div>
  );
}

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
                {slide.contact ? <Body style={{ marginTop: "calc(14px * var(--fs-u))", fontSize: "calc(18px * var(--fs-u))" }}>{slide.contact}</Body> : null}
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
          {slide.contact ? <Body style={{ marginTop: "calc(14px * var(--fs-u))" }}>{slide.contact}</Body> : null}
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
        <Body style={{ fontSize: "calc(16px * var(--fs-u))", margin: 0 }}>{video.role}</Body>
      </div>
    </button>
  );
}

function LogoRow({ logos, invert }) {
  if (!logos?.length) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "calc(14px * var(--fs-u))" }}>
      {logos.map((logo) => (
        <LogoMark key={logo.alt} src={logo.src} alt={logo.alt} height={logo.height || 28} invert={invert} />
      ))}
    </div>
  );
}

export function renderLayout(slide, ctx) {
  const Cmp = LAYOUTS[slide.layout] || Insight;
  return <Cmp slide={slide} {...ctx} />;
}
