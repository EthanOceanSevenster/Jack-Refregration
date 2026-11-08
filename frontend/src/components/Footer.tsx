import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { SERVICES } from "@/lib/services";
import { site, telLink, whatsappLink } from "@/lib/site";

const LINKS = [
  { href: "/services", label: "All services" },
  { href: "/maintenance", label: "Servicing" },
  { href: "/our-work", label: "Our work" },
  { href: "/areas", label: "Areas we cover" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Book a callout" },
];

export function Footer() {
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  return (
    <footer className="bg-dark text-white">
      <div className="container px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo inverse />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Aircon, heat pumps, cold rooms, freezer rooms and fridges. Open around
              the clock, free quotes, and the fault found before anything gets
              replaced.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {tel ? (
                <a href={tel} className="btn btn-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              ) : null}
              {wa ? (
                <a href={wa} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Services">
            <p className="text-xs font-bold uppercase tracking-[2px] text-white/40">
              What we do
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-block py-1.5 text-white/65 hover:text-accent-light"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="text-xs font-bold uppercase tracking-[2px] text-white/40">
              On this site
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-white/65 hover:text-accent-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[2px] text-white/40">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {site.hours ? (
                <p className="flex items-center gap-2.5 text-white/65">
                  <Clock className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  {site.hours}, seven days a week
                </p>
              ) : null}
              {site.areas.length > 0 ? (
                <p className="flex items-start gap-2.5 text-white/65">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  {site.areas.join(", ")}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
