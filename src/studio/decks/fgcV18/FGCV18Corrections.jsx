import "./FGCV18Corrections.css";

function Frame({ title, intro, className = "", children }) {
  return (
    <div className={`fgc18-stage ${className}`} aria-label={title}>
      <header className="fgc18-header">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      {children}
    </div>
  );
}

export function RolesSlide() {
  return (
    <Frame
      title="FGC × parrains × Banque Populaire"
      intro="Les parrains préparent les candidats. Charles suit toute l’aventure. Le conseiller intervient le jour J et au jury."
      className="fgc18-roles"
    >
      <div className="fgc18-role-headings">
        <div><span>En amont</span><h2>3 binômes de préparation</h2></div>
        <div><span>Pendant le service</span><h2>Les candidats aux commandes</h2></div>
        <div><span>À la délibération</span><h2>Charles et le conseiller</h2></div>
      </div>
      <div className="fgc18-diagram">
        <svg className="fgc18-connectors" viewBox="0 0 1232 196" aria-hidden="true">
          <defs>
            <marker id="fgc18-end" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0 0 L6 3.5 L0 7" fill="none" stroke="currentColor" strokeWidth="1" />
            </marker>
          </defs>
          {[36, 98, 160].map((y) => <path key={y} d={`M385 ${y} H460`} markerEnd="url(#fgc18-end)" />)}
          <path d="M745 36 H802 V98 H866 M745 98 H866 M745 160 H802 V98" />
        </svg>
        <div className="fgc18-pairs">
          {["01", "02", "03"].map((n) => (
            <div key={n} data-sponsor-pair>
              <span>Parrain {n}</span>
              <b aria-hidden="true">→</b>
              <span>Candidat {n}</span>
            </div>
          ))}
        </div>
        <div className="fgc18-counters">
          {["01", "02", "03"].map((n) => <div key={n}>Comptoir {n}</div>)}
        </div>
        <div className="fgc18-jury">
          <strong>Charles</strong>
          <span>+</span>
          <strong>Le conseiller</strong>
          <p>Jury de l’épreuve</p>
        </div>
      </div>
      <div className="fgc18-role-copy">
        <p>1 chef ou entrepreneur proche de Charles par candidat. Ensemble, ils préparent la carte, les prix, les achats et l’organisation.</p>
        <p>Charles suit les 3 comptoirs. Le conseiller rencontre les candidats et observe leur réaction à la commande surprise.</p>
        <p>Charles et le conseiller évaluent la gestion de l’imprévu, examinent le score final et annoncent le gagnant.</p>
      </div>
      <p className="fgc18-role-conclusion"><span aria-hidden="true">—</span> Banque Populaire finance les moyens de départ et accompagne la suite des 3 projets.</p>
    </Frame>
  );
}

export function ImprevuSlide() {
  const choices = [
    { label: "01 · S’organiser", title: "Répartir les tâches", body: "Qui prépare la commande de groupe ? Qui poursuit le service ?" },
    { label: "02 · Communiquer", title: "Annoncer l’attente", body: "Expliquer un délai réaliste et tenir les clients informés." },
    { label: "03 · Faire le bilan", title: "Remettre la commande", body: "Charles et le conseiller observent les décisions et le résultat." },
  ];
  return (
    <Frame
      title="L’imprévu"
      intro="Une commande de groupe ultra spécifique arrive en plein service : ingrédients en plus et en moins, allergies à respecter. La chaîne de production se complexifie d’un coup."
      className="fgc18-imprevu"
    >
      <div className="fgc18-figures">
        <div className="fgc18-figure">
          <strong>12</strong>
          <div>
            <h2>repas supplémentaires<br />par comptoir</h2>
            <p>La même demande contrainte pour les 3 candidats.</p>
          </div>
        </div>
        <div className="fgc18-figure">
          <strong>20</strong>
          <div>
            <h2>min pour<br />les préparer</h2>
            <p>Un délai à gérer avec l’équipe.</p>
          </div>
        </div>
      </div>
      <div className="fgc18-service"><span aria-hidden="true">→</span><h2>Les commandes habituelles continuent.</h2></div>
      <div className="fgc18-decisions">
        {choices.map((c) => (
          <article key={c.label}>
            <span>{c.label}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
      <div className="fgc18-imprevu-score">
        <strong>20 points</strong>
        <p>Le jury évalue l’organisation, les décisions et la communication.</p>
      </div>
    </Frame>
  );
}

export function DeliberationSlide() {
  return (
    <Frame
      title="Délibération"
      intro="Les clients évaluent leur expérience. FastGoodCuisine, les parrains et Banque Populaire croisent ensuite les résultats."
      className="fgc18-deliberation"
    >
      <p className="fgc18-proposed">Barème proposé</p>
      <div className="fgc18-scoregrid">
        <article className="fgc18-client-score">
          <div className="fgc18-client-heading">
            <div><strong>60</strong><span>points</span></div>
            <h2>Les avis clients</h2>
          </div>
          <p className="fgc18-client-intro">Après leur repas, les clients notent chacun des 3 critères sur 5.</p>
          <div className="fgc18-rating-form" aria-label="Exemple de formulaire non renseigné">
            {["Le plat", "Le service", "Le rapport qualité-prix"].map((label) => (
              <div className="fgc18-rating-row" key={label}>
                <strong>{label}</strong>
                <div aria-label="Échelle de 1 à 5">{[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}</div>
              </div>
            ))}
          </div>
          <p className="fgc18-average">La moyenne des avis de chaque comptoir compte dans le résultat.</p>
        </article>
        <div className="fgc18-secondary-scores">
          <article>
            <div>
              <strong>20<span>points</span></strong>
              <h2>Le résultat<br />économique</h2>
            </div>
            <p>La marge du service est calculée selon les mêmes règles pour les 3 candidats.</p>
          </article>
          <article className="fgc18-event-score">
            <div>
              <strong>20<span>points</span></strong>
              <h2>La gestion<br />de l’imprévu</h2>
            </div>
            <p>Charles et le conseiller évaluent les décisions, l’organisation et la communication.</p>
          </article>
        </div>
      </div>
      <div className="fgc18-verdict">
        <div className="fgc18-partners" aria-label="FastGoodCuisine, les parrains et Banque Populaire">
          <span>FastGoodCuisine</span>
          <i aria-hidden="true">×</i>
          <span>Parrains</span>
          <i aria-hidden="true">×</i>
          <span>Banque Populaire</span>
        </div>
        <div className="fgc18-verdict-grid">
          <strong>1 gagnant remporte la dotation mise en jeu.</strong>
          <p>Banque Populaire poursuit l’accompagnement des 3 projets pour la suite.</p>
        </div>
      </div>
    </Frame>
  );
}
