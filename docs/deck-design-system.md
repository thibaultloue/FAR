# FAR Studio — système de design des prochains decks

Version : **far-studio-v1**. S’applique aux **nouveaux** decks. Les decks déjà publiés (lecteur `Pres` dans `App.jsx`) ne sont pas migrés.

## Ce qui a été examiné

- Stack réelle : `far-decks/` (Vite, React 18, Framer Motion, hash `#deck/slide`, Gate, catalogue `ALL` + `META`).
- Lecteur historique : une slide à la fois, padding variable, souvent du scroll, contrôles superposés. Cadre papier 16:9 déjà présent sur Grand JD / Positionnement V3, mais pas comme grammaire commune.
- Typo historique : Figtree + JetBrains Mono (Bricolage Grotesque déjà chargé).
- Assets : logos et photos dans `far-decks/public/` (FAR, créateurs, campagnes).
- **Electra** : aucune source ni capture dans ce workspace. La référence utilisée est le brief (cadre 16:9, hiérarchie, photos généreuses, diagrammes, navigation hors composition). Clash Grotesk / Satoshi ne sont pas dans le projet ; **Bricolage Grotesk** (titres) et **Figtree** (textes) les remplacent, déjà autorisés via Google Fonts.

Trois niveaux :

1. Interface FAR (accueil, Gate, dossiers) — inchangée.
2. Système de slides Studio (`src/studio/`).
3. Thème du projet (ivoire / encre / overrides d’accent, photos, logos).

## Format

- Une slide active dans un cadre **16:9 strict**.
- Canevas de référence **1360 × 765** (`--fs-u = hauteur / 765`). Les tailles suivent le cadre, pas la fenêtre.
- Le cadre ne change pas d’une slide à l’autre. Sommaire et dialogues sont des calques : ils ne rétrécissent pas la composition.
- Contrôles à l’extérieur (header + dock). Classe `far-chrome` pour l’export live.
- Hash stable : `#id/cover` (l’index numérique `#id/0` reste accepté).
- Mobile : aperçu 16:9 + commandes + bouton Agrandir. Zoom navigateur conservé.

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/studio/tokens.css` | Tokens isolés (`.far-studio`) |
| `src/studio/themes.js` | `ivory`, `ink`, overrides |
| `src/studio/StudioReader.jsx` | Lecteur |
| `src/studio/compositions.jsx` | Cover, constat, concept, créateur, cas, mécanique, budget, social, conclusion |
| `src/studio/diagrams.jsx` | Barres, flux, frise — données injectées |
| `src/studio/createStudioDeck.js` | Fabrique + ids uniques |
| `src/studio/starter.js` | Gabarit du prochain deck |
| `src/studio/registry.js` | Enregistrement. Galerie **dev only** |
| `src/studio/galleryDeck.js` | Galerie de référence |

## Créer le prochain deck

1. Copier `src/studio/starter.js` vers `src/studio/decks/<id>.js`.
2. Remplir contenu, assets (`public/`), sources datées. **Aucun chiffre inventé.**
3. Habiller le thème (`theme: "ivory" | "ink"`, `themeOverrides.accent` pour la marque).
4. Enregistrer : `registerStudioDeck(monDeck)` dans `registry.js` (hors `import.meta.env.DEV` si le deck est public).
5. Ne pas ajouter le deck dans `ALL` / `Pres`. Le lecteur Studio se branche via `getStudioDeck`.
6. Vérifier à 1440×900 et 1280×720, polices chargées, puis mobile. Export PDF live ensuite si le deck est au catalogue.

Accès galerie en local : `npm run dev` → `#studiogallery/cover`. Absente du build de production.

Captures de contrôle : `exports/studio-gallery/` (`npm run capture-studio`).

## Contrôles de composition

- Titre = idée ; corps = explication ; visuel = preuve ou mise en situation.
- Pas de 3 cartes identiques par défaut, pas de texte coupé, pas d’argument relégué en légende 12 px.
- Budget : une seule source de données, totaux calculés (`sumValues`).
- Notes privées : jamais dans `public/` ni dans le bundle du deck public.

## Decks existants

Ne pas les réécrire « pour le Studio ». Migration uniquement sur demande explicite.
