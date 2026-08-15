import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: "Terms for using Dusab Beauty Palour services and this website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-16 sm:px-6">
      <div>
        <h1 className="font-headline text-3xl text-brand-heading">Terms of Service</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: 14 August 2026</p>
      </div>

      <p className="text-sm text-muted-foreground">
        These terms govern your use of the {SITE_NAME} website and booking platform. By creating an
        account or making a booking, you agree to the terms below.
      </p>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Bookings</h2>
        <p className="text-sm text-muted-foreground">
          Bookings made through this site request an appointment for the service, staff member,
          date, and time you select. A booking is only confirmed once your payment has been
          verified by our team; you will be notified of confirmation, rejection, or any change via
          WhatsApp or the contact details on your account.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Payments &amp; verification</h2>
        <p className="text-sm text-muted-foreground">
          We accept payment by MTN Mobile Money, Vodafone Cash, and AirtelTigo Money. You are
          responsible for sending payment to the correct number and for uploading a clear,
          accurate screenshot of your payment confirmation. Bookings are verified manually by our
          staff; providing false or altered payment proof may result in your booking being
          rejected and your account being suspended.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Cancellations &amp; changes</h2>
        <p className="text-sm text-muted-foreground">
          If you need to cancel or reschedule a booking, please contact us directly with your
          booking details as early as possible. Refunds for verified payments on cancelled
          bookings are handled on a case-by-case basis at our discretion.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Your account</h2>
        <p className="text-sm text-muted-foreground">
          You are responsible for keeping your login credentials confidential and for the accuracy
          of the information you provide, including your name and phone number, which we use to
          contact you about your bookings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Changes to these terms</h2>
        <p className="text-sm text-muted-foreground">
          We may update these terms from time to time to reflect changes to our services. The
          &quot;Last updated&quot; date above will always reflect the most recent revision.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-headline text-xl text-brand-heading">Governing law</h2>
        <p className="text-sm text-muted-foreground">
          These terms are governed by the laws of Ghana.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        See also our{" "}
        <Link href="/privacy" className="text-brand-primary underline">
          Privacy Policy
        </Link>
        , or{" "}
        <Link href="/contact" className="text-brand-primary underline">
          contact us
        </Link>{" "}
        with any questions.
      </p>
    </div>
  );
}
