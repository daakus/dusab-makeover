"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitReview } from "@/app/actions/customer";
import type { CustomerActionState } from "@/app/actions/customer";
import { MaterialIcon } from "@/components/home/material-icon";
import { cn } from "@/lib/utils";

const initial: CustomerActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-stitch-primary px-6 py-3 text-sm font-bold text-stitch-on-primary shadow-lg shadow-stitch-primary/20 transition-transform hover:scale-[1.02] disabled:opacity-60"
    >
      {pending ? "Submitting…" : "Submit review"}
    </button>
  );
}

export function CustomerReviewForm(props: { appointmentId: string }) {
  const [state, formAction] = useFormState(submitReview, initial);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  if (state.success) {
    return (
      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{state.success}</p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="appointment_id" value={props.appointmentId} />
      <input type="hidden" name="rating" value={rating} />
      <div>
        <p className="mb-2 text-sm font-medium text-stitch-on-surface-variant">Your rating</p>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              className="text-stitch-primary"
            >
              <MaterialIcon
                name="star"
                filled={n <= (hoverRating || rating)}
                className={cn("!text-2xl", n > (hoverRating || rating) && "opacity-30")}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-stitch-on-surface-variant" htmlFor="comment">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          placeholder="Tell us about your visit…"
          className="w-full rounded-lg border border-stitch-outline-variant bg-white px-3 py-2 text-sm outline-none focus:border-stitch-primary dark:bg-stone-900"
        />
      </div>
      {state.error ? <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}
