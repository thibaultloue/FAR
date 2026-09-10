import { motion } from "framer-motion";

/** Picard × FastGoodCuisine. Deck board — proportions conservées, rempli un cran de plus. */
export function createSFGCPicard(P) {
  const { pu } = P;
  const isPdf = () =>
    Boolean(globalThis.__FAR_PDF_EXPORT) ||
    (typeof document !== "undefined" && document.documentElement?.getAttribute?.("data-far-live-export") === "1");

  const INK = "#112845";
  const BLUE = "#174783";
  const RED = "#E22B33";
  const ICE = "#F4F7FB";
  const MUTED = "rgba(17,40,69,.62)";
  const LINE = "rgba(17,40,69,.14)";
  const DISPLAY = { fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" };
  const BODY = DISPLAY;

  const M = ({ children, style, ...props }) =>
    isPdf() ? (
      <div style={{ opacity: 1, transform: "none", ...style }}>{children}</div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );

  const BrandLockup = ({ compact = false, light = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 12 : 18 }}>
      <div
        style={{
          ...DISPLAY,
          fontSize: compact ? 20 : 28,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: "-.05em",
          color: light ? "#fff" : BLUE,
        }}
      >
        PICARD
      </div>
      <div style={{ width: 1, height: compact ? 24 : 30, background: light ? "rgba(255,255,255,.3)" : LINE }} />
      <img
        src={pu("/fgc.webp")}
        alt="FastGoodCuisine"
        style={{
          width: compact ? 38 : 52,
          height: compact ? 38 : 52,
          borderRadius: 10,
          objectFit: "cover",
          border: `1px solid ${light ? "rgba(255,255,255,.3)" : LINE}`,
        }}
      />
      <div style={{ ...DISPLAY, fontSize: compact ? 14 : 18, fontWeight: 800, color: light ? "#fff" : INK }}>
        FASTGOODCUISINE
      </div>
    </div>
  );

  const Header = ({ n, label, title, intro }) => (
    <div style={{ marginBottom: intro ? 16 : 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <BrandLockup compact />
        <div style={{ ...BODY, color: MUTED, fontSize: 13, fontWeight: 700, letterSpacing: 1.6 }}>
          {n} / {label.toUpperCase()}
        </div>
      </div>
      <div style={{ width: 40, height: 4, background: RED, marginBottom: 12 }} />
      <h1 style={{ ...DISPLAY, margin: 0, maxWidth: 1280, color: INK, fontSize: 44, lineHeight: 1.05, letterSpacing: "-.045em", fontWeight: 850 }}>
        {title}
      </h1>
      {intro ? (
        <p style={{ ...BODY, margin: "10px 0 0", maxWidth: 1040, color: MUTED, fontSize: 20, lineHeight: 1.4 }}>{intro}</p>
      ) : null}
    </div>
  );

  const BulletList = ({ items, large = false }) => (
    <div style={{ display: "grid", gap: 0, borderTop: `1px solid ${LINE}` }}>
      {items.map((item) => (
        <div
          key={item}
          style={{
            display: "grid",
            gridTemplateColumns: large ? "16px 1fr" : "14px 1fr",
            gap: large ? 20 : 18,
            alignItems: "start",
            padding: large ? "30px 0" : "26px 0",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <span style={{ width: large ? 10 : 9, height: large ? 10 : 9, marginTop: large ? 12 : 10, borderRadius: 999, background: RED }} />
          <span style={{ ...BODY, color: INK, fontSize: large ? 26 : 22, lineHeight: 1.35, fontWeight: large ? 550 : 400 }}>{item}</span>
        </div>
      ))}
    </div>
  );

  const Pot = ({ small = false, onBlue = false, size }) => {
    const kind = size || (small ? "sm" : "md");
    const dims = { xs: [118, 148], sm: [168, 210], md: [248, 306], lg: [300, 370] }[kind] || [248, 306];
    const [w, h] = dims;
    const isXs = kind === "xs";
    const isSm = kind === "sm" || isXs;
    const topBody = isXs ? 18 : isSm ? 24 : kind === "lg" ? 40 : 34;
    const lidH = isXs ? 20 : isSm ? 26 : kind === "lg" ? 44 : 38;
    const lidTop = isXs ? 10 : isSm ? 14 : 18;
    return (
      <div style={{ position: "relative", width: w, height: h, flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            left: "4%",
            right: "4%",
            top: topBody,
            bottom: 0,
            borderRadius: isXs ? "8px 8px 20px 20px" : isSm ? "10px 10px 26px 26px" : kind === "lg" ? "16px 16px 46px 46px" : "14px 14px 40px 40px",
            background: onBlue ? "#1A5699" : BLUE,
            border: onBlue ? "2px solid rgba(255,255,255,.72)" : `1px solid ${LINE}`,
            boxShadow: onBlue
              ? "0 18px 48px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.2)"
              : "0 14px 32px rgba(17,40,69,.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            padding: isXs ? 10 : isSm ? 14 : 22,
            boxSizing: "border-box",
          }}
        >
          <div style={{ ...DISPLAY, fontSize: isXs ? 13 : isSm ? 17 : kind === "lg" ? 28 : 24, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.15 }}>
            Picard<br />x FGC
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: lidTop,
            height: lidH,
            borderRadius: 999,
            background: "#fff",
            border: onBlue ? "3px solid rgba(255,255,255,.95)" : `3px solid ${BLUE}`,
            boxShadow: onBlue ? "0 6px 18px rgba(0,0,0,.18)" : "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    );
  };

  const Stat = ({ v, l }) => (
    <div style={{ padding: "28px 18px", border: `1px solid ${LINE}`, background: "#fff", textAlign: "center", boxSizing: "border-box" }}>
      <div style={{ ...DISPLAY, color: BLUE, fontSize: 36, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{v}</div>
      <div style={{ ...BODY, color: MUTED, fontSize: 15, marginTop: 10 }}>{l}</div>
    </div>
  );

  return [
    {
      title: "Picard × FastGoodCuisine",
      r: () => (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 820,
            display: "grid",
            gridTemplateColumns: "1.35fr .65fr",
            background: "#fff",
            border: `1px solid ${LINE}`,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <M style={{ padding: "64px 68px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <BrandLockup />
            <div>
              <div style={{ ...BODY, color: RED, fontSize: 14, fontWeight: 800, letterSpacing: 2.2, marginBottom: 20 }}>
                PROPOSITION DE COLLABORATION PRODUIT
              </div>
              <h1 style={{ ...DISPLAY, margin: 0, color: INK, fontSize: 56, lineHeight: 1.02, fontWeight: 880, letterSpacing: "-.055em", maxWidth: 820 }}>
                Créer ensemble<br />une glace gourmande.
              </h1>
              <p style={{ ...BODY, color: MUTED, fontSize: 23, lineHeight: 1.45, maxWidth: 720, margin: "30px 0 0" }}>
                Distribuée chez Picard et chez Pepe Chicken.
              </p>
            </div>
            <div style={{ ...BODY, color: MUTED, fontSize: 14 }}>Picard × FastGoodCuisine</div>
          </M>
          <div style={{ background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 460, height: 460, border: "1px solid rgba(255,255,255,.14)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", width: 310, height: 310, border: "1px solid rgba(255,255,255,.14)", borderRadius: "50%" }} />
            <Pot onBlue />
          </div>
        </div>
      ),
    },
    {
      title: "FastGoodCuisine",
      r: () => (
        <M style={{ width: "100%" }}>
          <Header
            n="01"
            label="Présentation"
            title="FastGoodCuisine."
            intro="Créateur food n°1 en France, et entrepreneur avec Pepe Chicken."
          />
          <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 32, alignItems: "stretch", minHeight: 700 }}>
            <img
              src={pu("/fgc.webp")}
              alt="FastGoodCuisine"
              style={{ width: "100%", height: "100%", minHeight: 700, objectFit: "cover", border: `1px solid ${LINE}`, display: "block" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 700 }}>
              <div
                style={{
                  flex: 1,
                  padding: "22px 24px",
                  background: "#fff",
                  border: `1px solid ${LINE}`,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ ...BODY, color: BLUE, fontSize: 11, fontWeight: 800, letterSpacing: 1.6, marginBottom: 12 }}>LE CRÉATEUR</div>
                <div style={{ ...BODY, color: INK, fontSize: 17, lineHeight: 1.5, marginBottom: 12 }}>
                  FastGoodCuisine, c’est Charles Gilles-Compagnon. Depuis plus de dix ans, il anime la plus grosse chaîne food
                  de France autour de formats simples et très regardés : tests, hacks, défis et dégustations.
                </div>
                <div style={{ ...BODY, color: MUTED, fontSize: 16, lineHeight: 1.5 }}>
                  Son audience est large, engagée, et habituée aux lancements produit. Quand il met un produit en avant,
                  ça se voit et ça se partage.
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "22px 24px",
                  background: "#fff",
                  border: `1px solid ${LINE}`,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ ...BODY, color: BLUE, fontSize: 11, fontWeight: 800, letterSpacing: 1.6, marginBottom: 12 }}>CHIFFRES CLÉS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    ["8,7M", "YouTube"],
                    ["2,4M", "Instagram"],
                    ["2,6M", "TikTok"],
                    ["3,1 Md+", "vues cumulées"],
                  ].map(([v, l]) => (
                    <div
                      key={l}
                      style={{
                        padding: "18px 10px",
                        border: `1px solid ${LINE}`,
                        background: ICE,
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ ...DISPLAY, color: BLUE, fontSize: 30, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{v}</div>
                      <div style={{ ...BODY, color: MUTED, fontSize: 13, marginTop: 8 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "22px 24px",
                  background: ICE,
                  borderLeft: `5px solid ${RED}`,
                  boxSizing: "border-box",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: 22,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <img
                      src={pu("/pepe-chicken-logo.png")}
                      alt="Pepe Chicken"
                      style={{
                        width: 46,
                        height: 46,
                        objectFit: "contain",
                        background: "#fff",
                        borderRadius: 8,
                        border: `1px solid ${LINE}`,
                        padding: 4,
                        boxSizing: "border-box",
                      }}
                    />
                    <div>
                      <div style={{ ...DISPLAY, color: INK, fontSize: 22, fontWeight: 850, letterSpacing: "-.03em" }}>Pepe Chicken</div>
                      <div style={{ ...BODY, color: MUTED, fontSize: 13, marginTop: 2 }}>Dark kitchens · Deliveroo · Uber Eats</div>
                    </div>
                  </div>
                  <div style={{ ...BODY, color: MUTED, fontSize: 15, lineHeight: 1.45 }}>
                    Il a aussi lancé Pepe Chicken, un réseau de dark kitchens en livraison. Un vrai business food,
                    avec un moment dessert naturel en fin de commande.
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["125", "restaurants"],
                    ["~90k", "commandes / semaine"],
                  ].map(([v, l]) => (
                    <div
                      key={l}
                      style={{
                        padding: "18px 10px",
                        background: "#fff",
                        border: `1px solid ${LINE}`,
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ ...DISPLAY, color: BLUE, fontSize: 30, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{v}</div>
                      <div style={{ ...BODY, color: MUTED, fontSize: 13, marginTop: 8 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...BODY, fontSize: 11, color: MUTED }}>Source : données internes FastGoodCuisine.</div>
            </div>
          </div>
        </M>
      ),
    },
    {
      title: "Le produit",
      r: () => (
        <M style={{ width: "100%" }}>
          <Header
            n="02"
            label="Produit"
            title="Une glace volontairement très gourmande."
            intro="Co-développée avec Picard."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1.45fr .55fr", gap: 36, alignItems: "stretch", minHeight: 720 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "grid", gap: 0, borderTop: `1px solid ${LINE}` }}>
                {[
                  "Recette accessible et immédiatement désirable.",
                  "Textures généreuses et gros morceaux.",
                  "Générosité proche des références américaines les plus gourmandes.",
                  "Un élément signature pour marquer clairement le produit.",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "18px 1fr",
                      gap: 22,
                      alignItems: "start",
                      padding: "34px 0",
                      borderBottom: `1px solid ${LINE}`,
                    }}
                  >
                    <span style={{ width: 11, height: 11, marginTop: 14, borderRadius: 999, background: RED }} />
                    <span style={{ ...DISPLAY, color: INK, fontSize: 28, lineHeight: 1.3, fontWeight: 650, letterSpacing: "-.02em" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ ...BODY, color: MUTED, fontSize: 18, fontStyle: "italic", marginTop: 26, lineHeight: 1.45 }}>
                Nom, parfum et recette précise à définir ensemble.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: ICE, minHeight: 720 }}>
              <Pot size="md" />
            </div>
          </div>
        </M>
      ),
    },
    {
      title: "La distribution",
      r: () => (
        <M style={{ width: "100%" }}>
          <Header n="03" label="Distribution" title="Distribuée chez Picard et chez Pepe Chicken." />
          {/* Schéma Y agrandi à l’échelle — même géométrie */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 28 }}>
            <div
              style={{
                ...DISPLAY,
                padding: "28px 64px",
                background: INK,
                color: "#fff",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-.02em",
                textAlign: "center",
              }}
            >
              Glace Picard × FastGoodCuisine
            </div>
            <div style={{ width: 2, height: 42, background: LINE }} />
            <div style={{ width: 1080, height: 2, background: LINE, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 2, height: 42, background: LINE }} />
              <div style={{ position: "absolute", right: 0, top: 0, width: 2, height: 42, background: LINE }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 120, width: 1400, marginTop: 42 }}>
              <div style={{ textAlign: "center", padding: "46px 36px", border: `1px solid ${LINE}`, background: "#fff", boxSizing: "border-box", minHeight: 280 }}>
                <div style={{ ...BODY, color: BLUE, fontSize: 14, fontWeight: 800, letterSpacing: 1.6, marginBottom: 14 }}>PICARD</div>
                <div style={{ ...DISPLAY, color: INK, fontSize: 30, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 20 }}>À domicile</div>
                <div style={{ ...DISPLAY, color: BLUE, fontSize: 64, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>1 200+</div>
                <div style={{ ...BODY, color: MUTED, fontSize: 19, marginTop: 16 }}>magasins en France</div>
              </div>
              <div style={{ textAlign: "center", padding: "46px 36px", border: `1px solid ${LINE}`, background: "#fff", boxSizing: "border-box", minHeight: 280 }}>
                <div style={{ ...BODY, color: RED, fontSize: 14, fontWeight: 800, letterSpacing: 1.6, marginBottom: 14 }}>PEPE CHICKEN</div>
                <div style={{ ...DISPLAY, color: INK, fontSize: 30, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 22 }}>En livraison</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ ...DISPLAY, color: RED, fontSize: 50, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>125</div>
                    <div style={{ ...BODY, color: MUTED, fontSize: 16, marginTop: 10 }}>dark kitchens</div>
                  </div>
                  <div>
                    <div style={{ ...DISPLAY, color: RED, fontSize: 50, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>~360k</div>
                    <div style={{ ...BODY, color: MUTED, fontSize: 16, marginTop: 10 }}>commandes / mois</div>
                  </div>
                </div>
                <div style={{ ...BODY, color: MUTED, fontSize: 16, marginTop: 20 }}>Deliveroo · Uber Eats</div>
              </div>
            </div>
            <div style={{ ...BODY, fontSize: 13, color: MUTED, marginTop: 28 }}>
              Sources : Picard (réseau France) · données internes FastGoodCuisine (Pepe Chicken).
            </div>
          </div>
        </M>
      ),
    },
    {
      title: "L'amplification",
      r: () => {
        const Node = ({ title, body, accent = BLUE, style }) => (
          <div
            style={{
              padding: "44px 40px",
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderTop: `5px solid ${accent}`,
              boxSizing: "border-box",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 8px 28px rgba(17,40,69,.06)",
              ...style,
            }}
          >
            <div style={{ ...DISPLAY, color: INK, fontSize: 30, fontWeight: 850, letterSpacing: "-.03em", marginBottom: 14, lineHeight: 1.12 }}>{title}</div>
            <div style={{ ...BODY, color: MUTED, fontSize: 21, lineHeight: 1.4 }}>{body}</div>
          </div>
        );
        return (
          <M style={{ width: "100%" }}>
            <Header n="04" label="Amplification" title="Faire connaître le produit au moment du lancement." />
            <div style={{ position: "relative", width: "100%", height: 720, margin: "0 auto" }}>
              <svg
                aria-hidden
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                viewBox="0 0 1760 720"
                preserveAspectRatio="none"
              >
                <line x1="880" y1="360" x2="520" y2="190" stroke={LINE} strokeWidth="1.5" />
                <line x1="880" y1="360" x2="1240" y2="190" stroke={LINE} strokeWidth="1.5" />
                <line x1="880" y1="360" x2="520" y2="530" stroke={LINE} strokeWidth="1.5" />
                <line x1="880" y1="360" x2="1240" y2="530" stroke={LINE} strokeWidth="1.5" />
              </svg>

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  background: "#fff",
                  padding: 4,
                }}
              >
                <Pot size="xs" />
              </div>

              <Node
                title="Amplification FastGoodCuisine"
                body="Vidéo YouTube, reveal, contenus courts et relais sociaux."
                accent={RED}
                style={{ position: "absolute", left: 0, top: 0, width: 780, zIndex: 2 }}
              />
              <Node
                title="Dispositif d'influence"
                body="Créateurs food et lifestyle autour du lancement."
                style={{ position: "absolute", right: 0, top: 0, width: 780, zIndex: 2 }}
              />
              <Node
                title="Plan média Picard"
                body="À définir selon les priorités business."
                style={{ position: "absolute", left: 0, bottom: 0, width: 780, zIndex: 2 }}
              />
              <Node
                title="Canaux partenaires"
                body="Visibilité Picard et écosystème Pepe Chicken."
                accent={RED}
                style={{ position: "absolute", right: 0, bottom: 0, width: 780, zIndex: 2 }}
              />
            </div>
          </M>
        );
      },
    },
    {
      title: "Next steps",
      r: () => (
        <M style={{ width: "100%" }}>
          <Header n="05" label="Next steps" title="Pour lancer le développement." />
          <div style={{ border: `1px solid ${LINE}`, overflow: "hidden" }}>
            {[
              ["01", "Valider le principe", "Accord sur la co-création, les modalités et la distribution Picard + Pepe Chicken."],
              ["02", "Définir le brief produit", "Gourmandise, familles de saveurs, textures, contraintes des 2 canaux."],
              ["03", "Développer la/les recette(s)", "Prototypes, dégustation, sélection d’une piste."],
              ["04", "Préparer le lancement", "Packaging, contenus, disponibilité Picard et intégration Pepe Chicken."],
            ].map(([n, title, body], i, arr) => (
              <div
                key={n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "84px 320px 1fr",
                  gap: 0,
                  borderBottom: i < arr.length - 1 ? `1px solid ${LINE}` : "none",
                  background: i % 2 ? ICE : "#fff",
                  minHeight: 140,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(226,43,51,.06)" }}>
                  <span style={{ ...DISPLAY, color: RED, fontSize: 18, fontWeight: 850 }}>{n}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "28px 24px" }}>
                  <span style={{ ...DISPLAY, color: INK, fontSize: 24, fontWeight: 800 }}>{title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "28px 26px" }}>
                  <span style={{ ...BODY, color: MUTED, fontSize: 19, lineHeight: 1.45 }}>{body}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...BODY, color: MUTED, fontSize: 14, marginTop: 18 }}>Prochaine étape : accord de principe.</div>
        </M>
      ),
    },
  ];
}
