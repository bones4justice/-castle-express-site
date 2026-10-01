#!/usr/bin/env node
// Regenerates lib/imageDims.json (intrinsic width/height of every file in
// public/images/). The blog renderer uses it to emit width/height on raw
// <img> tags so images reserve layout space (CLS). Run after adding images:
//   node scripts/gen-image-dims.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "images");
const out = {};

(async () => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (!fs.statSync(p).isFile()) continue;
    try {
      const m = await sharp(p).metadata();
      if (m.width && m.height) out["/images/" + f] = { w: m.width, h: m.height };
    } catch (e) {
      // not an image - skip
    }
  }
  fs.writeFileSync(path.join(__dirname, "..", "lib", "imageDims.json"), JSON.stringify(out, null, 1));
  console.log(`gen-image-dims: ${Object.keys(out).length} images measured`);
})();
