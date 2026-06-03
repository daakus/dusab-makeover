"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setAppointmentStatus, setPaymentVerification } from "@/app/actions/admin";
import { buildConfirmationWhatsAppUrl } from "@/lib/utils/whatsapp";

export function BookingApprovalActions(props: {
  appointmentId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  dateStr: string;
  timeStr: string;
  amount: number;
}) {
  const { appointmentId, customerName, customerPhone, service, dateStr, timeStr, amount } = props;
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const r = await setAppointmentStatus(appointmentId, "booking_confirmed");
            if (r.error) { toast.error(r.error); return; }
            // Open WhatsApp to customer with confirmation message
            const waUrl = buildConfirmationWhatsAppUrl({ customerName, customerPhone, service, preferredDate: dateStr, preferredTime: timeStr, amount });
            window.open(waUrl, "_blank");
            toast.success("Booking approved — WhatsApp opened to notify customer");
          })
        }
        className="rounded-full bg-stitch-primary px-3 py-1 text-xs font-bold text-stitch-on-primary disabled:opacity-60"
      >
        {pending ? "…" : "✓ Approve"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const r = await setAppointmentStatus(appointmentId, "rejected");
            if (r.error) toast.error(r.error);
            else toast.success("Booking rejected");
          })
        }
        className="rounded-full border border-red-300 px-3 py-1 text-xs font-bold text-red-700 disabled:opacity-60"
      >
        Reject
      </button>
    </div>
  );
}

export function PaymentApprovalActions(props: {
  paymentId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  dateStr: string;
  timeStr: string;
  amount: number;
}) {
  const { paymentId, customerName, customerPhone, service, dateStr, timeStr, amount } = props;
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const r = await setPaymentVerification(paymentId, "verified");
            if (r.error) { toast.error(r.error); return; }
            // Open WhatsApp to customer confirming payment received
            const waUrl = buildConfirmationWhatsAppUrl({ customerName, customerPhone, service, preferredDate: dateStr, preferredTime: timeStr, amount });
            window.open(waUrl, "_blank");
            toast.success("Payment approved — WhatsApp opened to notify customer");
          })
        }
        className="rounded-full bg-stitch-primary px-3 py-1 text-xs font-bold text-stitch-on-primary disabled:opacity-60"
      >
        {pending ? "…" : "✓ Approve"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const r = await setPaymentVerification(paymentId, "rejected");
            if (r.error) toast.error(r.error);
            else toast.success("Payment rejected");
          })
        }
        className="rounded-full border border-red-300 px-3 py-1 text-xs font-bold text-red-700 disabled:opacity-60"
      >
        Reject
      </button>
    </div>
  );
}
