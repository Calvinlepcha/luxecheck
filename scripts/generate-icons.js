const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  // Dark background
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, s, s);

  // "L" thin italic + "C" bold — typographic app icon
  const gold = '#C9A84C';

  // Thin italic "L"
  ctx.save();
  ctx.fillStyle = gold;
  ctx.font = `italic ${s * 0.42}px Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('L', cx - s * 0.11, cy);
  ctx.restore();

  // Gold dot between
  ctx.beginPath();
  ctx.arc(cx + s * 0.06, cy + s * 0.03, s * 0.018, 0, Math.PI * 2);
  ctx.fillStyle = gold;
  ctx.fill();

  // Bold "C"
  ctx.save();
  ctx.fillStyle = '#F5F0E8';
  ctx.font = `bold ${s * 0.42}px Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C', cx + s * 0.18, cy);
  ctx.restore();

  return canvas;
}

[192, 512].forEach((size) => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, '..', 'public', `logo${size}.png`);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated logo${size}.png (${buffer.length} bytes)`);
});
