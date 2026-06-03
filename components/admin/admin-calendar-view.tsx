"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useAdminSearch } from "@/components/admin/admin-search-context";
import { MaterialIcon } from "@/components/home/material-icon";
import { demoDayAppointments, demoStylists } from "@/lib/constants/admin-demo";
import { cn } from "@/lib/utils";

function formatDay(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function AdminCalendarView() {
  const { searchQuery } = useAdminSearch();
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [cursor, setCursor] = useState(() => new Date(2023, 9, 24));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return demoDayAppointments;
    return demoDayAppointments.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.client.toLowerCase().includes(q) ||
        (a.stylist && a.stylist.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  function shiftDay(delta: number) {
    setCursor((d) => {
      const n = new Date(d);
      n.setDate(n.getDate() + delta);
      return n;
    });
  }

  return (
    <>
      <main className="min-h-screen bg-stitch-surface p-6 pb-28 md:p-12 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
            <div>
              <span className="signature-label text-xs font-bold text-stitch-secondary">Daily Calendar</span>
              <h3 className="mt-2 font-display text-4xl text-stitch-on-surface">Ritual Schedule</h3>
              <p className="mt-2 text-stitch-on-surface-variant">
                Managing curated experiences for {formatDay(cursor)}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-stitch-surface-container-low p-1.5">
              {(["day", "week", "month"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm font-medium transition-all capitalize",
                    view === v
                      ? "bg-white font-bold text-stitch-primary shadow-sm dark:bg-stone-900"
                      : "text-stitch-on-surface-variant hover:bg-white/50 dark:hover:bg-stone-800/50"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-3">
              <div className="rounded-xl bg-stitch-surface-container-low p-8">
                <h4 className="mb-6 font-display text-lg">Artisans Today</h4>
                <div className="space-y-6">
                  {demoStylists.map((s) => (
                    <div key={s.id} className="flex items-center gap-4">
                      <Image
                        src={s.avatarSrc}
                        alt={s.avatarAlt}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-xs text-stitch-secondary">{s.role}</p>
                      </div>
                      <div
                        className={cn(
                          "ml-auto h-2 w-2 rounded-full",
                          s.status === "available" ? "bg-green-500" : "bg-rose-400"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-stitch-primary p-8 text-stitch-on-primary">
                <div className="relative z-10">
                  <p className="signature-label text-[10px] opacity-80">Capacity</p>
                  <h4 className="mt-2 font-display text-3xl">84% Full</h4>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">
                    The sanctuary is thriving today. 4 walk-in slots remaining for the evening glow.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10 transition-transform duration-700 group-hover:scale-110">
                  <MaterialIcon name="auto_awesome" className="text-9xl text-stitch-on-primary" size="xl" />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-stitch-surface-container-low shadow-sm lg:col-span-9">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stitch-outline-variant/10 bg-white p-6 dark:bg-stone-900">
                <div className="flex items-center gap-4 md:gap-6">
                  <button
                    type="button"
                    onClick={() => shiftDay(-1)}
                    className="rounded-full p-2 transition-colors hover:bg-stitch-surface-container-low"
                    aria-label="Previous day"
                  >
                    <MaterialIcon name="chevron_left" size="sm" />
                  </button>
                  <span className="font-display text-xl text-stitch-on-surface">{formatDay(cursor)}</span>
                  <button
                    type="button"
                    onClick={() => shiftDay(1)}
                    className="rounded-full p-2 transition-colors hover:bg-stitch-surface-container-low"
                    aria-label="Next day"
                  >
                    <MaterialIcon name="chevron_right" size="sm" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="signature-label text-xs font-bold text-stone-400">Timeline</span>
                  <div className="h-4 w-px bg-stitch-outline-variant/30" />
                  <button type="button" aria-label="Filter">
                    <MaterialIcon
                      name="filter_list"
                      size="sm"
                      className="text-stone-400 transition-colors hover:text-stitch-primary"
                    />
                  </button>
                </div>
              </div>
              <div className="admin-scrollbar h-[560px] overflow-y-auto p-6 md:h-[700px] md:p-8">
                <div className="relative grid grid-cols-1 gap-x-8 md:grid-cols-[100px_1fr]">
                  <div className="mb-6 hidden space-y-[120px] border-r border-stitch-outline-variant/10 pr-4 pt-4 text-right md:block">
                    {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"].map(
                      (t) => (
                        <div key={t} className="text-xs font-bold text-stone-400">
                          {t}
                        </div>
                      )
                    )}
                  </div>
                  <div className="relative min-h-[400px]">
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-5">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="h-px w-full bg-stitch-on-background" />
                      ))}
                    </div>
                    <div className="relative z-10 space-y-6">
                      {filtered.map((a) => {
                        if (a.variant === "confirmed" && a.stylistAvatar) {
                          return (
                            <div
                              key={a.id}
                              className={cn(
                                "group flex w-full flex-col justify-between rounded-xl border-l-4 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-stone-900",
                                a.id === "a4" ? "border-stitch-secondary" : "border-stitch-primary"
                              )}
                            >
                              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                <div>
                                  <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <span
                                      className={cn(
                                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                        a.id === "a4"
                                          ? "bg-stitch-secondary-fixed text-stitch-on-secondary-fixed-variant"
                                          : "bg-stitch-primary-fixed text-stitch-on-primary-fixed-variant"
                                      )}
                                    >
                                      Confirmed
                                    </span>
                                    <span className="text-xs text-stone-400">{a.timeLabel}</span>
                                  </div>
                                  <h5 className="font-display text-xl text-stitch-on-surface">{a.title}</h5>
                                  <p className="text-sm font-medium text-stitch-on-surface-variant">
                                    Client: {a.client}
                                  </p>
                                </div>
                                <div className="flex shrink-0 justify-end sm:-space-x-2">
                                  <Image
                                    src={a.stylistAvatar}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-stone-900"
                                  />
                                </div>
                              </div>
                              <div className="mt-4 flex flex-col justify-between gap-2 border-t border-stitch-outline-variant/5 pt-4 sm:flex-row sm:items-center">
                                <span className="text-xs font-bold italic text-stitch-secondary">
                                  Stylist: {a.stylist}
                                </span>
                                <div className="flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                                  <button
                                    type="button"
                                    className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stitch-surface-container-low hover:text-stitch-primary"
                                    aria-label="Edit"
                                  >
                                    <MaterialIcon name="edit" className="!text-lg" size="sm" />
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stitch-surface-container-low hover:text-destructive"
                                    aria-label="Cancel"
                                  >
                                    <MaterialIcon name="cancel" className="!text-lg" size="sm" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        if (a.variant === "pending") {
                          return (
                            <div
                              key={a.id}
                              className="group flex min-h-[110px] w-full flex-col justify-center rounded-xl border-l-4 border-rose-300 bg-stitch-surface-container-lowest/50 p-6 dark:bg-stone-900/50"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                    <MaterialIcon name="pending_actions" size="sm" className="text-rose-700" />
                                  </div>
                                  <div>
                                    <h5 className="font-display text-lg text-stitch-on-surface">{a.title}</h5>
                                    <p className="text-xs text-stitch-on-surface-variant">
                                      Pending Confirmation â€¢ {a.timeLabel}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                                  <p className="text-sm font-bold">Client: {a.client}</p>
                                  <button
                                    type="button"
                                    className="rounded-full bg-stitch-primary px-4 py-1.5 text-xs font-bold text-stitch-on-primary hover:opacity-90"
                                  >
                                    Confirm Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={a.id}
                            className="relative flex min-h-[150px] w-full flex-col justify-between rounded-xl border-l-4 border-stone-300 bg-stone-100/30 p-6 opacity-70 dark:bg-stone-800/30"
                          >
                            <div className="flex justify-between gap-4">
                              <div>
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                                    Completed
                                  </span>
                                  <span className="text-xs text-stone-400">{a.timeLabel}</span>
                                </div>
                                <h5 className="font-display text-xl text-stitch-on-surface">{a.title}</h5>
                                <p className="text-sm font-medium text-stitch-on-surface-variant">
                                  Client: {a.client}
                                </p>
                              </div>
                              <MaterialIcon name="check_circle" filled size="sm" className="shrink-0 text-green-600" />
                            </div>
                            <div className="text-xs italic text-stone-500">Stylist: {a.stylist}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center gap-6 rounded-xl border border-stitch-outline-variant/15 bg-stitch-surface p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stitch-tertiary-fixed">
                <MaterialIcon name="event_available" size="sm" className="text-stitch-on-tertiary-fixed" />
              </div>
              <div>
                <p className="signature-label text-xs font-bold text-stone-400">Booked Today</p>
                <p className="font-display text-2xl text-stitch-on-surface">24 Rituals</p>
              </div>
            </div>
            <div className="flex items-center gap-6 rounded-xl border border-stitch-outline-variant/15 bg-stitch-surface p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stitch-primary-fixed">
                <MaterialIcon name="person_add" size="sm" className="text-stitch-on-primary-fixed" />
              </div>
              <div>
                <p className="signature-label text-xs font-bold text-stone-400">New Clients</p>
                <p className="font-display text-2xl text-stitch-on-surface">6 New Souls</p>
              </div>
            </div>
            <div className="flex items-center gap-6 rounded-xl border border-stitch-outline-variant/15 bg-stitch-surface p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stitch-secondary-fixed">
                <MaterialIcon name="payments" size="sm" className="text-stitch-on-secondary-fixed" />
              </div>
              <div>
                <p className="signature-label text-xs font-bold text-stone-400">Est. Revenue</p>
                <p className="font-display text-2xl text-stitch-on-surface">GHS 3,420</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="rounded-full bg-stitch-primary px-8 py-3 font-bold text-stitch-on-primary shadow-lg md:hidden"
            >
              New appointment
            </button>
          </div>
        </div>
      </main>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/30 transition-opacity",
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-[450px] border-l border-stitch-outline-variant/10 bg-white shadow-2xl transition-transform duration-500 ease-in-out dark:bg-stone-950",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-8 md:p-12">
          <div className="mb-10 flex items-center justify-between">
            <h4 className="font-display text-3xl text-stitch-on-surface">New Ritual</h4>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-stitch-surface-container-low"
              aria-label="Close"
            >
              <MaterialIcon name="close" size="sm" />
            </button>
          </div>
          <form className="flex flex-1 flex-col space-y-8">
            <div>
              <label className="signature-label mb-2 block text-xs font-bold text-stone-400">
                Client Identity
              </label>
              <input
                placeholder="Search or add name..."
                className="w-full border-0 border-b-2 border-stitch-outline-variant/30 bg-transparent py-3 font-body text-lg text-stitch-on-surface outline-none transition-all placeholder:text-stone-300 focus:border-stitch-primary focus:ring-0"
              />
            </div>
            <div>
              <label className="signature-label mb-2 block text-xs font-bold text-stone-400">
                Sanctuary Service
              </label>
              <select className="w-full appearance-none border-0 border-b-2 border-stitch-outline-variant/30 bg-transparent py-3 font-body text-lg text-stitch-on-surface outline-none focus:border-stitch-primary focus:ring-0">
                <option>Curated Hair Ritual</option>
                <option>Signature Mani/Pedi</option>
                <option>Dermal Rejuvenation</option>
                <option>Aromatherapy Session</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="signature-label mb-2 block text-xs font-bold text-stone-400">Date</label>
                <input
                  type="date"
                  className="w-full border-0 border-b-2 border-stitch-outline-variant/30 bg-transparent py-3 font-body text-stitch-on-surface outline-none focus:border-stitch-primary focus:ring-0"
                />
              </div>
              <div>
                <label className="signature-label mb-2 block text-xs font-bold text-stone-400">Time</label>
                <input
                  type="time"
                  className="w-full border-0 border-b-2 border-stitch-outline-variant/30 bg-transparent py-3 font-body text-stitch-on-surface outline-none focus:border-stitch-primary focus:ring-0"
                />
              </div>
            </div>
            <div>
              <label className="signature-label mb-2 block text-xs font-bold text-stone-400">
                Assigned Artisan
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                {demoStylists.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className={cn(
                      "h-12 w-12 overflow-hidden rounded-full",
                      i === 0 ? "ring-2 ring-stitch-primary ring-offset-2" : "opacity-40 hover:opacity-100"
                    )}
                  >
                    <Image src={s.avatarSrc} alt="" width={48} height={48} className="h-full w-full object-cover" />
                  </button>
                ))}
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-stitch-outline-variant text-stone-400 transition-all hover:border-stitch-primary hover:text-stitch-primary"
                >
                  <MaterialIcon name="add" size="sm" />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-auto pt-8">
            <button
              type="button"
              className="w-full rounded-full bg-stitch-primary py-5 text-lg font-bold text-stitch-on-primary shadow-lg transition-all hover:opacity-95 active:scale-[0.98]"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-30 hidden h-14 items-center gap-2 rounded-full bg-stitch-primary px-6 font-bold text-stitch-on-primary shadow-xl transition-all hover:opacity-95 md:flex"
      >
        <MaterialIcon name="add" size="sm" className="text-stitch-on-primary" />
        New ritual
      </button>
    </>
  );
}
