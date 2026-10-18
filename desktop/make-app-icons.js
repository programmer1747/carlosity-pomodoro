// Rasterises the square Orbodoro mark into the PNG sizes the website and the
// desktop build need. Run from the desktop folder, writes into the repo root.
const path = require("path");
process.chdir(path.join(__dirname, ".."));

const sharp = require("sharp");
const fs = require("fs");

const svg = fs.readFileSync("icon.svg");

// Maskable icons need a safe zone, a launcher may crop up to 20% off each edge.
const maskable = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<rect width="64" height="64" fill="#0E1730"/>' +
  '<rect x="20" y="20" width="24" height="24" fill="none" stroke="#FF9F45" stroke-width="3.6"/>' +
  '<rect x="28" y="28" width="8" height="8" fill="#5FD8C4"/></svg>'
);

(async () => {
  await sharp(svg).resize(192, 192).png().toFile("icon-192.png");
  await sharp(svg).resize(512, 512).png().toFile("icon-512.png");
  await sharp(maskable).resize(512, 512).png().toFile("icon-maskable-512.png");
  await sharp(svg).resize(512, 512).png().toFile("desktop/build/icon.png");
  for (const f of ["icon-192.png", "icon-512.png", "icon-maskable-512.png", "desktop/build/icon.png"]) {
    const m = await sharp(f).metadata();
    console.log(f + "  " + m.width + "x" + m.height + "  " + fs.statSync(f).size + " bytes");
  }
})().catch(e => { console.error(e.message); process.exit(1); });
