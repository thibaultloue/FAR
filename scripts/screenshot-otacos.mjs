import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "exports", "screenshots");
const PORT = 4184;
fs.mkdirSync(outDir, { recursive: true });

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
function waitForServer(port, timeoutMs = 90000) {
  const hosts = ["127.0.0.1", "localhost"];
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = async () => {
      for (const h of hosts) {
        try { await pingOnce(h, port); resolve(h); return; } catch {}
      }
      if (Date.now() > deadline) reject(new Error("preview down"));
      else setTimeout(tryOnce, 400);
    };
    tryOnce();
  });
}

const vite = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], { cwd: root, stdio: "inherit", shell: false });

try {
  await new Promise((r) => setTimeout(r, 1500));
  const host = await waitForServer(PORT);
  const base = `http://${host}:${PORT}`;
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => sessionStorage.setItem("far_auth", "1"));
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const slides = [0, 3, 6, 8, 10, 11, 12];
  for (const i of slides) {
    await page.goto(`${base}/#otacospepe/${i}`, { waitUntil: "networkidle" });
    await page.reload({ waitUntil: "networkidle" });
    await new Promise((r) => setTimeout(r, 1500));
    const target = path.join(outDir, `otp_${i + 1}.png`);
    await page.screenshot({ path: target, fullPage: false });
    console.log("OK", target);
  }
  await ctx.close();
  await browser.close();
} finally {
  vite.kill("SIGTERM");
}
