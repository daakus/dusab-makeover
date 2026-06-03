import { AdminServicesView } from "@/components/admin/admin-services-view";
import { getDefaultServiceImage } from "@/lib/services/default-service-images";
import { createClient } from "@/supabase/server";

type ServiceCategoryJoin = { name?: string | null; slug?: string | null };

function categoryNameFromJoin(
  join: ServiceCategoryJoin | ServiceCategoryJoin[] | null | undefined
): string {
  if (!join) return "General";
  const row = Array.isArray(join) ? join[0] : join;
  return row?.name?.trim() || "General";
}

function categorySlugOrNameFromJoin(
  join: ServiceCategoryJoin | ServiceCategoryJoin[] | null | undefined
): string {
  if (!join) return "General";
  const row = Array.isArray(join) ? join[0] : join;
  return (row?.slug ?? row?.name ?? "General").trim() || "General";
}

const FALLBACK_CATEGORIES = [
  "General",
  "Facials",
  "Hair Styling",
  "Hair Treatments",
  "Makeup",
  "Nails",
  "Massage Therapy",
  "Body Treatments",
  "Waxing",
  "Bridal Services",
  "Brows & Lashes",
  "Spa Packages",
  "Wellness",
  "Men's Grooming",
  "Skin Care",
  "Premium Packages",
] as const;

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const [{ data: rows }, categoriesRes] = await Promise.all([
    supabase
      .from("services")
      .select(
        "id, name, description, duration_minutes, price_ghs, image_url, is_active, service_categories(name,slug)"
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("service_categories")
      .select("name, is_active, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  const initialServices =
    rows?.map((r) => ({
      id: r.id,
      name: r.name,
      category: categoryNameFromJoin(
        r.service_categories as ServiceCategoryJoin | ServiceCategoryJoin[] | null
      ),
      durationMins: r.duration_minutes,
      priceGhs: Number(r.price_ghs),
      description: r.description ?? "",
      imageSrc:
        r.image_url ??
        getDefaultServiceImage({
          category: categorySlugOrNameFromJoin(
            r.service_categories as ServiceCategoryJoin | ServiceCategoryJoin[] | null
          ),
          name: r.name,
        }),
      imageAlt: r.name,
      isActive: r.is_active,
    })) ?? [];

  const categorySet = new Set<string>();
  const categoryRows =
    categoriesRes.error || !categoriesRes.data || categoriesRes.data.length === 0
      ? []
      : categoriesRes.data;
  for (const c of categoryRows) {
    if (c.name?.trim()) categorySet.add(c.name.trim());
  }
  if (!categorySet.has("General")) categorySet.add("General");
  for (const s of initialServices) {
    if (s.category?.trim()) categorySet.add(s.category.trim());
  }

  const orderedCategories =
    categorySet.size > 0 ? Array.from(categorySet) : [...FALLBACK_CATEGORIES];

  return (
    <AdminServicesView
      initialServices={initialServices}
      serviceCategories={["All Services", ...orderedCategories]}
    />
  );
}
