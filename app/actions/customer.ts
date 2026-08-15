"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

export type CustomerActionState = { error?: string; success?: string };

const initialPath = ["/customer", "/customer/settings", "/customer/favorites"] as const;

function revalidateCustomer() {
  for (const p of initialPath) {
    revalidatePath(p);
  }
}

export async function updateCustomerProfile(
  _prev: CustomerActionState | undefined,
  formData: FormData
): Promise<CustomerActionState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const avatarUrl = String(formData.get("avatar_url") ?? "").trim();

  if (!fullName) {
    return { error: "Name is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidateCustomer();
  return { success: "Profile updated." };
}

export async function removeFavoriteService(formData: FormData): Promise<void> {
  const serviceId = String(formData.get("service_id") ?? "").trim();
  if (!serviceId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from("user_favorite_services")
    .delete()
    .eq("user_id", user.id)
    .eq("service_id", serviceId);

  if (error) return;

  revalidatePath("/customer/favorites");
  revalidatePath("/customer");
}

export async function submitReview(
  _prev: CustomerActionState | undefined,
  formData: FormData
): Promise<CustomerActionState> {
  const appointmentId = String(formData.get("appointment_id") ?? "").trim();
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim();

  if (!appointmentId) return { error: "Missing appointment." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Please choose a rating from 1 to 5." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { data: appointment } = await supabase
    .from("appointments")
    .select("id, status, end_at")
    .eq("id", appointmentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!appointment) return { error: "Appointment not found." };
  if (appointment.status !== "booking_confirmed" || new Date(appointment.end_at) > new Date()) {
    return { error: "You can only review a visit after it's complete." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const { error } = await supabase.from("reviews").insert({
    appointment_id: appointmentId,
    user_id: user.id,
    customer_name: profile?.full_name?.trim() || "Customer",
    rating,
    comment: comment || null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You've already reviewed this visit." };
    }
    return { error: error.message };
  }

  revalidatePath(`/customer/appointments/${appointmentId}/manage`);
  revalidatePath("/");
  return { success: "Thanks for sharing your experience!" };
}

export async function addFavoriteService(serviceId: string): Promise<CustomerActionState> {
  if (!serviceId) {
    return { error: "Missing service." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase.from("user_favorite_services").upsert(
    { user_id: user.id, service_id: serviceId },
    { onConflict: "user_id,service_id" }
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/customer/favorites");
  revalidatePath("/customer");
  return { success: "Saved to favorites." };
}
