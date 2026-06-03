import Image from "next/image";
import Link from "next/link";
import { HOME_IMAGES } from "@/lib/constants/home-content";
import { MaterialIcon } from "@/components/home/material-icon";

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
          <div className="grid min-h-[800px] grid-cols-1 gap-8 md:grid-cols-12 md:grid-rows-2">
            <div className="group relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container md:col-span-7">
              <Image
                src={HOME_IMAGES.bentoHair}
                alt="Artisanal hair styling"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="mb-2 text-sm uppercase tracking-widest opacity-80">
                  Sanctuary Styling
                </p>
                <h3 className="mb-4 font-headline text-4xl">Artisanal Hair</h3>
                <p className="mb-6 max-w-md text-white/70">
                  Braid artistry, luxury installs, and restorative treatments
                  designed for your crown.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-bold transition-all hover:gap-4"
                >
                  Explore Hair Care{" "}
                  <MaterialIcon name="arrow_forward" className="!text-xl text-white" />
                </Link>
              </div>
            </div>
            <div className="group relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container-low md:col-span-5">
              <Image
                src={HOME_IMAGES.bentoNails}
                alt="Nail sculpture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="mb-2 font-headline text-3xl">Nail Sculpture</h3>
                <p className="text-white/70">
                  Refined aesthetics for your hands.
                </p>
              </div>
            </div>
            <div className="group relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container-highest md:col-span-5">
              <Image
                src={HOME_IMAGES.bentoMakeup}
                alt="Makeup artistry"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="mb-2 font-headline text-3xl">Radiant Makeup</h3>
                <p className="text-white/70">
                  Bridal, editorial, and evening glows.
                </p>
              </div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-stitch-surface-container-low md:col-span-7">
              <div className="absolute inset-0 flex items-center justify-center bg-stitch-secondary/10 p-20">
                <div className="text-center">
                  <MaterialIcon
                    name="spa"
                    size="xl"
                    className="mb-6 text-stitch-primary"
                  />
                  <h3 className="mb-4 font-headline text-4xl text-stitch-on-surface">
                    The Wellness Lounge
                  </h3>
                  <p className="mx-auto max-w-sm leading-relaxed text-stitch-on-surface-variant">
                    Relax in our signature lounge with curated refreshments while
                    our artisans prepare for your transformation.
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
            title="Crowned Glory"
            price="From GHS 85"
            description="Bespoke braiding, weave installations, and therapeutic hair treatments designed for your texture."
            image={HOME_IMAGES.mobileHair}
            imageAlt="Professional braiding and hair styling"
          />
          <MobileServiceCard
            title="Dermal Rituals"
            price="From GHS 120"
            description="Advanced facial therapies and body treatments focused on hydration and natural luminosity."
            image={HOME_IMAGES.mobileSkin}
            imageAlt="Luxurious facial treatment"
          />
          <MobileServiceCard
            title="Gilded Tips"
            price="From GHS 55"
            description="High-fashion nail artistry and meticulous manicures using premium, non-toxic polishes."
            image={HOME_IMAGES.mobileNails}
            imageAlt="Elegant manicured hands"
          />
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
}) {
  const { title, price, description, image, imageAlt } = props;
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
          href="/services"
          className="block w-full rounded-full border border-stitch-outline-variant/30 py-3 text-center font-label text-xs uppercase tracking-widest text-stitch-secondary transition-colors hover:bg-stitch-secondary hover:text-white"
        >
          Select Services
        </Link>
      </div>
    </div>
  );
}
