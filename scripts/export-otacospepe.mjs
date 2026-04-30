import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports");
const PORT = 4193;

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
        try { await pingOnce(h, port); resolve(h); return; } catch {}
      }
      if (Date.now() > deadline) reject(new Error("preview KO"));
      else setTimeout(tryOnce, 400);
    };
    tryOnce();
  });
}

fs.mkdirSync(outDir, { recursive: true });

const vite = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], {
  cwd: root, stdio: "inherit", shell: false,
});

let browser, ctx;
try {
  await new Promise((r) => setTimeout(r, 1500));
  const host = await waitForServer(PORT);
  const base = `http://${host}:${PORT}`;
  const { chromium } = await import("playwright");
  browser = await chromium.launch({ headless: true });
  ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1600, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
  await page.goto(`${base}/#otacospepe/0`, { waitUntil: "networkidle", timeout: 120000 });
  await page.reload({ waitUntil: "networkidle" });
  await new Promise((r) => setTimeout(r, 4000));
  const btnExists = await page.evaluate(() => !!document.querySelector(".far-btn-pdf"));
  console.log("button present:", btnExists);
  await page.waitForSelector(".far-btn-pdf", { state: "visible", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const t0 = Date.now();
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 300000 }),
    page.click(".far-btn-pdf"),
  ]);
  const target = path.join(outDir, "O_TACOS_PEPE_NATIVE_RES.pdf");
  await download.saveAs(target);
  const dt = Date.now() - t0;
  const sz = fs.statSync(target).size;
  console.log(`OK ${target} ${(sz/1e6).toFixed(2)}MB en ${(dt/1000).toFixed(1)}s`);
} finally {
  if (ctx) await ctx.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  vite.kill("SIGTERM");
  await new Promise((r) => setTimeout(r, 1500));
}
