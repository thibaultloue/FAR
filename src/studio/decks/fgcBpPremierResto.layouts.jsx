import { useEffect } from "react";
import { asset } from "../asset.js";
import { money } from "./fgcBpPremierResto.config.js";
import { CHARLES_FOOD, LOGOS, PARRAINS, PEOPLE, PHOTOS } from "./fgcBpPremierResto.assets.js";
import { DeliberationSlide, ImprevuSlide } from "./fgcV18/FGCV18Corrections.jsx";
import "./fgcBpPremierResto.css";

function Slide({ id, children }) {
  return (
    <div data-deck="fgc-bp-photo" className="fgc-bp-photo">
      <section className="fgcbp-slide" data-fgc-slide data-slide-id={id}>
        <div className="fgc-in">{children}</div>
      </section>
    </div>
  );
}

function Photo({ photo, className, style }) {
  return <img className={className} src={asset(photo.src)} alt={photo.alt} style={style} />;
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

export function FgcCover() {
  return (
    <Slide id="presentation">
      <div className="fgcbp-poster">
        <Photo photo={CHARLES_FOOD} className="fgcbp-poster-photo" />
        <div className="fgcbp-poster-veil" />
        <PartnerLockup tone="white" />
        <h1 className="fgcbp-poster-title" data-font-check>
          <span>J’aide 3 inconnus</span>
          <span>à ouvrir leur</span>
          <span>premier resto</span>
        </h1>
        <p className="fgcbp-poster-with">Avec Banque Populaire</p>
      </div>
    </Slide>
  );
}

export function FgcContext() {
  return (
    <Slide id="contexte">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Contexte</h1>
      <p className="fgcbp-context-copy">
        Banque Populaire souhaite se positionner comme la banque qui accompagne les entrepreneurs tout au long de leur projet, de l’idée au développement, en finançant, conseillant et orientant dans la durée. Ils souhaitent s’associer à FastGoodCuisine, qui incarne parfaitement ces valeurs, notamment avec le développement de Pepe Chicken &amp; Pop’s, à travers un premier concept pour le début d’année 2027, mais aussi sur toute l’année via plusieurs prises de parole.
      </p>
    </Slide>
  );
}

const PHASES = [
  ["Préparer leur ouverture", "Chaque candidat travaille avec un chef ou un entrepreneur proche de Charles : recettes, carte, prix, budget et organisation. Banque Populaire finance les mêmes moyens de départ pour les 3 : habillage du comptoir, produits et matériel. Charles suit cette préparation jusqu’à l’installation des comptoirs dans une même halle."],
  ["Assurer un vrai service", "Pendant 4\u00a0h le même jour, les candidats dirigent leur équipe, cuisinent et servent de vrais clients. Après leur repas, les clients évaluent le plat, le service et le rapport qualité-prix. Un imprévu teste la capacité des candidats à s’organiser sous pression et ajoute un point de tension dans la narration."],
  ["Délibérer et lancer la suite", "Charles, les parrains et le conseiller Banque Populaire croisent les avis clients, le résultat économique et la gestion de l’imprévu. Le meilleur score remporte la dotation. Banque Populaire poursuit tout de même l’accompagnement des 3 projets."],
];

export function FgcConcept() {
  return (
    <Slide id="concept">
      <div className="fgcbp-concept">
        <figure className="fgcbp-concept-photo">
          <Photo photo={PHOTOS.concept} style={{ objectPosition: PHOTOS.concept.position }} />
        </figure>
        <div className="fgcbp-concept-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-concept-panel">
          <h1>Concept</h1>
          <p className="fgcbp-concept-intro">Charles accompagne 3&nbsp;jeunes jusqu’à leur 1er service, avec 1&nbsp;parrain pour chacun et le soutien de Banque Populaire.</p>
          <div className="fgcbp-concept-phases">
            {PHASES.map(([title, text], i) => (
              <section key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

const CAST = [
  ["01", "Le cuisinier qui veut se lancer", "Il travaille déjà en cuisine et veut ouvrir à son nom. Il vient tester son offre et diriger son propre service.", PEOPLE.cook, "is-cook"],
  ["02", "La personne en reconversion", "Elle prépare son projet en parallèle d’un autre métier. Elle vient confronter son idée aux contraintes d’un vrai comptoir.", PEOPLE.reconversion, "is-reconversion"],
  ["03", "Le concept innovant", "Il propose une idée neuve, claire et différenciante. Il vient tester son concept face à de vrais clients et mesurer s’il tient le service.", PEOPLE.family, "is-family"],
];

export function FgcCasting() {
  return (
    <Slide id="candidats">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Candidats</h1>
      <p className="fgcbp-cast-lead">3&nbsp;profils recherchés. Un projet déjà travaillé et l’envie de convaincre leurs 1ers clients.</p>
      <div className="fgcbp-cast">
        {CAST.map(([n, title, text, person, tone]) => (
          <article className={tone} key={n}>
            <b>{n}</b>
            <div className="fgcbp-person">
              <Photo photo={person} className="is-person" style={{ objectPosition: person.position }} />
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Slide>
  );
}

const PARRAIN_PROFILES = [
  ["01", "Un chef proche de Charles", "Il transmet les gestes, aide à construire la carte et prépare le candidat au rythme d’un vrai service.", PARRAINS.chef, "is-chef"],
  ["02", "Un entrepreneur food", "Il cadre le projet côté prix, marge, achats et organisation pour que le comptoir tienne économiquement.", PARRAINS.entrepreneur, "is-entrepreneur"],
  ["03", "Un mentor terrain", "Il suit la préparation jusqu’au jour\u00a0J, reste un appui pendant l’épreuve et intervient à la délibération.", PARRAINS.mentor, "is-mentor"],
];

export function FgcParrains() {
  return (
    <Slide id="parrains">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Les Parrains</h1>
      <p className="fgcbp-cast-lead">Charles choisit 3&nbsp;parrains qui accompagneront les candidats de la préparation jusqu’à la fin du service.</p>
      <div className="fgcbp-cast">
        {PARRAIN_PROFILES.map(([n, title, text, person, tone]) => (
          <article className={tone} key={n}>
            <b>{n}</b>
            <div className="fgcbp-person">
              <Photo photo={person} className="is-person" style={{ objectPosition: person.position }} />
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Slide>
  );
}

export function FgcLieu() {
  return (
    <Slide id="lieu">
      <div className="fgcbp-lieu">
        <figure className="fgcbp-lieu-photo">
          <Photo photo={PHOTOS.halle} style={{ objectPosition: PHOTOS.halle.position }} />
        </figure>
        <div className="fgcbp-lieu-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-lieu-panel">
          <p className="fgcbp-lieu-eyebrow">Cadre de l’épreuve</p>
          <h1>Le lieu</h1>
          <p className="fgcbp-lieu-lead">
            Les 3 comptoirs ouvrent le même jour, dans une même halle, face à de vrais clients. L’option privilégiée : une halle food à Paris, à confirmer selon disponibilités et contraintes de tournage.
          </p>
          <ul className="fgcbp-lieu-points">
            <li>
              <strong>Un seul espace, 3 offres</strong>
              <span>Les candidats cuisinent et servent côte à côte, ce qui rend la comparaison lisible à l’écran.</span>
            </li>
            <li>
              <strong>Du vrai trafic</strong>
              <span>Une halle accueille un public réel pour le service, les avis clients et la tension de l’imprévu.</span>
            </li>
            <li>
              <strong>Des options ouvertes</strong>
              <span>Plusieurs halles parisiennes restent envisageables. Le lieu final sera choisi avec Charles et la production.</span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}

const CHAPTERS = [
  ["01", "Les rencontres", "Charles découvre les 3 personnes, leurs projets et ce qui les pousse à se lancer.", ""],
  ["02", "La préparation", "Chaque candidat prépare son offre avec son parrain : recettes, prix, achats et organisation.", ""],
  ["03", "L’ouverture", "Les comptoirs ouvrent. Les clients commandent, paient puis notent leur expérience.", "Avis clients"],
  ["04", "L’imprévu", "Une commande de groupe arrive en plein service. Les candidats doivent réorganiser leur équipe.", "Commande surprise"],
  ["05", "La délibération", "Charles et le conseiller confrontent les avis clients, la marge et la gestion de l’imprévu.", ""],
  ["06", "Le gagnant", "La dotation est remise. Le gagnant prépare sa prochaine étape ; l’accompagnement des 3 continue.", ""],
];

/* from/to = index 1..6 des chapitres */
const CAST_ARROWS = [
  {
    id: "charles",
    label: "Charles",
    role: "Animateur · dicte la narration toute la vidéo",
    from: 1,
    to: 6,
  },
  {
    id: "candidats",
    label: "Les candidats",
    role: "Présents tout au long des étapes",
    from: 1,
    to: 6,
  },
  {
    id: "parrains",
    label: "Les parrains",
    role: "De la préparation à l’annonce du gagnant",
    from: 2,
    to: 6,
  },
  {
    id: "bp",
    label: "Le conseiller Banque Populaire",
    role: "Du jour J à l’annonce du gagnant",
    from: 3,
    to: 6,
  },
];

export function FgcRun() {
  return (
    <Slide id="deroule">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Déroulé</h1>
      <p className="fgcbp-run-lead">De la rencontre avec les candidats au résultat de l’épreuve.</p>
      <div className="fgcbp-frise">
        <div className="fgcbp-frise-rail" aria-hidden="true" />
        <ol className="fgcbp-frise-steps">
          {CHAPTERS.map(([n, title, text, callout]) => (
            <li className={`fgcbp-frise-step${callout ? " has-callout" : ""}`} key={n}>
              <div className="fgcbp-dot-row">
                <span className="fgcbp-frise-node" data-frise-node>{n}</span>
              </div>
              <h2 className="fgcbp-step-title">{title}</h2>
              <p className="fgcbp-step-copy">{text}</p>
              {callout ? <span className="fgcbp-step-callout">{callout}</span> : null}
            </li>
          ))}
        </ol>
        <div className="fgcbp-cast-block">
          <p className="fgcbp-cast-label">Rôle et présence des protagonistes</p>
          <div className="fgcbp-cast-arrows" aria-label="Rôle et présence des protagonistes">
            {CAST_ARROWS.map((row) => (
              <div
                key={row.id}
                className={`fgcbp-cast-arrow is-${row.id}`}
                style={{ gridColumn: `${row.from} / ${row.to + 1}` }}
              >
                <strong>{row.label}</strong>
                <span>{row.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

export function FgcImprevu() {
  return (
    <Slide id="imprevu">
      <BpLogo className="fgcbp-brand-corner" />
      <ImprevuSlide />
    </Slide>
  );
}

export function FgcDelib() {
  return (
    <Slide id="deliberation">
      <BpLogo className="fgcbp-brand-corner" />
      <DeliberationSlide />
    </Slide>
  );
}

export function FgcBudget() {
  return (
    <Slide id="budget">
      <BpLogo className="fgcbp-brand-corner" />
      <h1 data-section-title>Budget <span className="fgcbp-title-note">(validé)</span></h1>
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
            <h2>Cachet FastGoodCuisine</h2>
            <p>1&nbsp;vidéo YouTube dédiée + 2&nbsp;stories.</p>
          </article>
          <article>
            <p className="amount">{money.production}</p>
            <h2>Production</h2>
          </article>
        </div>
      </div>
      <aside className="fgcbp-prize">
        <p className="amount">{money.prize}</p>
        <div>
          <h2>Dotation envisagée</h2>
          <p>Gérée directement par Banque Populaire pour financer la prochaine étape du gagnant.</p>
        </div>
      </aside>
    </Slide>
  );
}

export function FgcPops() {
  return (
    <Slide id="pops">
      <div className="fgcbp-pops">
        <figure className="fgcbp-pops-photo">
          <Photo photo={PHOTOS.popsHero} style={{ objectPosition: PHOTOS.popsHero.position }} />
        </figure>
        <div className="fgcbp-pops-veil" />
        <BpLogo tone="white" className="fgcbp-brand-corner is-on-dark" />
        <div className="fgcbp-pops-panel">
          <p className="fgcbp-pops-eyebrow">Option d’intégration</p>
          <h1>Pop’s dans la vidéo</h1>
          <p className="fgcbp-pops-lead">
            On peut intégrer Pop’s directement dans le récit : visible sur les menus de chaque candidat et mise en avant sur les comptoirs.
          </p>
          <ul className="fgcbp-pops-points">
            <li>
              <strong>Dans les menus</strong>
              <span>La boisson apparaît comme le choix proposé sur chaque carte.</span>
            </li>
            <li>
              <strong>Sur les comptoirs</strong>
              <span>Présente et identifiable pendant tout le service.</span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}

const NEXT = [
  "Validation / itération sur le concept avec Charles",
  "Cadrage avec Banque Populaire",
  "Pré-production",
];

export function FgcNext() {
  return (
    <Slide id="nextsteps">
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

const PAGES = [FgcCover, FgcContext, FgcConcept, FgcCasting, FgcParrains, FgcLieu, FgcRun, FgcImprevu, FgcDelib, FgcBudget, FgcPops, FgcNext];

export function FgcReview() {
  useEffect(() => {
    document.documentElement.dataset.fgcPrint = "1";
    return () => { delete document.documentElement.dataset.fgcPrint; };
  }, []);
  return (
    <div data-deck="fgc-bp-photo" className="fgc-bp-photo fgc-review">
      {PAGES.map((Page, i) => (
        <div className="fgc-review-page" key={i}><Page /></div>
      ))}
    </div>
  );
}
