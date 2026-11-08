import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { FrostBackground } from "@/components/FrostBackground";
import { LogoMark } from "@/components/Logo";
import { SERVICES } from "@/lib/services";
import { site, telLink } from "@/lib/site";

const ELSEWHERE = [
  { href: "/services", label: "All services" },
  { href: "/our-work", label: "Our work" },
  { href: "/maintenance", label: "Servicing" },
  { href: "/areas", label: "Areas we cover" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Book a callout" },
];

/**
 * The page that is not there.
 *
 * A default 404 looks like the site is broken, which is the last impression
 * a trade wants. This one carries the branding, apologises in one line, and
 * puts the number and the five trades in front of somebody who is already
 * one wrong click from leaving.
 */
export default function NotFound() {
  const tel = telLink();

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <FrostBackground />

      <div className="container relative px-5 py-24 text-center sm:py-32">
        <LogoMark className="mx-auto h-16 w-16" />

        <p className="section-label mt-8 text-accent-light">404</p>
        <h1 className="mt-3 text-[2.1rem] font-black leading-tight tracking-[-1px] sm:text-5xl">
          That page has gone cold
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          The link is wrong or the page has moved. Everything else is still here,
          and the phone is still answered.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {tel ? (
            <a href={tel} className="btn btn-primary">
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
              Call {site.phone}
            </a>
          ) : null}
          <Link href="/" className="btn btn-outline">
            Back to the home page
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-10">
          <p className="text-xs font-bold uppercase tracking-[2px] text-white/40">
            What we do
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-accent-light hover:text-white"
                >
                  <service.icon className="h-4 w-4 text-accent-light" aria-hidden="true" />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {ELSEWHERE.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-2 py-2 text-white/55 hover:text-accent-light"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
