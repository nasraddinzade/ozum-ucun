/**
 * Generates all app images from assets/logo-source.png using jimp.
 *
 * - Makes the cream background of the logo TRANSPARENT so the mark sits
 *   cleanly on any surface (cards, splash, adaptive icon).
 * - Produces: logo.png (in-app), icon.png (launcher), adaptive-icon.png,
 *   splash.png, favicon.png.
 */
const Jimp = require('jimp');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
const srcPath = path.join(assetsDir, 'logo-source.png');

// Brand cream (logo background) and app cream (launcher background)
const LOGO_CREAM = {r: 242, g: 227, b: 208};
const CREAM_INT = Jimp.rgbaToInt(243, 232, 215, 255); // #F3E8D7
const TRANSPARENT = 0x00000000;

// How close to cream a pixel must be to be treated as background.
const CREAM_THRESHOLD = 42;

function makeBackgroundTransparent(img) {
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const dist =
      Math.abs(r - LOGO_CREAM.r) +
      Math.abs(g - LOGO_CREAM.g) +
      Math.abs(b - LOGO_CREAM.b);
    if (dist < CREAM_THRESHOLD) {
      this.bitmap.data[idx + 3] = 0; // alpha -> transparent
    }
  });
  return img;
}

function centerComposite(canvas, layer) {
  const x = Math.floor((canvas.bitmap.width - layer.bitmap.width) / 2);
  const y = Math.floor((canvas.bitmap.height - layer.bitmap.height) / 2);
  canvas.composite(layer, x, y);
  return canvas;
}

(async () => {
  console.log('Reading logo-source.png...');
  const src = await Jimp.read(srcPath);
  console.log(`Source: ${src.bitmap.width}x${src.bitmap.height}`);

  // Transparent-background version of the full logo (mark + wordmark)
  const logoT = makeBackgroundTransparent(src.clone());

  // 1. logo.png — 512, transparent (used on Welcome + Settings + splash)
  const logo512 = logoT.clone().resize(512, Jimp.AUTO);
  await logo512.writeAsync(path.join(assetsDir, 'logo.png'));
  console.log('✓ logo.png (512, transparent)');

  // 2. icon.png — 1024 launcher icon: logo on solid cream (no transparency)
  const iconBg = new Jimp(1024, 1024, CREAM_INT);
  const iconMark = logoT.clone().resize(860, Jimp.AUTO);
  centerComposite(iconBg, iconMark);
  await iconBg.writeAsync(path.join(assetsDir, 'icon.png'));
  console.log('✓ icon.png (1024, cream bg)');

  // 3. adaptive-icon.png — 1024 transparent foreground, mark in safe zone (~66%)
  const adaptive = new Jimp(1024, 1024, TRANSPARENT);
  const adaptiveMark = logoT.clone().resize(660, Jimp.AUTO);
  centerComposite(adaptive, adaptiveMark);
  await adaptive.writeAsync(path.join(assetsDir, 'adaptive-icon.png'));
  console.log('✓ adaptive-icon.png (1024, transparent fg)');

  // 4. splash.png — 1284x2778, logo centered on cream (fallback / legacy)
  const splash = new Jimp(1284, 2778, CREAM_INT);
  const splashMark = logoT.clone().resize(720, Jimp.AUTO);
  centerComposite(splash, splashMark);
  await splash.writeAsync(path.join(assetsDir, 'splash.png'));
  console.log('✓ splash.png (1284x2778, cream bg)');

  // 5. favicon.png — 48 on cream
  const favBg = new Jimp(48, 48, CREAM_INT);
  const favMark = logoT.clone().resize(44, Jimp.AUTO);
  centerComposite(favBg, favMark);
  await favBg.writeAsync(path.join(assetsDir, 'favicon.png'));
  console.log('✓ favicon.png (48)');

  console.log('\nAll assets regenerated with jimp (transparent logo).');
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
