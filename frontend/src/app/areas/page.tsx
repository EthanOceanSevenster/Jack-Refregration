import { MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { AREA_NOTES } from "@/lib/content";
import { site, telLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas we cover",
  description: `Refrigeration, aircon and heat pump callouts in ${site.areas.join(", ")} and the areas around them.`,
};

export default function AreasPage() {
  const tel = telLink();

  return (
    <>
      <PageHeader
        label="Where we go"
        title="Areas we cover"
        text="Six areas and everything between them, domestic and commercial. Not on the list? Phone anyway and you will get a straight answer rather than a maybe."
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.areas.map((area) => (
              <article key={area} className="core-card">
                <span className="core-icon">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-[1.15rem] font-extrabold">{area}</h2>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-gray-600">
                  {AREA_NOTES[area] ?? "Domestic and commercial work, same trades and same hours."}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-gray-200 bg-gray-50 px-6 py-7 text-center">
            <h2 className="text-[1.15rem] font-extrabold">Not on the list?</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-600">
              Phone and ask. Some jobs are worth the drive and some are not, and we
              would rather tell you that on the phone than charge you to find out.
            </p>
            {tel ? (
              <a href={tel} className="btn btn-dark mt-6">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
