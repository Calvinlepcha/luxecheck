const entries = [
  {
    id: 1,
    brand: 'Chanel',
    model: 'Classic Flap Medium',
    category: 'bags',
    difficulty: 'medium',
    title: 'This $3,200 Chanel Classic Flap fooled 3 resellers',
    story: 'Listed on a Facebook group as "100% authentic, bought in Paris boutique." The seller had a matching authenticity card and receipt. Two experienced resellers gave it a pass before a third noticed the stitch count was off.',
    clues: [
      { marker: 'Stitch count', description: '9 stitches per quilted diamond instead of the standard 7-8. Consistent across the entire bag.', severity: 'critical' },
      { marker: 'Chain weight', description: 'Chain strap felt noticeably lighter than authentic — likely a cheaper alloy with thin plating.', severity: 'critical' },
      { marker: 'Interior stamp', description: '"CHANEL" font spacing slightly too wide. The "A" in CHANEL has a flat top instead of a pointed apex.', severity: 'moderate' },
      { marker: 'CC turn lock', description: 'Right C overlaps at both top and bottom instead of alternating. Subtle but a definitive tell.', severity: 'critical' },
      { marker: 'Dust bag', description: 'Fabric slightly too thin and the drawstring is black instead of the correct ivory color.', severity: 'minor' },
    ],
    revealImage: 'Side-by-side: authentic quilting with 7 stitches vs fake with 9 stitches per diamond',
  },
  {
    id: 2,
    brand: 'Rolex',
    model: 'Submariner Date',
    category: 'watches',
    difficulty: 'easy',
    title: 'A "mint condition" Submariner with the most obvious tell in watchmaking',
    story: 'Found at a flea market for $800 — "estate sale find, no papers." The seller claimed it was from the 1990s. One glance at the second hand and the game was over.',
    clues: [
      { marker: 'Second hand', description: 'Ticking once per second instead of the smooth sweeping motion of a genuine Rolex mechanical movement.', severity: 'critical' },
      { marker: 'Cyclops magnification', description: 'Date magnified only about 1.5x instead of the standard 2.5x enlargement.', severity: 'critical' },
      { marker: 'Rehaut engraving', description: 'Missing the "ROLEX ROLEX ROLEX" repeated text on the inner bezel ring — this model year should have it.', severity: 'moderate' },
      { marker: 'Crown engraving', description: 'No micro-etched Rolex crown at 6 o\'clock on the crystal. Present on all genuine post-2002 models.', severity: 'critical' },
      { marker: 'Weight', description: 'About 30% lighter than an authentic Submariner. Genuine Rolex uses 904L stainless steel.', severity: 'moderate' },
    ],
    revealImage: 'Close-up: ticking quartz movement vs smooth Rolex caliber sweep',
  },
  {
    id: 3,
    brand: 'Louis Vuitton',
    model: 'Neverfull MM',
    category: 'bags',
    difficulty: 'easy',
    title: 'The monogram alignment mistake that costs counterfeiters every time',
    story: 'Purchased on Poshmark for $600 under retail. The seller had great reviews and "tons of authentic items." The canvas quality actually felt decent, but one look at the front pocket told the whole story.',
    clues: [
      { marker: 'Monogram alignment', description: 'LV pattern breaks at the front pocket seam — on authentic Neverfalls, the monogram flows seamlessly from bag to pocket.', severity: 'critical' },
      { marker: 'Stitching color', description: 'Thread is bright yellow instead of Louis Vuitton\'s characteristic mustard/ochre yellow.', severity: 'moderate' },
      { marker: 'Cinch strap stitches', description: '3 stitches per cinch tab instead of the standard 5. A well-known Neverfull authentication marker.', severity: 'critical' },
      { marker: 'Edge glazing', description: 'Glazing on the leather trim is gloppy and uneven with visible bubbles. Authentic glazing is smooth and consistent.', severity: 'moderate' },
      { marker: 'Date code format', description: 'Date code reads "SD0012" — the "00" position doesn\'t correspond to any valid production week.', severity: 'critical' },
    ],
    revealImage: 'Front pocket close-up showing monogram break vs authentic seamless flow',
  },
  {
    id: 4,
    brand: 'Gucci',
    model: 'GG Marmont Small',
    category: 'bags',
    difficulty: 'medium',
    title: 'Perfect from 3 feet away — but the hardware told a different story up close',
    story: 'Spotted at a consignment shop for $900. The leather felt good, the quilting was even, and the shape looked right. But when the authentication expert pulled out a loupe, the GG hardware revealed everything.',
    clues: [
      { marker: 'GG hardware casting', description: 'Rough casting marks and tiny burrs on the edges of the double-G logo. Authentic Marmont hardware has perfectly smooth, rounded edges.', severity: 'critical' },
      { marker: 'Heart quilting', description: 'The heart-shaped quilting detail on the back is slightly asymmetric — left lobe is larger than right.', severity: 'moderate' },
      { marker: 'Serial number tag', description: 'Font on the interior serial tag is a different weight than authentic. The numbers are slightly too bold.', severity: 'moderate' },
      { marker: 'Leather quality', description: 'Leather has an overly uniform texture with no natural grain variation. Authentic Gucci leather shows subtle natural imperfections.', severity: 'moderate' },
      { marker: 'Dust bag color', description: 'Dust bag is cream white instead of Gucci\'s correct soft camel/tan color.', severity: 'minor' },
    ],
    revealImage: 'Macro shot: authentic smooth GG edges vs fake with rough casting marks',
  },
  {
    id: 5,
    brand: 'Creed',
    model: 'Aventus',
    category: 'perfume',
    difficulty: 'hard',
    title: 'A Creed Aventus that smelled right but the numbers didn\'t add up',
    story: 'Bought from a "liquidation sale" on eBay for $180 (retail $445). The scent actually smelled close — pineapple opening, smoky base. The presentation box looked premium. But the batch code was the undoing.',
    clues: [
      { marker: 'Batch code', description: 'Code on bottle bottom doesn\'t decode on checkfresh.com — returns "unknown brand" instead of Creed production data.', severity: 'critical' },
      { marker: 'Cap weight', description: 'Cap feels hollow and lightweight compared to authentic\'s substantial, solid feel.', severity: 'moderate' },
      { marker: 'Millesime label', description: 'The millesime year designation is on a sticker rather than printed directly onto the bottle glass.', severity: 'critical' },
      { marker: 'Sprayer pattern', description: 'Produces a narrow stream instead of a fine, even mist. Authentic Creed atomizers have excellent spray dispersion.', severity: 'moderate' },
      { marker: 'Longevity', description: 'Scent faded completely within 2 hours. Authentic Aventus typically lasts 6-8+ hours on skin.', severity: 'critical' },
    ],
    revealImage: 'Bottle comparison: authentic millesime printed vs fake sticker label',
  },
  {
    id: 6,
    brand: 'Christian Louboutin',
    model: 'So Kate 120mm',
    category: 'shoes',
    difficulty: 'medium',
    title: 'The wrong shade of red that even Instagram filters couldn\'t hide',
    story: 'Listed on Depop with gorgeous photos and a "receipt from Saks." The seller shipped quickly and the box looked right. But under natural daylight, the sole color was unmistakably off.',
    clues: [
      { marker: 'Sole color', description: 'Red is a deeper, almost burgundy shade instead of Louboutin\'s specific Pantone 18-1663 bright red. Visible in natural light.', severity: 'critical' },
      { marker: 'Sole stamp font', description: '"Christian Louboutin" stamp uses a slightly different serif font — the "L" has a longer foot than authentic.', severity: 'moderate' },
      { marker: 'Interior lining', description: 'Lining feels rough and synthetic instead of smooth, supple leather.', severity: 'critical' },
      { marker: 'Heel attachment', description: 'Tiny gap visible between the heel piece and the sole. Authentic construction is seamless.', severity: 'moderate' },
      { marker: 'Lacquer finish', description: 'Red sole lacquer is matte in spots rather than uniformly glossy across the entire sole.', severity: 'minor' },
    ],
    revealImage: 'Color comparison: authentic Pantone red vs fake burgundy-tinted sole',
  },
  {
    id: 7,
    brand: 'Cartier',
    model: 'Love Bracelet',
    category: 'jewelry',
    difficulty: 'hard',
    title: 'A Love bracelet that weighed 4 grams less than it should',
    story: 'Found on a luxury consignment site for $4,200 (retail $6,900). Came with box, screwdriver, and certificate. The engraving looked clean at first glance. But a precision scale told the truth.',
    clues: [
      { marker: 'Weight', description: 'Weighs 28g instead of the correct 32g for this size in 18k yellow gold. A definitive authentication marker.', severity: 'critical' },
      { marker: 'Screw motifs', description: 'Two of the screw motifs are spaced slightly closer together than the others. Should be perfectly uniform.', severity: 'critical' },
      { marker: 'Interior engraving', description: '"Cartier" engraving depth is inconsistent — deeper on the left side than the right.', severity: 'moderate' },
      { marker: 'Screwdriver fit', description: 'The included screwdriver doesn\'t seat perfectly into the screws — slight wobble when inserted.', severity: 'moderate' },
      { marker: 'Oval shape', description: 'Bracelet is slightly more circular than oval. Authentic Love bracelets have a distinct ergonomic oval shape.', severity: 'minor' },
    ],
    revealImage: 'Scale comparison: authentic 32g vs fake 28g on precision jewelry scale',
  },
  {
    id: 8,
    brand: 'Dior',
    model: 'Saddle Bag',
    category: 'bags',
    difficulty: 'medium',
    title: 'The Dior Saddle with a clasp that wobbled like a loose tooth',
    story: 'Advertised on Instagram as "vintage Dior, excellent condition" for $1,400. The curved silhouette looked right and the leather smelled genuine. Then we tested the CD clasp.',
    clues: [
      { marker: 'CD clasp', description: 'Magnetic clasp wobbles when touched and doesn\'t snap shut firmly. Authentic closures click into place with precision.', severity: 'critical' },
      { marker: 'Shape symmetry', description: 'The signature curved shape is slightly uneven — the left side curves more dramatically than the right.', severity: 'moderate' },
      { marker: 'Stitching consistency', description: 'Stitching on the back panel has 2-3 uneven sections where spacing changes. Should be perfectly uniform throughout.', severity: 'moderate' },
      { marker: 'Interior tag', description: 'Date code format doesn\'t match Dior\'s known system. The factory code prefix is not in Dior\'s database.', severity: 'critical' },
      { marker: 'Strap hardware', description: 'Metal strap attachments have a slight greenish tint around the edges — sign of cheap base metal oxidizing.', severity: 'critical' },
    ],
    revealImage: 'Video still: authentic firm CD clasp snap vs fake wobbly closure',
  },
  {
    id: 9,
    brand: 'Hermès',
    model: 'Birkin 30',
    category: 'bags',
    difficulty: 'hard',
    title: 'A $12,000 "superfake" Birkin that passed two amateur inspections',
    story: 'Purchased through a luxury WhatsApp group with "boutique connections." The leather felt like genuine Togo, the hardware was heavy, and the pearling looked right. It took a professional with a loupe to catch the stitching angle.',
    clues: [
      { marker: 'Saddle stitch angle', description: 'Stitches slant in the same direction on both sides. Authentic Hermès saddle stitching alternates direction because two needles pass through from opposite sides.', severity: 'critical' },
      { marker: 'Craftsman stamp', description: 'The single-letter artisan ID stamp doesn\'t correspond to any known Hermès craftsman for the claimed production year.', severity: 'critical' },
      { marker: 'Pearling spacing', description: 'Pearling dots along the leather edges are slightly irregular — spacing varies by 0.5mm. Authentic pearling is machine-precise.', severity: 'moderate' },
      { marker: 'Sangles alignment', description: 'Front closure straps are offset by about 2mm when clasped. Should align perfectly center.', severity: 'moderate' },
      { marker: 'Lock weight', description: 'Padlock weighs slightly less than authentic and the "HERMES-PARIS" engraving on the lock is 0.3mm too shallow.', severity: 'moderate' },
    ],
    revealImage: 'Magnified stitching: authentic alternating slant vs fake uniform slant',
  },
  {
    id: 10,
    brand: 'Omega',
    model: 'Speedmaster Professional',
    category: 'watches',
    difficulty: 'medium',
    title: 'A Moonwatch that never could have gone to space',
    story: 'Found on Chrono24 from a seller with limited feedback, priced $1,500 below market. The watch looked great in photos. In person, the pushers and caseback told a very different story.',
    clues: [
      { marker: 'Caseback engravings', description: 'The Speedmaster seahorse logo on the caseback is soft and lacks depth. Authentic engravings are sharp and precisely detailed.', severity: 'critical' },
      { marker: 'Pushers', description: 'Chronograph pushers feel mushy and imprecise. Authentic Speedmaster pushers have a crisp, mechanical click.', severity: 'critical' },
      { marker: 'Dial printing', description: 'Under 10x magnification, "OMEGA" text on the dial shows slight bleeding at the letter edges.', severity: 'moderate' },
      { marker: 'Lume consistency', description: 'Luminous plots on hour markers glow unevenly in the dark — some brighter than others.', severity: 'moderate' },
      { marker: 'Bracelet clasp', description: 'Omega logo on the clasp is slightly off-center and the folding mechanism feels loose.', severity: 'minor' },
    ],
    revealImage: 'Caseback detail: authentic crisp seahorse vs fake soft engraving',
  },
  {
    id: 11,
    brand: 'Louis Vuitton',
    model: 'Speedy 25 Bandoulière',
    category: 'bags',
    difficulty: 'easy',
    title: 'The LV Speedy that smelled like a chemistry lab',
    story: 'Bought on eBay for $450 "barely used, like new." When the box arrived, opening the dust bag released a strong chemical odor that filled the entire room. That was red flag number one of many.',
    clues: [
      { marker: 'Chemical smell', description: 'Overwhelming chemical/plastic smell. Authentic LV canvas has a neutral, faintly earthy scent.', severity: 'critical' },
      { marker: 'Canvas texture', description: 'Canvas feels smooth and plasticky to the touch. Authentic Monogram canvas has a subtle textured grain.', severity: 'critical' },
      { marker: 'Upside-down monogram', description: 'LV monogram is right-side-up on both sides. On authentic Speedy bags, one side should have the monogram upside-down.', severity: 'critical' },
      { marker: 'Zipper pull', description: 'Zipper pull has no "LV" stamp and feels lightweight. Authentic pulls are stamped and heavy brass.', severity: 'moderate' },
      { marker: 'Handles', description: 'Handles are a dark tan color out of the box. Authentic new vachetta leather starts very pale cream.', severity: 'moderate' },
    ],
    revealImage: 'Canvas close-up: authentic textured grain vs fake smooth plastic feel',
  },
  {
    id: 12,
    brand: 'Prada',
    model: 'Re-Edition 2005 Nylon',
    category: 'bags',
    difficulty: 'medium',
    title: 'The tiny letter "R" that gave away a $900 Prada fake',
    story: 'Found at a weekend pop-up market that claimed to sell "overstock luxury." The nylon felt dense and the shape was right. But a close look at the triangle logo plaque under phone magnification revealed the telltale detail.',
    clues: [
      { marker: 'Triangle logo R', description: 'The "R" in PRADA has a standard curved leg. Authentic Prada uses a distinctive R with a notched leg — this is one of the most reliable micro-tells.', severity: 'critical' },
      { marker: 'Plaque attachment', description: 'Triangle plaque edges have tiny glue residue visible. Authentic plaques are riveted, never glued.', severity: 'critical' },
      { marker: 'Interior tag', description: 'White fabric tag has slightly fuzzy text edges. Authentic Prada interior tags have razor-sharp printing.', severity: 'moderate' },
      { marker: 'Nylon density', description: 'Nylon weave is slightly looser than genuine Pocono fabric. Authentic feels more substantial and structured.', severity: 'moderate' },
      { marker: 'Zipper brand', description: 'Zipper has no brand marking. Authentic Prada uses branded zippers with "Prada" engraved on pulls.', severity: 'minor' },
    ],
    revealImage: 'Macro: authentic Prada R with notched leg vs fake standard R',
  },
  {
    id: 13,
    brand: 'Patek Philippe',
    model: 'Nautilus 5711',
    category: 'watches',
    difficulty: 'hard',
    title: 'A six-figure Nautilus replica that even fooled a pawn shop',
    story: 'Brought into a luxury pawn shop with "all original papers." The case finishing looked premium and the weight felt right. But when the watchmaker opened the caseback, the movement decoration was the giveaway.',
    clues: [
      { marker: 'Movement finishing', description: 'Geneva stripes are printed/painted on rather than actually machined into the metal. Under magnification, the stripes lack depth.', severity: 'critical' },
      { marker: 'Bezel transitions', description: 'The sharp transition between brushed and polished surfaces on the octagonal bezel is slightly rounded. Authentic has razor-sharp edges.', severity: 'critical' },
      { marker: 'Dial texture', description: 'Horizontal embossing on the blue dial is shallower than authentic. Under side lighting, the pattern barely catches light.', severity: 'moderate' },
      { marker: 'Crown logo', description: 'Calatrava cross on the crown has slightly thick arms — authentic is more delicate and proportioned.', severity: 'moderate' },
      { marker: 'Bracelet articulation', description: 'Links have very slight play/rattle when shaken. Authentic Nautilus bracelet is tight and silent.', severity: 'minor' },
    ],
    revealImage: 'Movement comparison: authentic machined Geneva stripes vs painted/printed',
  },
  {
    id: 14,
    brand: 'Gucci',
    model: 'Dionysus GG Supreme',
    category: 'bags',
    difficulty: 'medium',
    title: 'The tiger head clasp that was smooth as a bowling ball',
    story: 'Purchased from a "trusted seller" on Reddit\'s fashion marketplace for $800. The GG Supreme canvas looked decent and the bag shape was correct. But the signature tiger head clasp gave it away immediately.',
    clues: [
      { marker: 'Tiger head detail', description: 'The double tiger/lion head clasp is completely smooth — missing the detailed fur/mane texture that authentic Dionysus clasps have.', severity: 'critical' },
      { marker: 'Clasp mechanism', description: 'Push closure feels loose and wobbly. Authentic clicks shut with a firm, satisfying snap.', severity: 'critical' },
      { marker: 'Canvas sheen', description: 'GG Supreme canvas has an overly glossy coating. Authentic has a subtle, matte-to-slight sheen.', severity: 'moderate' },
      { marker: 'Suede interior flap', description: 'Interior suede flap feels rough and synthetic. Authentic suede is soft with an even, consistent nap.', severity: 'moderate' },
      { marker: 'Serial number format', description: 'Serial tag has 11 digits instead of Gucci\'s standard format of two rows (style number over supplier code).', severity: 'critical' },
    ],
    revealImage: 'Tiger head close-up: authentic detailed texture vs fake smooth surface',
  },
  {
    id: 15,
    brand: 'Tiffany & Co.',
    model: 'Return to Tiffany Heart Tag Necklace',
    category: 'jewelry',
    difficulty: 'easy',
    title: 'The Tiffany blue that wasn\'t quite Tiffany enough',
    story: 'Gifted by a friend who bought it from a market stall on vacation. The heart tag looked decent and had "925" stamped on it. But the packaging color was the first hint something was off.',
    clues: [
      { marker: 'Box color', description: 'Tiffany Blue is off by several shades — too green compared to the authentic Pantone 1837 Blue. The most common packaging tell.', severity: 'critical' },
      { marker: 'Engraving depth', description: '"Please Return to Tiffany & Co New York" engraving is shallow and slightly blurry. Authentic is deep and crisp.', severity: 'critical' },
      { marker: 'Chain quality', description: 'Chain links are visibly uneven in size and the necklace feels lightweight for sterling silver.', severity: 'moderate' },
      { marker: 'T&Co stamp', description: '"T&Co" stamp on the clasp is barely legible and poorly positioned.', severity: 'moderate' },
      { marker: 'Tarnish pattern', description: 'Piece tarnished black within a week of regular wear. Genuine Tiffany sterling tarnishes slowly with a warm patina.', severity: 'minor' },
    ],
    revealImage: 'Box comparison: authentic Tiffany Blue vs fake greenish-blue imitation',
  },
  {
    id: 16,
    brand: 'Tom Ford',
    model: 'Oud Wood EDP',
    category: 'perfume',
    difficulty: 'medium',
    title: 'An Oud Wood that smelled flat and one-dimensional',
    story: 'Bought from an Amazon third-party seller for 40% off retail. The box and bottle looked convincing at first. But the first spray on skin revealed a fragrance that was a shadow of the real thing.',
    clues: [
      { marker: 'Scent profile', description: 'Fragrance is one-dimensional — smells only of generic oud with no complexity. Authentic has layered rosewood, cardamom, and tonka bean notes.', severity: 'critical' },
      { marker: 'Label alignment', description: 'Front label is tilted about 2 degrees to the right. Authentic Tom Ford labels are perfectly centered and straight.', severity: 'moderate' },
      { marker: 'Cap mechanism', description: 'Cap just sits on top loosely. Authentic Tom Ford caps are magnetic with a satisfying close.', severity: 'critical' },
      { marker: 'Bottle weight', description: 'Bottle feels 30% lighter than expected — thin glass instead of the heavy, premium glass Tom Ford uses.', severity: 'moderate' },
      { marker: 'Longevity', description: 'Scent completely gone after 90 minutes. Authentic Oud Wood typically lasts 6-8 hours on skin.', severity: 'critical' },
    ],
    revealImage: 'Label detail: authentic perfectly centered vs fake tilted label',
  },
  {
    id: 17,
    brand: 'Chanel',
    model: 'Boy Bag Old Medium',
    category: 'bags',
    difficulty: 'hard',
    title: 'A Chanel Boy Bag with hardware that was almost right — almost',
    story: 'Consigned at a boutique resale shop for $3,800. The aged/ruthenium hardware looked correct, the quilting was flat like it should be, and the chain felt heavy. But "almost right" is still wrong.',
    clues: [
      { marker: 'CC clasp edges', description: 'Edges of the large CC clasp logo are slightly uneven — right C is 0.5mm thicker than left. Should be perfectly symmetrical.', severity: 'critical' },
      { marker: 'Hardware finish', description: 'Aged gold finish has slight orange undertones. Authentic ruthenium/aged gold has a cool, deliberate antique quality.', severity: 'moderate' },
      { marker: 'Chain links', description: 'Three chain links in the strap are visibly different in size. All links should be perfectly uniform.', severity: 'critical' },
      { marker: 'Interior stamp font', description: '"CHANEL" interior stamp uses a slightly different weight than authentic — letters are about 5% bolder.', severity: 'moderate' },
      { marker: 'Back pocket', description: 'Back pocket opening is slightly off-center relative to the quilting pattern.', severity: 'minor' },
    ],
    revealImage: 'CC clasp macro: authentic symmetrical vs fake uneven edge thickness',
  },
  {
    id: 18,
    brand: 'Nike',
    model: 'Air Jordan 1 Retro High OG "Chicago"',
    category: 'shoes',
    difficulty: 'medium',
    title: 'The Jordans where the tongue label font was 1 pixel off',
    story: 'Purchased from a StockX alternative marketplace for $280. Box label matched, shoe shape looked right, the leather felt real. But sneaker authentication is all about the tiny details.',
    clues: [
      { marker: 'Tongue label font', description: 'Font weight on the Nike Air tongue label is slightly bolder than retail pairs. The spacing between "NIKE" and "AIR" is 1mm too wide.', severity: 'critical' },
      { marker: 'Sole glue', description: 'Visible glue overflow along the sole-to-upper junction on both shoes. Authentic pairs have clean, invisible bonding.', severity: 'moderate' },
      { marker: 'SKU mismatch', description: 'SKU on the size tag inside differs from the box label by one digit. These must always match exactly.', severity: 'critical' },
      { marker: 'Leather tumbling', description: 'Red leather panels have less tumbling/texture than authentic. Looks slightly too smooth and uniform.', severity: 'moderate' },
      { marker: 'Wings logo', description: 'Wings logo debossing on the collar is slightly too deep compared to retail depth.', severity: 'minor' },
    ],
    revealImage: 'Tongue label comparison: authentic font weight vs fake bolder text',
  },
  {
    id: 19,
    brand: 'Van Cleef & Arpels',
    model: 'Alhambra Necklace',
    category: 'jewelry',
    difficulty: 'hard',
    title: 'The Alhambra clover that wasn\'t perfectly symmetrical',
    story: 'Purchased from a jewelry dealer at an antique fair for $3,100. The mother of pearl looked genuine and the gold had proper hallmarks. It took a jeweler with calipers to find the dimensional issue.',
    clues: [
      { marker: 'Clover symmetry', description: 'Left lobe of the clover is 0.3mm wider than the right. Authentic VCA Alhambra has perfect bilateral symmetry.', severity: 'critical' },
      { marker: 'Beading uniformity', description: 'Tiny beads around the clover edge vary slightly in size. Three beads on the lower left are visibly smaller.', severity: 'critical' },
      { marker: 'Clasp stamp', description: '"VCA" stamp on the clasp is present but the engraving depth is inconsistent — shallower on the "A."', severity: 'moderate' },
      { marker: 'Mother of pearl', description: 'Stone sits very slightly recessed from the beaded edge. Authentic stones are perfectly flush.', severity: 'moderate' },
      { marker: 'Chain length', description: 'Chain is 42.5cm instead of the standard 42cm. A subtle but measurable discrepancy.', severity: 'minor' },
    ],
    revealImage: 'Caliper measurement: authentic perfect symmetry vs fake 0.3mm asymmetry',
  },
  {
    id: 20,
    brand: 'Bvlgari',
    model: 'B.zero1 Ring',
    category: 'jewelry',
    difficulty: 'medium',
    title: 'The BVLGARI engraving that was too perfect to be real',
    story: 'Bought through a luxury Facebook group for $500 (retail $1,100). The rose gold color looked right and the spiral design was correct. Ironically, the overly perfect engraving was the tell.',
    clues: [
      { marker: 'Engraving precision', description: 'BVLGARI BVLGARI engraving is laser-perfect with identical depth throughout. Authentic has very subtle hand-finished variation.', severity: 'moderate' },
      { marker: 'Ring proportions', description: 'Band is 0.5mm thinner than authentic for this size. The spiral turns are slightly compressed.', severity: 'critical' },
      { marker: 'Gold hallmark', description: '750 hallmark is present but placed 2mm from where Bvlgari typically stamps it.', severity: 'moderate' },
      { marker: 'Weight', description: 'Ring weighs 8.2g instead of the expected 9.5g for 18k rose gold in this size.', severity: 'critical' },
      { marker: 'Edge finish', description: 'Top and bottom edges of the spiral have a slightly sharp feel. Authentic has perfectly smooth, comfortable edges.', severity: 'minor' },
    ],
    revealImage: 'Engraving detail: authentic slight variation vs fake laser-uniform depth',
  },
  {
    id: 21,
    brand: 'Yeezy',
    model: 'Boost 350 V2 "Zebra"',
    category: 'shoes',
    difficulty: 'easy',
    title: 'The Yeezys where the Boost sole felt like a yoga mat',
    story: 'Bought from a classmate for $150. The primeknit pattern looked right in photos. In person, one squeeze of the sole told the story — the Boost technology was completely absent.',
    clues: [
      { marker: 'Boost sole', description: 'Sole is firm and unyielding like rubber — no squish or bounce at all. Real Boost foam is soft and springs back immediately.', severity: 'critical' },
      { marker: 'Pull tab angle', description: 'Rear pull tab is perpendicular to the heel. Authentic Zebras have the pull tab angled at approximately 33 degrees.', severity: 'critical' },
      { marker: 'Box label font', description: 'Font on the box label is a generic sans-serif. Authentic Adidas uses a specific typeface with particular kerning.', severity: 'moderate' },
      { marker: 'Interior size tag', description: 'Size tag format is wrong — missing the QR code that authentic 350 V2s have since 2019 production.', severity: 'moderate' },
      { marker: 'Primeknit pattern', description: 'Zebra stripe pattern continues 3mm too far toward the toe box compared to authentic.', severity: 'minor' },
    ],
    revealImage: 'Sole cross-section: authentic Boost pellets visible vs fake solid rubber',
  },
  {
    id: 22,
    brand: 'Maison Francis Kurkdjian',
    model: 'Baccarat Rouge 540',
    category: 'perfume',
    difficulty: 'medium',
    title: 'A Baccarat Rouge 540 that was too sweet and too simple',
    story: 'Purchased from a perfume discount website advertising "tester bottles at wholesale prices." The box embossing looked clean and the bottle was the right shape. But the scent revealed the truth.',
    clues: [
      { marker: 'Scent composition', description: 'Overwhelmingly sweet and one-note. Authentic BR540 has a complex saffron-cedar-ambergris interplay that evolves over hours.', severity: 'critical' },
      { marker: 'Box embossing', description: 'Embossed text on the box is slightly raised but lacks the crisp edge definition of authentic. Letters feel soft and rounded.', severity: 'moderate' },
      { marker: 'Batch code verification', description: 'Batch code on checkfresh.com returns a production date 2 years in the future — impossible for a current sale.', severity: 'critical' },
      { marker: 'Cap precision', description: 'Cap has about 1mm of play when seated — rocks slightly when touched. Authentic fits precisely with zero movement.', severity: 'moderate' },
      { marker: 'Glass clarity', description: 'Bottle glass has a very slight greenish tint. Authentic MFK glass is perfectly clear.', severity: 'minor' },
    ],
    revealImage: 'Box embossing: authentic sharp edges vs fake soft, rounded text',
  },
  {
    id: 23,
    brand: 'Hermès',
    model: 'Kelly 28 Sellier',
    category: 'bags',
    difficulty: 'hard',
    title: 'The Kelly with rivets that were 0.2mm too proud of the surface',
    story: 'Purchased through a luxury consignment app for $9,500 with "full set." The Epsom leather felt correct and structured. The turn lock had a satisfying weight. An Hermès specialist found what others missed.',
    clues: [
      { marker: 'Rivet flush', description: 'Handle attachment rivets sit 0.2mm above the leather surface. On authentic Sellier Kellys, rivets are perfectly flush — this is a hallmark of Hermès precision.', severity: 'critical' },
      { marker: 'Blind stamp alignment', description: 'Year stamp and artisan ID are positioned 1mm further apart than authentic spacing. Hermès is consistent to the tenth of a millimeter.', severity: 'moderate' },
      { marker: 'Sangles proportion', description: 'Front closure straps are 2mm wider than authentic specifications for the Kelly 28 size.', severity: 'moderate' },
      { marker: 'Feet placement', description: 'Bottom feet are spaced asymmetrically — left pair is 1mm closer together than right pair.', severity: 'critical' },
      { marker: 'Turn lock engraving', description: '"HERMES-PARIS" on the turn lock has a hyphen that\'s slightly too long compared to authentic.', severity: 'minor' },
    ],
    revealImage: 'Side profile: authentic flush rivets vs fake slightly raised rivets',
  },
  {
    id: 24,
    brand: 'Bottega Veneta',
    model: 'Cassette Bag',
    category: 'bags',
    difficulty: 'medium',
    title: 'The intrecciato weave with strips that were 1mm too wide',
    story: 'Found at an upscale thrift shop in a wealthy neighborhood for $400. The butter-soft leather felt incredible and the color was beautiful. But the weave proportions were subtly wrong.',
    clues: [
      { marker: 'Strip width', description: 'Each woven leather strip is 1mm wider than authentic Cassette specifications. Visible when you know what to look for.', severity: 'critical' },
      { marker: 'Edge paint', description: 'Three strips on the right side have uneven edge paint — thin spots where the raw leather shows through.', severity: 'moderate' },
      { marker: 'Weave tension', description: 'Strips are slightly loose in two spots on the front panel — creating tiny gaps. Authentic weave is tight and gapless.', severity: 'moderate' },
      { marker: 'Interior stamp', description: '"BOTTEGA VENETA" stamp is correctly spelled but positioned 3mm lower than authentic placement.', severity: 'moderate' },
      { marker: 'Triangle hardware', description: 'The small triangular Bottega hardware accent on the strap has a matte finish instead of the correct subtle sheen.', severity: 'minor' },
    ],
    revealImage: 'Weave detail: authentic tight, precisely-sized strips vs fake wider loose strips',
  },
  {
    id: 25,
    brand: 'Tag Heuer',
    model: 'Carrera Chronograph',
    category: 'watches',
    difficulty: 'easy',
    title: 'The Tag Heuer where the subdials told time in their own universe',
    story: 'Purchased from a street vendor in a tourist area for $120 "fell off a truck." Obviously suspicious, but it made for a great educational teardown.',
    clues: [
      { marker: 'Subdial function', description: 'Chronograph subdials are decorative only — the pushers don\'t actually activate any chronograph function.', severity: 'critical' },
      { marker: 'Dial printing', description: 'TAG Heuer logo uses a noticeably wrong font — letters are too thick and "Heuer" is in italic instead of regular weight.', severity: 'critical' },
      { marker: 'Caseback', description: 'Caseback is smooth stainless steel with no engravings. Authentic has model reference, serial number, and water resistance markings.', severity: 'critical' },
      { marker: 'Crown feel', description: 'Crown pulls out with no resistance and has no winding action. Authentic has a precision-feel crown with detented positions.', severity: 'moderate' },
      { marker: 'Bracelet', description: 'Bracelet links rattle audibly when shaken. Authentic Tag Heuer bracelets are tight and silent.', severity: 'moderate' },
    ],
    revealImage: 'Caseback: authentic detailed engravings vs fake blank smooth steel',
  },
  {
    id: 26,
    brand: 'Saint Laurent',
    model: 'Loulou Medium',
    category: 'bags',
    difficulty: 'medium',
    title: 'The YSL Loulou where the Y didn\'t look like a Y',
    story: 'Listed on The RealReal and flagged during their authentication process — the consignor insisted it was purchased at the YSL boutique in Milan. Close inspection of the hardware caught the fake.',
    clues: [
      { marker: 'YSL logo proportions', description: 'The "Y" in the interlocking YSL logo is too narrow — the spread of the Y arms is about 15% less than authentic.', severity: 'critical' },
      { marker: 'Logo hardware weight', description: 'YSL hardware piece feels lighter than authentic — about 20% less weight in hand.', severity: 'critical' },
      { marker: 'Chevron quilting', description: 'Y-shaped quilting depth varies — deeper on the left side than the right. Should be perfectly uniform.', severity: 'moderate' },
      { marker: 'Chain strap', description: 'Chain links have a visible seam/join point. Authentic chain links are seamlessly closed.', severity: 'moderate' },
      { marker: 'Interior stamp era', description: 'Stamp reads "Yves Saint Laurent" but the bag model only launched after the rebrand to "SAINT LAURENT PARIS."', severity: 'critical' },
    ],
    revealImage: 'YSL logo overlay: authentic Y spread vs fake narrow Y',
  },
  {
    id: 27,
    brand: 'Audemars Piguet',
    model: 'Royal Oak 15500ST',
    category: 'watches',
    difficulty: 'hard',
    title: 'Eight hexagonal screws — and not a single one was properly aligned',
    story: 'Offered by a "watch dealer" at a luxury car event for $18,000 cash. The tapisserie dial looked impressive and the case finishing seemed high quality. But the Royal Oak\'s most iconic feature betrayed it.',
    clues: [
      { marker: 'Screw alignment', description: 'The 8 hexagonal bezel screws are randomly oriented. On authentic Royal Oaks, every screw slot is aligned to the same precise angle.', severity: 'critical' },
      { marker: 'Tapisserie depth', description: 'Waffle-pattern dial is noticeably shallow — barely catches light at angles. Authentic tapisserie has deep, crisp squares.', severity: 'critical' },
      { marker: 'Case transition', description: 'Brushed-to-polished surface transitions are slightly rounded instead of razor-sharp. AP finishing is legendary for sharp transitions.', severity: 'moderate' },
      { marker: 'AP logo', description: 'AP logo on the dial appears printed/painted rather than applied (raised metal). Modern 15500 models use applied logos.', severity: 'moderate' },
      { marker: 'Date font', description: 'Date window font is a generic sans-serif. Authentic uses AP\'s specific date font with particular number proportions.', severity: 'minor' },
    ],
    revealImage: 'Bezel close-up: authentic aligned screws vs fake random orientation',
  },
  {
    id: 28,
    brand: 'Fendi',
    model: 'Baguette',
    category: 'bags',
    difficulty: 'medium',
    title: 'The Fendi Baguette with double-Fs that bled into each other',
    story: 'Found at a vintage market labeled "90s original Fendi" for $350. The silhouette was correct and the snap closure worked. But the FF print quality was clearly not up to Fendi standards.',
    clues: [
      { marker: 'FF Zucca print', description: 'The double-F logo print shows bleeding at the edges — Fs are fuzzy and slightly merge into the background. Authentic print is crisp and sharp.', severity: 'critical' },
      { marker: 'Snap closure', description: 'Magnetic snap is weak — opens with gentle pressure. Authentic snaps shut firmly and require deliberate force to open.', severity: 'moderate' },
      { marker: 'FENDI ROMA stamp', description: '"FENDI" interior stamp uses a slightly rounded font. Authentic uses a specific angular, geometric typeface.', severity: 'critical' },
      { marker: 'Serial hologram', description: 'Hologram sticker doesn\'t shift colors when tilted — appears as a static silver sticker. Authentic holograms are dynamic.', severity: 'critical' },
      { marker: 'Strap hardware', description: 'D-ring connectors where the strap meets the bag are a slightly different gold tone than the snap closure.', severity: 'minor' },
    ],
    revealImage: 'FF print macro: authentic crisp Fs vs fake bleeding, fuzzy Fs',
  },
  {
    id: 29,
    brand: 'Celine',
    model: 'Triomphe Canvas Teen',
    category: 'bags',
    difficulty: 'medium',
    title: 'The Céline with an accent that shouldn\'t have been there',
    story: 'Purchased from an Instagram boutique account for $1,200. The Triomphe canvas looked good in photos. But one detail on the interior stamp revealed the seller didn\'t know their Celine history.',
    clues: [
      { marker: 'Interior stamp accent', description: 'Stamp reads "CÉLINE" with an accent on the E. Post-2018 bags under Hedi Slimane should read "CELINE" without the accent. A model from this era with the old spelling is wrong.', severity: 'critical' },
      { marker: 'Canvas weave direction', description: 'Triomphe C pattern runs at a slightly different angle than authentic. The interlocking Cs should follow a precise diagonal.', severity: 'moderate' },
      { marker: 'Hardware color', description: 'Brass hardware has an overly warm, orange-tinted gold. Authentic Celine brass has a cooler, more refined tone.', severity: 'moderate' },
      { marker: 'Canvas texture', description: 'Canvas feels slightly papery and stiff. Authentic Triomphe canvas has a coated, structured feel with slight flexibility.', severity: 'moderate' },
      { marker: 'Closure click', description: 'Clasp closure mechanism is slightly loose and doesn\'t click with the same precision as authentic.', severity: 'minor' },
    ],
    revealImage: 'Interior stamp: authentic post-2018 "CELINE" vs fake with accent "CÉLINE"',
  },
  {
    id: 30,
    brand: 'Le Labo',
    model: 'Santal 33',
    category: 'perfume',
    difficulty: 'easy',
    title: 'The Santal 33 where the typewriter label was clearly inkjet',
    story: 'Bought from a fragrance discount website that claimed to sell "overstock from Nordstrom." The bottle shape was correct but the signature Le Labo label — normally typed on a typewriter in-store — looked like it came from a home printer.',
    clues: [
      { marker: 'Label printing', description: 'Label text is clearly inkjet-printed with smooth, uniform characters. Authentic Le Labo labels have distinctive typewriter font with slight character irregularities.', severity: 'critical' },
      { marker: 'Label personalization', description: 'Label has no purchaser name or date — just the fragrance name. Authentic Le Labo bottles always include the buyer\'s name and purchase date.', severity: 'critical' },
      { marker: 'Bottle weight', description: 'Bottle feels lighter than expected — glass is thinner than authentic Le Labo\'s heavy, pharmacy-style bottles.', severity: 'moderate' },
      { marker: 'Scent accuracy', description: 'Opening is aggressively woody with no complexity. Authentic Santal 33 has cardamom, iris, and violet notes alongside sandalwood.', severity: 'critical' },
      { marker: 'Cap fit', description: 'Black cap sits loosely on the bottle neck. Authentic cap fits precisely with a satisfying seal.', severity: 'minor' },
    ],
    revealImage: 'Label comparison: authentic typewriter characters vs fake inkjet print',
  },
];

// Get today's entry — cycles through 30 entries based on day of year
export function getTodayEntry() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  const idx = dayOfYear % entries.length;
  return entries[idx];
}

// Get entry for a specific number of days ago
export function getEntryDaysAgo(daysAgo) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000) - daysAgo;
  const idx = ((dayOfYear % entries.length) + entries.length) % entries.length;
  return entries[idx];
}

// Get the last N days of entries (for "Previous Days" section)
export function getRecentEntries(count = 7) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push({ entry: getEntryDaysAgo(i), daysAgo: i });
  }
  return result;
}

// Streak tracking via localStorage
const STREAK_KEY = 'luxecheck_fotd_streak';
const LAST_VISIT_KEY = 'luxecheck_fotd_last_visit';

export function getStreak() {
  try {
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    if (!lastVisit) return 0;

    const last = new Date(lastVisit);
    const now = new Date();
    const diffDays = Math.floor((now - last) / 86400000);

    // If more than 1 day since last visit, streak is broken
    if (diffDays > 1) return 0;
    return streak;
  } catch {
    return 0;
  }
}

export function recordVisit() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    if (lastVisit === today) {
      // Already visited today
      return parseInt(localStorage.getItem(STREAK_KEY) || '1', 10);
    }

    const last = lastVisit ? new Date(lastVisit) : null;
    const now = new Date(today);
    const diffDays = last ? Math.floor((now - last) / 86400000) : 999;

    let streak;
    if (diffDays === 1) {
      // Consecutive day — increment streak
      streak = (parseInt(localStorage.getItem(STREAK_KEY) || '0', 10)) + 1;
    } else {
      // Streak broken or first visit
      streak = 1;
    }

    localStorage.setItem(STREAK_KEY, String(streak));
    localStorage.setItem(LAST_VISIT_KEY, today);
    return streak;
  } catch {
    return 1;
  }
}

export default entries;
