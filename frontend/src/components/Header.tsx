"use client";

import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/Logo";
import { SERVICES } from "@/lib/services";
import { site, telLink, whatsappLink } from "@/lib/site";

/**
 * Plain words, not industry ones. Somebody whose cold room has stopped is
 * looking for what you fix and how fast you can come, not for "solutions".
 */
const LINKS = [
  { href: "/maintenance", label: "Servicing" },
  { href: "/our-work", label: "Our work" },
  { href: "/areas", label: "Areas" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  // Close the services menu on Escape or a click outside it.
  useEffect(() => {
    if (!servicesOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [servicesOpen]);

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }
  function scheduleCloseServices() {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }
  function closeAll() {
    setServicesOpen(false);
    setMobileOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (active: boolean) =>
    `relative flex h-full items-center px-3.5 text-sm font-medium transition-colors hover:text-dark ${
      active
        ? "text-dark after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent"
        : "text-gray-600"
    }`;

  return (
    <>
      {/* Announcement strip. The two things that win the call before anybody
          has read a word of the page: he answers at night, and the quote
          costs nothing. */}
      <div className="bg-gradient-to-r from-[#063f6b] via-accent to-[#0e7490] text-white">
        <div className="container flex h-11 items-center justify-center gap-6 px-5 text-xs sm:text-sm lg:justify-between">
          <p className="flex items-center gap-2 font-medium">
            <Clock className="h-4 w-4 shrink-0 text-sky-200" aria-hidden="true" />
            <span>{site.hours} &middot; free quote before any work starts</span>
          </p>
          <p className="hidden items-center gap-2 text-white/85 lg:flex">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {site.areas.slice(0, 4).join(" · ")}
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-gray-200 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-white/85 shadow-lg shadow-black/5 backdrop-blur-xl" : "bg-white"
        }`}
      >
        <div className="container flex h-[76px] items-center justify-between gap-4 px-5">
          <Link href="/" aria-label={`${site.name} home`} onClick={closeAll}>
            <Logo />
          </Link>

          <nav className="hidden h-full items-center lg:flex" aria-label="Main">
            <div
              ref={servicesRef}
              className="h-full"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((value) => !value)}
                className={`${navLinkClass(isActive("/services") || servicesOpen)} gap-1`}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {servicesOpen ? (
                <div
                  id="services-menu"
                  className="absolute inset-x-0 top-full border-y border-gray-200 bg-white shadow-2xl shadow-black/10"
                >
                  <div className="container grid gap-2 px-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={closeAll}
                        className="group flex gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
                      >
                        <span className="core-icon h-10 w-10 shrink-0 rounded-[10px] transition-colors group-hover:bg-accent group-hover:text-white">
                          <service.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-semibold">{service.title}</span>
                          <span className="mt-1 line-clamp-2 block text-sm text-gray-600">
                            {service.summary}
                          </span>
                        </span>
                      </Link>
                    ))}

                    <Link
                      href="/maintenance"
                      onClick={closeAll}
                      className="group flex gap-4 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    >
                      <span className="core-icon h-10 w-10 shrink-0 rounded-[10px] transition-colors group-hover:bg-accent group-hover:text-white">
                        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-semibold">Servicing and maintenance</span>
                        <span className="mt-1 block text-sm text-gray-600">
                          Scheduled visits, so it fails on our time and not yours.
                        </span>
                      </span>
                    </Link>

                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="flex items-center gap-2 rounded-lg p-4 text-sm font-semibold text-accent transition-colors hover:bg-gray-50"
                    >
                      All services
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={navLinkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {tel ? (
              <a
                href={tel}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            ) : null}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* On a phone, calling is one tap and never behind a menu. */}
            {tel ? (
              <a
                href={tel}
                aria-label={`Call ${site.phone}`}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Call</span>
              </a>
            ) : null}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-dark hover:bg-gray-100"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Glowing accent line */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-accent-light/70 to-transparent"
          aria-hidden="true"
        />

        {mobileOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-gray-200 bg-white px-4 pb-6 pt-4 lg:hidden"
          >
            <p className="px-3 text-xs font-bold uppercase tracking-[2px] text-gray-500">
              Services
            </p>
            <ul className="mt-2 space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-dark"
                  >
                    <service.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-1 border-t border-gray-200 pt-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeAll}
                    className={`block rounded-md px-3 py-2.5 text-base font-medium hover:bg-gray-100 ${
                      isActive(link.href) ? "text-dark" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-gray-200 pt-5">
              {tel ? (
                <a href={tel} className="btn btn-primary w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              ) : null}
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeAll}
                  className="btn btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              ) : null}
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
