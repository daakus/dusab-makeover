import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Dusab Beauty Palour in Kumasi.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl space-y-8 px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-brand-heading">
        Contact
      </h1>
      <p className="text-muted-foreground">
        Have a question or a special request? Send us a message and we&apos;ll get back to you.
      </p>
      <ContactForm />
    </div>
  );
}
