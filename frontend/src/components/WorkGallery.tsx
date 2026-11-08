"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { WORK, WORK_TAGS, type WorkTag } from "@/lib/work";

/**
 * Jack's own photographs of his own jobs.
 *
 * This is the most persuasive thing on the site and it cost nothing to make.
 * Somebody deciding whether to let a stranger into their house, or trust him
 * with a cold room full of stock, wants to see the work before they phone.
 *
 * Portrait and landscape shots are mixed, so every tile is forced to the same
 * aspect and cropped to fill. A grid of different heights reads as an
 * accident rather than a decision. Tapping a tile opens the whole frame,
 * because the crop is for the grid, not for the viewer.
 */
export function WorkGallery({
  limit,
  filterable = false,
}: {
  limit?: number;
  /** The gallery page filters; the home page preview does not. */
  filterable?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [tag, setTag] = useState<WorkTag | null>(null);

  const shown = tag ? WORK.filter((photo) => photo.tags?.includes(tag)) : WORK;
  const photos = limit ? shown.slice(0, limit) : shown;

  const close = useCallback(() => setOpen(null), []);
  const count = photos.length;
  const step = useCallback(
    (by: number) => setOpen((current) => (current === null ? null : (current + by + count) % count)),
    [count],
  );

  // Keys while the lightbox is up, and no scrolling the page behind it.
  useEffect(() => {
    if (open === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, close, step]);

  const photo = open === null ? null : photos[open];

  function choose(next: WorkTag | null) {
    setOpen(null);
    setTag(next);
  }

  return (
    <>
      {filterable ? (
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          <button
            type="button"
            onClick={() => choose(null)}
            aria-pressed={tag === null}
            className={filterClass(tag === null)}
          >
            All
          </button>
          {WORK_TAGS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => choose(item.value)}
              aria-pressed={tag === item.value}
              className={filterClass(tag === item.value)}
            >
              {item.label}
              <span className="ml-2 text-xs opacity-60">
                {WORK.filter((photo) => photo.tags?.includes(item.value)).length}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View photograph: ${item.caption}`}
              className="group relative block w-full overflow-hidden rounded-[10px] border border-gray-200 bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 30vw, 50vw"
                // The first few are above the fold on a laptop once somebody
                // scrolls; the rest can wait until they are needed.
                loading={index < 3 ? "eager" : "lazy"}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-10 text-left text-xs font-medium text-white sm:px-4 sm:text-sm">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {photo ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          className="fixed inset-0 z-[60] flex flex-col bg-black/92 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
            <p className="text-sm font-medium">
              {photo.caption}
              <span className="ml-3 text-white/40">
                {(open ?? 0) + 1} / {count}
              </span>
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1" onClick={(event) => event.stopPropagation()}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain px-3 pb-3"
            />
          </div>

          <div
            className="flex items-center justify-center gap-3 px-5 py-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function filterClass(active: boolean) {
  /*
   * Utilities only, no .tag: a plain rule in the stylesheet beats a Tailwind
   * utility in a layer, so the pill kept its white background and the white
   * label disappeared into it.
   */
  return `inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-accent bg-accent text-white"
      : "border-gray-200 bg-white text-dark hover:border-accent hover:text-accent"
  }`;
}
