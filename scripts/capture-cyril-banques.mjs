/**
 * Captures de contrôle CYRILmp4 × Banques.
 * Usage : cd far-decks && node scripts/capture-cyril-banques.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports", "cyril-mp4-banques");
const PORT = 4192;
const ALL_SLIDES = ["cover", "creator", "repertoire", "audience", "preuves", "interet", "collaborer", "piste", "dispositif", "cadre", "close"];
const SHOTS = ["cover", "repertoire", "preuves", "piste", "dispositif", "close"];
const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, slides: ALL_SLIDES },
  { name: "1280x720", width: 1280, height: 720, slides: SHOTS },
  { name: "mobile", width: 390, height: 844, slides: ["cover", "preuves", "close"] },
];

function pingOnce(port) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
      res.resume();
      if (res.statusCode === 200 || res.statusCode === 304) resolve();
      else reject(new Error(String(res.statusCode)));
    });
    req.on("error", reject);
  });
}

async function waitForServer(timeoutMs = 120000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await pingOnce(PORT);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw new Error("Vite ne répond pas");
}

const vite = spawn("npx", ["vite", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], {
  cwd: root,
  stdio: "inherit",
});

try {
  await waitForServer();
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const report = { privateNotesInPublic: [], frames: [] };

  const publicRoot = path.join(root, "public");
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (/\.(md|json|txt)$/i.test(name) && /DONNEES|NARRATION|objection/i.test(name)) {
        report.privateNotesInPublic.push(path.relative(publicRoot, p));
      }
    }
  };
  walk(publicRoot);

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
    await page.reload({ waitUntil: "networkidle", timeout: 120000 });
    await page.goto(`http://127.0.0.1:${PORT}/#cyril-mp4-banques/cover`, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForFunction(() => {
      const frame = document.querySelector(".far-studio-frame");
      if (!frame) return false;
      const r = frame.getBoundingClientRect();
      return r.width > 200 && r.height > 100;
    }, { timeout: 60000 });
    await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
    await page.waitForTimeout(800);

    const sizes = [];
    for (const id of vp.slides) {
      await page.goto(`http://127.0.0.1:${PORT}/#cyril-mp4-banques/${id}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(`[data-slide-id="${id}"]`, { timeout: 15000 });
      await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
      await page.waitForTimeout(600);
      const metrics = await page.evaluate(() => {
        const frame = document.querySelector(".far-studio-frame");
        const r = frame.getBoundingClientRect();
        const notes = document.body.innerText.includes("DONNEES_A_VALIDER") || document.body.innerText.includes("45 à 75");
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          ratio: +(r.width / r.height).toFixed(4),
          privateLeak: notes,
        };
      });
      sizes.push({ id, ...metrics });
      await page.screenshot({ path: path.join(outDir, `${vp.name}-${id}.png`), type: "png" });
    }
    report.frames.push({ viewport: vp.name, sizes, unique: [...new Set(sizes.map((s) => `${s.w}x${s.h}`))] });

    if (vp.name === "1440x900") {
      await page.goto(`http://127.0.0.1:${PORT}/#cyril-mp4-banques/repertoire`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-slide-id=repertoire]");
      await page.locator(".far-studio-plain-btn").first().click();
      await page.waitForSelector("[role=dialog]");
      await page.screenshot({ path: path.join(outDir, "1440x900-repertoire-modal.png"), type: "png" });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      const dialogGone = await page.evaluate(() => !document.querySelector("[role=dialog]"));
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(400);
      const afterKey = await page.evaluate(() => document.querySelector("[data-slide-id]")?.getAttribute("data-slide-id"));
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`http://127.0.0.1:${PORT}/#cyril-mp4-banques/cover`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".far-studio-frame");
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outDir, "1440x900-cover-reduced-motion.png"), type: "png" });
      report.keyboard = { dialogGone, afterKey };
    }

    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log("captures", outDir);
  console.log(JSON.stringify(report, null, 2));
  if (report.privateNotesInPublic.length) process.exitCode = 1;
} finally {
  vite.kill("SIGTERM");
}
