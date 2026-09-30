"use client";

import { createContext, useContext, useId, useMemo, type ReactNode } from "react";

type GraphStyle = {
  uid: string;
  edgeActive: string;
  edgeGlow: string;
  nodeGlow: string;
  edgeArrow: string;
  grid: string;
  vignette: string;
};

const GraphStyleContext = createContext<GraphStyle | null>(null);

export function useGraphStyle() {
  const ctx = useContext(GraphStyleContext);
  if (!ctx) throw new Error("useGraphStyle must be used within GraphCanvas");
  return ctx;
}

interface GraphCanvasProps {
  width: number;
  height: number;
  ariaLabel: string;
  className?: string;
  maxHeight?: string;
  children: ReactNode;
  role?: "img" | "group";
}

export function GraphCanvas({
  width,
  height,
  ariaLabel,
  className = "",
  maxHeight = "420px",
  children,
  role = "group",
}: GraphCanvasProps) {
  const raw = useId().replace(/:/g, "");
  const style = useMemo<GraphStyle>(
    () => ({
      uid: raw,
      edgeActive: `edge-active-${raw}`,
      edgeGlow: `edge-glow-${raw}`,
      nodeGlow: `node-glow-${raw}`,
      edgeArrow: `edge-arrow-${raw}`,
      grid: `grid-${raw}`,
      vignette: `vignette-${raw}`,
    }),
    [raw],
  );

  return (
    <GraphStyleContext.Provider value={style}>
      <div
        className={`relative overflow-visible rounded-md border border-border/80 bg-[#060607] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          style={{ maxHeight }}
          role={role}
          aria-label={ariaLabel}
        >
          <defs>
            <pattern id={style.grid} width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(255,255,255,0.045)"
                strokeWidth="0.75"
              />
              <circle cx="0" cy="0" r="0.6" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <radialGradient id={style.vignette} cx="50%" cy="45%" r="68%">
              <stop offset="0%" stopColor="rgba(122,158,196,0.08)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
            </radialGradient>
            <linearGradient id={style.edgeActive} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(122,158,196,0.15)" />
              <stop offset="45%" stopColor="rgba(122,158,196,0.65)" />
              <stop offset="100%" stopColor="rgba(232,232,234,0.4)" />
            </linearGradient>
            <filter id={style.edgeGlow} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={style.nodeGlow} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id={style.edgeArrow}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(200,220,235,0.55)" />
            </marker>
          </defs>
          <rect width={width} height={height} fill="#070708" />
          <rect width={width} height={height} fill={`url(#${style.grid})`} />
          <rect width={width} height={height} fill={`url(#${style.vignette})`} />
          {children}
        </svg>
        <div
          className="pointer-events-none absolute inset-0 rounded-md opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.9) 3px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/[0.03]"
          aria-hidden
        />
      </div>
    </GraphStyleContext.Provider>
  );
}
