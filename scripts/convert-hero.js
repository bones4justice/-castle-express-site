const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = '/home/ubuntu/castle-express-site/castle-site/public/images';
const targets = [
  { src: 'hero-white-truck.jpg', out: 'hero-white-truck.webp' },
  { src: 'truck-residential.jpg', out: 'truck-residential.webp' },
];

(async () => {
  for (const t of targets) {
    const srcPath = path.join(root, t.src);
    const outPath = path.join(root, t.out);
    const srcSize = fs.statSync(srcPath).size;
    await sharp(srcPath)
      .resize({ width: 1280, height: 960, fit: 'cover' })
      .webp({ quality: 70 })
      .toFile(outPath);
    const outSize = fs.statSync(outPath).size;
    console.log(`${t.src} (${(srcSize/1024).toFixed(0)}KB) -> ${t.out} (${(outSize/1024).toFixed(0)}KB) | ${((1 - outSize/srcSize) * 100).toFixed(1)}% smaller`);
  }
})().catch(e => { console.error(e); process.exit(1); });
