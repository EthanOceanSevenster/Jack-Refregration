import { CircleCheck, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FrostBackground } from "@/components/FrostBackground";
import { site, telLink, whatsappLink } from "@/lib/site";
import { HERO_PHOTO } from "@/lib/work";

const HIGHLIGHTS = [
  "Free quote, no callout surprises",
  "You approve the price first",
  "Most repairs done the same visit",
];

/**
 * Drawn, not photographed.
 *
 * His own photographs are the strongest thing on this site, but they belong
 * in their own section where they can be looked at. Behind a headline they
 * bring somebody elses lighting and fight the type. So the hero is a flat
 * dark band with one cold light source, and the picture on it is the thing
 * every fridge technician carries: a manifold gauge set, blue low side, red
 * high side, yellow hose.
 */
export function Hero() {
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <FrostBackground />

      <div className="container relative grid items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-sky-200">
            <span className="live-dot" />
            {site.hours} &middot; emergency callouts
          </p>

          <h1 className="mt-7 text-[2.4rem] font-black leading-[1.05] tracking-[-1px] sm:text-6xl lg:text-[4rem] lg:tracking-[-2px]">
            Not cooling? We answer,{" "}
            <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
              any hour
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Aircon, heat pumps, cold rooms, freezer rooms and fridges, installed and
            repaired across {site.areas.slice(0, 3).join(", ")} and around. One phone
            call, a straight answer, and a price agreed before anybody touches your
            unit.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {tel ? (
              <a href={tel} className="btn btn-primary">
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                Call {site.phone}
              </a>
            ) : null}
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                WhatsApp
              </a>
            ) : null}
            <Link href="/contact" className="btn btn-outline">
              Book a callout
            </Link>
          </div>

          <ul className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CircleCheck
                  className="h-5 w-5 shrink-0 text-accent-light"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          {/* One of his own jobs, framed rather than used as wallpaper. The
              drawn version of this looked like clip art; the real one is the
              best proof on the page. */}
          <figure className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/60 lg:max-w-none">
            <Image
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 40vw, 90vw"
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pb-5 pt-16">
              <p className="text-[0.65rem] font-bold uppercase tracking-[2px] text-sky-300">
                Our own work
              </p>
              <p className="mt-1.5 text-sm font-medium text-white">{HERO_PHOTO.caption}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
