import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { SITE_NAME } from "@/lib/constants/site";

function TikTokIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden="true">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com/@dusab_beauty", icon: TikTokIcon },
  { label: "Instagram", href: "https://instagram.com/dusab_beauty", icon: Instagram },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/bridal", label: "Bridal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book Now" },
  { href: "/payment-instructions", label: "Payments" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/careers", label: "Careers" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 w-full border-t border-stitch-outline-variant/10 bg-stitch-surface-container-low">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="mb-4 flex items-center gap-2 font-headline text-2xl italic text-rose-900">
            <Image
              src="/images/logo/dusab-icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            {SITE_NAME}
          </Link>
          <p className="mb-6 font-body text-sm leading-relaxed text-stitch-on-surface-variant">
            Professional bridal makeup, hairstyling &amp; wig installations. Kumasi, Ghana.
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stitch-outline-variant text-stitch-on-surface-variant transition-colors hover:bg-stitch-primary hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-label text-xs font-bold uppercase tracking-widest text-stitch-primary">
            Quick Links
          </h4>
          <ul className="space-y-3 font-body text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-label text-xs font-bold uppercase tracking-widest text-stitch-primary">
            Legal
          </h4>
          <ul className="space-y-3 font-body text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="opacity-70 transition-all duration-300 hover:text-rose-700 hover:opacity-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-label text-xs font-bold uppercase tracking-widest text-stitch-primary">
            Studio
          </h4>
          <p className="mb-4 font-body text-sm leading-relaxed text-stitch-on-surface-variant">
            Kumasi, Ghana
            <br />
            0546006627
          </p>
          <p className="font-body text-sm leading-relaxed text-stitch-on-surface-variant">
            Mon – Sat: 9am – 8pm
            <br />
            Sun: 12pm – 6pm
          </p>
        </div>
      </div>
      <div className="border-t border-stitch-outline-variant/10 px-6 py-6 text-center text-xs opacity-50 sm:px-8">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
