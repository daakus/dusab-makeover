export const BRIDAL_NOTES = [
  "All packages listed are for the bride. Bridesmaid, mother-of-the-bride, and family glam are available — ask us for a quote when you enquire.",
  "Transportation to and from your venue is arranged separately with you and is not part of a package.",
];

export interface BridalExpectationGroup {
  title: string;
  items: string[];
}

export const BRIDAL_EXPECTATIONS: BridalExpectationGroup[] = [
  {
    title: "On the Day",
    items: [
      "Please be ready at the agreed time — we stick to the package plan you booked, so let us know in advance if your needs change.",
      "Let us know about any known or potential allergies or product sensitivities ahead of time.",
      "A well-ventilated, spacious dressing room is required.",
      "The dressing room should comfortably fit your makeup artist, hairstylist, photographer, videographer, and one additional person of your choice — this keeps prep smooth and unhurried.",
    ],
  },
  {
    title: "Postponement & Cancellation",
    items: [
      "Please notify us of any date changes at least one month in advance. New dates are confirmed only if the team is available.",
    ],
  },
  {
    title: "Travel",
    items: [
      "Transportation arrangements depend on your location — you'll arrange transport to and from the venue.",
      "Brides outside Kumasi are asked to provide suitable accommodation for the makeup artist, preferably a guest house or hotel.",
    ],
  },
  {
    title: "Securing Your Date",
    items: [
      "A non-refundable 50% deposit secures your date (full payment is also accepted). Deposits are made via MTN Mobile Money to 0546006627 (Abigail Dusey).",
    ],
  },
];

export interface BridalPhoto {
  src: string;
  alt: string;
}

export const BRIDAL_PHOTOS: BridalPhoto[] = [
  { src: "/images/bridal/bridal-1-veil-joy.jpg", alt: "Bride in a blush veil, laughing with joy — Dusab Beauty Palour bridal makeup" },
  { src: "/images/bridal/bridal-8-hallway-bouquet.jpg", alt: "Bride in an elegant white gown holding a bouquet — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-2-garden-glam.jpg", alt: "Bride with soft glam makeup in a garden setting — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-3-lace-pearl.jpg", alt: "Bride in a pearl-beaded lace gown holding a bouquet — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-6-updo-glam.jpg", alt: "Bride with an elegant updo and soft glam makeup — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-4-classic-updo.jpg", alt: "Bride with a classic updo and soft glam makeup — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-7-glam-closeup.jpg", alt: "Close-up bridal glam makeup with gold earrings — Dusab Beauty Palour" },
  { src: "/images/bridal/bridal-5-bouquet.jpg", alt: "Bride with a sleek updo, smiling — Dusab Beauty Palour" },
];
