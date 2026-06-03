import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: "Terms for using Dusab MakeOver services and this website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-headline text-3xl text-brand-heading">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This is a placeholder. Final terms will cover bookings, cancellations, payments, mobile
        money verification, and use of the salon&apos;s digital services.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        See also our{" "}
        <Link href="/privacy" className="text-brand-primary underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
