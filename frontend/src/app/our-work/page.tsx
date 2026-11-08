import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { WorkGallery } from "@/components/WorkGallery";
import { WORK } from "@/lib/work";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Photographs from our own jobs: cold room installations, aircon work, control panels and workshop repairs.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        label="Our work"
        title="Photographs from our own jobs"
        text={`${WORK.length} photographs from our own jobs. Nothing is stock and nothing is borrowed. Filter by the kind of work and judge it for yourself.`}
      />

      <section className="section">
        <div className="container">
          <WorkGallery filterable />
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-gray-600">
            Tap any photograph to see the whole frame. Cold room and freezer room
            installations, condensing units, control panels wired properly, aircon
            installations and servicing, and units rebuilt on the workshop bench.
          </p>
        </div>
      </section>

      <CtaBand title="Want the same done properly?" />
    </>
  );
}
