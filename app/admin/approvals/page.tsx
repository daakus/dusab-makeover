import { AdminPageHeader, AdminEmptyState } from "@/components/admin/admin-shared";
import { BookingApprovalActions, PaymentApprovalActions } from "@/components/admin/approvals-actions";
import { createClient } from "@/supabase/server";

export default async function AdminApprovalsPage() {
  const supabase = await createClient();
  const [{ data: appointments }, { data: payments }] = await Promise.all([
    supabase
      .from("appointments")
      .select(`
        id, start_at, status,
        profiles!appointments_user_id_fkey(full_name, phone),
        appointment_services(price_at_booking, services(name))
      `)
      .in("status", ["payment_submitted"])
      .order("start_at", { ascending: true })
      .limit(50),
    supabase
      .from("payments")
      .select(`
        id, created_at, method, reference, verification_status,
        appointments(
          start_at,
          profiles!appointments_user_id_fkey(full_name, phone),
          appointment_services(price_at_booking, services(name))
        )
      `)
      .eq("verification_status", "pending")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);
  const hasData = (appointments?.length ?? 0) > 0 || (payments?.length ?? 0) > 0;

  return (
    <main className="bg-stitch-background p-6 pb-24 md:p-12">
      <AdminPageHeader
        eyebrow="Approvals"
        title="Approval queue"
        description="Review pending requests and keep client confirmations moving."
      />
      {!hasData ? (
        <AdminEmptyState title="No pending approvals" description="Approval queues will appear here when needed." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <section className="space-y-3 rounded-xl bg-stitch-surface-container-low p-4">
            <h2 className="font-semibold">Booking approvals</h2>
            {(appointments ?? []).map((a) => {
              const profile  = a.profiles as { full_name?: string | null; phone?: string | null } | null;
              const lines    = (a.appointment_services as unknown as { price_at_booking: number; services: { name: string } | null }[]) ?? [];
              const names    = lines.map((l) => l.services?.name ?? "Service").join(", ");
              const total    = lines.reduce((sum, l) => sum + Number(l.price_at_booking ?? 0), 0);
              const dateStr  = new Date(a.start_at).toLocaleDateString("en-GH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
              const timeStr  = new Date(a.start_at).toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" });

              return (
                <article key={a.id} className="rounded-lg bg-white/70 p-3 dark:bg-stone-900">
                  <p className="font-medium">{profile?.full_name ?? "Customer"}</p>
                  <p className="text-xs text-stitch-on-surface-variant">{new Date(a.start_at).toLocaleString()}</p>
                  <div className="mt-2">
                    <BookingApprovalActions
                      appointmentId={a.id}
                      customerName={profile?.full_name ?? "Customer"}
                      customerPhone={profile?.phone ?? ""}
                      service={names || "Beauty Service"}
                      dateStr={dateStr}
                      timeStr={timeStr}
                      amount={total}
                    />
                  </div>
                </article>
              );
            })}
          </section>
          <section className="space-y-3 rounded-xl bg-stitch-surface-container-low p-4">
            <h2 className="font-semibold">Payment approvals</h2>
            {(payments ?? []).map((p) => {
              const appt     = p.appointments as unknown as { start_at: string; profiles: { full_name?: string | null; phone?: string | null } | null; appointment_services: { price_at_booking: number; services: { name: string } | null }[] } | null;
              const profile  = appt?.profiles ?? null;
              const lines    = appt?.appointment_services ?? [];
              const names    = lines.map((l) => l.services?.name ?? "Service").join(", ");
              const total    = lines.reduce((sum, l) => sum + Number(l.price_at_booking ?? 0), 0);
              const dateStr  = appt?.start_at ? new Date(appt.start_at).toLocaleDateString("en-GH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";
              const timeStr  = appt?.start_at ? new Date(appt.start_at).toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" }) : "";

              return (
                <article key={p.id} className="rounded-lg bg-white/70 p-3 dark:bg-stone-900">
                  <p className="font-medium">{p.method.replace(/_/g, " ")}</p>
                  <p className="text-xs text-stitch-on-surface-variant">
                    Ref: {p.reference ?? "—"} · {new Date(p.created_at).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <PaymentApprovalActions
                      paymentId={p.id}
                      customerName={profile?.full_name ?? "Customer"}
                      customerPhone={profile?.phone ?? ""}
                      service={names || "Beauty Service"}
                      dateStr={dateStr}
                      timeStr={timeStr}
                      amount={total}
                    />
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      )}
    </main>
  );
}
