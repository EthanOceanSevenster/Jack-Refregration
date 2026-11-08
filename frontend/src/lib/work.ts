/**
 * Jack's own photographs.
 *
 * Every one is his, taken on his jobs. Nothing is stock, and nothing is
 * illustrated. For a trade, a real photograph of a real installation is worth
 * more than any amount of design: it is the only proof a stranger has that
 * the person turning up knows what they are doing.
 *
 * Alt text describes what is actually in the frame, for anyone using a screen
 * reader and for search.
 */
export type WorkPhoto = {
  src: string;
  alt: string;
  /** Shown over the image in the gallery. Kept short. */
  caption: string;
  /**
   * Which filter buttons this photograph answers to. A photograph with no
   * tags still shows under "All": better an untagged picture than one filed
   * under a trade it does not actually show.
   */
  tags?: WorkTag[];
};

export type WorkTag = "aircon" | "cold-room" | "panel" | "workshop";

/** The filter buttons, in the order they read best. */
export const WORK_TAGS: { value: WorkTag; label: string }[] = [
  { value: "aircon", label: "Aircon" },
  { value: "cold-room", label: "Cold rooms" },
  { value: "panel", label: "Control panels" },
  { value: "workshop", label: "Workshop" },
];

export const HERO_PHOTO: WorkPhoto = {
  src: "/work/on-site-gauges.jpg",
  alt: "Technician charging a cold room condensing unit on site, manifold gauges in hand",
  caption: "On site, charging a cold room unit",
};

export const WORK: WorkPhoto[] = [
  {
    src: "/work/condensing-unit-install.jpg",
    alt: "Commercial condensing unit mounted on a wall bracket above a large condenser fan",
    caption: "Condensing unit installation",
    tags: ["cold-room"],
  },
  {
    // Proof of the 24 hours claim, which is otherwise just a sentence.
    src: "/work/work-05.jpg",
    alt: "Technician at night carrying manifold gauges and a refrigerant cylinder on a callout",
    caption: "Night callout",
    tags: ["cold-room"],
  },
  {
    src: "/work/workshop-bench.jpg",
    alt: "Workshop bench with several condensing units being built and repaired",
    caption: "Units rebuilt in the workshop",
    tags: ["workshop"],
  },
  {
    src: "/work/work-07.jpg",
    alt: "Technician on a ladder installing an air conditioning unit on a brick wall",
    caption: "Aircon installation",
    tags: ["aircon"],
  },
  {
    src: "/work/work-08.jpg",
    alt: "Outdoor air conditioning unit opened up for servicing",
    caption: "Aircon servicing",
    tags: ["aircon"],
  },
  {
    src: "/work/control-panel.jpg",
    alt: "Refrigeration control panel wired with breakers, contactor, overload and defrost timer",
    caption: "Control panels wired properly",
    tags: ["panel"],
  },
  {
    src: "/work/work-09.jpg",
    alt: "Refrigeration control panel being worked on in place",
    caption: "Panel work on site",
    tags: ["panel"],
  },
  {
    src: "/work/work-06.jpg",
    alt: "Refrigeration work by Jack Cool",
    caption: "On the job",
  },
  {
    src: "/work/work-10.jpg",
    alt: "Refrigeration work by Jack Cool",
    caption: "On the job",
  },
];
