import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";
import { SITE_NAME } from "@/lib/constants/site";

export function BookingFlowFooter() {
  return (
    <footer className="mt-20 w-full bg-stitch-surface-container-low px-8 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="mb-4 block font-headline text-2xl italic text-rose-900">
            {SITE_NAME}
          </span>
          <p className="max-w-sm font-body text-sm leading-relaxed text-rose-900/70">
            Crafting editorial excellence in beauty since 2018. Your sanctuary for modern
            ritual and heritage care.
          </p>
        </div>
        <div className="space-y-4">
          <span className="font-label text-xs font-bold uppercase tracking-widest text-stitch-primary">
            The Sanctuary
          </span>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="font-body text-sm opacity-70 transition-all hover:text-rose-700 hover:opacity-100"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-body text-sm opacity-70 transition-all hover:text-rose-700 hover:opacity-100"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="font-label text-xs font-bold uppercase tracking-widest text-stitch-primary">
            Connect
          </span>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                className="font-body text-sm opacity-70 transition-all hover:text-rose-700 hover:opacity-100"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="font-body text-sm opacity-70 transition-all hover:text-rose-700 hover:opacity-100"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-stitch-outline-variant/20 pt-12 md:col-span-4">
          <p className="font-body text-sm opacity-70">
            Â© {new Date().getFullYear()} {SITE_NAME}. The Digital Sanctuary.
          </p>
          <div className="flex gap-6 text-stitch-outline">
            <MaterialIcon name="share" className="cursor-pointer hover:text-stitch-primary" />
            <MaterialIcon name="language" className="cursor-pointer hover:text-stitch-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
