"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  integrationChannels,
  integrationHubLabel,
  type IntegrationChannel,
} from "@/data/integrations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const W = 520;
const H = 400;
const CX = W / 2;
const CY = H / 2 - 10;
const R = 150;

function polar(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

function ChannelNode({
  channel,
  active,
  onSelect,
  selected,
}: {
  channel: IntegrationChannel;
  active: boolean;
  onSelect: () => void;
  selected: boolean;
}) {
  const { x, y } = polar(channel.angle);
  return (
    <g>
      <line
        x1={CX}
        y1={CY}
        x2={x}
        y2={y}
        stroke={
          active || selected ? "rgba(122,158,196,0.45)" : "rgba(255,255,255,0.08)"
        }
        strokeWidth={active || selected ? 1.5 : 1}
      />
      {active && (
        <motion.circle
          r={3}
          fill="rgba(122,158,196,0.95)"
          initial={{ cx: CX, cy: CY }}
          animate={{ cx: [CX, x], cy: [CY, y] }}
          transition={{ duration: 1.4, ease: "linear" }}
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={selected ? 22 : 18}
        fill="#0f0f11"
        stroke={selected || active ? "#7a9ec4" : "rgba(255,255,255,0.22)"}
        strokeWidth={selected ? 1.5 : 1}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`${channel.label} integration`}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
      />
      <text
        x={x}
        y={y - 24}
        textAnchor="middle"
        className="fill-foreground font-mono text-[9px] tracking-wide pointer-events-none select-none"
      >
        {channel.label.toUpperCase()}
      </text>
      <text
        x={x}
        y={y + 32}
        textAnchor="middle"
        className="fill-muted font-mono text-[8px] pointer-events-none select-none"
      >
        {channel.subtitle}
      </text>
    </g>
  );
}

export function IntegrationHub() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState(integrationChannels[0].id);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setPulseIndex((i) => (i + 1) % integrationChannels.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const selected = useMemo(
    () => integrationChannels.find((c) => c.id === selectedId) ?? integrationChannels[0],
    [selectedId],
  );

  const activeId = reduced ? null : integrationChannels[pulseIndex]?.id;

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Integration hub diagram"
      >
        <defs>
          <pattern id="int-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#int-grid)" />
        <motion.circle
          cx={CX}
          cy={CY}
          r={36}
          fill="#111111"
          stroke="rgba(232,232,232,0.35)"
          strokeWidth="1.5"
          animate={reduced || !inView ? {} : { opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          className="fill-foreground font-mono text-[8px] tracking-widest pointer-events-none"
        >
          {integrationHubLabel}
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          className="fill-muted font-mono text-[7px] pointer-events-none"
        >
          GATEWAY
        </text>
        {integrationChannels.map((ch) => (
          <ChannelNode
            key={ch.id}
            channel={ch}
            active={inView && ch.id === activeId}
            selected={ch.id === selectedId}
            onSelect={() => setSelectedId(ch.id)}
          />
        ))}
      </svg>
      <div className="font-mono text-xs">
        <p className="text-[10px] tracking-widest text-muted uppercase">Selected channel</p>
        <p className="mt-2 text-sm text-foreground">{selected.label}</p>
        <div className="mt-4 space-y-3 text-muted">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-muted/80">Ingress</p>
            <p className="mt-1 text-foreground/85">{selected.ingress}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-muted/80">Egress</p>
            <p className="mt-1 text-foreground/85">{selected.egress}</p>
          </div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted font-sans">
          Adapters normalize external surfaces into kernel events. Human gates and QA stages
          apply regardless of channel — chat is not a shortcut around the graph.
        </p>
      </div>
    </div>
  );
}
