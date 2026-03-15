// Encode challenge data to a compact base64 URL parameter
// Only encodes essential fields to keep URLs short

export function encodeChallenge(data) {
  const compact = {
    b: data.brand,
    m: data.model,
    t: data.title,
    k: data.markers.map((mk) => ({
      n: mk.name,
      f: mk.isFlaw ? 1 : 0,
      e: mk.explanation,
    })),
    s: data.creatorScore ?? -1,
    tp: data.type,
  };
  const json = JSON.stringify(compact);
  // Use encodeURIComponent to handle unicode, then btoa on the encoded string
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64;
}

export function decodeChallenge(b64) {
  try {
    const json = decodeURIComponent(escape(atob(b64)));
    const c = JSON.parse(json);
    return {
      brand: c.b,
      model: c.m,
      title: c.t,
      markers: c.k.map((mk) => ({
        name: mk.n,
        isFlaw: mk.f === 1,
        explanation: mk.e,
      })),
      creatorScore: c.s === -1 ? null : c.s,
      type: c.tp || 'fake-of-the-day',
    };
  } catch {
    return null;
  }
}

// Create a challenge from a Fake of the Day entry
export function createFOTDChallenge(entry) {
  // Mix real clues (flaws) with plausible decoy markers
  const flaws = entry.clues.map((c) => ({
    name: c.marker,
    isFlaw: true,
    explanation: c.description,
  }));

  // Add 2-3 decoy markers that look plausible but aren't flaws
  const decoys = getDecoys(entry.category, flaws.map((f) => f.name));
  const markers = shuffle([...flaws, ...decoys]);

  return {
    brand: entry.brand,
    model: entry.model,
    title: entry.title,
    type: 'fake-of-the-day',
    markers,
    creatorScore: null,
  };
}

// Create a challenge from checklist results
export function createChecklistChallenge(bag, details, percentage) {
  const failedMarkers = details
    .filter((d) => d.answer === 'fail')
    .map((d) => ({
      name: d.checkpoint,
      isFlaw: true,
      explanation: d.tip || 'This marker raised concerns during inspection.',
    }));

  const passedMarkers = details
    .filter((d) => d.answer === 'pass')
    .slice(0, 3)
    .map((d) => ({
      name: d.checkpoint,
      isFlaw: false,
      explanation: 'This marker passed inspection — it matches authentic characteristics.',
    }));

  const markers = shuffle([...failedMarkers, ...passedMarkers]);

  return {
    brand: bag.brand,
    model: bag.model,
    title: `Can you spot the flaws in this ${bag.brand} ${bag.model}?`,
    type: 'checklist',
    markers,
    creatorScore: Math.round(percentage),
  };
}

// Decoy markers by category that sound plausible but aren't actually flaws
const DECOY_POOL = {
  bags: [
    { name: 'Leather grain', explanation: 'The leather grain is natural and consistent — this is a normal characteristic of genuine leather.' },
    { name: 'Patina development', explanation: 'Natural patina development over time is actually a sign of authenticity, not a flaw.' },
    { name: 'Slight color variation', explanation: 'Minor color variation in leather is normal for genuine products — it shows natural material.' },
    { name: 'Interior pocket depth', explanation: 'Pocket depth matches specifications for this model — no issues found.' },
    { name: 'Zipper alignment', explanation: 'Zipper runs smoothly and is properly aligned with the bag opening.' },
  ],
  watches: [
    { name: 'Crystal clarity', explanation: 'The sapphire crystal is clear and scratch-free — consistent with genuine materials.' },
    { name: 'Bezel action', explanation: 'Bezel rotation clicks at proper intervals with correct resistance — functioning as designed.' },
    { name: 'Lume brightness', explanation: 'Luminous material glows evenly and at expected brightness — consistent with authentic.' },
    { name: 'Crown threading', explanation: 'Crown screws down smoothly with proper threading — no issues detected.' },
  ],
  shoes: [
    { name: 'Insole cushioning', explanation: 'Insole padding and cushioning are consistent with the authentic product.' },
    { name: 'Toe box shape', explanation: 'Toe box shape and proportions match authentic specifications for this model.' },
    { name: 'Outsole flexibility', explanation: 'Sole flex point is in the correct position — consistent with genuine construction.' },
  ],
  perfume: [
    { name: 'Box seal', explanation: 'Cellophane wrap is tight and professionally applied — consistent with retail packaging.' },
    { name: 'Bottle symmetry', explanation: 'Bottle shape is symmetrical and matches authentic design specifications.' },
    { name: 'Juice color', explanation: 'Fragrance liquid color is within normal range for this product.' },
  ],
  jewelry: [
    { name: 'Clasp function', explanation: 'Clasp opens and closes smoothly with secure engagement — functioning properly.' },
    { name: 'Stone setting', explanation: 'Stones are securely set with no visible gaps — consistent with authentic craftsmanship.' },
    { name: 'Surface polish', explanation: 'Metal surface has appropriate polish level for this piece — no concerns.' },
  ],
};

function getDecoys(category, existingNames) {
  const pool = DECOY_POOL[category] || DECOY_POOL.bags;
  const available = pool.filter((d) => !existingNames.includes(d.name));
  const count = Math.min(2 + Math.floor(Math.random() * 2), available.length); // 2-3 decoys
  return shuffle(available).slice(0, count).map((d) => ({ ...d, isFlaw: false }));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
