"use client";

import { addDays, format, parse, startOfDay, isAfter, isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type DemoBookingService,
  type DemoStaffOption,
} from "@/lib/constants/booking-flow-demo";
import { submitBooking } from "@/app/actions/booking";
import { buildBookingWhatsAppUrl } from "@/lib/utils/whatsapp";
import { BookingFlowChrome } from "@/components/booking/booking-flow-chrome";
import { BookingFlowFooter } from "@/components/booking/booking-flow-footer";
import { MaterialIcon } from "@/components/home/material-icon";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s
  );
}

export function BookingSanctuaryView(props: {
  services: DemoBookingService[];
  staffOptions: DemoStaffOption[];
  initialServiceHint: string | null;
  taxRate: number;
  blockedDates: string[];
  maxDaysAhead: number;
  dbHasServices: boolean;
  dbHasStaff: boolean;
}) {
  const { services, staffOptions, initialServiceHint, taxRate, blockedDates, maxDaysAhead, dbHasServices, dbHasStaff } =
    props;
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mtn_momo" | "vodafone_cash" | "airteltigo_money">(
    "mtn_momo"
  );
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dateStr = date ? format(date, "yyyy-MM-dd") : null;

  const selectedServices = useMemo(
    () => services.filter((s) => serviceIds.includes(s.id)),
    [services, serviceIds]
  );

  const totalDuration = selectedServices.reduce((a, s) => a + (s.durationMins || 0), 0);
  const subtotal = selectedServices.reduce((a, s) => a + (s.priceGhs || 0), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates]);
  const maxDate = useMemo(() => addDays(startOfDay(new Date()), maxDaysAhead), [maxDaysAhead]);

  const toggleService = useCallback((id: string) => {
    setServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  useEffect(() => {
    if (!initialServiceHint || services.length === 0) return;
    const hint = initialServiceHint.trim();
    if (!hint) return;
    const byId = services.find((s) => s.id === hint);
    if (byId) {
      setServiceIds([byId.id]);
      return;
    }
    const slug = hint.toLowerCase();
    const bySlug = services.find(
      (s) => s.title.toLowerCase().replace(/\s+/g, "-").includes(slug) || s.id === slug
    );
    if (bySlug) setServiceIds([bySlug.id]);
  }, [initialServiceHint, services]);

  useEffect(() => {
    if (!dateStr || totalDuration <= 0) {
      setSlots([]);
      setTime(null);
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);
    const params = new URLSearchParams({
      date: dateStr,
      duration: String(totalDuration || 60),
    });
    if (staffId) params.set("staffId", staffId);

    fetch(`/api/booking/availability?${params.toString()}`)
      .then((r) => r.json())
      .then((data: { slots?: string[] }) => {
        if (!cancelled) {
          setSlots(data.slots ?? []);
          setTime(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSlots([]);
          toast.error("Could not load time slots.");
        }
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dateStr, totalDuration, staffId]);

  const handleSubmit = async () => {
    if (!dateStr || !time || serviceIds.length === 0 || !paymentReference.trim() || !paymentScreenshot) {
      toast.error("Complete all payment fields.");
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    fd.set("service_ids", serviceIds.join(","));
    fd.set("date", dateStr);
    fd.set("time", time);
    fd.set("staff_id", staffId ?? "");
    fd.set("notes", notes);
    fd.set("payment_reference", paymentReference.trim());
    fd.set("payment_method", paymentMethod);
    fd.set("payment_screenshot", paymentScreenshot);

    const res = await submitBooking(fd);
    setSubmitting(false);

    if ("error" in res && res.error) {
      if (String(res.error).toLowerCase().includes("log in")) {
        toast.error(res.error);
        router.push(`/login?next=${encodeURIComponent("/booking")}`);
        return;
      }
      toast.error(res.error);
      return;
    }

    if ("success" in res && res.success && res.appointmentId) {
      toast.success("Booking submitted!");
      // Build WhatsApp vendor-alert URL client-side (avoids popup blockers)
      const waUrl = buildBookingWhatsAppUrl({
        customerName:  res.customerName,
        phoneNumber:   res.customerPhone,
        service:       res.serviceNames,
        preferredDate: res.dateStr,
        preferredTime: res.timeStr,
        amount:        res.totalGhs,
        receiptUrl:    res.receiptUrl,
      });
      // Pass WhatsApp URL to confirmation page — opening it there avoids popup blockers
      router.push(
        `/booking/confirmation/${res.appointmentId}?wa=${encodeURIComponent(waUrl)}`
      );
      return;
    }

    toast.error("Something went wrong.");
  };

  const staffChoices = dbHasServices ? staffOptions.filter((s) => isUuid(s.id)) : [];
  const bookingDisabled = !dbHasServices;

  return (
    <div className="min-h-screen bg-stitch-background pb-24 pt-24 text-stitch-on-surface">
      <BookingFlowChrome variant="booking" primaryHref="/" primaryLabel="Exit" />

      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <header className="mb-10 text-center">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-stitch-secondary">Reservations</p>
          <h1 className="mt-2 font-display text-3xl text-rose-900 md:text-4xl">Book your sanctuary</h1>
        </header>

        <div className="mb-8 flex justify-center gap-2">
          {([1, 2, 3] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStep(n)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest",
                step === n ? "bg-stitch-primary text-stitch-on-primary" : "bg-stitch-surface-container-low text-stitch-outline"
              )}
            >
              {n === 1 ? "Services" : n === 2 ? "Schedule" : "Payment"}
            </button>
          ))}
        </div>

        {step === 1 && (
          <section className="space-y-4">
            {bookingDisabled ? (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                Booking is temporarily unavailable because no active services were found in the database.
              </div>
            ) : null}
            <p className="text-sm text-stitch-on-surface-variant">Select one or more services.</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const on = serviceIds.includes(s.id);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        "w-full rounded-2xl border p-4 text-left transition-all",
                        on
                          ? "border-stitch-primary bg-stitch-primary/10 shadow-md"
                          : "border-stitch-outline-variant/30 bg-stitch-surface-container-lowest hover:border-stitch-primary/40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-headline text-lg text-rose-900">{s.title}</h3>
                          <p className="mt-1 line-clamp-2 text-xs text-stitch-on-surface-variant">{s.description}</p>
                          <p className="mt-2 text-sm font-bold text-stitch-primary">
                            GHS {s.priceGhs.toFixed(0)} Â· {s.durationMins} min
                          </p>
                        </div>
                        <MaterialIcon name={on ? "check_circle" : "radio_button_unchecked"} className="text-stitch-primary" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={serviceIds.length === 0 || bookingDisabled}
                onClick={() => setStep(2)}
                className="rounded-full bg-stitch-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-stitch-on-primary disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-stitch-secondary">Date</p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => {
                    const day = startOfDay(d);
                    const today = startOfDay(new Date());
                    if (isBefore(day, today)) return true;
                    if (isAfter(day, maxDate)) return true;
                    const ymd = format(d, "yyyy-MM-dd");
                    return blockedSet.has(ymd);
                  }}
                  className="rounded-2xl border border-stitch-outline-variant/20 bg-stitch-surface-container-lowest p-2"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-stitch-secondary">Staff preference</p>
                  <select
                    className="w-full rounded-xl border border-stitch-outline-variant bg-stitch-surface px-3 py-2 text-sm"
                    value={staffId ?? ""}
                    onChange={(e) => setStaffId(e.target.value || null)}
                    disabled={!dbHasStaff}
                  >
                    <option value="">Any available</option>
                    {staffChoices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {!dbHasStaff ? (
                    <p className="mt-1 text-xs text-stitch-on-surface-variant">
                      No active staff found; availability will be matched automatically.
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-stitch-secondary">Time</p>
                  {slotsLoading ? (
                    <p className="text-sm text-stitch-on-surface-variant">Loading slotsâ€¦</p>
                  ) : !dateStr ? (
                    <p className="text-sm text-stitch-on-surface-variant">Choose a date first.</p>
                  ) : slots.length === 0 ? (
                    <p className="text-sm text-stitch-on-surface-variant">No slots for this day.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs font-bold",
                            time === slot
                              ? "border-stitch-primary bg-stitch-primary text-stitch-on-primary"
                              : "border-stitch-outline-variant bg-stitch-surface"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-stitch-secondary">Notes (optional)</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-stitch-outline-variant bg-stitch-surface px-3 py-2 text-sm"
                    placeholder="Allergies, preferencesâ€¦"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-stitch-outline-variant px-6 py-2 text-sm font-bold"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!dateStr || !time}
                onClick={() => setStep(3)}
                className="rounded-full bg-stitch-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-stitch-on-primary disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-stitch-outline-variant/20 bg-stitch-surface-container-low p-6">
              <h3 className="font-headline text-lg text-rose-900">Summary</h3>
              <ul className="mt-3 space-y-1 text-sm">
                {selectedServices.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.title}</span>
                    <span>GHS {s.priceGhs.toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t pt-2 text-stitch-on-surface-variant">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>GHS {tax.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>GHS {total.toFixed(2)}</span>
                </li>
              </ul>
              <p className="mt-2 text-xs text-stitch-on-surface-variant">
                {dateStr && time ? `${format(parse(dateStr, "yyyy-MM-dd", new Date()), "PPP")} Â· ${time}` : "â€”"}
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-stitch-outline-variant/20 p-6">
              <h3 className="font-headline text-lg text-rose-900">Payment</h3>
              <p className="text-sm text-stitch-on-surface-variant">
                Pay via MoMo, then upload your receipt and reference. You must be signed in to confirm.
              </p>
              <select
                className="w-full rounded-xl border border-stitch-outline-variant bg-stitch-surface px-3 py-2 text-sm"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as "mtn_momo" | "vodafone_cash" | "airteltigo_money")
                }
              >
                <option value="mtn_momo">MTN MoMo</option>
                <option value="vodafone_cash">Vodafone Cash</option>
                <option value="airteltigo_money">AirtelTigo Money</option>
              </select>
              <input
                className="w-full rounded-xl border border-stitch-outline-variant bg-stitch-surface px-3 py-2 text-sm"
                placeholder="Payment reference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPaymentScreenshot(e.target.files?.[0] ?? null)}
                className="w-full text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-full border border-stitch-outline-variant px-6 py-2 text-sm font-bold"
              >
                Back
              </button>
              <button
                type="button"
                disabled={
                  submitting ||
                  !paymentReference.trim() ||
                  !paymentScreenshot ||
                  serviceIds.length === 0 ||
                  !dateStr ||
                  !time
                }
                onClick={handleSubmit}
                className="rounded-full bg-gradient-to-br from-stitch-primary to-stitch-primary-container px-10 py-4 text-sm font-bold uppercase tracking-widest text-stitch-on-primary disabled:opacity-40"
              >
                {submitting ? "Submittingâ€¦" : "Confirm appointment"}
              </button>
            </div>
          </section>
        )}
      </main>

      <BookingFlowFooter />
    </div>
  );
}
