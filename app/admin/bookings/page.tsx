import { AdminPageHeader, AdminEmptyState } from "@/components/admin/admin-shared";
import { BookingApprovalActions } from "@/components/admin/approvals-actions";
import { createClient } from "@/supabase/server";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("appointments")
    .select(`
      id, start_at, end_at, status,
      profiles!appointments_user_id_fkey(full_name, phone),
      staff(display_name),
      appointment_services(price_at_booking, services(name))
    `)
    .order("start_at", { ascending: true })
    .limit(120);

  return (
    <main className="bg-stitch-background p-6 pb-24 md:p-12">
      <AdminPageHeader
        eyebrow="Bookings"
        title="Booking management"
        description="Track booking flow and monitor confirmations from one place."
      />
      {!rows || rows.length === 0 ? (
        <AdminEmptyState title="No bookings yet" description="Bookings will appear here once customers submit appointments." />
      ) : (
        <div className="space-y-3">
          {rows.map((a) => {
            const profile = a.profiles as { full_name?: string | null; phone?: string | null } | null;
            const lines   = (a.appointment_services as unknown as { price_at_booking: number; services: { name: string } | null }[]) ?? [];
            const names   = lines.map((l) => l.services?.name ?? "Service").join(", ");
            const total   = lines.reduce((sum, l) => sum + Number(l.price_at_booking ?? 0), 0);
            const dateStr = new Date(a.start_at).toLocaleDateString("en-GH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
            const timeStr = new Date(a.start_at).toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" });

            return (
              <article key={a.id} className="rounded-xl bg-stitch-surface-container-low p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold">{profile?.full_name ?? "Customer"}</p>
                    <p className="text-sm text-stitch-on-surface-variant">
                      {new Date(a.start_at).toLocaleString()} - {new Date(a.end_at).toLocaleTimeString()}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-stitch-outline">
                      {(a.staff as { display_name?: string | null } | null)?.display_name ?? "Unassigned"} · {a.status}
                    </p>
                  </div>
                  {a.status === "payment_submitted" ? (
                    <BookingApprovalActions
                      appointmentId={a.id}
                      customerName={profile?.full_name ?? "Customer"}
                      customerPhone={profile?.phone ?? ""}
                      service={names || "Beauty Service"}
                      dateStr={dateStr}
                      timeStr={timeStr}
                      amount={total}
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
