// Builds build/icon.ico from the app's 512px PNG. electron-builder can normally do this
// itself, but its icon tool cannot unpack on this machine, so the .ico is made up front
// and handed to it finished.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default;

const SRC = path.join(__dirname, "build", "icon.png");
const OUT = path.join(__dirname, "build", "icon.ico");
const SIZES = [16, 24, 32, 48, 64, 128, 256];

(async () => {
  const buffers = [];
  for (const size of SIZES) {
    buffers.push(await sharp(SRC).resize(size, size, { fit: "cover" }).png().toBuffer());
  }
  fs.writeFileSync(OUT, await pngToIco(buffers));
  console.log("wrote " + path.relative(__dirname, OUT) + " with sizes " + SIZES.join(", "));
})().catch(err => { console.error(err.message); process.exit(1); });
