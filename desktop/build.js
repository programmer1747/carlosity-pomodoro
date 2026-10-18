// Runs electron-builder in process so one fix can be applied first.
//
// electron-builder unpacks its toolchain (7zip, NSIS, the icon tool) to "<name>.tmp" and
// then renames that directory into place. On this machine that rename fails with EXDEV
// even though both paths sit in the same folder, which kills every build before it can
// package anything. Copying and deleting gets the same result, so rename falls back to
// that whenever Windows refuses the move.
const fsp = require("fs/promises");

const rename = fsp.rename.bind(fsp);
fsp.rename = async function (src, dest) {
  try {
    return await rename(src, dest);
  } catch (err) {
    if (!["EXDEV", "EPERM", "EACCES", "ENOTEMPTY"].includes(err.code)) throw err;
    await fsp.cp(src, dest, { recursive: true, force: true });
    await fsp.rm(src, { recursive: true, force: true });
  }
};

const { build, Platform, Arch } = require("electron-builder");

build({
  targets: Platform.WINDOWS.createTarget(["nsis", "portable"], Arch.x64),
  projectDir: __dirname
})
  .then(files => {
    console.log("\nbuilt:");
    files.forEach(f => console.log("  " + f));
  })
  .catch(err => {
    console.error("build failed: " + (err.message || err));
    process.exit(1);
  });
