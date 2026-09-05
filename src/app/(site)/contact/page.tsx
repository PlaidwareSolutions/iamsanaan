import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getFaqs } from "@/data/faqs";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Four questions, two minutes, and a reply from a principal within one business day. Engagements from $99.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title="Four questions. Two minutes. A real reply."
        intro={`Skip the “how can we help you today” theater. Tell us what needs to exist and what it’s worth to you — a principal reads every brief and replies within ${site.anchors.responseTime}.`}
      />

      <Section tone="paper" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
            <div className="tile p-6">
              <MonoLabel>Prefer directly</MonoLabel>
              <a href={`mailto:${site.email}`} className="u-link mt-3 block text-[19px] font-semibold">
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="mt-1 block text-[17px] text-mute transition-colors hover:text-fg"
              >
                {site.phone}
              </a>
            </div>

            <div className="tile p-6">
              <MonoLabel>Studio</MonoLabel>
              <p className="mt-3 text-[15px] leading-[1.47] text-mute">{site.address}</p>
              <p className="mt-1 text-[12px] text-mute">Mon–Fri · 9–6 CT · visitors welcome by appointment</p>
            </div>

            <div className="tile p-6">
              <MonoLabel>Before you write</MonoLabel>
              <ul className="mt-4 space-y-3 text-[15px] leading-[1.47] text-mute">
                <li>
                  Engagements start at <span className="text-fg">{site.anchors.projectMinimum}</span>{" "}
                  — projects — and <span className="text-fg">{site.anchors.retainerMinimum}</span> for
                  growth retainers.
                </li>
                <li>
                  A principal replies within <span className="text-fg">{site.anchors.responseTime}</span>.
                  No automated sequences, no SDRs.
                </li>
                <li>Agencies: mention white-label in the brief — same form, partner terms.</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Final objections at the point of conversion */}
      <Section tone="gray" eyebrow="Last-minute doubts" title="Read before you hesitate.">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[40ch] text-[17px] leading-[1.47] text-mute">
              The four answers that usually close the tab — or open the conversation.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={getFaqs(["ownership", "team", "overrun", "support"])} />
          </div>
        </div>
      </Section>
    </>
  );
}
