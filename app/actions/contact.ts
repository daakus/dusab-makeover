"use server";

import { createClient } from "@/supabase/server";

export interface ContactActionState {
  error?: string;
  success?: string;
}

export async function submitContactMessage(
  _prev: ContactActionState | undefined,
  formData: FormData
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "Please enter your name." };
  if (!message) return { error: "Please enter a message." };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email: email || null,
    phone: phone || null,
    message,
  });

  if (error) return { error: error.message };

  return { success: "Thanks for reaching out — we'll get back to you soon." };
}
