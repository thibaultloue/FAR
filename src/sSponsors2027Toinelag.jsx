import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Atelier interne FAR — TOINELAG 2027.
 * Toinelag · Toinelag Gaming / +.
 */
export function createSSponsors2027Toinelag(P) {
  const { FarLogo, pu } = P;

  const isPdf = () => Boolean(globalThis.__FAR_PDF_EXPORT);
  const vis = { opacity: 1, y: 0, x: 0, scale: 1 };
  const pdfVisibleStyle = (style) => ({ opacity: 1, transform: "none", filter: "none", ...style });
  const M = ({ children, style, className, variants: _v, initial: _i, animate: _a, exit: _e, transition: _t, ...rest }) =>
    isPdf() ? (
      <div className={className} style={pdfVisibleStyle(style)} {...rest}>
        {children}
      </div>
    ) : (
      <motion.div className={className} style={style} variants={_v} initial={_i} animate={_a} exit={_e} transition={_t} {...rest}>
        {children}
      </motion.div>
    );
  const MV = (extra = {}) => (isPdf() ? { initial: false, animate: "v", ...extra } : { initial: "h", animate: "v", ...extra });
  const stg = (d = 0.04) => (isPdf() ? { v: { transition: { staggerChildren: 0 } } } : { h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 8) => (isPdf() ? { v: vis } : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.28 } } });

  const IF = { fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" };
  const se = IF;
  const sa = IF;
  const mo = IF;

  const INK = "#141414";
  const MUTED = "rgba(20,20,20,.58)";
  const FAINT = "rgba(20,20,20,.34)";
  const LINE = "rgba(20,20,20,.12)";
  const Y = "#1E74E8";
  const Y2 = "#FFE14A";

  const AVATAR = {
    main: pu("/toinelag.webp"),
    gaming: pu("/havas/toinelaggaming-avatar.jpg"),
  };

  const ChAvatar = ({ ch, size = 28 }) => (
    <img
      src={AVATAR[ch] || AVATAR.main}
      alt=""
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${Y}`,
        display: "block",
        flexShrink: 0,
      }}
    />
  );

  const STORE = "far_ws_sponsors2027_toinelag_v1";
  const readWs = (key) => {
    try {
      return localStorage.getItem(key) || "";
    } catch {
      return "";
    }
  };
  const writeWs = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  };
  const Fill = ({ id, placeholder = "", s, rows = 2, minH = 52 }) => {
    const ref = useRef(null);
    const key = `${STORE}_${id}`;
    const [val, setVal] = useState(() => readWs(key));
    const baseStyle = {
      ...sa,
      width: "100%",
      boxSizing: "border-box",
      border: "none",
      borderBottom: `1px dashed ${LINE}`,
      background: "transparent",
      color: INK,
      fontSize: 15,
      lineHeight: 1.4,
      minHeight: minH,
      padding: "8px 0 10px",
      outline: "none",
      display: "block",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      ...s,
    };
    const grow = () => {
      const el = ref.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, minH)}px`;
    };
    const persist = (next) => {
      setVal(next);
      writeWs(key, next);
    };
    useEffect(() => {
      grow();
    }, [val, minH]);
    useEffect(() => {
      const flush = () => writeWs(key, ref.current?.value ?? val);
      window.addEventListener("beforeunload", flush);
      return () => window.removeEventListener("beforeunload", flush);
    }, [key, val]);
    if (isPdf()) {
      return <div style={baseStyle}>{val || "\u00a0"}</div>;
    }
    return (
      <textarea
        ref={ref}
        rows={rows}
        value={val}
        data-ws-key={key}
        placeholder={placeholder}
        onChange={(e) => {
          persist(e.target.value);
          grow();
        }}
        onBlur={(e) => persist(e.target.value)}
        onPointerDownCapture={(e) => e.stopPropagation()}
        onMouseDownCapture={(e) => e.stopPropagation()}
        style={{ ...baseStyle, resize: "none", overflow: "hidden" }}
      />
    );
  };

  const Step = ({ n, children }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color: FAINT, marginBottom: 8 }}>
      {n} · {children}
    </div>
  );
  const Title = ({ children, s }) => (
    <div style={{ ...se, fontSize: 32, fontWeight: 700, letterSpacing: "-0.034em", lineHeight: 1.1, color: INK, marginBottom: 8, ...s }}>
      {children}
    </div>
  );
  const Lead = ({ children, s }) => (
    <div style={{ ...sa, fontSize: 16, color: MUTED, lineHeight: 1.45, maxWidth: 900, marginBottom: 22, ...s }}>{children}</div>
  );

  const ChannelCols = ({ prefix, fields, compact = false }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: compact ? 36 : 48 }}>
      {[
        { id: "main", name: "Toinelag" },
        { id: "gaming", name: "Toinelag Gaming / +" },
      ].map((ch) => (
        <div key={ch.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: compact ? 10 : 16,
              paddingBottom: compact ? 8 : 12,
              borderBottom: `2px solid ${INK}`,
            }}
          >
            <ChAvatar ch={ch.id} size={compact ? 28 : 32} />
            <div style={{ ...se, fontSize: compact ? 18 : 20, fontWeight: 700, color: INK }}>{ch.name}</div>
          </div>
          {fields.map((f) => (
            <div key={f.id} style={{ marginBottom: compact ? 8 : 18 }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: FAINT, marginBottom: 2 }}>{f.l}</div>
              <Fill
                id={`${prefix}_${ch.id}_${f.id}`}
                placeholder={f.p || ""}
                minH={compact ? 38 : 52}
                s={{ fontSize: compact ? 14 : 16, padding: compact ? "4px 0 6px" : "8px 0 10px" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return [
    {
      title: "Couverture",
      r: (t) => (
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "stretch", width: "100%", minHeight: 440 }}>
          <M
            {...MV()}
            variants={fu(10)}
            style={{
              background: INK,
              borderRadius: 8,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <FarLogo size={56} variant="yellow" />
              <div style={{ ...se, fontSize: 28, fontWeight: 800, letterSpacing: "-0.05em", color: Y2, marginTop: 16, lineHeight: 0.9 }}>FAR</div>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <img
                src={AVATAR.main}
                alt="Toinelag"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                  marginBottom: 14,
                  border: `2px solid ${Y}`,
                }}
              />
              <div style={{ ...se, fontSize: 15, fontWeight: 700, color: Y2, letterSpacing: "-0.02em" }}>Toinelag</div>
              <div style={{ ...sa, fontSize: 12, color: "rgba(255,251,239,.5)", marginTop: 2 }}>YouTube · Gaming / +</div>
            </div>
          </M>
          <M {...MV()} variants={fu(12)} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Step n="00">Plan</Step>
            <Title s={{ fontSize: 42, marginBottom: 8 }}>TOINELAG 2027</Title>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <ChAvatar ch="main" size={26} />
              <ChAvatar ch="gaming" size={26} />
              <div style={{ ...se, fontSize: 18, fontWeight: 600, color: t.a }}>YouTube · Gaming / +</div>
            </div>
            <div style={{ width: 44, height: 4, background: Y, margin: "14px 0 20px" }} />
            <div style={{ display: "grid", gap: 9 }}>
              {["01  Bilan", "02  Formats", "03  Priorités", "04  No go", "05  Envies", "06  Marronniers", "07  Idéation"].map((line) => (
                <div key={line} style={{ ...sa, fontSize: 16, color: INK }}>
                  {line}
                </div>
              ))}
            </div>
          </M>
        </div>
      ),
    },

    {
      title: "Bilan",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="01">Bilan</Step>
          <Title s={{ marginBottom: 4, fontSize: 28 }}>Bilan 2026</Title>
          <Lead s={{ marginBottom: 14, fontSize: 15 }}>Par chaîne.</Lead>
          <ChannelCols
            prefix="bilan"
            compact
            fields={[
              { id: "deal", l: "Meilleur deal financier", p: "Marque · opération" },
              { id: "rel", l: "Meilleure relation", p: "Marque" },
              { id: "dev", l: "À développer", p: "Marque · piste" },
              { id: "stop", l: "À arrêter", p: "Marque · raison" },
              { id: "learn", l: "Learnings", p: "Ce qu'on retient" },
            ]}
          />
        </M>
      ),
    },

    {
      title: "Formats",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="02">Formats</Step>
          <Title>Formats</Title>
          <Lead>Par chaîne.</Lead>
          <ChannelCols
            prefix="fmt"
            fields={[
              { id: "best", l: "Meilleur format", p: "Format" },
              { id: "worst", l: "Pire format", p: "Format" },
              { id: "dev", l: "Format à développer", p: "Format" },
            ]}
          />
        </M>
      ),
    },

    {
      title: "Priorités",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="03">Priorités</Step>
          <Title s={{ marginBottom: 6, fontSize: 30 }}>Priorités 2027</Title>
          <Lead s={{ marginBottom: 14, fontSize: 15 }}>Thématique + marques cibles, par chaîne.</Lead>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${LINE}` }}>
            {["Retail / GMS", "Jouet & licences kids", "Construction / DIY", "Gaming familial", "FMCG familiale", "Divertissement kids"].map((theme, i) => (
              <div key={theme} style={{ ...sa, fontSize: 13, color: MUTED }}>
                <span style={{ color: Y, fontWeight: 700, marginRight: 5 }}>{String(i + 1).padStart(2, "0")}</span>
                {theme}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { id: "main", name: "Toinelag" },
              { id: "gaming", name: "Toinelag Gaming / +" },
            ].map((ch) => (
              <div key={ch.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${INK}`,
                  }}
                >
                  <ChAvatar ch={ch.id} size={30} />
                  <div style={{ ...se, fontSize: 18, fontWeight: 700, color: INK }}>{ch.name}</div>
                </div>
                {[1, 2, 3].map((n) => (
                  <div key={n} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${LINE}` }}>
                    <div style={{ ...se, fontSize: 13, fontWeight: 800, color: Y, marginBottom: 8 }}>{String(n).padStart(2, "0")}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 12 }}>
                      <div>
                        <div style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: FAINT, marginBottom: 2 }}>Thématique</div>
                        <Fill id={`prio_${ch.id}_${n}_theme`} placeholder="Thématique" s={{ fontSize: 15 }} />
                      </div>
                      <div>
                        <div style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: FAINT, marginBottom: 2 }}>Marques</div>
                        <Fill id={`prio_${ch.id}_${n}_brands`} placeholder="Marques cibles" s={{ fontSize: 15 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </M>
      ),
    },

    {
      title: "No go",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="04">No go</Step>
          <Title>Les no go</Title>
          <Lead>Ce qu'on ne fait pas en 2027. Par chaîne.</Lead>
          <ChannelCols
            prefix="nogo"
            fields={[
              { id: "1", l: "No go 1", p: "Marque, format, territoire…" },
              { id: "2", l: "No go 2", p: "" },
              { id: "3", l: "No go 3", p: "" },
              { id: "4", l: "No go 4", p: "" },
            ]}
          />
        </M>
      ),
    },

    {
      title: "Envies",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="05">Envies</Step>
          <Title>Envies de Toinelag</Title>
          <Lead>Avant le calendrier et l'idéation.</Lead>
          <ChannelCols
            prefix="envie"
            fields={[
              { id: "1", l: "Envie 1", p: "Contenu, collab, magasin, format…" },
              { id: "2", l: "Envie 2", p: "" },
              { id: "3", l: "Envie 3", p: "" },
              { id: "4", l: "Envie 4", p: "" },
            ]}
          />
        </M>
      ),
    },

    {
      title: "Marronniers",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="06">Calendrier</Step>
          <Title>Marronniers 2027</Title>
          <Lead>Dates grand public. Trois activations à retenir.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginBottom: 28 }}>
            {[
              {
                s: "Jan — mars",
                items: ["Vacances d'hiver", "Saint-Valentin", "Pâques"],
              },
              {
                s: "Avr — juin",
                items: ["Vacances de printemps", "Ponts de mai", "Fête des mères", "Fête des pères"],
              },
              {
                s: "Juil — sept",
                items: ["Grandes vacances", "Rentrée"],
              },
              {
                s: "Oct — déc",
                items: ["Toussaint", "Black Friday", "Noël"],
              },
            ].map((col) => (
              <div key={col.s}>
                <div
                  style={{
                    ...mo,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    color: Y,
                    marginBottom: 14,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${INK}`,
                  }}
                >
                  {col.s}
                </div>
                {col.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      ...se,
                      fontSize: 16,
                      fontWeight: 600,
                      color: INK,
                      padding: "10px 0",
                      borderBottom: `1px solid ${LINE}`,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ paddingTop: 8, borderTop: `1px solid ${LINE}` }}>
            <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: FAINT, marginBottom: 14 }}>
              Activations retenues
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "36px 1.1fr .7fr 1.3fr", gap: 14, marginBottom: 6 }}>
              {["", "Date", "Chaîne", "Piste / marque"].map((h) => (
                <div key={h || "n"} style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: FAINT }}>
                  {h}
                </div>
              ))}
            </div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "36px 1.1fr .7fr 1.3fr",
                  gap: 14,
                  padding: "8px 0",
                  borderBottom: `1px solid ${LINE}`,
                  alignItems: "center",
                }}
              >
                <div style={{ ...se, fontSize: 14, fontWeight: 800, color: Y }}>{String(n).padStart(2, "0")}</div>
                <Fill id={`marr_date_${n}`} placeholder="" s={{ fontSize: 15 }} />
                <Fill id={`marr_ch_${n}`} placeholder="Toinelag / Gaming" s={{ fontSize: 15 }} />
                <Fill id={`marr_piste_${n}`} placeholder="" s={{ fontSize: 15 }} />
              </div>
            ))}
          </div>
        </M>
      ),
    },

    {
      title: "Idéation",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="07">Idéation</Step>
          <Title>Concepts à pitcher</Title>
          <Lead>2 à 3 concepts clé en main.</Lead>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ paddingTop: 4 }}>
                <div style={{ ...se, fontSize: 15, fontWeight: 800, color: Y, marginBottom: 14, letterSpacing: "-0.02em" }}>
                  Concept {String(n).padStart(2, "0")}
                </div>
                {[
                  { id: "title", l: "Titre", p: "Nom du concept" },
                  { id: "angle", l: "Angle", p: "Une phrase" },
                  { id: "ch", l: "Chaîne", p: "Toinelag / Gaming" },
                  { id: "brand", l: "Marque cible", p: "Marque" },
                  { id: "pitch", l: "Pitch", p: "Ce qu'on vend, clé en main" },
                ].map((f) => (
                  <div key={f.id} style={{ marginBottom: 14 }}>
                    <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", color: FAINT, marginBottom: 3 }}>{f.l}</div>
                    <Fill id={`idea_${n}_${f.id}`} placeholder={f.p} s={{ fontSize: 15 }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </M>
      ),
    },
  ];
}
