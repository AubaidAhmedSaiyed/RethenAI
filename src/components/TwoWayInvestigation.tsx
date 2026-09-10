export function TwoWayInvestigation() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">Bidirectional</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Investigate from the AI or from the outcome.
          </h2>
          <p className="text-[15px] text-[var(--graphite)] mt-4 font-light leading-relaxed max-w-lg">
            Production questions rarely start in the same place. Rethen lets teams move through
            the chain in either direction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Forward: from AI */}
          <div className="border border-[var(--border)] p-8 bg-white">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[10px] font-mono text-[var(--charcoal)] tracking-widest uppercase font-medium">
                Starting from AI
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[10px] font-mono text-[var(--accent)]">→</span>
            </div>
            <div className="flex flex-col gap-0">
              {forwardChain.map((item, i) => (
                <DirectionNode key={i} {...item} last={i === forwardChain.length - 1} forward />
              ))}
            </div>
          </div>

          {/* Backward: from outcome */}
          <div className="border border-[var(--border)] border-l-0 p-8 bg-white">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[10px] font-mono text-[var(--charcoal)] tracking-widest uppercase font-medium">
                Starting from outcome
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[10px] font-mono text-red-500">←</span>
            </div>
            <div className="flex flex-col gap-0">
              {backwardChain.map((item, i) => (
                <DirectionNode key={i} {...item} last={i === backwardChain.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const forwardChain = [
  { label: "Agent", tag: "EXEC", accent: false },
  { label: "Execution", tag: "EXEC", accent: false },
  { label: "Tool calls", tag: "TOOL", accent: false },
  { label: "GitHub", tag: "GH", accent: true },
  { label: "Deployment", tag: "DEPLOY", accent: false },
  { label: "Outcome", tag: "OUT", accent: true },
];

const backwardChain = [
  { label: "Incident", tag: "INC", accent: false, incident: true },
  { label: "Deployment", tag: "DEPLOY", accent: false },
  { label: "PR", tag: "GH", accent: false },
  { label: "Agent execution", tag: "EXEC", accent: false },
  { label: "Tool calls", tag: "TOOL", accent: false },
  { label: "LLM activity", tag: "LLM", accent: true },
];

function DirectionNode({
  label,
  tag,
  accent,
  incident,
  last,
  forward,
}: {
  label: string;
  tag: string;
  accent?: boolean;
  incident?: boolean;
  last?: boolean;
  forward?: boolean;
}) {
  const tagBg = incident
    ? "bg-red-600 text-white"
    : accent
    ? "bg-[var(--accent)] text-white"
    : "bg-[var(--border)] text-[var(--soft-gray)]";

  return (
    <div className="flex items-start gap-3 group">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors group-hover:bg-[var(--accent)] ${
            incident ? "bg-red-500" : accent ? "bg-[var(--accent)]" : "bg-[var(--border)]"
          }`}
        />
        {!last && (
          <div
            className={`w-px flex-1 min-h-[24px] ${
              forward ? "bg-[var(--border)]" : "bg-[var(--border)]"
            }`}
          />
        )}
      </div>
      <div className="flex items-center gap-2 py-0.5">
        <span className={`text-[8px] font-mono px-1 py-0.5 tracking-widest ${tagBg}`}>
          {tag}
        </span>
        <span
          className={`text-[13px] font-light leading-tight ${
            incident ? "text-red-700 font-medium" : "text-[var(--charcoal)]"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
