import type { Metadata } from "next";
import Image from "next/image";
import { MomoBookingForm } from "@/components/momo-booking/booking-form";

export const metadata: Metadata = {
  title: "Book a Session | Dusab Beauty Palour",
  description:
    "Book professional makeup, hairstyling, frontal wig installation, or online training with Dusab Beauty Palour, Kumasi. Pay via MoMo and confirm instantly on WhatsApp.",
  keywords: [
    "#frontalinstallation",
    "#oneononetutorial",
    "#dusabbeauty",
    "#onlinetraining",
  ],
  openGraph: {
    title: "Book a Session | Dusab Beauty Palour",
    description:
      "Your geographical location is not a barrier. Book online training or in-person services today.",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <Image
            src="/images/logo/dusab-icon.png"
            alt=""
            width={56}
            height={56}
            className="mx-auto h-14 w-14 object-contain"
          />
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-pink-500">
            Kumasi · @dusab_beauty
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-gray-900">
            Dusab Beauty Palour 💄
          </h1>
          <p className="mt-3 text-gray-600">
            Professional Makeup · Hairstyling · Frontal Wig Installations
          </p>
          <p className="mt-2 text-sm italic text-pink-700">
            &ldquo;Your geographical location is not a barrier — book online training today and save the
            stress of always going to the salon.&rdquo;
          </p>
        </div>

        <MomoBookingForm />

        <p className="mt-6 text-center text-xs text-gray-400">
          TikTok: @dusab_beauty · #frontalinstallation · #dusabbeauty
        </p>
      </div>
    </main>
  );
}
