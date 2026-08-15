"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteReview } from "@/app/actions/admin-reviews";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/admin-shared";
import { MaterialIcon } from "@/components/home/material-icon";

export interface AdminReviewRecord {
  id: string;
  customerName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export function AdminReviewsView(props: { initialReviews: AdminReviewRecord[] }) {
  const [reviews, setReviews] = useState(props.initialReviews);
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteReview(id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review removed");
    });
  }

  return (
    <main className="bg-stitch-background p-6 pb-24 md:p-12">
      <AdminPageHeader
        eyebrow="Reviews"
        title="Client reviews"
        description="Reviews go live immediately after a client submits them. Remove anything inappropriate here."
      />
      {reviews.length === 0 ? (
        <AdminEmptyState
          title="No reviews yet"
          description="Client reviews will appear here once submitted after a completed visit."
        />
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="flex flex-col justify-between gap-3 rounded-xl bg-stitch-surface-container-low p-4 md:flex-row md:items-start"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.customerName}</p>
                  <span className="text-xs text-stitch-on-surface-variant">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 flex text-stitch-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MaterialIcon
                      key={i}
                      name="star"
                      filled={i < r.rating}
                      className={`!text-base ${i >= r.rating ? "opacity-30" : ""}`}
                    />
                  ))}
                </div>
                {r.comment ? (
                  <p className="mt-2 text-sm text-stitch-on-surface-variant">{r.comment}</p>
                ) : null}
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => handleDelete(r.id)}
                className="flex shrink-0 items-center gap-2 self-start rounded-full border border-red-300 px-3 py-1 text-xs font-bold text-red-700 disabled:opacity-60"
              >
                <MaterialIcon name="delete" size="sm" className="!text-base" />
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
