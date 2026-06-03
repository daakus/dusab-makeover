export type ServiceCategorySlug =
  | "all"
  | "makeup"
  | "hair"
  | "frontal"
  | "tutorials"
  | "online"
  | "lashes";

export interface CatalogService {
  id: string;
  bookingServiceId?: string | null;
  title: string;
  description: string;
  durationMins: number;
  priceFromGhs: number;
  category: Exclude<ServiceCategorySlug, "all">;
  badge?: "Premium";
  image: string;
  imageAlt: string;
  /** Second row card offset (desktop) */
  stagger?: boolean;
}

export const SERVICE_CATEGORY_SELECT: { value: ServiceCategorySlug; label: string }[] = [
  { value: "all",       label: "All Services" },
  { value: "makeup",    label: "Makeup Artistry" },
  { value: "hair",      label: "Hairstyling" },
  { value: "frontal",   label: "Frontal Installation" },
  { value: "tutorials", label: "1-on-1 Tutorials" },
  { value: "online",    label: "Online Training" },
  { value: "lashes",    label: "Brows & Lashes" },
];

export type PriceBand = "any" | "under200" | "200-500" | "over500";
export type DurationBand = "any" | "30-60" | "60-120" | "over120";

export const PRICE_BAND_OPTIONS: { value: PriceBand; label: string }[] = [
  { value: "any",      label: "Any Price" },
  { value: "under200", label: "Under GHS 200" },
  { value: "200-500",  label: "GHS 200 - GHS 500" },
  { value: "over500",  label: "Above GHS 500" },
];

export const DURATION_BAND_OPTIONS: { value: DurationBand; label: string }[] = [
  { value: "any",      label: "Any Duration" },
  { value: "30-60",    label: "30 - 60 mins" },
  { value: "60-120",   label: "60 - 120 mins" },
  { value: "over120",  label: "Over 2 hours" },
];

export function matchesPriceBand(price: number, band: PriceBand): boolean {
  if (band === "any") return true;
  if (band === "under200") return price < 200;
  if (band === "200-500") return price >= 200 && price <= 500;
  return price > 500;
}

export function matchesDurationBand(mins: number, band: DurationBand): boolean {
  if (band === "any") return true;
  if (band === "30-60") return mins >= 30 && mins <= 60;
  if (band === "60-120") return mins > 60 && mins <= 120;
  return mins > 120;
}

export const CATALOG_SERVICES: CatalogService[] = [
  {
    id: "makeup",
    title: "Makeup Artistry",
    description:
      "From everyday glam to high-fashion editorial — flawless looks for every skin tone.",
    durationMins: 90,
    priceFromGhs: 150,
    category: "makeup",
    badge: "Premium",
    stagger: false,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop",
    imageAlt: "Professional makeup application",
  },
  {
    id: "hair",
    title: "Hairstyling",
    description:
      "Natural styles, weaves, and protective sets crafted for your texture and personality.",
    durationMins: 120,
    priceFromGhs: 200,
    category: "hair",
    stagger: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
    imageAlt: "Expert hairstyling session",
  },
  {
    id: "frontal",
    title: "Frontal Installation",
    description:
      "HD frontal fitting, gluing & blending so natural it's undetectable. No salon stress.",
    durationMins: 120,
    priceFromGhs: 400,
    category: "frontal",
    badge: "Premium",
    stagger: false,
    image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&auto=format&fit=crop",
    imageAlt: "Frontal wig installation",
  },
  {
    id: "tutorials",
    title: "1-on-1 Tutorials",
    description:
      "Private in-person training — beginner to advanced makeup and frontal mastery.",
    durationMins: 120,
    priceFromGhs: 300,
    category: "tutorials",
    stagger: true,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop",
    imageAlt: "One-on-one makeup tutorial",
  },
  {
    id: "online",
    title: "Online Training",
    description:
      "Live 1-on-1 video sessions. Your location is never a barrier — learn from anywhere.",
    durationMins: 90,
    priceFromGhs: 250,
    category: "online",
    stagger: false,
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&auto=format&fit=crop",
    imageAlt: "Online beauty training via video call",
  },
  {
    id: "lashes",
    title: "Brows & Lashes",
    description:
      "Precision brow shaping, tinting, and custom lash application for a defined, lifted look.",
    durationMins: 60,
    priceFromGhs: 80,
    category: "lashes",
    stagger: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
    imageAlt: "Brow and lash enhancement",
  },
];

export const BRIDAL_FEATURE = {
  title: "Bridal Glam Package",
  kicker: "Your Most Beautiful Day",
  description:
    "A complete bridal experience — consultation, trial session, and stunning wedding day makeup. Crafted to last and photographed to perfection.",
  priceFromGhs: 800,
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
  imageAlt: "Bride in full glam makeup",
} as const;
