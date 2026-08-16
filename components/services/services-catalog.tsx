"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/home/material-icon";
import { Reveal } from "@/components/ui/reveal";
import {
  BRIDAL_FEATURE,
  DURATION_BAND_OPTIONS,
  PRICE_BAND_OPTIONS,
  SERVICE_CATEGORY_SELECT,
  type CatalogService,
  type DurationBand,
  type PriceBand,
  type ServiceCategorySlug,
  matchesDurationBand,
  matchesPriceBand,
} from "@/lib/constants/services-catalog";

export function ServicesCatalog(props: { services: CatalogService[] }) {
  const { services } = props;
  const [category, setCategory] = useState<ServiceCategorySlug>("all");
  const [priceBand, setPriceBand] = useState<PriceBand>("any");
  const [durationBand, setDurationBand] = useState<DurationBand>("any");

  const filtered = useMemo(
    () =>
      services.filter((s) => {
        if (category !== "all" && s.category !== category) return false;
        if (!matchesPriceBand(s.priceFromGhs, priceBand)) return false;
        if (!matchesDurationBand(s.durationMins, durationBand)) return false;
        return true;
      }),
    [category, priceBand, durationBand, services]
  );

  const defaultFilters =
    category === "all" && priceBand === "any" && durationBand === "any";

  const countLabel = defaultFilters
    ? "Showing 7 Sanctuary Experiences"
    : `Showing ${filtered.length} experience${filtered.length === 1 ? "" : "s"}`;

  return (
    <>
      <section className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-3">
          <FilterSelect
            id="svc-cat"
            label="Category"
            value={category}
            onChange={(v) => setCategory(v as ServiceCategorySlug)}
            options={SERVICE_CATEGORY_SELECT}
          />
          <FilterSelect
            id="svc-price"
            label="Price Range"
            value={priceBand}
            onChange={(v) => setPriceBand(v as PriceBand)}
            options={PRICE_BAND_OPTIONS}
          />
          <FilterSelect
            id="svc-dur"
            label="Duration"
            value={durationBand}
            onChange={(v) => setDurationBand(v as DurationBand)}
            options={DURATION_BAND_OPTIONS}
          />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium italic text-stitch-outline">{countLabel}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center text-stitch-on-surface-variant">
            No services match these filters. Try widening your selection.
          </p>
        ) : (
          filtered.map((service, i) => (
            <Reveal key={service.id} delayMs={(i % 3) * 90}>
            <article
              className={cn(
                "group flex flex-col overflow-hidden rounded-xl bg-stitch-surface-container-low shadow-editorial transition-all duration-500 hover:bg-stitch-surface-container-lowest",
                service.stagger && "md:translate-y-12"
              )}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {service.badge ? (
                  <div className="absolute right-4 top-4 rounded-full bg-stitch-surface/90 px-3 py-1 backdrop-blur">
                    <span className="font-label text-[10px] font-bold uppercase tracking-widest text-stitch-primary">
                      {service.badge}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-grow flex-col p-8">
                <h3 className="mb-2 font-headline text-2xl font-bold">{service.title}</h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-stitch-on-surface-variant">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stitch-outline">
                      <MaterialIcon name="schedule" className="text-lg" />
                      <span className="text-xs font-medium">{service.durationMins} mins</span>
                    </div>
                    <div className="font-headline text-xl font-bold text-stitch-primary">
                      GHS {service.priceFromGhs}+
                    </div>
                  </div>
                  <Link
                    href={
                      service.bookingServiceId
                        ? `/booking?serviceId=${encodeURIComponent(service.bookingServiceId)}`
                        : "/booking"
                    }
                    className="block w-full rounded-full bg-stitch-primary py-4 text-center font-bold tracking-wide text-stitch-on-primary transition-colors duration-200 hover:bg-stitch-primary-container active:scale-95"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </article>
            </Reveal>
          ))
        )}

        <Reveal className="lg:col-span-3">
        <div className="group mt-12 flex flex-col overflow-hidden rounded-2xl bg-stitch-primary-fixed shadow-editorial lg:col-span-3 md:flex-row">
          <div className="h-96 overflow-hidden md:w-1/2 md:h-auto">
            <div className="relative h-full min-h-[16rem] w-full md:min-h-[24rem]">
              <Image
                src={BRIDAL_FEATURE.image}
                alt={BRIDAL_FEATURE.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center p-10 md:w-1/2 md:p-12">
            <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.2rem] text-stitch-primary">
              {BRIDAL_FEATURE.kicker}
            </span>
            <h2 className="mb-4 font-headline text-4xl font-bold">{BRIDAL_FEATURE.title}</h2>
            <p className="mb-8 text-lg font-light leading-relaxed text-stitch-on-primary-fixed-variant">
              {BRIDAL_FEATURE.description}
            </p>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 text-stitch-on-primary-fixed-variant">
                <MaterialIcon name="auto_awesome" className="text-2xl" />
                <span className="font-medium">Full Day Experience</span>
              </div>
              <div className="font-headline text-3xl font-bold text-stitch-primary">
                GHS {BRIDAL_FEATURE.priceFromGhs.toLocaleString()}+
              </div>
            </div>
            <Link
              href="/bridal"
              className="mt-8 self-start rounded-full bg-stitch-primary px-12 py-4 font-bold tracking-wide text-stitch-on-primary transition-all hover:bg-stitch-primary-container active:scale-95"
            >
              View Bridal Packages
            </Link>
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}

function FilterSelect<T extends string>(props: {
  id: string;
  label: string;
  value: T;
  onChange: (v: string) => void;
  options: { value: T; label: string }[];
}) {
  const { id, label, value, onChange, options } = props;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="px-1 font-label text-[10px] uppercase tracking-[0.1rem]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[200px] border-0 border-b-2 border-stitch-outline-variant bg-stitch-surface-container-lowest px-4 py-2 text-sm font-medium text-stitch-on-surface focus:border-stitch-primary focus:ring-0"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
