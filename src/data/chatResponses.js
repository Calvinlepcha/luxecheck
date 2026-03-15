const responses = [
  // GENERAL AUTHENTICATION
  {
    keywords: ['spot', 'fake', 'tell', 'real', 'authentic'],
    specificity: 1,
    response:
      'There are three key things to always check first:\n\n' +
      '1. **Stitching quality** — Authentic bags have perfectly even, consistent stitching with waxed thread. Uneven spacing or loose threads are red flags.\n\n' +
      '2. **Hardware weight** — Genuine hardware feels heavy and solid with clean engravings. Counterfeit hardware is noticeably lighter and often feels hollow.\n\n' +
      '3. **Material feel** — Real leather and coated canvas have a distinct texture and weight. If it feels plasticky or papery, be cautious.\n\n' +
      'Keep in mind that no single marker proves authenticity on its own — always check multiple indicators together.',
    followUp: ['What about stitching?', 'Hardware tips', 'Professional services'],
  },
  {
    keywords: ['datecode', 'date code', 'serial'],
    specificity: 2,
    response:
      'A **date code** is a series of letters and numbers stamped inside a bag that indicates where and when it was manufactured.\n\n' +
      'For **Louis Vuitton**, the format uses two letters (factory code) followed by four numbers (week and year of production). For example, "FL1029" means it was made in the FL factory during the 10th week of 2019.\n\n' +
      'Important: Since **March 2021**, Louis Vuitton has replaced date codes with embedded **NFC microchips**. So newer bags won\'t have a visible date code at all — and that\'s normal.\n\n' +
      'Other brands use different serial number systems. Chanel uses 7-8 digit serial numbers on stickers, and Gucci has serial number tags sewn into the lining.',
    followUp: ['What are microchips?', 'Louis Vuitton tips', 'Chanel serial info'],
  },
  {
    keywords: ['microchip', 'chip', 'nfc', 'rfid'],
    specificity: 3,
    response:
      'Starting in **2021**, Louis Vuitton began embedding **NFC microchips** in their products, replacing the traditional date codes. These chips are hidden inside the bag and can be read with a smartphone\'s NFC reader.\n\n' +
      'The chip contains manufacturing information and helps verify authenticity. You can scan it by holding your phone near the bag — the exact location varies by model but is usually near where the old date code would have been.\n\n' +
      'Chanel also moved to microchips in late 2021, discontinuing their hologram stickers and authenticity cards. This is part of a broader industry trend toward digital authentication.',
    followUp: ['Date code format', 'LV authentication tips', 'Chanel serial info'],
  },
  {
    keywords: ['worth', 'value', 'resale', 'sell', 'price'],
    specificity: 1,
    response:
      'Resale value depends on several factors:\n\n' +
      '- **Brand & model** — Hermès Birkins, Chanel Classic Flaps, and LV Neverfills consistently hold or increase in value\n' +
      '- **Condition** — Excellent condition bags with minimal wear command significantly higher prices\n' +
      '- **Completeness** — Having the original box, dustbag, receipt, and authenticity card adds 10-20% to value\n' +
      '- **Market demand** — Discontinued styles or limited editions can appreciate over time\n\n' +
      'For current market pricing, check platforms like **Vestiaire Collective**, **The RealReal**, **Fashionphile**, or **Rebag** to see what comparable bags are selling for.',
    followUp: ['Where to buy safely', 'Professional authenticators', 'Storage tips'],
  },
  {
    keywords: ['professional', 'authenticator', 'expert', 'service'],
    specificity: 2,
    response:
      'For high-value purchases, I always recommend getting a **professional authentication** before committing. Here are trusted options:\n\n' +
      '- **Entrupy** — Uses AI and microscopic photography to verify authenticity. Many resellers use this service.\n' +
      '- **Real Authentication** — Expert-based service with detailed reports. Accepts photo submissions.\n' +
      '- **Authenticate First** — Offers quick turnaround authentication for most luxury brands.\n\n' +
      'Most services cost between $10-$50 depending on the brand and turnaround time. That\'s a small price for peace of mind on a purchase worth hundreds or thousands.\n\n' +
      'Remember: LuxeCheck is an educational guide — for high-value transactions, professional verification is always worth the investment.',
    followUp: ['How do I spot a fake?', 'Where to buy safely', 'Is my bag worth reselling?'],
  },
  {
    keywords: ['receipt', 'box', 'dustbag', 'packaging'],
    specificity: 2,
    response:
      'Here\'s the truth about packaging: **it alone doesn\'t prove authenticity**. Counterfeiters are very good at replicating boxes, dustbags, ribbons, and even receipts.\n\n' +
      'However, packaging can add confidence when combined with other checks:\n\n' +
      '- **Receipts** with matching serial numbers and correct store formatting are a good sign\n' +
      '- **Dustbags** should have the correct font, color, and material for the brand and era\n' +
      '- **Boxes** should be the correct size and style for the specific model\n\n' +
      'Be especially skeptical if a seller emphasizes "comes with everything" as a selling point — the bag itself should be the proof, not the accessories around it.',
    followUp: ['How do I spot a fake?', 'Professional services', 'What about datecodes?'],
  },
  {
    keywords: ['where', 'buy', 'safe', 'trusted', 'legit'],
    specificity: 1,
    response:
      'For pre-owned luxury bags, stick to platforms with **built-in authentication**:\n\n' +
      '- **Vestiaire Collective** — Items are physically inspected before shipping to the buyer\n' +
      '- **The RealReal** — Has in-house authentication experts and gemologists\n' +
      '- **Fashionphile** — One of the most trusted resellers, operates out of a massive facility in NYC\n' +
      '- **Rebag** — Offers the "Clair" tool for instant bag valuations and thorough authentication\n\n' +
      'Avoid buying from social media sellers or unverified marketplaces unless you can get the item professionally authenticated before finalizing payment. And always use a payment method with buyer protection.',
    followUp: ['Professional authenticators', 'Is my bag worth reselling?', 'How do I spot a fake?'],
  },
  {
    keywords: ['refund', 'return', 'scam', 'scammed'],
    specificity: 2,
    response:
      'If you believe you\'ve received a counterfeit bag, here\'s what to do:\n\n' +
      '1. **Document everything** — Take detailed photos of the bag, listing, packaging, and any discrepancies\n' +
      '2. **Get it authenticated** — Use a professional service to get a written opinion\n' +
      '3. **Contact the seller** — Present your evidence calmly and request a return/refund\n' +
      '4. **Escalate to the platform** — Use the marketplace\'s buyer protection or dispute process\n' +
      '5. **Payment dispute** — If all else fails, file a chargeback with your credit card company or a dispute through PayPal\n\n' +
      'Time matters — most platforms and payment providers have deadlines for filing disputes, so act quickly.',
    followUp: ['Professional services', 'Where to buy safely', 'How do I spot a fake?'],
  },

  // LOUIS VUITTON SPECIFIC
  {
    keywords: ['lv', 'louis', 'vuitton', 'monogram'],
    specificity: 2,
    response:
      'Here are the key **Louis Vuitton** authentication markers:\n\n' +
      '- **Monogram alignment** — The LV pattern should be symmetrical across the front of the bag. On most models, a full LV monogram appears centered or at a consistent position\n' +
      '- **Canvas texture** — Authentic LV canvas has a slightly textured, coated feel — not smooth plastic and not rough fabric\n' +
      '- **Stitching color** — LV uses a distinctive **mustard yellow** thread. The stitching should be perfectly even with consistent spacing\n' +
      '- **Heat stamps** — "Louis Vuitton Paris — Made in France" (or USA, Spain, Italy) should be clean and properly aligned\n' +
      '- **Hardware** — Brass hardware should feel heavy with clean "Louis Vuitton" engravings, not etching\n\n' +
      'Pre-2021 bags should have a date code. Newer bags have an NFC microchip instead.',
    followUp: ['Neverfull tips', 'Speedy tips', 'What is vachetta?'],
  },
  {
    keywords: ['neverfull'],
    specificity: 3,
    response:
      'The **Louis Vuitton Neverfull** is one of the most counterfeited bags. Here\'s what to check:\n\n' +
      '- **Cinch strap stitching** — Count the stitches on the side cinch tabs. Authentic Neverfills have about **5 even stitches per tab**\n' +
      '- **Front pocket alignment** — The monogram should flow seamlessly from the bag onto the front pocket without breaking the pattern\n' +
      '- **Edge glazing** — The leather trim edges should have a clean, slightly shiny **red-brown glazing** (on classic monogram). It should be even and not gloppy\n' +
      '- **Handles** — Should be rolled vachetta leather that starts pale and develops patina. The stitching along the handles should be perfectly straight\n' +
      '- **Interior** — Check the textile lining pattern and color. Different Neverfull sizes use different interior colors\n\n' +
      'The date code is typically on a leather tab inside the side pocket.',
    followUp: ['What is vachetta?', 'Date code format', 'LV tips'],
  },
  {
    keywords: ['speedy'],
    specificity: 3,
    response:
      'The **Louis Vuitton Speedy** authentication checklist:\n\n' +
      '- **Padlock** — The brass padlock should have a clean "LOUIS VUITTON" engraving (not printed). The lock and keys should work smoothly. Key number should match the lock number\n' +
      '- **Rolled handles** — Should feel sturdy and firm, made from a single piece of vachetta leather. They\'ll develop patina over time\n' +
      '- **Zipper pull** — The metal tab should have a clear "LV" stamp. The zipper should glide smoothly without catching\n' +
      '- **Canvas** — Check that the LV monogram is upside down on the back side (this is correct for Speedy bags)\n' +
      '- **Piping** — The leather piping along the bottom edges should be even and show consistent wear\n\n' +
      'The date code is usually stamped on a leather tab under the interior pocket.',
    followUp: ['Neverfull tips', 'What is vachetta?', 'Hardware tips'],
  },
  {
    keywords: ['vachetta', 'patina'],
    specificity: 3,
    response:
      '**Vachetta leather** is the untreated natural cowhide used by Louis Vuitton for handles, trim, and straps.\n\n' +
      'Here\'s what to know:\n\n' +
      '- **New vachetta** starts as a very pale, almost white cream color\n' +
      '- Over time and with exposure to sunlight and oils from your hands, it develops a warm **honey-brown patina** — this is normal and desirable\n' +
      '- The patina process takes weeks to months depending on use and climate\n\n' +
      '**Red flags on fakes:**\n' +
      '- Vachetta that stays pale indefinitely or seems coated/sealed\n' +
      '- Artificial patina that looks painted on with uneven coloring\n' +
      '- Leather that feels plasticky or has a chemical smell\n' +
      '- Inconsistent color across different leather parts on the same bag\n\n' +
      'Authentic vachetta has a natural grain and will absorb water (which is why LV recommends avoiding rain).',
    followUp: ['LV tips', 'Neverfull tips', 'Smell test'],
  },

  // CHANEL SPECIFIC
  {
    keywords: ['chanel', 'quilting', 'quilt'],
    specificity: 2,
    response:
      'Key **Chanel** authentication markers:\n\n' +
      '- **Stitch count** — Count the stitches per quilted diamond. Authentic Chanel bags have approximately **7-8 stitches per side** of each diamond\n' +
      '- **Quilting feel** — Should be **puffy but firm**, with even height across all diamonds. Fakes are often flat, overly puffy, or inconsistent\n' +
      '- **CC logo** — The right C should overlap on top at the top, and the left C should overlap on top at the bottom. The interlocking should be perfectly symmetrical\n' +
      '- **Chain strap** — Should feel heavy and substantial. Leather weaving through the chain should be even and smooth\n' +
      '- **Interior stamp** — "CHANEL" and "Made in France/Italy" should be clean, with the correct font\n\n' +
      'Post-2021 bags have NFC microchips instead of hologram stickers.',
    followUp: ['Classic Flap tips', 'Boy Bag tips', 'Caviar vs lambskin'],
  },
  {
    keywords: ['classic flap', 'flap'],
    specificity: 3,
    response:
      'The **Chanel Classic Flap** is the most iconic — and most counterfeited — Chanel bag. Key checks:\n\n' +
      '- **CC turn lock** — Should align perfectly with the quilting pattern and sit centered on the front flap. The lock mechanism should turn smoothly with a satisfying click\n' +
      '- **Interior color** — Most Classic Flaps have a **burgundy leather interior** (though some special editions use other colors). The leather should be smooth and high quality\n' +
      '- **Chain weight** — The chain-and-leather strap should feel notably heavy. It\'s one of the quickest tells — fakes use lighter alloys\n' +
      '- **Back pocket** — Should align with the quilting and open smoothly\n' +
      '- **Quilting alignment** — Diamonds should be perfectly aligned on both sides and across seams\n\n' +
      'The Classic Flap has appreciated significantly in value — originals from 10 years ago are worth more than their retail price.',
    followUp: ['Chanel authentication tips', 'Caviar vs lambskin', 'Resale value'],
  },
  {
    keywords: ['boy bag', 'boy'],
    specificity: 3,
    response:
      'The **Chanel Boy Bag** authentication tips:\n\n' +
      '- **CC clasp** — The large rectangular clasp with CC logo should be **perfectly centered** on the front. The CC should be well-defined with clean edges\n' +
      '- **Hardware finish** — The Boy Bag is known for its aged/brushed hardware. It should feel **substantial and heavy**. The metal should have a deliberate antique finish, not cheap-looking tarnishing\n' +
      '- **Chain strap** — Links should be **perfectly uniform** in size and shape. The chain should have a weighty feel and slide smoothly\n' +
      '- **Quilting** — Boy Bags typically have a slightly flatter quilt than the Classic Flap, but it should still be consistent\n' +
      '- **Interior** — Usually grosgrain fabric or smooth leather lining with a clean "CHANEL Made in" stamp\n\n' +
      'The Boy Bag comes in many sizes and materials — make sure the specifications match what Chanel actually produced.',
    followUp: ['Chanel tips', 'Classic Flap tips', 'Hardware tips'],
  },
  {
    keywords: ['chanel serial', 'hologram', 'sticker'],
    specificity: 3,
    response:
      'Chanel\'s serial number system has evolved over the years:\n\n' +
      '- **Pre-2021**: Bags included a **hologram sticker** with a unique 7-8 digit serial number, plus a matching **authenticity card** with the same number\n' +
      '- The sticker was usually inside an interior pocket or sewn into the lining\n' +
      '- **2021 onward**: Chanel discontinued hologram stickers and authenticity cards entirely, replacing them with embedded **NFC microchips**\n\n' +
      '**Important notes:**\n' +
      '- A matching sticker and card don\'t guarantee authenticity — counterfeiters replicate these\n' +
      '- If someone is selling a "new" bag with a hologram sticker, it\'s either old stock or fake\n' +
      '- The serial number can help date the bag but should be verified alongside physical inspection\n\n' +
      'Always check the bag itself, not just the paperwork.',
    followUp: ['Chanel tips', 'Professional authenticators', 'Microchip info'],
  },
  {
    keywords: ['caviar', 'lambskin'],
    specificity: 3,
    response:
      'Chanel uses two primary leathers, each with distinct characteristics:\n\n' +
      '**Caviar leather:**\n' +
      '- Textured, pebbled surface with a slight grain\n' +
      '- **More durable** and resistant to scratches and wear\n' +
      '- Holds its shape well over time\n' +
      '- Slightly stiffer to the touch\n' +
      '- Best for everyday use\n\n' +
      '**Lambskin:**\n' +
      '- Smooth, buttery soft surface\n' +
      '- **More delicate** — prone to scratches and marks\n' +
      '- Has a luxurious sheen and lightweight feel\n' +
      '- Requires more careful handling\n' +
      '- Best for special occasions\n\n' +
      '**Red flag for both:** If the leather feels plasticky, stiff, or has an overly uniform texture without any natural variation, it\'s likely fake. Real leather always has subtle imperfections.',
    followUp: ['Chanel tips', 'Smell test', 'Storage tips'],
  },

  // GUCCI SPECIFIC
  {
    keywords: ['gucci', 'gg', 'supreme'],
    specificity: 2,
    response:
      'Key **Gucci** authentication markers:\n\n' +
      '- **GG Supreme canvas** — Should have a **coated, smooth feel**, not rough or papery. The print should be crisp with consistent, even spacing between the GG pattern\n' +
      '- **Serial number tag** — Located inside the bag on a leather tab. Should have "Gucci" and "Made in Italy" on the front, with a serial number on the back (style number on top row, supplier code on bottom)\n' +
      '- **Stitching** — Even, tight stitching in a color that matches or complements the bag\n' +
      '- **Hardware** — Should have clean "GUCCI" engravings with consistent depth and spacing\n' +
      '- **Dust bag** — Authentic Gucci dust bags are a soft, camel-colored cotton with a dark brown drawstring\n\n' +
      'Gucci\'s quality control has been very consistent, so any irregularities are a red flag.',
    followUp: ['Dionysus tips', 'Marmont tips', 'Hardware tips'],
  },
  {
    keywords: ['dionysus'],
    specificity: 3,
    response:
      'The **Gucci Dionysus** authentication tips:\n\n' +
      '- **Tiger head clasp** — This is the signature feature. The double tiger (or lion) head clasp should have **detailed engraving with visible texture** in the fur/mane. Fakes often have smooth, poorly defined tiger heads\n' +
      '- **Push closure** — The clasp mechanism should feel **solid and satisfying** with a secure click. It shouldn\'t feel loose or wobbly\n' +
      '- **Canvas quality** — The GG Supreme canvas should be smooth and evenly printed with a slight sheen\n' +
      '- **Suede lining** — Many Dionysus bags have a suede interior flap. It should feel soft and have an even nap\n' +
      '- **Crystal/stone embellishments** — On embellished versions, stones should be securely set with consistent sizing\n\n' +
      'The Dionysus is one of Gucci\'s most iconic modern bags and a frequent target for counterfeiting.',
    followUp: ['Gucci tips', 'Marmont tips', 'Professional services'],
  },
  {
    keywords: ['marmont'],
    specificity: 3,
    response:
      'The **Gucci GG Marmont** authentication tips:\n\n' +
      '- **Chevron stitching** — The signature matelassé (chevron quilting) should be **evenly spaced** with consistent depth across the entire bag\n' +
      '- **GG hardware** — The double-G logo on the front should be well-cast with **smooth, rounded edges** — no rough spots, burrs, or uneven finishing\n' +
      '- **Heart on back** — Authentic Marmonts have a small **heart-shaped quilting detail** on the back of the bag. Check that it\'s well-formed and symmetrical\n' +
      '- **Leather quality** — The leather should be soft and supple with a slight sheen. It shouldn\'t feel dry or plasticky\n' +
      '- **Interior tag** — Should show "Gucci" and "Made in Italy" with clean hot stamping, plus the correct serial number format\n\n' +
      'The Marmont comes in many sizes and colors — verify that the specific combination you\'re looking at was actually produced by Gucci.',
    followUp: ['Gucci tips', 'Dionysus tips', 'Stitching tips'],
  },

  // HERMÈS
  {
    keywords: ['hermes', 'hermès', 'birkin'],
    specificity: 2,
    response:
      'The **Hermès Birkin** is the gold standard of luxury bags, and authentication is critical given prices often exceed $10,000. Key markers:\n\n' +
      '- **Saddle stitch** — Hermès uses a hand-stitched saddle stitch with waxed linen thread. Each stitch is made with two needles passing through the same hole from opposite sides, creating a distinctive slant\n' +
      '- **Pearling** — The edges of the leather are finished with a technique called pearling — a series of small, evenly spaced dots along the trim edges\n' +
      '- **Stamp under front flap** — Contains the Hermès Paris Made in France stamp along with a unique craftsman ID (a single letter or number identifying the artisan)\n' +
      '- **Sangles (straps)** — The front closure straps should have perfectly consistent spacing and stitching\n' +
      '- **Lock and key set** — The clochette (key holder), padlock, and keys should have matching numbers. The lock should feel heavy and substantial\n\n' +
      'Every Birkin is handmade by a single artisan over 18-25 hours, so the craftsmanship should be exceptional throughout.',
    followUp: ['Kelly bag tips', 'Hermès leathers', 'Hermès stamps'],
  },
  {
    keywords: ['kelly', 'hermes kelly'],
    specificity: 3,
    response:
      'The **Hermès Kelly** bag authentication checklist:\n\n' +
      '- **Saddle stitch** — Same hand-stitching technique as the Birkin — two needles, waxed linen thread, consistent slant throughout\n' +
      '- **Turn lock closure** — The Kelly\'s signature turn lock (tournure) should feel **heavy and precise**. It should click into place with a satisfying, secure feel. Fakes often have a loose or wobbly lock\n' +
      '- **Interior stamp** — Look for a blind stamp indicating the year of production. Hermès uses a letter system — each letter corresponds to a specific year. The stamp should be clean and properly aligned\n' +
      '- **Handle attachment** — The single top handle is attached with metal rivets (on Sellier) or stitched (on Retourné). Rivets should be **perfectly flush** with the leather, not raised or uneven\n' +
      '- **Feet** — The bottom should have four metal feet (on most models) that are evenly placed and feel solid\n\n' +
      'The Kelly comes in two styles: Sellier (structured, external stitching) and Retourné (softer, turned inside out). Know which you\'re buying.',
    followUp: ['Birkin tips', 'Hermès leathers', 'Professional authenticators'],
  },
  {
    keywords: ['hermes leather', 'togo', 'epsom', 'clemence', 'swift'],
    specificity: 3,
    response:
      'Hermès offers many leather types, each with a distinctive feel that counterfeiters struggle to replicate:\n\n' +
      '**Togo** — The most popular Hermès leather. Grainy, soft, and slightly slouchy. Has a visible pebbled grain pattern. Resistant to scratches and holds up well daily.\n\n' +
      '**Epsom** — Has a pressed, uniform cross-hatch grain. More structured and lighter weight than Togo. Holds its shape rigidly. The grain is more geometric and consistent.\n\n' +
      '**Clemence** — Similar texture to Togo but heavier and droopier. The grain is slightly larger. It softens significantly over time and develops a beautiful slouch.\n\n' +
      '**Swift** — Smooth, buttery leather with no visible grain. Beautiful sheen but shows scratches easily. Lightweight and very supple. Best for special occasions.\n\n' +
      'Other Hermès leathers include **Barenia** (smooth, develops incredible patina), **Box** (smooth, glossy, formal), and **Evercolor** (soft, matte). Each genuine Hermès leather has a distinctive smell and hand-feel that\'s very hard to fake.',
    followUp: ['Birkin tips', 'Kelly tips', 'Exotic leathers'],
  },
  {
    keywords: ['hermes stamp', 'blind stamp', 'craftsman'],
    specificity: 3,
    response:
      'The **Hermès stamping system** is one of the most important authentication markers:\n\n' +
      '**Year stamps (blind stamps):**\n' +
      '- Hermès marks each bag with a letter indicating the year of production\n' +
      '- Originally used letters A-Z in alphabetical order (with some gaps)\n' +
      '- From 2015 onward, the system changed: stamps now appear inside geometric shapes (T in a square = 2015, X in a square = 2016, etc.)\n' +
      '- The stamp is typically found on the strap under the front flap\n\n' +
      '**Craftsman ID:**\n' +
      '- Each Hermès artisan has a unique ID stamp — usually a single letter or number\n' +
      '- This stamp appears near the year stamp\n' +
      '- It identifies who made the bag — each artisan builds the entire bag from start to finish\n\n' +
      '**Authentication markers:**\n' +
      '- Stamps should have **consistent depth** — not too deep, not too shallow\n' +
      '- Edges should be clean and sharp, not blurry\n' +
      '- The "Hermès Paris Made in France" stamp should use the correct font with proper accent on the è\n' +
      '- Stamps that are too perfect or too deep are actually suspicious — authentic stamps have subtle hand-applied character.',
    followUp: ['Birkin tips', 'Kelly tips', 'Hermès leathers'],
  },

  // DIOR
  {
    keywords: ['dior', 'lady dior', 'book tote'],
    specificity: 2,
    response:
      'Key **Dior** authentication markers:\n\n' +
      '- **Cannage stitching** — Dior\'s signature quilting pattern should be **perfectly symmetrical** with consistent depth and spacing across the entire bag\n' +
      '- **DIOR charms** — On the Lady Dior, the letter charms should have **consistent font weight and spacing**. Each letter hangs from its own ring and should swing freely\n' +
      '- **Hardware** — Should feel substantial and well-made. Gold-tone hardware should be warm, not brassy. Aged gold should have an intentional matte finish\n' +
      '- **Interior tag** — Should read "Made in Italy" with a date code. Dior date codes use a format like "01-MA-1234" (month-factory-year)\n' +
      '- **Dust bag** — Authentic Dior dust bags are white cotton with "DIOR" printed in the signature font\n\n' +
      'The **Lady Dior** and **Book Tote** are currently among the most counterfeited Dior bags, so extra scrutiny is warranted.',
    followUp: ['Dior Saddle tips', 'Dior Oblique canvas', 'Hardware tips'],
  },
  {
    keywords: ['dior saddle', 'saddle bag'],
    specificity: 3,
    response:
      'The **Dior Saddle Bag** authentication tips:\n\n' +
      '- **Shape** — The signature curved, asymmetric shape should be **smooth and symmetrical** from left to right. The curve should flow naturally, not look forced or uneven\n' +
      '- **CD clasp** — The large CD magnetic clasp should have **sharp, clean engraving** on both letters. The finish should be consistent and the clasp mechanism strong\n' +
      '- **Magnetic closure** — Should snap shut with a firm, satisfying click. Weak or loose closures are a red flag\n' +
      '- **Leather quality** — Should be supple and soft with a natural grain. It shouldn\'t feel stiff, dry, or plasticky\n' +
      '- **Strap hardware** — The metal links and attachments should be well-finished with no rough edges\n' +
      '- **Interior** — Should have clean stitching, proper lining, and a clear authenticity tag\n\n' +
      'The Saddle Bag was revived by Maria Grazia Chiuri and has seen a surge in counterfeit production since its comeback.',
    followUp: ['Dior tips', 'Dior Oblique canvas', 'Professional services'],
  },
  {
    keywords: ['dior oblique', 'oblique canvas'],
    specificity: 3,
    response:
      'The **Dior Oblique canvas** is one of the brand\'s most recognizable materials:\n\n' +
      '- **Print quality** — The DIOR logo print should be **crisp and sharp** with no bleeding, smudging, or fuzzy edges. Each letter should be perfectly formed\n' +
      '- **Canvas texture** — Should feel **coated and slightly stiff**, similar to LV canvas. It\'s a jacquard woven fabric, not printed on top\n' +
      '- **Pattern repeat** — The Oblique pattern repeats at **consistent intervals**. Any variation in spacing or alignment between repeats is a red flag\n' +
      '- **Color consistency** — The navy/dark blue background should be uniform across the entire surface. Fakes often have slight color variations\n' +
      '- **Weave direction** — The diagonal pattern should run in the correct direction for the specific model\n\n' +
      'Authentic Oblique canvas has a structured feel — it shouldn\'t be floppy or overly flexible. The coating gives it a slight sheen.',
    followUp: ['Dior tips', 'Dior Saddle tips', 'Canvas explained'],
  },

  // PRADA
  {
    keywords: ['prada', 'saffiano', 'nylon'],
    specificity: 2,
    response:
      'Key **Prada** authentication markers:\n\n' +
      '- **Saffiano leather** — Has a distinctive **cross-hatch texture** created by heat-stamping. The pattern should be uniform and consistent. It should feel firm and structured, not soft or floppy\n' +
      '- **Triangle logo plaque** — Should have **clean edges and precise lettering**. The metal triangle should be perfectly attached — riveted, not glued\n' +
      '- **Interior tags** — Prada bags have a **white fabric tag** with brand info in the correct font, plus a separate small tag with a number code\n' +
      '- **Nylon bags** — Authentic Prada nylon (Pocono fabric) has a dense, high-quality weave that feels substantial. It should be waterproof and resistant to tearing\n' +
      '- **Hardware** — Zippers should have "Prada" engraved on pulls. Clasps and buckles should feel heavy and precise\n' +
      '- **Lining** — Usually black jacquard with "PRADA" logo pattern woven in\n\n' +
      'Prada\'s quality is extremely consistent, so even small deviations in construction quality are suspicious.',
    followUp: ['Prada logo details', 'Saffiano leather care', 'Hardware tips'],
  },
  {
    keywords: ['prada logo', 'triangle', 'plaque'],
    specificity: 3,
    response:
      'The **Prada triangle logo** is one of the most scrutinized authentication markers:\n\n' +
      '- **Letter spacing** — "PRADA" letters should be **evenly spaced** with consistent depth throughout each letter\n' +
      '- **The R** — The R in PRADA has a **distinctive notch in the leg** (the diagonal stroke). This small detail is often wrong on counterfeits — the R looks like a standard font R instead of Prada\'s custom version\n' +
      '- **Metal quality** — The triangular plaque should be made of high-quality metal with a clean finish. It should feel slightly raised from the surface\n' +
      '- **Attachment** — The plaque should be **perfectly centered and riveted** to the bag with small metal fasteners, never glued. The rivets should be flush and even\n' +
      '- **"MILANO" and "DAL 1913"** — The smaller text below "PRADA" should be sharp and legible\n' +
      '- **Edge finish** — The triangle edges should be clean-cut with no roughness or uneven borders\n\n' +
      'Use your phone\'s camera to zoom in on the lettering — the differences between authentic and fake are often visible at close inspection.',
    followUp: ['Prada tips', 'Hardware tips', 'Professional services'],
  },

  // BOTTEGA VENETA
  {
    keywords: ['bottega', 'intrecciato', 'woven'],
    specificity: 3,
    response:
      'The **Bottega Veneta intrecciato** weave is the brand\'s signature and a key authentication marker:\n\n' +
      '- **Weave uniformity** — The intrecciato weave should be **perfectly uniform** with no visible gaps between leather strips. Each strip should be the same width\n' +
      '- **Leather quality** — Individual strips should feel **soft and pliable**, not stiff or plasticky. The leather should have a natural, supple hand-feel\n' +
      '- **Edge finishing** — The edges of each leather strip should be **cleanly painted** with matching color. No raw or rough edges should be visible\n' +
      '- **Weave pattern** — The over-under pattern should be perfectly consistent across the entire bag. Any irregularity in the pattern is a red flag\n' +
      '- **Interior stamp** — Bottega uses a subtle, clean "BOTTEGA VENETA" stamp that should be properly centered with the correct font\n' +
      '- **Construction** — The weave should lay flat against the bag structure without bunching or pulling\n\n' +
      'Bottega Veneta\'s "no logo" aesthetic means authentication relies heavily on craftsmanship quality rather than logo checks.',
    followUp: ['Leather types', 'How do I spot a fake?', 'Resale value'],
  },

  // SAINT LAURENT / YSL
  {
    keywords: ['ysl', 'saint laurent', 'loulou', 'envelope'],
    specificity: 2,
    response:
      'Key **Saint Laurent (YSL)** authentication markers:\n\n' +
      '- **Chevron stitching** — On quilted models like the Loulou, the Y-shaped quilting should be **even and precise** with consistent depth\n' +
      '- **YSL logo hardware** — The interlocking YSL letters should have **sharp definition** with no rough casting marks, bubbles, or uneven edges. The metal should feel weighty\n' +
      '- **Chain straps** — Should feel **heavy and substantial**. Links should be uniform and the chain should drape smoothly without kinking\n' +
      '- **Interior stamp** — Should read "SAINT LAURENT PARIS" with the correct font. Older bags may say "Yves Saint Laurent" — know which era you\'re buying\n' +
      '- **Serial number** — Located on a leather tab inside. Format is typically a string of numbers with "Made in Italy" above\n' +
      '- **Dust bag** — Should be soft cotton or linen with the brand name printed in the correct font\n\n' +
      'The Loulou, Envelope, and Kate are currently the most counterfeited YSL bags.',
    followUp: ['Hardware tips', 'Stitching tips', 'Where to buy safely'],
  },

  // CELINE
  {
    keywords: ['celine', 'céline', 'luggage', 'belt bag', 'triomphe'],
    specificity: 2,
    response:
      'Key **Celine** authentication markers:\n\n' +
      '- **Triomphe canvas** — The interlocking C pattern should have a **tight weave with crisp, clear print**. The canvas should feel structured and coated\n' +
      '- **Hardware** — Typically brass with clean engraving. Celine hardware should feel **heavy and well-made** with "CELINE PARIS" stamped clearly\n' +
      '- **Interior stamp** — Should read "CELINE PARIS" in the brand\'s specific font. Note: the accent on the first E (Céline) was used until 2018 when Hedi Slimane dropped it\n' +
      '- **Stitching** — Celine uses tonal stitching (matching the leather color) that should be **perfectly even** with no loose threads\n' +
      '- **Made in tag** — Should say "Made in Italy" with a style/color code on a leather or fabric tab\n\n' +
      'The **Luggage**, **Belt Bag**, and **Triomphe** are the most counterfeited Celine models. Pay close attention to the leather quality — Celine uses exceptionally smooth, high-grade calfskin.',
    followUp: ['Leather tips', 'Hardware tips', 'Professional services'],
  },

  // FENDI
  {
    keywords: ['fendi', 'baguette', 'peekaboo', 'ff'],
    specificity: 2,
    response:
      'Key **Fendi** authentication markers:\n\n' +
      '- **FF Zucca print** — The double-F logo print should be **perfectly symmetrical** with consistent spacing and color. The Fs should be crisp with no bleeding\n' +
      '- **Baguette clasp** — The magnetic snap or buckle closure should **snap firmly** with a satisfying click. Hardware should feel solid and well-finished\n' +
      '- **Peekaboo turn lock** — The signature turn lock should feel **heavy and precise**. The mechanism should engage smoothly without play or wobble\n' +
      '- **Serial tag** — Located inside the bag, it features a hologram and a specific number format. The hologram should shift colors when tilted\n' +
      '- **Selleria hand-stitching** — On Selleria collection bags, the hand-stitching should be **visible and even** with a distinctive slightly raised look\n' +
      '- **FENDI ROMA stamp** — Interior stamp should be clean with the correct font. "MADE IN ITALY" appears below\n\n' +
      'Fendi\'s attention to detail is exceptional — even the interior compartments and pocket linings should show immaculate construction.',
    followUp: ['Hardware tips', 'How do I spot a fake?', 'Professional services'],
  },

  // MATERIALS DEEP KNOWLEDGE
  {
    keywords: ['canvas', 'coated canvas', 'monogram canvas'],
    specificity: 2,
    response:
      'A deep dive into **luxury coated canvas**:\n\n' +
      'Coated canvas used by brands like Louis Vuitton and Gucci is **not leather** — it\'s cotton or linen coated with PVC or resin. This is completely normal and not a sign of a fake.\n\n' +
      '**Authentic canvas characteristics:**\n' +
      '- Has a **subtle texture** you can feel with your fingertips\n' +
      '- **Consistent coating** that feels smooth but not slippery\n' +
      '- Print is **embedded in the coating**, not sitting on top — it won\'t rub off with your thumbnail\n' +
      '- Should have a faint, neutral smell — not chemical\n\n' +
      '**Fake canvas red flags:**\n' +
      '- Strong **chemical or plastic smell**\n' +
      '- **Plasticky feel** — either too smooth/shiny or too rough/papery\n' +
      '- Print that **fades or rubs off** with friction\n' +
      '- **Inconsistent texture** — rough patches or areas where coating is uneven\n' +
      '- Color that appears too orange, too green, or too dull compared to authentic\n\n' +
      'Coated canvas is actually more durable than leather in many conditions — it\'s water-resistant and maintains its appearance longer.',
    followUp: ['LV tips', 'Gucci tips', 'Leather types'],
  },
  {
    keywords: ['gold plating', 'gold hardware', 'plating', 'tarnish'],
    specificity: 3,
    response:
      'Understanding **hardware plating** on luxury bags:\n\n' +
      '**Authentic plating:**\n' +
      '- Luxury brands use **thick gold plating**, often 24k, applied over a quality base metal (usually brass)\n' +
      '- Authentic plating **resists tarnishing for years** of normal use\n' +
      '- The gold tone is warm and rich — not overly bright or brassy\n' +
      '- Some brands use **palladium** (silver-white) or **ruthenium** (dark grey) for silver/gunmetal hardware\n\n' +
      '**Fake hardware tells:**\n' +
      '- Thin plating that **chips, peels, or turns green** within weeks or months\n' +
      '- Feels **noticeably lighter** than authentic hardware (this is one of the hardest things for counterfeiters to replicate)\n' +
      '- Color is too bright, too yellow, or has an unnatural uniform finish\n' +
      '- Engravings are shallow, uneven, or blurry\n\n' +
      '**Note:** Even authentic plating can show wear over many years. Light surface scratches and minor color changes on hardware that\'s 10+ years old are normal.',
    followUp: ['Hardware tips', 'How do I spot a fake?', 'Care tips'],
  },
  {
    keywords: ['suede', 'alcantara'],
    specificity: 3,
    response:
      'Understanding **suede and Alcantara** linings in luxury bags:\n\n' +
      '**Alcantara:**\n' +
      '- A **synthetic microfiber** used by brands like Louis Vuitton for interior linings\n' +
      '- Feels like suede but is **more durable and stain-resistant**\n' +
      '- Has a soft, velvety texture with a consistent nap\n' +
      '- Common in LV Artsy, Metis, and other modern styles\n\n' +
      '**Real suede:**\n' +
      '- Made from the underside of animal skin — has a **natural nap direction**\n' +
      '- Stroke it one way and it appears lighter, the other way darker\n' +
      '- Used by Gucci (Dionysus interior), Chanel, and others\n\n' +
      '**Fake tells:**\n' +
      '- **Thin felt or fabric** that pills quickly after minimal use\n' +
      '- Inconsistent texture or thickness across the lining\n' +
      '- Color that rubs off onto items stored in the bag\n' +
      '- Stiff or scratchy feel rather than soft and plush\n\n' +
      'To clean suede/Alcantara linings, use a soft suede brush — never wet cleaning products.',
    followUp: ['Interior tips', 'Care tips', 'How do I spot a fake?'],
  },
  {
    keywords: ['exotic', 'python', 'crocodile', 'ostrich'],
    specificity: 3,
    response:
      'Authenticating **exotic leather** bags requires specialized knowledge:\n\n' +
      '**Crocodile / Alligator:**\n' +
      '- Scale patterns should be **natural and asymmetric** — no two crocodiles have identical patterns\n' +
      '- Scales should vary naturally in size from center to edges\n' +
      '- Each scale should have a visible **pore or follicle dot**\n' +
      '- If the pattern repeats perfectly, it\'s embossed cowhide, not real exotic\n\n' +
      '**Ostrich:**\n' +
      '- Distinctive **quill bumps** (raised dots) in a natural scattered pattern — not in perfect rows\n' +
      '- Areas without quill bumps should be smooth with a subtle grain\n' +
      '- The bumps should be rounded and firm to the touch\n\n' +
      '**Python:**\n' +
      '- Scales should follow a **natural gradient** from large on the belly to smaller at edges\n' +
      '- Scales should have slight depth variation and may curl slightly at edges\n\n' +
      '**Important:** All exotic leather bags should come with **CITES documentation** for legal international import. Missing CITES papers doesn\'t mean the bag is fake, but it could mean complications with customs or resale.',
    followUp: ['Hermès leathers', 'Professional authenticators', 'Resale value'],
  },
  {
    keywords: ['embossing', 'debossing', 'stamp', 'heat stamp', 'logo stamp'],
    specificity: 2,
    response:
      'Understanding **stamps and embossing** on luxury bags:\n\n' +
      '**Embossing vs debossing:**\n' +
      '- **Embossing** = raised surface (pushed up from behind)\n' +
      '- **Debossing** = pressed into the surface (pushed down from front)\n' +
      '- Most luxury logo stamps are debossed (heat-stamped into leather)\n\n' +
      '**Authentic heat stamp characteristics:**\n' +
      '- **Consistent depth** across all letters\n' +
      '- **Clean, sharp edges** — no fuzzy or bleeding letter borders\n' +
      '- **Correct font** for the brand and era of the bag\n' +
      '- Slight natural variation from hand-application (not perfectly laser-uniform)\n\n' +
      '**Red flags:**\n' +
      '- Stamps that are **too deep** or pressed unevenly\n' +
      '- **Blurry or wobbly** letter edges\n' +
      '- Incorrect font (wrong letter shapes or spacing)\n' +
      '- A freshly deep stamp on a bag claimed to be vintage — stamps naturally **fade slightly** over time, which is normal\n\n' +
      'A magnifying glass is your best friend for stamp inspection. Compare with verified reference images of the same model and year.',
    followUp: ['How do I spot a fake?', 'Interior tips', 'Professional services'],
  },

  // BUYING AND SELLING
  {
    keywords: ['facebook', 'marketplace', 'fb'],
    specificity: 3,
    response:
      'Tips for buying luxury bags on **Facebook Marketplace**:\n\n' +
      '- **Always meet in public** — a coffee shop, mall, or police station lobby. Never go to a stranger\'s home\n' +
      '- **Ask for detailed photos first** — request close-ups of stitching, stamps, serial numbers, hardware, and interior from multiple angles before agreeing to meet\n' +
      '- **Check seller\'s profile** — Look at account age, mutual friends, posting history. New accounts with no history are risky\n' +
      '- **Use PayPal Goods & Services** for payment — it offers buyer protection if the item is counterfeit\n' +
      '- **Never use Zelle, Venmo, or Cash App** — these have essentially zero buyer protection for goods purchases\n' +
      '- **Bring a knowledgeable friend** or use the LuxeCheck app on-site to verify\n' +
      '- **Trust your instincts** — if the price seems too good or the seller is evasive about details, walk away\n\n' +
      'Facebook Marketplace has no built-in authentication, so you\'re entirely responsible for verification.',
    followUp: ['Where to buy safely', 'Professional authenticators', 'How do I spot a fake?'],
  },
  {
    keywords: ['ebay', 'auction'],
    specificity: 3,
    response:
      'Buying luxury bags on **eBay** — what to know:\n\n' +
      '- **Authenticity Guarantee** — eBay authenticates items over $500 in certain categories through a third-party service. Look for the Authenticity Guarantee badge on listings\n' +
      '- **Seller feedback** — Check their feedback percentage and read recent reviews, especially for luxury items. Look for sellers who specialize in designer goods\n' +
      '- **Always buy through the platform** — Never agree to complete a transaction outside eBay, even if the seller suggests it for a "discount"\n' +
      '- **Request return policy confirmation** — Ensure the listing allows returns, especially for authenticity concerns\n' +
      '- **Study the photos carefully** — Ask for additional photos if the listing doesn\'t show all authentication markers\n' +
      '- **Money-back guarantee** — eBay\'s buyer protection covers items that are not as described, including counterfeits\n\n' +
      'eBay has improved significantly for luxury purchases since adding the Authenticity Guarantee program, but vigilance is still important for listings without it.',
    followUp: ['Where to buy safely', 'Professional services', 'How do I spot a fake?'],
  },
  {
    keywords: ['poshmark', 'mercari', 'depop'],
    specificity: 3,
    response:
      'Buying on **resale platforms** — know your protections:\n\n' +
      '**Poshmark:**\n' +
      '- Authenticates items over $500 with **Posh Protect** — the item is inspected before being shipped to you\n' +
      '- Below $500, you have 3 days to report issues\n' +
      '- All transactions are within the platform — never go off-app\n\n' +
      '**Mercari:**\n' +
      '- Has a **buyer protection window of 3 days** after delivery to inspect and report issues\n' +
      '- Rate the transaction to complete it — don\'t rate until you\'re satisfied\n' +
      '- Mercari Authenticate is available for select items\n\n' +
      '**Depop:**\n' +
      '- **Less built-in protection** than Poshmark or Mercari\n' +
      '- Use **PayPal Goods & Services** when possible for buyer protection\n' +
      '- Be extra cautious with high-value items\n\n' +
      '**For all platforms:** Always screenshot the listing, seller\'s page, and any messages before purchasing. This documentation is crucial if you need to file a dispute.',
    followUp: ['Where to buy safely', 'Got scammed help', 'Professional services'],
  },
  {
    keywords: ['thrift', 'thrift store', 'consignment', 'secondhand'],
    specificity: 2,
    response:
      'Finding luxury bags at **thrift stores and consignment shops**:\n\n' +
      '**Bring your toolkit:**\n' +
      '- A **flashlight** (phone light works) to check stitching, stamps, and interior details\n' +
      '- Your phone for the LuxeCheck app and reference photos\n\n' +
      '**What to check in-store:**\n' +
      '- **Hardware weight** — pick up the bag and feel the metal pieces. Heavy = good sign\n' +
      '- **Smell** — real leather and canvas have distinct smells. Chemical/plastic smell is a warning\n' +
      '- **Wear patterns** — genuine bags wear naturally at corners, bottom edges, and handles. Uniform wear or no wear on an "old" bag is suspicious\n' +
      '- **Interior condition** — check for peeling lining, loose threads, or inconsistent construction\n\n' +
      '**Important:** Photograph everything before purchasing — most thrift stores have **strict no-return policies**. Take close-ups of all stamps, serial numbers, hardware, and stitching.\n\n' +
      'Consignment shops that specialize in luxury (The RealReal stores, Crossroads Trading, etc.) are generally more trustworthy than random thrift shops.',
    followUp: ['How do I spot a fake?', 'Professional services', 'Smell test'],
  },
  {
    keywords: ['investment', 'appreciate', 'hold value'],
    specificity: 2,
    response:
      'Which luxury bags are the **best investments**?\n\n' +
      '**Consistently appreciate in value:**\n' +
      '- **Hermès Birkin** — Has outperformed the S&P 500 over certain periods. Rare colors and exotic leathers appreciate most\n' +
      '- **Hermès Kelly** — Similar appreciation to Birkin, especially in classic sizes and colors\n' +
      '- **Chanel Classic Flap** — Retail price has increased annually for over a decade. Pre-increase purchases hold strong resale\n\n' +
      '**Hold value well:**\n' +
      '- **Louis Vuitton Neverfull** — Holds 80-90% of retail value in good condition\n' +
      '- **Chanel Boy Bag** — Steady demand in the resale market\n' +
      '- **Dior Lady Dior** — Classic status helps maintain value\n\n' +
      '**Key factors beyond brand:**\n' +
      '- **Condition** matters more than anything — keep bags pristine\n' +
      '- **Rarity** — Limited editions and discontinued colors can spike in value\n' +
      '- **Colorway** — Classic neutrals (black, tan, monogram) are safest. Unusual colors can be hit or miss\n' +
      '- **Size** — Practical medium sizes tend to hold value better than trendy micro bags\n\n' +
      'Remember: buy bags you love first, invest second.',
    followUp: ['Resale value tips', 'Storage tips', 'Where to sell'],
  },

  // COUNTERFEIT KNOWLEDGE
  {
    keywords: ['superfake', 'super fake', 'aaa', '1:1', 'mirror'],
    specificity: 3,
    response:
      'Understanding **superfakes** — the latest generation of counterfeits:\n\n' +
      'Superfakes are extremely sophisticated replicas that can be **very close to authentic**, sometimes using similar-grade materials and replicating tiny details. Even experienced collectors can be fooled.\n\n' +
      '**What makes them dangerous:**\n' +
      '- They may use real leather and quality hardware\n' +
      '- Stitching and stamps can be nearly identical to authentic\n' +
      '- Packaging and documentation may also be replicated\n\n' +
      '**How professionals catch them:**\n' +
      '- **Microscopic photography** — Services like Entrupy analyze material at microscopic levels to detect differences in grain patterns\n' +
      '- **UV light testing** — Authentic materials fluoresce differently under ultraviolet light\n' +
      '- **Material composition testing** — Chemical analysis of leather, canvas, and adhesives\n' +
      '- **Weight comparison** — Even superfakes often get the exact weight wrong by a few grams\n\n' +
      'This is exactly why **professional authentication is worth the investment** for expensive bags. LuxeCheck is a great educational starting point, but for bags worth over $1,000, always confirm with a professional.',
    followUp: ['Professional authenticators', 'UV light testing', 'How do I spot a fake?'],
  },
  {
    keywords: ['rep', 'replica', 'counterfeit', 'factory'],
    specificity: 2,
    response:
      'What to know about **counterfeit bags** across quality tiers:\n\n' +
      'Counterfeits range from obvious low-quality fakes to sophisticated replicas. Here are the **common tells across all quality levels and brands:**\n\n' +
      '- **Font spacing** — Logo text is often slightly wrong. Letter spacing, font weight, or specific character shapes differ from authentic\n' +
      '- **Hardware weight** — Lighter metals are used even in high-quality counterfeits. This is one of the hardest things to fake because quality metal is expensive\n' +
      '- **Chemical smell** — Fresh counterfeits often have a strong chemical or glue smell that authentic bags don\'t have\n' +
      '- **Uneven stitching** — Even good fakes usually have at least some inconsistency in stitch spacing, especially in less visible areas\n' +
      '- **Interior details** — Counterfeiters often cut corners on the inside: cheaper lining fabric, sloppy pocket construction, incorrect stamp fonts\n' +
      '- **Glue** — Perhaps the biggest giveaway. Authentic bags use high-quality adhesive that stays clean and invisible. Fakes often show excess glue around seams, edges, and interior folds\n\n' +
      'The higher the price of a counterfeit, the harder it is to detect without specialized tools — which is why professional authentication exists.',
    followUp: ['Superfakes explained', 'Professional services', 'How do I spot a fake?'],
  },
  {
    keywords: ['uv', 'ultraviolet', 'black light'],
    specificity: 3,
    response:
      'Using **UV (ultraviolet) light** for bag authentication:\n\n' +
      '**How it works:**\n' +
      '- Under UV light, certain materials **fluoresce differently** — meaning they glow or reflect in specific ways\n' +
      '- Authentic Louis Vuitton canvas has a specific **glow pattern** under UV that differs from counterfeit canvas\n' +
      '- Adhesives, dyes, and surface treatments also fluoresce differently between authentic and fake\n\n' +
      '**What you need:**\n' +
      '- A UV flashlight (365nm wavelength is best) — available for $10-20 on Amazon\n' +
      '- A dark room for best results\n\n' +
      '**Limitations:**\n' +
      '- UV testing is **one tool among many** — it\'s not definitive on its own\n' +
      '- Results can vary based on the age and condition of the bag\n' +
      '- Some authentication services use professional-grade UV equipment that\'s more precise than consumer flashlights\n' +
      '- High-quality superfakes are beginning to replicate some UV characteristics\n\n' +
      'Use UV testing as **supporting evidence** alongside physical inspection, not as a sole determinant.',
    followUp: ['Superfakes explained', 'Professional services', 'How do I spot a fake?'],
  },
  {
    keywords: ['magnet', 'magnetic', 'magnet test'],
    specificity: 3,
    response:
      'The **magnet test** for luxury bag hardware:\n\n' +
      '**The concept:**\n' +
      '- Some authentic hardware is **non-magnetic** (brass, gold-plated brass) while cheaper metals used in fakes may be magnetic (steel, iron alloys)\n' +
      '- Hold a small magnet to the hardware — if it sticks, the hardware may be cheaper steel\n\n' +
      '**Important caveats:**\n' +
      '- **Not all authentic hardware is non-magnetic** — this varies by brand, model, and production year\n' +
      '- Some authentic bags use steel components alongside brass\n' +
      '- Magnetic closures (snaps) will obviously be magnetic — that\'s normal\n' +
      '- Zippers often contain steel elements even on authentic bags\n\n' +
      '**Best used on:**\n' +
      '- Decorative hardware (logo plaques, buckles, chain links)\n' +
      '- Padlocks and key sets\n' +
      '- D-rings and strap attachments\n\n' +
      'The magnet test is a **supporting test, not a definitive one**. Always combine with visual inspection, weight assessment, and other authentication methods.',
    followUp: ['Hardware tips', 'UV light testing', 'Professional services'],
  },

  // CARE AND MAINTENANCE
  {
    keywords: ['clean', 'cleaning', 'stain', 'dirt'],
    specificity: 2,
    response:
      '**Cleaning tips** by material type:\n\n' +
      '**Leather (smooth):**\n' +
      '- Wipe with a slightly damp, soft cloth\n' +
      '- Apply leather conditioner every 3-6 months (Cadillac or brand-recommended)\n' +
      '- For stains, use a specialized leather cleaner — never dish soap or household cleaners\n\n' +
      '**Coated canvas (LV, Gucci):**\n' +
      '- Use mild soap and lukewarm water with a soft cloth\n' +
      '- Gently wipe in the direction of the print\n' +
      '- Dry with a clean, soft cloth immediately\n\n' +
      '**Suede / Nubuck:**\n' +
      '- Use a dedicated suede brush (dry) to lift dirt and restore nap\n' +
      '- For stains, use a suede eraser first, then brush\n' +
      '- Never use water or liquid cleaners on suede\n\n' +
      '**General rules:**\n' +
      '- **Never use baby wipes** — they contain chemicals that damage finishes\n' +
      '- Always **test any product** on a hidden area first\n' +
      '- Don\'t use alcohol-based cleaners, hydrogen peroxide, or bleach\n' +
      '- For valuable bags, consider professional cleaning services rather than DIY',
    followUp: ['Storage tips', 'Color transfer prevention', 'Repair services'],
  },
  {
    keywords: ['repair', 'restore', 'fix', 'damage'],
    specificity: 2,
    response:
      '**Repair and restoration** options for luxury bags:\n\n' +
      '**Brand services (best for warranty and value):**\n' +
      '- **Chanel Spa** — Chanel offers complimentary and paid repair services for authenticated items\n' +
      '- **Louis Vuitton repair** — LV repairs items purchased from them. Costs vary by repair type\n' +
      '- **Hermès refurbishment** — Hermès will refurbish their bags, including re-dyeing, re-stitching, and hardware replacement\n' +
      '- Having brand-documented repairs can actually increase resale confidence\n\n' +
      '**Third-party specialists:**\n' +
      '- **The Leather Surgeons** — Top-tier repair for all luxury brands\n' +
      '- **Modern Leather Goods** — Specializes in handbag restoration\n' +
      '- **Rago Brothers** — Well-known for luxury leather repair\n\n' +
      '**Important tips:**\n' +
      '- **Keep all parts** — If a clasp breaks off or a zipper pull detaches, save it for the repair\n' +
      '- **Document damage** before and after with photos — useful for insurance claims\n' +
      '- Unauthorized modifications or repairs can void brand warranties\n' +
      '- Ask for before/after photos and references from third-party repairers',
    followUp: ['Care tips', 'Storage tips', 'Insurance tips'],
  },
  {
    keywords: ['color transfer', 'denim', 'jean'],
    specificity: 3,
    response:
      '**Color transfer prevention** for luxury bags:\n\n' +
      'Light-colored bags (especially vachetta leather, light canvas, and pale leathers) are susceptible to **dye transfer from dark clothing**.\n\n' +
      '**Prevention:**\n' +
      '- Apply a **leather protectant spray** before first use — Apple Brand Garde or Collonil Carbon Pro are popular choices\n' +
      '- **Avoid wearing raw or dark denim** with light-colored bags, especially in warm weather when perspiration loosens dyes\n' +
      '- Be cautious with **dark clothing** rubbing against the bag\n' +
      '- Carry the bag by the handles rather than against your body when wearing dark clothes\n\n' +
      '**If transfer happens:**\n' +
      '- Act quickly — fresh transfer is easier to remove than set-in stains\n' +
      '- Use a gentle **leather cleaner** (not household products) and a soft cloth\n' +
      '- For vachetta, try a **white rubber eraser** gently on the affected area\n' +
      '- For serious stains, consult a professional leather cleaner rather than experimenting\n\n' +
      '**Vachetta leather** on LV bags is especially vulnerable since it\'s untreated. Some owners apply a protectant spray before ever using the bag.',
    followUp: ['Vachetta leather tips', 'Cleaning tips', 'Storage tips'],
  },

  // TRENDING AND CURRENT
  {
    keywords: ['trend', 'popular', 'hot', '2024', '2025', '2026'],
    specificity: 1,
    response:
      'Current **trends** in the luxury bag market:\n\n' +
      '**What\'s hot:**\n' +
      '- **Quiet luxury** continues to dominate — understated logos, minimal branding, exceptional materials\n' +
      '- **Bottega Veneta** and **The Row** are gaining significant resale value as quiet luxury leaders\n' +
      '- **Vintage Dior** and **Fendi** are seeing major resurgence, especially the Dior Saddle and Fendi Baguette\n' +
      '- **Micro and mini bags** remain popular for going out, but practical medium sizes hold resale value better\n\n' +
      '**Market insights:**\n' +
      '- Chanel continues raising retail prices, pushing more buyers to the resale market\n' +
      '- Hermès Birkins and Kellys remain the #1 investment bags\n' +
      '- Vintage pieces from the 90s and early 2000s are commanding premium prices\n' +
      '- Sustainability is driving more interest in pre-owned luxury\n\n' +
      '**Best advice:** Buy what you love and will use, not what\'s trending. Trends change, but a quality bag that suits your lifestyle holds its value in more ways than one.',
    followUp: ['Which bags hold value?', 'Resale tips', 'Where to buy safely'],
  },
  {
    keywords: ['dupe', 'lookalike', 'inspired', 'alternative'],
    specificity: 2,
    response:
      'Understanding **dupes vs counterfeits** — there\'s an important legal distinction:\n\n' +
      '**Legal inspired designs (dupes):**\n' +
      '- Bags that capture a **similar aesthetic** without copying specific logos, patterns, or trademarks\n' +
      '- Many affordable brands offer comparable styles — this is completely legal\n' +
      '- Examples: a quilted crossbody that looks similar to a Chanel but doesn\'t use the CC logo or specific chain design\n\n' +
      '**Illegal counterfeits:**\n' +
      '- Bags that **replicate brand logos, monograms, or trademarks** — even if they\'re "for personal use"\n' +
      '- Buying counterfeits is illegal in many jurisdictions and supports criminal supply chains\n' +
      '- Customs can confiscate counterfeits during international travel\n\n' +
      '**Affordable alternatives to explore:**\n' +
      '- Contemporary brands like Coach, Polène, DeMellier, and Songmont offer quality at lower price points\n' +
      '- Pre-owned authentic bags are often available at 30-50% off retail\n' +
      '- Many department stores carry designer bags at seasonal discounts\n\n' +
      'There\'s no shame in buying what fits your budget — a well-made alternative is better than a counterfeit.',
    followUp: ['Where to buy safely', 'Which bags hold value?', 'Resale tips'],
  },
  {
    keywords: ['insurance', 'insure', 'coverage'],
    specificity: 3,
    response:
      '**Insuring your luxury bags** — how to protect your investment:\n\n' +
      '**Options for coverage:**\n' +
      '- **Homeowner\'s / renter\'s insurance** — Standard policies typically cover personal property, but may have limits on individual items. Schedule valuable bags as specific items for full coverage\n' +
      '- **Specialized collectibles insurance** — Companies like **Collectibles Insurance** cover luxury goods specifically, often with better terms than general policies\n' +
      '- **Valuable articles policies** — Available as add-ons to existing insurance, these cover specific high-value items with agreed-upon values\n\n' +
      '**What you need:**\n' +
      '- **Detailed photos** of each bag from multiple angles\n' +
      '- **Original receipts** or documented purchase price\n' +
      '- **Authentication certificates** from professional services strengthen claims\n' +
      '- **Current appraisal** for bags that have appreciated since purchase\n\n' +
      '**Tips:**\n' +
      '- Keep a digital inventory of your collection with photos, purchase dates, and values\n' +
      '- Update appraisals annually for bags that are appreciating\n' +
      '- Understand your deductible and whether coverage is for replacement cost or current market value\n' +
      '- Consider "inland marine" insurance for bags you carry outside the home regularly',
    followUp: ['Which bags hold value?', 'Storage tips', 'Care tips'],
  },

  // GENERAL TIPS
  {
    keywords: ['smell', 'odor', 'scent'],
    specificity: 2,
    response:
      'The **smell test** is actually a useful authentication tool:\n\n' +
      '- **Authentic leather** has a distinct, rich, natural smell — earthy and warm\n' +
      '- **Red flags**: A strong chemical, plasticky, or glue-like smell is a common sign of synthetic materials used in counterfeits\n' +
      '- **New bags** may have a stronger chemical scent from leather dyes and treatments, but this should be mild and will fade over time\n' +
      '- **Coated canvas** (like LV Monogram) won\'t have a strong leather smell, but it shouldn\'t smell like plastic either\n\n' +
      'While the smell test alone isn\'t definitive, a bag that smells strongly of chemicals or has no leather scent at all when it should is worth scrutinizing further.\n\n' +
      'Pro tip: If buying online, ask the seller to describe the smell — experienced sellers know what authentic bags should smell like.',
    followUp: ['How do I spot a fake?', 'Material tips', 'Stitching tips'],
  },
  {
    keywords: ['stitching', 'stitch', 'thread', 'sewing'],
    specificity: 2,
    response:
      '**Stitching** is one of the most reliable authentication markers:\n\n' +
      '- **Consistency** — Authentic luxury bags have perfectly even stitching with identical spacing throughout. Each stitch should be the same length\n' +
      '- **Thread quality** — Genuine bags use waxed linen or polyester thread that\'s strong and has a slight sheen. It shouldn\'t fray or pull easily\n' +
      '- **Stitch count** — Different brands and models have expected stitch counts. For example, Chanel uses ~7-8 stitches per quilted diamond side\n' +
      '- **Color** — Thread color should be consistent and appropriate (LV uses mustard yellow, for example)\n\n' +
      '**Major red flags:**\n' +
      '- Uneven spacing between stitches\n' +
      '- Loose, fraying, or pulled threads\n' +
      '- Visible knots or starts/stops in the stitching\n' +
      '- Stitching that doesn\'t follow straight lines on edges and handles\n\n' +
      'Use a magnifying glass or your phone\'s macro mode to inspect stitching closely.',
    followUp: ['Hardware tips', 'How do I spot a fake?', 'Louis Vuitton tips'],
  },
  {
    keywords: ['hardware', 'zipper', 'zip', 'metal'],
    specificity: 2,
    response:
      '**Hardware** is a major authentication indicator:\n\n' +
      '- **Weight** — Authentic hardware feels noticeably heavy and solid. Counterfeits use lighter, cheaper alloys\n' +
      '- **Engravings** — Brand names should be cleanly engraved (pressed into the metal), not printed on or raised. Letters should be evenly spaced with consistent depth\n' +
      '- **Plating** — Real gold plating has a warm, rich tone and doesn\'t chip easily. Cheap plating looks overly yellow or brassy and wears off quickly\n' +
      '- **Zippers** — Should glide smoothly without catching. Most luxury brands use Lampo, RiRi, or their own branded zippers\n' +
      '- **Closure mechanisms** — Turn locks, magnetic closures, and clasps should feel precise and well-engineered\n\n' +
      '**Quick test:** Hold the bag\'s hardware in one hand and a piece of costume jewelry in the other. The luxury hardware should feel significantly heavier for its size.',
    followUp: ['Stitching tips', 'How do I spot a fake?', 'Chanel tips'],
  },
  {
    keywords: ['lining', 'interior', 'inside'],
    specificity: 2,
    response:
      'The **interior** of a bag reveals a lot about authenticity:\n\n' +
      '- **Fabric quality** — Interior lining should feel smooth, well-attached, and consistent. No loose threads, bubbling, or peeling\n' +
      '- **Color** — Should match what the brand uses for that specific model and era. For example, most Chanel Classic Flaps have burgundy interiors\n' +
      '- **Logo stamps** — Interior heat stamps or embossed logos should be clean, properly aligned, and the correct font for the brand\n' +
      '- **Pocket construction** — Interior pockets should be neatly sewn with clean edges. Zippered pockets should have branded zipper pulls\n' +
      '- **Finishing** — No glue residue, raw edges, or sloppy construction should be visible anywhere inside\n\n' +
      'Many people focus only on the outside — checking the interior is one of the most reliable ways to spot a fake because counterfeiters often cut corners where it\'s less visible.',
    followUp: ['Stitching tips', 'How do I spot a fake?', 'Hardware tips'],
  },
  {
    keywords: ['dust', 'storage', 'care', 'maintain'],
    specificity: 1,
    response:
      'Proper storage keeps your luxury bag in top condition and preserves resale value:\n\n' +
      '- **Stuff it** — Fill with acid-free tissue paper or a bag pillow to maintain shape. Avoid newspaper (ink can transfer)\n' +
      '- **Dustbag** — Always store in its dustbag to prevent dust and scratches. If you don\'t have the original, use a soft cotton pillowcase\n' +
      '- **Upright position** — Store bags standing upright, never on their side or stacked\n' +
      '- **Avoid sunlight** — Direct UV causes leather to fade and canvas to discolor\n' +
      '- **Climate control** — Keep away from excessive heat, humidity, and moisture. Avoid basements and attics\n' +
      '- **Hardware protection** — Wrap chains and clasps in tissue to prevent scratching or impressions on leather\n' +
      '- **Rotate use** — If you have multiple bags, rotate them to prevent overuse of one\n\n' +
      'For leather bags, consider conditioning every 3-6 months with a product recommended by the brand.',
    followUp: ['Resale value', 'What is vachetta?', 'Where to buy safely'],
  },

  // ─── CONVERSATIONAL BASICS ───────────────────────────────────
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo', 'hola', 'howdy'],
    specificity: 1,
    response: 'Hey there! Welcome to LuxeCheck. I\'m your luxury authentication expert. What can I help you with today?',
    altResponses: [
      'Hi! Great to see you. I\'m your luxury goods expert — ask me anything about authenticating bags, watches, shoes, perfumes, or jewelry!',
      'Hello! Welcome to LuxeCheck. Whether you\'re verifying a purchase or just curious about luxury goods, I\'m here to help.',
      'Hey! Ready to talk luxury? I can help with authentication, buying tips, brand comparisons, care advice, and more.',
    ],
    followUp: ['Authenticate a bag', 'Buying tips', 'Brand guide'],
  },
  {
    keywords: ['good morning', 'morning'],
    specificity: 1,
    response: 'Good morning! Ready to dive into some luxury authentication? What\'s on your mind?',
    altResponses: [
      'Morning! Coffee and luxury authentication — great combo. What can I help you with?',
      'Good morning! Hope your day is off to a great start. What luxury questions can I answer for you?',
      'Rise and shine! I\'m here to help with anything luxury-related. What are you curious about?',
    ],
    followUp: ['Authenticate a bag', 'Buying tips', 'Brand guide'],
  },
  {
    keywords: ['good evening', 'evening', 'good night'],
    specificity: 1,
    response: 'Good evening! Whether you\'re browsing listings or inspecting a find, I\'m here to help. What would you like to know?',
    altResponses: [
      'Good evening! Late-night luxury research? I\'m right here with you. What can I help with?',
      'Evening! Perfect time to learn about authenticating luxury goods. What\'s on your mind?',
      'Hey, good evening! Whether it\'s a midnight shopping spree or pre-purchase research, I\'ve got you covered.',
    ],
    followUp: ['Authenticate a bag', 'Buying tips', 'Brand guide'],
  },
  {
    keywords: ['thanks', 'thank you', 'thx', 'ty', 'appreciate'],
    specificity: 1,
    response: 'You\'re welcome! Let me know if you have any other questions. Happy to help!',
    altResponses: [
      'Anytime! That\'s what I\'m here for. Got more questions? Fire away!',
      'Happy to help! Don\'t hesitate to ask if anything else comes up.',
    ],
    followUp: ['Ask another question', 'Back to scanning'],
  },
  {
    keywords: ['awesome', 'great', 'perfect', 'amazing', 'cool', 'nice'],
    specificity: 1,
    response: 'Glad I could help! Anything else you\'d like to know about?',
    altResponses: [
      'Awesome! Love when I can help. Anything else on your mind?',
      'That\'s great to hear! Want to explore another topic?',
    ],
    followUp: ['Ask another question', 'Back to scanning'],
  },
  {
    keywords: ['bye', 'goodbye', 'see ya', 'later', 'cya'],
    specificity: 1,
    response: 'Happy authenticating! Come back anytime you need help verifying a luxury item. Good luck out there!',
    altResponses: [
      'See you later! Remember — when in doubt, always get a second opinion on high-value items. Take care!',
      'Bye! Good luck with your luxury finds. I\'ll be here whenever you need authentication help!',
    ],
    followUp: [],
  },
  {
    keywords: ['who are you', 'what are you', 'what can you do'],
    specificity: 1,
    response: 'I\'m the LuxeCheck Expert — your personal luxury authentication assistant. I can help you spot fakes across bags, watches, shoes, perfumes, jewelry, and accessories from over 30 luxury brands. Ask me anything!',
    followUp: ['Brands you cover', 'How authentication works', 'Buying tips'],
  },
  {
    keywords: ['help', 'what can i ask', 'options', 'menu'],
    specificity: 1,
    response: 'Here\'s what I can help with:',
    followUp: ['Bag authentication', 'Watch authentication', 'Shoe authentication', 'Perfume verification', 'Buying safely', 'Care tips', 'Resale value'],
  },
  {
    keywords: ['lol', 'haha', '\ud83d\ude02', 'funny', 'joke'],
    specificity: 1,
    response: 'Ha! Luxury authentication can be serious business, but I try to keep it fun. Got a question I can help with?',
    altResponses: [
      'I like your energy! Now, want to learn something cool about luxury goods?',
      'Haha, glad we\'re having fun! But seriously — got any authentication questions?',
    ],
    followUp: ['Authenticate a bag', 'Buying tips', 'Brand guide'],
  },
  {
    keywords: ['best bag', 'favorite', 'which should i buy', 'recommend'],
    specificity: 1,
    response: 'That\'s a tough one! It depends on your style and budget. For investment value, Herm\u00e8s Birkin and Chanel Classic Flap are hard to beat. For everyday luxury, the LV Neverfull is a classic. For trendy but timeless, Bottega Veneta\'s Jodie is gorgeous. Want me to break down any of these?',
    followUp: ['Birkin tips', 'Chanel Classic Flap', 'LV Neverfull', 'Which bags hold value?'],
  },

  // ─── WATCHES ─────────────────────────────────────────────────
  {
    keywords: ['rolex', 'watch', 'watches'],
    specificity: 2,
    response:
      'Key **Rolex** authentication markers:\n\n' +
      '- **Cyclops lens** — The date magnifier should enlarge the date **2.5x**. Fakes often only magnify 1.5x\n' +
      '- **Sweeping second hand** — Should sweep smoothly, not tick. Rolex uses a high-beat mechanical movement\n' +
      '- **Weight** — Should feel substantial and solid on the wrist\n' +
      '- **Crown engraving** — Microscopic Rolex crown etched at the 6 o\'clock position on the crystal (post-2002 models). Very hard to replicate\n' +
      '- **Serial & model numbers** — Located between the lugs. Should be **deeply engraved**, not lightly etched or acid-etched\n' +
      '- **Rehaut engraving** — Inner bezel ring should have "ROLEX" repeated in tiny text (modern models)\n\n' +
      'For high-value Rolex purchases, always get authentication from a certified watchmaker.',
    followUp: ['Omega tips', 'Cartier tips', 'Watch movements explained'],
  },
  {
    keywords: ['omega', 'speedmaster', 'seamaster'],
    specificity: 2,
    response:
      '**Omega** authentication tips:\n\n' +
      '- **Caseback engravings** — Check for **depth and precision** in the engravings. Should be sharp and clean\n' +
      '- **Crown** — Should feature the omega (\u03A9) symbol, cleanly applied\n' +
      '- **Movement** — Visible through display casebacks, the movement decoration should show **Geneva stripes** and proper finishing\n' +
      '- **Bracelet** — Links should feel **solid with no rattling**. Clasp should operate smoothly\n' +
      '- **Dial details** — Printing should be crisp under magnification with no bleeding or misalignment\n' +
      '- **Co-Axial escapement** — Modern Omegas feature this proprietary technology\n\n' +
      'Omega\'s Speedmaster "Moonwatch" and Seamaster are among the most counterfeited luxury watches after Rolex.',
    followUp: ['Rolex tips', 'Watch movements explained', 'Compare Rolex vs Omega'],
  },
  {
    keywords: ['cartier', 'tank', 'ballon bleu', 'santos'],
    specificity: 2,
    response:
      '**Cartier** watch authentication:\n\n' +
      '- **Sapphire cabochon** — The blue stone on the crown should be a **genuine sapphire**, not plastic. It should feel cool to the touch and have depth\n' +
      '- **Roman numerals** — Dial numerals should have **consistent spacing** and clean printing\n' +
      '- **Hidden signature** — Cartier hides a tiny "Cartier" signature within one of the Roman numerals (often the VII). Look closely!\n' +
      '- **Case finishing** — Should be **flawless** with crisp edges between brushed and polished surfaces\n' +
      '- **Bracelet** — Links should be perfectly fitted with smooth articulation\n\n' +
      'The Tank, Santos, and Ballon Bleu are Cartier\'s most counterfeited models.',
    followUp: ['Rolex tips', 'Cartier jewelry tips', 'Watch movements explained'],
  },
  {
    keywords: ['patek', 'patek philippe', 'nautilus', 'aquanaut'],
    specificity: 3,
    response:
      '**Patek Philippe** — one of the most counterfeited high-end watch brands:\n\n' +
      '- **Calatrava cross logo** — Should be **perfectly detailed** with clean lines\n' +
      '- **Case finishing** — Alternates between brushed and polished surfaces with **razor-sharp transitions**. This level of finishing is extremely hard to fake\n' +
      '- **Movement** — Visible through caseback, should show **Geneva stripe finishing**, beveled edges, and impeccable decoration\n' +
      '- **Nautilus bezel** — The octagonal bezel should have perfectly uniform proportions and edges\n' +
      '- **Dial texture** — Horizontal embossing on the Nautilus should be crisp and consistent\n\n' +
      'Given Nautilus prices can exceed $100k on the secondary market, professional authentication is absolutely essential.',
    followUp: ['Rolex tips', 'Audemars Piguet tips', 'Watch movements explained'],
  },
  {
    keywords: ['ap', 'audemars', 'royal oak'],
    specificity: 3,
    response:
      '**Audemars Piguet Royal Oak** authentication:\n\n' +
      '- **Octagonal bezel** — Has 8 hexagonal screws that should be **perfectly aligned** with each other. Misaligned screws are an instant tell\n' +
      '- **Tapisserie dial** — The waffle-pattern dial should be **crisp and deep** with consistent squares. Fakes often have shallow or uneven patterns\n' +
      '- **Bracelet integration** — Links should be **seamlessly integrated** with the case, flowing naturally\n' +
      '- **Case finishing** — Like Patek, AP alternates brushed and polished surfaces with razor precision\n' +
      '- **AP logo** — Should be applied (raised), not printed, on modern models\n\n' +
      'The Royal Oak\'s distinctive design makes alignment and finishing the key authentication markers.',
    followUp: ['Patek Philippe tips', 'Rolex tips', 'Watch movements explained'],
  },
  {
    keywords: ['tag heuer', 'tag'],
    specificity: 2,
    response:
      '**Tag Heuer** authentication:\n\n' +
      '- **Dial printing** — Check under magnification for **crisp, clean text** with no bleeding or fuzzy edges\n' +
      '- **Caseback** — Should have proper engravings with **model reference number**\n' +
      '- **Bracelet clasp** — Should feel **solid and secure** with clean Tag Heuer branding\n' +
      '- **Logo application** — The shield logo should be cleanly applied with precise details\n' +
      '- **Lume** — Luminous markers should glow evenly in the dark\n\n' +
      'Tag Heuer offers good value in the luxury watch space, making it a popular target for counterfeits.',
    followUp: ['Rolex tips', 'Omega tips', 'Watch movements explained'],
  },
  {
    keywords: ['watch movement', 'automatic', 'mechanical'],
    specificity: 2,
    response:
      'Understanding **watch movements**:\n\n' +
      '**Automatic (self-winding):**\n' +
      '- Has a rotor visible through display casebacks that spins with wrist movement\n' +
      '- The second hand **sweeps smoothly** (actually vibrates 6-10 times per second)\n' +
      '- Used by Rolex, Omega, Patek Philippe, and most luxury brands\n\n' +
      '**Quartz:**\n' +
      '- Battery-powered, the second hand **ticks once per second**\n' +
      '- More accurate but less prestigious in luxury watchmaking\n' +
      '- Some luxury brands use quartz (Cartier Tank, some Tag Heuer models)\n\n' +
      '**Spotting fake movements:**\n' +
      '- Fakes often use **cheap Chinese movements** that look nothing like the genuine caliber\n' +
      '- A watchmaker can open the caseback to verify the movement matches specifications\n' +
      '- Movement finishing (Geneva stripes, perlage, blued screws) should match the brand\'s standard\n\n' +
      'Having a watchmaker inspect the movement is one of the most definitive authentication methods.',
    followUp: ['Rolex tips', 'Omega tips', 'Patek Philippe tips'],
  },

  // ─── SHOES ───────────────────────────────────────────────────
  {
    keywords: ['louboutin', 'red sole', 'red bottom'],
    specificity: 3,
    response:
      '**Christian Louboutin** authentication:\n\n' +
      '- **Red sole** — Should be a specific shade of **Pantone 18-1663 red**. The lacquer should be **evenly applied and glossy**\n' +
      '- **Sole stamp** — Should read "Christian Louboutin" in a **clean, specific font** with proper spacing\n' +
      '- **Leather lining** — Interior should be **smooth and supple** with quality leather\n' +
      '- **Construction** — Seams should be invisible from the exterior, stitching tight and even\n' +
      '- **Heel** — Should be perfectly straight and well-attached with clean finishing\n\n' +
      'Pro tip: Apply sole protectors before first wear to preserve the iconic red sole.',
    followUp: ['Shoe care tips', 'Jimmy Choo tips', 'Sneaker authentication'],
  },
  {
    keywords: ['jimmy choo', 'choo'],
    specificity: 3,
    response:
      '**Jimmy Choo** authentication:\n\n' +
      '- **Sole stamp** — Check for **consistent font** in the "Jimmy Choo" stamp\n' +
      '- **Interior label** — Should have a "Made in Italy" label with a **serial number**\n' +
      '- **Hardware** — Should feel **substantial** and well-finished, not lightweight or cheap\n' +
      '- **Stitching** — Should be **invisible from the exterior** on most models\n' +
      '- **Leather quality** — Should be soft, supple, and well-finished on all surfaces\n' +
      '- **Dustbag** — Authentic dustbags are quality fabric with correct branding\n\n' +
      'Jimmy Choo shoes are less counterfeited than some brands but still worth verifying for high-value styles.',
    followUp: ['Louboutin tips', 'Shoe care tips', 'Where to buy safely'],
  },
  {
    keywords: ['nike', 'jordan', 'dunk', 'sneaker', 'sneakers'],
    specificity: 2,
    response:
      '**Sneaker authentication** tips:\n\n' +
      '- **SKU number** — The SKU on the box should **match the tag inside the shoe** exactly\n' +
      '- **Stitching** — Should be **consistent** throughout with no loose threads or uneven spacing\n' +
      '- **Tongue label** — Font should **match official releases** — compare letter by letter with verified photos\n' +
      '- **Sole glue** — Should be **clean with no overflow**. Excess glue visible around the sole is a red flag\n' +
      '- **UV light** — Can reveal inconsistencies in materials that aren\'t visible to the naked eye\n' +
      '- **Boost/foam** — On Adidas/Nike, midsole material should have the correct texture and density\n\n' +
      'Platforms like **CheckCheck** and **Legit Check** specialize in sneaker authentication.',
    followUp: ['Yeezy tips', 'Shoe care tips', 'UV light testing'],
  },
  {
    keywords: ['yeezy', 'adidas yeezy'],
    specificity: 3,
    response:
      '**Yeezy** authentication:\n\n' +
      '- **Boost sole** — Should have a **distinct texture** — try the squish test; real Boost is soft and bouncy\n' +
      '- **Pull tabs** — Should be **angled correctly** at the specific degree for each model\n' +
      '- **Interior size tag** — Has a **specific format** that varies by model and production year\n' +
      '- **Box label** — The font and spacing on the box label is **commonly wrong on fakes**\n' +
      '- **Primeknit pattern** — The weave pattern should match retail pairs exactly\n' +
      '- **Overall shape** — Sole curvature and toe box shape are often slightly off on reps\n\n' +
      'Yeezys are among the most replicated sneakers. For high-value colorways, always get professional authentication.',
    followUp: ['Sneaker tips', 'Shoe care tips', 'Where to buy safely'],
  },
  {
    keywords: ['shoe care', 'sole protector', 'shoe tree'],
    specificity: 2,
    response:
      '**Shoe care** tips for luxury footwear:\n\n' +
      '- **Cedar shoe trees** — Use after every wear to absorb moisture and maintain shape\n' +
      '- **Sole protectors** — Apply to Louboutins before first wear to preserve the red. Vibram makes excellent sole guards\n' +
      '- **Dustbags** — Always store in individual dustbags to prevent scratching\n' +
      '- **Cleaners** — Use appropriate products: leather cleaner for leather, suede brush for suede, sneaker cleaner for canvas/mesh\n' +
      '- **Rotation** — Rotate shoes to prevent excessive wear on any single pair\n' +
      '- **Weather** — Avoid wearing leather shoes in heavy rain. Use waterproof spray as preventive care\n\n' +
      'Well-maintained luxury shoes hold significantly more resale value.',
    followUp: ['Louboutin tips', 'Sneaker tips', 'Storage tips'],
  },

  // ─── PERFUMES AND FRAGRANCES ─────────────────────────────────
  {
    keywords: ['perfume', 'fragrance', 'cologne', 'scent', 'fake perfume'],
    specificity: 2,
    response:
      'General **perfume authentication** tips:\n\n' +
      '- **Batch code** — Code on bottle bottom should **match the box**\n' +
      '- **Cellophane wrap** — Should be **tight and professional** with clean seams\n' +
      '- **Cap fit** — Should fit **snugly** with no wobble or gaps\n' +
      '- **Sprayer** — Should produce a **fine, even mist**, not a stream or uneven spray\n' +
      '- **Scent profile** — Real fragrances have **complex evolving notes** (top, middle, base) while fakes smell flat and one-dimensional\n' +
      '- **Longevity** — Authentic perfumes last hours on skin. Fakes fade within 30-60 minutes\n\n' +
      'Buy from authorized retailers whenever possible. If buying secondhand, verify batch codes on checkfresh.com.',
    followUp: ['Creed tips', 'Batch code explained', 'Tom Ford fragrance tips'],
  },
  {
    keywords: ['creed', 'aventus', 'green irish tweed'],
    specificity: 3,
    response:
      '**Creed** authentication — one of the most counterfeited fragrance houses:\n\n' +
      '- **Batch code** — Format should be **correct for the production era**\n' +
      '- **Millesime designation** — Should be **printed directly** on the bottle, not on a sticker\n' +
      '- **Cap weight** — Should feel **substantial** in hand, quality materials\n' +
      '- **Bottle glass** — Should be **thick and high quality** with proper weight\n' +
      '- **Presentation box** — Should have **magnetic closure** with clean printing\n' +
      '- **Atomizer** — Should produce a fine, even mist pattern\n\n' +
      'Creed Aventus is the single most counterfeited niche fragrance. Buy only from authorized Creed retailers or verified resellers.',
    followUp: ['Perfume authentication', 'Batch code explained', 'MFK tips'],
  },
  {
    keywords: ['tom ford', 'tom ford perfume'],
    specificity: 3,
    response:
      '**Tom Ford** fragrance authentication:\n\n' +
      '- **Bottle weight** — Should feel **heavy with quality glass**\n' +
      '- **Label** — Should be **perfectly centered and straight** on the bottle\n' +
      '- **Cap** — Should be **magnetic** with a satisfying close\n' +
      '- **Font** — Label uses a **specific serif typeface** — compare with official images\n' +
      '- **Private Blend** — Each fragrance family has a **distinct bottle shape** and color scheme\n' +
      '- **Box** — Should have clean printing with correct color and Tom Ford branding\n\n' +
      'Tom Ford\'s Private Blend and Oud collections are premium targets for counterfeiters.',
    followUp: ['Perfume authentication', 'Creed tips', 'Batch code explained'],
  },
  {
    keywords: ['mfk', 'kurkdjian', 'baccarat rouge'],
    specificity: 3,
    response:
      '**Maison Francis Kurkdjian** authentication — **Baccarat Rouge 540** is heavily counterfeited:\n\n' +
      '- **Box** — Should have **clean embossing** with precise lettering\n' +
      '- **Bottle** — Has a specific **weight and glass clarity** that\'s hard to fake\n' +
      '- **Cap** — Should fit **precisely** with no gaps or wobble\n' +
      '- **Batch code** — Can be verified on checkfresh.com or similar databases\n' +
      '- **Scent** — BR540 has a distinctive saffron-cedar-ambergris profile. Fakes often smell sweeter and simpler\n' +
      '- **Longevity** — Authentic BR540 is a beast performer, lasting 8-12+ hours\n\n' +
      'Due to its popularity and price point, BR540 is one of the most faked niche fragrances globally.',
    followUp: ['Perfume authentication', 'Le Labo / Byredo tips', 'Batch code explained'],
  },
  {
    keywords: ['le labo', 'santal', 'byredo'],
    specificity: 3,
    response:
      '**Niche fragrance** authentication tips:\n\n' +
      '**Le Labo:**\n' +
      '- Bottles have a distinctive **typewriter-style label** with the purchaser\'s name and date\n' +
      '- Custom labels should have consistent ink density and alignment\n' +
      '- Glass and cap quality should feel premium\n\n' +
      '**Byredo:**\n' +
      '- **Minimalist packaging** with a specific font and bottle proportions\n' +
      '- Cap should be weighty and fit precisely\n' +
      '- Embossed branding should be clean and consistent\n\n' +
      'Both are **less counterfeited** than mainstream designers but still worth checking batch codes. Buy from authorized retailers for peace of mind.',
    followUp: ['Perfume authentication', 'Creed tips', 'Batch code explained'],
  },
  {
    keywords: ['batch code', 'check fresh', 'production date'],
    specificity: 2,
    response:
      'Understanding **batch codes** on perfumes:\n\n' +
      '- Most perfume bottles have a **printed or stamped code** on the bottom indicating production date and batch\n' +
      '- **checkfresh.com** and **checkcosmetic.net** can decode batch codes for many brands\n' +
      '- The code should match between the **bottle and the box**\n\n' +
      '**Red flags:**\n' +
      '- **Missing batch code** — almost all legitimate fragrances have one\n' +
      '- Code that **doesn\'t decode** on verification sites\n' +
      '- **Mismatched codes** between bottle and box\n' +
      '- Production date that\'s **too old** for a "new" sealed product (fragrances degrade over time)\n\n' +
      'Batch code verification is one of the quickest ways to check a fragrance\'s legitimacy.',
    followUp: ['Perfume authentication', 'Where to buy safely', 'Creed tips'],
  },

  // ─── JEWELRY ─────────────────────────────────────────────────
  {
    keywords: ['tiffany', 'tiffany & co'],
    specificity: 2,
    response:
      '**Tiffany & Co** authentication:\n\n' +
      '- **Stamps** — All pieces should be stamped with **"T&Co"**. Sterling silver says **"925"**\n' +
      '- **Tiffany Blue** — The box and pouch have a **specific Pantone color** (1837 Blue) — fakes often get the shade wrong\n' +
      '- **Heart tag collection** — Should have **clean, deep engraving** with consistent font\n' +
      '- **Return to Tiffany** — Pieces should have the **correct font and spacing** for "Please Return to Tiffany & Co New York"\n' +
      '- **Weight** — Authentic silver pieces feel **substantial**, not hollow\n' +
      '- **Chain quality** — Links should be uniform and the clasp should work smoothly\n\n' +
      'Tiffany\'s website has a product registry for newer pieces that can help verify authenticity.',
    followUp: ['Van Cleef tips', 'Cartier Love bracelet', 'Gold and metals explained'],
  },
  {
    keywords: ['van cleef', 'vca', 'arpels', 'alhambra'],
    specificity: 3,
    response:
      '**Van Cleef & Arpels Alhambra** authentication:\n\n' +
      '- **Clover motif** — Should have **precise symmetry** with clean, even edges\n' +
      '- **Beading** — The tiny beads around the edge should be **perfectly uniform** in size and spacing\n' +
      '- **Clasp** — Should be stamped with **VCA, metal type, and serial number**\n' +
      '- **Serial number** — Engraved on the clasp, should be verifiable with VCA\n' +
      '- **Stone setting** — Mother of pearl, onyx, or other stones should be flush and evenly set\n' +
      '- **Chain** — Should feel delicate but substantial, with a smooth finish\n\n' +
      'VCA Alhambra is one of the most counterfeited fine jewelry collections. Always buy from authorized dealers or get professional authentication.',
    followUp: ['Tiffany tips', 'Cartier Love bracelet', 'Gold and metals explained'],
  },
  {
    keywords: ['bvlgari', 'bulgari'],
    specificity: 2,
    response:
      '**Bvlgari** authentication:\n\n' +
      '- **BVLGARI BVLGARI engraving** — Should be **clean and precise** with consistent depth throughout\n' +
      '- **B.zero1 rings** — Should have **specific proportions** that match the model and size\n' +
      '- **Serpenti** — Snake-inspired pieces should have **detailed scale work** with consistent pattern\n' +
      '- **Stamps** — All pieces should be stamped with **metal type and serial number**\n' +
      '- **Weight** — Bvlgari pieces use quality materials and should feel appropriately heavy\n' +
      '- **Box and packaging** — Should match Bvlgari\'s current packaging design with correct colors\n\n' +
      'The B.zero1 ring and Serpenti collection are Bvlgari\'s most counterfeited lines.',
    followUp: ['Tiffany tips', 'Van Cleef tips', 'Gold and metals explained'],
  },
  {
    keywords: ['cartier love', 'love bracelet', 'cartier jewelry'],
    specificity: 3,
    response:
      '**Cartier Love bracelet** authentication:\n\n' +
      '- **Screw motifs** — Should be **evenly spaced and perfectly round** across the entire bracelet\n' +
      '- **Interior engraving** — Should include **Cartier, metal type, serial number, and size**\n' +
      '- **Weight** — Should match official specifications for the metal type (18k gold Love bracelet weighs ~30-38g depending on size)\n' +
      '- **Screwdriver fit** — The included screwdriver should fit **perfectly** into the screws\n' +
      '- **Oval shape** — The bracelet is actually oval, not round. Should conform to the wrist ergonomically\n' +
      '- **Edge finishing** — Edges should be smooth and rounded with no sharp spots\n\n' +
      'The Love bracelet is the most counterfeited Cartier piece. Always request the certificate and verify the serial number.',
    followUp: ['Cartier watch tips', 'Gold and metals explained', 'Where to buy safely'],
  },
  {
    keywords: ['gold', 'karat', '14k', '18k', '24k', 'platinum'],
    specificity: 2,
    response:
      'Understanding **precious metals** in luxury jewelry:\n\n' +
      '- **24k** — Pure gold (99.9%). Very soft, rarely used in jewelry. Deep yellow color\n' +
      '- **18k** — 75% gold. The **luxury standard** — rich color with good durability\n' +
      '- **14k** — 58.5% gold. More durable, slightly paler. Common in everyday jewelry\n' +
      '- **Platinum** — Heavier than gold, naturally white, hypoallergenic. Stamped "950" or "Pt"\n\n' +
      '**Verification tips:**\n' +
      '- All should be **stamped** with karat/purity marks\n' +
      '- Use a **jeweler\'s loupe** to check stamps closely\n' +
      '- **Acid test** — Jewelers can test gold purity with acid solutions\n' +
      '- **Electronic testers** — Non-destructive tools that measure metal composition\n' +
      '- **Weight** — Gold is dense; if a piece feels too light for its size, be suspicious\n\n' +
      'Different regions use different marking systems — ask your jeweler to explain the stamps.',
    followUp: ['Cartier Love bracelet', 'Tiffany tips', 'Where to buy safely'],
  },

  // ─── SUNGLASSES AND EYEWEAR ──────────────────────────────────
  {
    keywords: ['sunglasses', 'glasses', 'eyewear', 'ray ban', 'rayban'],
    specificity: 2,
    response:
      '**Sunglass authentication** tips:\n\n' +
      '- **Laser-etched logo** — Hold lenses at an angle to light to see **brand logos etched into the lens**\n' +
      '- **Hinges** — Should feel **smooth and tight** with no wobble or looseness\n' +
      '- **Nose pads** — Should be **branded** on luxury pairs\n' +
      '- **Temple arm** — Model number and color code should be **printed clearly** on the inside\n' +
      '- **Case quality** — Branded case and cleaning cloth should feel premium\n' +
      '- **UV protection** — Authentic lenses provide real UV protection (testable at opticians)\n\n' +
      'Counterfeit sunglasses are dangerous — fake lenses can actually harm your eyes by dilating pupils without blocking UV.',
    followUp: ['Designer sunglasses', 'Where to buy safely', 'Care tips'],
  },
  {
    keywords: ['gucci sunglasses', 'chanel sunglasses', 'dior sunglasses'],
    specificity: 3,
    response:
      '**Designer sunglasses** authentication:\n\n' +
      '- Most luxury sunglasses are manufactured by **Luxottica** or **Kering Eyewear**\n' +
      '- **"Made in Italy" stamp** — Should be present on the temple arm\n' +
      '- **Model and color codes** — Printed on temple arm, should match the brand\'s database\n' +
      '- **Original packaging** — Should include branded case, cleaning cloth, and authenticity card\n' +
      '- **Lens quality** — Should be optically clear with no distortion\n' +
      '- **Weight distribution** — Should feel balanced and comfortable\n\n' +
      'Check the brand\'s official website for current season styles to verify the model exists.',
    followUp: ['Sunglasses tips', 'Where to buy safely', 'Gucci tips'],
  },

  // ─── BELTS AND SMALL LEATHER GOODS ───────────────────────────
  {
    keywords: ['belt', 'gucci belt', 'lv belt', 'hermes belt'],
    specificity: 2,
    response:
      '**Belt authentication** tips:\n\n' +
      '- **Buckle engraving** — Should be **cleanly engraved** with proper brand markings\n' +
      '- **Leather edges** — Should be **finished and painted** evenly — no raw or rough edges\n' +
      '- **Holes** — Should be **cleanly punched** through the leather\n' +
      '- **Sizing stamps** — Should be present on the back of the belt\n' +
      '- **Herm\u00e8s H buckle** — Should have a **distinct click** when the buckle closes\n' +
      '- **Gucci GG buckle** — Should feel heavy with clean casting. The gold should be a warm tone\n\n' +
      'Belts are among the most commonly counterfeited luxury accessories due to their visible branding.',
    followUp: ['Small leather goods', 'Gucci tips', 'Hardware tips'],
  },
  {
    keywords: ['wallet', 'card holder', 'slg', 'small leather'],
    specificity: 2,
    response:
      '**Small leather goods** authentication:\n\n' +
      'The same principles apply as for bags — check stitching, stamps, hardware, and material quality.\n\n' +
      '**Key checks:**\n' +
      '- **Interior stamps** — Brand stamps should be clean and properly placed\n' +
      '- **Card slot construction** — Should be precise with clean edges and consistent sizing\n' +
      '- **Zipper** — Should glide smoothly with branded pulls\n' +
      '- **Edge painting** — Should be even and consistent in color\n' +
      '- **Leather quality** — Should feel consistent with the brand\'s standard\n\n' +
      'SLGs are among the **most commonly counterfeited** luxury items due to their lower price point and high demand. Don\'t let a lower price tag make you skip authentication.',
    followUp: ['Belt tips', 'How do I spot a fake?', 'Where to buy safely'],
  },

  // ─── GENERAL LUXURY MARKET ───────────────────────────────────
  {
    keywords: ['luxury index', 'market', 'resale market', 'growth'],
    specificity: 1,
    response:
      'The **global luxury resale market** is growing rapidly — estimated to reach over $50 billion in the next few years.\n\n' +
      '**Key trends:**\n' +
      '- Pre-owned luxury is becoming **mainstream** with major platforms making it accessible\n' +
      '- **Authentication is the biggest concern** holding the market back — which is exactly why tools like LuxeCheck matter\n' +
      '- Younger consumers (Gen Z, Millennials) are driving resale growth\n' +
      '- Brands like Gucci and Burberry are launching their own resale programs\n\n' +
      'The resale market represents a huge opportunity for both buyers and sellers.',
    followUp: ['Which bags hold value?', 'Where to buy safely', 'Sustainability'],
  },
  {
    keywords: ['sustainability', 'sustainable', 'eco', 'environment'],
    specificity: 1,
    response:
      'Buying pre-owned luxury is one of the **most sustainable fashion choices**:\n\n' +
      '- **Extends the lifecycle** of well-made goods that were built to last decades\n' +
      '- **Reduces demand** for new production and its environmental impact\n' +
      '- Luxury items maintain quality through **multiple owners** unlike fast fashion\n' +
      '- **Reduces waste** — a Birkin can last 50+ years with proper care\n\n' +
      'By authenticating and buying pre-owned, you\'re making a choice that\'s both luxurious and environmentally conscious.',
    followUp: ['Where to buy safely', 'Care tips', 'Which bags hold value?'],
  },
  {
    keywords: ['gift', 'gifting', 'present', 'birthday', 'anniversary'],
    specificity: 1,
    response:
      '**Gifting pre-owned luxury** — it\'s perfectly acceptable and increasingly common:\n\n' +
      '- **Get items authenticated** before gifting for peace of mind\n' +
      '- **Professional cleaning** — Have the item cleaned or "spa-treated" by the brand before presenting\n' +
      '- **Authentication certificate** — Include it with the gift for added confidence\n' +
      '- **Original packaging** — If available, the box, dustbag, and ribbon elevate the presentation\n' +
      '- **Personal touch** — Consider getting items monogrammed or customized where the brand offers it\n\n' +
      'A pre-owned Chanel Classic Flap in excellent condition is just as special as a new one — and often at a much better price.',
    followUp: ['Which bags hold value?', 'Where to buy safely', 'Care tips'],
  },

  // ─── BRAND COMPARISONS ──────────────────────────────────────
  {
    keywords: ['compare', 'vs', 'versus', 'better', 'difference between'],
    specificity: 1,
    response: 'Which brands are you comparing? I can break down differences in quality, resale value, authentication difficulty, and overall value. Just name the two brands or items!',
    followUp: ['LV vs Gucci', 'Chanel vs Herm\u00e8s', 'Rolex vs Omega'],
  },
  {
    keywords: ['lv vs gucci', 'louis vuitton vs gucci'],
    specificity: 3,
    response:
      '**Louis Vuitton vs Gucci** comparison:\n\n' +
      '**Resale value:** LV has stronger and more consistent resale value\n' +
      '**Design:** Gucci offers more trendy, fashion-forward designs that can fluctuate in value. LV is more classic\n' +
      '**Durability:** LV canvas is extremely durable for everyday use. Gucci leather goods are generally softer\n' +
      '**Counterfeiting:** Both are heavily counterfeited. LV monogram alignment is the quickest check. Gucci GG Supreme texture is the key tell\n' +
      '**Price range:** Similar price points for comparable items\n' +
      '**Investment:** LV Neverfull and Speedy hold value better than most Gucci bags\n\n' +
      'Both are excellent brands — your choice depends on whether you prefer classic (LV) or trend-forward (Gucci).',
    followUp: ['LV authentication tips', 'Gucci authentication tips', 'Which bags hold value?'],
  },
  {
    keywords: ['chanel vs hermes', 'hermes vs chanel'],
    specificity: 3,
    response:
      '**Chanel vs Herm\u00e8s** comparison:\n\n' +
      '**Investment:** Herm\u00e8s is the ultimate — Birkins and Kellys **appreciate in value** and have waitlists. Chanel Classic Flap has seen consistent price increases\n' +
      '**Craftsmanship:** Herm\u00e8s uses **hand-stitching throughout** while Chanel uses machine stitching on most bags\n' +
      '**Accessibility:** Chanel is available in boutiques without waitlists. Herm\u00e8s Birkin/Kelly require a purchase history\n' +
      '**Price entry:** Chanel starts lower (~$5k for Classic Flap). Birkin starts ~$10k+ retail, much more secondary\n' +
      '**Resale:** Both hold value extremely well, but Herm\u00e8s consistently outperforms\n' +
      '**Style:** Chanel is more overtly luxurious. Herm\u00e8s is understated craftsmanship\n\n' +
      'If you can only buy one: Chanel for everyday luxury, Herm\u00e8s for investment.',
    followUp: ['Birkin tips', 'Chanel Classic Flap tips', 'Which bags hold value?'],
  },
  {
    keywords: ['rolex vs omega'],
    specificity: 3,
    response:
      '**Rolex vs Omega** comparison:\n\n' +
      '**Brand recognition:** Rolex wins — it\'s the most recognized luxury watch brand globally\n' +
      '**Resale value:** Rolex holds value significantly better, especially Submariner, Daytona, and GMT-Master\n' +
      '**Movement technology:** Omega offers arguably **better technology for the price** with Co-Axial escapements\n' +
      '**Counterfeiting:** Both are heavily counterfeited. Rolex has the smooth second hand sweep; Omega has detailed dial finishing\n' +
      '**Price:** Omega offers more value at similar price points. Rolex secondary market prices are often above retail\n' +
      '**Heritage:** Both have incredible history — Rolex with diving, Omega with NASA and the Moonwatch\n\n' +
      'For investment: Rolex. For horological value per dollar: Omega.',
    followUp: ['Rolex tips', 'Omega tips', 'Watch movements explained'],
  },
];

// ─── FILLER WORDS ──────────────────────────────────────────────
const FILLER_WORDS = new Set([
  'how', 'do', 'does', 'i', 'my', 'the', 'a', 'an', 'is', 'are', 'was', 'were',
  'can', 'could', 'would', 'should', 'will', 'what', 'where', 'when', 'why', 'which',
  'tell', 'me', 'about', 'know', 'please', 'want', 'need', 'help', 'check', 'think',
  'look', 'like', 'just', 'also', 'really', 'very', 'to', 'for', 'of', 'in', 'on',
  'it', 'its', 'if', 'or', 'and', 'but', 'so', 'this', 'that', 'with', 'from', 'have',
  'has', 'had', 'not', 'no', 'yes', 'yeah', 'yep', 'ok', 'okay', 'got', 'get',
]);

// ─── BRAND DETECTION MAP ───────────────────────────────────────
const BRAND_MAP = {
  'louis vuitton': ['lv', 'louis', 'vuitton', 'neverfull', 'speedy', 'alma', 'keepall'],
  'chanel': ['chanel', 'classic flap', 'boy bag', 'woc', 'wallet on chain'],
  'gucci': ['gucci', 'dionysus', 'marmont', 'ophidia', 'gg'],
  'hermes': ['hermes', 'hermès', 'birkin', 'kelly'],
  'dior': ['dior', 'lady dior', 'saddle', 'book tote'],
  'prada': ['prada', 'saffiano'],
  'rolex': ['rolex', 'submariner', 'datejust', 'daytona'],
  'cartier': ['cartier', 'tank', 'santos', 'ballon'],
  'omega': ['omega', 'speedmaster', 'seamaster'],
  'louboutin': ['louboutin', 'red sole', 'red bottom'],
  'tiffany': ['tiffany'],
  'ysl': ['ysl', 'saint laurent', 'loulou'],
  'bottega veneta': ['bottega', 'intrecciato'],
  'fendi': ['fendi', 'baguette', 'peekaboo'],
  'celine': ['celine', 'céline', 'triomphe'],
  'patek philippe': ['patek', 'nautilus', 'aquanaut'],
  'audemars piguet': ['audemars', 'ap', 'royal oak'],
  'tag heuer': ['tag heuer'],
  'bvlgari': ['bvlgari', 'bulgari'],
  'van cleef': ['van cleef', 'vca', 'alhambra'],
  'creed': ['creed', 'aventus'],
  'tom ford': ['tom ford'],
  'jimmy choo': ['jimmy choo', 'choo'],
};

// ─── PRODUCT TYPE MAP ──────────────────────────────────────────
const PRODUCT_MAP = {
  'bags': ['bag', 'bags', 'purse', 'handbag', 'tote', 'clutch', 'crossbody', 'satchel', 'backpack'],
  'watches': ['watch', 'watches', 'timepiece', 'wrist'],
  'shoes': ['shoe', 'shoes', 'sneaker', 'sneakers', 'heel', 'heels', 'boot', 'boots', 'loafer'],
  'perfume': ['perfume', 'fragrance', 'cologne', 'scent', 'spray', 'eau de'],
  'jewelry': ['jewelry', 'jewellery', 'bracelet', 'necklace', 'ring', 'earring', 'pendant', 'chain'],
  'sunglasses': ['sunglasses', 'glasses', 'shades', 'eyewear'],
  'belts': ['belt', 'belts', 'buckle'],
  'wallets': ['wallet', 'card holder', 'card case', 'coin purse'],
};

// Brand → relevant product chips
const BRAND_PRODUCT_CHIPS = {
  'louis vuitton': ['LV bags', 'LV wallets', 'LV belts'],
  'chanel': ['Chanel bags', 'Chanel shoes', 'Chanel sunglasses'],
  'gucci': ['Gucci bags', 'Gucci belts', 'Gucci sunglasses'],
  'hermes': ['Hermès bags', 'Hermès belts', 'Hermès scarves'],
  'dior': ['Dior bags', 'Dior sunglasses', 'Dior shoes'],
  'rolex': ['Rolex authentication', 'Watch movements', 'Compare Rolex vs Omega'],
  'cartier': ['Cartier watches', 'Cartier jewelry', 'Cartier Love bracelet'],
  'omega': ['Omega authentication', 'Compare Rolex vs Omega', 'Watch movements'],
};

// Product → relevant brand chips
const PRODUCT_BRAND_CHIPS = {
  'bags': ['Louis Vuitton', 'Chanel', 'Gucci', 'Hermès', 'Dior', 'Prada'],
  'watches': ['Rolex', 'Omega', 'Cartier', 'Patek Philippe', 'Tag Heuer'],
  'shoes': ['Louboutin', 'Jimmy Choo', 'Sneaker authentication', 'Yeezy'],
  'perfume': ['Creed', 'Tom Ford', 'MFK / Baccarat Rouge', 'Batch codes'],
  'jewelry': ['Tiffany', 'Cartier Love bracelet', 'Van Cleef & Arpels', 'Bvlgari'],
  'sunglasses': ['Designer sunglasses', 'Gucci', 'Where to buy safely'],
  'belts': ['Gucci belt', 'Hermès belt', 'LV belt'],
  'wallets': ['Small leather goods', 'LV tips', 'How to spot a fake'],
};

// ─── FUN FACTS ─────────────────────────────────────────────────
const FUN_FACTS = [
  '\n\n\u2728 **Fun fact:** Hermès Birkins have outperformed the S&P 500 over the last 35 years!',
  '\n\n\u2728 **Fun fact:** Chanel increases Classic Flap prices 2-3 times per year.',
  '\n\n\u2728 **Fun fact:** A single Hermès Birkin takes 18-25 hours to make by one artisan.',
  '\n\n\u2728 **Fun fact:** Louis Vuitton\'s monogram canvas was designed in 1896 and hasn\'t changed since.',
  '\n\n\u2728 **Fun fact:** The "Speedy" bag was originally created in 1930 and Audrey Hepburn asked for a smaller version in the 1960s.',
  '\n\n\u2728 **Fun fact:** Chanel No. 5 was the first perfume to use synthetic aldehydes, revolutionizing fragrance.',
  '\n\n\u2728 **Fun fact:** The Rolex Daytona "Paul Newman" sold for $17.8 million at auction in 2017.',
  '\n\n\u2728 **Fun fact:** Bottega Veneta\'s "no logo" approach means their quality speaks for itself — authentication relies purely on craftsmanship.',
  '\n\n\u2728 **Fun fact:** The global luxury resale market is expected to exceed $50 billion by 2028.',
  '\n\n\u2728 **Fun fact:** Cartier\'s Love bracelet was designed in 1969 to symbolize everlasting love — you need a screwdriver to take it off!',
  '\n\n\u2728 **Fun fact:** Gucci\'s interlocking GG logo was created in the 1960s as a tribute to founder Guccio Gucci.',
  '\n\n\u2728 **Fun fact:** Hermès started as a harness workshop for European noblemen in 1837.',
  '\n\n\u2728 **Fun fact:** The Chanel 2.55 bag is named after its creation date: February 1955.',
  '\n\n\u2728 **Fun fact:** Christian Louboutin\'s red soles were inspired when he painted nail polish on a shoe prototype.',
  '\n\n\u2728 **Fun fact:** A well-maintained luxury bag can last 50+ years with proper care.',
  '\n\n\u2728 **Fun fact:** Patek Philippe\'s slogan is "You never actually own a Patek Philippe. You merely look after it for the next generation."',
  '\n\n\u2728 **Fun fact:** Over 90% of luxury goods sold on unverified social media accounts are counterfeit.',
  '\n\n\u2728 **Fun fact:** The Omega Speedmaster was the first watch worn on the moon during Apollo 11 in 1969.',
  '\n\n\u2728 **Fun fact:** Tiffany & Co.\'s signature blue color (Pantone 1837) is trademarked and named after their founding year.',
  '\n\n\u2728 **Fun fact:** Buying pre-owned luxury reduces fashion\'s environmental impact more than almost any other consumer choice.',
];

// ─── INTENT PATTERNS ───────────────────────────────────────────
const INTENTS = {
  price: {
    words: ['cost', 'price', 'expensive', 'cheap', 'worth', 'value', 'budget', 'afford', 'money', 'dollar', '$'],
    response: 'Great question about value! Luxury resale prices vary widely by brand, model, and condition. Hermès and Chanel tend to hold the most value, while trendy pieces fluctuate more. Want me to break down a specific brand or topic?',
    followUp: ['Bags that hold value', 'Best entry-level luxury', 'Resale market tips'],
  },
  shopping: {
    words: ['buy', 'store', 'shop', 'online', 'website', 'trusted', 'where', 'purchase', 'order'],
    response: 'Looking to buy luxury? Smart move checking here first! Stick to platforms with built-in authentication like Vestiaire Collective, The RealReal, Fashionphile, or Rebag. Avoid unverified social media sellers. What are you looking to buy?',
    followUp: ['Buy online safely', 'Best resale platforms', 'Thrift store tips'],
  },
  care: {
    words: ['clean', 'fix', 'repair', 'store', 'maintain', 'protect', 'scratch', 'damage', 'stain', 'restore', 'condition'],
    response: 'Taking care of your luxury items is key to preserving both their beauty and value! The basics: proper storage in dustbags, regular conditioning for leather, and avoiding extreme conditions. What type of item do you need care advice for?',
    followUp: ['Bag care', 'Watch care', 'Shoe care'],
  },
  comparison: {
    words: ['best', 'top', 'better', 'worst', 'compare', 'vs', 'versus', 'favorite', 'recommend', 'rank', 'ranking'],
    response: 'I love a good comparison! I can break down differences in quality, resale value, authentication difficulty, and overall value between brands and models. What are you comparing?',
    followUp: ['Best investment bags', 'Best everyday luxury', 'Compare brands'],
  },
  emotional: {
    words: ['worried', 'scared', 'nervous', 'afraid', 'anxious', 'unsure', 'scammed', 'ripped off', 'suspicious', 'doubt', 'concerned', 'confused'],
    response: 'Don\'t worry — that\'s exactly why LuxeCheck exists. Let\'s figure this out together. Whether you\'re questioning a purchase or verifying something you already own, I can walk you through what to look for. What item are you looking at?',
    followUp: ['Check a bag', 'Spot a fake', 'Buying safely'],
  },
};

// ─── HELPER FUNCTIONS ──────────────────────────────────────────

function cleanInput(text) {
  // Remove emojis, punctuation, normalize whitespace
  return text
    .toLowerCase()
    .replace(/[\u{1F600}-\u{1F9FF}\u{2600}-\u{2B55}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '')
    .replace(/[^\w\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWords(cleaned) {
  return cleaned.split(' ').filter(Boolean);
}

function stripFillers(words) {
  return words.filter((w) => !FILLER_WORDS.has(w));
}

function partialMatch(userWord, keyword) {
  // Both must be >= 4 chars to avoid false positives
  if (userWord.length < 4 || keyword.length < 4) return false;
  return userWord.startsWith(keyword) || keyword.startsWith(userWord);
}

function detectBrand(cleaned) {
  for (const [brand, aliases] of Object.entries(BRAND_MAP)) {
    for (const alias of aliases) {
      if (cleaned.includes(alias)) return brand;
    }
  }
  return null;
}

function detectProduct(cleaned) {
  for (const [category, terms] of Object.entries(PRODUCT_MAP)) {
    for (const term of terms) {
      if (cleaned.includes(term)) return category;
    }
  }
  return null;
}

function guessCategory(entry) {
  const kws = entry.keywords.join(' ');
  if (/buy|sell|shop|store|platform|ebay|poshmark|mercari|thrift|facebook/.test(kws)) return 'buying';
  if (/clean|repair|care|maintain|storage|dust|stain|protect|color transfer/.test(kws)) return 'care';
  if (/worth|value|resale|invest|price|market|growth/.test(kws)) return 'value';
  if (/compare|vs|versus/.test(kws)) return 'comparison';
  return 'authentication';
}

function pickVariation(entry) {
  if (entry.altResponses && entry.altResponses.length > 0) {
    const all = [entry.response, ...entry.altResponses];
    return all[Math.floor(Math.random() * all.length)];
  }
  return entry.response;
}

function maybeAppendFunFact(text) {
  // 1 in 5 chance
  if (Math.random() < 0.2) {
    return text + FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
  }
  return text;
}

function detectIntent(cleaned) {
  for (const [, intent] of Object.entries(INTENTS)) {
    let hits = 0;
    for (const w of intent.words) {
      if (cleaned.includes(w)) hits++;
    }
    if (hits > 0) {
      return {
        response: intent.response,
        followUp: intent.followUp,
        detectedBrand: null,
        detectedProduct: null,
        category: null,
      };
    }
  }
  return null;
}

// Find the best entry for a given brand (general entry)
function findBrandEntry(brand) {
  const brandLower = brand.toLowerCase();
  for (const entry of responses) {
    if (entry.specificity === 2 || entry.specificity === 1) {
      for (const kw of entry.keywords) {
        if (brandLower.includes(kw) || kw.includes(brandLower.split(' ')[0])) {
          return entry;
        }
      }
    }
  }
  return null;
}

// ─── CORE KEYWORD MATCHING (Layer 1) ───────────────────────────

function keywordMatch(cleaned, strippedWords, isLong, isQuestion) {
  let bestMatch = null;
  let bestCount = 0;
  let bestSpecificity = 0;

  for (const entry of responses) {
    let count = 0;
    for (const kw of entry.keywords) {
      // Direct substring match on cleaned input
      if (cleaned.includes(kw)) {
        count++;
        continue;
      }
      // Partial/fuzzy match against stripped (meaningful) words
      let fuzzyHit = false;
      for (const w of strippedWords) {
        if (partialMatch(w, kw)) {
          fuzzyHit = true;
          break;
        }
      }
      if (fuzzyHit) count++;
    }
    if (count === 0) continue;

    // For long messages, require at least 2 keyword hits to avoid false positives
    if (isLong && count < 2 && entry.keywords.length > 2) continue;

    const specificity = entry.specificity || 1;
    if (
      count > bestCount ||
      (count === bestCount && specificity > bestSpecificity)
    ) {
      bestCount = count;
      bestSpecificity = specificity;
      bestMatch = entry;
    }
  }

  // For questions, be more lenient
  if (bestMatch && bestCount === 1 && !isQuestion && bestMatch.keywords.length > 3) {
    // Very weak match on a big keyword list — still accept but deprioritize
  }

  return bestMatch;
}

// ─── MAIN MATCH FUNCTION ───────────────────────────────────────

export function matchResponse(input, context) {
  const ctx = context || {};
  const cleaned = cleanInput(input);
  const allWords = getWords(cleaned);
  const strippedWords = stripFillers(allWords);
  const wordCount = input.trim().split(/\s+/).length;
  const isLong = wordCount > 6;
  const isQuestion = input.includes('?');

  // ── Layer 1: Direct + fuzzy keyword match ──
  const directMatch = keywordMatch(cleaned, strippedWords, isLong, isQuestion);
  if (directMatch) {
    const text = pickVariation(directMatch);
    const brand = detectBrand(cleaned);
    const product = detectProduct(cleaned);
    const category = guessCategory(directMatch);
    return {
      response: maybeAppendFunFact(text),
      followUp: directMatch.followUp,
      detectedBrand: brand || ctx.lastBrand || null,
      detectedProduct: product || ctx.lastProduct || null,
      category,
    };
  }

  // ── Layer 2: Context follow-up for short messages ──
  if (wordCount < 4 && (ctx.lastBrand || ctx.lastProduct || ctx.lastCategory)) {
    // Inject context words and re-try matching
    const contextParts = [ctx.lastBrand, ctx.lastProduct, ...strippedWords].filter(Boolean);
    const contextCleaned = contextParts.join(' ');
    const contextWords = stripFillers(getWords(contextCleaned));
    const contextMatch = keywordMatch(contextCleaned, contextWords, false, isQuestion);
    if (contextMatch) {
      const text = pickVariation(contextMatch);
      return {
        response: maybeAppendFunFact(text),
        followUp: contextMatch.followUp,
        detectedBrand: detectBrand(contextCleaned) || ctx.lastBrand || null,
        detectedProduct: detectProduct(contextCleaned) || ctx.lastProduct || null,
        category: guessCategory(contextMatch),
      };
    }

    // If we have a last category, offer more tips in that area
    if (ctx.lastCategory) {
      const categoryChips = {
        authentication: ['Stitching tips', 'Hardware tips', 'Interior tips', 'Smell test'],
        buying: ['Buy online safely', 'Resale platforms', 'Thrift store tips', 'Avoid scams'],
        care: ['Cleaning tips', 'Storage tips', 'Repair services', 'Color transfer prevention'],
        value: ['Bags that hold value', 'Resale market tips', 'Best investments', 'Insurance'],
        comparison: ['LV vs Gucci', 'Chanel vs Hermès', 'Rolex vs Omega'],
      };
      return {
        response: 'Sure! Here are more topics in the same area:',
        followUp: categoryChips[ctx.lastCategory] || categoryChips.authentication,
        detectedBrand: ctx.lastBrand || null,
        detectedProduct: ctx.lastProduct || null,
        category: ctx.lastCategory,
      };
    }
  }

  // ── Layer 3: Brand + product category detection ──
  const brand = detectBrand(cleaned);
  const product = detectProduct(cleaned);

  if (brand && product) {
    // Found both brand and product type — find brand entry and adapt
    const brandEntry = findBrandEntry(brand);
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    if (brandEntry) {
      const text = `Great question about **${brandName}** ${product}! Here's what I know:\n\n${pickVariation(brandEntry)}`;
      return {
        response: maybeAppendFunFact(text),
        followUp: brandEntry.followUp,
        detectedBrand: brand,
        detectedProduct: product,
        category: 'authentication',
      };
    }
    return {
      response: `I know quite a bit about **${brandName}**! While I have the most detail on their bags, the same authentication principles apply to their ${product} — check materials, hardware, stamps, and construction quality. Want to dive deeper?`,
      followUp: BRAND_PRODUCT_CHIPS[brand] || ['How to spot a fake', 'Where to buy safely', 'Care tips'],
      detectedBrand: brand,
      detectedProduct: product,
      category: 'authentication',
    };
  }

  if (brand) {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const brandEntry = findBrandEntry(brand);
    if (brandEntry) {
      const text = `Here's what I know about **${brandName}**:\n\n${pickVariation(brandEntry)}\n\nWhat specific ${brandName} product are you looking at?`;
      return {
        response: text,
        followUp: BRAND_PRODUCT_CHIPS[brand] || ['Bags', 'Watches', 'Accessories'],
        detectedBrand: brand,
        detectedProduct: null,
        category: 'authentication',
      };
    }
    return {
      response: `I can help with **${brandName}**! What specific product are you looking at?`,
      followUp: BRAND_PRODUCT_CHIPS[brand] || ['Bags', 'Watches', 'Accessories'],
      detectedBrand: brand,
      detectedProduct: null,
      category: 'authentication',
    };
  }

  if (product) {
    const productName = product.charAt(0).toUpperCase() + product.slice(1);
    return {
      response: `I can definitely help with **${productName === 'Bags' ? 'bag' : productName.toLowerCase()}** authentication! The key things to always check: materials, stitching, hardware, stamps, and overall construction quality. Which brand is it?`,
      followUp: PRODUCT_BRAND_CHIPS[product] || ['Louis Vuitton', 'Chanel', 'Gucci', 'Rolex'],
      detectedBrand: null,
      detectedProduct: product,
      category: 'authentication',
    };
  }

  // ── Layer 4: Intent detection ──
  const intent = detectIntent(cleaned);
  if (intent) return intent;

  // ── Layer 5: True last resort ──
  return {
    response: 'I\'d love to help! I know a lot about luxury bags, watches, shoes, perfumes, jewelry, and accessories from dozens of brands. Could you tell me a bit more about what you\'re looking for?',
    followUp: ['Authenticate an item', 'Buying advice', 'Brand guide', 'Care & maintenance'],
    detectedBrand: null,
    detectedProduct: null,
    category: null,
  };
}

export default responses;
