import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";

const HAIR_IMAGE = "/images/bridal/bridal-6-updo-glam.jpg";
const BRIDAL_IMAGE = "/images/bridal/bridal-8-hallway-bouquet.jpg";

export function FeaturedServices() {
  return (
    <>
      {/* Desktop bento */}
      <section className="hidden bg-stitch-surface px-8 py-32 md:block">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="mb-4 font-headline text-5xl tracking-tight text-stitch-on-surface">
              Our Curated <i className="italic">Services</i>
            </h2>
            <div className="h-1 w-24 bg-stitch-primary" />
          </div>
          <div className="grid min-h-[720px] grid-cols-1 gap-8 md:grid-cols-12 md:grid-rows-2">
            <div className="group relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container md:col-span-7">
              <Image
                src={BRIDAL_IMAGE}
                alt="Bridal glam by Dusab Beauty Palour"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="mb-2 text-sm uppercase tracking-widest opacity-80">
                  Your Most Beautiful Day
                </p>
                <h3 className="mb-4 font-headline text-4xl">Bridal Glam</h3>
                <p className="mb-6 max-w-md text-white/70">
                  Silver, Golden, and Outside-Kumasi packages — makeup only or
                  with hairstyling, for your traditional or white wedding.
                </p>
                <Link
                  href="/bridal"
                  className="inline-flex items-center gap-2 font-bold transition-all hover:gap-4"
                >
                  View Bridal Packages{" "}
                  <MaterialIcon name="arrow_forward" className="!text-xl text-white" />
                </Link>
              </div>
            </div>
            <div className="group relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container-low md:col-span-5">
              <Image
                src={HAIR_IMAGE}
                alt="Hairstyling and wig installation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="mb-2 font-headline text-3xl">Hair &amp; Wigs</h3>
                <p className="max-w-xs text-white/70">
                  Styling, frontal wig installations, and wig making — closures
                  and frontals built to order.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-2 font-bold transition-all hover:gap-4"
                >
                  Explore Hair Care{" "}
                  <MaterialIcon name="arrow_forward" className="!text-xl text-white" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden rounded-xl bg-stitch-surface-container-low md:col-span-12">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stitch-secondary/10 p-12 text-center sm:flex-row sm:gap-10 sm:text-left">
                <MaterialIcon name="home" size="xl" className="text-stitch-primary" />
                <div>
                  <h3 className="mb-2 font-headline text-3xl text-stitch-on-surface">
                    Walk-Ins &amp; Home Visits — By Arrangement
                  </h3>
                  <p className="mx-auto max-w-2xl leading-relaxed text-stitch-on-surface-variant sm:mx-0">
                    We&apos;re primarily an appointment-based bridal and hair studio.
                    Occasional walk-ins and home-service visits are welcome —
                    message us on WhatsApp to check availability before you come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile single-column */}
      <section className="mt-8 space-y-12 px-8 md:hidden">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="mb-2 font-headline text-3xl text-stitch-on-surface">
              Our Artistry
            </h3>
            <div className="h-1 w-12 rounded-full bg-stitch-primary" />
          </div>
          <Link
            href="/services"
            className="border-b border-stitch-primary/20 pb-1 text-sm font-bold text-stitch-primary"
          >
            View Full Menu
          </Link>
        </div>
        <div className="space-y-8">
          <MobileServiceCard
            title="Bridal Glam"
            price="From GHS 1,300"
            description="Silver, Golden, and Outside-Kumasi packages — makeup only or with hairstyling for your big day."
            image={BRIDAL_IMAGE}
            imageAlt="Bridal glam by Dusab Beauty Palour"
            href="/bridal"
            cta="View Bridal Packages"
          />
          <MobileServiceCard
            title="Hair & Wigs"
            price="From GHS 150"
            description="Styling, frontal wig installations, closures and frontals made to order."
            image={HAIR_IMAGE}
            imageAlt="Hairstyling and wig installation"
            href="/services"
            cta="Explore Hair Care"
          />
          <div className="rounded-xl border border-stitch-outline-variant/30 bg-stitch-surface-container-low p-6">
            <div className="mb-3 flex items-center gap-3">
              <MaterialIcon name="home" className="text-stitch-primary" />
              <h4 className="font-headline text-xl text-stitch-on-surface">
                Walk-Ins &amp; Home Visits
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-stitch-on-surface-variant">
              Primarily by appointment. Occasional walk-ins and home-service
              visits are welcome — message us on WhatsApp to check availability.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function MobileServiceCard(props: {
  title: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}) {
  const { title, price, description, image, imageAlt, href, cta } = props;
  return (
    <div className="group relative overflow-hidden rounded-xl bg-stitch-surface-container-low shadow-editorial transition-all duration-300 hover:bg-stitch-surface-container-lowest">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h4 className="font-headline text-2xl text-stitch-on-surface">
            {title}
          </h4>
          <span className="font-bold text-stitch-primary">{price}</span>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-stitch-on-surface-variant">
          {description}
        </p>
        <Link
          href={href}
          className="block w-full rounded-full border border-stitch-outline-variant/30 py-3 text-center font-label text-xs uppercase tracking-widest text-stitch-secondary transition-colors hover:bg-stitch-secondary hover:text-white"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
