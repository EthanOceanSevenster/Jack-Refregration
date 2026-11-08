import {
  BadgeCheck,
  Clock,
  MapPin,
  Phone,
  Receipt,
  Search,
  Truck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { site } from "@/lib/site";

type Item = { icon: LucideIcon; title: string; text: string };

/** Facts worth stating plainly. None of them invented. */
export const STATS = [
  { value: "24/7", label: "Callouts, any hour" },
  { value: "6", label: "Areas covered" },
  { value: "All", label: "Makes and models" },
  { value: "Free", label: "Quote before work" },
];

/** The promise that wins a repair job: no surprises. */
export const STEPS: Item[] = [
  {
    icon: Phone,
    title: "You call",
    text: "Any hour. Tell us what it is doing and we will have a fair idea before we arrive.",
  },
  {
    icon: Search,
    title: "We diagnose",
    text: "We find out what is actually wrong rather than replacing parts and hoping.",
  },
  {
    icon: Receipt,
    title: "You get a price",
    text: "You hear what it costs before any work starts. Nothing is done without a yes.",
  },
  {
    icon: Wrench,
    title: "We fix it",
    text: "Most jobs are done in the same visit. If a part is needed we tell you when.",
  },
];

export const WHY: Item[] = [
  {
    icon: Clock,
    title: "Open around the clock",
    text: "A cold room failing at midnight is a lorry-load of stock by morning. We answer at night.",
  },
  {
    icon: BadgeCheck,
    title: "Diagnosed, not guessed",
    text: "We find the fault before quoting, so you do not pay for parts that were never the problem.",
  },
  {
    icon: Receipt,
    title: "Price agreed first",
    text: "You hear the number before we start. No invoice arrives bigger than the conversation.",
  },
  {
    icon: Truck,
    title: "We come to you",
    text: "Most work is done on site. Only units that genuinely need the bench come back with us.",
  },
  {
    icon: Wrench,
    title: "One trade, done properly",
    text: "Refrigeration, aircon and heat pumps are the whole job here, not a sideline to something else.",
  },
  {
    icon: MapPin,
    title: "Local",
    text: `${site.areas.slice(0, 4).join(", ")} and around. Close enough to get there today.`,
  },
];

/**
 * A line for each area, so the areas page is worth reading rather than a
 * list of names. Deliberately plain: the same trades and the same hours
 * everywhere, because that is the truth of a one-man operation.
 */
export const AREA_NOTES: Record<string, string> = {
  Centurion: "Houses, estates, offices and shops. The closest of the six, and usually the quickest to reach.",
  Midrand: "Domestic callouts and commercial refrigeration in the business parks and shopping centres.",
  Sandton: "Restaurants, shops and offices, plus domestic aircon and fridge work.",
  Bronkhorstspruit: "Out east, where a cold room failing is often a long way from anybody else who can come.",
  Mountview: "Domestic and small commercial work, same trades and same hours.",
  Boschkop: "Smallholdings and homes, including cold rooms and freezer rooms on properties.",
};
