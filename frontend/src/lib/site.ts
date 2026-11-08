/**
 * Everything Jack is likely to want changed, in one file.
 *
 * Filled in from what he sent on WhatsApp. Photographs are the one thing
 * still outstanding. Anything left blank here is deliberately empty rather
 * than invented, and every element that depends on a blank hides itself.
 */
export const site = {
  name: "Jack Cool",
  shortName: "Jack Cool",
  tagline: "Refrigeration, aircon and heat pumps",

  /** As a customer reads it. */
  phone: "067 044 6551",
  /** The same number for tel: and WhatsApp links: country code, no spaces. */
  phoneDigits: "27670446551",
  /** TODO: email, if he ever wants one shown. */
  email: "",

  /**
   * His words, with Bronkhorstspruit spelled out. He wrote "Bronkosprit",
   * which is how it sounds rather than how somebody would search for it.
   */
  areas: [
    "Centurion",
    "Midrand",
    "Sandton",
    "Bronkhorstspruit",
    "Mountview",
    "Boschkop",
  ] as string[],

  hours: "Open 24 hours",
  /** He said 24hrs, so the after-hours line is true and should be loud. */
  emergency: true,
} as const;

export function telLink(): string {
  return site.phoneDigits ? `tel:+${site.phoneDigits}` : "";
}

export function whatsappLink(message?: string): string {
  if (!site.phoneDigits) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.phoneDigits}${text}`;
}

/** What he fixes, in his own words. Used by the callout form. */
export const APPLIANCES = [
  { value: "aircon", label: "Air conditioner" },
  { value: "heat_pump", label: "Heat pump" },
  { value: "cold_room", label: "Cold room" },
  { value: "freezer_room", label: "Freezer room" },
  { value: "fridge", label: "Fridge" },
  { value: "freezer", label: "Freezer" },
  { value: "display_fridge", label: "Display or shop fridge" },
  { value: "other", label: "Something else" },
];

/** The questions asked on the phone before anyone books. */
export const FAQS = [
  {
    q: "How soon can you come out?",
    a: "Phone and you will hear straight away. We are open around the clock, so a unit that fails at night is not waiting until morning to be looked at.",
  },
  {
    q: "What does a callout cost?",
    a: "The quote is free. We find out what is actually wrong first, tell you what the repair costs, and only start once you have said yes.",
  },
  {
    q: "Do you work on my make?",
    a: "All makes and models, domestic and commercial. Aircon, heat pumps, cold rooms, freezer rooms, fridges, freezers and display fridges.",
  },
  {
    q: "Do I have to bring the unit to you?",
    a: "No. Most work is done where the unit stands. Only something that genuinely needs the workshop bench comes back with us, and we say so before it moves.",
  },
  {
    q: "What if it cannot be fixed?",
    a: "You will be told plainly, with the reason, and what a replacement would cost instead. Nobody pays for parts thrown at a unit that was never going to come back.",
  },
  {
    q: "Which areas do you cover?",
    a: `${site.areas.join(", ")} and the areas around them. If you are not on that list, phone anyway and you will get a straight answer.`,
  },
];
