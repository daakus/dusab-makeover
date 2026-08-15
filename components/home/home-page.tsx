import { BridalPromo } from "@/components/home/bridal-promo";
import { DirectConsultation } from "@/components/home/direct-consultation";
import { FeaturedServices } from "@/components/home/featured-services";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHero } from "@/components/home/home-hero";
import { HomeTopNav } from "@/components/home/home-top-nav";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { MobileBookingFab } from "@/components/home/mobile-booking-fab";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { Testimonials } from "@/components/home/testimonials";
import { WhatsAppFloat } from "@/components/home/whatsapp-float";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export function HomePageView() {
  return (
    <div className="min-h-dvh bg-stitch-surface text-stitch-on-surface selection:bg-stitch-primary-fixed">
      <HomeTopNav />
      <main className="pb-28 md:pb-0">
        <HomeHero />
        <FeaturedServices />
        <BridalPromo />
        <DirectConsultation />
        <WhyChooseUs />
        <Testimonials />
        <InstagramGallery />
      </main>
      <HomeFooter />
      <MobileBottomNav />
      <WhatsAppFloat />
      <MobileBookingFab />
    </div>
  );
}
