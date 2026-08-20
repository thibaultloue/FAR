/**
 * Pitch créateurs — Keynote dense : images, structure, échelle.
 * Typo Bricolage Grotesque + Karla. Copy casual.
 */

const kd = { fontFamily: "'Bricolage Grotesque',sans-serif" };
const kb = { fontFamily: "'Karla',sans-serif" };

function KRule({ t, w = 48, s }) {
  return <div style={{ width: w, height: 3, background: t.a, borderRadius: 2, marginBottom: 24, ...s }} />;
}

function KEyebrow({ t, children, center }) {
  return (
    <div
      style={{
        ...kb,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.2,
        color: t.m,
        marginBottom: 14,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

function ImgCover({ src, alt, h, r = 16, pos = "center top" }) {
  return (
    <div style={{ borderRadius: r, overflow: "hidden", height: h, width: "100%", flexShrink: 0 }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
    </div>
  );
}

function slideOpen({ name, photo, line, FarLogo, pu }) {
  return {
    title: "Ouverture",
    r: (t) => (
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", minHeight: "62vh", width: "100%" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <FarLogo size={52} variant={t.lv} />
          </div>
          <KEyebrow t={t}>Un petit pitch, sans bullshit</KEyebrow>
          <div style={{ ...kd, fontSize: 56, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05, color: t.c, marginBottom: 18 }}>
            {name}
            <span style={{ color: t.a }}> × </span>
            FAR
          </div>
          <KRule t={t} w={56} />
          <div style={{ ...kb, fontSize: 21, lineHeight: 1.5, color: t.m, maxWidth: 520 }}>{line}</div>
        </div>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            height: 460,
            boxShadow: "0 24px 60px rgba(0,0,0,.45)",
            border: `1px solid ${t.brd}`,
          }}
        >
          <img src={pu(photo)} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </div>
      </div>
    ),
  };
}

function slideFar({ FarLogo }) {
  return {
    title: "FAR",
    r: (t) => (
      <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
          <FarLogo size={56} variant={t.lv} />
          <div style={{ width: 1, height: 28, background: t.brd }} />
          <KEyebrow t={t}>Qui on est</KEyebrow>
        </div>
        <div style={{ ...kd, fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: t.c, marginBottom: 16 }}>
          On est FAR.
        </div>
        <div style={{ ...kb, fontSize: 20, lineHeight: 1.5, color: t.m, maxWidth: 720, marginBottom: 40 }}>
          Petite boîte. On bosse avec des créateurs, et on trouve des marques qui ont vraiment leur place dans ce qu&apos;ils font.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: `1px solid ${t.brd}`, borderRadius: 18, overflow: "hidden" }}>
          {[
            { n: "Roster serré", d: "Peu de gens. On choisit avec qui on avance." },
            { n: "10 ans", d: "Du concret marques + créateurs. Pas de slides creux." },
            { n: "Une règle", d: "Si ça colle pas à ton univers, on pousse pas." },
          ].map((x, i) => (
            <div
              key={i}
              style={{
                padding: "36px 28px",
                background: i === 1 ? "rgba(255,255,255,.04)" : "transparent",
                borderRight: i < 2 ? `1px solid ${t.brd}` : "none",
                textAlign: "center",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ ...kd, fontSize: 26, fontWeight: 700, color: t.a, marginBottom: 12, letterSpacing: "-0.02em" }}>{x.n}</div>
              <div style={{ ...kb, fontSize: 16, color: t.m, lineHeight: 1.45 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  };
}

function slideManifesto({ FarLogo }) {
  return {
    title: "Manifesto",
    r: (t) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "58vh", width: "100%" }}>
        <FarLogo size={64} variant={t.lv} />
        <div style={{ marginTop: 28, marginBottom: 20 }}>
          <KEyebrow t={t} center>
            Ce qu&apos;on croit
          </KEyebrow>
        </div>
        <div style={{ ...kd, fontSize: 46, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, color: t.c, maxWidth: 820, marginBottom: 28 }}>
          Un créateur, c&apos;est un univers.
          <br />
          Pas juste des vues.
        </div>
        <div style={{ ...kb, fontSize: 20, lineHeight: 1.55, color: t.m, maxWidth: 620, marginBottom: 16 }}>
          Tes codes, ton rythme, ce que ta communauté vient chercher chez toi.
        </div>
        <div style={{ ...kb, fontSize: 20, lineHeight: 1.55, color: t.c, maxWidth: 620, marginBottom: 36 }}>
          Notre job : faire grandir ça — sans te transformer en panneau pub.
        </div>
        <KRule t={t} w={48} s={{ marginBottom: 20 }} />
        <div style={{ ...kd, fontSize: 26, fontWeight: 700, color: t.a, letterSpacing: "-0.02em" }}>Qui veut aller loin, vient ici.</div>
      </div>
    ),
  };
}

function slidePourquoi({ title, lead, stats, points, photo, axes, FarLogo, pu }) {
  return {
    title: "Pourquoi toi",
    r: (t) => (
      <div style={{ display: "grid", gridTemplateColumns: "1.35fr 0.75fr", gap: 36, alignItems: "stretch", width: "100%", minHeight: "58vh" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <KEyebrow t={t}>Pourquoi toi</KEyebrow>
          <div style={{ ...kd, fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: t.c, marginBottom: 12, maxWidth: 640 }}>
            {title}
          </div>
          <div style={{ ...kb, fontSize: 17, lineHeight: 1.5, color: t.m, marginBottom: 28, maxWidth: 580 }}>{lead}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 12, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,.05)",
                  border: `1px solid ${t.brd}`,
                  textAlign: "center",
                }}
              >
                <div style={{ ...kd, fontSize: 28, fontWeight: 700, color: t.a, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
                <div style={{ ...kb, fontSize: 12, color: t.m, marginTop: 8, lineHeight: 1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${t.brd}` }}>
            {points.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: `1px solid ${t.brd}`,
                  alignItems: "baseline",
                }}
              >
                <div style={{ ...kd, fontSize: 15, fontWeight: 700, color: t.a }}>{p.t}</div>
                <div style={{ ...kb, fontSize: 15, color: t.m, lineHeight: 1.45 }}>{p.d}</div>
              </div>
            ))}
          </div>
          {axes && (
            <>
              <div style={{ ...kb, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: t.d, marginTop: 22, marginBottom: 10 }}>TON UNIVERS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {axes.map((a, i) => (
                  <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${t.brd}`, background: "rgba(255,255,255,.04)" }}>
                    <img src={pu(a.img)} alt={a.t} style={{ width: "100%", height: 78, objectFit: "cover", display: "block" }} />
                    <div style={{ ...kb, fontSize: 13, fontWeight: 700, color: t.c, padding: "8px 10px" }}>{a.t}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ alignSelf: "center", borderRadius: 18, overflow: "hidden", border: `1px solid ${t.brd}`, height: 480 }}>
          <img src={pu(photo)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </div>
      </div>
    ),
  };
}

function slideRemplissage({ from, to = "~100 %", note, dual }) {
  return {
    title: "Ce qu'on te propose",
    r: (t) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "58vh", width: "100%" }}>
        <KEyebrow t={t} center>
          Ce qu&apos;on te propose
        </KEyebrow>
        <div style={{ ...kd, fontSize: 42, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, color: t.c, marginBottom: 16, maxWidth: 780 }}>
          Remplir ce qui est vide.
          <br />
          Tranquillement, sur la durée.
        </div>
        <div style={{ ...kb, fontSize: 18, lineHeight: 1.5, color: t.m, maxWidth: 580, marginBottom: 44 }}>{note}</div>
        {dual ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 56, marginBottom: 40, flexWrap: "wrap" }}>
            {dual.map((x, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: 260 }}>
                <div style={{ ...kb, fontSize: 13, fontWeight: 600, color: t.m, marginBottom: 14 }}>{x.l}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, justifyContent: "center" }}>
                  <span style={{ ...kd, fontSize: 56, fontWeight: 700, color: t.c, letterSpacing: "-0.04em", lineHeight: 1 }}>{x.v}</span>
                  <span style={{ ...kb, fontSize: 28, color: t.a, fontWeight: 600 }}>→</span>
                  <span style={{ ...kd, fontSize: 56, fontWeight: 700, color: t.a, letterSpacing: "-0.04em", lineHeight: 1 }}>{to}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 28, marginBottom: 40 }}>
            <span style={{ ...kd, fontSize: 108, fontWeight: 700, color: t.c, letterSpacing: "-0.05em", lineHeight: 1 }}>{from}</span>
            <span style={{ ...kb, fontSize: 48, color: t.a, fontWeight: 600 }}>→</span>
            <span style={{ ...kd, fontSize: 108, fontWeight: 700, color: t.a, letterSpacing: "-0.05em", lineHeight: 1 }}>{to}</span>
          </div>
        )}
        <div style={{ ...kb, fontSize: 16, color: t.m }}>Objectif long terme. Un partenaire quand ça a du sens — pas plus.</div>
      </div>
    ),
  };
}

function slideCadre({ semi } = {}) {
  return {
    title: "Le cadre",
    r: (t) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "58vh", width: "100%" }}>
        <KEyebrow t={t} center>
          {semi ? "Le cadre · semi-exclusivité" : "Le cadre"}
        </KEyebrow>
        <div style={{ ...kd, fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: t.c, marginBottom: 22 }}>
          On te met pas
          <br />
          la bague au doigt.
        </div>
        <KRule t={t} w={56} s={{ marginLeft: "auto", marginRight: "auto" }} />
        <div style={{ ...kb, fontSize: 20, lineHeight: 1.5, color: t.m, maxWidth: 560, marginBottom: 40 }}>
          {semi
            ? "On s'ajoute à ce que tu as déjà. Pas d'exclusivité totale. Tu gardes ta liberté."
            : "On s'ajoute à ce que tu as déjà. Pas d'exclusivité. Tu gardes ta liberté."}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, width: "100%", maxWidth: 900 }}>
          {[
            "Com' uniquement sur ce qu'on t'apporte.",
            "Rien n'est signé dans ton dos.",
            "On touche pas à ta ligne édito.",
          ].map((line, i) => (
            <div
              key={i}
              style={{
                padding: "22px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,.05)",
                border: `1px solid ${t.brd}`,
                ...kb,
                fontSize: 15,
                color: t.c,
                lineHeight: 1.45,
                textAlign: "left",
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
      <div style={{ width: "100%", maxWidth: 980, margin: "0 auto" }}>
        <KEyebrow t={t}>Le deal</KEyebrow>
        <div style={{ ...kd, fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: t.c, marginBottom: 12 }}>
          On est payés sur le business qu&apos;on amène.
        </div>
        <div style={{ ...kb, fontSize: 18, color: t.m, marginBottom: 40, maxWidth: 520 }}>
          Pas sur tes deals entrants. Pas sur ce que tu as déjà.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: `1px solid ${t.brd}`, borderRadius: 18, overflow: "hidden", marginBottom: 32 }}>
          {[
            { r: "Deal < 20 k€", p: "20 %" },
            { r: "20 – 35 k€", p: "25 %" },
            { r: "Deal > 35 k€", p: "30 %" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                padding: "40px 24px",
                textAlign: "center",
                background: i === 1 ? "rgba(255,255,255,.05)" : i === 2 ? `${t.a}14` : "transparent",
                borderRight: i < 2 ? `1px solid ${t.brd}` : "none",
              }}
            >
              <div style={{ ...kb, fontSize: 15, color: t.m, marginBottom: 16 }}>{c.r}</div>
              <div style={{ ...kd, fontSize: 52, fontWeight: 700, color: t.a, letterSpacing: "-0.04em", lineHeight: 1 }}>{c.p}</div>
            </div>
          ))}
        </div>
        <div style={{ ...kb, fontSize: 17, color: t.c, lineHeight: 1.5 }}>La cohérence d&apos;abord. Tu valides tout. On brade pas tes tarifs.</div>
      </div>
    ),
  };
}

function slideMerci({ FarLogo }) {
  return {
    title: "Merci",
    r: (t, back) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "58vh" }}>
        <FarLogo size={88} variant={t.lv} />
        <div style={{ ...kd, fontSize: 64, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1, marginTop: 40, marginBottom: 18, color: t.c }}>
          Merci.
        </div>
        <div style={{ ...kb, fontSize: 19, color: t.m, marginBottom: 8 }}>Qui veut aller loin, vient ici.</div>
        <KRule t={t} w={48} s={{ marginTop: 28, marginBottom: 0 }} />
        {back && (
          <button
            onClick={back}
            style={{
              marginTop: 36,
              background: t.nav,
              color: t.navT,
              ...kb,
              fontSize: 14,
              fontWeight: 600,
              padding: "12px 28px",
              borderRadius: 10,
              border: "none",
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

function buildBouseuh({ FarLogo, pu }) {
  return [
    slideOpen({
      name: "Le Bouseuh",
      photo: "/lebouseuh.png",
      line: "Audience, Lockd, podcast. On veut t'aider à mieux monétiser ce que tu as déjà — proprement, sans te saturer.",
      FarLogo,
      pu,
    }),
    slideFar({ FarLogo }),
    slideManifesto({ FarLogo }),
    slidePourquoi({
      title: "T'es pas qu'une audience.",
      lead: "T'as Lockd, un podcast, des collabs qui durent. Un vrai setup — rare à ton niveau.",
      stats: [
        { v: "4,61M", l: "YouTube" },
        { v: "2,1M", l: "Twitch" },
        { v: "Samsung", l: "ambassadeur FR" },
      ],
      points: [
        { t: "Actifs", d: "Lockd + podcast : du tien, déjà structuré." },
        { t: "Preuve", d: "Tu sais tenir une collab dans la durée." },
        { t: "Potentiel", d: "Y a encore de la place à remplir, sans forcer." },
      ],
      photo: "/lebouseuh.png",
      axes: [
        { t: "Ta chaîne", img: "/case2_imgs/slide3_img4.jpg" },
        { t: "Lockd", img: "/bouseuh-lockd2.png" },
        { t: "Ton podcast", img: "/case2_imgs/slide7_img12.jpg" },
      ],
      FarLogo,
      pu,
    }),
    slideRemplissage({
      from: "~28 %",
      note: "Trop de trous entre les deals. On vise 100 % sur le long terme — sans pourrir ton univers.",
    }),
    {
      title: "Vision",
      r: (t) => (
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center", minHeight: "56vh", width: "100%" }}>
          <div>
            <KEyebrow t={t}>Où on veut aller</KEyebrow>
            <div style={{ ...kd, fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, color: t.c, marginBottom: 32 }}>
              Quatre surfaces.
              <br />
              Quatre bons partenaires.
            </div>
            {[
              { t: "Lockd", d: "Un partenaire solide pour ton commerce." },
              { t: "Podcast", d: "Un sponsor de saison — ou d'année." },
              { t: "Complément", d: "Un territoire qu'on ouvre avec toi." },
              { t: "Chaque format", d: "Un partenaire cohérent. Pas du volume pour le volume." },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: 18,
                  padding: "16px 0",
                  borderTop: `1px solid ${t.brd}`,
                  borderBottom: i === 3 ? `1px solid ${t.brd}` : "none",
                  alignItems: "baseline",
                }}
              >
                <div style={{ ...kd, fontSize: 18, fontWeight: 700, color: t.a }}>{x.t}</div>
                <div style={{ ...kb, fontSize: 16, color: t.m, lineHeight: 1.45 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1.2fr 1fr", gap: 14 }}>
            <ImgCover src={pu("/bouseuh-lockd.png")} alt="Lockd" h={280} r={16} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <ImgCover src={pu("/case2_imgs/slide7_img12.jpg")} alt="Podcast" h={160} r={14} />
              <ImgCover src={pu("/case2_imgs/slide1_img1.jpg")} alt="Univers" h={160} r={14} />
            </div>
          </div>
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
      line: "Deux chaînes, un rythme de ouf, des produits à ton nom. On veut transformer ce volume en collabs qui tiennent.",
      FarLogo,
      pu,
    }),
    slideFar({ FarLogo }),
    slideManifesto({ FarLogo }),
    slidePourquoi({
      title: "T'es déjà une machine.",
      lead: "Depuis 2017, t'as fait passer le gaming en divertissement grand public. Multi-chaînes, multi-formats — rare.",
      stats: [
        { v: "+15M", l: "abonnés cumulés" },
        { v: "~7,3M", l: "chaîne gaming" },
        { v: "~6,2M", l: "chaîne principale" },
      ],
      points: [
        { t: "Volume", d: "Tu sors tellement que ça devient un vrai levier." },
        { t: "Preuve produit", d: "Tryhard, LaFrenchTacos — ta com' suit." },
        { t: "Potentiel", d: "La chaîne principale est encore bien ouverte." },
      ],
      photo: "/unchained/portrait-bw.png",
      axes: [
        { t: "Vlogs IRL", img: "/unchained/thumb-vlog.jpg" },
        { t: "Défis", img: "/unchained/thumb-defis.jpg" },
        { t: "Gaming", img: "/unchained/thumb-gaming.jpg" },
      ],
      FarLogo,
      pu,
    }),
    slideRemplissage({
      dual: [
        { l: "Chaîne principale", v: "~25 %" },
        { l: "Chaîne gaming", v: "~70 %" },
      ],
      note: "Combler les trous entre tes gros formats — avec les bons partenaires, sur la durée.",
    }),
    {
      title: "Catégories",
      r: (t) => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: "56vh", width: "100%" }}>
          <div>
            <KEyebrow t={t}>Où on pousse</KEyebrow>
            <div style={{ ...kd, fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, color: t.c, marginBottom: 12 }}>
              Des catégories qui collent à tes formats.
            </div>
            <div style={{ ...kb, fontSize: 17, color: t.m, marginBottom: 28, maxWidth: 420 }}>
              Six pistes. Pas plus. À activer sans saturer ton audience.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { c: "Sport & street", d: "Nike, Puma, GymShark…" },
                { c: "Food & énergie", d: "Holy, Air Up…" },
                { c: "Fintech & VPN", d: "NordVPN, Qonto…" },
                { c: "Gaming", d: "Éditeurs, hardware…" },
                { c: "Setup", d: "Bureau, lumière…" },
                { c: "Grand public", d: "Ambassades LT…" },
              ].map((x, i) => (
                <div key={i} style={{ padding: "16px 14px", borderRadius: 12, border: `1px solid ${t.brd}`, background: "rgba(255,255,255,.04)" }}>
                  <div style={{ ...kd, fontSize: 16, fontWeight: 700, color: t.c, marginBottom: 4 }}>{x.c}</div>
                  <div style={{ ...kb, fontSize: 13, color: t.m }}>{x.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 12, height: 440 }}>
            <div style={{ gridRow: "1 / 3", borderRadius: 16, overflow: "hidden" }}>
              <img src={pu("/unchained/thumb-vlog.jpg")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden" }}>
              <img src={pu("/unchained/thumb-defis.jpg")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden" }}>
              <img src={pu("/unchained/thumb-gaming.jpg")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
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
    SBouseuh: buildBouseuh({ FarLogo, pu }),
    SUnchained: buildUnchained({ FarLogo, pu }),
  };
}
