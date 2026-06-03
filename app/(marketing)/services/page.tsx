import type { Metadata } from "next";
import { ServicesPageView } from "@/components/services/services-page-view";
import { SITE_NAME } from "@/lib/constants/site";
import {
  CATALOG_SERVICES,
  type CatalogService,
  type ServiceCategorySlug,
} from "@/lib/constants/services-catalog";
import { getDefaultServiceImage } from "@/lib/services/default-service-images";
import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_NAME}`,
  description:
    "Makeup artistry, hairstyling, frontal installations, one-on-one tutorials, and online training in Kumasi.",
};

const categoryMap: Record<ServiceCategorySlug, string[]> = {
  all: [],
  makeup: ["makeup", "makeup-artistry", "bridal-makeup"],
  hair: ["hair-styling", "hairstyling", "hair"],
  frontal: ["frontal-installation", "frontal"],
  tutorials: ["tutorials-in-person", "one-on-one-tutorials"],
  online: ["tutorials-online", "online-training"],
  lashes: ["brows-lashes", "lashes", "brows"],
};

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, name, description, duration_minutes, price_ghs, image_url, service_categories(slug,name)")
    .eq("is_active", true);

  const dbRows = (data ?? []) as Array<{
    id: string;
    name: string;
    description: string | null;
    duration_minutes: number;
    price_ghs: number | string;
    image_url: string | null;
    service_categories:
      | { slug: string; name?: string | null }
      | Array<{ slug: string; name?: string | null }>
      | null;
  }>;

  const merged: CatalogService[] = CATALOG_SERVICES.map((tpl) => {
    const categorySlugs = categoryMap[tpl.category];
    const match = dbRows.find((r) => {
      const catSlug = Array.isArray(r.service_categories)
        ? r.service_categories[0]?.slug
        : r.service_categories?.slug;
      return catSlug ? categorySlugs.includes(catSlug) : false;
    });
    if (!match) {
      return {
        ...tpl,
        bookingServiceId: dbRows.length === 0 ? tpl.id : null,
      };
    }
    return {
      ...tpl,
      id: match.id,
      bookingServiceId: match.id,
      title: match.name,
      description: match.description ?? tpl.description,
      durationMins: match.duration_minutes || tpl.durationMins,
      priceFromGhs: Number(match.price_ghs) || tpl.priceFromGhs,
      image:
        match.image_url ??
        getDefaultServiceImage({
          category: Array.isArray(match.service_categories)
            ? match.service_categories[0]?.slug
            : match.service_categories?.slug,
          name: match.name,
        }),
      imageAlt: match.name,
    };
  });

  const existingIds = new Set(merged.map((m) => m.id));
  const extraDbServices: CatalogService[] = dbRows
    .filter((r) => !existingIds.has(r.id))
    .map((r) => {
      const catSlug = Array.isArray(r.service_categories)
        ? r.service_categories[0]?.slug
        : r.service_categories?.slug;
      const catName = Array.isArray(r.service_categories)
        ? r.service_categories[0]?.name
        : r.service_categories?.name;
      const normalizedCategory: Exclude<ServiceCategorySlug, "all"> = catSlug?.includes("frontal")
        ? "frontal"
        : catSlug?.includes("hair")
          ? "hair"
          : catSlug?.includes("makeup") || catSlug?.includes("bridal")
            ? "makeup"
            : catSlug?.includes("online")
              ? "online"
              : catSlug?.includes("tutorial")
                ? "tutorials"
                : catSlug?.includes("lash") || catSlug?.includes("brow")
                  ? "lashes"
                  : "makeup";
      return {
        id: r.id,
        bookingServiceId: r.id,
        title: r.name,
        description: r.description ?? "Curated sanctuary experience.",
        durationMins: r.duration_minutes || 60,
        priceFromGhs: Number(r.price_ghs) || 0,
        category: normalizedCategory,
        image: r.image_url ?? getDefaultServiceImage({ category: catName ?? catSlug, name: r.name }),
        imageAlt: r.name,
      };
    });

  return <ServicesPageView services={[...merged, ...extraDbServices]} />;
}
