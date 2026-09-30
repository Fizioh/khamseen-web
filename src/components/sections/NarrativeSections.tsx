"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AgentGraph } from "@/components/graph/AgentGraph";
import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { ExecutionFlow } from "@/components/execution/ExecutionFlow";
import { SectionLabel } from "@/components/design-system/SectionLabel";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import { CtaButton } from "@/components/design-system/CtaButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, motionTransition, staggerContainer } from "@/motion/presets";
import type { LifecycleStage } from "@/types/runtime";

function NarrativeBlock({
  id,
  index,
  title,
  children,
  stage,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  stage?: LifecycleStage;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      id={id}
      ref={ref}
      className="scroll-mt-24 py-14 md:py-20"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div variants={fadeUp} transition={motionTransition(reduced)}>
        <SectionLabel index={index} title={title} />
        {stage && (
          <div className="mb-6">
            <LifecycleRail activeStage={stage} compact />
          </div>
        )}
        {children}
      </motion.div>
    </motion.section>
  );
}

const domains = [
  "Engineering",
  "Commerce",
  "Research",
  "Operations",
  "Career",
  "SaaS",
  "R&D",
];

export function NarrativeSections() {
  const [orgExpanded, setOrgExpanded] = useState(false);

  return (
    <div id="narrative" className="mx-auto max-w-6xl px-4 md:px-6">
      <NarrativeBlock id="control-plane" index="01" title="Control Plane" stage="PLAN">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-lg space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Human Authority sits at the root. Agents form an organization — not a chat
              thread — with explicit roles, scopes and escalation paths.
            </p>
            <p>
              The control plane coordinates delegation, budgets, permissions and
              observability across the graph.
            </p>
          </div>
          <SystemPanel className="p-4">
            <AgentGraph variant="full" pulseEdgeIds={["e-human-nadir"]} />
          </SystemPanel>
        </div>
      </NarrativeBlock>

      <NarrativeBlock id="delegate" index="02" title="Delegate" stage="DELEGATE">
        <SystemPanel className="p-6 font-mono text-sm">
          <div className="space-y-2 text-foreground/90">
            <p>Human</p>
            <p className="pl-4 text-muted">↓ outcome specified</p>
            <p>Chief of Staff</p>
            <p className="pl-4 text-muted">↓ plan + delegate</p>
            <p>Agent Graph</p>
            <p className="pl-8 text-muted">→ specialists execute in parallel</p>
          </div>
          <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted font-sans">
            You specify outcomes. The system routes work through the topology — not
            hand-authored prompt chains.
          </p>
        </SystemPanel>
      </NarrativeBlock>

      <NarrativeBlock id="execute" index="03" title="Execute" stage="IMPLEMENT">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Isolated execution",
            "Worktrees",
            "Tools & MCP",
            "Agent Skills",
            "Capabilities",
            "Context boundaries",
            "Tasks",
            "Runs",
          ].map((item) => (
            <SystemPanel key={item} className="px-4 py-3 font-mono text-xs text-foreground/80">
              {item}
            </SystemPanel>
          ))}
        </div>
      </NarrativeBlock>

      <NarrativeBlock id="verify" index="04" title="Verify" stage="REVIEW">
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-2 text-sm text-muted">
            <li>· Independent reviewers (separate from implementers)</li>
            <li>· Automated tests and QA agents</li>
            <li>· Security scans and policy gates</li>
            <li>· Evidence-based pass / fail — not self-approval</li>
          </ul>
          <AgentGraph variant="minimal" pulseEdgeIds={["e-khepri-aegis", "e-aegis-human"]} />
        </div>
      </NarrativeBlock>

      <NarrativeBlock id="loops" index="05" title="Loops" stage="REMEDIATE">
        <SystemPanel className="p-6 font-mono text-sm">
          <div className="flex flex-wrap items-center gap-2 text-foreground/90">
            <span>produce</span>
            <span className="text-muted">↓</span>
            <span>check</span>
            <span className="text-muted">↓</span>
            <span className="text-signal-warn">fail → correct → check</span>
            <span className="text-muted">↓</span>
            <span className="text-signal-ok">pass</span>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted font-sans">
            A loop makes a unit of work correct. A graph decides which unit executes
            next.
          </p>
        </SystemPanel>
      </NarrativeBlock>

      <NarrativeBlock id="human-authority" index="06" title="Human Authority" stage="HUMAN_APPROVAL">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            Don&apos;t babysit agents. Approve outcomes.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Khamseen keeps humans in the loop at meaningful gates — production deploys,
            budget overrides, policy exceptions. Agents execute; humans authorize
            results.
          </p>
        </div>
      </NarrativeBlock>

      <NarrativeBlock id="organization" index="07" title="Organization" stage="PLAN">
        <button
          type="button"
          onClick={() => setOrgExpanded((v) => !v)}
          className="mb-4 font-mono text-xs text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {orgExpanded ? "Collapse hierarchy" : "Expand hierarchy preview"}
        </button>
        <SystemPanel className="p-6 font-mono text-xs leading-loose">
          <p>Human Authority</p>
          <p className="pl-4">→ Chief of Staff</p>
          <p className="pl-8">→ Managers</p>
          {orgExpanded && (
            <>
              <p className="pl-12">→ Specialist agents</p>
              <p className="pl-16">→ Workers</p>
              <p className="mt-4 text-muted font-sans text-[11px]">
                Attributes: capabilities · scopes · budgets · permissions · models ·
                tools · escalation policy
              </p>
            </>
          )}
        </SystemPanel>
      </NarrativeBlock>

      <NarrativeBlock id="domains" index="08" title="Operating Domains">
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <span
              key={d}
              className="rounded border border-border px-3 py-1.5 font-mono text-xs text-foreground/75"
            >
              {d}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          One orchestration system. Multiple domains — same control plane semantics.
        </p>
      </NarrativeBlock>

      <NarrativeBlock id="demo" index="—" title="Live execution trace">
        <ExecutionFlow />
      </NarrativeBlock>

      <section className="border-t border-border py-20 text-center">
        <h2 className="text-2xl font-medium md:text-3xl">Build your AI organization.</h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="#control-plane">ENTER THE SYSTEM →</CtaButton>
        </div>
      </section>
    </div>
  );
}
