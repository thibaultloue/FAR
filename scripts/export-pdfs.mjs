/**
 * Export PDF fidèle (capture live 16:9). Tous les decks si aucun id.
 * Usage : node scripts/export-pdfs.mjs [id ...]
 */
import { runLiveExport } from "./lib/live-export.mjs";

await runLiveExport({ ids: process.argv.slice(2) });
