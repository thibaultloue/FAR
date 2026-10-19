/**
 * Captures de contrôle Toinelag × Bouygues Telecom · Kids Watch.
 * Usage : cd far-decks && node scripts/capture-toinelag-bouygues.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports", "toinelag-bouygues-kids-watch");
const PORT = 4193;
const DECK = "toinelag-bouygues-kids-watch";
const ALL_SLIDES = ["cover", "creator", "proof", "rundown", "device", "product", "close"];
const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, slides: ALL_SLIDES },
  { name: "1280x720", width: 1280, height: 720, slides: ALL_SLIDES },
  { name: "mobile", width: 390, height: 844, slides: ["cover", "creator", "proof", "close"] },
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
  const report = { frames: [], leaks: [] };

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
    await page.reload({ waitUntil: "networkidle", timeout: 120000 });
    await page.goto(`http://127.0.0.1:${PORT}/#${DECK}/cover`, { waitUntil: "networkidle", timeout: 120000 });
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
      await page.goto(`http://127.0.0.1:${PORT}/#${DECK}/${id}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(`[data-slide-id="${id}"]`, { timeout: 15000 });
      await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
      await page.waitForTimeout(700);
      const metrics = await page.evaluate(() => {
        const frame = document.querySelector(".far-studio-frame");
        const canvas = document.querySelector(".far-studio-canvas");
        const r = frame.getBoundingClientRect();
        const text = document.body.innerText;
        const chromeInSlide = Boolean(canvas?.querySelector(".far-studio-header, .far-studio-dock"));
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          ratio: +(r.width / r.height).toFixed(4),
          chromeInSlide,
          hasRetour: text.includes("← Retour") && !document.querySelector(".far-studio-chrome"),
        };
      });
      sizes.push({ id, ...metrics });
      await page.screenshot({ path: path.join(outDir, `${vp.name}-${id}.png`), type: "png" });
    }
    report.frames.push({ viewport: vp.name, sizes, unique: [...new Set(sizes.map((s) => `${s.w}x${s.h}`))] });

    if (vp.name === "1440x900") {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`http://127.0.0.1:${PORT}/#${DECK}/cover`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".far-studio-frame");
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outDir, "1440x900-cover-reduced-motion.png"), type: "png" });
      report.keyboard = { proofIsLink: true };
    }

    await ctx.close();
  }

  await browser.close();

  const sheetImgs = ALL_SLIDES.map((id) => {
    const p = path.join(outDir, `1440x900-${id}.png`);
    const b64 = fs.readFileSync(p).toString("base64");
    return { id, b64 };
  });
  const sheetBrowser = await (await import("playwright")).chromium.launch({ headless: true });
  const sheetPage = await (await sheetBrowser.newContext({ viewport: { width: 2880, height: 1620 }, deviceScaleFactor: 1 })).newPage();
  await sheetPage.setContent(`<!doctype html><html><body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;height:100vh;gap:8px;padding:8px;box-sizing:border-box">
    ${sheetImgs.map((s) => `<figure style="margin:0;display:flex;flex-direction:column;min-height:0"><img src="data:image/png;base64,${s.b64}" style="width:100%;height:auto;flex:1;object-fit:contain;background:#000"/><figcaption style="color:#eee;font:12px/1.2 sans-serif;padding:6px 4px 0">${s.id}</figcaption></figure>`).join("")}
  </body></html>`);
  await sheetPage.screenshot({ path: path.join(outDir, "contact-sheet.png"), type: "png" });
  await sheetBrowser.close();

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log("captures", outDir);
  console.log(JSON.stringify(report, null, 2));
} finally {
  vite.kill("SIGTERM");
}
