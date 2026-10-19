import { asset } from "../asset.js";
import "./fgcPicard.css";

function Slide({ id, children, ink = false }) {
  return (
    <div data-deck="fgc-picard" className="fgc-picard">
      <section className={`fgcp-slide${ink ? " is-ink" : ""}`} data-fgc-slide data-slide-id={id}>
        <div className="fgcp-in">{children}</div>
      </section>
    </div>
  );
}

function Lockup({ light = false }) {
  return (
    <div className={`fgcp-lockup${light ? " is-light" : ""}`}>
      <span>PICARD</span>
      <i aria-hidden="true" />
      <img src={asset("/fgc.webp")} alt="" />
      <b>FASTGOODCUISINE</b>
    </div>
  );
}

function Pot({ onBlue = false }) {
  return (
    <div className={`fgcp-pot${onBlue ? " is-on-blue" : ""}`} aria-hidden="true">
      <div className="fgcp-pot-lid" />
      <div className="fgcp-pot-body">
        Picard
        <br />
        × FGC
      </div>
    </div>
  );
}

export function FgcPicardCover() {
  return (
    <Slide id="cover">
      <div className="fgcp-cover">
        <div className="fgcp-cover-copy">
          <Lockup />
          <div>
            <p className="fgcp-kicker">Proposition de collaboration produit</p>
            <h1>
              Créer ensemble
              <br />
              une glace gourmande.
            </h1>
            <p className="fgcp-lead">Distribuée chez Picard et chez Pepe Chicken.</p>
          </div>
          <p className="fgcp-foot">Picard × FastGoodCuisine</p>
        </div>
        <div className="fgcp-cover-panel">
          <Pot onBlue />
        </div>
      </div>
    </Slide>
  );
}

const AUDIENCE = [
  ["8,9M", "YouTube"],
  ["2,3M", "Instagram"],
  ["2,6M", "TikTok"],
  ["3,2 Md", "vues cumulées"],
];

export function FgcPicardCreator() {
  return (
    <Slide id="createur">
      <div className="fgcp-creator">
        <figure>
          <img src={asset("/fgc.webp")} alt="FastGoodCuisine" />
        </figure>
        <div className="fgcp-creator-copy">
          <Lockup />
          <p className="fgcp-kicker">01 · Présentation</p>
          <h1>FastGoodCuisine.</h1>
          <p className="fgcp-intro">Créateur food n°1 en France, et entrepreneur avec Pepe Chicken.</p>
          <div className="fgcp-card">
            <p className="fgcp-label">Le créateur</p>
            <p>
              FastGoodCuisine, c’est Charles Gilles-Compagnon. Depuis plus de 10 ans, il anime la plus grosse chaîne food de France autour de formats simples et très regardés : tests, hacks, défis et dégustations.
            </p>
            <p className="is-muted">
              Son audience est large, engagée, et habituée aux lancements produit. Quand il met un produit en avant, ça se voit et ça se partage.
            </p>
          </div>
          <div className="fgcp-stats">
            {AUDIENCE.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="fgcp-pepe">
            <span className="fgcp-pepe-mark">
              <img src={asset("/pepe-chicken-logo.png")} alt="Pepe Chicken" />
            </span>
            <div>
              <h2>Pepe Chicken</h2>
              <p>Dark kitchens · Deliveroo · Uber Eats</p>
              <p className="is-body">
                Il a aussi lancé Pepe Chicken, un réseau de dark kitchens en livraison. Un vrai business food, avec un moment dessert naturel en fin de commande.
              </p>
            </div>
            <div className="fgcp-pepe-stats">
              <div>
                <strong>125</strong>
                <span>restaurants</span>
              </div>
              <div>
                <strong>~90k</strong>
                <span>commandes / semaine</span>
              </div>
            </div>
          </div>
          <p className="fgcp-source">Source : données internes FastGoodCuisine.</p>
        </div>
      </div>
    </Slide>
  );
}

const PRODUCT = [
  "Recette accessible et immédiatement désirable.",
  "Textures généreuses et gros morceaux.",
  "Générosité proche des références américaines les plus gourmandes.",
  "Un élément signature pour marquer clairement le produit.",
];

export function FgcPicardProduct() {
  return (
    <Slide id="produit">
      <div className="fgcp-product">
        <div className="fgcp-product-copy">
          <Lockup />
          <p className="fgcp-kicker">02 · Produit</p>
          <h1>Une glace volontairement très gourmande.</h1>
          <p className="fgcp-intro">Co-développée avec Picard.</p>
          <ul>
            {PRODUCT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="fgcp-note">Nom, parfum et recette précise à définir ensemble.</p>
        </div>
        <div className="fgcp-product-panel">
          <Pot />
        </div>
      </div>
    </Slide>
  );
}

export function FgcPicardDistribution() {
  return (
    <Slide id="distribution">
      <div className="fgcp-page">
        <Lockup />
        <p className="fgcp-kicker">03 · Distribution</p>
        <h1>Distribuée chez Picard et chez Pepe Chicken.</h1>
        <div className="fgcp-y">
          <p className="fgcp-y-root">Glace Picard × FastGoodCuisine</p>
          <div className="fgcp-y-stem" aria-hidden="true" />
          <div className="fgcp-y-bar" aria-hidden="true" />
          <div className="fgcp-y-cols">
            <article>
              <p className="fgcp-label is-blue">Picard</p>
              <h2>À domicile</h2>
              <strong>1 200+</strong>
              <span>magasins en France</span>
            </article>
            <article>
              <p className="fgcp-label is-red">Pepe Chicken</p>
              <h2>En livraison</h2>
              <div className="fgcp-split">
                <div>
                  <strong>125</strong>
                  <span>dark kitchens</span>
                </div>
                <div>
                  <strong>~360 000</strong>
                  <span>commandes / mois</span>
                </div>
              </div>
              <p className="fgcp-channels">Deliveroo · Uber Eats</p>
            </article>
          </div>
          <p className="fgcp-source">Sources : Picard (réseau France) · données internes FastGoodCuisine (Pepe Chicken).</p>
        </div>
      </div>
    </Slide>
  );
}

const CHANNELS = [
  ["Amplification FastGoodCuisine", "Vidéo YouTube, reveal, contenus courts et relais sociaux.", "is-red"],
  ["Dispositif d’influence", "Créateurs food et lifestyle autour du lancement.", ""],
  ["Plan média Picard", "À définir selon les priorités business.", ""],
  ["Canaux partenaires", "Visibilité Picard et écosystème Pepe Chicken.", "is-red"],
];

export function FgcPicardAmplification() {
  return (
    <Slide id="amplification">
      <div className="fgcp-page">
        <Lockup />
        <p className="fgcp-kicker">04 · Amplification</p>
        <h1>Faire connaître le produit au moment du lancement.</h1>
        <div className="fgcp-amp">
          {CHANNELS.map(([title, body, tone]) => (
            <article key={title} className={tone}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
          <div className="fgcp-amp-core">
            <Pot />
          </div>
        </div>
      </div>
    </Slide>
  );
}

const STEPS = [
  ["01", "Valider le principe", "Accord sur la co-création, les modalités et la distribution Picard + Pepe Chicken."],
  ["02", "Définir le brief produit", "Gourmandise, familles de saveurs, textures, contraintes des 2 canaux."],
  ["03", "Développer la/les recette(s)", "Prototypes, dégustation, sélection d’une piste."],
  ["04", "Préparer le lancement", "Packaging, contenus, disponibilité Picard et intégration Pepe Chicken."],
  ["05", "Lancement", "Avril / mai 2027"],
];

export function FgcPicardNext() {
  return (
    <Slide id="next-steps">
      <div className="fgcp-page">
        <Lockup />
        <p className="fgcp-kicker">05 · Next steps</p>
        <h1>Pour lancer le développement.</h1>
        <ol className="fgcp-steps">
          {STEPS.map(([n, title, body]) => (
            <li key={n}>
              <span>{n}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
