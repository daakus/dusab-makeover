import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Dusab Beauty Palour — professional beauty studio in Kumasi, Ghana.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-brand-heading">
        Our story
      </h1>
      <p className="text-muted-foreground leading-relaxed">
        Dusab Beauty Palour brings professional makeup artistry, hairstyling, and
        frontal wig installations to Kumasi and beyond. Whether you visit our
        studio or join one of our online training sessions, your location is
        never a barrier to looking and feeling your best.
      </p>
    </div>
  );
}
