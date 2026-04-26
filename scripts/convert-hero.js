const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..', 'public', 'images');

const targets = [
  { src: 'hero-white-truck.jpg',     out: 'hero-white-truck.webp',     width: 1280, height: 960,  quality: 70 },
  { src: 'truck-residential.jpg',    out: 'truck-residential.webp',    width: 1280, height: 960,  quality: 70 },
  { src: 'truck-loading.jpg',        out: 'truck-loading.webp',        width: 1200, height: 1200, quality: 80 },
  { src: 'truck-sale-pending.jpg',   out: 'truck-sale-pending.webp',   width: 1200, height: 900,  quality: 80 },
  { src: 'IMG_5585.jpg',             out: 'IMG_5585.webp',             width: 1280, height: 960,  quality: 80 },
  { src: 'truck-aframe.jpg',         out: 'truck-aframe.webp',         width: 1200, height: 900,  quality: 80 },
  { src: 'crew-commercial.jpg',      out: 'crew-commercial.webp',      width: 864,  height: 1080, quality: 80 },
  { src: 'storage-crates.jpg',       out: 'storage-crates.webp',       width: 1049, height: 1400, quality: 80 },
  { src: 'truck-brick-building.jpg', out: 'truck-brick-building.webp', width: 1200, height: 900,  quality: 80 },
  { src: 'IMG_4734.jpg',             out: 'IMG_4734.webp',             width: 1280, height: 960,  quality: 80 },
  { src: 'packed-truck.jpg',         out: 'packed-truck.webp',         width: 900,  height: 1200, quality: 80 },
  { src: 'joe-caronna.png',          out: 'joe-caronna.webp',          width: 599,  height: 800,  quality: 80 },
];

(async () => {
  for (const t of targets) {
    const srcPath = path.join(root, t.src);
    const outPath = path.join(root, t.out);
    if (!fs.existsSync(srcPath)) { console.warn(`SKIP missing: ${t.src}`); continue; }
    const srcSize = fs.statSync(srcPath).size;
    await sharp(srcPath)
      .resize({ width: t.width, height: t.height, fit: 'cover' })
      .webp({ quality: t.quality })
      .toFile(outPath);
    const outSize = fs.statSync(outPath).size;
    const pct = ((1 - outSize / srcSize) * 100).toFixed(1);
    console.log(`${t.src.padEnd(28)} ${(srcSize/1024).toFixed(0).padStart(4)}KB -> ${t.out.padEnd(28)} ${(outSize/1024).toFixed(0).padStart(4)}KB  (${pct}% smaller)`);
  }
})().catch(e => { console.error(e); process.exit(1); });
