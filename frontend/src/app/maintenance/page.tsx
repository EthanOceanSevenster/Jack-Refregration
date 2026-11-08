import {
  AirVent,
  CalendarCheck,
  CircleCheck,
  Flame,
  Gauge,
  Refrigerator,
  Snowflake,
  TrendingDown,
  TriangleAlert,
} from "lucide-react";
import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicing and maintenance",
  description:
    "Regular servicing for aircon, heat pumps, cold rooms and freezer rooms. Cheaper to run, fewer breakdowns, and the failure happens on our visit rather than yours.",
};

/** Why anybody pays for a service on a unit that is still working. */
const REASONS = [
  {
    icon: TrendingDown,
    title: "It costs less to run",
    text: "A dirty coil and a blocked filter make a unit work harder for the same cooling. The electricity goes somewhere, and it goes onto your bill.",
  },
  {
    icon: TriangleAlert,
    title: "Small faults stay small",
    text: "A failing capacitor is a part. The compressor it takes with it is a new unit. Most expensive repairs started as something cheap that nobody looked at.",
  },
  {
    icon: CalendarCheck,
    title: "It fails on our visit, not yours",
    text: "A cold room that gets looked at every few months does not pick a Friday night to stop. That is the whole point of a service.",
  },
  {
    icon: Gauge,
    title: "It lasts longer",
    text: "Gas pressures, airflow and electrics checked on a schedule add years to equipment that is otherwise run until it dies.",
  },
];

/** What a service actually covers, by trade. No padding, no mystery. */
const PLANS = [
  {
    icon: AirVent,
    title: "Air conditioning",
    interval: "Every 12 months, or every 6 in a dusty spot or an office that runs all day",
    items: [
      "Filters cleaned or replaced",
      "Indoor and outdoor coils cleaned",
      "Drain and drip tray cleared and tested",
      "Gas pressures and temperatures checked",
      "Electrical connections, capacitor and contactor checked",
      "Fan motors and bearings listened to and checked",
    ],
  },
  {
    icon: Flame,
    title: "Heat pumps",
    interval: "Every 12 months",
    items: [
      "Coil and fan cleaned",
      "Pressures and water temperature checked",
      "Controller settings and sensors verified",
      "Plumbing connections and pressure relief checked",
      "Electrical connections tightened and tested",
    ],
  },
  {
    icon: Snowflake,
    title: "Cold rooms and freezer rooms",
    interval: "Quarterly for a busy kitchen or shop, twice a year for lighter use",
    items: [
      "Condenser and evaporator cleaned",
      "Defrost cycle, elements and timer tested",
      "Drains cleared so they do not freeze up",
      "Gas pressures and superheat checked",
      "Controller, probes and alarm settings verified",
      "Door seals, hinges and closers checked",
      "Panel, contactors and overloads inspected",
    ],
  },
  {
    icon: Refrigerator,
    title: "Commercial fridges and freezers",
    interval: "Every 6 to 12 months, depending on how hard they work",
    items: [
      "Condenser cleaned and airflow checked",
      "Door seals checked and replaced where needed",
      "Thermostat and defrost operation tested",
      "Temperatures logged against what they should be",
      "Noises and vibration checked before they become failures",
    ],
  },
];

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        label="Servicing"
        title="Looked after, not just fixed"
        text="Most of what we get called out to was avoidable. A serviced unit runs cheaper, breaks less and lasts years longer than one that is only touched when it stops."
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            label="Why bother"
            title="What a service is actually for"
            text="Nobody enjoys paying to have something looked at while it is still working. Here is what you get for it."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <article key={reason.title} className="core-card">
                <span className="core-icon">
                  <reason.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.1rem] font-extrabold">{reason.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-gray-600">
                  {reason.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <SectionHeader
            label="What we check"
            title="What is on a service"
            text="The same list every visit, so you know what you paid for and we know nothing was skipped."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {PLANS.map((plan) => (
              <article key={plan.title} className="core-card">
                <div className="flex items-center gap-4">
                  <span className="core-icon shrink-0">
                    <plan.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] font-extrabold">{plan.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[1.5px] text-accent">
                      {plan.interval}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9rem] text-gray-600"
                    >
                      <CircleCheck
                        className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            label="For businesses"
            title="Scheduled visits, booked in advance"
            text="Restaurants, butcheries, shops and anywhere a failure costs stock rather than comfort."
          />
          <div className="mx-auto max-w-3xl space-y-5 text-[1.02rem] leading-relaxed text-gray-700">
            <p>
              A shop with a cold room, two display fridges and an aircon does not
              want three separate callouts in one bad week. Visits can be booked on a
              schedule that suits the business, outside trading hours where it
              matters, with everything looked at in one go.
            </p>
            <p>
              You get told what was checked, what was adjusted and what is starting
              to look tired, so a replacement is something you plan for rather than
              something that happens to you on a Saturday.
            </p>
            <p>
              Phone to arrange it. {site.hours}, and the quote for a service schedule
              costs nothing.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Book a service before it books itself."
        text="Phone and we will work out what needs looking at and how often."
      />
    </>
  );
}
