import { formatAmount, sumValues } from "./math.js";

export { formatAmount, sumValues };

const CHART = ["var(--fs-chart-1)", "var(--fs-chart-2)", "var(--fs-chart-3)", "var(--fs-chart-4)", "var(--fs-chart-5)"];

/** Barres horizontales : comparaison. Les totaux viennent uniquement des `items`. */
export function BarChart({ items, unit = "", uid = "fs-bar", onSelect, activeId }) {
  const total = sumValues(items);
  const max = Math.max(...items.map((i) => Number(i.value || 0)), 1);
  return (
    <div role="list" aria-label="Répartition" style={{ display: "flex", flexDirection: "column", gap: "calc(18px * var(--fs-u))", flex: 1, justifyContent: "space-evenly", width: "100%" }}>
      {items.map((item, i) => {
        const value = Number(item.value || 0);
        const pct = total ? Math.round((value / total) * 100) : 0;
        const selected = activeId === item.id;
        return (
          <button
            key={item.id || i}
            type="button"
            role="listitem"
            onClick={() => onSelect?.(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(item);
              }
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 2fr) auto",
              gap: "calc(12px * var(--fs-u))",
              alignItems: "center",
              background: "none",
              border: 0,
              padding: 0,
              textAlign: "left",
              cursor: onSelect ? "pointer" : "default",
              color: "inherit",
              font: "inherit",
              opacity: activeId && !selected ? 0.45 : 1,
            }}
          >
            <span style={{ fontSize: "calc(18px * var(--fs-u))", fontWeight: 600 }}>{item.label}</span>
            <span style={{ height: "calc(22px * var(--fs-u))", background: "var(--fs-line)", borderRadius: 99, overflow: "hidden", display: "block" }}>
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${(value / max) * 100}%`,
                  background: item.color || CHART[i % CHART.length],
                  borderRadius: 99,
                }}
              />
            </span>
            <span style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(20px * var(--fs-u))", fontWeight: 700, whiteSpace: "nowrap" }}>
              {formatAmount(value, unit)}
              <span style={{ fontSize: "calc(13px * var(--fs-u))", fontWeight: 500, color: "var(--fs-faint)", marginLeft: 8 }}>{pct}%</span>
            </span>
          </button>
        );
      })}
      <svg width="0" height="0" aria-hidden>
        <title>{uid}</title>
      </svg>
    </div>
  );
}

/** Flux simple : répartition d’un total vers des destinations. */
export function FlowChart({ source, items, unit = "", uid = "fs-flow" }) {
  const total = sumValues(items);
  const h = 220;
  const w = 520;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${uid}-title`} style={{ width: "100%", height: "auto", maxHeight: "calc(280px * var(--fs-u))" }}>
      <title id={`${uid}-title`}>{source} · {formatAmount(total, unit)}</title>
      <rect x="0" y="70" width="140" height="80" rx="10" fill="var(--fs-contrast)" />
      <text x="70" y="104" textAnchor="middle" fill="var(--fs-contrast-ink)" fontSize="13" fontFamily="Figtree, sans-serif">{source}</text>
      <text x="70" y="126" textAnchor="middle" fill="var(--fs-accent)" fontSize="16" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif">{formatAmount(total, unit)}</text>
      {items.map((item, i) => {
        const y = 16 + i * ((h - 32) / Math.max(items.length, 1));
        const yh = Math.max(28, (h - 32) / items.length - 8);
        return (
          <g key={item.id || i}>
            <path d={`M140 110 C 250 110, 250 ${y + yh / 2}, 320 ${y + yh / 2}`} fill="none" stroke={item.color || CHART[i % CHART.length]} strokeWidth="6" opacity="0.85" />
            <rect x="320" y={y} width="200" height={yh} rx="8" fill="var(--fs-surface)" stroke="var(--fs-line)" />
            <text x="336" y={y + yh / 2 - 4} fill="var(--fs-ink)" fontSize="12" fontFamily="Figtree, sans-serif">{item.label}</text>
            <text x="336" y={y + yh / 2 + 14} fill="var(--fs-ink)" fontSize="14" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif">{formatAmount(item.value, unit)}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Frise : phasage dans le temps. */
export function Timeline({ steps, uid = "fs-time" }) {
  return (
    <ol id={uid} style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`, gap: "calc(14px * var(--fs-u))", listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
      {steps.map((step, i) => (
        <li key={step.id || i} style={{ display: "flex", flexDirection: "column", gap: "calc(10px * var(--fs-u))" }}>
          <div style={{ height: 3, background: "var(--fs-line)", position: "relative", marginTop: 8 }}>
            <span style={{ position: "absolute", left: 0, top: -5, width: 13, height: 13, borderRadius: "50%", background: "var(--fs-accent)" }} />
          </div>
          <div className="far-studio-kicker">{step.when}</div>
          <div style={{ fontFamily: "var(--fs-font-display)", fontSize: "calc(22px * var(--fs-u))", fontWeight: 700, letterSpacing: "-0.03em" }}>{step.title}</div>
          <p className="far-studio-body" style={{ fontSize: "calc(18px * var(--fs-u))", margin: 0 }}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
