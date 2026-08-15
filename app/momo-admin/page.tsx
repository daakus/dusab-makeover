import Image from "next/image";
import { isAdminAuthed, getBookings, adminLogout } from "./actions";
import { AdminLoginForm } from "@/components/momo-admin/login-form";
import { BookingRow } from "@/components/momo-admin/booking-row";

export const dynamic = "force-dynamic";

export default async function MomoAdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return <AdminLoginForm />;
  }

  const bookings = await getBookings();

  const pending   = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="flex items-center justify-between bg-pink-600 px-6 py-4 shadow">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/dusab-icon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-pink-200">Admin Dashboard</p>
            <h1 className="font-serif text-xl font-bold text-white">Dusab Beauty Palour 💄</h1>
          </div>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="rounded-lg bg-pink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-800"
          >
            Sign Out
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-yellow-50 p-5 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-600">Pending</p>
            <p className="mt-1 text-3xl font-bold text-yellow-700">{pending}</p>
          </div>
          <div className="rounded-xl bg-green-50 p-5 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-green-600">Confirmed</p>
            <p className="mt-1 text-3xl font-bold text-green-700">{confirmed}</p>
          </div>
          <div className="rounded-xl bg-red-50 p-5 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-red-500">Cancelled</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{cancelled}</p>
          </div>
        </div>

        {/* Bookings table */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {["Name", "Phone", "Service", "Date", "Time", "Amount", "Status", "Receipt", "Actions"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    No bookings yet. Share <strong>/book</strong> with customers!
                  </td>
                </tr>
              ) : (
                bookings.map((b) => <BookingRow key={b.id} booking={b} />)
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          When you click <strong>Confirm ✅</strong>, WhatsApp opens automatically to send the
          customer their confirmation message.
        </p>
      </main>
    </div>
  );
}
