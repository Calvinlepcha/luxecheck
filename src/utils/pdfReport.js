import jsPDF from 'jspdf';

// ─── Constants ────────────────────────────────────────────────
const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const M = 30; // margins
const CW = PAGE_W - M * 2; // content width = 150mm
const TEXT_COLOR = [26, 24, 22]; // #1A1816 charcoal
const MUTED = [120, 115, 108];
const LIGHT_MUTED = [160, 155, 148];
const GOLD = [184, 148, 95]; // #B8945F
const GREEN = [91, 140, 106];
const AMBER = [196, 149, 106];
const RED = [166, 93, 93];
const BG = [250, 250, 247]; // #FAFAF7

const BODY_SIZE = 11;
const SUB_SIZE = 13;
const HEAD_SIZE = 16;

function generateReportId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function fmtCurrency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function importanceLabel(weight) {
  if (weight >= 8) return 'HIGH';
  if (weight >= 5) return 'MEDIUM';
  return 'LOW';
}

// ─── PDF Builder ──────────────────────────────────────────────

export default async function generatePremiumPDF(bag, details, earned, max, percentage, verdict) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const reportId = generateReportId();
  const reportDate = new Date();
  const dateStr = reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = reportDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  let y = 0;
  let pageNum = 1;
  let totalPages = 0; // set after first pass

  const passCount = details.filter(d => d.answer === 'pass').length;
  const failCount = details.filter(d => d.answer === 'fail').length;
  const unsureCount = details.filter(d => d.answer === 'unsure').length;

  // Top 3 passed (by weight)
  const topPassed = details
    .filter(d => d.answer === 'pass')
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);
  const failedItems = details.filter(d => d.answer === 'fail');

  // ─── Helpers ──────────────────────────────────────────────

  function setPageBg() {
    doc.setFillColor(...BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    // Subtle diagonal watermark — seal outline at very low opacity
    doc.setDrawColor(200, 195, 188);
    doc.setLineWidth(0.08);
    const wmR = 12;
    for (let wx = 30; wx < PAGE_W; wx += 60) {
      for (let wy = 40; wy < PAGE_H; wy += 70) {
        doc.circle(wx, wy, wmR);
        // inner diamond
        const dh = wmR * 0.26;
        doc.line(wx, wy - dh, wx + dh, wy);
        doc.line(wx + dh, wy, wx, wy + dh);
        doc.line(wx, wy + dh, wx - dh, wy);
        doc.line(wx - dh, wy, wx, wy - dh);
      }
    }
  }

  function addPageNumber() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...LIGHT_MUTED);
    const text = `Page ${pageNum}`;
    doc.text(text, PAGE_W / 2, PAGE_H - 15, { align: 'center' });
  }

  function newPage() {
    addPageNumber();
    pageNum++;
    doc.addPage();
    setPageBg();
    y = M;
  }

  function pageCheck(need) {
    if (y + need > PAGE_H - 25) {
      newPage();
    }
  }

  function goldLine(yPos, width, centered) {
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.18);
    if (centered) {
      const x = (PAGE_W - width) / 2;
      doc.line(x, yPos, x + width, yPos);
    } else {
      doc.line(M, yPos, M + (width || CW), yPos);
    }
  }

  function fullGoldDivider() {
    y += 8;
    goldLine(y, CW, false);
    y += 8;
  }

  function heading(text) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(HEAD_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.text(text.toUpperCase(), M, y);
    y += 3;
  }

  function subheading(text) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(SUB_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.text(text, M, y);
    y += 2;
  }

  function bodyText(text, indent) {
    const x = M + (indent || 0);
    const maxW = CW - (indent || 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      pageCheck(6);
      doc.text(line, x, y);
      y += 5.5;
    });
  }

  function bodyTextMuted(text, indent) {
    const x = M + (indent || 0);
    const maxW = CW - (indent || 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      pageCheck(6);
      doc.text(line, x, y);
      y += 5.5;
    });
  }

  function labelValue(label, value) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...GOLD);
    doc.text(label, M, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_COLOR);
    doc.text(value, M + doc.getTextWidth(label) + 3, y);
    y += 6;
  }

  function bulletPoint(text, color) {
    pageCheck(8);
    doc.setFillColor(...(color || GOLD));
    doc.circle(M + 2, y - 1.3, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    const lines = doc.splitTextToSize(text, CW - 10);
    lines.forEach((line, i) => {
      doc.text(line, M + 7, y);
      y += 5.5;
    });
    y += 1;
  }

  function numberedItem(num, text) {
    pageCheck(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...GOLD);
    doc.text(`${num}.`, M, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_COLOR);
    const lines = doc.splitTextToSize(text, CW - 12);
    lines.forEach((line) => {
      doc.text(line, M + 8, y);
      y += 5.5;
    });
    y += 2;
  }

  function spacer(mm) { y += mm || 4; }

  // Score summary sentence
  function getScoreSummary() {
    if (percentage >= 80) return 'Based on your inspection, this item shows strong signs of being authentic.';
    if (percentage >= 50) return 'Based on your inspection, some details need a closer look before you can be confident.';
    return 'Based on your inspection, several warning signs were found. We recommend professional authentication.';
  }

  function getScoreColor() {
    if (percentage >= 80) return GREEN;
    if (percentage >= 50) return AMBER;
    return RED;
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE 1 — COVER
  // ═══════════════════════════════════════════════════════════
  setPageBg();
  y = 45;

  // Draw the seal logo mark
  const cx = PAGE_W / 2;
  const sealR = 14; // radius in mm
  doc.setDrawColor(...TEXT_COLOR);
  doc.setLineWidth(0.4);
  doc.circle(cx, y, sealR); // outer circle

  // Inner ring
  doc.setLineWidth(0.15);
  doc.circle(cx, y, sealR * 0.826); // r=38/46 ratio

  // 12 radiating lines
  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    const r1 = sealR * 0.608; // 28/46
    const r2 = sealR * 0.826; // 38/46
    doc.line(
      cx + r1 * Math.cos(rad), y + r1 * Math.sin(rad),
      cx + r2 * Math.cos(rad), y + r2 * Math.sin(rad)
    );
  });

  // Central diamond (rotated square)
  const dHalf = sealR * 0.261; // 12/46
  doc.setLineWidth(0.3);
  doc.line(cx, y - dHalf, cx + dHalf, y);
  doc.line(cx + dHalf, y, cx, y + dHalf);
  doc.line(cx, y + dHalf, cx - dHalf, y);
  doc.line(cx - dHalf, y, cx, y - dHalf);

  // L and C monogram
  doc.setLineWidth(0.35);
  // L
  doc.line(cx - 3.5, y - 4, cx - 3.5, y + 3);
  doc.line(cx - 3.5, y + 3, cx - 0.5, y + 3);
  // C arc approximation
  doc.setDrawColor(...TEXT_COLOR);
  const cPath = `M${cx + 3.5},${y - 3.5} C${cx + 1},${y - 5} ${cx - 0.5},${y - 3} ${cx - 0.5},${y} C${cx - 0.5},${y + 3} ${cx + 1},${y + 5} ${cx + 3.5},${y + 3}`;
  // jsPDF doesn't support SVG path, draw C as lines
  doc.line(cx + 3.5, y - 3, cx + 1, y - 4.5);
  doc.line(cx + 1, y - 4.5, cx - 0.5, y - 2);
  doc.line(cx - 0.5, y - 2, cx - 0.5, y + 2);
  doc.line(cx - 0.5, y + 2, cx + 1, y + 4.5);
  doc.line(cx + 1, y + 4.5, cx + 3.5, y + 3);

  // Cardinal notch dots
  doc.setFillColor(...TEXT_COLOR);
  [0, 90, 180, 270].forEach((angle) => {
    const rad = (angle * Math.PI) / 180;
    doc.circle(cx + (sealR + 1.5) * Math.cos(rad), y + (sealR + 1.5) * Math.sin(rad), 0.4, 'F');
  });

  y += sealR + 8;

  // LUXECHECK wordmark
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(...TEXT_COLOR);
  doc.setCharSpace(3);
  doc.text('LUXECHECK', cx, y, { align: 'center' });
  doc.setCharSpace(0);
  y += 6;

  // Gold accent line
  goldLine(y, 25, true);
  y += 12;

  // "AUTHENTICATION REPORT"
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.setCharSpace(1.5);
  doc.text('AUTHENTICATION REPORT', PAGE_W / 2, y, { align: 'center' });
  doc.setCharSpace(0);
  y += 8;

  // "AI-Powered Authentication Analysis" subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.8);
  doc.text('AI-Powered Authentication Analysis', PAGE_W / 2, y, { align: 'center' });
  doc.setCharSpace(0);
  y += 24;

  // Brand & Model
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...TEXT_COLOR);
  doc.text(bag.brand, PAGE_W / 2, y, { align: 'center' });
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(...MUTED);
  doc.text(bag.model, PAGE_W / 2, y, { align: 'center' });
  y += 25;

  // Score circle
  const scoreColor = getScoreColor();
  doc.setDrawColor(...scoreColor);
  doc.setLineWidth(1);
  doc.circle(PAGE_W / 2, y, 18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...scoreColor);
  doc.text(`${percentage}%`, PAGE_W / 2, y + 4, { align: 'center' });
  y += 25;

  // Verdict label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(SUB_SIZE);
  doc.setTextColor(...scoreColor);
  doc.text(verdict.label, PAGE_W / 2, y, { align: 'center' });
  y += 12;

  // Summary sentence
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(BODY_SIZE);
  doc.setTextColor(...MUTED);
  const summaryLines = doc.splitTextToSize(getScoreSummary(), CW - 20);
  summaryLines.forEach((line) => {
    doc.text(line, PAGE_W / 2, y, { align: 'center' });
    y += 5.5;
  });
  y += 20;

  // Date and Report ID
  doc.setFontSize(9);
  doc.setTextColor(...LIGHT_MUTED);
  doc.text(`${dateStr}`, PAGE_W / 2, y, { align: 'center' });
  y += 5;
  doc.text(`Report ID: ${reportId}`, PAGE_W / 2, y, { align: 'center' });

  addPageNumber();

  // ═══════════════════════════════════════════════════════════
  // PAGE 2 — HOW TO READ THIS REPORT
  // ═══════════════════════════════════════════════════════════
  newPage();

  heading('How to Read This Report');
  y += 4;
  fullGoldDivider();

  subheading('What This Report Is');
  spacer(3);
  bodyText(`This report was generated using LuxeCheck AI, which combines your hands-on visual inspection with our database of authentication markers gathered from professional luxury authenticators. The AI guides you through the same checkpoints that experts use, making professional-level authentication knowledge accessible to everyone.`);
  spacer(3);
  bodyText(`You inspected a ${bag.brand} ${bag.model} using the LuxeCheck checklist. Each section below explains what you checked, what the result means, and what to do about it.`);
  spacer(6);

  subheading('What This Report Is NOT');
  spacer(3);
  bodyText('This is not a professional authentication certificate. It is based on your own visual inspection, not laboratory testing or expert handling. For items worth over $1,000, we always recommend getting a second opinion from a professional authenticator.');
  spacer(6);

  subheading('How Scoring Works');
  spacer(3);
  bodyText('Each checkpoint has a weight \u2014 think of it like how important that detail is. Stitching quality is weighted heavily because it is one of the hardest things for counterfeiters to copy perfectly. Small details like interior lining are weighted lower because even authentic items sometimes have minor inconsistencies.');
  spacer(8);

  // Score scale
  subheading('What the Scores Mean');
  spacer(4);

  // Green bar
  doc.setFillColor(...GREEN);
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('80 \u2013 100%', M + 4, y + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Strong indicators of authenticity', M + 35, y + 6.5);
  y += 14;

  // Amber bar
  doc.setFillColor(...AMBER);
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('50 \u2013 79%', M + 4, y + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Mixed results \u2014 investigate further', M + 35, y + 6.5);
  y += 14;

  // Red bar
  doc.setFillColor(...RED);
  doc.roundedRect(M, y, CW, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Below 50%', M + 4, y + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Multiple warning signs detected', M + 35, y + 6.5);
  y += 14;

  // ═══════════════════════════════════════════════════════════
  // PAGE 3 — RESULTS AT A GLANCE
  // ═══════════════════════════════════════════════════════════
  newPage();

  heading('Your Results at a Glance');
  y += 4;
  fullGoldDivider();

  // Table header
  const col1 = M;
  const col2 = M + 62;
  const col3 = M + 100;
  const col4 = M + 125;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text('CHECKPOINT', col1, y);
  doc.text('CATEGORY', col2, y);
  doc.text('RESULT', col3, y);
  doc.text('IMPORTANCE', col4, y);
  y += 3;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(M, y, M + CW, y);
  y += 5;

  // Table rows
  details.forEach((cp) => {
    pageCheck(8);
    const ans = cp.answer === 'pass' ? { sym: '\u2713', label: 'Pass', color: GREEN }
      : cp.answer === 'fail' ? { sym: '\u2717', label: 'Fail', color: RED }
      : { sym: '?', label: 'Unsure', color: MUTED };
    const imp = importanceLabel(cp.weight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...TEXT_COLOR);
    doc.text(cp.name.substring(0, 28), col1, y);

    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text((cp.category || '').charAt(0).toUpperCase() + (cp.category || '').slice(1), col2, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ans.color);
    doc.text(`${ans.sym} ${ans.label}`, col3, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...(imp === 'HIGH' ? GOLD : MUTED));
    doc.text(imp, col4, y);

    y += 7;
  });

  // Summary below table
  spacer(6);
  doc.setDrawColor(220, 218, 212);
  doc.setLineWidth(0.15);
  doc.line(M, y, M + CW, y);
  y += 6;

  bodyText(`You passed ${passCount} out of ${details.length} checkpoints. ${unsureCount > 0 ? `${unsureCount} checkpoint${unsureCount === 1 ? ' was' : 's were'} marked as unsure.` : 'No checkpoints were marked as unsure.'}`);
  spacer(4);

  if (topPassed.length > 0) {
    bodyText(`The strongest signs of authenticity were: ${topPassed.map(d => d.name).join(', ')}.`);
    spacer(2);
  }
  if (failedItems.length > 0) {
    bodyText(`The areas of concern were: ${failedItems.map(d => d.name).join(', ')}.`);
  }

  // ═══════════════════════════════════════════════════════════
  // PAGES 4+ — DETAILED CHECKPOINT BREAKDOWN
  // ═══════════════════════════════════════════════════════════
  newPage();

  heading('Detailed Checkpoint Breakdown');
  y += 4;
  fullGoldDivider();

  details.forEach((cp, idx) => {
    const needsSpace = 80; // estimate for one checkpoint section
    pageCheck(needsSpace);

    const ans = cp.answer === 'pass' ? { sym: '\u2713', label: 'PASS', color: GREEN }
      : cp.answer === 'fail' ? { sym: '\u2717', label: 'FAIL', color: RED }
      : { sym: '?', label: 'UNSURE', color: MUTED };
    const imp = importanceLabel(cp.weight);
    const catLabel = (cp.category || '').charAt(0).toUpperCase() + (cp.category || '').slice(1);

    // Section header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(SUB_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.text(`${cp.name}`, M, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    doc.text(`\u2014  ${catLabel}`, M + doc.getTextWidth(cp.name) + 4, y);
    y += 8;

    // What we checked
    if (cp.description) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...GOLD);
      doc.text('What we checked:', M, y);
      y += 5.5;
      bodyTextMuted(cp.description);
      spacer(3);
    }

    // What authentic looks like
    if (cp.passDescription) {
      pageCheck(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...GOLD);
      doc.text('What authentic looks like:', M, y);
      y += 5.5;
      bodyTextMuted(cp.passDescription);
      spacer(3);
    }

    // What fake looks like
    if (cp.failDescription) {
      pageCheck(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...GOLD);
      doc.text('What fake looks like:', M, y);
      y += 5.5;
      bodyTextMuted(cp.failDescription);
      spacer(3);
    }

    // Your result
    pageCheck(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...GOLD);
    doc.text('Your result:', M, y);
    y += 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(BODY_SIZE);
    doc.setTextColor(...ans.color);
    const resultText = cp.answer === 'pass'
      ? `You marked this as ${ans.label} ${ans.sym} \u2014 This means this area looked consistent with an authentic item. This is a positive sign.`
      : cp.answer === 'fail'
      ? `You marked this as ${ans.label} ${ans.sym} \u2014 This means this area did not look right compared to what we would expect from an authentic item. This is a concern.`
      : `You marked this as ${ans.label} ${ans.sym} \u2014 This means you were not sure about this area. We recommend taking another look or asking someone more experienced.`;
    doc.setFont('helvetica', 'normal');
    const resultLines = doc.splitTextToSize(resultText, CW);
    resultLines.forEach((line) => {
      pageCheck(6);
      doc.text(line, M, y);
      y += 5.5;
    });
    spacer(3);

    // Why this matters
    if (cp.whyItMatters) {
      pageCheck(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...GOLD);
      doc.text('Why this matters:', M, y);
      y += 5.5;
      bodyTextMuted(cp.whyItMatters);
      spacer(2);
    }

    // Importance
    pageCheck(8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...LIGHT_MUTED);
    doc.text(`This checkpoint has ${imp} importance in determining authenticity.`, M, y);
    y += 4;

    // Divider between checkpoints
    if (idx < details.length - 1) {
      spacer(4);
      doc.setDrawColor(220, 218, 212);
      doc.setLineWidth(0.15);
      doc.line(M, y, M + CW, y);
      spacer(8);
    }
  });

  // ═══════════════════════════════════════════════════════════
  // RED FLAGS SECTION
  // ═══════════════════════════════════════════════════════════
  if (bag.commonFakes && bag.commonFakes.length > 0) {
    newPage();
    heading('Common Fakes: What to Watch Out For');
    y += 4;
    fullGoldDivider();

    bodyText(`Every popular luxury item has specific things that counterfeiters commonly get wrong. Here are the most common issues with fake ${bag.brand} ${bag.model} items:`);
    spacer(6);

    bag.commonFakes.forEach((flag, i) => {
      pageCheck(12);
      // Red dot + numbered
      doc.setFillColor(...RED);
      doc.circle(M + 2, y - 1.3, 1.2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...TEXT_COLOR);
      const lines = doc.splitTextToSize(flag, CW - 10);
      lines.forEach((line) => {
        pageCheck(6);
        doc.text(line, M + 8, y);
        y += 5.5;
      });
      spacer(3);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // YEAR VARIATIONS
  // ═══════════════════════════════════════════════════════════
  if (bag.yearVariations && bag.yearVariations.length > 0) {
    pageCheck(60);
    fullGoldDivider();
    heading('Model Year Variations');
    spacer(4);

    bodyText(`Luxury brands update their products over time. This means an item from 2019 might look slightly different from one made in 2024 \u2014 and that is completely normal. Here is what changed for the ${bag.brand} ${bag.model}:`);
    spacer(6);

    bag.yearVariations.forEach((v) => {
      pageCheck(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...GOLD);
      doc.text(v.year, M, y);
      y += 5.5;
      bodyTextMuted(v.detail);
      spacer(4);
    });

    spacer(2);
    bodyTextMuted('If your item has features from a different year than what the seller claims, that could be a red flag.');
  }

  // ═══════════════════════════════════════════════════════════
  // RESALE VALUE
  // ═══════════════════════════════════════════════════════════
  if (bag.resaleRange) {
    pageCheck(50);
    fullGoldDivider();
    heading('What Is This Item Worth?');
    spacer(4);

    bodyText(`Based on current market data for a ${bag.brand} ${bag.model} in ${bag.resaleRange.condition} condition:`);
    spacer(6);

    // Large price display
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...GOLD);
    const priceText = `${fmtCurrency(bag.resaleRange.low)} \u2013 ${fmtCurrency(bag.resaleRange.high)} ${bag.resaleRange.currency}`;
    doc.text(priceText, M, y);
    y += 12;

    bodyTextMuted('This estimate is based on recent sales across major resale platforms. The actual value of your specific item depends on condition, color, included accessories (box, dustbag, receipt), and current market demand.');
    spacer(4);
    bodyTextMuted('Where to check current prices: Vestiaire Collective, The RealReal, Fashionphile, and eBay completed listings.');
  }

  // ═══════════════════════════════════════════════════════════
  // WHAT TO DO NEXT
  // ═══════════════════════════════════════════════════════════
  newPage();
  heading('What to Do Next');
  y += 4;
  fullGoldDivider();

  if (percentage >= 80) {
    bodyText('Your inspection found strong signs that this item is authentic. Here is what we suggest:');
    spacer(6);
    numberedItem(1, 'Keep this report for your records \u2014 it documents what you checked and when.');
    numberedItem(2, 'If this item cost over $1,000, consider getting a professional second opinion for complete peace of mind. Services like Entrupy or Real Authentication can verify with specialized tools.');
    numberedItem(3, 'If you are buying this item, make sure to use a payment method with buyer protection (PayPal Goods & Services, credit card) so you can dispute the charge if needed.');
    numberedItem(4, 'Store your item properly in its dustbag, stuffed with tissue paper, in a cool dry place.');
  } else if (percentage >= 50) {
    bodyText('Your inspection found mixed results. Some things looked authentic but others raised questions. Here is what to do:');
    spacer(6);
    numberedItem(1, 'DO NOT complete a purchase based on this report alone.');
    numberedItem(2, 'Ask the seller for more photos of the specific areas that were marked as unsure or fail.');
    numberedItem(3, 'Get a professional authentication before spending money. This is strongly recommended.');
    numberedItem(4, 'If the seller refuses additional photos or professional authentication, walk away.');
  } else {
    bodyText('Your inspection found several warning signs. Multiple checkpoints did not match what we would expect from an authentic item. Here is what to do:');
    spacer(6);
    numberedItem(1, 'DO NOT purchase this item without professional authentication.');
    numberedItem(2, 'If you have already purchased, document everything with photos and contact the seller immediately.');
    numberedItem(3, 'If the seller will not cooperate, file a dispute with your payment provider.');
    numberedItem(4, 'Report suspicious listings to the platform where you found the item.');
  }

  // ═══════════════════════════════════════════════════════════
  // DISCLAIMER
  // ═══════════════════════════════════════════════════════════
  spacer(10);
  fullGoldDivider();
  spacer(2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...LIGHT_MUTED);
  const disclaimer = 'This report was generated by LuxeCheck, an educational authentication reference tool. It is based on the user\'s own visual inspection and does not constitute professional authentication, a guarantee of authenticity, or financial advice. For high-value purchases, always consult a qualified professional authenticator. LuxeCheck assumes no liability for purchasing decisions made based on this report.';
  const discLines = doc.splitTextToSize(disclaimer, CW);
  discLines.forEach((line) => {
    pageCheck(5);
    doc.text(line, M, y);
    y += 4;
  });

  spacer(6);
  doc.setFontSize(8);
  doc.setTextColor(...LIGHT_MUTED);
  const year = new Date().getFullYear();
  doc.text(`\u00A9 LuxeCheck ${year}`, M, y);
  doc.text(`Report ID: ${reportId}  |  Generated: ${dateStr} at ${timeStr}`, M + CW - doc.getTextWidth(`Report ID: ${reportId}  |  Generated: ${dateStr} at ${timeStr}`), y);

  addPageNumber();

  // ─── Save ─────────────────────────────────────────────────
  const filename = `LuxeCheck-${bag.brand.replace(/\s+/g, '')}-${bag.model.replace(/\s+/g, '-')}-${percentage}pct.pdf`;
  doc.save(filename);
}
