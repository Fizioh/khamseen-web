"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { GraphCanvas, useGraphStyle } from "@/components/graph/GraphCanvas";
import { curvedEdgePath, trimEdgeEndpoints } from "@/components/graph/graph-visual";
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
const HUB_R = 38;

function polar(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

function HubDiagram({
  activeChannelId,
  selectedId,
  onSelect,
  inView,
}: {
  activeChannelId: string | null;
  selectedId: string;
  onSelect: (id: string) => void;
  inView: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const { edgeActive, edgeGlow, nodeGlow } = useGraphStyle();
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <>
      {integrationChannels.map((channel) => {
        const { x, y } = polar(channel.angle);
        const { x1, y1, x2, y2 } = trimEdgeEndpoints(CX, CY, x, y, HUB_R, 20);
        const path = curvedEdgePath(x1, y1, x2, y2, 0.08);
        const active = inView && channel.id === activeChannelId;
        const selected = channel.id === selectedId;
        const lit = active || selected;
        return (
          <g key={channel.id}>
            <path d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={2.5} />
            <path
              d={path}
              fill="none"
              stroke={lit ? `url(#${edgeActive})` : "rgba(255,255,255,0.12)"}
              strokeWidth={lit ? 1.35 : 0.9}
              filter={lit ? `url(#${edgeGlow})` : undefined}
            />
            {active && !reduced && (
              <motion.circle
                r={2.5}
                fill="#7a9ec4"
                filter={`url(#${edgeGlow})`}
                initial={{ cx: x1, cy: y1 }}
                animate={{ cx: [x1, x2], cy: [y1, y2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
            <ChannelNode
              channel={channel}
              x={x}
              y={y}
              selected={selected}
              active={active}
              hovered={hoverId === channel.id}
              nodeGlow={nodeGlow}
              onSelect={() => onSelect(channel.id)}
              onHover={(v) => setHoverId(v ? channel.id : null)}
            />
          </g>
        );
      })}
      <motion.circle
        cx={CX}
        cy={CY}
        r={HUB_R + 8}
        fill="none"
        stroke="rgba(122,158,196,0.25)"
        strokeWidth="1"
        animate={reduced || !inView ? {} : { opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <circle
        cx={CX}
        cy={CY}
        r={HUB_R}
        fill="#0c0c0e"
        stroke="rgba(232,232,234,0.4)"
        strokeWidth="1.5"
        filter={`url(#${nodeGlow})`}
      />
      <circle cx={CX} cy={CY} r={HUB_R - 8} fill="#080809" />
      <circle cx={CX} cy={CY} r={4} fill="#7a9ec4" />
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        className="fill-foreground font-mono text-[7px] tracking-widest pointer-events-none"
      >
        {integrationHubLabel}
      </text>
      <text
        x={CX}
        y={CY + 8}
        textAnchor="middle"
        className="fill-muted font-mono text-[7px] pointer-events-none"
      >
        GATEWAY
      </text>
    </>
  );
}

function ChannelNode({
  channel,
  x,
  y,
  selected,
  active,
  hovered,
  nodeGlow,
  onSelect,
  onHover,
}: {
  channel: IntegrationChannel;
  x: number;
  y: number;
  selected: boolean;
  active: boolean;
  hovered: boolean;
  nodeGlow: string;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const r = selected ? 21 : 18;
  const focus = selected || active || hovered;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r + 4}
        fill="#0f0f11"
        stroke={focus ? "#7a9ec4" : "rgba(255,255,255,0.18)"}
        strokeWidth={focus ? 1.5 : 1}
        filter={focus ? `url(#${nodeGlow})` : undefined}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`${channel.label} integration`}
        onClick={onSelect}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
      />
      <circle cx={x} cy={y} r={r - 6} fill="#0a0a0c" pointerEvents="none" />
      <circle cx={x} cy={y} r={2.5} fill={focus ? "#7a9ec4" : "#5a5a62"} pointerEvents="none" />
      <rect
        x={x - 36}
        y={y - r - 20}
        width={72}
        height={13}
        rx={2}
        fill="rgba(7,7,8,0.9)"
        stroke="rgba(255,255,255,0.06)"
        pointerEvents="none"
      />
      <text
        x={x}
        y={y - r - 10}
        textAnchor="middle"
        className="fill-foreground font-mono text-[8px] tracking-wide pointer-events-none select-none"
      >
        {channel.label.toUpperCase()}
      </text>
      <text
        x={x}
        y={y + r + 14}
        textAnchor="middle"
        className="fill-muted font-mono text-[7px] pointer-events-none select-none"
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
      <GraphCanvas width={W} height={H} ariaLabel="Integration hub diagram" maxHeight="400px">
        <HubDiagram
          activeChannelId={activeId}
          selectedId={selectedId}
          onSelect={setSelectedId}
          inView={inView}
        />
      </GraphCanvas>
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
