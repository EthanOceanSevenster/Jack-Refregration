import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { site, telLink, whatsappLink } from "@/lib/site";

/**
 * The accent band that closes every page.
 *
 * Whatever somebody was reading, the next step is the same one, so it is
 * always the same block in the same colour and they stop having to look for
 * it.
 */
export function CtaBand({
  title = "Not cooling? Phone now.",
  text,
}: {
  title?: string;
  text?: string;
}) {
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  return (
    <section className="bg-accent px-5 py-16 text-white sm:px-8">
      <div className="container text-center">
        <h2 className="text-[1.9rem] font-black leading-tight sm:text-[2.2rem]">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          {text ??
            `${site.hours}, seven days a week. You will be told honestly whether it is worth a callout before you pay for one.`}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {tel ? (
            <a href={tel} className="btn bg-white font-bold text-accent hover:bg-gray-100">
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
              {site.phone}
            </a>
          ) : null}
          {wa ? (
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
              WhatsApp
            </a>
          ) : null}
          <Link
            href="/contact"
            className="btn border-[1.5px] border-white/40 text-white hover:bg-white/10"
          >
            Book a callout
          </Link>
        </div>
      </div>
    </section>
  );
}
