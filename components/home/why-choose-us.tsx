import Image from "next/image";
import { HOME_IMAGES } from "@/lib/constants/home-content";
import { MaterialIcon } from "@/components/home/material-icon";

const points = [
  {
    icon: "verified_user" as const,
    title: "Certified Master Artisans",
    body: "Our specialists undergo continuous training to master the latest global trends and heritage techniques.",
  },
  {
    icon: "auto_awesome" as const,
    title: "Organic Luxury Products",
    body: "We use only the finest natural ingredients and high-end brands that respect your skin and hair health.",
  },
  {
    icon: "calendar_today" as const,
    title: "Seamless Experience",
    body: "Our digital concierge ensures your appointments are managed with precision, giving you more time to relax.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-stitch-surface-container-low py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-8 md:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-20 -top-10 h-[500px] w-[120%] -rotate-2 rounded-3xl bg-stitch-primary opacity-5" />
          <Image
            src={HOME_IMAGES.whyImage}
            alt="Modern salon interior"
            width={900}
            height={600}
            className="relative z-10 h-[600px] w-full rounded-xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-10 -right-10 z-20 max-w-xs rounded-xl bg-stitch-primary-container p-12 text-white shadow-xl">
            <p className="mb-2 font-headline text-4xl italic">500+</p>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-90">
              Radiant Clients Served across Ghana
            </p>
          </div>
        </div>
        <div>
          <h2 className="mb-12 font-headline text-5xl leading-tight text-stitch-on-surface">
            The <i className="italic">Dusab Beauty Palour</i> Difference
          </h2>
          <div className="space-y-12">
            {points.map((p) => (
              <div key={p.title} className="flex gap-6">
                <MaterialIcon
                  name={p.icon}
                  className="mt-1 text-stitch-primary"
                  size="lg"
                />
                <div>
                  <h4 className="mb-2 text-xl font-bold text-stitch-on-surface">
                    {p.title}
                  </h4>
                  <p className="leading-relaxed text-stitch-on-surface-variant">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
