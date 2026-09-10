"use client";

import { useState } from "react";
import Link from "next/link";

interface NodeTooltip {
  id: string;
  title: string;
  lines: string[];
}

const tooltips: Record<string, NodeTooltip> = {
  agent: {
    id: "agent",
    title: "Agent Run #8421",
    lines: ["Started 10:01:24", "18 model calls", "7 tool calls", "2 external systems"],
  },
  llm: {
    id: "llm",
    title: "18 LLM Calls",
    lines: ["Models: GPT-4o, Claude 3.5", "Avg latency: 1.2s", "Total tokens: 82,411"],
  },
  tools: {
    id: "tools",
    title: "7 Tool Calls",
    lines: ["GitHub API: 3", "Jira API: 2", "Search: 2", "Outputs written: 4"],
  },
  systems: {
    id: "systems",
    title: "4 Systems Touched",
    lines: ["GitHub", "Jira", "CI/CD Pipeline", "Deployment API"],
  },
  pr: {
    id: "pr",
    title: "GitHub PR #482",
    lines: ["Created by workflow", "Merged 11 minutes later", "Connected agent executions: 3"],
  },
  deployment: {
    id: "deployment",
    title: "Deployment #193",
    lines: ["Triggered by PR merge", "Deployed 10:18:47", "Service: api-gateway v2.1.4"],
  },
  incident: {
    id: "incident",
    title: "Production Incident #91",
    lines: [
      "Connected executions: 3",
      "Connected events: 42",
      "Attribution rule: repository + time window",
    ],
  },
};

export function HeroVisual() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const tooltip = hoveredNode ? tooltips[hoveredNode] : null;

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Interface frame */}
      <div className="border border-[var(--border)] bg-white/60 backdrop-blur-sm overflow-visible">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)] bg-[var(--off-white)]">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
          <span className="ml-2 text-[10px] font-mono text-[var(--soft-gray)] tracking-wide uppercase">
            Investigation — Agent Run #8421
          </span>
        </div>

        {/* Chain visualization */}
        <div className="p-5 flex flex-col gap-0 relative">
          <ChainNode
            id="agent"
            label="Agent Run #8421"
            sublabel="10:01:24 · 18 LLM calls · 7 tool calls"
            status="exec"
            isHovered={hoveredNode === "agent"}
            isExpanded={expandedNode === "agent"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <Connector />
          <ChainNode
            id="llm"
            label="18 LLM calls"
            sublabel="GPT-4o, Claude 3.5 · 82k tokens"
            status="model"
            isHovered={hoveredNode === "llm"}
            isExpanded={expandedNode === "llm"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <div className="flex gap-0 ml-4">
            <Connector short />
          </div>
          <ChainNode
            id="tools"
            label="7 tool calls"
            sublabel="GitHub, Jira, Search"
            status="tool"
            isHovered={hoveredNode === "tools"}
            isExpanded={expandedNode === "tools"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <Connector />
          <ChainNode
            id="systems"
            label="4 systems touched"
            sublabel="GitHub · Jira · CI/CD · Deploy API"
            status="system"
            isHovered={hoveredNode === "systems"}
            isExpanded={expandedNode === "systems"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <Connector />
          <ChainNode
            id="pr"
            label="GitHub PR #482"
            sublabel="Merged 10:13:08 · 3 executions"
            status="artifact"
            isHovered={hoveredNode === "pr"}
            isExpanded={expandedNode === "pr"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <Connector />
          <ChainNode
            id="deployment"
            label="Deployment #193"
            sublabel="api-gateway v2.1.4 · 10:18:47"
            status="deploy"
            isHovered={hoveredNode === "deployment"}
            isExpanded={expandedNode === "deployment"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
          <Connector />
          <ChainNode
            id="incident"
            label="Production Incident #91"
            sublabel="42 connected events · 3 executions"
            status="incident"
            isHovered={hoveredNode === "incident"}
            isExpanded={expandedNode === "incident"}
            onHover={setHoveredNode}
            onClick={setExpandedNode}
          />
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute -right-4 top-1/3 translate-x-full ml-4 w-48 border border-[var(--border)] bg-[var(--ivory)] p-3 shadow-lg z-10 pointer-events-none hidden lg:block">
          <p className="text-[11px] font-medium text-[var(--charcoal)] mb-1.5">{tooltip.title}</p>
          {tooltip.lines.map((line, i) => (
            <p key={i} className="text-[10px] text-[var(--soft-gray)] font-mono leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Hint */}
      <p className="text-center text-[10px] text-[var(--soft-gray)] mt-3 font-mono tracking-wide">
        hover or click nodes to inspect
      </p>
    </div>
  );
}

const statusColors: Record<string, string> = {
  exec: "bg-[var(--charcoal)]",
  model: "bg-[var(--graphite)]",
  tool: "bg-[var(--graphite)]",
  system: "bg-[var(--graphite)]",
  artifact: "bg-[var(--accent)]",
  deploy: "bg-[var(--graphite)]",
  incident: "bg-red-600",
};

const statusLabels: Record<string, string> = {
  exec: "EXEC",
  model: "LLM",
  tool: "TOOL",
  system: "SYS",
  artifact: "GH",
  deploy: "DEPLOY",
  incident: "INC",
};

function ChainNode({
  id,
  label,
  sublabel,
  status,
  isHovered,
  isExpanded,
  onHover,
  onClick,
}: {
  id: string;
  label: string;
  sublabel: string;
  status: string;
  isHovered: boolean;
  isExpanded: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string | null) => void;
}) {
  const tooltip = tooltips[id];

  return (
    <div>
      <div
        className={`flex items-start gap-3 p-2.5 cursor-pointer border transition-all duration-150 ${
          isHovered || isExpanded
            ? "border-[var(--accent)] bg-[var(--accent-pale)]"
            : "border-transparent hover:border-[var(--border)] hover:bg-white/40"
        }`}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(isExpanded ? null : id)}
      >
        <div className="flex-shrink-0 mt-0.5">
          <span
            className={`inline-block px-1.5 py-0.5 text-[8px] font-mono font-medium text-white tracking-widest ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[var(--charcoal)] leading-tight">{label}</p>
          <p className="text-[10px] text-[var(--soft-gray)] font-mono mt-0.5 leading-snug">
            {sublabel}
          </p>
        </div>
      </div>
      {/* Expanded details */}
      {isExpanded && tooltip && (
        <div className="ml-10 mb-1 border-l border-[var(--accent)] pl-3 py-1">
          {tooltip.lines.map((line, i) => (
            <p key={i} className="text-[10px] font-mono text-[var(--graphite)] leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Connector({ short }: { short?: boolean }) {
  return (
    <div className={`flex items-center ml-4 ${short ? "h-3" : "h-4"}`}>
      <div className="flex flex-col items-center gap-[2px]">
        <div className="w-px h-full bg-[var(--border)] relative">
          <div className="flow-dot absolute top-0 left-0 w-px h-1.5 bg-[var(--soft-gray)]" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--charcoal) 1px, transparent 1px), linear-gradient(90deg, var(--charcoal) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <div className="chip mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              Infrastructure · Early access
            </div>

            <h1 className="text-[clamp(2.2rem,5vw,3.75rem)] font-light leading-[1.08] tracking-tight text-[var(--charcoal)] mb-6">
              Your AI agents are doing more than{" "}
              <em className="not-italic font-normal text-[var(--graphite)]">
                generating responses.
              </em>
            </h1>

            <p className="text-[17px] leading-relaxed text-[var(--graphite)] max-w-[46ch] mb-10 font-light">
              Rethen connects agent activity across models, tools, workflows, and external systems
              so your team can follow the work and understand what happened next.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#early-access"
                className="px-5 py-3 bg-[var(--charcoal)] text-[var(--ivory)] text-sm font-medium hover:bg-[var(--graphite)] transition-colors duration-200"
              >
                Request early access
              </Link>
              <Link
                href="#how-it-works"
                className="px-5 py-3 border border-[var(--border)] text-[var(--graphite)] text-sm font-medium hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-colors duration-200"
              >
                See how it works →
              </Link>
            </div>

            <p className="text-[11px] text-[var(--soft-gray)] mt-5 font-mono">
              Infrastructure for the next generation of autonomous software.
            </p>
          </div>

          {/* Right: interactive visual */}
          <div className="flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
