import { ColdWavesGlyph } from "@/components/Logo";

/**
 * Decorative background for the dark hero: two cold glows, a faint grid, and
 * a few drifts of cold air, moving very slowly.
 *
 * All of it is drawn rather than photographed, so it costs nothing to load
 * and never fights the headline sitting on top of it. The drift is switched
 * off for visitors who prefer reduced motion (see globals.css).
 */
const DRIFTS = [
  { className: "right-[4%] top-[14%] h-48 w-48 opacity-[0.07]", delay: "0s" },
  { className: "right-[30%] top-[64%] h-32 w-32 opacity-[0.05]", delay: "-6s" },
  { className: "left-[3%] top-[26%] hidden h-36 w-36 opacity-[0.04] lg:block", delay: "-11s" },
];

export function FrostBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="frost frost-a" />
      <span className="frost frost-b" />
      <div className="hero-grid absolute inset-0" />

      {DRIFTS.map((flake) => (
        <div
          key={flake.className}
          className={`drift absolute text-white ${flake.className}`}
          style={{ animationDelay: flake.delay }}
        >
          <ColdWavesGlyph className="h-full w-full" strokeWidth={1.4} />
        </div>
      ))}
    </div>
  );
}
