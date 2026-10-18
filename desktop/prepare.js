// Copies the web app up from the repo root into desktop/app so electron-builder can
// package it. Keeping one copy of the source means the desktop build and the website
// can never drift apart.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "app");
const FILES = [
  "index.html",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "manifest.webmanifest"
];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const f of FILES) {
  const src = path.join(ROOT, f);
  if (!fs.existsSync(src)) {
    console.error("missing source file: " + f);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(OUT, f));
}

// The service worker is a website concern. Inside Electron the files are already
// local, so registering it would only add a failing fetch on every launch.
let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
const swBlock = `if("serviceWorker" in navigator){
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{}));
}`;
if (!html.includes(swBlock)) {
  console.error("service worker registration block not found, refusing to guess");
  process.exit(1);
}
html = html.replace(swBlock, "/* service worker is not used in the desktop build */");
fs.writeFileSync(path.join(OUT, "index.html"), html);

console.log("prepared " + FILES.length + " files into desktop/app");
