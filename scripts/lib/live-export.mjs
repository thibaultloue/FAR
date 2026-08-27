/**
 * Export fidèle : capture WebKit du rendu LIVE 16:9 (pas html2canvas).
 * Catalogue lu depuis window.__FAR_DECK_CATALOG — un nouveau deck dans ALL
 * est exporté sans le brancher ici.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "../..");
const W = 1920;
const H = 1080;
const SCALE = 2;
const PAGE_W_MM = 338.67;
const PAGE_H_MM = 190.5;
const DEFAULT_PORT = 4186;

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
          /* next */
        }
      }
      if (Date.now() > deadline) reject(new Error("Le serveur preview ne répond pas."));
      else setTimeout(tryOnce, 400);
    };
    tryOnce();
  });
}

async function launchBrowser() {
  const { webkit, chromium } = await import("playwright");
  try {
    const browser = await webkit.launch({ headless: true });
    return { browser, engine: "webkit" };
  } catch {
    const browser = await chromium.launch({ headless: true });
    return { browser, engine: "chromium" };
  }
}

async function authAndCatalog(page, base) {
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(400);
  const catalog = await page.evaluate(() => window.__FAR_DECK_CATALOG || []);
  if (!catalog.length) throw new Error("Catalogue decks introuvable (__FAR_DECK_CATALOG). Rebuild requis.");
  return catalog;
}

async function prepSlide(page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-far-live-export", "1");
  });
  await page.evaluate(() => document.fonts?.ready?.catch(() => {}));
  await page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener("load", res, { once: true });
          img.addEventListener("error", res, { once: true });
          setTimeout(res, 4000);
        });
      }),
    );
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none") return;
      if (parseFloat(cs.opacity) < 0.99) el.style.opacity = "1";
      if (cs.visibility === "hidden") el.style.visibility = "visible";
      const tr = cs.transform;
      if (tr && tr !== "none" && (tr.includes("matrix(0") || tr.includes("scale(0"))) {
        el.style.transform = "none";
      }
    });
  });
}

async function writePdf(images, outPath) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [PAGE_W_MM, PAGE_H_MM],
    compress: true,
  });
  for (let i = 0; i < images.length; i++) {
    if (i > 0) pdf.addPage([PAGE_W_MM, PAGE_H_MM], "landscape");
    const data = `data:image/png;base64,${fs.readFileSync(images[i]).toString("base64")}`;
    pdf.addImage(data, "PNG", 0, 0, PAGE_W_MM, PAGE_H_MM, undefined, "FAST");
  }
  pdf.save(outPath);
}

async function captureDeck(page, base, deck, outRoot) {
  await page.goto(`${base}/#${deck.id}/0`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector(".far-slide-inner", { timeout: 60000 });
  await page.waitForTimeout(600);

  const n =
    (await page.evaluate(() => {
      const header = document.querySelector(".far-header");
      const m = (header?.innerText || "").match(/(\d+)\s*\/\s*(\d+)/);
      return m ? parseInt(m[2], 10) : 0;
    })) || deck.slides;

  const slidesDir = path.join(outRoot, "captures", deck.file, "slides");
  fs.rmSync(path.dirname(slidesDir), { recursive: true, force: true });
  fs.mkdirSync(slidesDir, { recursive: true });

  const images = [];
  for (let i = 0; i < n; i++) {
    await page.goto(`${base}/#${deck.id}/${i}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForSelector(".far-slide-inner", { timeout: 30000 });
    await page.waitForTimeout(550);
    await prepSlide(page);
    const dest = path.join(slidesDir, `${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({
      path: dest,
      type: "png",
      animations: "disabled",
      clip: { x: 0, y: 0, width: W, height: H },
    });
    images.push(dest);
    process.stdout.write(`  ${deck.id} ${i + 1}/${n}\r`);
  }
  process.stdout.write("\n");
  return images;
}

/**
 * @param {{ ids?: string[], port?: number }} opts
 */
export async function runLiveExport(opts = {}) {
  const wantIds = (opts.ids || []).filter((x) => x && !x.startsWith("-"));
  const port = opts.port || DEFAULT_PORT;
  const outRoot = path.join(root, "exports");
  fs.mkdirSync(outRoot, { recursive: true });

  const vite = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });

  let browser;
  const failures = [];
  try {
    await new Promise((r) => setTimeout(r, 1500));
    const host = await waitForServer(port);
    const base = `http://${host}:${port}`;
    const launched = await launchBrowser();
    browser = launched.browser;
    console.log("engine", launched.engine);

    const ctx = await browser.newContext({
      viewport: { width: W, height: H },
      deviceScaleFactor: SCALE,
      colorScheme: "light",
    });
    const page = await ctx.newPage();
    const catalog = await authAndCatalog(page, base);
    const decks = wantIds.length
      ? wantIds.map((id) => {
          const hit = catalog.find((d) => d.id === id || d.file === id);
          if (!hit) throw new Error(`Deck inconnu: ${id}`);
          return hit;
        })
      : catalog;

    console.log(`decks ${decks.length} · pdf`);

    for (const deck of decks) {
      try {
        console.log("→", deck.id, `(${deck.slides} slides)`);
        const images = await captureDeck(page, base, deck, outRoot);
        const pdfPath = path.join(outRoot, `${deck.file}.pdf`);
        await writePdf(images, pdfPath);
        console.log("  pdf", pdfPath);
      } catch (err) {
        failures.push({ id: deck.id, error: err.message });
        console.error("  FAIL", deck.id, err.message);
      }
    }

    if (failures.length) {
      console.error("échecs", failures.length, failures);
      process.exitCode = 1;
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    vite.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 800));
  }
}
