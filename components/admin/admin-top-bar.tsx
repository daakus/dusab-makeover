"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/home/material-icon";
import { useAdminSearch } from "@/components/admin/admin-search-context";

function searchPlaceholder(pathname: string) {
  if (pathname.startsWith("/admin/services")) return "Search services or categories...";
  if (pathname.startsWith("/admin/customers")) return "Search clients...";
  if (pathname.startsWith("/admin/calendar")) return "Search rituals...";
  return "Search appointments...";
}

export function AdminTopBar(props: {
  displayName: string;
  subtitle?: string;
  avatarUrl?: string | null;
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();
  const { displayName, subtitle = "Head Curator", avatarUrl, onMenuClick } = props;
  const { searchQuery, setSearchQuery } = useAdminSearch();
  const placeholder = searchPlaceholder(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-stitch-outline-variant/20 bg-white/80 px-3 shadow-sm shadow-stitch-primary/5 backdrop-blur-md sm:gap-3 sm:px-4 md:h-20 md:gap-4 md:px-12 dark:bg-stone-950/80">
      <button
        type="button"
        onClick={onMenuClick}
        className="shrink-0 rounded-lg p-2 text-stone-600 hover:bg-stone-100 md:hidden dark:text-stone-300 dark:hover:bg-stone-800"
        aria-label="Open menu"
      >
        <MaterialIcon name="menu" size="sm" />
      </button>
      <div className="hidden shrink-0 text-xl font-display text-stone-900 dark:text-stone-100 md:block">
        Beauty Bar Admin
      </div>
      <div className="min-w-0 flex-1 md:mx-8 md:max-w-md md:flex-none">
        <div className="relative flex items-center">
          <MaterialIcon
            name="search"
            size="sm"
            className="pointer-events-none absolute left-3 text-stone-400 sm:left-4"
          />
          <input
            type="search"
            aria-label="Search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-w-0 rounded-full border-none bg-stitch-surface-container-low py-2.5 pl-9 pr-3 font-body text-sm text-stitch-on-surface transition-all placeholder:truncate placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-rose-200 sm:pl-12 sm:pr-4 dark:bg-stone-900"
          />
        </div>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
        <button
          type="button"
          className="text-stone-400 transition-colors hover:text-stitch-primary dark:hover:text-rose-300"
          aria-label="Notifications"
        >
          <MaterialIcon name="notifications" size="sm" />
        </button>
        <div className="hidden items-center gap-3 border-l border-stone-200 pl-4 dark:border-stone-700 sm:flex">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stitch-surface-container font-display text-sm font-bold text-stitch-primary">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="hidden text-right lg:block">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{displayName}</p>
            <p className="signature-label text-[10px] text-stone-400">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
