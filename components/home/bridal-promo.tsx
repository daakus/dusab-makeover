import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";

export function BridalPromo() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-stitch-primary md:grid-cols-2">
        <div className="relative order-2 aspect-[4/5] w-full md:order-1 md:aspect-auto md:h-full md:min-h-[420px]">
          <Image
            src="/images/bridal/bridal-3-lace-pearl.jpg"
            alt="Bride in a pearl-beaded lace gown — Dusab Beauty Palour bridal makeup"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="order-1 px-8 py-10 md:order-2 md:px-4 md:py-8 md:pr-14">
          <p className="signature-label mb-4 text-xs font-bold uppercase tracking-[0.25em] text-stitch-gold">
            Now Booking
          </p>
          <h2 className="font-headline text-3xl italic text-white sm:text-4xl">
            Your Wedding-Day Glam
          </h2>
          <p className="mt-4 max-w-md text-white/85">
            Silver and Golden bridal packages, outside-Kumasi deals, and wig
            making — makeup and hairstyling for your traditional or white
            wedding, from our bridal rate card.
          </p>
          <Link
            href="/bridal"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-stitch-gold px-7 py-3.5 font-bold text-[#2A1517] transition-transform hover:scale-105"
          >
            View Bridal Packages
            <MaterialIcon name="arrow_forward" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
