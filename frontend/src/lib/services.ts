import { AirVent, Flame, Refrigerator, Snowflake, ThermometerSnowflake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * One page per trade, because the five jobs are not the same job.
 *
 * Somebody with a cold room losing temperature and somebody whose aircon
 * blows warm are different customers with different worries, and a single
 * line on a home page serves neither. Everything here is what he told us he
 * does, written out: no prices, no warranties and no qualifications, because
 * those are his to give and he has not given them yet.
 */
export type Service = {
  slug: string;
  title: string;
  /** Used in cards and in the navigation. */
  short: string;
  icon: LucideIcon;
  summary: string;
  intro: string[];
  /** What a customer notices before they phone. */
  signs: string[];
  /** What he actually does once he is there. */
  work: string[];
  /** Photographs from the gallery that show this trade. */
  photos: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "air-conditioning",
    title: "Air conditioning",
    short: "Air conditioning",
    icon: AirVent,
    summary:
      "Installation, servicing and repairs. Units blowing warm, leaking, tripping the breaker, or never cooling the room properly.",
    intro: [
      "Split units, midwalls, cassettes and ducted systems, in houses, offices and shops. New installations, the yearly service that keeps one running, and repairs when it stops doing what it should.",
      "Most aircon faults are one of a short list: gas that has leaked out, a blocked drain, a dirty coil, a tired capacitor or a fan motor on its way out. The point of the callout is to find out which, rather than to guess expensively.",
    ],
    signs: [
      "Blowing air, but the room never gets cold",
      "Water dripping inside, or running down the wall",
      "Ice forming on the pipes or the indoor unit",
      "Tripping the breaker, or not switching on at all",
      "Rattling, grinding or a new noise it never made",
      "A smell when it starts up",
      "Running all day and the electricity bill showing it",
    ],
    work: [
      "Leak testing and regassing, with the leak found first",
      "Full service: filters, coils, drains, electrical connections",
      "Capacitors, fan motors, contactors and control boards",
      "Compressor diagnosis, and a straight answer when a unit is finished",
      "New installations, including brackets, piping and drainage",
      "Moving an existing unit to another wall or another building",
    ],
    photos: ["/work/work-07.jpg", "/work/work-08.jpg"],
  },
  {
    slug: "heat-pumps",
    title: "Heat pumps",
    short: "Heat pumps",
    icon: Flame,
    summary:
      "Supplied, installed and serviced. Hot water for a fraction of what an element costs to run.",
    intro: [
      "A heat pump heats your water the way a fridge cools, by moving heat rather than making it. That is why it runs on a fraction of the electricity a geyser element uses, and why it is usually the first thing worth changing in a house where the bill has got out of hand.",
      "We supply and fit them, and we service and repair the ones already in. Sizing matters more than brand: a unit too small for the house runs all day and never catches up.",
    ],
    signs: [
      "Water not getting hot, or running out too quickly",
      "The unit running almost constantly",
      "Tripping, or an error showing on the controller",
      "Water pooling under the unit",
      "Noisy fan or compressor",
      "Still on a geyser element and paying for it every month",
    ],
    work: [
      "Supply and installation, sized for the house and the household",
      "Changing over from a geyser element, plumbing included",
      "Servicing: coils, fan, filters, pressures and the controller",
      "Fault finding on units that trip or will not heat",
      "Repairs and part replacement on all makes",
    ],
    photos: [],
  },
  {
    slug: "cold-rooms",
    title: "Cold rooms",
    short: "Cold rooms",
    icon: Snowflake,
    summary:
      "Builds, repairs and servicing for shops, restaurants, butcheries and anywhere stock has to stay cold.",
    intro: [
      "A cold room is a business asset, and when it drifts two degrees nobody notices until the stock does. We install, repair and service them, from the condensing unit on the wall to the controller and the door seal.",
      "This is the work the 24-hour line exists for. A room failing on a Friday night is a weekend of stock, so phone the moment the temperature looks wrong rather than in the morning.",
    ],
    signs: [
      "Temperature drifting up, or not holding overnight",
      "Ice building up on the evaporator or the pipework",
      "The unit running constantly, or short cycling on and off",
      "A door that no longer seals, or a frame iced over",
      "Water on the floor under the evaporator",
      "The controller showing an alarm or the wrong reading",
    ],
    work: [
      "Condensing units supplied, installed and replaced",
      "Evaporators, fans, defrost elements and drains",
      "Control panels wired properly, with the protection a motor needs",
      "Controllers, probes and defrost timers set correctly",
      "Leak finding, regassing and pressure testing",
      "Door seals, hinges and closers",
      "Regular servicing arranged, so the failure happens on our visit and not yours",
    ],
    photos: ["/work/on-site-gauges.jpg", "/work/condensing-unit-install.jpg", "/work/control-panel.jpg"],
  },
  {
    slug: "freezer-rooms",
    title: "Freezer rooms",
    short: "Freezer rooms",
    icon: ThermometerSnowflake,
    summary:
      "Low-temperature rooms, where a defrost fault or a tired compressor costs a freezer full of stock.",
    intro: [
      "Freezer rooms are harder on equipment than cold rooms, and most of what goes wrong is defrost related: an element that has failed, a timer that is out, or a drain that froze and backed up. Left alone, the evaporator ices solid and airflow stops.",
      "We repair, service and install them, and we would rather be called while the room is still holding temperature than once it is not.",
    ],
    signs: [
      "The room not pulling down to temperature",
      "Thick ice on the evaporator, the ceiling or the pipework",
      "Defrost water freezing on the floor by the door",
      "The compressor running without a break",
      "Product soft at the top of the room and hard at the bottom",
      "Alarms on the controller, or readings that make no sense",
    ],
    work: [
      "Defrost faults: elements, timers, terminations and drains",
      "Evaporator and condensing unit repairs and replacement",
      "Compressor diagnosis, and replacement where it is worth it",
      "Control panel and wiring repairs",
      "Gas leaks found, repaired and recharged",
      "Servicing before the season, rather than during it",
    ],
    photos: ["/work/work-09.jpg", "/work/work-05.jpg"],
  },
  {
    slug: "fridges-and-freezers",
    title: "Fridges and freezers",
    short: "Fridges & freezers",
    icon: Refrigerator,
    summary:
      "Domestic and commercial. Not cooling, freezing everything, pooling water, or never switching off.",
    intro: [
      "Home fridges, chest freezers, upright commercial units, under-counter fridges and shop display fridges. Most of it is done where the unit stands; only something that genuinely needs the bench comes back to the workshop, and you are told before it moves.",
      "Before a replacement is quoted, you get told what is actually wrong with the one you have. Plenty of units written off by somebody else are a thermostat, a fan or a gas leak away from working.",
    ],
    signs: [
      "Fridge not cold, or the freezer side working and the fridge side not",
      "Freezing everything, including what is in the salad drawer",
      "Water pooling inside, or under the unit",
      "Running non-stop, or switching on and off every few minutes",
      "The back getting very hot, or a new buzzing noise",
      "A display fridge misting up and losing its shelf appeal",
    ],
    work: [
      "Thermostats, fans, defrost elements, timers and door seals",
      "Compressor and starting gear diagnosis and replacement",
      "Gas leaks found and sealed, then recharged",
      "Drain blockages cleared and refitted so they stay clear",
      "Commercial and display fridges, including shop fit work",
      "Workshop repairs where the unit is better off on the bench",
    ],
    photos: ["/work/workshop-bench.jpg", "/work/work-06.jpg"],
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
