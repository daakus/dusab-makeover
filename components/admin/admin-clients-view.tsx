"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useAdminSearch } from "@/components/admin/admin-search-context";
import { MaterialIcon } from "@/components/home/material-icon";
import { demoClients } from "@/lib/constants/admin-demo";
import { cn } from "@/lib/utils";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(n);
}

function tierClass(style: (typeof demoClients)[0]["tierStyle"]) {
  switch (style) {
    case "vip":
      return "signature-label text-xs font-bold text-stitch-secondary";
    case "new":
      return "signature-label text-xs font-bold text-stitch-primary";
    default:
      return "signature-label text-xs text-stone-400";
  }
}

export function AdminClientsView() {
  const { searchQuery } = useAdminSearch();
  const [page, setPage] = useState(1);
  const totalEntries = 1284;

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return demoClients;
    return demoClients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        c.lastService.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      <main className="max-w-[1600px] bg-stitch-surface p-6 pb-28 text-stitch-on-surface md:p-12 dark:bg-stone-950">
        <section className="mb-12 flex flex-col items-end justify-between gap-8 md:mb-16 md:flex-row">
          <div className="max-w-2xl">
            <span className="signature-label mb-2 block text-xs font-bold text-stitch-secondary">
              Curation
            </span>
            <h1 className="font-display text-5xl leading-tight tracking-tight text-stitch-on-background md:text-6xl">
              Client <br />
              Directory
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-stitch-on-surface-variant">
              Managing the individuals who define our sanctuary. From consistent visitors to our
              newest arrivals, every profile is a story of radiance.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-stitch-outline-variant px-8 py-3 font-medium text-stitch-on-surface transition-colors hover:bg-stitch-surface-container-low"
            >
              <MaterialIcon name="filter_list" size="sm" />
              Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-stitch-outline-variant px-8 py-3 font-medium text-stitch-on-surface transition-colors hover:bg-stitch-surface-container-low"
            >
              <MaterialIcon name="download" size="sm" />
              Export CSV
            </button>
          </div>
        </section>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="flex min-h-[180px] flex-col justify-between rounded-xl bg-stitch-primary-container p-8 md:col-span-4">
            <span className="signature-label text-xs text-stitch-on-primary-container">
              Total Registered
            </span>
            <div>
              <h3 className="font-display text-5xl text-stitch-on-primary-container">1,284</h3>
              <p className="mt-2 flex items-center gap-1 text-sm text-stitch-on-primary-container/80">
                <MaterialIcon name="trending_up" className="!text-sm" size="sm" />
                12% increase this month
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 rounded-xl bg-stitch-surface-container-low p-8 md:col-span-8 md:flex-row md:gap-12">
            <div className="flex-1">
              <span className="signature-label text-xs text-stitch-on-surface-variant">
                Active Sanctuary Members
              </span>
              <h3 className="mt-2 font-display text-4xl text-stitch-on-surface">856</h3>
              <p className="mt-2 text-sm leading-relaxed text-stitch-on-surface-variant">
                Highly engaged clients with visits in the last 30 days. Prioritize VIP outreach for
                these individuals.
              </p>
            </div>
            <div className="hidden h-full w-px bg-stitch-outline-variant/30 md:block" />
            <div className="flex -space-x-4">
              {demoClients.slice(0, 3).map((c) => (
                <Image
                  key={c.id}
                  src={c.avatarSrc}
                  alt={c.avatarAlt}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border-4 border-stitch-surface object-cover shadow-sm dark:border-stone-900"
                />
              ))}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stitch-surface bg-stitch-tertiary-fixed text-sm font-bold text-stitch-on-tertiary-fixed shadow-sm dark:border-stone-900">
                +42
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="mb-4 flex flex-wrap items-center gap-4 rounded-xl bg-stitch-surface-container-low/50 px-4 py-4 md:px-8">
            <span className="signature-label w-full text-[10px] text-stone-500 md:w-1/4">Client Identity</span>
            <span className="signature-label hidden w-1/6 text-[10px] text-stone-500 md:inline">Contact Info</span>
            <span className="signature-label hidden w-1/6 text-[10px] text-stone-500 md:inline">
              Last Sanctuary Visit
            </span>
            <span className="signature-label hidden w-1/6 text-right text-[10px] text-stone-500 md:inline">
              Lifetime Spend
            </span>
            <span className="signature-label hidden w-1/6 text-right text-[10px] text-stone-500 md:inline">
              Action
            </span>
          </div>

          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-4 rounded-xl bg-stitch-surface-container-lowest px-4 py-6 transition-all hover:shadow-sm dark:bg-white/95 md:flex-row md:items-center md:justify-between md:px-8 md:py-8"
            >
              <div className="flex w-full items-center gap-4 md:w-1/4">
                <div className="relative shrink-0">
                  <Image
                    src={c.avatarSrc}
                    alt={c.avatarAlt}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {c.online ? (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-stone-900" />
                  ) : null}
                </div>
                <div>
                  <h4 className="font-display text-lg text-stitch-on-background">{c.name}</h4>
                  <span className={tierClass(c.tierStyle)}>{c.tier}</span>
                </div>
              </div>
              <div className="w-full font-body text-sm text-stitch-on-surface-variant md:w-1/6">{c.phone}</div>
              <div className="w-full font-body text-sm text-stitch-on-surface md:w-1/6">
                {c.lastVisit}
                <p className="mt-1 text-[10px] uppercase tracking-tighter text-stone-400">
                  {c.lastService}
                </p>
              </div>
              <div className="w-full text-left font-display text-lg text-stitch-on-background md:w-1/6 md:text-right">
                {formatMoney(c.lifetimeSpend)}
              </div>
              <div className="w-full text-left md:w-1/6 md:text-right">
                <button
                  type="button"
                  className="border-b border-stitch-secondary/30 text-sm font-bold text-stitch-secondary transition-all hover:border-stitch-secondary"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-stretch justify-between gap-6 border-t border-stitch-outline-variant/30 pt-8 sm:flex-row sm:items-center">
          <span className="font-body text-sm text-stitch-on-surface-variant">
            Showing {filtered.length} of {totalEntries.toLocaleString()} entries
          </span>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={page <= 1}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stitch-outline-variant text-stone-400 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <MaterialIcon name="chevron_left" size="sm" />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full font-medium",
                    n === page
                      ? "bg-stitch-primary font-bold text-stitch-on-primary"
                      : "hover:bg-stitch-surface-container-low"
                  )}
                >
                  {n}
                </button>
              ))}
              <span className="flex items-end px-2 pb-3 text-stone-400">...</span>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-stitch-surface-container-low"
              >
                12
              </button>
            </div>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stitch-outline-variant transition-colors hover:bg-stitch-surface-container-low"
              aria-label="Next page"
            >
              <MaterialIcon name="chevron_right" size="sm" />
            </button>
          </div>
        </div>
      </main>

      <button
        type="button"
        className="group fixed bottom-8 right-6 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-stitch-primary text-stitch-on-primary shadow-2xl transition-all hover:scale-105 active:scale-95 md:bottom-12 md:right-12"
        aria-label="New client"
      >
        <MaterialIcon name="person_add" className="text-3xl text-stitch-on-primary" size="lg" />
        <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-stone-900 px-4 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          New Client
        </span>
      </button>
    </>
  );
}
