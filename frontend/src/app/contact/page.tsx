import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { CalloutForm } from "@/components/CalloutForm";
import { PageHeader } from "@/components/PageHeader";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a callout",
  description:
    "Phone, WhatsApp, or send your details and we will call you back. Open 24 hours for emergency callouts.",
};

export default function ContactPage() {
  const tel = telLink();
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  return (
    <>
      <PageHeader
        label="Contact"
        title="Book a callout"
        text="Phoning is quickest and it rings straight away, day or night. The form is here for when you would rather type than talk."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-[1.4rem] font-black tracking-[-0.3px]">
              Tell us what it is doing
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-600">
              Name, number and what has gone wrong. Everything else can be asked on
              the callback.
            </p>
            <div className="mt-8">
              <CalloutForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="core-card">
              <h2 className="text-[1.15rem] font-extrabold">Faster to phone</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-gray-600">
                If your unit is off right now, ring rather than fill in a form. It is
                answered around the clock.
              </p>

              <div className="mt-6 space-y-2.5">
                {tel ? (
                  <a href={tel} className="btn btn-dark w-full">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {site.phone}
                  </a>
                ) : null}
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp w-full"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp the same number
                  </a>
                ) : null}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm text-gray-600">
                <p className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {site.hours}, seven days a week
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {site.areas.join(", ")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
