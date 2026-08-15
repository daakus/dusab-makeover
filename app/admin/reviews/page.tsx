import { AdminReviewsView } from "@/components/admin/admin-reviews-view";
import { createClient } from "@/supabase/server";

export default async function AdminReviewsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("reviews")
    .select("id, customer_name, rating, comment, created_at")
    .order("created_at", { ascending: false });

  const initialReviews =
    rows?.map((r) => ({
      id: r.id,
      customerName: r.customer_name?.trim() || "Customer",
      rating: r.rating,
      comment: r.comment,
      createdAt: r.created_at,
    })) ?? [];

  return <AdminReviewsView initialReviews={initialReviews} />;
}
