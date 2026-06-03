import Link from "next/link";
import { SITE_NAME } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export interface BookingFlowChromeProps {
  variant?: "booking" | "payment";
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
}

export function BookingFlowChrome({
  variant = "booking",
  primaryHref = "/",
  primaryLabel = "Exit Flow",
  className,
}: BookingFlowChromeProps) {
  return (
    <header
      className={cn(
        "fixed top-0 z-50 mx-auto flex w-full max-w-full items-center justify-between bg-stitch-surface/80 px-6 py-4 shadow-sm backdrop-blur-md md:px-8",
        className
      )}
    >
      <Link
        href="/"
        className="font-headline text-2xl italic text-orange-900 transition-opacity hover:opacity-90"
      >
        {SITE_NAME}
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        <Link
          href="/services"
          className="font-headline font-medium tracking-tight text-orange-700/70 transition-colors hover:text-orange-900"
        >
          Services
        </Link>
        <Link
          href="/booking"
          className={cn(
            "font-headline font-medium tracking-tight transition-colors",
            variant === "booking" || variant === "payment"
              ? "border-b-2 border-orange-800 font-bold text-orange-800"
              : "text-orange-700/70 hover:text-orange-900"
          )}
        >
          Booking
        </Link>
        <Link
          href="/customer"
          className="font-headline font-medium tracking-tight text-orange-700/70 transition-colors hover:text-orange-900"
        >
          Dashboard
        </Link>
      </nav>
      <Link
        href={primaryHref}
        className="rounded-full bg-stitch-primary px-6 py-3 font-label text-sm uppercase tracking-widest text-stitch-on-primary transition-opacity hover:opacity-90 md:px-8"
      >
        {primaryLabel}
      </Link>
    </header>
  );
}
