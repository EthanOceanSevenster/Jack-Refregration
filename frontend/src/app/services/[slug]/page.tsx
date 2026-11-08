import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { STEPS } from "@/lib/content";
import { SERVICES, serviceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { WORK } from "@/lib/work";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const photos = WORK.filter((photo) => service.photos.includes(photo.src));
  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHeader
        label="Service"
        title={service.title}
        text={service.summary}
        crumb={{ href: "/services", label: "Services" }}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {service.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mb-5 text-[1.05rem] leading-relaxed text-gray-700 last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 text-[1.4rem] font-black tracking-[-0.3px]">
              What we do
            </h2>
            <ul className="mt-5 space-y-3">
              {service.work.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-gray-700">
                  <CircleCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="core-card">
              <h2 className="text-[1.15rem] font-extrabold">Signs it needs looking at</h2>
              <ul className="mt-5 space-y-3">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 text-[0.9rem] text-gray-600">
                    <CircleAlert
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {sign}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-gray-200 pt-5 text-sm leading-relaxed text-gray-600">
                Any of these is worth a phone call. {site.hours}, and the quote before
                the work is free.
              </p>
            </div>

            {photos.length > 0 ? (
              <ul className="mt-6 grid grid-cols-2 gap-4">
                {photos.map((photo) => (
                  <li
                    key={photo.src}
                    className="overflow-hidden rounded-[10px] border border-gray-200"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={800}
                      height={800}
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="aspect-square w-full object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <SectionHeader
            label="The visit"
            title="How a callout goes"
            text="The same four steps whether it is a fridge in a kitchen or a cold room in a shop."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <article key={step.title} className="service-card">
                <div className="flex items-center gap-3">
                  <span className="core-icon h-10 w-10 rounded-[10px]">
                    <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader label="Also" title="The other work we do" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="service-card group"
              >
                <span className="core-icon h-10 w-10 rounded-[10px]">
                  <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="mt-4 block font-bold">{item.title}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`${service.title} not working? Phone now.`} />
    </>
  );
}
