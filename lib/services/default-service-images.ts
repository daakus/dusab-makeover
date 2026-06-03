type ImagePool = { keys: string[]; images: string[] };

const IMAGE_POOLS: ImagePool[] = [
  {
    keys: ["hair", "silk press", "blowout", "braid", "loc", "color", "frontal", "installation", "wig", "lace"],
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596920566699-e32701af02b0?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["nail", "manicure", "pedicure", "gel", "acrylic"],
    images: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["makeup", "bridal", "glam", "soft beat", "editorial", "artistry", "beat", "glow"],
    images: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["lash", "brow", "extension", "tint", "lamination"],
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["facial", "skin", "peel", "hydra", "microderm"],
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["massage", "spa", "wellness", "body", "scrub", "therapy"],
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    keys: ["wax", "threading", "sugar"],
    images: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

// Tutorial / online training pool — matched before general fallback
const TUTORIAL_POOL = {
  keys: ["tutorial", "training", "online", "course", "lesson", "class", "masterclass", "beginner", "advanced"],
  images: [
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  ],
};

const GENERAL_IMAGES = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
];

function stableHash(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pickFromPool(seed: string, images: string[]) {
  return images[stableHash(seed) % images.length];
}

export function getDefaultServiceImage(input: { category?: string | null; name?: string | null }) {
  const category = (input.category ?? "").toLowerCase().trim();
  const name = (input.name ?? "").toLowerCase().trim();
  const haystack = `${category} ${name}`.trim();

  // Check main pools first
  const pool = IMAGE_POOLS.find((entry) => entry.keys.some((key) => haystack.includes(key)));
  if (pool) return pickFromPool(`${category}|${name}`, pool.images);

  // Check tutorial pool before generic fallback
  if (TUTORIAL_POOL.keys.some((key) => haystack.includes(key))) {
    return pickFromPool(`${category}|${name}`, TUTORIAL_POOL.images);
  }

  return pickFromPool(`${category}|${name}`, GENERAL_IMAGES);
}

