import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { STEPS } from "@/lib/content";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Air conditioning, heat pumps, cold rooms, freezer rooms, fridges and freezers. Installed, serviced and repaired, domestic and commercial.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What we install, service and repair"
        text="Five trades, one number to call. Each page tells you what tends to go wrong, what we do about it, and what happens on the visit."
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="core-card group flex gap-5"
              >
                <span className="core-icon shrink-0">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="block">
                  <span className="block text-[1.15rem] font-extrabold">{service.title}</span>
                  <span className="mt-2 block text-[0.9rem] leading-relaxed text-gray-600">
                    {service.summary}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <SectionHeader
            label="How it works"
            title="The same four steps, whatever the job"
            text="Diagnosed first, priced second, fixed third. Nothing happens without your yes."
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

      <CtaBand />
    </>
  );
}
