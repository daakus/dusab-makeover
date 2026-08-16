import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Dusab Beauty Palour — professional beauty studio in Kumasi, Ghana.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border shadow-card">
          <Image
            src="/images/bridal/bridal-4-classic-updo.jpg"
            alt="Dusab Beauty Palour"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-semibold text-brand-heading">
            Our story
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            Dusab Beauty Palour brings professional makeup artistry, hairstyling, and
            frontal wig installations to Kumasi, Accra and beyond. Whether you visit our
            studio or join one of our online training sessions, your location is
            never a barrier to looking and feeling your best.
          </p>
        </div>
      </div>
    </div>
  );
}
