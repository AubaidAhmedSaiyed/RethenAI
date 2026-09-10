"use client";

import { useState } from "react";

type NodeId = "execution" | "pr" | "deployment" | "incident";

interface NodeData {
  id: NodeId;
  label: string;
  sublabel: string;
  tag: string;
  tagColor: string;
  details: {
    title: string;
    rows: { key: string; value: string }[];
  };
}

const nodes: NodeData[] = [
  {
    id: "execution",
    label: "Agent Run #8421",
    sublabel: "Started 10:01:24",
    tag: "EXEC",
    tagColor: "bg-[var(--charcoal)] text-white",
    details: {
      title: "Agent Run #8421",
      rows: [
        { key: "started", value: "10:01:24" },
        { key: "llm calls", value: "18" },
        { key: "tool calls", value: "7" },
        { key: "systems", value: "GitHub, Jira, CI/CD" },
        { key: "duration", value: "4m 22s" },
      ],
    },
  },
  {
    id: "pr",
    label: "GitHub PR #482",
    sublabel: "Merged 10:13:08",
    tag: "GH",
    tagColor: "bg-[var(--accent)] text-white",
    details: {
      title: "GitHub PR #482",
      rows: [
        { key: "created by", value: "workflow" },
        { key: "merged at", value: "10:13:08" },
        { key: "merge delay", value: "11 minutes" },
        { key: "connected execs", value: "3" },
        { key: "files changed", value: "14" },
      ],
    },
  },
  {
    id: "deployment",
    label: "Deployment #193",
    sublabel: "api-gateway v2.1.4",
    tag: "DEPLOY",
    tagColor: "bg-[var(--graphite)] text-white",
    details: {
      title: "Deployment #193",
      rows: [
        { key: "service", value: "api-gateway" },
        { key: "version", value: "v2.1.4" },
        { key: "deployed at", value: "10:18:47" },
        { key: "triggered by", value: "PR merge #482" },
        { key: "environment", value: "production" },
      ],
    },
  },
  {
    id: "incident",
    label: "Production Incident #91",
    sublabel: "11:42 AM · active",
    tag: "INC",
    tagColor: "bg-red-600 text-white",
    details: {
      title: "Production Incident #91",
      rows: [
        { key: "opened", value: "11:42 AM" },
        { key: "connected execs", value: "3" },
        { key: "connected events", value: "42" },
        { key: "attribution rule", value: "repo + time window" },
        { key: "severity", value: "P1" },
      ],
    },
  },
];

export function ProductInvestigation() {
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);

  const activeNode = selectedNode
    ? nodes.find((n) => n.id === selectedNode)
    : hoveredNode
    ? nodes.find((n) => n.id === hoveredNode)
    : null;

  return (
    <section className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="chip mb-5">Product interface</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-tight text-[var(--charcoal)]">
            Start anywhere. Follow the chain.
          </h2>
          <p className="text-[15px] text-[var(--graphite)] mt-4 font-light leading-relaxed">
            An incident surfaces at 11:42 AM. Rethen traces it back through the deployment, the PR,
            and the agent run that created it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-0 border border-[var(--border)]">
          {/* Main investigation view */}
          <div className="border-r border-[var(--border)]">
            {/* Interface header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--off-white)]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest">
                  Investigation
                </span>
                <span className="text-[var(--border)] text-xs">/</span>
                <span className="text-[10px] font-mono text-[var(--charcoal)]">
                  Incident #91
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 subtle-pulse" />
                <span className="text-[10px] font-mono text-[var(--soft-gray)]">active</span>
              </div>
            </div>

            {/* Root incident */}
            <div className="p-6 border-b border-[var(--border)] bg-red-50/30">
              <div className="flex items-start gap-3">
                <span className="chip text-[8px] px-1.5 py-0.5 bg-red-600 text-white border-red-600">
                  INC
                </span>
                <div>
                  <p className="text-[14px] font-medium text-[var(--charcoal)]">
                    Incident #91 · Production deployment failure
                  </p>
                  <p className="text-[11px] font-mono text-[var(--soft-gray)] mt-0.5">
                    11:42 AM · Detected automatically · P1
                  </p>
                </div>
              </div>
            </div>

            {/* Chain */}
            <div className="p-6">
              <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-5">
                Connected activity
              </p>
              <div className="flex flex-col gap-0">
                {nodes.map((node, i) => (
                  <InvestigationNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode === node.id}
                    isHovered={hoveredNode === node.id}
                    isLast={i === nodes.length - 1}
                    onSelect={() =>
                      setSelectedNode(selectedNode === node.id ? null : node.id)
                    }
                    onHover={(h) => setHoveredNode(h ? node.id : null)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: detail */}
          <div className="bg-[var(--off-white)]">
            <div className="px-5 py-3.5 border-b border-[var(--border)] bg-white/50">
              <span className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest">
                Detail view
              </span>
            </div>

            {activeNode ? (
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-[8px] font-mono px-1.5 py-0.5 tracking-widest ${activeNode.tagColor}`}
                  >
                    {activeNode.tag}
                  </span>
                  <p className="text-[13px] font-medium text-[var(--charcoal)]">
                    {activeNode.details.title}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {activeNode.details.rows.map((row) => (
                    <div key={row.key} className="flex justify-between gap-3">
                      <span className="text-[11px] font-mono text-[var(--soft-gray)]">
                        {row.key}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--charcoal)] text-right">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {activeNode.id === "execution" && (
                  <div className="mt-5 pt-4 border-t border-[var(--border)]">
                    <p className="text-[10px] font-mono text-[var(--soft-gray)] uppercase tracking-widest mb-3">
                      Tool calls
                    </p>
                    {["GitHub API", "Jira API", "Search", "GitHub API", "Jira API", "GitHub API", "CI Trigger"].map(
                      (tool, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 py-1.5 border-b border-[var(--border)] last:border-0"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                          <span className="text-[11px] font-mono text-[var(--graphite)]">
                            {tool}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 flex flex-col items-center justify-center min-h-[200px] text-center">
                <p className="text-[12px] font-mono text-[var(--soft-gray)]">
                  click a node to inspect
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestigationNode({
  node,
  isSelected,
  isHovered,
  isLast,
  onSelect,
  onHover,
}: {
  node: NodeData;
  isSelected: boolean;
  isHovered: boolean;
  isLast: boolean;
  onSelect: () => void;
  onHover: (h: boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        {/* Connector + dot */}
        <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
          <div
            className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
              isSelected || isHovered ? "bg-[var(--accent)]" : "bg-[var(--border)]"
            }`}
          />
          {!isLast && (
            <div
              className={`w-px flex-1 min-h-[28px] transition-colors ${
                isSelected ? "bg-[var(--accent)]" : "bg-[var(--border)]"
              }`}
            />
          )}
        </div>

        {/* Node card */}
        <div
          className={`flex-1 mb-2 p-3 cursor-pointer border transition-all duration-150 ${
            isSelected
              ? "border-[var(--accent)] bg-[var(--accent-pale)]"
              : isHovered
              ? "border-[var(--border)] bg-white/60"
              : "border-transparent hover:border-[var(--border)] hover:bg-white/40"
          }`}
          onClick={onSelect}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[8px] font-mono px-1 py-0.5 tracking-widest ${node.tagColor}`}
            >
              {node.tag}
            </span>
            <p className="text-[13px] font-medium text-[var(--charcoal)]">{node.label}</p>
          </div>
          <p className="text-[10px] font-mono text-[var(--soft-gray)] ml-5">{node.sublabel}</p>

          {/* Expanded inline content for mobile */}
          {isSelected && (
            <div className="mt-3 pt-3 border-t border-[var(--border)] lg:hidden">
              {node.details.rows.map((row) => (
                <div key={row.key} className="flex justify-between gap-3 py-0.5">
                  <span className="text-[10px] font-mono text-[var(--soft-gray)]">{row.key}</span>
                  <span className="text-[10px] font-mono text-[var(--charcoal)]">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
