import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Atelier interne FAR — FastGoodCuisine 2027.
 * YouTube · Verticaux · Pop's & Pepe Chicken.
 */
export function createSSponsors2027Fgc(P) {
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

  const INK = "#1C1410";
  const MUTED = "rgba(28,20,16,.58)";
  const FAINT = "rgba(28,20,16,.34)";
  const LINE = "rgba(28,20,16,.1)";
  const ACC = "#E01F2A";
  const TEAL = "#0F6B58";

  const AVATAR = {
    yt: pu("/fgc.webp"),
    vert: pu("/fgc.webp"),
    pepe: pu("/pepe-chicken-logo.png"),
  };

  const ChAvatar = ({ ch, size = 28, border = ACC }) => (
    <img
      src={AVATAR[ch] || AVATAR.yt}
      alt=""
      style={{
        width: size,
        height: size,
        borderRadius: ch === "pepe" ? 8 : "50%",
        objectFit: "cover",
        border: `2px solid ${border}`,
        display: "block",
        flexShrink: 0,
        background: "#fff",
      }}
    />
  );

  const STORE = "far_ws_sponsors2027_fgc_v1";
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

  const CHANNELS = [
    { id: "yt", name: "YouTube", border: ACC },
    { id: "vert", name: "Verticaux", border: TEAL },
  ];

  const ChannelCols = ({ prefix, fields, compact = false, channels = CHANNELS }) => (
    <div style={{ display: "grid", gridTemplateColumns: channels.length > 1 ? "1fr 1fr" : "1fr", gap: compact ? 36 : 48, maxWidth: channels.length > 1 ? "none" : 720 }}>
      {channels.map((ch) => (
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
            <ChAvatar ch={ch.id} size={compact ? 28 : 32} border={ch.border} />
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

  const FieldGrid = ({ prefix, fields }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 40px" }}>
      {fields.map((f) => (
        <div key={f.id} style={{ marginBottom: 14 }}>
          <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: FAINT, marginBottom: 4 }}>{f.l}</div>
          <Fill id={`${prefix}_${f.id}`} placeholder={f.p || ""} s={{ fontSize: 16 }} />
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
            }}
          >
            <div>
              <FarLogo size={56} variant="yellow" />
              <div style={{ ...se, fontSize: 28, fontWeight: 800, letterSpacing: "-0.05em", color: ACC, marginTop: 16, lineHeight: 0.9 }}>FAR</div>
            </div>
            <div>
              <img
                src={AVATAR.yt}
                alt="FastGoodCuisine"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                  marginBottom: 14,
                  border: `2px solid ${ACC}`,
                }}
              />
              <div style={{ ...se, fontSize: 15, fontWeight: 700, color: ACC, letterSpacing: "-0.02em" }}>FastGoodCuisine</div>
              <div style={{ ...sa, fontSize: 12, color: "rgba(255,242,245,.5)", marginTop: 2 }}>YouTube · verticaux · marques</div>
            </div>
          </M>
          <M {...MV()} variants={fu(12)} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Step n="00">Plan</Step>
            <Title s={{ fontSize: 40, marginBottom: 8 }}>FGC 2027</Title>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <ChAvatar ch="yt" size={26} border={ACC} />
              <ChAvatar ch="vert" size={26} border={TEAL} />
              <div style={{ ...se, fontSize: 17, fontWeight: 600, color: t.a }}>YouTube · Verticaux · Pop's & Pepe</div>
            </div>
            <div style={{ width: 44, height: 4, background: ACC, margin: "14px 0 18px" }} />
            <div style={{ display: "grid", gap: 8 }}>
              {[
                "01  Bilan",
                "02  Formats",
                "03  Priorités",
                "04  No go",
                "05  Pop's & Pepe Chicken",
                "06  Envies",
                "07  Marronniers",
                "08  Idéation",
              ].map((line) => (
                <div key={line} style={{ ...sa, fontSize: 15.5, color: INK }}>
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
          <Lead s={{ marginBottom: 14, fontSize: 15 }}>YouTube et verticaux.</Lead>
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
          <Lead>YouTube et verticaux.</Lead>
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
          <Lead s={{ marginBottom: 14, fontSize: 15 }}>Thématique + marques cibles.</Lead>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: 22, paddingBottom: 12, borderBottom: `1px solid ${LINE}` }}>
            {["Food & CPG", "QSR / delivery", "Retail / GMS", "Dessert & boissons", "Électroménager", "Divertissement food"].map((theme, i) => (
              <div key={theme} style={{ ...sa, fontSize: 13, color: MUTED }}>
                <span style={{ color: ACC, fontWeight: 700, marginRight: 5 }}>{String(i + 1).padStart(2, "0")}</span>
                {theme}
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 920 }}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${LINE}` }}>
                <div style={{ ...se, fontSize: 14, fontWeight: 800, color: ACC, marginBottom: 6 }}>{String(n).padStart(2, "0")}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 20 }}>
                  <div>
                    <div style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: FAINT, marginBottom: 2 }}>Thématique</div>
                    <Fill id={`prio_yt_${n}_theme`} placeholder="Thématique" minH={40} s={{ fontSize: 15, padding: "5px 0 7px" }} />
                  </div>
                  <div>
                    <div style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: FAINT, marginBottom: 2 }}>Marques</div>
                    <Fill id={`prio_yt_${n}_brands`} placeholder="Marques cibles" minH={40} s={{ fontSize: 15, padding: "5px 0 7px" }} />
                  </div>
                </div>
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
          <Lead>Ce qu'on ne fait pas en 2027.</Lead>
          <FieldGrid
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
      title: "Pop's & Pepe",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="05">Marques</Step>
          <Title>Pop's & Pepe Chicken</Title>
          <Lead>Que fait-on avec les marques en 2027 ?</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              {
                id: "pepe",
                name: "Pepe Chicken",
                role: "Dark kitchen · Uber Eats / Deliveroo · LTO & collabs food.",
                accent: ACC,
                img: AVATAR.pepe,
                radius: 8,
              },
              {
                id: "pops",
                name: "Pop's",
                role: "Boisson propriétaire · thé glacé · distribution & collabs.",
                accent: TEAL,
                img: null,
                radius: "50%",
              },
            ].map((brand) => (
              <div key={brand.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 10,
                    paddingBottom: 12,
                    borderBottom: `2px solid ${INK}`,
                  }}
                >
                  {brand.img ? (
                    <img
                      src={brand.img}
                      alt={brand.name}
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: "contain",
                        borderRadius: brand.radius,
                        border: `2px solid ${brand.accent}`,
                        background: "#fff",
                        padding: 4,
                        boxSizing: "border-box",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        background: brand.accent,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...se,
                        fontSize: 13,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      Pop's
                    </div>
                  )}
                  <div>
                    <div style={{ ...se, fontSize: 20, fontWeight: 700, color: INK }}>{brand.name}</div>
                    <div style={{ ...sa, fontSize: 13, color: MUTED, marginTop: 2, lineHeight: 1.35 }}>{brand.role}</div>
                  </div>
                </div>
                {[
                  { id: "do", l: "Ce qu'on fait en 2027", p: "Ambition, rôle, type d'opérations" },
                  { id: "brands", l: "Marques / partenaires cibles", p: "Qui on approche" },
                  { id: "format", l: "Formats d'activation", p: "LTO, collab contenu, événement…" },
                  { id: "nogo", l: "Ce qu'on ne fait pas", p: "Limites" },
                ].map((f) => (
                  <div key={f.id} style={{ marginBottom: 14 }}>
                    <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", color: FAINT, marginBottom: 3 }}>{f.l}</div>
                    <Fill id={`brand_${brand.id}_${f.id}`} placeholder={f.p} s={{ fontSize: 15 }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </M>
      ),
    },

    {
      title: "Envies",
      r: () => (
        <M {...MV()} variants={stg()} style={{ width: "100%" }}>
          <Step n="06">Envies</Step>
          <Title>Envies de FastGood</Title>
          <Lead>Avant le calendrier et l'idéation.</Lead>
          <FieldGrid
            prefix="envie"
            fields={[
              { id: "1", l: "Envie 1", p: "Contenu, collab, format…" },
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
          <Step n="07">Calendrier</Step>
          <Title>Marronniers 2027</Title>
          <Lead>Dates grand public food. Trois activations à retenir.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginBottom: 28 }}>
            {[
              { s: "Jan — mars", items: ["Vacances d'hiver", "Saint-Valentin", "Pâques"] },
              { s: "Avr — juin", items: ["Vacances de printemps", "Ponts de mai", "Fête des mères", "Fête des pères"] },
              { s: "Juil — sept", items: ["Grandes vacances / BBQ", "Rentrée"] },
              { s: "Oct — déc", items: ["Toussaint", "Black Friday", "Noël"] },
            ].map((col) => (
              <div key={col.s}>
                <div
                  style={{
                    ...mo,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    color: ACC,
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
            <div style={{ display: "grid", gridTemplateColumns: "36px 1.1fr .9fr 1.2fr", gap: 14, marginBottom: 6 }}>
              {["", "Date", "Surface", "Piste / marque"].map((h) => (
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
                  gridTemplateColumns: "36px 1.1fr .9fr 1.2fr",
                  gap: 14,
                  padding: "8px 0",
                  borderBottom: `1px solid ${LINE}`,
                  alignItems: "center",
                }}
              >
                <div style={{ ...se, fontSize: 14, fontWeight: 800, color: ACC }}>{String(n).padStart(2, "0")}</div>
                <Fill id={`marr_date_${n}`} placeholder="" s={{ fontSize: 15 }} />
                <Fill id={`marr_ch_${n}`} placeholder="YT / verticaux / marques" s={{ fontSize: 14 }} />
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
          <Step n="08">Idéation</Step>
          <Title>Concepts à pitcher</Title>
          <Lead>2 à 3 concepts clé en main.</Lead>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ paddingTop: 4 }}>
                <div style={{ ...se, fontSize: 15, fontWeight: 800, color: ACC, marginBottom: 14, letterSpacing: "-0.02em" }}>
                  Concept {String(n).padStart(2, "0")}
                </div>
                {[
                  { id: "title", l: "Titre", p: "Nom du concept" },
                  { id: "angle", l: "Angle", p: "Une phrase" },
                  { id: "ch", l: "Surface", p: "YT / verticaux / Pepe / Pop's" },
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
