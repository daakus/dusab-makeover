import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: "Gallery",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("gallery_images")
    .select("id, title, image_url")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const photos = rows ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-brand-heading">
        Gallery
      </h1>
      {photos.length === 0 ? (
        <p className="text-muted-foreground">
          Our gallery is being updated with fresh photos — check back soon.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border shadow-card"
            >
              <Image
                src={photo.image_url}
                alt={photo.title ?? "Dusab Beauty Palour gallery photo"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
