"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, ok: false as const };
  const { data: role } = await supabase.rpc("current_role_slug");
  const isAdmin = role === "admin" || role === "super_admin";
  return isAdmin ? { supabase, ok: true as const } : { supabase, ok: false as const };
}

export async function deleteReview(id: string) {
  const { supabase, ok } = await assertAdmin();
  if (!ok) return { error: "Unauthorized." };

  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true as const };
}
