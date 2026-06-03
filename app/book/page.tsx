import type { Metadata } from "next";
import { MomoBookingForm } from "@/components/momo-booking/booking-form";

export const metadata: Metadata = {
  title: "Book a Session | Dusab MakeOver",
  description:
    "Book professional makeup, hairstyling, frontal wig installation, or online training with Dusab MakeOver, Kumasi. Pay via MoMo and confirm instantly on WhatsApp.",
  keywords: [
    "#frontalinstallation",
    "#oneononetutorial",
    "#dusabbeauty",
    "#onlinetraining",
  ],
  openGraph: {
    title: "Book a Session | Dusab MakeOver",
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
          <p className="text-xs font-bold uppercase tracking-widest text-pink-500">
            Kumasi · @dusab_makeover
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-gray-900">
            Dusab MakeOver 💄
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
          TikTok: @dusab_makeover · #frontalinstallation · #dusabbeauty
        </p>
      </div>
    </main>
  );
}
