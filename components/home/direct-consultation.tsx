import Link from "next/link";
import { MaterialIcon } from "@/components/home/material-icon";
import { WHATSAPP_HREF } from "@/lib/constants/home-content";

export function DirectConsultation() {
  return (
    <section className="mx-4 mt-20 rounded-3xl bg-stitch-primary-fixed/30 px-8 py-12 md:hidden">
      <h3 className="mb-8 text-center font-headline text-2xl text-stitch-on-surface">
        Direct Consultation
      </h3>
      <div className="flex justify-center gap-12">
        <Link
          href="tel:+233546006627"
          className="group flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stitch-surface-container-lowest shadow-editorial transition-transform group-hover:scale-110">
            <MaterialIcon name="call" className="text-stitch-primary" />
          </div>
          <span className="font-label text-[10px] uppercase tracking-widest text-stitch-on-surface-variant">
            Phone
          </span>
        </Link>
        <Link
          href={WHATSAPP_HREF}
          className="group flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stitch-surface-container-lowest shadow-editorial transition-transform group-hover:scale-110">
            <MaterialIcon name="chat" className="text-stitch-primary" />
          </div>
          <span className="font-label text-[10px] uppercase tracking-widest text-stitch-on-surface-variant">
            WhatsApp
          </span>
        </Link>
        <Link
          href="mailto:hello@dusabmakeover.com"
          className="group flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stitch-surface-container-lowest shadow-editorial transition-transform group-hover:scale-110">
            <MaterialIcon name="mail" className="text-stitch-primary" />
          </div>
          <span className="font-label text-[10px] uppercase tracking-widest text-stitch-on-surface-variant">
            Email
          </span>
        </Link>
      </div>
    </section>
  );
}
