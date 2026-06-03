import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
};

const SHOTS = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-brand-heading">
        Gallery
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHOTS.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border shadow-card"
          >
            <Image
              src={src}
              alt="Salon gallery"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
