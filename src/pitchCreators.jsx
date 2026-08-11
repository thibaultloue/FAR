/**
 * Pitch créateurs — DA Keynote épurée (anti-template IA).
 * Structure : Ouverture → FAR → Manifesto → Pourquoi toi → Proposition → Preuve/vision → Cadre → Deal → Merci
 */

const kd = { fontFamily: "'Syne',sans-serif" };
const kb = { fontFamily: "'Instrument Sans',sans-serif" };

const grain = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
  backgroundSize: "180px 180px",
  opacity: 0.07,
  pointerEvents: "none",
};

function KRule({ t, w = 48 }) {
  return <div style={{ width: w, height: 2, background: t.a, marginBottom: 28, borderRadius: 1 }} />;
}

function KEyebrow({ t, children }) {
  return (
    <div style={{ ...kb, fontSize: 13, fontWeight: 500, letterSpacing: 0.2, color: t.m, marginBottom: 18 }}>
      {children}
    </div>
  );
}

function KTitle({ t, children, s }) {
  return (
    <div style={{ ...kd, fontSize: 52, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05, color: t.c, marginBottom: 18, ...s }}>
      {children}
    </div>
  );
}

function KLead({ t, children, s }) {
  return (
    <div style={{ ...kb, fontSize: 20, fontWeight: 400, lineHeight: 1.45, color: t.m, maxWidth: 640, ...s }}>
      {children}
    </div>
  );
}

function KBody({ t, children, s }) {
  return (
    <div style={{ ...kb, fontSize: 17, fontWeight: 400, lineHeight: 1.55, color: t.m, maxWidth: 560, ...s }}>
      {children}
    </div>
  );
}

function slideFar({ FarLogo }) {
  return {
    title: "FAR",
    r: (t) => (
      <div style={{ maxWidth: 820 }}>
        <div style={{ marginBottom: 36 }}>
          <FarLogo size={56} variant={t.lv} />
        </div>
        <KEyebrow t={t}>Qui on est</KEyebrow>
        <KTitle t={t} s={{ fontSize: 48, marginBottom: 28 }}>
          On est FAR.
        </KTitle>
        <KLead t={t} s={{ marginBottom: 48 }}>
          Une petite structure. On accompagne des créateurs, et on vend des marques qui ont une place réelle dans leur univers.
        </KLead>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { n: "Roster serré", d: "Peu de talents. On choisit." },
            { n: "10 ans", d: "Marques et créateurs — pas de théorie." },
            { n: "Une règle", d: "Si ça ne tient pas dans ton récit, on ne le pousse pas." },
          ].map((x, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 24,
                padding: "22px 0",
                borderTop: `1px solid ${t.brd}`,
                borderBottom: i === 2 ? `1px solid ${t.brd}` : "none",
                alignItems: "baseline",
              }}
            >
              <div style={{ ...kd, fontSize: 22, fontWeight: 700, color: t.c, letterSpacing: "-0.02em" }}>{x.n}</div>
              <div style={{ ...kb, fontSize: 18, color: t.m, lineHeight: 1.4 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  };
}

function slideManifesto() {
  return {
    title: "Manifesto",
    r: (t) => (
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "left" }}>
        <KEyebrow t={t}>Ce qu&apos;on croit</KEyebrow>
        <KTitle t={t} s={{ fontSize: 44, maxWidth: 720, marginBottom: 36 }}>
          Un créateur, c&apos;est un univers.
          <br />
          Pas une audience.
        </KTitle>
        <KBody t={t} s={{ fontSize: 19, maxWidth: 640, marginBottom: 20, color: t.c }}>
          Des codes. Un rythme. Une exigence. Une communauté qui te suit pour ça.
        </KBody>
        <KBody t={t} s={{ fontSize: 19, maxWidth: 640, marginBottom: 40 }}>
          Notre job : faire grandir cet univers — sans le dénaturer.
        </KBody>
        <KRule t={t} w={40} />
        <div style={{ ...kd, fontSize: 24, fontWeight: 700, color: t.a, letterSpacing: "-0.02em" }}>
          Qui veut aller loin, vient ici.
        </div>
      </div>
    ),
  };
}

function slideCadre({ semi } = {}) {
  return {
    title: "Le cadre",
    r: (t) => (
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <KEyebrow t={t}>{semi ? "Le cadre · semi-exclusivité" : "Le cadre"}</KEyebrow>
        <KTitle t={t} s={{ fontSize: 48, marginBottom: 24, textAlign: "center" }}>
          On ne te met pas
          <br />
          la bague au doigt.
        </KTitle>
        <KLead t={t} s={{ margin: "0 auto 40px", textAlign: "center", maxWidth: 560 }}>
          {semi
            ? "On s'ajoute à ce que tu as déjà. Pas d'exclusivité totale. Ta liberté reste intacte."
            : "On s'ajoute à ce que tu as déjà. Pas d'exclusivité. Ta liberté reste intacte."}
        </KLead>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            textAlign: "left",
            maxWidth: 520,
            margin: "0 auto",
            borderTop: `1px solid ${t.brd}`,
          }}
        >
          {[
            "Commission seulement sur ce qu'on t'apporte.",
            "Rien n'est signé sans toi.",
            "On ne touche pas à ta ligne édito.",
          ].map((line, i) => (
            <div
              key={i}
              style={{
                ...kb,
                fontSize: 17,
                color: t.c,
                padding: "16px 0",
                borderBottom: `1px solid ${t.brd}`,
                lineHeight: 1.4,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
  };
}

function slideDeal() {
  return {
    title: "Le deal",
    r: (t) => (
      <div style={{ maxWidth: 860 }}>
        <KEyebrow t={t}>Apport d&apos;affaires</KEyebrow>
        <KTitle t={t} s={{ fontSize: 40, marginBottom: 12 }}>
          Commission sur le business additionnel.
        </KTitle>
        <KLead t={t} s={{ marginBottom: 48, maxWidth: 520 }}>
          Pas sur tes deals entrants. Pas sur ton existant.
        </KLead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: `1px solid ${t.brd}` }}>
          {[
            { r: "Deal < 20 k€", p: "20 %" },
            { r: "20 – 35 k€", p: "25 %" },
            { r: "Deal > 35 k€", p: "30 %" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                padding: "32px 20px 28px",
                borderRight: i < 2 ? `1px solid ${t.brd}` : "none",
                borderBottom: `1px solid ${t.brd}`,
              }}
            >
              <div style={{ ...kb, fontSize: 14, color: t.m, marginBottom: 14 }}>{c.r}</div>
              <div style={{ ...kd, fontSize: 48, fontWeight: 700, color: t.a, letterSpacing: "-0.04em", lineHeight: 1 }}>{c.p}</div>
            </div>
          ))}
        </div>
        <KBody t={t} s={{ marginTop: 36, color: t.c }}>
          Cohérence d&apos;abord. Tu gardes la main. On ne brade pas tes tarifs.
        </KBody>
      </div>
    ),
  };
}

function slideMerci({ FarLogo }) {
  return {
    title: "Merci",
    r: (t, back) => (
      <div style={{ textAlign: "center", padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 48 }}>
          <FarLogo size={72} variant={t.lv} />
        </div>
        <div style={{ ...kd, fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 20, color: t.c }}>
          Merci.
        </div>
        <div style={{ ...kb, fontSize: 18, color: t.m, marginBottom: 8 }}>Qui veut aller loin, vient ici.</div>
        <KRule t={t} w={36} />
        {back && (
          <button
            onClick={back}
            style={{
              marginTop: 28,
              background: "transparent",
              color: t.c,
              ...kb,
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: 999,
              border: `1px solid ${t.brd}`,
              cursor: "pointer",
            }}
          >
            ← Retour
          </button>
        )}
      </div>
    ),
  };
}

function slideOpen({ name, photo, line, FarLogo, pu }) {
  return {
    title: "Ouverture",
    r: (t) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 56,
          alignItems: "center",
          minHeight: "58vh",
          width: "100%",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <FarLogo size={44} variant={t.lv} />
          </div>
          <KEyebrow t={t}>Apport d&apos;affaires</KEyebrow>
          <KTitle t={t} s={{ fontSize: 56, marginBottom: 22 }}>
            {name}
            <span style={{ color: t.a }}> × </span>
            FAR
          </KTitle>
          <KLead t={t} s={{ marginBottom: 0, maxWidth: 480 }}>
            {line}
          </KLead>
        </div>
        <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", height: 480 }}>
          <img
            src={pu(photo)}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", objectPosition: "center top" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, ${t.bg} 0%, transparent 42%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", inset: 0, ...grain }} />
        </div>
      </div>
    ),
  };
}

function slidePourquoi({ title, lead, stats, points }) {
  return {
    title: "Pourquoi toi",
    r: (t) => (
      <div style={{ maxWidth: 900 }}>
        <KEyebrow t={t}>Pourquoi toi</KEyebrow>
        <KTitle t={t} s={{ fontSize: 44, marginBottom: 16, maxWidth: 700 }}>
          {title}
        </KTitle>
        <KLead t={t} s={{ marginBottom: 44, maxWidth: 560 }}>
          {lead}
        </KLead>
        <div style={{ display: "flex", gap: 40, marginBottom: 48, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ ...kd, fontSize: 36, fontWeight: 700, color: t.a, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
              <div style={{ ...kb, fontSize: 14, color: t.m, marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${t.brd}` }}>
          {points.map((p, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 20,
                padding: "18px 0",
                borderBottom: `1px solid ${t.brd}`,
                alignItems: "baseline",
              }}
            >
              <div style={{ ...kd, fontSize: 16, fontWeight: 700, color: t.c }}>{p.t}</div>
              <div style={{ ...kb, fontSize: 16, color: t.m, lineHeight: 1.45 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  };
}

function slideRemplissage({ from, to = "~100 %", note, dual }) {
  return {
    title: "Ce qu'on te propose",
    r: (t) => (
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <KEyebrow t={t}>Ce qu&apos;on te propose</KEyebrow>
        <KTitle t={t} s={{ fontSize: 40, marginBottom: 14, textAlign: "center" }}>
          Remplir ce qui est vide.
          <br />
          Sur le long terme.
        </KTitle>
        <KLead t={t} s={{ margin: "0 auto 48px", textAlign: "center", maxWidth: 520 }}>
          {note}
        </KLead>
        {dual ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 64, marginBottom: 36 }}>
            {dual.map((x, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ ...kb, fontSize: 13, color: t.m, marginBottom: 12 }}>{x.l}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, justifyContent: "center" }}>
                  <span style={{ ...kd, fontSize: 48, fontWeight: 700, color: t.c, letterSpacing: "-0.04em" }}>{x.v}</span>
                  <span style={{ ...kb, fontSize: 24, color: t.a }}>→</span>
                  <span style={{ ...kd, fontSize: 48, fontWeight: 700, color: t.a, letterSpacing: "-0.04em" }}>{to}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 28, marginBottom: 36 }}>
            <span style={{ ...kd, fontSize: 96, fontWeight: 700, color: t.c, letterSpacing: "-0.05em", lineHeight: 1 }}>{from}</span>
            <span style={{ ...kb, fontSize: 40, color: t.a, fontWeight: 500 }}>→</span>
            <span style={{ ...kd, fontSize: 96, fontWeight: 700, color: t.a, letterSpacing: "-0.05em", lineHeight: 1 }}>{to}</span>
          </div>
        )}
        <div style={{ ...kb, fontSize: 15, color: t.m }}>Objectif long terme — un partenaire quand ça a du sens. Pas plus.</div>
      </div>
    ),
  };
}

/** Wireframe fond Grand JD + DA Keynote */
function buildGrandJd({ FarLogo, pu }) {
  return [
    slideOpen({
      name: "Le Grand JD",
      photo: "/grandjd/jd-portrait.jpg",
      line: "On veut bosser avec toi. Apporter des marques qui ont une vraie place dans tes formats — sans te rajouter de bruit.",
      FarLogo,
      pu,
    }),
    slideFar({ FarLogo }),
    slideManifesto(),
    slidePourquoi({
      title: "Tu fais du long qui compte.",
      lead: "Reportage, urbex, paranormal, rencontres. Un récit que les marques peuvent défendre — pas du reach jetable.",
      stats: [
        { v: "4,2M", l: "abonnés YouTube" },
        { v: "17 ans", l: "de création" },
        { v: "~28 %", l: "de remplissage aujourd'hui" },
      ],
      points: [
        { t: "Formats", d: "Documentaire, enquête — une surface premium." },
        { t: "Territoire", d: "Lisible. Rare. Brand-safe." },
        { t: "Potentiel", d: "Beaucoup de vidéos sortent encore sans partenaire." },
      ],
    }),
    slideRemplissage({
      from: "~28 %",
      note: "Trop de bonnes vidéos partent sans marque. L'idée : se rapprocher de 100 % — un sponsor par vidéo, quand c'est juste.",
    }),
    {
      title: "Preuve",
      r: (t) => (
        <div style={{ maxWidth: 920 }}>
          <KEyebrow t={t}>Ce qu&apos;on aurait fait</KEyebrow>
          <KTitle t={t} s={{ fontSize: 36, marginBottom: 12, maxWidth: 700 }}>
            Trois vidéos fortes. Zéro marque.
          </KTitle>
          <KLead t={t} s={{ marginBottom: 40, maxWidth: 540 }}>
            Pas un catalogue. Juste trois angles qu&apos;on aurait défendus.
          </KLead>
          {[
            {
              v: "58 jours pour filmer un animal que personne ne voit",
              c: "Optique & capture",
              d: "Basse lumière, longue focale. Sony, Canon, Fujifilm…",
            },
            {
              v: "L'épidémie la plus étrange de France",
              c: "Santé digitale",
              d: "Symptômes flous, accès au soin. Qare, Doctolib, Alan…",
            },
            {
              v: "Le lac aux squelettes",
              c: "4x4 & mobilité",
              d: "Terrain hostile, accès extrême. Land Rover, Jeep, Toyota…",
            },
          ].map((x, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1.2fr 1fr",
                gap: 20,
                padding: "22px 0",
                borderTop: `1px solid ${t.brd}`,
                borderBottom: i === 2 ? `1px solid ${t.brd}` : "none",
                alignItems: "start",
              }}
            >
              <div style={{ ...kd, fontSize: 16, fontWeight: 700, color: t.a }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div style={{ ...kb, fontSize: 16, fontWeight: 600, color: t.c, lineHeight: 1.35, marginBottom: 6 }}>{x.v}</div>
                <div style={{ ...kd, fontSize: 18, fontWeight: 700, color: t.a }}>{x.c}</div>
              </div>
              <div style={{ ...kb, fontSize: 15, color: t.m, lineHeight: 1.45 }}>{x.d}</div>
            </div>
          ))}
        </div>
      ),
    },
    slideCadre(),
    slideDeal(),
    slideMerci({ FarLogo }),
  ];
}

function buildBouseuh({ FarLogo, pu }) {
  return [
    slideOpen({
      name: "Le Bouseuh",
      photo: "/lebouseuh.png",
      line: "Audience, Lockd, podcast. On veut t'aider à monétiser ce que tu as déjà construit — proprement.",
      FarLogo,
      pu,
    }),
    slideFar({ FarLogo }),
    slideManifesto(),
    slidePourquoi({
      title: "Tu n'es pas qu'une audience.",
      lead: "Tu as Lockd, un podcast, des collabs longues. Un vrai écosystème — rare à ce niveau.",
      stats: [
        { v: "4,61M", l: "YouTube" },
        { v: "2,1M", l: "Twitch" },
        { v: "Samsung", l: "ambassadeur FR" },
      ],
      points: [
        { t: "Actifs", d: "Lockd et le podcast : du tien, déjà structuré." },
        { t: "Preuve", d: "Tu sais tenir une association dans la durée." },
        { t: "Potentiel", d: "Des surfaces encore sous-exploitées commercialement." },
      ],
    }),
    slideRemplissage({
      from: "~28 %",
      note: "Même logique que pour un format fort : trop de trous entre les deals. On vise 100 % sur le long terme — sans saturer ton univers.",
    }),
    {
      title: "Vision",
      r: (t) => (
        <div style={{ maxWidth: 780 }}>
          <KEyebrow t={t}>Où on veut aller</KEyebrow>
          <KTitle t={t} s={{ fontSize: 40, marginBottom: 40 }}>
            Quatre surfaces.
            <br />
            Quatre partenaires justes.
          </KTitle>
          {[
            { t: "Lockd", d: "Un partenaire structurant pour ton commerce." },
            { t: "Podcast", d: "Un sponsor de saison — ou d'année." },
            { t: "Complément", d: "Un territoire qu'on ouvre avec toi." },
            { t: "Chaque format", d: "Un partenaire cohérent. Pas de volume pour le volume." },
          ].map((x, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 24,
                padding: "20px 0",
                borderTop: `1px solid ${t.brd}`,
                borderBottom: i === 3 ? `1px solid ${t.brd}` : "none",
                alignItems: "baseline",
              }}
            >
              <div style={{ ...kd, fontSize: 20, fontWeight: 700, color: t.a }}>{x.t}</div>
              <div style={{ ...kb, fontSize: 17, color: t.m, lineHeight: 1.4 }}>{x.d}</div>
            </div>
          ))}
        </div>
      ),
    },
    slideCadre(),
    slideDeal(),
    slideMerci({ FarLogo }),
  ];
}

function buildUnchained({ FarLogo, pu }) {
  return [
    slideOpen({
      name: "Unchained",
      photo: "/unchained/portrait.jpg",
      line: "Deux chaînes, un rythme fou, des produits à ton nom. On veut transformer ce volume en collabs qui tiennent.",
      FarLogo,
      pu,
    }),
    slideFar({ FarLogo }),
    slideManifesto(),
    slidePourquoi({
      title: "Tu es déjà une machine.",
      lead: "Depuis 2017, tu as fait passer le gaming en divertissement grand public. Multi-chaînes, multi-formats — un écosystème rare.",
      stats: [
        { v: "+15M", l: "abonnés cumulés" },
        { v: "~7,3M", l: "chaîne gaming" },
        { v: "~6,2M", l: "chaîne principale" },
      ],
      points: [
        { t: "Volume", d: "Un rythme de publication qui devient un actif." },
        { t: "Preuve produit", d: "Tryhard, LaFrenchTacos — ta communauté suit." },
        { t: "Potentiel", d: "La chaîne principale est encore très ouverte." },
      ],
    }),
    slideRemplissage({
      dual: [
        { l: "Chaîne principale", v: "~25 %" },
        { l: "Chaîne gaming", v: "~70 %" },
      ],
      note: "Combler les trous entre tes gros formats — avec les bons partenaires, sur le long terme.",
    }),
    {
      title: "Catégories",
      r: (t) => (
        <div style={{ maxWidth: 860 }}>
          <KEyebrow t={t}>Où on pousse</KEyebrow>
          <KTitle t={t} s={{ fontSize: 40, marginBottom: 14 }}>
            Des catégories qui collent à tes formats.
          </KTitle>
          <KLead t={t} s={{ marginBottom: 40, maxWidth: 520 }}>
            Pas six cartes. Six pistes — à activer sans saturer ton audience.
          </KLead>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: `1px solid ${t.brd}` }}>
            {[
              { c: "Sport & street", d: "Nike, Puma, GymShark…" },
              { c: "Food & énergie", d: "Holy, Air Up, compléments…" },
              { c: "Fintech & VPN", d: "NordVPN, Qonto, Revolut…" },
              { c: "Gaming", d: "Éditeurs, mobile, hardware…" },
              { c: "Setup", d: "Bureau, lumière, siège…" },
              { c: "Grand public", d: "Ambassades long terme…" },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 28px 22px 0",
                  borderBottom: `1px solid ${t.brd}`,
                  borderRight: i % 2 === 0 ? `1px solid ${t.brd}` : "none",
                  paddingLeft: i % 2 === 1 ? 28 : 0,
                }}
              >
                <div style={{ ...kd, fontSize: 20, fontWeight: 700, color: t.c, marginBottom: 6 }}>{x.c}</div>
                <div style={{ ...kb, fontSize: 15, color: t.m }}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    slideCadre({ semi: true }),
    slideDeal(),
    slideMerci({ FarLogo }),
  ];
}

export function createPitchCreatorDecks({ FarLogo, pu }) {
  return {
    SGrandJd: buildGrandJd({ FarLogo, pu }),
    SBouseuh: buildBouseuh({ FarLogo, pu }),
    SUnchained: buildUnchained({ FarLogo, pu }),
  };
}
