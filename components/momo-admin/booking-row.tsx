"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { confirmBooking, cancelBooking } from "@/app/momo-admin/actions";
import { buildConfirmationWhatsAppUrl } from "@/lib/utils/whatsapp";

type Booking = {
  id: string;
  customer_name: string;
  phone_number: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  amount: number;
  receipt_url: string;
  status: string;
  created_at: string;
};

export function BookingRow({ booking }: { booking: Booking }) {
  const [isPending, startTransition] = useTransition();
  const [lightbox, setLightbox]      = useState(false);

  const statusColor =
    booking.status === "confirmed"
      ? "bg-green-100 text-green-700"
      : booking.status === "cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  function handleConfirm() {
    startTransition(async () => {
      const res = await confirmBooking(booking.id);
      if (res.error) { toast.error(res.error); return; }

      // Build confirmation URL client-side and open WhatsApp to customer
      const waUrl = buildConfirmationWhatsAppUrl({
        customerName:  booking.customer_name,
        customerPhone: booking.phone_number,
        service:       booking.service,
        preferredDate: new Date(booking.preferred_date).toLocaleDateString("en-GH", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        }),
        preferredTime: booking.preferred_time.slice(0, 5),
        amount:        booking.amount,
      });
      window.open(waUrl, "_blank");
      toast.success("Booking confirmed — WhatsApp opened to notify customer");
    });
  }

  function handleCancel() {
    if (!confirm(`Cancel booking for ${booking.customer_name}?`)) return;
    startTransition(async () => {
      const res = await cancelBooking(booking.id);
      if (res.error) toast.error(res.error);
      else toast.success("Booking cancelled");
    });
  }

  const date = new Date(booking.preferred_date).toLocaleDateString("en-GH");
  const time = booking.preferred_time.slice(0, 5);

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="px-4 py-3 font-medium">{booking.customer_name}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{booking.phone_number}</td>
        <td className="px-4 py-3 text-sm">{booking.service}</td>
        <td className="px-4 py-3 text-sm">{date}</td>
        <td className="px-4 py-3 text-sm">{time}</td>
        <td className="px-4 py-3 text-sm font-semibold">GH₵ {booking.amount}</td>
        <td className="px-4 py-3">
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusColor}`}>
            {booking.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => setLightbox(true)}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View Receipt
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            {booking.status === "pending" && (
              <>
                <button
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="rounded-lg bg-green-600 px-3 py-1 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {isPending ? "…" : "✓ Confirm"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isPending}
                  className="rounded-lg border border-red-300 px-3 py-1 text-xs font-bold text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            )}
            {booking.status === "confirmed" && (
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="rounded-lg border border-red-300 px-3 py-1 text-xs font-bold text-red-500 hover:bg-red-50 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Receipt lightbox */}
      {lightbox && (
        <tr>
          <td colSpan={9}>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
              onClick={() => setLightbox(false)}
            >
              <div
                className="relative max-h-[90vh] max-w-xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightbox(false)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Receipt — {booking.customer_name}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={booking.receipt_url}
                  alt="MoMo receipt"
                  className="max-h-[70vh] w-full rounded-lg object-contain"
                />
                <a
                  href={booking.receipt_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-center text-xs text-blue-500 hover:underline"
                >
                  Open full image ↗
                </a>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
