"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function adminLogin(formData: FormData) {
  const password = formData.get("password") as string;
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password." };
  }
  const cookieStore = await cookies();
  cookieStore.set("momo_admin", process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    sameSite: "lax",
    path: "/momo-admin",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return { success: true };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("momo_admin");
}

export async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const val = cookieStore.get("momo_admin")?.value;
  return !!process.env.ADMIN_PASSWORD && val === process.env.ADMIN_PASSWORD;
}

// ── Booking actions ───────────────────────────────────────────────────────────

export type Booking = {
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

export async function getBookings(): Promise<Booking[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Booking[];
}

export async function confirmBooking(bookingId: string) {
  if (!(await isAdminAuthed())) return { error: "Unauthorized" };
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("id", bookingId);
  if (error) return { error: error.message };
  revalidatePath("/momo-admin");
  return { success: true };
}

export async function cancelBooking(bookingId: string) {
  if (!(await isAdminAuthed())) return { error: "Unauthorized" };
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId);
  if (error) return { error: error.message };
  revalidatePath("/momo-admin");
  return { success: true };
}
