import { useEffect } from "react";
import { asset } from "../asset.js";
import { money, stepTransition } from "./fgcBpPremierRestoV2.config.js";
import { LOGOS, PHOTOS } from "./fgcBpPremierRestoV2.assets.js";
import "./fgcBpPremierRestoV2.css";

function Slide({ id, ink = false, alt = false, children }) {
  const tone = `${ink || alt ? " is-ink" : ""}${alt ? " is-alt" : ""}`;
  return (
    <div data-deck="fgc-bp-v2" className="fgc-bp-v2">
      <section className={`fgcbp-slide${tone}`} data-fgc-slide data-slide-id={id}>
        <div className="fgc-in">{children}</div>
      </section>
    </div>
  );
}

function Photo({ photo, className, style }) {
  return (
    <img
      className={className}
      src={asset(photo.src)}
      alt={photo.alt}
      style={{ objectPosition: photo.position, ...style }}
    />
  );
}

function BpLogo({ tone = "ink", className = "" }) {
  const logo = tone === "white" ? LOGOS.bpWhite : LOGOS.bp;
  return (
    <img
      className={`fgcbp-bp-logo ${className}`}
      src={asset(logo.src)}
      alt={logo.alt}
      draggable={false}
    />
  );
}

function PartnerLockup({ tone = "white" }) {
  return (
    <div className={`fgcbp-partner ${tone === "ink" ? "is-ink" : "is-white"}`}>
      <span>FastGoodCuisine</span>
      <i aria-hidden="true">×</i>
      <BpLogo tone={tone} />
    </div>
  );
}

function Meta({ eyebrow, transition, qualifier }) {
  return (
    <p className="fgcbp-meta">
      <span>{eyebrow}</span>
      <b>{transition}</b>
      {qualifier ? <em>{qualifier}</em> : null}
    </p>
  );
}

export function FgcCoverV2() {
  return (
    <Slide id="presentation">
      <div className="fgcbp-poster">
        <Photo photo={PHOTOS.cover} className="fgcbp-poster-photo is-plateau" />
        <div className="fgcbp-poster-veil" />
        <PartnerLockup tone="white" />
        <h1 className="fgcbp-poster-title is-apprentis" data-font-check>
          <span>50 apprentis</span>
          <span>se battent pour</span>
          <span>devenir chef</span>
        </h1>
        <p className="fgcbp-poster-with">Avec Banque Populaire</p>
      </div>
    </Slide>
  );
}

export function FgcContextV2() {
  return (
    <Slide id="contexte">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Contexte</h1>
      <div className="fgcbp-context-stack">
        <p className="fgcbp-context-lead">50 apprentis qui veulent ouvrir leur restaurant.</p>
        <p>
          Banque Populaire souhaite être présente auprès des entrepreneurs dès les premières étapes de leur projet. Avec Pepe Chicken et Pop’s, Charles connaît les choix qui permettent de passer d’une idée food à une activité.
        </p>
        <p>
          Cette vidéo suit 50&nbsp;apprentis qui ont un projet entrepreneurial&nbsp;: ouvrir leur propre restaurant. Ils s’affrontent jusqu’à une finale où 4 d’entre eux créent leur food corner. Banque Populaire y apporte des moyens, du conseil et une dotation pour aider le gagnant à poursuivre son projet, ainsi qu’un accompagnement pour les autres finalistes.
        </p>
      </div>
    </Slide>
  );
}

const PHASES = [
  ["01", "Se qualifier", "50 apprentis qui veulent ouvrir leur restaurant s’affrontent dans des épreuves individuelles et en équipe. Les blancs en neige, un menu fast-food à transformer, une énigme culinaire puis le plat signature mettent à l’épreuve leur technique, leur rapidité et leur créativité."],
  ["02", "Construire leur food corner", "Les 4 finalistes imaginent leur identité, leur carte, leur plat signature et l’ambiance. Charles introduit ce travail : en plans de coupe, on les voit peaufiner leur projet avec un conseiller Banque Populaire."],
  ["03", "Convaincre", "Chaque finaliste présente son corner. Des abonnés de Charles, vrais clients, viennent tester et participent à la notation. Le gagnant remporte 30\u00a0000\u00a0€ (TBD) pour faire avancer son projet avec Banque Populaire."],
];

export function FgcConceptV2() {
  return (
    <Slide id="concept" ink>
      <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
      <div className="fgcbp-enigma">
        <h1>Concept</h1>
        <p className="fgcbp-enigma-lead is-stack">
          <span>50 apprentis.</span>
          <span>4 finalistes.</span>
          <span className="is-blue">1 gagnant.</span>
        </p>
        <div className="fgcbp-enigma-steps">
          {PHASES.map(([n, title, text]) => (
            <section key={n}>
              <span>{n}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </Slide>
  );
}

const CASTING = [
  ["Des parcours de formation variés", "Des apprentis en brigade, des élèves d’écoles de cuisine et de jeunes talents qui développent leur savoir-faire."],
  ["Des histoires à suivre", "Leur parcours, leur rapport à la cuisine et ce qui les pousse à vouloir devenir chef."],
  ["Un projet entrepreneurial", "Chacun veut ouvrir son propre restaurant."],
];

export function FgcCastingV2() {
  return (
    <Slide id="casting">
      <div className="fgcbp-lieu">
        <figure className="fgcbp-lieu-photo">
          <Photo photo={PHOTOS.casting} />
        </figure>
        <div className="fgcbp-lieu-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-lieu-panel">
          <h1>Le casting</h1>
          <p className="fgcbp-lieu-lead">50 apprentis de 18 à 25 ans, qui veulent ouvrir leur restaurant.</p>
          <ul className="fgcbp-lieu-points">
            {CASTING.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}

const STEPS = [
  ["00", "Introduction", "Face caméra : le concept, le déroulé des épreuves, Banque Populaire.", ""],
  ["01", "Blancs en neige", "Chacun monte ses blancs à la main. Les 30 premiers résultats validés passent.", "50\u00a0→\u00a030"],
  ["02", "Fast-food → gastro", "Une pièce, des prix, un budget commun limité. 5 équipes passent.", "30\u00a0→\u00a015"],
  ["03", "L’énigme culinaire", "Observer une cuisine, puis reconstituer le plat. Les 10 meilleurs passent.", "15\u00a0→\u00a010", "Alternative : le plat d’un client."],
  ["04", "Le plat signature", "Un plat, le garde-manger, le même temps pour tous. Le jury en retient 4.", "10\u00a0→\u00a04"],
  ["05", "Le food corner", "Plans de coupe avec le conseiller. Des abonnés de Charles testent les corners et notent.", "4"],
  ["06", "Délibération", "Charles, le chef invité et le conseiller désignent le gagnant.", "4\u00a0→\u00a01"],
  ["07", "Fin de la vidéo", "Charles parle de Banque Populaire face caméra.", ""],
];

const PRESENCE = [
  { role: "Face cam intro", from: 1, to: 1, kind: "cam" },
  { role: "Gérer son budget", from: 3, to: 3, kind: "bp" },
  { role: "Face cam Charles", from: 4, to: 4, kind: "cam" },
  { role: "Plans de coupe, puis jury", from: 6, to: 7, kind: "bp" },
  { role: "Face cam de fin", from: 8, to: 8, kind: "cam" },
];

export function FgcRunV2() {
  return (
    <Slide id="deroule">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Déroulé</h1>
      <p className="fgcbp-run-lead">L’introduction, 4 épreuves, la finale, puis la délibération.</p>
      <div className="fgcbp-frise is-summary">
        <div className="fgcbp-frise-rail" aria-hidden="true" />
        <ol className="fgcbp-frise-steps">
          {STEPS.map(([n, title, text, gauge, alt]) => (
            <li className={`fgcbp-frise-step has-callout${alt ? " is-fork" : ""}`} key={n}>
              <div className="fgcbp-dot-row">
                <span className="fgcbp-frise-node" data-frise-node>{n}</span>
              </div>
              <h2 className="fgcbp-step-title">{title}</h2>
              <p className="fgcbp-step-copy">{text}</p>
              {alt ? <p className="fgcbp-step-alt">{alt}</p> : null}
              {gauge ? <span className="fgcbp-step-callout">{gauge}</span> : <span className="fgcbp-step-callout is-empty" />}
            </li>
          ))}
        </ol>
        <div className="fgcbp-cast-block">
          <p className="fgcbp-cast-label">Présence de Banque Populaire dans la vidéo</p>
          <div className="fgcbp-cast-arrows" aria-label="Présence de Banque Populaire dans la vidéo">
            {PRESENCE.map((row) => (
              <div
                key={row.role}
                className={`fgcbp-cast-arrow is-${row.kind}`}
                style={{ gridColumn: `${row.from} / ${row.to + 1}` }}
              >
                <strong>{row.role}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

function BpRole({ title = "Le rôle de Banque Populaire dans l’épreuve", body, flow }) {
  return (
    <aside className="fgcbp-bp-role">
      <h2>{title}</h2>
      <p>{body}</p>
      {flow ? <p className="fgcbp-bp-role-flow">{flow}</p> : null}
    </aside>
  );
}

function EpreuveFrame({ id, photo, eyebrow, transition, title, lead, points, role }) {
  return (
    <Slide id={id}>
      <div className="fgcbp-lieu">
        <figure className="fgcbp-lieu-photo">
          <Photo photo={photo} />
        </figure>
        <div className="fgcbp-lieu-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className={`fgcbp-lieu-panel${role ? " has-role" : ""}`}>
          <p className="fgcbp-lieu-eyebrow">
            {eyebrow}
            {transition ? <span className="fgcbp-status is-on-dark">{transition}</span> : null}
          </p>
          <h1>{title}</h1>
          {lead ? <p className="fgcbp-lieu-lead">{lead}</p> : null}
          <ul className="fgcbp-lieu-points">
            {points.map(([heading, text]) => (
              <li key={heading}>
                <strong>{heading}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          {role ? <BpRole title={role.title} body={role.body} flow={role.flow} /> : null}
        </div>
      </div>
    </Slide>
  );
}

const EP1 = [
  ["Le défi", "Chaque apprenti doit monter ses blancs en neige à la main, avec les mêmes ustensiles et la même quantité de départ."],
  ["Le moment décisif", "Pour valider, le candidat retourne son cul-de-poule au-dessus de sa tête. Les blancs doivent tenir. Une préparation qui tombe ou qui reste inachevée ne passe pas."],
  ["La qualification", "Les 30 premiers résultats validés donnent accès à l’épreuve suivante."],
];

export function FgcIntroV2() {
  return (
    <EpreuveFrame
      id="introduction"
      photo={PHOTOS.intro}
      eyebrow="Introduction · Face caméra"
      title="Introduire le concept"
      points={[
        ["Le concept", "Charles l’introduit face caméra, avec les candidats derrière lui."],
        ["Le déroulé", "Il présente les épreuves, de la qualification jusqu’à la finale."],
      ]}
      role={{
        title: "Intégration Banque Populaire, FGC face caméra",
        body: "Charles parle de Banque Populaire et valorise la dimension entrepreneuriale du partenariat, la dotation pour 1 gagnant, et l’accompagnement des 4 finalistes.",
        flow: "Concept → déroulé des épreuves → Banque Populaire",
      }}
    />
  );
}

export function FgcChallenge1V2() {
  return (
    <EpreuveFrame
      id="epreuve-01"
      photo={PHOTOS.epreuve1}
      eyebrow="Épreuve 1 · Individuelle"
      transition={stepTransition(0)}
      title="Monter des blancs en neige"
      lead="Un fouet, un cul-de-poule et un chrono."
      points={EP1}
    />
  );
}

export function FgcChallenge2V2() {
  return (
    <EpreuveFrame
      id="epreuve-02"
      photo={PHOTOS.epreuve2}
      eyebrow="Épreuve 2 · En équipe"
      transition={stepTransition(1)}
      title="Transformer un fast-food en repas gastro"
      lead="Un menu familier et une assiette à réinventer."
      points={[
        ["La pièce", "10 équipes de 3 ont accès à une pièce : ustensiles et ingrédients, avec des prix. Elles achètent ce qu’elles veulent, dans un budget commun limité."],
        ["Le verdict", "Le jury goûte les 10 créations. Les 5 équipes les mieux notées poursuivent la compétition, soit 15 candidats."],
      ]}
      role={{
        body: "Charles ou le conseiller Banque Populaire — à définir — sensibilise les équipes à l’importance de gérer son budget dans un projet entrepreneurial.",
        flow: "Une pièce, des prix → un budget commun limité → les achats de l’équipe",
      }}
    />
  );
}

const ENIGMA_V2 = [
  ["Observer · 5 min", "Les candidats explorent la cuisine laissée par un chef\u00a0: ustensiles, traces de sauce, épluchures et indices permettent de deviner ce qu’il a préparé."],
  ["Reconstituer", "Ils choisissent leurs ingrédients au garde-manger, puis cuisinent leur interprétation du plat."],
  ["Convaincre · 10 points", "Le chef invité et Charles attribuent 5 points pour les ingrédients identifiés et 5 points pour la réalisation et le goût. Les 10 meilleurs se qualifient."],
];

const ENIGMA_V1 = [
  ["Observer · 2 min", "Un client déguste un plat. Les candidats observent l’assiette, les couverts et le décor. Des indices visuels, sonores et olfactifs les aident à identifier la recette avant que la lumière s’éteigne."],
  ["Choisir · 5 min", "Au garde-manger, ils sélectionnent les ingrédients qu’ils pensent avoir reconnus, puis réalisent leur version du plat."],
  ["Convaincre · 10 points", "1 point par ingrédient principal identifié, jusqu’à 5 points, puis 5 points pour la réalisation et le goût. Les 10 meilleurs poursuivent la compétition."],
];

function EnigmaPage({ id, alt = false, eyebrow, title, lead, steps, faceCam }) {
  return (
    <Slide id={id} alt={alt} ink>
      {alt ? <p className="fgcbp-alt-band">Épreuve alternative</p> : null}
      <BpLogo tone={alt ? "ink" : "white"} className={`fgcbp-brand-corner${alt ? "" : " is-on-dark"}`} />
      <div className="fgcbp-enigma">
        <Meta eyebrow={eyebrow} transition={stepTransition(2)} />
        <h1>{title}</h1>
        <p className="fgcbp-enigma-lead">{lead}</p>
        <div className="fgcbp-enigma-steps">
          {steps.map(([stepTitle, body], index) => (
            <section key={stepTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{stepTitle}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
        {faceCam ? (
          <aside className="fgcbp-face-cam">
            <h2>Présence de Banque Populaire</h2>
            <p>{faceCam}</p>
          </aside>
        ) : null}
      </div>
    </Slide>
  );
}

export function FgcEnigmaV2() {
  return (
    <EnigmaPage
      id="epreuve-03"
      eyebrow="Épreuve 3 · Individuelle"
      title="Résoudre l’énigme culinaire (option 1)"
      lead="Le plat a disparu et les indices sont encore en cuisine."
      steps={ENIGMA_V2}
      faceCam="Pendant l’épreuve, Charles parle de Banque Populaire face caméra."
    />
  );
}

export function FgcEnigmaAltV2() {
  return (
    <EnigmaPage
      id="epreuve-03-alt"
      alt
      eyebrow="Épreuve 3 · Alternative"
      title="Deviner le plat du client (option 2)"
      lead="2 min pour observer, puis reconstruire ce qui a été servi."
      steps={ENIGMA_V1}
      faceCam="Pendant l’épreuve, Charles parle de Banque Populaire face caméra."
    />
  );
}

export function FgcSignatureV2() {
  return (
    <EpreuveFrame
      id="epreuve-04"
      photo={PHOTOS.epreuve4}
      eyebrow="Épreuve 4 · Individuelle"
      transition={stepTransition(3)}
      title="Cuisiner son plat signature"
      lead="10 candidats et 1 assiette pour accéder à la finale."
      points={[
        ["Le défi", "Chaque candidat prépare le plat qui représente le mieux sa cuisine. Il compose uniquement avec les ingrédients du garde-manger et dispose du même temps que les autres."],
        ["Le verdict", "Le jury goûte les 10 plats et retient les 4 candidats qui le convainquent le plus."],
      ]}
    />
  );
}

const FINALE = [
  ["Créer son univers", "Un nom, une identité, une carte courte, un plat signature et une ambiance, dans une enveloppe identique."],
  ["De vrais clients", "Des abonnés de Charles viennent tester les corners et participent à la notation des candidats."],
  ["Défendre son projet", "Ils présentent leur corner, servent leur plat au jury et expliquent leurs choix."],
];

export function FgcFinaleV2() {
  return (
    <Slide id="finale">
      <div className="fgcbp-lieu">
        <figure className="fgcbp-lieu-photo">
          <Photo photo={PHOTOS.finale} />
        </figure>
        <div className="fgcbp-lieu-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-lieu-panel has-role">
          <p className="fgcbp-lieu-eyebrow">
            La finale · La Felicità envisagée
            <span className="fgcbp-status is-on-dark">{stepTransition(4)}</span>
          </p>
          <h1>Créer son food corner</h1>
          <p className="fgcbp-lieu-lead">4 finalistes ouvrent leur corner face à de vrais clients.</p>
          <ul className="fgcbp-lieu-points">
            {FINALE.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <BpRole
            body="Charles introduit la finale : les candidats ont travaillé leur corner. En inserts, on les voit peaufiner leur projet avec le conseiller Banque Populaire. Il les retrouve ensuite devant le jury."
            flow="Intro de Charles → inserts avec le conseiller → corner présenté"
          />
        </div>
      </div>
    </Slide>
  );
}

const ADVISOR = [
  ["01", "Construire une offre cohérente", "À qui s’adresse le corner ? Quel produit est mis en avant ? La carte, les prix et l’identité racontent-ils le même projet ?"],
  ["02", "Utiliser le budget à bon escient", "Quels achats sont indispensables ? Combien réserver aux ingrédients, au matériel et à l’aménagement ? Que faut-il simplifier pour rester dans l’enveloppe ?"],
  ["03", "Préparer le fonctionnement", "Quelles quantités produire ? Combien de temps prend une commande ? Comment organiser le poste pour tenir la carte annoncée ?"],
];

export function FgcCoachV2() {
  return (
    <Slide id="accompagnement">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 className="fgcbp-title-wide" data-section-title>Banque Populaire accompagne les finalistes</h1>
      <p className="fgcbp-cast-lead">4 projets à préparer, 4 séries de décisions à rendre concrètes.</p>
      <div className="fgcbp-advisor-block">
        <div className="fgcbp-advisor">
          {ADVISOR.map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="fgcbp-advisor-flow">Échange avec le conseiller → Choix du finaliste → Corner réalisé</p>
        <p className="fgcbp-advisor-close">Le conseiller prépare les choix avec les finalistes, puis les retrouve devant le jury.</p>
      </div>
    </Slide>
  );
}

const JURY = [
  ["La cuisine", "Le goût, la maîtrise et la personnalité du plat signature. Charles et le chef invité portent cette lecture."],
  ["Le concept du corner", "La cohérence entre l’identité, la carte, la présentation et l’expérience proposée."],
  ["Les choix de lancement", "Un budget tenu, des prix expliqués et une organisation crédible. Le conseiller Banque Populaire apporte son regard."],
];

export function FgcJuryV2() {
  return (
    <Slide id="jury-dotation">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Le jury &amp; la dotation</h1>
      <p className="fgcbp-cast-lead">Une cuisine à goûter, un projet à défendre, et de vrais clients dans la note.</p>
      <div className="fgcbp-jury">
        <div className="fgcbp-jury-criteria">
          {JURY.map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
          <p className="fgcbp-jury-line">Jury : Charles · Un chef invité · Un conseiller Banque Populaire</p>
          <p className="fgcbp-jury-clients">Des abonnés de Charles viennent tester les corners et participent à la notation.</p>
          <p className="fgcbp-face-cam is-panel">En fin de vidéo, Charles parle de Banque Populaire face caméra.</p>
        </div>
        <aside className="fgcbp-jury-prize">
          <p className="amount">{money.prize}<span className="is-tbd"> (TBD)</span></p>
          <h2>Pour faire avancer le projet du gagnant.</h2>
          <p>Banque Populaire et le gagnant identifient la prochaine étape à financer. Un bilan de finale et une suite d’accompagnement sont proposés aux 4 finalistes.</p>
        </aside>
      </div>
    </Slide>
  );
}

export function FgcBudgetV2() {
  return (
    <Slide id="budget">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Budget</h1>
      <p className="fgcbp-total">{money.presented}</p>
      <p className="fgcbp-total-label">Création &amp; production · hors dotation</p>
      <div className="fgcbp-budget-grid">
        <div className="fgcbp-split" aria-hidden="true">
          <span className="is-talent" />
          <span className="is-prod" />
        </div>
        <div className="fgcbp-lines">
          <article>
            <p className="amount">{money.talent}</p>
            <h2>FastGoodCuisine</h2>
          </article>
          <article>
            <p className="amount">{money.production}</p>
            <h2>Production</h2>
          </article>
        </div>
      </div>
      <aside className="fgcbp-prize">
        <p className="amount">{money.prize}<span className="is-tbd"> (TBD)</span></p>
        <div>
          <h2>Dotation</h2>
          <p>Gérée directement par Banque Populaire pour faire avancer le projet du gagnant.</p>
        </div>
      </aside>
    </Slide>
  );
}

export function FgcPopsV2() {
  return (
    <Slide id="pops-option">
      <div className="fgcbp-pops">
        <figure className="fgcbp-pops-photo">
          <Photo photo={PHOTOS.popsHero} />
        </figure>
        <div className="fgcbp-pops-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-pops-panel">
          <p className="fgcbp-pops-eyebrow">Option d’intégration</p>
          <h1>Pop’s dans la finale</h1>
          <p className="fgcbp-pops-lead">
            Une présence dans l’univers de Charles, intégrée aux corners.
          </p>
          <ul className="fgcbp-pops-points">
            <li>
              <strong>Sur la carte</strong>
              <span>Une boisson Pop’s peut compléter l’offre des finalistes.</span>
            </li>
            <li>
              <strong>Dans le décor</strong>
              <span>Le produit peut être présent sur les corners, sans introduire de nouvelle mécanique ni de nouvelle séquence de marque.</span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}

const NEXT = [
  "Cadrage final du dispositif avec Banque Populaire",
  "Casting, repérage et règlement des épreuves",
  "Tournage : 14 décembre 2026",
  "On air : 26 février 2027 (à confirmer)",
];

export function FgcNextV2() {
  return (
    <Slide id="next-steps">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Next steps</h1>
      <ul className="fgcbp-next-list">
        {NEXT.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Slide>
  );
}

const PAGES = [
  FgcCoverV2,
  FgcContextV2,
  FgcConceptV2,
  FgcCastingV2,
  FgcIntroV2,
  FgcChallenge1V2,
  FgcChallenge2V2,
  FgcEnigmaV2,
  FgcEnigmaAltV2,
  FgcSignatureV2,
  FgcFinaleV2,
  FgcJuryV2,
  FgcRunV2,
  FgcBudgetV2,
  FgcNextV2,
];

export function FgcReviewV2() {
  useEffect(() => {
    document.documentElement.dataset.fgcPrint = "1";
    return () => { delete document.documentElement.dataset.fgcPrint; };
  }, []);
  return (
    <div data-deck="fgc-bp-v2" className="fgc-bp-v2 fgc-review">
      {PAGES.map((Page, i) => (
        <div className="fgc-review-page" key={i}><Page /></div>
      ))}
    </div>
  );
}
