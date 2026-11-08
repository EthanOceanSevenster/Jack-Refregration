import { site } from "@/lib/site";

/*
 * The Jack Cool mark: a thermometer with cold air coming off it.
 *
 * Temperature under control is the whole job, whether that is a cold room at
 * minus eighteen or an office at twenty-two, so the mark says that rather
 * than saying snow. Layered on purpose - gradient, sheen, lit inner rim,
 * shaded outer edge - so it reads as a made object rather than flat clip art.
 *
 * Drawn at 48 units and legible down to a browser tab: the waves fade out
 * before the thermometer does.
 */

/** Three waves of cold air, used in the mark and on their own as decoration. */
function Waves({
  strokeWidth = 2.4,
  x = 11,
  width = 6,
}: {
  strokeWidth?: number;
  x?: number;
  width?: number;
}) {
  const rows = [
    { y: 17, opacity: 0.95 },
    { y: 24, opacity: 0.95 },
    { y: 31, opacity: 0.7 },
  ];
  return (
    <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
      {rows.map((row) => (
        <path
          key={row.y}
          d={`M ${x} ${row.y} q ${width / 2} -3.5 ${width} 0`}
          opacity={row.opacity}
        />
      ))}
    </g>
  );
}

/** The thermometer, in whatever colour it inherits. */
function Thermometer() {
  return (
    <g>
      <rect x="25" y="9.5" width="7" height="20" rx="3.5" fill="currentColor" />
      <circle cx="28.5" cy="33" r="6.5" fill="currentColor" />
      {/* The column, cut back into the white so the bulb reads as a bulb. */}
      <line
        x1="28.5"
        y1="21.5"
        x2="28.5"
        y2="33"
        stroke="#0a4f86"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </g>
  );
}

/** The mark proper: thermometer and cold air in the brand roundel. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="jc-badge" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#4cb8f7" />
          <stop offset="0.45" stopColor="#1683cf" />
          <stop offset="1" stopColor="#07416f" />
        </linearGradient>
        <radialGradient id="jc-sheen" cx="0.3" cy="0.18" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="24" cy="24" r="23" fill="url(#jc-badge)" />
      <circle cx="24" cy="24" r="23" fill="url(#jc-sheen)" />
      <circle
        cx="24"
        cy="24"
        r="21.4"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="0.9"
      />
      <circle
        cx="24"
        cy="24"
        r="23"
        fill="none"
        stroke="#032b4b"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />

      <g className="text-white">
        <Thermometer />
        <Waves />
      </g>
    </svg>
  );
}

/**
 * The cold air on its own, for decoration.
 *
 * Takes its colour from the text colour, so it can sit in a dark band at a
 * very low opacity without dragging a solid badge along with it.
 */
export function ColdWavesGlyph({
  className = "h-10 w-10",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <Waves strokeWidth={strokeWidth} x={7} width={34} />
    </svg>
  );
}

/**
 * Mark plus wordmark.
 *
 * JACK carries the weight and COOL steps back into the brand blue, so the
 * two read as one name rather than two words fighting. The rule and the line
 * underneath say what the business does, because the name alone does not.
 */
export function Logo({
  inverse = false,
  showStrapline = true,
}: {
  inverse?: boolean;
  showStrapline?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="leading-none">
        <span
          className={`block text-[1.2rem] font-black uppercase tracking-[0.02em] sm:text-[1.3rem] ${
            inverse ? "text-white" : "text-dark"
          }`}
        >
          Jack
          <span className={`font-light ${inverse ? "text-accent-light" : "text-accent"}`}>
            {" "}
            Cool
          </span>
        </span>
        {showStrapline ? (
          <span className="mt-1.5 hidden items-center gap-2 sm:flex">
            <span
              className={`h-px w-5 ${inverse ? "bg-accent-light/60" : "bg-accent/40"}`}
              aria-hidden="true"
            />
            <span
              className={`text-[0.58rem] font-bold uppercase tracking-[0.2em] ${
                inverse ? "text-white/55" : "text-gray-500"
              }`}
            >
              {site.tagline}
            </span>
          </span>
        ) : null}
      </span>
    </span>
  );
}
