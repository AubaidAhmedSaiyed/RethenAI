export function Positioning() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">How Rethen fits</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Observability shows the execution.
            <br />
            <span className="text-[var(--accent)]">Rethen follows the work.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 mb-16">
          {/* AI Observability */}
          <div className="border border-[var(--border)] p-8">
            <p className="text-[11px] font-mono text-[var(--soft-gray)] tracking-widest uppercase mb-6">
              AI Observability
            </p>
            <div className="flex flex-col gap-0 mb-6">
              {["Agent", "LLM", "Tool", "Response"].map((item, i, arr) => (
                <SimpleChain key={i} label={item} last={i === arr.length - 1} muted />
              ))}
            </div>
            <p className="text-[13px] text-[var(--soft-gray)] leading-relaxed font-light">
              Traces and logs of what happened inside the agent execution. Spans, tokens, latency,
              tool calls.
            </p>
          </div>

          {/* Rethen */}
          <div className="border border-[var(--charcoal)] p-8 bg-[var(--charcoal)] text-[var(--ivory)]">
            <p className="text-[11px] font-mono text-[var(--accent)] tracking-widest uppercase mb-6">
              Rethen
            </p>
            <div className="flex flex-col gap-0 mb-6">
              {[
                { label: "Agent", tag: "exec" },
                { label: "Execution", tag: "exec" },
                { label: "Tools", tag: "tool" },
                { label: "External systems", tag: "sys" },
                { label: "Entities", tag: "entity" },
                { label: "Outcomes", tag: "outcome", last: true },
              ].map((item, i) => (
                <SimpleChain
                  key={i}
                  label={item.label}
                  last={item.last}
                  dark
                  accent={item.tag === "outcome"}
                />
              ))}
            </div>
            <p className="text-[13px] text-[var(--ivory)/70] leading-relaxed font-light">
              Connects execution data with the systems, entities, and outcomes around it.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 max-w-2xl">
          <p className="text-[15px] text-[var(--graphite)] leading-relaxed font-light">
            Rethen is not trying to replace your existing tracing stack. It connects execution data
            with the systems and outcomes around it — so you can move from &ldquo;the trace
            ended&rdquo; to &ldquo;this is what happened next.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function SimpleChain({
  label,
  last,
  muted,
  dark,
  accent,
}: {
  label: string;
  last?: boolean;
  muted?: boolean;
  dark?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
            accent
              ? "bg-[var(--accent)]"
              : dark
              ? "bg-[var(--ivory)/40]"
              : muted
              ? "bg-[var(--border)]"
              : "bg-[var(--charcoal)]"
          }`}
        />
        {!last && (
          <div
            className={`w-px h-6 ${
              dark ? "bg-[var(--ivory)/10]" : "bg-[var(--border)]"
            }`}
          />
        )}
      </div>
      <p
        className={`text-[13px] leading-tight mt-0.5 ${
          accent
            ? "text-[var(--accent)] font-medium"
            : dark
            ? "text-[var(--ivory)/80]"
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
