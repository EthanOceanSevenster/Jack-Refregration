import { Phone } from "lucide-react";

import { site, telLink } from "@/lib/site";

/**
 * The bar pinned to the bottom of every phone screen.
 *
 * Nearly everybody who lands here is on a phone, holding the thing that makes
 * the call, and most of them are standing in front of a unit that has
 * stopped. Making them scroll back up to find a number loses the job. On a
 * laptop the header already carries the number, so this stays on phones.
 */
export function CallBar() {
  const tel = telLink();

  if (!tel) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b1118]/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      {/* WhatsApp has its own floating button just above this bar, so this
          one is only the call, full width and impossible to miss. */}
      <a href={tel} className="btn btn-primary w-full py-3.5 text-[0.9rem]">
        <Phone className="h-4.5 w-4.5" aria-hidden="true" />
        Call {site.phone}
      </a>
    </div>
  );
}
