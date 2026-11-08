import { ChevronDown } from "lucide-react";

import { FAQS } from "@/lib/site";

/**
 * The questions he answers on the phone twenty times a week.
 *
 * Native <details>, so it opens with no JavaScript, is keyboard operable and
 * is read correctly by a screen reader. Somebody who finds the answer here
 * phones already half sold, instead of phoning to ask and then thinking
 * about it.
 */
export function Faq({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold transition-colors hover:text-accent sm:px-7">
            {item.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-gray-600 sm:px-7">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
