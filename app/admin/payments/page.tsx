import { AdminPageHeader, AdminEmptyState } from "@/components/admin/admin-shared";
import { PaymentApprovalActions } from "@/components/admin/approvals-actions";
import { createClient } from "@/supabase/server";

export default async function AdminPaymentsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("payments")
    .select(`
      id, created_at, method, reference, verification_status, verified_at,
      appointments(
        start_at,
        profiles!appointments_user_id_fkey(full_name, phone),
        appointment_services(price_at_booking, services(name))
      )
    `)
    .order("created_at", { ascending: false })
    .limit(150);

  return (
    <main className="bg-stitch-background p-6 pb-24 md:p-12">
      <AdminPageHeader
        eyebrow="Payments"
        title="Payment verification"
        description="Confirm transaction status and keep appointment settlements accurate."
      />
      {!rows || rows.length === 0 ? (
        <AdminEmptyState title="No payments yet" description="Payment submissions will appear here." />
      ) : (
        <div className="space-y-3">
          {rows.map((p) => {
            const appt    = (p.appointments as unknown as { start_at: string; profiles: { full_name?: string | null; phone?: string | null } | null; appointment_services: { price_at_booking: number; services: { name: string } | null }[] } | null);
            const profile = appt?.profiles ?? null;
            const lines   = appt?.appointment_services ?? [];
            const names   = lines.map((l) => l.services?.name ?? "Service").join(", ");
            const total   = lines.reduce((sum, l) => sum + Number(l.price_at_booking ?? 0), 0);
            const dateStr = appt?.start_at ? new Date(appt.start_at).toLocaleDateString("en-GH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";
            const timeStr = appt?.start_at ? new Date(appt.start_at).toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" }) : "";

            return (
              <article key={p.id} className="rounded-xl bg-stitch-surface-container-low p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold">{p.method.replace(/_/g, " ")}</p>
                    <p className="text-sm text-stitch-on-surface-variant">Reference: {p.reference ?? "—"}</p>
                    <p className="text-xs text-stitch-outline">
                      {new Date(p.created_at).toLocaleString()} · {p.verification_status}
                    </p>
                  </div>
                  {p.verification_status === "pending" ? (
                    <PaymentApprovalActions
                      paymentId={p.id}
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
