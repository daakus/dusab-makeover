import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Dusab MakeOver in Kumasi.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl space-y-8 px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-brand-heading">
        Contact
      </h1>
      <p className="text-muted-foreground">
        This form will post to the contact_messages table via a server action
        next.
      </p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required rows={5} />
        </div>
        <Button type="button" className="rounded-xl" disabled>
          Send (wire next)
        </Button>
      </form>
    </div>
  );
}
