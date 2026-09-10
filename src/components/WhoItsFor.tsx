export function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-24 px-6 border-t border-[var(--border)] bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="chip mb-5">Audience</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            For teams putting agents into real systems.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {audiences.map((a, i) => (
            <AudienceCard key={i} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}

const audiences = [
  {
    title: "AI & ML Engineers",
    desc: "Understand agent executions beyond model traces. See what systems your agents touched and what changed.",
    tag: "AI",
  },
  {
    title: "Platform Engineers",
    desc: "Create a common observability layer across agents, infrastructure, and the external systems they touch.",
    tag: "PLAT",
  },
  {
    title: "Engineering Leaders",
    desc: "Investigate AI-related production events without manually stitching together logs from five different systems.",
    tag: "ENG",
  },
  {
    title: "AI-First Companies",
    desc: "Build a historical record of autonomous software activity that scales as your deployments grow.",
    tag: "ORG",
  },
];

function AudienceCard({
  title,
  desc,
  tag,
}: {
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="border-b border-r border-[var(--border)] bg-white p-7 hover:bg-[var(--ivory)] transition-colors first-of-type:border-l group">
      <div className="mb-4">
        <span className="text-[9px] font-mono font-medium px-2 py-1 bg-[var(--charcoal)] text-[var(--ivory)] tracking-widest">
          {tag}
        </span>
      </div>
      <h3 className="text-[15px] font-medium text-[var(--charcoal)] mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-[13px] text-[var(--graphite)] leading-relaxed font-light">{desc}</p>
    </div>
  );
}
