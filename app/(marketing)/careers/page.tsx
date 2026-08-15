import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Careers | ${SITE_NAME}`,
  description: "Join the Dusab Beauty Palour team in Kumasi.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-headline text-3xl text-brand-heading">Careers</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        We&apos;re building our hiring page. Stylists, aestheticians, and front-desk talent who
        share our editorial vision are always welcome to reach out.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        Send interest via{" "}
        <Link href="/contact" className="text-brand-primary underline">
          Contact
        </Link>{" "}
        with your portfolio or CV.
      </p>
    </div>
  );
}
