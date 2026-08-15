"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

const BUCKET = "gallery-images";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false as const };
  const { data: role } = await supabase.rpc("current_role_slug");
  const isAdmin = role === "admin" || role === "super_admin";
  return isAdmin ? { supabase, ok: true as const } : { supabase, ok: false as const };
}

function storagePathFromPublicUrl(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

export async function uploadGalleryImage(formData: FormData) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Unauthorized." };

  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return { error: "Please choose a photo to upload." };
  if (!file.type.startsWith("image/")) return { error: "Only image files are supported." };

  const fileExt = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (uploadErr) return { error: uploadErr.message };

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const { data: maxRow } = await supabase
    .from("gallery_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSortOrder = (maxRow?.sort_order ?? -1) + 1;

  const { error: insertErr } = await supabase.from("gallery_images").insert({
    title: title || null,
    image_url: publicUrlData.publicUrl,
    sort_order: nextSortOrder,
    is_published: true,
  });
  if (insertErr) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { error: insertErr.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true as const };
}

export async function deleteGalleryImage(id: string, imageUrl: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Unauthorized." };

  const path = storagePathFromPublicUrl(imageUrl);
  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true as const };
}

export async function setGalleryImagePublished(id: string, isPublished: boolean) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Unauthorized." };

  const { error } = await supabase
    .from("gallery_images")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true as const };
}
