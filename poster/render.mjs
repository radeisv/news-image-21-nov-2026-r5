// Render poster.html to entry.png via the Playwright-cache Chrome over CDP.
// Node's global WebSocket is an EventTarget: use addEventListener, not .on.
import { execSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
execSync("node build.mjs", { cwd: dir, stdio: "inherit" });
const chrome = "/home/hatch/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";
const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1800));
const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = list.find((t) => t.type === "page");
let ws;
const pending = new Map();
function cdp(method, params = {}) {
  const id = Math.floor(Math.random() * 1e9);
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const to = setTimeout(() => { pending.delete(id); reject(new Error("cdp timeout " + method)); }, 30000);
    pending.set(id, { resolve, reject, to });
  });
}
function onWsMessage(ev) {
  const m = JSON.parse(typeof ev.data === "string" ? ev.data : Buffer.from(ev.data).toString());
  if (m.id && pending.has(m.id)) {
    const { resolve, reject, to } = pending.get(m.id);
    pending.delete(m.id); clearTimeout(to);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
}
try {
  ws = new WebSocket(page.webSocketDebuggerUrl);
  ws.addEventListener("message", onWsMessage);
  await new Promise((r) => { ws.addEventListener("open", r); });
  await cdp("Page.enable");
  await cdp("Page.navigate", { url: "file://" + join(dir, "poster.html") });
  await new Promise((r) => setTimeout(r, 1200));
  const probe = await cdp("Runtime.evaluate", { expression: `JSON.stringify({h:document.documentElement.scrollHeight,w:document.documentElement.scrollWidth,tops:[...document.querySelectorAll('[id^="sec-"]')].map(e=>e.getBoundingClientRect().top+scrollY),bad:[...document.querySelectorAll('*')].filter(e=>e.scrollWidth>1024).length})`, returnByValue: true });
  console.log("layout probe:", probe.result.value);
  const shot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 } });
  writeFileSync(join(dir, "entry-raw.png"), Buffer.from(shot.data, "base64"));
  console.log("raw bytes:", readFileSync(join(dir, "entry-raw.png")).length);
} finally {
  try { ws.close(); } catch {}
  proc.kill();
}
execSync(`python3 -c "from PIL import Image; im=Image.open('${join(dir, "entry-raw.png")}').convert('RGB'); im.save('${join(dir, "entry.png")}')"`, { stdio: "inherit" });
const out = readFileSync(join(dir, "entry.png"));
if (out.length > 1048576) throw new Error("entry.png over 1 MiB: " + out.length);
console.log("entry.png bytes:", out.length);
