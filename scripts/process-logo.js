/**
 * Converts logo-source.png into all required app icon sizes
 * using only Node.js built-ins (no external deps).
 *
 * Strategy: reads raw PNG, resamples via pixel averaging to target size,
 * writes a new valid PNG.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ─── PNG Reader ───────────────────────────────────────────────────────────────

function crc32(buf) {
  const t = crc32.table || (crc32.table = (() => {
    const tb = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      tb[n] = c;
    }
    return tb;
  })());
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = t[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function readUint32(buf, off) {
  return ((buf[off] << 24) | (buf[off+1] << 16) | (buf[off+2] << 8) | buf[off+3]) >>> 0;
}

function parsePNG(buf) {
  // Verify signature
  const sig = [137,80,78,71,13,10,26,10];
  for (let i = 0; i < 8; i++) if (buf[i] !== sig[i]) throw new Error('Not a PNG');

  let pos = 8;
  let width, height, bitDepth, colorType;
  const idatChunks = [];

  while (pos < buf.length) {
    const len = readUint32(buf, pos); pos += 4;
    const type = String.fromCharCode(buf[pos], buf[pos+1], buf[pos+2], buf[pos+3]); pos += 4;
    const data = buf.slice(pos, pos + len); pos += len;
    pos += 4; // skip CRC

    if (type === 'IHDR') {
      width = readUint32(data, 0);
      height = readUint32(data, 4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (bitDepth !== 8) throw new Error(`Unsupported bit depth: ${bitDepth}`);

  const compressed = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(compressed);

  // channels: 2=RGB(3), 6=RGBA(4)
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : 3;
  const stride = 1 + width * channels; // filter byte + pixels

  // decode filter per row
  const pixels = new Uint8Array(height * width * 4); // always RGBA output

  for (let y = 0; y < height; y++) {
    const filter = raw[y * stride];
    const row = y * stride + 1;
    const prev = (y - 1) * stride + 1;

    for (let x = 0; x < width; x++) {
      const src = row + x * channels;
      let r, g, b, a;

      if (channels === 4) { r = raw[src]; g = raw[src+1]; b = raw[src+2]; a = raw[src+3]; }
      else if (channels === 3) { r = raw[src]; g = raw[src+1]; b = raw[src+2]; a = 255; }
      else { r = g = b = raw[src]; a = 255; }

      // apply filter
      function pa(ch) { return x > 0 ? raw[row + (x-1)*channels + ch] : 0; }
      function pb(ch) { return y > 0 ? raw[prev + x*channels + ch] : 0; }
      function pc(ch) { return (x > 0 && y > 0) ? raw[prev + (x-1)*channels + ch] : 0; }
      function paeth(a2,b2,c2) { const p=a2+b2-c2; const pa2=Math.abs(p-a2),pb2=Math.abs(p-b2),pc2=Math.abs(p-c2); return pa2<=pb2&&pa2<=pc2?a2:pb2<=pc2?b2:c2; }

      if (filter === 1) { r=(r+pa(0))&0xFF; g=(g+pa(1))&0xFF; b=(b+pa(2))&0xFF; if(channels===4)a=(a+pa(3))&0xFF; }
      else if (filter === 2) { r=(r+pb(0))&0xFF; g=(g+pb(1))&0xFF; b=(b+pb(2))&0xFF; if(channels===4)a=(a+pb(3))&0xFF; }
      else if (filter === 3) { r=(r+((pa(0)+pb(0))>>1))&0xFF; g=(g+((pa(1)+pb(1))>>1))&0xFF; b=(b+((pa(2)+pb(2))>>1))&0xFF; if(channels===4)a=(a+((pa(3)+pb(3))>>1))&0xFF; }
      else if (filter === 4) { r=(r+paeth(pa(0),pb(0),pc(0)))&0xFF; g=(g+paeth(pa(1),pb(1),pc(1)))&0xFF; b=(b+paeth(pa(2),pb(2),pc(2)))&0xFF; if(channels===4)a=(a+paeth(pa(3),pb(3),pc(3)))&0xFF; }

      const dst = (y * width + x) * 4;
      pixels[dst] = r; pixels[dst+1] = g; pixels[dst+2] = b; pixels[dst+3] = a;
    }
  }

  return { width, height, pixels };
}

// ─── Resample (box/bilinear) ──────────────────────────────────────────────────

function resample(src, srcW, srcH, dstW, dstH) {
  const dst = new Uint8Array(dstW * dstH * 4);
  const xRatio = srcW / dstW;
  const yRatio = srcH / dstH;

  for (let dy = 0; dy < dstH; dy++) {
    for (let dx = 0; dx < dstW; dx++) {
      // sample region in source
      const x0 = dx * xRatio, x1 = (dx + 1) * xRatio;
      const y0 = dy * yRatio, y1 = (dy + 1) * yRatio;
      let r = 0, g = 0, b = 0, a = 0, n = 0;

      for (let sy = Math.floor(y0); sy < Math.ceil(y1) && sy < srcH; sy++) {
        for (let sx = Math.floor(x0); sx < Math.ceil(x1) && sx < srcW; sx++) {
          const p = (sy * srcW + sx) * 4;
          r += src[p]; g += src[p+1]; b += src[p+2]; a += src[p+3]; n++;
        }
      }
      if (n === 0) n = 1;
      const d = (dy * dstW + dx) * 4;
      dst[d] = r/n|0; dst[d+1] = g/n|0; dst[d+2] = b/n|0; dst[d+3] = a/n|0;
    }
  }
  return dst;
}

// ─── PNG Writer ───────────────────────────────────────────────────────────────

function writePNG(pixels, width, height, hasAlpha) {
  const channels = hasAlpha ? 4 : 3;
  const colorType = hasAlpha ? 6 : 2;
  const stride = 1 + width * channels;
  const raw = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter none
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = y * stride + 1 + x * channels;
      raw[dst] = pixels[src];
      raw[dst+1] = pixels[src+1];
      raw[dst+2] = pixels[src+2];
      if (hasAlpha) raw[dst+3] = pixels[src+3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  function chunk(type, data) {
    const typeB = Buffer.from(type, 'ascii');
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeB, data])), 0);
    return Buffer.concat([len, typeB, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = colorType;

  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ─── Composite on background ──────────────────────────────────────────────────

function compositeOnBg(pixels, width, height, bgR, bgG, bgB) {
  const out = new Uint8Array(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const a = pixels[s+3] / 255;
    out[s]   = (pixels[s]   * a + bgR * (1-a)) | 0;
    out[s+1] = (pixels[s+1] * a + bgG * (1-a)) | 0;
    out[s+2] = (pixels[s+2] * a + bgB * (1-a)) | 0;
    out[s+3] = 255;
  }
  return out;
}

// ─── Splash: logo centered on dark background ─────────────────────────────────

function makeSplash(logoPixels, logoW, logoH, splashW, splashH, bgR, bgG, bgB) {
  const out = new Uint8Array(splashW * splashH * 4);
  // fill background
  for (let i = 0; i < splashW * splashH; i++) {
    out[i*4] = bgR; out[i*4+1] = bgG; out[i*4+2] = bgB; out[i*4+3] = 255;
  }
  // center logo (60% of splash width)
  const targetW = Math.floor(splashW * 0.6);
  const targetH = Math.floor(targetW * logoH / logoW);
  const resized = resample(logoPixels, logoW, logoH, targetW, targetH);
  const offX = Math.floor((splashW - targetW) / 2);
  const offY = Math.floor((splashH - targetH) / 2);

  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const src = (y * targetW + x) * 4;
      const a = resized[src+3] / 255;
      const dx = offX + x, dy = offY + y;
      const dst = (dy * splashW + dx) * 4;
      out[dst]   = (resized[src]   * a + bgR * (1-a)) | 0;
      out[dst+1] = (resized[src+1] * a + bgG * (1-a)) | 0;
      out[dst+2] = (resized[src+2] * a + bgB * (1-a)) | 0;
      out[dst+3] = 255;
    }
  }
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const assetsDir = path.join(__dirname, '..', 'assets');
const srcPath = path.join(assetsDir, 'logo-source.png');

console.log('Reading logo-source.png...');
const srcBuf = fs.readFileSync(srcPath);
const { width: srcW, height: srcH, pixels: srcPixels } = parsePNG(srcBuf);
console.log(`Source: ${srcW}x${srcH}`);

// logo background color (cream #F2E3D0 approx)
const [bgR, bgG, bgB] = [242, 227, 208];
// dark splash background (#1A0A10)
const [darkR, darkG, darkB] = [26, 10, 16];

// 1. icon.png — 1024x1024, logo on cream bg
console.log('Creating icon.png (1024x1024)...');
const icon1024 = resample(srcPixels, srcW, srcH, 1024, 1024);
const iconFlat = compositeOnBg(icon1024, 1024, 1024, bgR, bgG, bgB);
fs.writeFileSync(path.join(assetsDir, 'icon.png'), writePNG(iconFlat, 1024, 1024, false));

// 2. adaptive-icon.png — 1024x1024 with transparency (foreground layer)
console.log('Creating adaptive-icon.png (1024x1024, RGBA)...');
const adaptive1024 = resample(srcPixels, srcW, srcH, 1024, 1024);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), writePNG(adaptive1024, 1024, 1024, true));

// 3. splash.png — 1284x2778 (iPhone 14 Pro Max, also good for Android)
console.log('Creating splash.png (1284x2778)...');
const splashPixels = makeSplash(srcPixels, srcW, srcH, 1284, 2778, darkR, darkG, darkB);
fs.writeFileSync(path.join(assetsDir, 'splash.png'), writePNG(splashPixels, 1284, 2778, false));

// 4. favicon.png — 48x48 (for web, optional)
console.log('Creating favicon.png (48x48)...');
const favicon48 = resample(srcPixels, srcW, srcH, 48, 48);
const faviconFlat = compositeOnBg(favicon48, 48, 48, bgR, bgG, bgB);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), writePNG(faviconFlat, 48, 48, false));

console.log('\n✅ All icons created:');
console.log('  assets/icon.png          — 1024x1024 (Play Store, App Store)');
console.log('  assets/adaptive-icon.png — 1024x1024 (Android adaptive icon)');
console.log('  assets/splash.png        — 1284x2778 (Splash screen)');
console.log('  assets/favicon.png       — 48x48     (Web)');
