"use client";

import { useState } from "react";

const useCases = [
  {
    id: "engineering",
    title: "Engineering",
    desc: "Understand what AI changed before production changed.",
    chain: [
      { label: "Agent", tag: "EXEC" },
      { label: "PR #482", tag: "GH" },
      { label: "CI pipeline", tag: "CI" },
      { label: "Deployment #193", tag: "DEPLOY" },
      { label: "Incident #91", tag: "INC", incident: true },
    ],
    details:
      "When a deployment breaks production, reconstruct every agent execution that contributed — from model calls to the PR that triggered the deploy.",
  },
  {
    id: "support",
    title: "Support",
    desc: "Connect AI activity with what happened to the customer.",
    chain: [
      { label: "Agent", tag: "EXEC" },
      { label: "Customer action", tag: "ACT" },
      { label: "Ticket", tag: "TICKET" },
      { label: "Escalation", tag: "ESC" },
      { label: "Resolution", tag: "RES", accent: true },
    ],
    details:
      "Trace the autonomous actions that touched a customer's account before a support ticket appeared. Understand the sequence without manually correlating logs.",
  },
  {
    id: "operations",
    title: "Operations",
    desc: "Follow autonomous workflows across systems.",
    chain: [
      { label: "Agent", tag: "EXEC" },
      { label: "API call", tag: "API" },
      { label: "Database write", tag: "DB" },
      { label: "Workflow", tag: "WF" },
      { label: "Business outcome", tag: "OUT", accent: true },
    ],
    details:
      "For teams running autonomous workflows end-to-end: track each step, identify where things diverged from expected behavior, and attribute outcomes back to specific executions.",
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const uc = useCases[active];

  return (
    <section id="use-cases" className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="chip mb-5">Use cases</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Built for teams deploying agents into real systems.
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex border border-[var(--border)] w-fit mb-0">
          {useCases.map((uc, i) => (
            <button
              key={uc.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-[12px] font-mono transition-colors border-r border-[var(--border)] last:border-r-0 ${
                active === i
                  ? "bg-[var(--charcoal)] text-[var(--ivory)]"
                  : "text-[var(--graphite)] hover:bg-white"
              }`}
            >
              {uc.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-[var(--border)] border-t-0">
          {/* Left: info */}
          <div className="border-r border-[var(--border)] p-8 bg-white">
            <h3 className="text-[20px] font-medium text-[var(--charcoal)] mb-3">{uc.title}</h3>
            <p className="text-[15px] text-[var(--graphite)] font-light mb-6">{uc.desc}</p>
            <p className="text-[13px] text-[var(--graphite)] leading-relaxed font-light">
              {uc.details}
            </p>
          </div>

          {/* Right: chain */}
          <div className="p-8 bg-[var(--off-white)]">
            <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-5">
              Activity chain
            </p>
            <div className="flex flex-col gap-0">
              {uc.chain.map((item, i) => (
                <UseCaseChainItem
                  key={i}
                  label={item.label}
                  tag={item.tag}
                  last={i === uc.chain.length - 1}
                  incident={"incident" in item && !!item.incident}
                  accent={"accent" in item && !!item.accent}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCaseChainItem({
  label,
  tag,
  last,
  incident,
  accent,
}: {
  label: string;
  tag: string;
  last?: boolean;
  incident?: boolean;
  accent?: boolean;
}) {
  const tagBg = incident
    ? "bg-red-600 text-white"
    : accent
    ? "bg-[var(--accent)] text-white"
    : "bg-[var(--charcoal)] text-white";

  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${
            incident ? "bg-red-600" : accent ? "bg-[var(--accent)]" : "bg-[var(--charcoal)]"
          }`}
        >
          <span className="text-[6px] font-mono text-white font-bold tracking-wider">
            {tag.slice(0, 2)}
          </span>
        </div>
        {!last && <div className="w-px h-6 bg-[var(--border)]" />}
      </div>
      <p
        className={`text-[13px] leading-tight mt-0.5 font-light ${
          incident ? "text-red-700 font-medium" : "text-[var(--charcoal)]"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
