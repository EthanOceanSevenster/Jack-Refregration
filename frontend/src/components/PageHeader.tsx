import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { FrostBackground } from "@/components/FrostBackground";
import { site, telLink, whatsappLink } from "@/lib/site";

/**
 * The band at the top of every page that is not the home page.
 *
 * Same dark field and same cold light as the hero, at a third of the height,
 * so an inside page is recognisably the same site without pretending to be
 * the front door. The number is in it, because somebody landing on a service
 * page from a search is often already holding the phone.
 */
export function PageHeader({
  label,
  title,
  text,
  crumb,
}: {
  label: string;
  title: string;
  text?: string;
  /** The page one level up, shown as a breadcrumb. */
  crumb?: { href: string; label: string };
}) {
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <FrostBackground />

      <div className="container relative px-5 py-16 sm:py-20">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-white/45"
        >
          <Link href="/" className="py-2 hover:text-white">
            Home
          </Link>
          {crumb ? (
            <>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href={crumb.href} className="py-2 hover:text-white">
                {crumb.label}
              </Link>
            </>
          ) : null}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-white/70">{title}</span>
        </nav>

        <p className="section-label mt-8 text-accent-light">{label}</p>
        <h1 className="mt-3 max-w-3xl text-[2.1rem] font-black leading-[1.08] tracking-[-1px] sm:text-5xl">
          {title}
        </h1>
        {text ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{text}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
