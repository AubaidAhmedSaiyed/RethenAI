export function TheProblem() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">The problem</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            The trace ends before the story does.
          </h2>
        </div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-0 mb-20">
          {/* Existing trace */}
          <div className="border border-[var(--border)] p-8 bg-white/50">
            <p className="text-[11px] font-mono text-[var(--soft-gray)] tracking-widest uppercase mb-6">
              What execution tracing shows
            </p>
            <div className="flex flex-col gap-0">
              {[
                { label: "Agent", tag: "START" },
                { label: "LLM", tag: "MODEL" },
                { label: "Tool", tag: "TOOL" },
                { label: "Tool", tag: "TOOL" },
                { label: "Response", tag: "END", last: true },
              ].map((item, i) => (
                <TraceItem key={i} {...item} muted />
              ))}
            </div>
            <p className="text-[12px] text-[var(--soft-gray)] mt-6 font-light">
              The trace captures what the agent did during execution.
            </p>
          </div>

          {/* Full chain */}
          <div className="border border-[var(--charcoal)] p-8 bg-white">
            <p className="text-[11px] font-mono text-[var(--accent)] tracking-widest uppercase mb-6">
              What actually happened
            </p>
            <div className="flex flex-col gap-0">
              {[
                { label: "Agent", tag: "START" },
                { label: "LLM calls", tag: "MODEL" },
                { label: "Tools", tag: "TOOL" },
                { label: "GitHub", tag: "GH" },
                { label: "PR #482", tag: "ART" },
                { label: "CI pipeline", tag: "CI" },
                { label: "Deployment #193", tag: "DEPLOY" },
                { label: "Production", tag: "SYS" },
                { label: "Incident #91", tag: "INC", last: true, incident: true },
              ].map((item, i) => (
                <TraceItem key={i} {...item} />
              ))}
            </div>
            <p className="text-[12px] text-[var(--graphite)] mt-6 font-light">
              Production systems need you to understand what came after.
            </p>
          </div>
        </div>

        {/* Real questions */}
        <div>
          <p className="text-[11px] font-mono text-[var(--soft-gray)] tracking-widest uppercase mb-8">
            Questions teams are left with
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {questions.map((q, i) => (
              <QuestionCard key={i} question={q} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const questions = [
  "Which AI executions were connected to this failed deployment?",
  "What did this agent change before this incident appeared?",
  "Which tools and systems did this workflow touch?",
  "What happened after this agent completed?",
  "Can we reconstruct the chain later?",
  "Who or what triggered this sequence of events?",
];

function TraceItem({
  label,
  tag,
  last,
  muted,
  incident,
}: {
  label: string;
  tag: string;
  last?: boolean;
  muted?: boolean;
  incident?: boolean;
}) {
  const tagBg = incident
    ? "bg-red-600"
    : muted
    ? "bg-[var(--border)] text-[var(--soft-gray)]"
    : tag === "GH" || tag === "ART" || tag === "CI" || tag === "DEPLOY"
    ? "bg-[var(--accent)]"
    : "bg-[var(--charcoal)]";

  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-6 h-6 flex items-center justify-center flex-shrink-0 ${
            incident ? "bg-red-600" : muted ? "bg-[var(--border)]" : "bg-[var(--charcoal)]"
          }`}
        >
          <span
            className={`text-[7px] font-mono font-bold ${
              muted ? "text-[var(--soft-gray)]" : "text-white"
            } tracking-wider`}
          >
            {tag.slice(0, 2)}
          </span>
        </div>
        {!last && <div className="w-px h-5 bg-[var(--border)]" />}
      </div>
      <p
        className={`text-[13px] leading-tight mt-1 ${
          incident
            ? "text-red-700 font-medium"
            : muted
            ? "text-[var(--soft-gray)]"
            : "text-[var(--charcoal)]"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function QuestionCard({ question, index }: { question: string; index: number }) {
  return (
    <div className="border-b border-r border-[var(--border)] p-6 first-of-type:border-l hover:bg-white/60 transition-colors">
      <p className="text-[10px] font-mono text-[var(--accent)] mb-3">Q{String(index + 1).padStart(2, "0")}</p>
      <p className="text-[14px] text-[var(--charcoal)] leading-snug font-light">{question}</p>
    </div>
  );
}
