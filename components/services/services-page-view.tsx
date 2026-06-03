import { HomeTopNav } from "@/components/home/home-top-nav";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { ServicesSiteFooter } from "@/components/marketing/services-site-footer";
import { ServicesCatalog } from "@/components/services/services-catalog";
import type { CatalogService } from "@/lib/constants/services-catalog";

export function ServicesPageView(props: { services: CatalogService[] }) {
  const { services } = props;
  return (
    <div className="min-h-dvh bg-stitch-background text-stitch-on-background selection:bg-stitch-primary-fixed selection:text-stitch-on-primary-fixed">
      <HomeTopNav />
      <main className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:px-12 md:pb-24">
        <header className="mb-16 max-w-3xl">
          <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.2rem] text-stitch-primary">
            The Digital Sanctuary
          </span>
          <h1 className="mb-6 font-headline text-5xl font-bold leading-[1.1] tracking-tight text-stitch-on-surface md:text-7xl">
            Our Services — <span className="font-normal italic">Rejuvenate Your Soul</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-stitch-on-surface-variant">
            Indulge in a curated selection of treatments designed to enhance your natural
            radiance. Each service is an editorial experience tailored to your unique beauty
            narrative.
          </p>
        </header>
        <ServicesCatalog services={services} />
      </main>
      <ServicesSiteFooter />
      <MobileBottomNav />
    </div>
  );
}
