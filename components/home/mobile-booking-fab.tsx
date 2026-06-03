import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";

export function MobileBookingFab() {
  return (
    <Link
      href="/booking"
      className="glow-gradient fixed bottom-28 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full text-stitch-on-primary shadow-editorial transition-transform active:scale-95 md:hidden"
      aria-label="Book an appointment"
    >
      <MaterialIcon name="calendar_add_on" filled className="!text-3xl" />
    </Link>
  );
}
