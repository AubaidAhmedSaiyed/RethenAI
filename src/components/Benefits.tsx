export function Benefits() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="chip mb-5">What you get</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Know what your agents actually did.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {benefits.map((b, i) => (
            <BenefitCard key={i} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    title: "Follow AI work across systems.",
    body: "Trace agent activity past the execution boundary and into GitHub, CI/CD, deployments, and other external systems.",
  },
  {
    title: "Investigate incidents faster.",
    body: "Start from an alert or incident and navigate directly to the agent executions and tool calls that preceded it.",
  },
  {
    title: "Connect AI activity with real outcomes.",
    body: "Link autonomous work to engineering and business entities — PRs, deployments, tickets, incidents — not just trace spans.",
  },
  {
    title: "Keep the history you'll need later.",
    body: "Raw events are stored separately and durably. Investigations can happen hours, days, or weeks after the fact.",
  },
  {
    title: "Recalculate when rules change.",
    body: "Attribution rules are versioned. When your understanding of the system improves, replay the full history against updated logic.",
  },
  {
    title: "Build on your existing stack.",
    body: "Rethen connects to what you already have — OpenTelemetry, GitHub, Jira, deployment pipelines — without replacing them.",
  },
];

function BenefitCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="border-b border-r border-[var(--border)] p-7 hover:bg-[var(--off-white)] transition-colors first-of-type:border-l group">
      <div className="flex items-start gap-4">
        <div className="w-5 h-5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--accent)] transition-colors">
          <span className="text-[8px] font-mono text-[var(--soft-gray)] group-hover:text-[var(--accent)] transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[var(--charcoal)] leading-tight mb-2">
            {title}
          </p>
          <p className="text-[13px] text-[var(--graphite)] leading-relaxed font-light">{body}</p>
        </div>
      </div>
    </div>
  );
}
