import type { Metadata } from "next";
import { HomePageView } from "@/components/home/home-page";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "The Digital Sanctuary",
  description: `Luxury beauty appointments in Ghana. ${SITE_NAME} — bespoke hair, nails, makeup, and wellness.`,
  openGraph: {
    title: `${SITE_NAME} | The Digital Sanctuary`,
    description:
      "Ghana's premium destination for bespoke aesthetics. Book online with MoMo.",
  },
};

export default function HomePage() {
  return <HomePageView />;
}
