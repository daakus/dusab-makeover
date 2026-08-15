import { AdminGalleryView } from "@/components/admin/admin-gallery-view";
import { createClient } from "@/supabase/server";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("gallery_images")
    .select("id, title, image_url, is_published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const initialImages =
    rows?.map((r) => ({
      id: r.id,
      title: r.title,
      imageUrl: r.image_url,
      isPublished: r.is_published,
    })) ?? [];

  return <AdminGalleryView initialImages={initialImages} />;
}
