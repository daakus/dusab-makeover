import Image from "next/image";
import { HOME_IMAGES } from "@/lib/constants/home-content";

export function InstagramGallery() {
  return (
    <section className="bg-stitch-surface-container px-4 py-24">
      <div className="mx-auto mb-16 max-w-7xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3rem] text-stitch-primary">
          @dusab_beauty
        </p>
        <h2 className="font-headline text-4xl text-stitch-on-surface">
          Follow Our Journey
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-5">
        {HOME_IMAGES.gallery.map((src, i) => (
          <div
            key={src}
            className="aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
