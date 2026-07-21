/**
 * Export PDF des 3 decks prospection (Grand JD, Bouseuh, Unchained).
 * Même pipeline que le bouton « ↓ PDF » dans l’app.
 * Prérequis : `npm run build`, puis `npx playwright install chromium` (une fois).
 * Usage : `node scripts/export-prospection-3.mjs`
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports");
const PORT = 4187;

const DECKS = [
  { id: "grandjd", file: "Le_Grand_JD_x_FAR.pdf" },
  { id: "bouseuh", file: "Le_Bouseuh_x_FAR.pdf" },
  { id: "unchained", file: "Unchained_x_FAR.pdf" },
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
  ctx = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
  });
  const page = await ctx.newPage();

  page.on("console", (msg) => {
    const t = msg.type();
    if (t === "error" || t === "warning") console.log(`[browser ${t}]`, msg.text());
  });
  page.on("pageerror", (err) => console.log("[pageerror]", err.message));

  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });

  for (const { id, file } of DECKS) {
    console.log(`\n→ Export ${id}…`);
    await page.goto(`${base}/#${id}/0`, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForSelector(".far-btn-pdf", { state: "visible", timeout: 60000 });
    // Laisser polices + images se stabiliser
    await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
    await new Promise((r) => setTimeout(r, 3000));

    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 600000 }),
      page.click(".far-btn-pdf"),
    ]);
    const target = path.join(outDir, file);
    await download.saveAs(target);
    const st = fs.statSync(target);
    console.log(`OK ${target} (${(st.size / 1024 / 1024).toFixed(2)} Mo)`);
  }
} finally {
  if (ctx) await ctx.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  vite.kill("SIGTERM");
  await new Promise((r) => setTimeout(r, 1500));
}
