/**
 * Export PDF fidèle (capture live 16:9). Tous les decks si aucun id.
 * Usage : node scripts/export-pdfs.mjs [id ...]
 * Rebuild dist sauf si FAR_SKIP_BUILD=1 ou FAR_EXPORT_URL (serveur déjà à jour).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { runLiveExport } from "./lib/live-export.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const skipBuild = process.env.FAR_SKIP_BUILD === "1" || Boolean(process.env.FAR_EXPORT_URL);

if (!skipBuild) {
  const build = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit", shell: false });
  if (build.status !== 0) process.exit(build.status || 1);
}

await runLiveExport({ ids: process.argv.slice(2) });
