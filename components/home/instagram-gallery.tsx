import Image from "next/image";
import Link from "next/link";
import { BRIDAL_PHOTOS } from "@/lib/constants/bridal-content";
import { createClient } from "@/supabase/server";

export async function InstagramGallery() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("gallery_images")
    .select("id, title, image_url")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(10);

  const photos =
    rows && rows.length > 0
      ? rows.map((r) => ({ key: r.id, src: r.image_url, alt: r.title ?? "Dusab Beauty Palour" }))
      : BRIDAL_PHOTOS.slice(0, 10).map((p) => ({ key: p.src, src: p.src, alt: p.alt }));

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
        {photos.map((photo) => (
          <div
            key={photo.key}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/gallery"
          className="inline-block rounded-full border border-stitch-primary/30 px-8 py-3 text-sm font-bold text-stitch-primary transition-colors hover:bg-stitch-primary hover:text-stitch-on-primary"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}
