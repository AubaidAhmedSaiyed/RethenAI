export function RelationshipGraph() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">Infrastructure</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            The graph underneath the activity.
          </h2>
          <p className="text-[15px] text-[var(--graphite)] mt-4 font-light leading-relaxed max-w-lg">
            Rethen treats agent activity as a connected system of events and entities — not
            isolated logs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Graph visualization */}
          <div className="border border-[var(--border)] p-8 bg-[var(--off-white)] overflow-hidden">
            <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-6">
              Entity relationship model
            </p>
            <GraphDiagram />
          </div>

          {/* Entity + relationship list */}
          <div className="border border-[var(--border)] border-l-0">
            <div className="grid grid-cols-2">
              {/* Entities */}
              <div className="border-b border-r border-[var(--border)] p-6">
                <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-4">
                  Entities
                </p>
                <div className="flex flex-col gap-2">
                  {entities.map((e) => (
                    <div key={e} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 flex-shrink-0 bg-[var(--charcoal)]" />
                      <span className="text-[12px] font-mono text-[var(--graphite)]">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Relationships */}
              <div className="border-b border-[var(--border)] p-6">
                <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-4">
                  Relationships
                </p>
                <div className="flex flex-col gap-2">
                  {relationships.map((r) => (
                    <div key={r} className="flex items-center gap-2">
                      <span className="w-3 h-px bg-[var(--accent)] flex-shrink-0" />
                      <span className="text-[12px] font-mono text-[var(--graphite)]">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6">
              <p className="text-[14px] text-[var(--graphite)] leading-relaxed font-light mb-4">
                Every event in Rethen is typed and linked. An agent run doesn&apos;t just exist — it
                executed, called tools, and created artifacts that triggered downstream events.
              </p>
              <p className="text-[14px] text-[var(--graphite)] leading-relaxed font-light">
                The graph model is what makes historical replay and bidirectional investigation
                possible — relationships are explicit, not inferred at query time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const entities = [
  "Agent",
  "Execution",
  "LLM call",
  "Tool",
  "Repository",
  "PR",
  "Ticket",
  "Deployment",
  "Incident",
];

const relationships = [
  "executed",
  "called",
  "created",
  "updated",
  "triggered",
  "connected",
  "attributed",
];

// SVG-based graph diagram
function GraphDiagram() {
  return (
    <div className="relative w-full aspect-[4/3] max-h-72">
      <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Edges */}
        <line x1="80" y1="50" x2="200" y2="100" stroke="#DDD8CE" strokeWidth="1" />
        <line x1="80" y1="50" x2="160" y2="160" stroke="#DDD8CE" strokeWidth="1" />
        <line x1="200" y1="100" x2="290" y2="60" stroke="#DDD8CE" strokeWidth="1" />
        <line x1="200" y1="100" x2="310" y2="150" stroke="#C4843A" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="160" y1="160" x2="240" y2="220" stroke="#DDD8CE" strokeWidth="1" />
        <line x1="310" y1="150" x2="240" y2="220" stroke="#DDD8CE" strokeWidth="1" />
        <line x1="310" y1="150" x2="360" y2="230" stroke="#C4843A" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="240" y1="220" x2="120" y2="260" stroke="#DDD8CE" strokeWidth="1" />

        {/* Edge labels */}
        <text x="125" y="90" fontSize="7" fill="#9E9890" fontFamily="monospace">executed</text>
        <text x="248" y="125" fontSize="7" fill="#C4843A" fontFamily="monospace">triggered</text>
        <text x="338" y="205" fontSize="7" fill="#C4843A" fontFamily="monospace">attributed</text>
        <text x="180" y="215" fontSize="7" fill="#9E9890" fontFamily="monospace">created</text>

        {/* Nodes */}
        <GraphNode x={80} y={50} label="Agent" type="primary" />
        <GraphNode x={200} y={100} label="Execution" type="primary" />
        <GraphNode x={290} y={60} label="LLM call" type="secondary" />
        <GraphNode x={160} y={160} label="Tool" type="secondary" />
        <GraphNode x={310} y={150} label="PR" type="accent" />
        <GraphNode x={240} y={220} label="Deployment" type="secondary" />
        <GraphNode x={360} y={230} label="Incident" type="danger" />
        <GraphNode x={120} y={260} label="Ticket" type="secondary" />
      </svg>
    </div>
  );
}

function GraphNode({
  x,
  y,
  label,
  type,
}: {
  x: number;
  y: number;
  label: string;
  type: "primary" | "secondary" | "accent" | "danger";
}) {
  const colors = {
    primary: { fill: "#1C1A18", text: "#F8F5EF", stroke: undefined as string | undefined },
    secondary: { fill: "#F8F5EF", text: "#3A3530", stroke: "#DDD8CE" as string | undefined },
    accent: { fill: "#C4843A", text: "#F8F5EF", stroke: undefined as string | undefined },
    danger: { fill: "#DC2626", text: "#F8F5EF", stroke: undefined as string | undefined },
  };
  const c = colors[type];
  const w = label.length * 5.5 + 12;
  const h = 18;

  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill={c.fill}
        stroke={c.stroke || "none"}
        strokeWidth="1"
        rx="1"
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill={c.text}
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}
