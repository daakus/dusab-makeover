import Image from "next/image";
import Link from "next/link";
import { HOME_IMAGES } from "@/lib/constants/home-content";
import { MaterialIcon } from "@/components/home/material-icon";

export function HomeHero() {
  return (
    <>
      {/* Desktop hero */}
      <header className="relative hidden min-h-[920px] items-center overflow-hidden pt-20 md:flex">
        <div className="absolute inset-0 z-0">
          <Image
            src={HOME_IMAGES.heroDesktop}
            alt="Luxury salon interior with warm lighting"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stitch-surface via-stitch-surface/60 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-8">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block font-label text-sm font-semibold uppercase tracking-[0.2rem] text-stitch-secondary">
              The Sanctuary Awaits
            </span>
            <h1 className="mb-8 font-headline text-6xl leading-[1.1] tracking-tighter text-stitch-on-background md:text-8xl">
              Luxury Beauty <br />
              <i className="font-normal italic">Appointments</i> Made Easy
            </h1>
            <p className="mb-10 max-w-lg text-xl leading-relaxed text-stitch-on-surface-variant">
              Experience Ghana&apos;s premium destination for bespoke aesthetics.
              From artisanal hair styling to masterclass makeup, your
              transformation is our heritage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-stitch-primary px-10 py-5 text-lg font-bold text-stitch-on-primary shadow-xl transition-transform hover:scale-105"
              >
                Book Appointment
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-stitch-outline-variant/15 bg-stitch-surface-container-lowest px-10 py-5 text-lg font-bold text-stitch-secondary transition-colors hover:bg-stitch-surface-container"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile hero */}
      <section className="relative flex h-[min(751px,90dvh)] w-full flex-col justify-end overflow-hidden px-8 pb-12 pt-20 md:hidden">
        <Image
          src={HOME_IMAGES.heroMobile}
          alt="Radiant woman in a luxury spa setting"
          fill
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-stitch-background/90 via-stitch-background/20 to-transparent" />
        <div className="max-w-md">
          <span className="mb-4 inline-block rounded-full bg-stitch-primary-fixed px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.2rem] text-stitch-primary">
            Premier Beauty Atelier
          </span>
          <h2 className="mb-6 font-headline text-5xl leading-[1.1] text-stitch-on-surface md:text-7xl">
            Radiance <br />
            <i className="font-normal">Reimagined</i>
          </h2>
          <p className="mb-8 max-w-[80%] text-lg leading-relaxed text-stitch-on-surface-variant">
            Step into a sanctuary where high-end editorial artistry meets
            holistic skin and hair care.
          </p>
          <Link
            href="/booking"
            className="glow-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 font-label text-sm font-bold tracking-wide text-stitch-on-primary shadow-lg transition-transform active:scale-95"
          >
            Reserve Your Session
            <MaterialIcon name="arrow_forward" size="sm" className="!text-lg" />
          </Link>
        </div>
      </section>
    </>
  );
}
