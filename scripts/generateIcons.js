const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const GOLD = '#B8945F';
const BG = '#0A0908';

function drawSeal(ctx, size) {
  const s = size;
  const c = s / 2;
  const unit = s / 100;

  // Background with rounded corners
  const radius = 20 * unit;
  ctx.fillStyle = BG;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(s - radius, 0);
  ctx.quadraticCurveTo(s, 0, s, radius);
  ctx.lineTo(s, s - radius);
  ctx.quadraticCurveTo(s, s, s - radius, s);
  ctx.lineTo(radius, s);
  ctx.quadraticCurveTo(0, s, 0, s - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = GOLD;
  ctx.fillStyle = GOLD;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Outer circle
  ctx.lineWidth = 1.5 * unit;
  ctx.beginPath();
  ctx.arc(c, c, 46 * unit, 0, Math.PI * 2);
  ctx.stroke();

  // Cardinal notch lines
  ctx.lineWidth = 1 * unit;
  [[c, 2*unit, c, 6*unit], [c, 94*unit, c, 98*unit],
   [2*unit, c, 6*unit, c], [94*unit, c, 98*unit, c]].forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Cardinal diamond notches
  [[50,2,48.5,5,50,4,51.5,5], [50,98,48.5,95,50,96,51.5,95],
   [2,50,5,48.5,4,50,5,51.5], [98,50,95,48.5,96,50,95,51.5]].forEach((pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0]*unit, pts[1]*unit);
    ctx.lineTo(pts[2]*unit, pts[3]*unit);
    ctx.lineTo(pts[4]*unit, pts[5]*unit);
    ctx.lineTo(pts[6]*unit, pts[7]*unit);
    ctx.closePath();
    ctx.fill();
  });

  // Inner ring
  ctx.lineWidth = 0.5 * unit;
  ctx.beginPath();
  ctx.arc(c, c, 38 * unit, 0, Math.PI * 2);
  ctx.stroke();

  // 12 radiating lines
  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(c + 28*unit * Math.cos(rad), c + 28*unit * Math.sin(rad));
    ctx.lineTo(c + 38*unit * Math.cos(rad), c + 38*unit * Math.sin(rad));
    ctx.stroke();
  });

  // Central diamond
  ctx.lineWidth = 1 * unit;
  const dh = 12 * unit; // half-diagonal
  ctx.beginPath();
  ctx.moveTo(c, c - dh * Math.SQRT2);
  ctx.lineTo(c + dh * Math.SQRT2, c);
  // Approx: diamond points for rotated 24x24 square
  const dp = 12 * unit * Math.SQRT2 / Math.SQRT2; // = 12 * unit
  ctx.beginPath();
  ctx.moveTo(c, c - dp);
  ctx.lineTo(c + dp, c);
  ctx.lineTo(c, c + dp);
  ctx.lineTo(c - dp, c);
  ctx.closePath();
  ctx.stroke();

  // Inner diamond
  ctx.lineWidth = 0.5 * unit;
  const dp2 = 8 * unit;
  ctx.beginPath();
  ctx.moveTo(c, c - dp2);
  ctx.lineTo(c + dp2, c);
  ctx.lineTo(c, c + dp2);
  ctx.lineTo(c - dp2, c);
  ctx.closePath();
  ctx.stroke();

  // L monogram
  ctx.lineWidth = 1.2 * unit;
  ctx.beginPath();
  ctx.moveTo(42*unit, 39*unit);
  ctx.lineTo(42*unit, 53*unit);
  ctx.lineTo(48*unit, 53*unit);
  ctx.stroke();

  // C monogram
  ctx.beginPath();
  ctx.moveTo(58*unit, 41*unit);
  ctx.bezierCurveTo(54*unit, 38*unit, 51*unit, 40*unit, 51*unit, 47*unit);
  ctx.bezierCurveTo(51*unit, 54*unit, 54*unit, 56*unit, 58*unit, 53*unit);
  ctx.stroke();

  // Decorative dots at 12 positions on inner ring
  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(c + 33*unit * Math.cos(rad), c + 33*unit * Math.sin(rad), 1*unit, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4 accent dots at diagonals
  [45, 135, 225, 315].forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(c + 42*unit * Math.cos(rad), c + 42*unit * Math.sin(rad), 1.2*unit, 0, Math.PI * 2);
    ctx.fill();
  });
}

const sizes = [16, 32, 48, 192, 512];
const publicDir = path.join(__dirname, '..', 'public');

sizes.forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  drawSeal(ctx, size);

  const filename = size <= 48 ? `favicon-${size}.png` : `logo${size}.png`;
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buf);
  console.log(`Generated ${filename} (${size}x${size})`);
});

// Also generate an ICO-compatible 32x32 for favicon.ico replacement
console.log('Done! Icons saved to public/');
