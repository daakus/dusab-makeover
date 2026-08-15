import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";
import { WHATSAPP_HREF } from "@/lib/constants/home-content";
import {
  BRIDAL_PACKAGES,
  BRIDAL_NOTES,
  BRIDAL_EXPECTATIONS,
  BRIDAL_PHOTOS,
} from "@/lib/constants/bridal-content";

export const metadata: Metadata = {
  title: `Bridal | ${SITE_NAME}`,
  description:
    "Bridal makeup and hairstyling by Dusab Beauty Palour — Silver and Golden packages, outside-Kumasi deals, and wig making for your traditional or white wedding.",
};

export default function BridalPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="/images/bridal/bridal-1-veil-joy.jpg"
          alt="Bride in a blush veil, laughing with joy — Dusab Beauty Palour bridal makeup"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1517] via-[#2A1517]/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16 pt-32 text-center sm:px-6">
          <p className="signature-label mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E9D3C6]">
            Bridal Rate Card
          </p>
          <h1 className="font-headline text-4xl italic text-white sm:text-5xl md:text-6xl">
            Bridal Glam by Dusab Beauty Palour
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            Makeup and hairstyling for your traditional or white wedding —
            in Kumasi, or wherever you say &ldquo;I do.&rdquo;
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="w-full rounded-full bg-stitch-primary px-8 py-3.5 text-center font-semibold text-stitch-on-primary shadow-lg transition-transform hover:scale-105 sm:w-auto"
            >
              Book Your Bridal Date
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/60 px-8 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="signature-label mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
            Bridal Rate Card
          </p>
          <h2 className="font-display text-3xl font-semibold text-brand-heading sm:text-4xl">
            Packages for Your Big Day
          </h2>
          <p className="mt-4 text-brand-text">
            Every package can be booked for makeup only, or makeup and
            hairstyling together. Services are also set up individually in
            our booking system — reach out and we&apos;ll confirm current
            pricing for your date.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {BRIDAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-2xl border border-brand-border bg-white p-7 shadow-card"
            >
              <h3 className="font-display text-xl font-semibold text-brand-heading">
                {pkg.name}
              </h3>
              <div className="mt-5 space-y-5">
                {pkg.options.map((opt) => (
                  <div key={opt.label} className="border-l-2 border-stitch-gold/60 pl-4">
                    <p className="font-medium text-brand-text">{opt.label}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {opt.includes.map((inc) => (
                        <li
                          key={inc}
                          className="rounded-full bg-stitch-surface-container px-3 py-1 text-xs font-medium text-stitch-on-surface-variant"
                        >
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-2 text-center text-sm text-brand-text/80">
          {BRIDAL_NOTES.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-stitch-surface-container-lowest py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="signature-label mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              Real Brides, Real Glam
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-heading sm:text-4xl">
              From Our Bridal Portfolio
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {BRIDAL_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border shadow-card"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="signature-label mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
            Bridal Agreement
          </p>
          <h2 className="font-display text-3xl font-semibold text-brand-heading sm:text-4xl">
            What to Expect
          </h2>
          <p className="mt-4 text-brand-text">
            A quick overview before you book — the full agreement is
            confirmed with you once your date is secured.
          </p>
        </div>

        <div className="space-y-8">
          {BRIDAL_EXPECTATIONS.map((group) => (
            <div key={group.title} className="rounded-2xl border border-brand-border bg-white p-7">
              <h3 className="font-display text-lg font-semibold text-brand-heading">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-text">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stitch-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2A1517] py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-headline text-3xl italic text-white sm:text-4xl">
            Ready to Book Your Bridal Glam?
          </h2>
          <p className="mt-4 text-white/80">
            Reach out with your wedding date and location — we&apos;ll help
            you pick the right package and confirm availability.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="w-full rounded-full bg-stitch-gold px-8 py-3.5 text-center font-semibold text-[#2A1517] shadow-lg transition-transform hover:scale-105 sm:w-auto"
            >
              Book Your Bridal Date
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/60 px-8 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
