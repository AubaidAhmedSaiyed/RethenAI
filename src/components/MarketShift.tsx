export function MarketShift() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">Market context</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Agents are moving from answering questions to doing work.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--border)]">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] max-w-3xl">
          <p className="text-[15px] text-[var(--graphite)] leading-relaxed font-light">
            More agents deployed means more autonomous work, more systems touched, and more
            outcomes to account for. The question of what happened is getting harder to answer.
          </p>
        </div>
      </div>
    </section>
  );
}

const stats = [
  {
    number: "40%",
    trend: "up from 27%",
    description:
      "of organizations with >$1B revenue scaling AI agents",
    source: "McKinsey State of AI, 2026",
    sourceUrl: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  },
  {
    number: "74%",
    trend: "",
    description:
      "expecting to use agentic AI at least moderately within two years",
    source: "Deloitte State of AI, 2026",
    sourceUrl: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/state-of-ai-and-intelligent-automation-in-business-survey.html",
  },
  {
    number: "21%",
    trend: "have mature governance",
    description:
      "of surveyed organizations report mature governance for autonomous AI agents",
    source: "Deloitte State of AI, 2026",
    sourceUrl: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/state-of-ai-and-intelligent-automation-in-business-survey.html",
  },
  {
    number: "150k+",
    trend: "",
    description:
      "projected avg. agents at a Fortune 500 enterprise by 2028",
    source: "Gartner, 2024",
    sourceUrl: "https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-says-over-one-third-of-agentic-ai-projects-will-be-abandoned-after-proof-of-concept-by-2027",
  },
];

function StatCard({
  number,
  trend,
  description,
  source,
  sourceUrl,
}: {
  number: string;
  trend: string;
  description: string;
  source: string;
  sourceUrl: string;
}) {
  return (
    <div className="border-b border-r border-[var(--border)] p-6 lg:p-8 first-of-type:border-l">
      <p className="text-[clamp(2.5rem,5vw,3.5rem)] font-light text-[var(--charcoal)] leading-none tracking-tight mb-3">
        {number}
      </p>
      {trend && (
        <p className="text-[11px] font-mono text-[var(--accent)] mb-2 tracking-wide">{trend}</p>
      )}
      <p className="text-[13px] text-[var(--graphite)] leading-snug mb-4 font-light">
        {description}
      </p>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] font-mono text-[var(--soft-gray)] hover:text-[var(--graphite)] transition-colors underline underline-offset-2"
      >
        {source}
      </a>
    </div>
  );
}
