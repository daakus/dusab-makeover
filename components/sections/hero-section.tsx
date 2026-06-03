import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  className?: string;
};

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-secondary shadow-soft sm:rounded-3xl",
        className
      )}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-primary">
            Ghana · Luxury beauty
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-heading sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild className="rounded-2xl">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            {secondaryCta ? (
              <Button size="lg" variant="outline" asChild className="rounded-2xl">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
        <div
          className="min-h-[280px] bg-cover bg-center lg:min-h-[420px]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80)",
          }}
          role="img"
          aria-label="Salon atmosphere"
        />
      </div>
    </section>
  );
}
