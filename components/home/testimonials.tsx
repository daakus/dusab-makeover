import { MaterialIcon } from "@/components/home/material-icon";

const items = [
  {
    quote:
      "The only place in Accra I trust with my natural hair. The atmosphere is truly a sanctuary from the city's hustle.",
    name: "Efua Amponsah",
    role: "Loyal Client",
    initials: "EA",
    avatarBg: "bg-stitch-secondary-fixed",
    textOnAvatar: "text-stitch-on-secondary-fixed",
    elevated: false,
  },
  {
    quote:
      "My bridal makeup was flawless and lasted for 14 hours. Dusab MakeOver made me feel like royalty on my special day.",
    name: "Kofi Mensah",
    role: "Groom",
    initials: "KM",
    avatarBg: "bg-stitch-primary-fixed",
    textOnAvatar: "text-stitch-on-primary-fixed",
    elevated: true,
  },
  {
    quote:
      "The online booking is so smooth. No calls, no stress. Just pick a time and show up for luxury treatment.",
    name: "Sandra Owusu",
    role: "Corporate Executive",
    initials: "SO",
    avatarBg: "bg-stitch-tertiary-fixed",
    textOnAvatar: "text-stitch-on-tertiary-fixed",
    elevated: false,
  },
] as const;

export function Testimonials() {
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl border border-stitch-outline-variant/10 bg-stitch-surface-container-lowest p-10 shadow-sm ${
              t.elevated ? "z-10 scale-105" : ""
            }`}
          >
            <div className="mb-6 flex text-stitch-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <MaterialIcon
                  key={`${t.name}-star-${i}`}
                  name="star"
                  filled
                  className="!text-xl"
                />
              ))}
            </div>
            <p className="mb-8 text-lg leading-relaxed text-stitch-on-surface">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${t.avatarBg} ${t.textOnAvatar}`}
              >
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-stitch-on-surface">{t.name}</p>
                <p className="text-sm opacity-60">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
