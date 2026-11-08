import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "How soon we can come, what a callout costs, which makes we work on, and what happens if a unit cannot be fixed.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        label="Questions"
        title="Asked before every booking"
        text="Everything people ring up to ask before they book, answered straight. If yours is not here, phone and ask it."
      />

      <section className="section">
        <div className="container">
          <Faq />
        </div>
      </section>

      <CtaBand title="Still not sure? Phone and ask." />
    </>
  );
}
