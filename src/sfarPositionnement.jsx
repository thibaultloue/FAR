import { motion } from "framer-motion";

/** Deck positionnement — même structure / typo / export PDF que les autres decks (T1). */
export function createSFarPositionnement(P) {
  const { Tg, Hl, Sh, Wc, Ar, G2, Cmp, Fn, Th, FarLogo, se, sa, mo, fi, sv } = P;

  const src = (t, urls, note) => (
    <Fn t={t}>
      {note ? `${note} · ` : ""}
      Sources : {urls.map((u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")).join(" · ")}
    </Fn>
  );

  const PosMapping = ({ t }) => (
    <motion.div initial="h" animate="v" variants={{ h: {}, v: { transition: { staggerChildren: 0.07 } } }}>
      <motion.div variants={fi} style={{ textAlign: "center", marginBottom: 10 }}>
        <span style={{ ...mo, fontSize: 10, color: t.d, letterSpacing: 2 }}>
          ACCÈS À L&apos;AUDIENCE → DÉVELOPPEMENT D&apos;UNIVERS
        </span>
      </motion.div>
      <motion.div
        variants={fi}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 10,
          minHeight: 240,
          borderRadius: 14,
          border: `1px solid ${t.brd}`,
          padding: 10,
          background: t.cardAlt,
        }}
      >
        {[
          { l: "Content / management", d: "Stratégie, production, management." },
          { l: "Entertainment", d: "Grands talents, événements, licences." },
          { l: "Plateformes", d: "Accès, volume, campagnes en quelques clics." },
          { l: "Réseaux internationaux", d: "Storytelling, média, production, data." },
        ].map((z, i) => (
          <div
            key={i}
            style={{
              padding: 14,
              borderRadius: 10,
              background: t.card,
              border: `1px solid ${t.brd}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <motion.div style={{ ...mo, fontSize: 10, fontWeight: 700, color: t.a, marginBottom: 6 }}>
              {z.l}
            </motion.div>
            <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{z.d}</div>
          </div>
        ))}
        <motion.div
          variants={fi}
          style={{
            position: "absolute",
            inset: "22% 18%",
            borderRadius: 12,
            border: `2px solid ${t.a}`,
            background: "rgba(255,170,0,.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            textAlign: "center",
          }}
        >
          <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a }}>FAR</div>
          <div style={{ ...sa, fontSize: 12, color: t.c, lineHeight: 1.5, marginTop: 8, maxWidth: 220 }}>
            Développement d&apos;univers par la création, la structure et la croissance.
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={fi} style={{ ...mo, fontSize: 9, color: t.d, marginTop: 8, textAlign: "right" }}>
        Activation ponctuelle ↑ · construction long terme ↓
      </motion.div>
    </motion.div>
  );

  const PosTripod = ({ t }) => (
    <motion.div initial="h" animate="v" variants={{ h: {}, v: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fi} style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <svg viewBox="0 0 400 200" style={{ width: "100%", maxWidth: 420, height: "auto" }}>
          <line x1="200" y1="45" x2="70" y2="165" stroke={t.a} strokeWidth="2" />
          <line x1="200" y1="45" x2="200" y2="165" stroke={t.a} strokeWidth="2" />
          <line x1="200" y1="45" x2="330" y2="165" stroke={t.a} strokeWidth="2" />
          <circle cx="200" cy="40" r="32" fill={t.th} stroke={t.a} strokeWidth="2" />
          <text x="200" y="38" textAnchor="middle" fill={t.thT} fontSize="11" fontWeight="700" fontFamily="Figtree,sans-serif">
            Univers créateur
          </text>
          {[
            { x: 70, l: "Création" },
            { x: 200, l: "Structure" },
            { x: 330, l: "Croissance" },
          ].map((p) => (
            <g key={p.l}>
              <circle cx={p.x} cy="165" r="26" fill={t.card} stroke={t.brd} />
              <text x={p.x} y="169" textAnchor="middle" fill={t.a} fontSize="10" fontWeight="700" fontFamily="Figtree,sans-serif">
                {p.l}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>
      <G2 s={{ marginTop: 4 }}>
        <Wc t={t} s={{ padding: 18 }}>
          <Lb t={t}>CRÉATION</Lb>
          <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>
            Ton, formats, communauté, imaginaire, exigence éditoriale.
          </div>
        </Wc>
        <Wc t={t} s={{ padding: 18 }}>
          <Lb t={t}>STRUCTURE</Lb>
          <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>
            Admin, juridique, fiscal, process, data, outils, priorisation.
          </div>
        </Wc>
      </G2>
      <Wc t={t} s={{ padding: 18, marginTop: 10 }}>
        <Lb t={t}>CROISSANCE</Lb>
        <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>
          Collaborations, ambassades, produits propriétaires, marques propres, actifs, acquisitions, opportunités business.
        </div>
      </Wc>
    </motion.div>
  );

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  return [
    {
      title: "FAR by La Porte",
      r: (t) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", padding: "32px 0" }}
        >
          <div style={{ marginBottom: 28 }}>
            <FarLogo size={100} variant={t.lv} />
          </div>
          <Tg t={t}>FAR BY LA PORTE</Tg>
          <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
            Faire grandir les univers créateurs.
          </Hl>
          <Sh t={t} s={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "center" }}>
            Une agence pensée pour accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
          </Sh>
          <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginTop: 20 }}>
            Qui veut aller loin, vient ici.
          </div>
          <motion.div style={{ ...mo, fontSize: 11, color: t.d, marginTop: 32, letterSpacing: 2 }}>
            10 ANS D&apos;EXPÉRIENCE · +50 MARQUES · +100 CAMPAGNES
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Manifesto",
      r: (t) => (
        <motion.div>
          <Tg t={t}>MANIFESTO</Tg>
          <Hl t={t} s={{ fontSize: 38, maxWidth: 920 }}>
            Un créateur n&apos;est pas un canal. C&apos;est un univers.
          </Hl>
          <motion.div initial="h" animate="v" variants={sv} style={{ marginTop: 20, maxWidth: 820 }}>
            {[
              "Un univers a ses codes.",
              "Son rythme.",
              "Ses formats.",
              "Sa communauté.",
              "Ses limites.",
              "Ses ambitions.",
              "",
              "Pour aller loin, il ne lui suffit pas d'être visible.",
              "Il doit être compris, structuré, protégé et développé.",
              "",
              "C'est le rôle de FAR : donner aux univers créateurs le cadre, les opportunités et la sérénité nécessaires pour grandir sans se dénaturer.",
            ].map((line, i) =>
              line === "" ? null : (
                <motion.p
                  key={i}
                  variants={fi}
                  style={{
                    ...sa,
                    fontSize: i < 6 ? 20 : i >= 11 ? 17 : 16,
                    fontWeight: i >= 11 ? 700 : 400,
                    color: i >= 11 ? t.c : t.m,
                    lineHeight: 1.55,
                    marginBottom: 4,
                    ...(i < 6 ? se : {}),
                    ...(i < 6 ? { fontSize: 22, fontWeight: 600, color: t.c } : {}),
                  }}
                >
                  {line}
                </motion.p>
              ),
            )}
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Mapping marché",
      r: (t) => (
        <motion.div>
          <Tg t={t}>BENCHMARK</Tg>
          <Hl t={t} s={{ fontSize: 34 }}>FAR ne joue pas l&apos;accès. FAR joue le développement.</Hl>
          <PosMapping t={t} />
          <Th t={t} alt>
            FAR n&apos;est pas une agence d&apos;influence de plus. FAR développe ce qui fait aller les créateurs plus loin.
          </Th>
          {src(t, [
            "https://www.bump.fr/fr",
            "https://www.foll-ow.com/fr/",
            "https://www.weareera.com/fr/home",
            "https://my.webedia-creators.com/fr/",
            "https://www.nouvel-arc.com/",
          ])}
        </motion.div>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <motion.div>
          <Tg t={t}>MODÈLE</Tg>
          <Hl t={t} s={{ fontSize: 34 }}>Un univers créateur grandit sur trois appuis.</Hl>
          <PosTripod t={t} />
          <Th t={t}>
            La structure n&apos;éteint pas la création. Elle lui donne de l&apos;espace.
          </Th>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Piliers FAR",
      r: (t) => (
        <motion.div>
          <Tg t={t}>MÉTHODE</Tg>
          <Hl t={t} s={{ fontSize: 34 }}>Les cinq mots FAR deviennent une méthode de décision.</Hl>
          <motion.div
            initial="h"
            animate="v"
            variants={{ h: {}, v: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 16 }}
          >
            {[
              { p: "Vision", q: "Est-ce que ça construit aujourd'hui en pensant à demain ?" },
              { p: "Sérénité", q: "Est-ce que le cadre est fluide, clair et sur-mesure ?" },
              { p: "Structure", q: "Est-ce que ça simplifie, automatise ou clarifie ?" },
              { p: "Ambition", q: "Est-ce que l'idée mérite plus qu'une simple prise de parole ?" },
              { p: "Opportunité", q: "Est-ce que ça fait émerger un projet durable ?" },
            ].map((x) => (
              <motion.div key={x.p} variants={fi}>
                <Wc t={t} s={{ padding: 16, height: "100%" }}>
                  <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.a, marginBottom: 10 }}>{x.p}</div>
                  <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{x.q}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <Th t={t} alt>Chez FAR, les valeurs ne décorent pas le discours. Elles cadrent les décisions.</Th>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <motion.div>
          <Tg t={t}>ACCOMPAGNEMENT</Tg>
          <Hl t={t} s={{ fontSize: 32 }}>FAR accompagne ce qui fait vraiment grandir.</Hl>
          <motion.div initial="h" animate="v" variants={sv} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            {[
              { n: "01", t: "Clarifier", d: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités." },
              { n: "02", t: "Structurer", d: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data." },
              { n: "03", t: "Développer", d: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs." },
              { n: "04", t: "Protéger", d: "Cohérence éditoriale, image, droits, arbitrages, bonnes opportunités." },
            ].map((s) => (
              <motion.div key={s.n} variants={fi}>
                <Wc t={t} s={{ padding: 20 }}>
                  <div style={{ ...mo, fontSize: 11, fontWeight: 700, color: t.a }}>{s.n}</div>
                  <div style={{ ...sa, fontSize: 17, fontWeight: 800, color: t.c, margin: "8px 0" }}>{s.t}</div>
                  <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{s.d}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
            {[
              { w: "Talent", t: "grandir sans se disperser." },
              { w: "Marque", t: "trouver un rôle juste dans un univers clair." },
              { w: "Audience", t: "comprendre pourquoi le projet existe." },
            ].map((o) => (
              <div key={o.w} style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>
                <span style={{ fontWeight: 700, color: t.c }}>{o.w}</span> — {o.t}
              </div>
            ))}
          </div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"], "PDF FAR — citations détaillées à verrouiller")}
        </motion.div>
      ),
    },

    {
      title: "Talents / univers",
      r: (t) => (
        <motion.div>
          <Tg t={t}>ROSTER</Tg>
          <Hl t={t} s={{ fontSize: 32 }}>Les talents FAR sont des univers de développement.</Hl>
          <motion.div
            initial="h"
            animate="v"
            variants={{ h: {}, v: { transition: { staggerChildren: 0.06 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 14 }}
          >
            {[
              { n: "FastGoodCuisine", u: "Food entertainment", p: "Formats food, co-brandings, opérations marques food." },
              { n: "CYRILmp4", u: "Exploration, gaming", p: "Ambassades, formats longs, marques propres, projets annuels." },
              { n: "Toinelag", u: "Construction, jeux", p: "Concepts co-construits, jouets, retail, challenges." },
              { n: "Teeqzy", u: "Gaming communautaire", p: "Maps, formats gaming, activations qualifiées.", pdf: true },
              { n: "Bek1ng", u: "Performance gaming", p: "Coaching, contenus experts, co-branding.", pdf: true },
            ].map((c) => (
              <motion.div key={c.n} variants={fi}>
                <Wc t={t} s={{ padding: 14, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 6, alignItems: "flex-start" }}>
                    <motion.div style={{ ...sa, fontSize: 13, fontWeight: 800, color: t.c }}>{c.n}</motion.div>
                    {c.pdf && (
                      <span style={{ ...mo, fontSize: 8, fontWeight: 700, color: t.a, letterSpacing: 1 }}>PDF</span>
                    )}
                  </div>
                  <div style={{ ...mo, fontSize: 9, fontWeight: 700, color: t.a, marginTop: 8, letterSpacing: 1 }}>{c.u}</div>
                  <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.4, marginTop: 8 }}>{c.p}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <Th t={t}>FAR ne présente pas des profils. FAR développe des univers.</Th>
          {src(
            t,
            ["https://www.groupe-laporte.com/far-by-la-porte"],
            "Teeqzy & Bek1ng — à valider avec PDF FAR rechargé",
          )}
        </motion.div>
      ),
    },

    {
      title: "Grille d'opportunité",
      r: (t) => (
        <motion.div>
          <Tg t={t}>QUALIFICATION</Tg>
          <Hl t={t} s={{ fontSize: 32 }}>Une bonne opportunité fait avancer l&apos;univers.</Hl>
          <motion.div
            initial="h"
            animate="v"
            variants={sv}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginTop: 14 }}
          >
            {[
              { k: "Fidèle", d: "Elle respecte l'univers du créateur." },
              { k: "Fluide", d: "Elle s'intègre naturellement au contenu." },
              { k: "Structurante", d: "Elle renforce son développement." },
              { k: "Ambitieuse", d: "Elle peut ouvrir plus qu'une prise de parole." },
              { k: "Utile", d: "Valeur claire pour talent, marque et audience." },
            ].map((c) => (
              <motion.div key={c.k} variants={fi}>
                <Wc t={t} s={{ padding: 14 }}>
                  <div style={{ ...sa, fontSize: 14, fontWeight: 800, color: t.a }}>{c.k}</div>
                  <motion.div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.4, marginTop: 6 }}>{c.d}</motion.div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <Wc t={t} s={{ padding: 22, marginTop: 14, background: t.a + "18", border: `1px solid ${t.a}40` }}>
            <Lb t={t}>L&apos;ENTORSE INTELLIGENTE</Lb>
            <div style={{ ...sa, fontSize: 14, color: t.c, lineHeight: 1.55 }}>
              FAR peut accepter une opportunité moins évidente si elle ouvre un vrai levier : revenu structurant, produit propriétaire, acquisition, marque stratégique, nouveau vertical ou accélération business. Le rôle de FAR : transformer l&apos;opportunité en projet légitime.
            </div>
          </Wc>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Do / Don't",
      r: (t) => (
        <motion.div>
          <Tg t={t}>LANGAGE</Tg>
          <Hl t={t} s={{ fontSize: 34 }}>Les bons réflexes FAR.</Hl>
          <Cmp
            t={t}
            l="Do"
            lI={[
              "Parler d'univers créateur.",
              "Construire autour de la création.",
              "Chercher le rôle juste de la marque.",
              "Structurer sans rigidifier.",
              "Développer actifs, produits, formats ou marques propres.",
              "Protéger la cohérence éditoriale.",
              "Dire « partenaire de stratégie, de création et de visibilité ».",
              "Parler de développement serein et durable.",
            ]}
            r="Don't"
            rI={[
              "Parler de profil ou d'inventaire.",
              "Partir uniquement du brief marque.",
              "Plaquer une intégration sponsorisée.",
              "Ajouter de la complexité.",
              "Réduire le talent à son audience.",
              "Dire oui à tout.",
              "Dire « support de campagne ».",
              "Parler seulement de monétisation.",
            ]}
          />
          <Th t={t} alt>
            FAR ne vend pas l&apos;accès aux créateurs. FAR construit ce qui les fait aller plus loin.
          </Th>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Fermeture",
      r: (t, back) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: "center", padding: "28px 0" }}
        >
          <div style={{ marginBottom: 32 }}>
            <FarLogo size={96} variant={t.lv} />
          </div>
          <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
            Qui veut aller loin, vient ici.
          </Hl>
          <Sh t={t} s={{ maxWidth: 700, margin: "20px auto", textAlign: "center" }}>
            FAR by La Porte accompagne les créateurs dans le développement de leur univers.
          </Sh>
          <motion.div initial="h" animate="v" variants={sv} style={{ margin: "24px auto", maxWidth: 520 }}>
            {[
              "Plus de vision.",
              "Plus de structure.",
              "Plus de sérénité.",
              "Plus d'ambition.",
              "Plus d'opportunités.",
            ].map((p) => (
              <motion.div key={p} variants={fi} style={{ ...se, fontSize: 20, fontWeight: 700, color: t.c, padding: "6px 0" }}>
                {p}
              </motion.div>
            ))}
          </motion.div>
          <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6, maxWidth: 680, margin: "0 auto" }}>
            Pour les talents, un cadre pour grandir sans se dénaturer. Pour les marques, créer avec des univers forts. Pour les audiences, des projets qui paraissent évidents.
          </div>
          <Th t={t} s={{ marginTop: 28, maxWidth: 720, margin: "28px auto 0" }}>
            Plus qu&apos;une agence, FAR est un partenaire engagé aux côtés des créateurs et des marques.
          </Th>
          {back && (
            <button
              onClick={back}
              style={{
                marginTop: 36,
                background: t.nav,
                color: t.navT,
                ...sa,
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 32px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Retour à l&apos;accueil
            </button>
          )}
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },
  ];
}
