# CYRILmp4 × Banques — notes de préparation (privé)

Hors build public. Ne pas importer dans le deck client. Ne pas copier dans `public/`.

Consulté le 14 septembre 2026 (dates de consultation ≠ dates de mesure).

## 1. Slide 05 audiences — absente

- YouTube Studio (âge, géographie, spectateurs uniques, période comparable) : `null`
- Instagram Insights : `null`
- V4.1 : 11 slides partageables (deux pages cas). Ne pas afficher de page « XX % ».
- Les compteurs publics MP4 / Studio / Instagram ne remplacent pas la qualification des publics.

## 2. Inventaire visuels (affectation unique)

| Fichier | Dimensions | Droits connus | Slide |
|---|---|---|---|
| fondateur.webp | 400×400 | Page officielle Groupe La Porte | cover |
| grand-rex.webp | 1126×1110 | Page officielle groupe | parcours |
| yt-bVk4i_PYxug.jpg | 1280×720 | Miniature YouTube liée | mp4 |
| studio-steam.webp | 1280×720 | Page officielle CYRILmp4 / Studio | studio |
| havas/cyril-portrait.jpg | 959×1200 | Roster FAR déjà publié | social |
| tournage.webp | 1280×1600 | Page officielle groupe | group |
| tryhard-keyboard.webp | 1351×1189 | Page officielle La Porte Beta | group |
| academie-banner.webp | 1600×1067 | Page officielle Académie | group |
| yt-ZKlLgxLz_qI.jpg | 1280×720 | Miniature YouTube liée | cas-odoo (miniature film, pas photogramme d’intégration) |
| yt-myElp75-ZIc.jpg | 1280×720 | Miniature YouTube liée | cas-deux Shopify (miniature film, pas extrait de séquence) |
| grandjd/cyril-adopte-thumb.jpg | 1280×720 | Miniature du deck Grand JD × FAR | variante Adopte (`far_cyril_cases=adopte`) |

Non utilisés dans le parcours visible : garmin-cyril-photo.png (montagne V2), garmin thumbs clickbait, indice.jpg, train/wildlife, Deblock.

Portrait officiel 400×400 : définition basse pour un export 2×. Priorité repository / original plus large si FAR le fournit.

Pas de capture Instagram autorisée : photo de tournage roster, pas un faux post.

Pas de capture LinkedIn : traitement typographique.

Logo Odoo absent du repo → nom en typographie.

Bannière cartoon CYRILstudio non utilisée (illustration gaming, hors brief).

## 3. Compteurs publics

| Métrique | Valeur | Source |
|---|---|---|
| CYRILmp4 abonnés | 5 M+ | S1 |
| CYRILmp4 vues | 1 Md+ | S1 |
| CYRILmp4 vidéos | 1 000+ | Brief V4.2 / maquette ; date de mesure non précisée |
| CYRILstudio abonnés | 1 M+ | S1 |
| CYRILstudio vues | 100 M+ | S1 |
| CYRILstudio vidéos | 250+ | Brief V4.2 / maquette ; date de mesure non précisée |
| Instagram | 1,3 M+ | S1 uniquement (ne pas fusionner avec l’autre compteur groupe) |
| Steam 2024 | 600 k+ | S1, chaîne vérifiée CYRILstudio (`HlEZiqQNOGg`) |
| Afrique 2025 | 1,6 M+ | S1, chaîne CYRILmp4 |
| Odoo 2023 | 1,4 M+ | S1 |
| Shopify 2024 | 1,3 M+ | S1 |
| Adopte (vidéo restaurants de stars) | 905 k | Grand JD × FAR V2 p. 8 ; pas de « + », pas une mesure actualisée |

## 4. Cas V4.1 (architecture)

Parcours actif : 11 slides — cover → … → group → **cas-odoo** → **cas-deux** → interest → collaborer → close.

- Défaut : Odoo + Shopify.
- Variante Adopte : remplace Shopify (`sectorCase: "adopte"` / `sessionStorage.far_cyril_cases = "adopte"`). Pas une 12e slide.
- Deblock : `sectorCase: "deblock"`, hors défaut.

### Preuves visuelles absentes — ne pas mockuper

- **Odoo** : aucun photogramme du site de notation ni de la séquence où le service apparaît. La miniature hôtels n’est pas cette pièce.
- **Shopify** : aucun extrait de la séquence sponsorisée ni capture de description YouTube. La miniature restaurants n’est pas cette pièce.
- **Adopte** : miniature repository (sans overlay play). Extrait de description sourcé Grand JD p. 8 (code `CYRILMP4`). Lien YouTube `lIoROwhuoBM` vérifié oEmbed (titre + chaîne CYRILmp4) le 14 sept. 2026 ; absent des annotations du PDF V4.1.

### Arbitrage non validé

Recommandation de travail du brief : duo principal Odoo + Adopte. **Non confirmé par l’utilisateur.** Conserver Odoo / Shopify jusqu’à décision. Adopte reste une variante remplaçante.

## 5. Cas Deblock

- Conservé via `deblockCase()` + `sectorCase: "deblock"`.
- Parcours par défaut : Odoo + Shopify.
- Avant bascule : confirmer statut, engagements sectoriels, pertinence destinataire.
- Ne pas présenter Deblock comme une banque.

## 6. Droits / pipeline

- Images Webflow La Porte : usage à confirmer juridiquement (téléchargement technique ≠ autorisation commerciale).
- Miniatures YouTube : aperçus liés aux URLs vérifiées.
- PDF : capture live raster (WebKit, 1920×1080, scale 2). Pas de PDF vectoriel. Liens cliquables du lecteur absents du PDF.

## 7. Périmètre / contact

- Contact : Thibault Loué · thibault.loue@far-agence.com
- Disponibilités, exclusivité, droits, budget, calendrier : non validés → absents des slides.
- Accent V3 : jaune FAR `#FFAA00` (thème Studio), plus de liseré moutarde `#C9A24B`.

## Vérifications ouvertes

1. Analytics natifs âge / géo / spectateurs uniques
2. Original portrait fondateur > 400 px
3. Capture Instagram / LinkedIn autorisée
4. Statut commercial Deblock
5. Droits d’usage des visuels site La Porte hors pages web
6. Validation FAR avant envoi client
7. Photogramme d’intégration Odoo (site / séquence)
8. Extrait séquence ou description Shopify, sourcé
9. Choix de cas Odoo+Shopify vs Odoo+Adopte (non validé)
10. Miniatures CYRILstudio supplémentaires (une seule dans le repo : Steam)
11. « Toutes les Nintendo en une seule vidéo » / « produits bizzares pour gamer » : titres et miniatures absents du repository, non affichés
12. Dossier `FAR_Cyril_Banques_V4/`, `ASSETS.json` et `travail_interne/` : non trouvés dans le repo

## 8. Référence Grand JD (consultée)

Fichiers : `far-decks/src/sgrandJdV2.jsx` (pages 6–8), `public/grandjd/cyril-adopte-thumb.jpg`.
Composantes reprises pour les cas : partenaire, titre, format, rôle, résultat nommé, miniature 16:9 `contain`, lien. Non repris : vert, commissions, likes, S’abonner, badges.
