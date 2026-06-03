"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants/site";
import { MaterialIcon } from "@/components/home/material-icon";

const links = [
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/customer", label: "Dashboard" },
] as const;

export interface HomeTopNavProps {
  className?: string;
}

export function HomeTopNav({ className }: HomeTopNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 mx-auto flex w-full max-w-full items-center justify-between gap-4 bg-stitch-surface/80 px-6 py-4 shadow-sm backdrop-blur-md md:px-8",
          className
        )}
      >
        <Link
          href="/"
          className="font-headline text-2xl italic text-rose-900 transition-opacity hover:opacity-90"
        >
          {SITE_NAME}
        </Link>

        <div className="hidden flex-1 justify-center gap-10 font-headline font-medium tracking-tight md:flex">
          {links.map((item) => {
            const active =
              item.href === "/services"
                ? pathname === "/" || pathname.startsWith("/services")
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors duration-300",
                  active
                    ? "border-b-2 border-rose-800 font-bold text-rose-800"
                    : "text-rose-700/70 hover:text-rose-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full border border-stitch-outline-variant px-4 py-2 text-sm font-semibold text-stitch-on-surface transition-colors hover:bg-stitch-surface-container-low md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="hidden rounded-full border border-stitch-outline-variant px-4 py-2 text-sm font-semibold text-stitch-on-surface transition-colors hover:bg-stitch-surface-container-low md:inline-flex"
          >
            Sign up
          </Link>
          <Link
            href="/booking"
            className="hidden rounded-full bg-stitch-primary px-6 py-2 font-semibold text-stitch-on-primary transition-opacity hover:opacity-90 md:inline-flex md:px-8 md:py-3"
          >
            Book Now
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-rose-900 md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MaterialIcon name={mobileOpen ? "close" : "menu"} className="text-2xl" />
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 right-0 top-[4.25rem] z-50 border-b border-stitch-outline-variant/20 bg-stitch-surface px-6 py-6 shadow-lg md:hidden">
            <ul className="flex flex-col gap-4 font-headline font-medium tracking-tight">
              {links.map((item) => {
                const active =
                  item.href === "/services"
                    ? pathname === "/" || pathname.startsWith("/services")
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 transition-colors",
                        active ? "font-bold text-rose-800" : "text-rose-800/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/login"
                  className="block py-2 text-rose-800/80"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="block py-2 text-rose-800/80"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="mt-2 block rounded-full bg-stitch-primary py-3 text-center font-semibold text-stitch-on-primary"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
}
