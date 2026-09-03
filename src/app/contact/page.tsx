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
    "Four questions, two minutes, and a reply from a principal within one business day. Engagements from $15,000.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title="Four questions. Two minutes. A real reply."
        intro={`Skip the "how can we help you today" theater. Tell us what needs to exist and what it's worth to you — a principal reads every brief and replies within ${site.anchors.responseTime}.`}
      />

      <Section tone="paper" seam={false} className="pt-16 md:pt-20 lg:pt-20">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Direct channels */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-line pt-6">
              <MonoLabel>Prefer directly</MonoLabel>
              <a
                href={`mailto:${site.email}`}
                className="u-link mt-3 block text-lg font-medium hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="mt-2 block text-lg text-mute transition-colors hover:text-fg"
              >
                {site.phone}
              </a>
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <MonoLabel>Studio</MonoLabel>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{site.address}</p>
              <p className="mt-1 font-mono text-[12px] text-mute">
                Mon–Fri · 9–6 CT · visitors welcome by appointment
              </p>
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <MonoLabel>Before you write</MonoLabel>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mute">
                <li>
                  Engagements start at{" "}
                  <span className="text-fg">{site.anchors.projectMinimum}</span> — projects — and{" "}
                  <span className="text-fg">{site.anchors.retainerMinimum}</span> for growth
                  retainers.
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
      <Section tone="paper" index="01" eyebrow="Last-minute doubts" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="headline text-3xl md:text-4xl">Read before you hesitate.</h2>
            <p className="mt-4 max-w-[40ch] text-mute">
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
