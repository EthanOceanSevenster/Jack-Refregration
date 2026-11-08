import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkGallery } from "@/components/WorkGallery";
import { STATS, STEPS, WHY } from "@/lib/content";
import { SERVICES } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * The front door, and only the front door.
 *
 * Everything here is a headline with somewhere to go: the five trades, a few
 * photographs, how a callout works, where he goes, and the questions people
 * ask. The detail lives on its own page, so somebody looking for cold room
 * repairs reads a page about cold rooms instead of scrolling past four other
 * trades to find one paragraph.
 */
export default function Home() {
  return (
    <>
      <Hero />

      {/* The five trades */}
      <section id="services" className="section">
        <div className="container">
          <SectionHeader
            label="What we do"
            title="Five trades, one number"
            text="Whatever stopped cooling, it is the same phone call. Homes, shops, restaurants and cold stores."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="core-card group block"
              >
                <span className="core-icon">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.1rem] font-extrabold">{service.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-gray-600">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  See what we fix
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}

            <Link
              href="/services"
              className="core-card group flex flex-col justify-center bg-gray-50 text-center"
            >
              <p className="text-[1.1rem] font-extrabold">All services</p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-gray-600">
                Everything we install, service and repair, in one place.
              </p>
              <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-accent">
                See all
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-dark">
        <div className="container grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-[2.75rem] font-black leading-none">{stat.value}</p>
              <p className="mt-2.5 text-sm text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A few photographs, the rest on their own page */}
      <section id="work" className="section section-gray">
        <div className="container">
          <SectionHeader
            label="Our work"
            title="See the work before you book"
            text="Every photograph is one of our own jobs. No stock pictures, no borrowed installations."
          />
          <WorkGallery limit={6} />
          <div className="mt-10 text-center">
            <Link href="/our-work" className="btn btn-dark">
              See all our work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container">
          <SectionHeader
            label="How it works"
            title="You know the price before we start"
            text="Four steps, and nothing gets done until you have said yes to the number."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <article key={step.title} className="service-card">
                <div className="flex items-center gap-3">
                  <span className="core-icon h-10 w-10 rounded-[10px]">
                    <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="section section-gray">
        <div className="container">
          <SectionHeader
            label="Where we go"
            title="On your side of town"
            text="Six areas and everything between them. Not on the list? Phone anyway and you will get a straight answer."
          />
          <ul className="flex flex-wrap justify-center gap-3">
            {site.areas.map((area) => (
              <li key={area} className="tag">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/areas"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-accent hover:underline"
            >
              What we cover in each area
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeader
            label="Why us"
            title="Why people phone back"
            text="Six reasons the same customers call us again instead of trying somebody new."
            dark
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <article key={item.title} className="why-item">
                <item.icon className="h-6 w-6 text-accent-light" aria-hidden="true" />
                <h3 className="mt-5 text-[1.15rem] font-bold">{item.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The questions that come up first */}
      <section className="section">
        <div className="container">
          <SectionHeader
            label="Questions"
            title="Asked before every booking"
            text="The three we hear most. The rest, including what a callout costs, are on the questions page."
          />
          <Faq limit={3} />
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-accent hover:underline"
            >
              All the questions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
