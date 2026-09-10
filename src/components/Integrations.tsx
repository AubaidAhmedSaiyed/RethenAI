export function Integrations() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="chip mb-5">Integrations</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Built to sit across your existing stack.
          </h2>
          <p className="text-[15px] text-[var(--graphite)] mt-4 font-light leading-relaxed max-w-lg">
            Rethen connects to the tools you already use. Below is an honest view of what works
            today and what is on the roadmap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Available */}
          <div className="border border-[var(--border)] p-8">
            <p className="text-[10px] font-mono text-[var(--charcoal)] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Available
            </p>
            <div className="grid grid-cols-2 gap-3">
              {available.map((i) => (
                <IntegrationBadge key={i.name} {...i} active />
              ))}
            </div>
          </div>

          {/* Planned */}
          <div className="border border-[var(--border)] border-l-0 p-8 bg-[var(--off-white)]">
            <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] inline-block" />
              Planned
            </p>
            <div className="grid grid-cols-2 gap-3">
              {planned.map((i) => (
                <IntegrationBadge key={i.name} {...i} active={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const available = [
  { name: "OpenAI", category: "LLM" },
  { name: "Anthropic", category: "LLM" },
  { name: "OpenTelemetry", category: "Tracing" },
  { name: "GitHub", category: "VCS" },
  { name: "Jira", category: "Tracking" },
  { name: "Webhooks", category: "Generic" },
];

const planned = [
  { name: "Google Gemini", category: "LLM" },
  { name: "GitLab", category: "VCS" },
  { name: "Linear", category: "Tracking" },
  { name: "PagerDuty", category: "Incidents" },
  { name: "Datadog", category: "Monitoring" },
  { name: "AWS CDK", category: "Deploy" },
];

function IntegrationBadge({
  name,
  category,
  active,
}: {
  name: string;
  category: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 border transition-colors ${
        active
          ? "border-[var(--border)] bg-white hover:border-[var(--charcoal)]"
          : "border-[var(--border)] bg-transparent opacity-60"
      }`}
    >
      <div>
        <p
          className={`text-[12px] font-medium ${
            active ? "text-[var(--charcoal)]" : "text-[var(--soft-gray)]"
          }`}
        >
          {name}
        </p>
        <p className="text-[9px] font-mono text-[var(--soft-gray)] uppercase tracking-widest">
          {category}
        </p>
      </div>
      {active && (
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
      )}
    </div>
  );
}
