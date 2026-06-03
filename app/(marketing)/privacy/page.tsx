import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "How Dusab MakeOver handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-headline text-3xl text-brand-heading">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This is a placeholder page. A full privacy policy will describe what data we collect,
        how we use it, and your rights under applicable law (including Ghana&apos;s Data
        Protection Act).
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        For questions, please{" "}
        <Link href="/contact" className="text-brand-primary underline">
          contact us
        </Link>
        .
      </p>
    </div>
  );
}
