import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";
import { createClient } from "@/supabase/server";

const AVATAR_STYLES = [
  { bg: "bg-stitch-secondary-fixed", text: "text-stitch-on-secondary-fixed" },
  { bg: "bg-stitch-primary-fixed", text: "text-stitch-on-primary-fixed" },
  { bg: "bg-stitch-tertiary-fixed", text: "text-stitch-on-tertiary-fixed" },
] as const;

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

export async function Testimonials() {
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, customer_name, rating, comment")
    .gte("rating", 4)
    .not("comment", "is", null)
    .order("created_at", { ascending: false })
    .limit(6);

  const items = reviews ?? [];

  return (
    <section className="bg-stitch-surface px-8 py-32">
      <div className="mx-auto mb-20 max-w-5xl text-center">
        <h2 className="mb-6 font-headline text-5xl tracking-tight text-stitch-on-surface">
          Voices of the <i className="italic">Sanctuary</i>
        </h2>
        <p className="mx-auto max-w-2xl italic text-stitch-on-surface-variant">
          &ldquo;A transformation that begins with the soul and reflects in the
          mirror.&rdquo;
        </p>
      </div>
      {items.length === 0 ? (
        <div className="mx-auto max-w-md text-center">
          <p className="text-stitch-on-surface-variant">
            Be the first to share your experience after your visit.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-block rounded-full bg-stitch-primary px-8 py-3 font-bold text-stitch-on-primary shadow-lg shadow-stitch-primary/20 transition-transform hover:scale-105"
          >
            Book Your Visit
          </Link>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((r, i) => {
            const style = AVATAR_STYLES[i % AVATAR_STYLES.length]!;
            const name = r.customer_name?.trim() || "Client";
            return (
              <div
                key={r.id}
                className="rounded-xl border border-stitch-outline-variant/10 bg-stitch-surface-container-lowest p-10 shadow-sm"
              >
                <div className="mb-6 flex text-stitch-primary">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <MaterialIcon
                      key={star}
                      name="star"
                      filled={star < r.rating}
                      className={`!text-xl ${star >= r.rating ? "opacity-30" : ""}`}
                    />
                  ))}
                </div>
                <p className="mb-8 text-lg leading-relaxed text-stitch-on-surface">
                  &ldquo;{r.comment}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${style.bg} ${style.text}`}
                  >
                    {initialsFor(name)}
                  </div>
                  <div>
                    <p className="font-bold text-stitch-on-surface">{name}</p>
                    <p className="text-sm opacity-60">Verified Client</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
