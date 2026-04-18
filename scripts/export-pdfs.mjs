/**
 * Génère les PDF (même pipeline que le bouton « ↓ PDF » dans l’app) pour les decks listés.
 * Prérequis : `npm run build`, puis `npx playwright install chromium` (une fois).
 * Usage : depuis la racine far-decks → `node scripts/export-pdfs.mjs`
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports");
const PORT = 4183;

const DECKS = [
  { id: "cyrilmp4", file: "CYRILmp4.pdf" },
  { id: "toinelag", file: "Toinelag.pdf" },
  { id: "fastgoodcuisine", file: "Le_combat_des_chefs.pdf" },
];

function pingOnce(host, port) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${host}:${port}/`, (res) => {
      res.resume();
      if (res.statusCode === 200 || res.statusCode === 304) resolve();
      else reject(new Error(String(res.statusCode)));
    });
    req.on("error", reject);
  });
}

function waitForServer(port, timeoutMs = 120000) {
  const hosts = ["127.0.0.1", "localhost"];
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = async () => {
      for (const h of hosts) {
        try {
          await pingOnce(h, port);
          resolve(h);
          return;
        } catch {
          /* try next host */
        }
      }
      if (Date.now() > deadline) reject(new Error("Le serveur preview ne répond pas."));
      else setTimeout(tryOnce, 400);
    };
    tryOnce();
  });
}

fs.mkdirSync(outDir, { recursive: true });

const vite = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
});

let browser;
let ctx;
try {
  await new Promise((r) => setTimeout(r, 1500));
  const host = await waitForServer(PORT);
  const base = `http://${host}:${PORT}`;
  const { chromium } = await import("playwright");
  browser = await chromium.launch({
    headless: true,
    args: process.env.CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
  });
  ctx = await browser.newContext({ acceptDownloads: true });
  const page = await ctx.newPage();

  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });

  for (const { id, file } of DECKS) {
    await page.goto(`${base}/#${id}/0`, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForSelector(".far-btn-pdf", { state: "visible", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));

    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 300000 }),
      page.click(".far-btn-pdf"),
    ]);
    const target = path.join(outDir, file);
    await download.saveAs(target);
    console.log("OK", target);
  }
} finally {
  if (ctx) await ctx.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  vite.kill("SIGTERM");
  await new Promise((r) => setTimeout(r, 1500));
}
