"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { MonoLabel } from "./ui/MonoLabel";
import { cn } from "@/lib/utils";

const projectTypes = [
  { value: "web", label: "Web platform", note: "Marketing site, web app, e-commerce" },
  { value: "mobile", label: "Mobile app", note: "iOS, Android, or both" },
  { value: "growth", label: "Growth & marketing", note: "SEO, paid, CRO retainer" },
  { value: "unsure", label: "Not sure yet", note: "You have a problem, not a spec — good" },
];

const budgets = [
  { value: "under-99", label: "Under $99" },
  { value: "99-500", label: "$99 – $500" },
  { value: "500-2000", label: "$500 – $2,000" },
  { value: "2000-10000", label: "$2,000 – $10,000" },
  { value: "over-10000", label: "$10,000+" },
];

const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "quarter", label: "Within this quarter" },
  { value: "half", label: "Next 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

type FormData = {
  projectType: string;
  budget: string;
  timeline: string;
  brief: string;
  name: string;
  company: string;
  email: string;
};

const initial: FormData = {
  projectType: "",
  budget: "",
  timeline: "",
  brief: "",
  name: "",
  company: "",
  email: "",
};

const labelOf = (opts: { value: string; label: string }[], value: string) =>
  opts.find((o) => o.value === value)?.label ?? value;

const stepTitles = [
  "What are we building?",
  "What's the budget range?",
  "Timeline and shape of the work",
  "Where do we send the plan?",
];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [brief, setBrief] = useState<{ subject: string; body: string; href: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, submitted]);

  const set = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setError(null);
  };

  const validate = (): string | null => {
    if (step === 0 && !data.projectType) return "Pick the closest fit — it just routes the conversation.";
    if (step === 1 && !data.budget) return "A range is enough. It determines what we recommend.";
    if (step === 2 && !data.timeline) return "Pick a timeline — 'just exploring' is a fine answer.";
    if (step === 3) {
      if (!data.name.trim()) return "We need a name to reply to.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "That email doesn't look right.";
    }
    return null;
  };

  const next = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    if (step < 3) setStep(step + 1);
    else {
      // No form backend is configured, so the brief is handed to the visitor's
      // mail client addressed to the studio inbox, with a copyable fallback.
      const who = `${data.name.trim()}${data.company.trim() ? ` (${data.company.trim()})` : ""}`;
      const subject = `Project brief — ${who}`;
      const body = [
        `Project type: ${labelOf(projectTypes, data.projectType)}`,
        `Budget: ${labelOf(budgets, data.budget)}`,
        `Timeline: ${labelOf(timelines, data.timeline)}`,
        "",
        data.brief.trim() || "(No written brief — happy to talk it through.)",
        "",
        `— ${who}`,
        data.email.trim(),
      ].join("\n");
      const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setBrief({ subject, body, href });
      setSubmitted(true);
      window.location.href = href;
    }
  };

  if (submitted && brief) {
    return (
      <div aria-live="polite" className="rounded-tile bg-tone-2 p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent">
          <Check className="size-6 text-white" aria-hidden />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-[32px] font-semibold tracking-[-0.02em] outline-none md:text-[40px]">
          Your brief is ready, {data.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.47] text-mute">
          Your mail app should have opened with everything filled in — press send, and a real
          reply from a real person follows within {site.anchors.responseTime}, usually sooner.
        </p>
        <div className="mt-6 rounded-card bg-tone p-5">
          <p className="text-sm leading-relaxed">
            <span className="font-medium">Nothing opened?</span>{" "}
            <span className="text-mute">
              Email it to{" "}
              <a href={brief.href} className="u-link">
                {site.email}
              </a>{" "}
              — here is your brief, ready to paste:
            </span>
          </p>
          <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-mute">
            {brief.body}
          </pre>
        </div>
        <div className="mt-8 border-t border-line pt-6">
          <MonoLabel>What happens next</MonoLabel>
          <ol className="mt-4 space-y-3">
            {[
              "We read your brief and check honest fit — capacity, budget, expertise.",
              "A 30-minute call with a principal. No account managers, no deck.",
              "If it's a fit: a two-week discovery with a fixed quote at the end.",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 text-[15px]">
                <span className="text-[12px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-mute">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      noValidate
    >
      {/* Progress */}
      <div className="flex items-center justify-between">
        <MonoLabel aria-hidden>
          Step {step + 1} / 4
        </MonoLabel>
        <div aria-hidden className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1 w-10 rounded-full transition-colors duration-500",
                i <= step ? "bg-accent" : "bg-control",
              )}
            />
          ))}
        </div>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-[28px] font-semibold tracking-[-0.02em] outline-none md:text-[32px]"
        aria-label={`Step ${step + 1} of 4: ${stepTitles[step]}`}
      >
        {stepTitles[step]}
      </h2>

      <div className="mt-8 min-h-[300px]">
        {/* Step 1 — project type */}
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Project type</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectTypes.map((type) => (
                <label
                  key={type.value}
                  className={cn(
                    "cursor-pointer rounded-card border p-5 transition-all duration-300",
                    data.projectType === type.value
                      ? "border-accent bg-accent/5"
                      : "border-line hover:border-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={type.value}
                    checked={data.projectType === type.value}
                    onChange={() => set({ projectType: type.value })}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between">
                    <span className="font-medium">{type.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border transition-colors",
                        data.projectType === type.value ? "border-accent bg-accent" : "border-line-strong",
                      )}
                    />
                  </span>
                  <span className="mt-1 block text-sm text-mute">{type.note}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 2 — budget band */}
        {step === 1 && (
          <fieldset>
            <legend className="sr-only">Budget range</legend>
            <div className="flex flex-wrap gap-3">
              {budgets.map((b) => (
                <label
                  key={b.value}
                  className={cn(
                    "cursor-pointer rounded-full border px-5 py-3 font-medium transition-all duration-300",
                    data.budget === b.value
                      ? "border-accent bg-accent text-white"
                      : "border-line hover:border-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={b.value}
                    checked={data.budget === b.value}
                    onChange={() => set({ budget: b.value })}
                    className="sr-only"
                  />
                  {b.label}
                </label>
              ))}
            </div>
            {data.budget === "under-99" && (
              <div className="mt-6 rounded-card bg-tone-2 p-5" role="status">
                <p className="text-sm leading-relaxed">
                  <span className="font-medium">Honest note:</span>{" "}
                  <span className="text-mute">
                    our engagements start at {site.anchors.projectMinimum}, and we&apos;d rather
                    tell you here than after a call. Under that, a well-executed template usually
                    beats a thin custom build — and when the business is ready, we&apos;ll still be
                    here. You can continue anyway if you&apos;d like us to keep you in mind.
                  </span>
                </p>
              </div>
            )}
            <p className="mt-6 text-[12px] text-mute">
              Ranges only — a fixed quote comes after discovery, in writing.
            </p>
          </fieldset>
        )}

        {/* Step 3 — timeline + brief */}
        {step === 2 && (
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 block text-sm font-medium">When does this need to exist?</legend>
              <div className="flex flex-wrap gap-3">
                {timelines.map((t) => (
                  <label
                    key={t.value}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                      data.timeline === t.value
                        ? "border-accent bg-accent/5 text-fg"
                        : "border-line text-mute hover:border-line-strong hover:text-fg",
                    )}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={t.value}
                      checked={data.timeline === t.value}
                      onChange={() => set({ timeline: t.value })}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="brief" className="block text-sm font-medium">
                What needs to exist? <span className="font-normal text-mute">(optional, but it helps)</span>
              </label>
              <textarea
                id="brief"
                rows={5}
                value={data.brief}
                onChange={(e) => set({ brief: e.target.value })}
                placeholder="The problem, the audience, the number you want to move. Plain language beats a spec."
                className="mt-3 w-full resize-y rounded-[12px] border border-line-strong bg-tone p-4 text-[17px] placeholder:text-mute/60 focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 4 — contact */}
        {step === 3 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) => set({ name: e.target.value })}
                className="mt-2 w-full rounded-[12px] border border-line-strong bg-tone p-3.5 text-[17px] focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium">
                Company <span className="font-normal text-mute">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => set({ company: e.target.value })}
                className="mt-2 w-full rounded-[12px] border border-line-strong bg-tone p-3.5 text-[17px] focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => set({ email: e.target.value })}
                aria-describedby={error ? "form-error" : undefined}
                className="mt-2 w-full rounded-[12px] border border-line-strong bg-tone p-3.5 text-[17px] focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p id="form-error" role="alert" className="mt-4 text-sm text-[#e30000]">
          {error}
        </p>
      )}

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setStep(step - 1);
              setError(null);
            }}
            className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-[17px] text-white transition-colors duration-300 hover:bg-accent-hover"
        >
          {step === 3 ? "Send the brief" : "Continue"}
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </form>
  );
}
