"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MOMO_SERVICES } from "@/lib/constants/momo-services";
import { submitBooking } from "@/app/book/actions";
import { buildBookingWhatsAppUrl } from "@/lib/utils/whatsapp";

const today = new Date().toISOString().split("T")[0];

export function MomoBookingForm() {
  const router  = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error,   setError]   = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [price,   setPrice]   = useState(MOMO_SERVICES[0].price);

  // Keep track of current form field values for building the WhatsApp URL client-side
  const nameRef  = useRef("");
  const phoneRef = useRef("");
  const dateRef  = useRef("");
  const timeRef  = useRef("");
  const svcRef   = useRef(MOMO_SERVICES[0]);

  function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const svc = MOMO_SERVICES.find((s) => s.id === e.target.value);
    if (svc) { svcRef.current = svc; setPrice(svc.price); }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    // Capture values before async so we can build the WhatsApp URL client-side
    nameRef.current  = fd.get("customer_name") as string;
    phoneRef.current = fd.get("phone_number")  as string;
    dateRef.current  = fd.get("preferred_date") as string;
    timeRef.current  = fd.get("preferred_time") as string;

    startTransition(async () => {
      const res = await submitBooking(fd);

      if ("error" in res) { setError(res.error ?? "An error occurred."); return; }

      // Build WhatsApp vendor-alert URL client-side (avoids popup blockers)
      const waUrl = buildBookingWhatsAppUrl({
        customerName:  nameRef.current,
        phoneNumber:   phoneRef.current,
        service:       res.service,
        preferredDate: dateRef.current,
        preferredTime: timeRef.current,
        amount:        res.amount,
        receiptUrl:    res.receiptUrl,
      });

      formRef.current?.reset();
      setPreview(null);
      setPrice(MOMO_SERVICES[0].price);

      // Pass WhatsApp URL to confirmation page — opening it there avoids popup blockers
      router.push(`/book/confirmation/${res.bookingId}?wa=${encodeURIComponent(waUrl)}`);
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-lg md:p-8"
    >
      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="customer_name">
          Full Name
        </label>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          required
          placeholder="e.g. Abena Mensah"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="phone_number">
          WhatsApp / Phone Number
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          required
          placeholder="e.g. 0241234567"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
      </div>

      {/* Service */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="service">
          Service / Training
        </label>
        <select
          id="service"
          name="service"
          required
          onChange={handleServiceChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <optgroup label="Services">
            {MOMO_SERVICES.filter((s) => s.category === "service").map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} — GH₵ {s.price}
              </option>
            ))}
          </optgroup>
          <optgroup label="Training">
            {MOMO_SERVICES.filter((s) => s.category === "training").map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} — GH₵ {s.price}
              </option>
            ))}
          </optgroup>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Fee: <span className="font-bold text-pink-600">GH₵ {price}</span>
        </p>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="preferred_date">
            Preferred Date
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            required
            min={today}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="preferred_time">
            Preferred Time
          </label>
          <input
            id="preferred_time"
            name="preferred_time"
            type="time"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
      </div>

      {/* MoMo Payment instructions */}
      <div className="rounded-xl bg-pink-50 p-4 text-sm text-pink-800">
        <p className="font-bold">💳 MoMo Payment Instructions</p>
        <p className="mt-1">
          Send payment to <span className="font-bold">0546006627</span> (Dusab Beauty Palour), then
          upload your screenshot receipt below.
        </p>
      </div>

      {/* Receipt upload */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700" htmlFor="receipt">
          Upload MoMo Receipt Screenshot
        </label>
        <input
          id="receipt"
          name="receipt"
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-pink-100 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-pink-700 hover:file:bg-pink-200"
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Receipt preview" className="mt-2 h-32 rounded-lg object-cover" />
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-700 disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit Booking & Send via WhatsApp 📲"}
      </button>

      <p className="text-center text-xs text-gray-400">
        After submitting, WhatsApp will open automatically to send your booking to the artist.
      </p>
    </form>
  );
}
