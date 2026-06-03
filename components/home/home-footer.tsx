import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";
import { SITE_NAME } from "@/lib/constants/site";

export function HomeFooter() {
  return (
    <footer className="mx-auto mt-20 grid w-full max-w-7xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-4">
      <div>
        <span className="mb-4 block font-headline text-2xl italic text-rose-900">
          Dusab MakeOver.
        </span>
        <p className="mb-6 font-body text-sm leading-relaxed text-stitch-on-surface-variant">
          Professional makeup, hairstyling & frontal installations. Kumasi, Ghana.
        </p>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stitch-outline-variant transition-colors hover:bg-stitch-primary hover:text-white"
            aria-label="Website"
          >
            <MaterialIcon name="public" className="!text-sm" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stitch-outline-variant transition-colors hover:bg-stitch-primary hover:text-white"
            aria-label="Social"
          >
            <MaterialIcon name="share" className="!text-sm" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest">
          Navigation
        </h4>
        <ul className="space-y-4 font-body text-sm">
          <li>
            <Link
              href="/services"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Booking Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Join Our Team
            </Link>
          </li>
          <li>
            <Link
              href="/customer"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Member Login
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest">
          Legal
        </h4>
        <ul className="space-y-4 font-body text-sm">
          <li>
            <Link
              href="/privacy"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
            >
              Careers
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest">
          Studio
        </h4>
        <p className="mb-4 font-body text-sm leading-relaxed text-stitch-on-surface-variant">
          Kumasi, Ghana
          <br />
          0546006627
        </p>
        <p className="font-body text-sm leading-relaxed text-stitch-on-surface-variant">
          Mon - Sat: 9am - 8pm
          <br />
          Sun: 12pm - 6pm
        </p>
      </div>
      <div className="border-t border-stitch-outline-variant/10 pt-12 text-center text-xs opacity-50 md:col-span-4">
        Â© {new Date().getFullYear()} {SITE_NAME}. The Digital Sanctuary.
      </div>
    </footer>
  );
}
