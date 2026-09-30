"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { AgentGraph } from "@/components/graph/AgentGraph";
import type { ComponentProps } from "react";

type AgentGraphProps = ComponentProps<typeof AgentGraph>;

export function ScrollReactiveGraph(props: AgentGraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-8% 0px" });
  const { pulseEdgeIds = [], highlightAgentIds = [], ...rest } = props;

  return (
    <div ref={ref}>
      <AgentGraph
        {...rest}
        pulseEdgeIds={inView ? pulseEdgeIds : []}
        highlightAgentIds={inView ? highlightAgentIds : []}
        edgesActive={inView}
      />
    </div>
  );
}
