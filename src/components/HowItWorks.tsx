export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">How it works</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Connect the pieces your existing systems keep separate.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <StepCard key={i} {...step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Collect",
    description:
      "Bring together activity from LLMs, agents, tools, OpenTelemetry, GitHub, Jira, deployments, and webhooks.",
    items: ["LLMs", "Agents", "Tools", "OpenTelemetry", "GitHub", "Jira", "Deployments", "Webhooks"],
    chain: null,
  },
  {
    number: "02",
    title: "Resolve",
    description:
      "Rethen builds relationships between events and entities across systems that use different identifiers.",
    items: null,
    chain: [
      { label: "Agent Run #8421" },
      { label: "PR #482" },
      { label: "Deployment #193" },
    ],
  },
  {
    number: "03",
    title: "Connect",
    description:
      "One piece of AI work can connect to many events, and one outcome can connect back to multiple executions.",
    items: null,
    chain: [
      { label: "3 agent executions" },
      { label: "1 PR" },
      { label: "1 deployment" },
      { label: "1 incident" },
    ],
  },
  {
    number: "04",
    title: "Investigate",
    description:
      "Start from wherever the question begins and follow the chain — forward from execution or backward from outcome.",
    items: null,
    chain: [
      { label: "Execution" },
      { label: "PR" },
      { label: "Deployment" },
      { label: "Incident" },
    ],
  },
];

function StepCard({
  number,
  title,
  description,
  items,
  chain,
  index,
}: {
  number: string;
  title: string;
  description: string;
  items: string[] | null;
  chain: { label: string }[] | null;
  index: number;
}) {
  return (
    <div className="border-b border-r border-[var(--border)] bg-white p-7 hover:bg-[var(--ivory)] transition-colors first-of-type:border-l">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[11px] font-mono text-[var(--accent)] font-medium">{number}</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <h3 className="text-[18px] font-medium text-[var(--charcoal)] mb-3">{title}</h3>
      <p className="text-[13px] text-[var(--graphite)] leading-relaxed font-light mb-5">
        {description}
      </p>

      {items && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="text-[10px] font-mono border border-[var(--border)] px-2 py-0.5 text-[var(--soft-gray)]"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {chain && (
        <div className="flex flex-col gap-0">
          {chain.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                {i < chain.length - 1 && <div className="w-px h-5 bg-[var(--border)]" />}
              </div>
              <p className="text-[12px] font-mono text-[var(--graphite)] leading-tight mt-0.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
