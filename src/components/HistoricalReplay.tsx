export function HistoricalReplay() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">Historical replay</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Your investigation should not depend on when you noticed the problem.
          </h2>
          <p className="text-[15px] text-[var(--graphite)] mt-4 font-light leading-relaxed max-w-lg">
            Rethen keeps raw activity separate from derived relationships, allowing historical
            analysis to be recalculated as your understanding changes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 mb-12">
          {/* Pipeline */}
          <div className="border border-[var(--border)] p-8 bg-white">
            <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-6">
              How replay works
            </p>
            <div className="flex flex-col gap-0">
              {[
                { label: "Raw events", desc: "Immutable activity log — never rewritten" },
                { label: "Relationship rules", desc: "Versioned, updatable attribution logic" },
                { label: "Attribution", desc: "Derived graph — recalculated on rule change" },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-6 h-6 border border-[var(--charcoal)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-mono text-[var(--charcoal)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-8 bg-[var(--border)]" />}
                  </div>
                  <div className="pt-0.5 pb-6">
                    <p className="text-[13px] font-medium text-[var(--charcoal)] leading-tight">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[var(--soft-gray)] font-mono mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rule comparison */}
          <div className="border border-[var(--border)] border-l-0 p-8 bg-white">
            <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-6">
              Rule version comparison
            </p>
            <div className="space-y-5">
              <RuleVersion
                version="Rule v1"
                desc="repo match only"
                count={82}
                pct={58}
              />
              <RuleVersion
                version="Rule v2"
                desc="repo + time window"
                count={117}
                pct={82}
                active
              />
              <div className="pt-2 border-t border-[var(--border)]">
                <p className="text-[11px] font-mono text-[var(--soft-gray)]">
                  +35 additional outcomes attributed by refining the rule
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-[14px] text-[var(--graphite)] leading-relaxed font-light">
            Raw event storage is separate from the derived relationship graph. When attribution
            rules improve, the graph is recalculated against the full historical dataset — no
            data is lost and no manual backfilling is required.
          </p>
        </div>
      </div>
    </section>
  );
}

function RuleVersion({
  version,
  desc,
  count,
  pct,
  active,
}: {
  version: string;
  desc: string;
  count: number;
  pct: number;
  active?: boolean;
}) {
  return (
    <div
      className={`p-4 border transition-colors ${
        active ? "border-[var(--accent)] bg-[var(--accent-pale)]" : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span
            className={`text-[11px] font-mono font-medium ${
              active ? "text-[var(--accent)]" : "text-[var(--soft-gray)]"
            }`}
          >
            {version}
          </span>
          <span className="text-[10px] font-mono text-[var(--soft-gray)] ml-2">{desc}</span>
        </div>
        <span className="text-[13px] font-mono text-[var(--charcoal)]">{count} outcomes</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            active ? "bg-[var(--accent)]" : "bg-[var(--soft-gray)]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
