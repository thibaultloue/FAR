import { asset } from "../asset.js";
import { FarMark } from "../primitives.jsx";
import "./farRoster.css";

function Slide({ id, children, tone }) {
  return (
    <div data-deck="far-roster" className="far-roster">
      <section className="fr-slide" data-slide-id={id} style={tone}>
        <div className="fr-in">{children}</div>
      </section>
    </div>
  );
}

function Profile({ id, bg, acc, name, photo, chips, desc, stats, videos, collabs = [] }) {
  return (
    <Slide id={id} tone={{ "--cbg": bg, "--cacc": acc }}>
      <div className="fr-profile">
        <figure>
          <img src={asset(photo)} alt={name} />
        </figure>
        <div className="fr-profile-copy">
          <p className="fr-kicker">Nos créateurs · 2026</p>
          <h1>{name}</h1>
          <div className="fr-chips">
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <p className="fr-desc">{desc}</p>
          <div className="fr-stats">
            {stats.map((stat) => (
              <div key={stat.p}>
                <p>{stat.p}</p>
                <strong>{stat.v}</strong>
                {stat.extra.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            ))}
          </div>
          {collabs.length > 0 ? (
            <ul className="fr-collabs">
              {collabs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="fr-videos">
            {videos.map((video) => (
              <article key={video.title}>
                <img src={asset(video.img)} alt="" />
                <p>{video.tag}</p>
                <h2>{video.title}</h2>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

export function FarRosterCover() {
  return (
    <Slide id="cover">
      <div className="fr-cover">
        <FarMark size={88} />
        <p className="fr-kicker">by La Porte</p>
        <h1>Faire grandir les univers créateurs.</h1>
        <p className="fr-lead">
          Accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
        </p>
        <p className="fr-tag">Qui veut aller loin, vient ici.</p>
        <p className="fr-foot">10 ans d’expérience · +50 marques · +100 campagnes</p>
      </div>
    </Slide>
  );
}

const ENTITIES = [
  ["La Porte CYRILmp4", "Développement des chaînes CYRILmp4 et CYRILstudio et des réseaux associés."],
  ["La Porte Production", "Production de vidéos web : documentaires, clips, courts-métrages."],
  ["La Porte Académie", "Formations concrètes élaborées par des professionnels du web."],
  ["La Porte Beta", "Lancement rapide de produits pour la culture web."],
  ["FAR", "L’agence créateurs : développement, stratégie, structure, sur-mesure.", true],
];

export function FarRosterAgency() {
  return (
    <Slide id="agence">
      <div className="fr-page">
        <p className="fr-kicker">L’agence</p>
        <div className="fr-agency-top">
          <div>
            <h1>FAR by La Porte.</h1>
            <p>
              FAR est une agence d’accompagnement de créateurs de contenu. L’accompagnement est à 360°, pour qu’ils se concentrent sur la création.
            </p>
            <p>
              L’agence est née de la vision de Cyril, créateur depuis 15 ans. Après un premier projet d’agence aux côtés d’Amixem, il a créé sa structure pour accompagner les créateurs dans un développement serein et durable.
            </p>
            <p>
              FAR fait partie du Groupe La Porte, également fondé par Cyril : un écosystème qui fournit les services et produits de la culture web de demain.
            </p>
          </div>
          <img src={asset("/havas/cyril-portrait.jpg")} alt="Cyril" />
        </div>
        <p className="fr-group">Groupe La Porte <span>fondé par Cyril</span></p>
        <div className="fr-entities">
          {ENTITIES.map(([name, body, highlight]) => (
            <article key={name} className={highlight ? "is-on" : ""}>
              <h2>{name}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </Slide>
  );
}

const ROSTER = [
  ["/fgc.webp", "FastGoodCuisine", "#A31016", "#FFC94D", [["YouTube", "8,9M"], ["TikTok", "2,6M"], ["Instagram", "2,3M"]]],
  ["/cyrilmp4.webp", "CYRILmp4", "#0F3B58", "#6ECBFF", [["YouTube", "5,23M"], ["YouTube Studio", "1,15M"], ["Instagram", "1,4M"]]],
  ["/leroutin.webp", "Le Routin", "#8C4A17", "#FFC94D", [["YouTube", "613k"], ["TikTok", "359k"], ["Instagram", "187k"]]],
  ["/toinelag.webp", "Toinelag", "#1A1A1A", "#FFE14A", [["YouTube", "1,97M"], ["YT Gaming", "869k"], ["YT Plus", "355k"], ["Instagram", "23k"]]],
  ["/teeqzy.webp", "Teeqzy", "#1E3FA8", "#8FD3FF", [["YouTube", "2,02M"], ["TikTok", "110k"]]],
  ["/bek1ng.webp", "Bek1ng", "#23303B", "#9FE870", [["Twitch", "216k"], ["TikTok", "494k"]]],
];

export function FarRosterIndex() {
  return (
    <Slide id="roster">
      <div className="fr-page">
        <p className="fr-kicker">Roster</p>
        <h1>Nos créateurs.</h1>
        <p className="fr-lead">Un roster à taille humaine : moins de créateurs, plus de présence, plus de suivi, plus de qualité d’accompagnement.</p>
        <div className="fr-roster">
          {ROSTER.map(([photo, name, bg, acc, stats]) => (
            <article key={name} style={{ "--cbg": bg, "--cacc": acc }}>
              <img src={asset(photo)} alt="" />
              <div>
                <h2>{name}</h2>
                {stats.map(([platform, value]) => (
                  <p key={platform}>
                    <span>{platform}</span>
                    <strong>{value}</strong>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function FarRosterFgc() {
  return (
    <Profile
      id="fgc"
      bg="#A31016"
      acc="#FFC94D"
      name="FastGoodCuisine"
      photo="/fgc.webp"
      chips={["Food", "Divertissement", "Formats courts"]}
      desc="FastGoodCuisine, c’est le cocktail explosif entre food, fun et format court. Avec son énergie débordante, ce créateur ultra-gourmand régale une large communauté grâce à des vidéos créatives mêlant cuisine rapide, humour croustillant et concepts décalés."
      stats={[
        { p: "YouTube", v: "8,9M", extra: ["abonnés", "Moyenne de vues : 2,7M · Shorts : 3,9M"] },
        { p: "TikTok", v: "2,6M", extra: ["abonnés", "Moyenne de vues : 1,2M"] },
        { p: "Instagram", v: "2,3M", extra: ["abonnés", "Moyenne de vues Reels : 650k"] },
      ]}
      videos={[
        { img: "/havas/fgc-thumb1.jpg", tag: "Dégustation", title: "On Mange 30 Fast-Foods avec Valouzz (Mauvaise Idée)" },
        { img: "/havas/fgc-thumb2.jpg", tag: "Divertissement", title: "Le Dernier Qui Quitte La Table Gagne 10 000 €" },
        { img: "/havas/fgc-thumb3.jpg", tag: "Test / Hack", title: "Je Teste 25 Food Hack TikTok" },
      ]}
      collabs={[
        "Collaborations sur-mesure, intégrées à ses concepts éditoriaux (dont Le dernier qui quitte la table).",
        "Co-branding puissant, en synergie avec ses marques Pepe Chicken et Pop’s.",
        "Nouveaux formats à forte valeur ajoutée autour de l’univers de la cuisine.",
      ]}
    />
  );
}

export function FarRosterCyril() {
  return (
    <Profile
      id="cyrilmp4"
      bg="#0F3B58"
      acc="#6ECBFF"
      name="CYRILmp4"
      photo="/cyrilmp4.webp"
      chips={["Exploration", "Voyages", "Docu / vlog"]}
      desc="Cyril propose sur sa chaîne des contenus très diversifiés mélangeant exploration, voyages, divertissement et gaming. Passionné et engagé, il partage ses passions avec sa communauté depuis 15 ans."
      stats={[
        { p: "YouTube", v: "5,23M", extra: ["abonnés", "Moyenne de vues : 1,2M"] },
        { p: "Instagram", v: "1,4M", extra: ["abonnés", "Moyenne de vues Reels : 600k"] },
      ]}
      videos={[
        { img: "/havas/mp4-thumb1.jpg", tag: "Docu / vlog", title: "100H dans un lac radioactif créé par une bombe nucléaire !" },
        { img: "/havas/mp4-thumb2.jpg", tag: "Docu / vlog", title: "Je teste les friteries notées 1 étoile" },
        { img: "/havas/mp4-thumb3.jpg", tag: "Docu / vlog", title: "48h dans une ville sans loi" },
      ]}
      collabs={[
        "Concepts dédiés et expériences insolites de luxe.",
        "Partenariats emblématiques annuels : sport, montres, automobile, matériel de voyage, téléphonie.",
        "Collaborations autour de ses marques propres, Tryhard et La Porte Académie.",
      ]}
    />
  );
}

export function FarRosterStudio() {
  return (
    <Profile
      id="cyrilstudio"
      bg="#37246B"
      acc="#B49CFF"
      name="CYRILstudio"
      photo="/havas/cyrilstudio-avatar.jpg"
      chips={["Gaming", "Tests", "Découvertes"]}
      desc="Avec près de 15 ans de passion partagée, Cyril embarque dans un univers 100 % jeux vidéo : tests, découvertes, défis et fun. Il partage ses coups de cœur et ses aventures gaming avec sa communauté."
      stats={[{ p: "YouTube", v: "1,15M", extra: ["abonnés", "Moyenne de vues : 390k"] }]}
      videos={[
        { img: "/havas/studio-thumb1.jpg", tag: "Gaming", title: "J’explore les jeux abandonnés de notre enfance !" },
        { img: "/havas/studio-thumb2.jpg", tag: "Storytelling", title: "La chute de Medal Of Honor !" },
        { img: "/havas/studio-thumb3.jpg", tag: "Test d’objets", title: "Je teste les pires arnaques gaming Temu !" },
      ]}
      collabs={[
        "Intégrations et concepts dédiés au sein de ses formats gaming (dont « La chute de »).",
        "Partenariats emblématiques annuels avec les acteurs du gaming et de la tech.",
      ]}
    />
  );
}

export function FarRosterToinelag() {
  return (
    <Profile
      id="toinelag"
      bg="#1A1A1A"
      acc="#FFE14A"
      name="Toinelag"
      photo="/toinelag.webp"
      chips={["Construction", "Défis", "Divertissement"]}
      desc="Youtubeur divertissement aux multiples facettes, Toinelag anime une communauté engagée autour de vidéos funs et originales : défis, humour et gaming. Son but : divertir et surprendre son audience à chaque vidéo."
      stats={[
        { p: "YouTube", v: "1,97M", extra: ["abonnés", "Moyenne de vues : 1,6M"] },
        { p: "Instagram", v: "23k", extra: ["abonnés", "Moyenne de vues Story : 10k"] },
      ]}
      videos={[
        { img: "/havas/toinelag-thumb1.jpg", tag: "Construction", title: "Je Construis une Pièce Secrète dans un Trampoline Park" },
        { img: "/havas/toinelag-thumb2.jpg", tag: "Jeux", title: "Bonbon VS Vrai Vie Pendant 24H !" },
        { img: "/havas/toinelag-thumb3.jpg", tag: "Divertissement", title: "Énorme Bataille De Nerf !" },
      ]}
      collabs={[
        "Priorisation de concepts co-construits main dans la main avec les marques : cohérence, authenticité, performance.",
        "Accélération sur les formats drive-to-store, véritables leviers business à impact direct en point de vente.",
      ]}
    />
  );
}

export function FarRosterToinelagPlus() {
  return (
    <Profile
      id="toinelag-plus"
      bg="#0E4D30"
      acc="#7BE495"
      name="Toinelag Gaming / +"
      photo="/havas/toinelaggaming-avatar.jpg"
      chips={["Gaming", "Brainrot", "Défis"]}
      desc="Les chaînes secondaires de Toinelag prolongent son univers : gaming, formats courts et concepts brainrot qui cartonnent auprès d’une audience jeune."
      stats={[
        { p: "YouTube Gaming", v: "869k", extra: ["abonnés", "Moyenne de vues : 2,0M"] },
        { p: "YouTube +", v: "355k", extra: ["abonnés", "Moyenne de vues : 3,0M"] },
      ]}
      videos={[
        { img: "/havas/tgaming-thumb1.jpg", tag: "Brainrot", title: "On mange des Brainrot dans la vraie vie" },
        { img: "/havas/tgaming-thumb2.jpg", tag: "Gaming", title: "Je ressens la douleur des accidents dans la vraie vie" },
        { img: "/havas/tgaming-thumb3.jpg", tag: "Défi", title: "Le meilleur pancake gagne" },
      ]}
      collabs={[
        "Concepts co-construits, dans la continuité de la chaîne principale.",
        "Formats courts pour toucher une audience jeune.",
      ]}
    />
  );
}

export function FarRosterRoutin() {
  return (
    <Profile
      id="routin"
      bg="#8C4A17"
      acc="#FFC94D"
      name="Le Routin"
      photo="/leroutin.webp"
      chips={["Street food", "Tests", "Bonne bouffe"]}
      desc="Le Routin explore la food du quotidien avec un regard curieux et accessible : street food, nouveautés de supermarché, tests et bonnes adresses. Un ton simple et authentique qui fédère une communauté fidèle autour de la bonne bouffe."
      stats={[
        { p: "YouTube", v: "613k", extra: ["abonnés", "Moyenne de vues : 500k"] },
        { p: "TikTok", v: "359k", extra: ["abonnés", "Moyenne de vues : 268k"] },
        { p: "Instagram", v: "187k", extra: ["abonnés", "Moyenne de vues Reels : 216k · Story : 45k"] },
      ]}
      videos={[
        { img: "/havas/routin-thumb1.jpg", tag: "Fast food", title: "Je teste le street food la moins chère de Paris" },
        { img: "/havas/routin-thumb2.jpg", tag: "Snack et supermarchés", title: "Je teste les nouveautés food au supermarché" },
        { img: "/havas/routin-thumb3.jpg", tag: "Bonne bouffe et recettes", title: "Je teste les plats préférés des youtubeurs" },
      ]}
      collabs={[
        "Formats courts et longs sur une même campagne.",
        "Recettes accessibles et concepts insolites.",
        "Collaborations hors food, marque blanche et co-productions.",
      ]}
    />
  );
}

export function FarRosterBek() {
  return (
    <Profile
      id="bek1ng"
      bg="#23303B"
      acc="#9FE870"
      name="Bek1ng"
      photo="/bek1ng.webp"
      chips={["Call of Duty", "Live Twitch", "TikTok"]}
      desc="Référence de Call of Duty Warzone grâce à ses vidéos virales sur TikTok, il cumule les spectateurs en réalisant des actions de grande classe tous les jours sur Twitch."
      stats={[
        { p: "Twitch", v: "216k", extra: ["followers", "Average viewers : 480"] },
        { p: "TikTok", v: "494k", extra: ["abonnés", "Moyenne de vues : 160k"] },
      ]}
      videos={[
        { img: "/havas/bek1ng-thumb1.jpg", tag: "Performance en live", title: "Ce streamer Italien et sa team vont regretter ce qu’ils m’ont fait" },
        { img: "/havas/bek1ng-thumb2.jpg", tag: "Défi inédit", title: "20 filles VS 20 garçons sur Rebirth Island" },
        { img: "/havas/bek1ng-thumb3.jpg", tag: "Devine le niveau", title: "Guess my rank des viewers sur Warzone" },
      ]}
    />
  );
}

export function FarRosterTeeqzy() {
  return (
    <Profile
      id="teeqzy"
      bg="#1E3FA8"
      acc="#8FD3FF"
      name="Teeqzy"
      photo="/teeqzy.webp"
      chips={["Fortnite", "Vidéo quotidienne", "Compétitif"]}
      desc="L’un des meilleurs joueurs du monde de Fortnite s’est reconverti en créateur de contenu, référence de ce jeu depuis 10 ans. Avec une vidéo quotidienne, ses spectateurs ont un rendez-vous régulier."
      stats={[
        { p: "YouTube", v: "2,02M", extra: ["abonnés", "Moyenne de vues : 270k"] },
        { p: "TikTok", v: "110k", extra: ["abonnés", "Moyenne de vues : 150k"] },
      ]}
      videos={[
        { img: "/havas/teeqzy-thumb1.jpg", tag: "Test de périphériques", title: "Je me suis Entraîné à la manette pendant 1 Mois... Voici le résultat" },
        { img: "/havas/teeqzy-thumb2.jpg", tag: "Défi impossible", title: "Faire top 1 en utilisant que des armes mythiques" },
        { img: "/havas/teeqzy-thumb3.jpg", tag: "Partie commentée", title: "On monte unreal sur cette game de fou" },
      ]}
    />
  );
}

export function FarRosterClose() {
  return (
    <Slide id="merci">
      <div className="fr-cover">
        <FarMark size={88} />
        <h1>Merci.</h1>
        <p className="fr-tag">Qui veut aller loin, vient ici.</p>
      </div>
    </Slide>
  );
}
