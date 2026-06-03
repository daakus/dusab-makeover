import type { Metadata } from "next";
import { BookingSanctuaryView } from "@/components/booking/booking-sanctuary-view";
import { SITE_NAME } from "@/lib/constants/site";
import { type DemoBookingService, type DemoStaffOption } from "@/lib/constants/booking-flow-demo";
import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: `Book Your Sanctuary | ${SITE_NAME}`,
  description: "Select your service, artisan, and preferred time.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: { service?: string; serviceId?: string };
}) {
  const supabase = await createClient();

  const [{ data: serviceRows }, { data: staffRows }, { data: tax }, { data: blocked }, { data: business }] =
    await Promise.all([
      supabase
        .from("services")
        .select("id, name, description, duration_minutes, price_ghs")
        .eq("is_active", true)
        .order("name", { ascending: true }),
      supabase.from("staff").select("id, display_name, title").eq("is_active", true).order("display_name", {
        ascending: true,
      }),
      supabase.from("tax_settings").select("tax_rate").maybeSingle(),
      supabase.from("blocked_dates").select("date"),
      supabase.from("business_settings").select("max_days_ahead").maybeSingle(),
    ]);

  const services: DemoBookingService[] = (serviceRows ?? []).map((s) => ({
    id: s.id,
    title: s.name,
    description: `${s.duration_minutes} mins • ${s.description ?? "Curated sanctuary experience."}`,
    durationMins: s.duration_minutes,
    priceGhs: Number(s.price_ghs),
    icon: "spa",
  }));

  const staffOptions: DemoStaffOption[] = (staffRows ?? []).map((s) => ({
    id: s.id,
    label: s.title ? `${s.display_name} (${s.title})` : s.display_name,
  }));

  return (
    <BookingSanctuaryView
      services={services}
      staffOptions={staffOptions}
      initialServiceHint={searchParams.serviceId ?? searchParams.service ?? null}
      taxRate={Number(tax?.tax_rate ?? 0.05)}
      blockedDates={(blocked ?? []).map((b: { date: string }) => String(b.date))}
      maxDaysAhead={Number(business?.max_days_ahead ?? 60)}
      dbHasServices={Boolean(serviceRows && serviceRows.length > 0)}
      dbHasStaff={Boolean(staffRows && staffRows.length > 0)}
    />
  );
}
