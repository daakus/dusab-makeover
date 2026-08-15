"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  deleteGalleryImage,
  setGalleryImagePublished,
  uploadGalleryImage,
} from "@/app/actions/admin-gallery";
import { MaterialIcon } from "@/components/home/material-icon";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/admin-shared";
import { cn } from "@/lib/utils";

export interface AdminGalleryRecord {
  id: string;
  title: string | null;
  imageUrl: string;
  isPublished: boolean;
}

export function AdminGalleryView(props: { initialImages: AdminGalleryRecord[] }) {
  const [images, setImages] = useState(props.initialImages);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError("Please choose a photo to upload.");
      return;
    }
    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.set("image", file);
    formData.set("title", title);
    const res = await uploadGalleryImage(formData);
    setUploading(false);
    if (res?.error) {
      setUploadError(res.error);
      toast.error(res.error);
      return;
    }
    toast.success("Photo uploaded to the gallery");
    setTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    // Server action already revalidates; a full reload keeps the list in sync
    // without needing a second round-trip to re-fetch.
    window.location.reload();
  }

  function handleDelete(img: AdminGalleryRecord) {
    startTransition(async () => {
      const res = await deleteGalleryImage(img.id, img.imageUrl);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      setImages((prev) => prev.filter((i) => i.id !== img.id));
      toast.success("Photo removed");
    });
  }

  function handleTogglePublished(img: AdminGalleryRecord) {
    startTransition(async () => {
      const res = await setGalleryImagePublished(img.id, !img.isPublished);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      setImages((prev) =>
        prev.map((i) => (i.id === img.id ? { ...i, isPublished: !i.isPublished } : i))
      );
    });
  }

  return (
    <main className="bg-stitch-background p-6 pb-24 md:p-12">
      <AdminPageHeader
        eyebrow="Gallery"
        title="Salon gallery"
        description="Upload real photos of your work. Published photos appear on the public /gallery page."
      />

      <form
        onSubmit={handleUpload}
        className="mb-10 flex flex-col gap-4 rounded-xl bg-stitch-surface-container-low p-6 sm:flex-row sm:items-end"
      >
        <div className="flex-1 space-y-2">
          <label className="signature-label block text-[10px] text-stitch-secondary" htmlFor="gallery-title">
            Title (optional)
          </label>
          <input
            id="gallery-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Bridal glam — August shoot"
            className="w-full rounded-lg border border-stitch-outline-variant bg-white px-3 py-2 text-sm outline-none focus:border-stitch-primary dark:bg-stone-900"
          />
        </div>
        <div className="flex-1 space-y-2">
          <label className="signature-label block text-[10px] text-stitch-secondary" htmlFor="gallery-file">
            Photo
          </label>
          <input
            id="gallery-file"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-stitch-outline-variant bg-white px-3 py-2 text-sm outline-none focus:border-stitch-primary dark:bg-stone-900"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="flex h-11 items-center gap-2 rounded-full bg-stitch-primary px-6 font-bold text-stitch-on-primary shadow-lg shadow-stitch-primary/20 transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          <MaterialIcon name="upload" size="sm" className="text-stitch-on-primary" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {uploadError ? (
          <p className="w-full text-sm text-red-600 dark:text-red-400">{uploadError}</p>
        ) : null}
      </form>

      {images.length === 0 ? (
        <AdminEmptyState
          title="No photos yet"
          description="Upload your first photo above — it will appear here and on the public gallery page."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <article
              key={img.id}
              className="group relative overflow-hidden rounded-xl bg-stitch-surface-container-lowest dark:bg-white/95"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={img.imageUrl}
                  alt={img.title ?? "Gallery photo"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="truncate text-xs font-medium text-white">
                  {img.title || "Untitled"}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleTogglePublished(img)}
                    title={img.isPublished ? "Unpublish" : "Publish"}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors",
                      img.isPublished ? "bg-emerald-600/80 hover:bg-emerald-600" : "bg-stone-500/80 hover:bg-stone-500"
                    )}
                  >
                    <MaterialIcon name={img.isPublished ? "visibility" : "visibility_off"} size="sm" />
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleDelete(img)}
                    title="Delete"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/80 text-white transition-colors hover:bg-red-600"
                  >
                    <MaterialIcon name="delete" size="sm" />
                  </button>
                </div>
              </div>
              {!img.isPublished ? (
                <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Hidden
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
