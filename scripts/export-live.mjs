/**
 * Alias de export-pdfs.mjs (capture live → PDF).
 */
import { runLiveExport } from "./lib/live-export.mjs";

await runLiveExport({ ids: process.argv.slice(2) });
