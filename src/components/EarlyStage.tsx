export function EarlyStage() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="chip mb-5">Early stage</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)] mb-6">
              We are early.
            </h2>
            <p className="text-[16px] text-[var(--graphite)] leading-relaxed font-light mb-4">
              Rethen is being built around a problem we believe will become more important as
              autonomous software moves deeper into production.
            </p>
            <p className="text-[16px] text-[var(--graphite)] leading-relaxed font-light mb-8">
              We are currently building the infrastructure, testing the model with real workflows,
              and learning where teams feel the problem most strongly.
            </p>
            <a
              href="#early-access"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--charcoal)] border-b border-[var(--charcoal)] pb-0.5 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              Talk to us about how you&apos;re tracking agent activity
              <span>→</span>
            </a>
          </div>

          {/* What we are / aren't */}
          <div className="border border-[var(--border)] divide-y divide-[var(--border)]">
            <div className="px-6 py-4">
              <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest">
                Where we are today
              </p>
            </div>
            {stages.map((s, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4">
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    s.done ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                  }`}
                />
                <div>
                  <p
                    className={`text-[13px] font-medium leading-tight ${
                      s.done ? "text-[var(--charcoal)]" : "text-[var(--soft-gray)]"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-[11px] font-mono text-[var(--soft-gray)] mt-0.5">
                    {s.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const stages = [
  { label: "Core event collection infrastructure", status: "In progress", done: true },
  { label: "Relationship resolution engine", status: "In progress", done: true },
  { label: "GitHub & OpenTelemetry integration", status: "In progress", done: true },
  { label: "Investigation interface", status: "Prototype", done: true },
  { label: "Historical replay & backfill", status: "Planned", done: false },
  { label: "Attribution rule versioning", status: "Planned", done: false },
  { label: "Multi-tenant deployment", status: "Planned", done: false },
];
