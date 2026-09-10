/**
 * Captures galerie FAR Studio (dev) + contrôle d’un deck historique.
 * Usage : cd far-decks && node scripts/capture-studio-gallery.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports", "studio-gallery");
const PORT = 4191;
const SLIDES = ["cover", "cover-ink", "concept", "case", "creator", "budget", "social", "close"];
const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
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
  const report = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
    await page.goto(`http://127.0.0.1:${PORT}/#studiogallery/cover`, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForSelector(".far-studio-frame", { timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
    await page.waitForTimeout(700);

    const sizes = [];
    for (const id of SLIDES) {
      await page.goto(`http://127.0.0.1:${PORT}/#studiogallery/${id}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(`[data-slide-id="${id}"]`, { timeout: 15000 });
      await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
      await page.waitForTimeout(700);
      const metrics = await page.evaluate(() => {
        const frame = document.querySelector(".far-studio-frame");
        const r = frame.getBoundingClientRect();
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          ratio: +(r.width / r.height).toFixed(4),
        };
      });
      sizes.push({ id, ...metrics });
      await page.screenshot({ path: path.join(outDir, `${vp.name}-${id}.png`), type: "png" });
    }

    const unique = new Set(sizes.map((s) => `${s.w}x${s.h}`));
    report.push({ viewport: vp.name, frameSizes: [...unique], ratios: [...new Set(sizes.map((s) => s.ratio))] });

    if (vp.name === "1440x900") {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);
      const afterKey = await page.evaluate(() => {
        const frame = document.querySelector(".far-studio-frame");
        const r = frame.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), dialog: !!document.querySelector("[role=dialog]") };
      });
      report.push({ keyboardNav: afterKey });

      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`http://127.0.0.1:${PORT}/#studiogallery/cover`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".far-studio-frame");
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outDir, "1440x900-cover-reduced-motion.png"), type: "png" });
      await page.emulateMedia({ reducedMotion: null });

      await page.goto(`http://127.0.0.1:${PORT}/#fgcpicard/1`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".far-slide-inner", { timeout: 20000 });
      await page.waitForTimeout(600);
      const isStudio = await page.evaluate(() => document.documentElement.hasAttribute("data-far-studio"));
      await page.screenshot({ path: path.join(outDir, "legacy-fgcpicard-slide2.png"), type: "png" });
      report.push({ legacyPicardUsesStudio: isStudio });
    }

    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log("captures", outDir);
  console.log(JSON.stringify(report, null, 2));
} finally {
  vite.kill("SIGTERM");
}
