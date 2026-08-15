import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "How Dusab Beauty Palour handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-16 sm:px-6">
      <div>
        <h1 className="font-headline text-3xl text-brand-heading">Privacy Policy</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: 14 August 2026</p>
      </div>

      <p className="text-sm text-muted-foreground">
        {SITE_NAME} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
        personal data we collect through this website, how we use it, and the rights you have over
        it under Ghana&apos;s Data Protection Act, 2012 (Act 843).
      </p>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Information we collect</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Account details: full name, email address, and phone number when you register.</li>
          <li>Booking details: services selected, preferred staff member, date and time.</li>
          <li>
            Payment verification details: the mobile money method, a reference/transaction ID you
            provide, and a screenshot of your payment confirmation, which you upload for a staff
            member to verify manually. We do not process card payments and never see your mobile
            money PIN or full account credentials.
          </li>
          <li>Messages you send us through the contact form (name, email, phone, message).</li>
          <li>Basic technical data such as browser type, needed to operate the site securely.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">How we use your information</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>To create and manage your account and bookings.</li>
          <li>To verify mobile money payments for services booked.</li>
          <li>To contact you about your bookings, including via WhatsApp, using the phone number you provide.</li>
          <li>To respond to messages sent through the contact form.</li>
          <li>To improve our services and keep the site secure.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">How we store and protect your data</h2>
        <p className="text-sm text-muted-foreground">
          Your data is stored with Supabase, our database and authentication provider, using
          access controls that restrict your personal information and booking history to you and
          authorized staff/admin accounts only. Payment screenshots are stored in a private file
          store that is not publicly accessible.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Sharing your information</h2>
        <p className="text-sm text-muted-foreground">
          We do not sell your personal data. We only share information with our staff for the
          purpose of fulfilling your booking and payment verification, and with service providers
          (such as our hosting and database provider) strictly to operate the site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Your rights</h2>
        <p className="text-sm text-muted-foreground">
          You may request access to, correction of, or deletion of your personal data at any time
          by contacting us using the details below, or by updating your details directly from your
          account settings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Contact us</h2>
        <p className="text-sm text-muted-foreground">
          If you have questions about this policy or how your data is handled, please{" "}
          <Link href="/contact" className="text-brand-primary underline">
            contact us
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
