"use client";



import { motion, useInView } from "framer-motion";

import { useRef, useState } from "react";

import { ScrollReactiveGraph } from "@/components/graph/ScrollReactiveGraph";

import { ExecutionFlow } from "@/components/execution/ExecutionFlow";

import {

  ComparisonTable,

  DelegateExamplePanel,

  SubModulesSection,

  ExecuteGrid,

  IntegrationsSection,

  FaqList,

  MetricsStrip,

  PrinciplesGrid,

  RoadmapStrip,

} from "@/components/sections/ContentBlocks";

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

  intro,

}: {

  id: string;

  index: string;

  title: string;

  children: React.ReactNode;

  stage?: LifecycleStage;

  intro?: string;

}) {

  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const reduced = usePrefersReducedMotion();



  return (

    <motion.section

      id={id}

      ref={ref}

      className="scroll-mt-28 py-14 md:scroll-mt-32 md:py-20"

      {...(stage ? { "data-lifecycle-stage": stage } : {})}

      initial="hidden"

      animate={inView ? "visible" : "hidden"}

      variants={staggerContainer}

    >

      <motion.div variants={fadeUp} transition={motionTransition(reduced)}>

        <SectionLabel index={index} title={title} />

        {intro && (

          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">{intro}</p>

        )}

        {stage && (

          <p className="mb-4 font-mono text-[10px] tracking-widest text-muted">

            KERNEL STAGE{" "}

            <span className="text-accent">{stage}</span>

          </p>

        )}

        {children}

      </motion.div>

    </motion.section>

  );

}



export function NarrativeSections() {

  const [orgExpanded, setOrgExpanded] = useState(false);



  return (

    <div id="narrative" className="mx-auto max-w-6xl px-4 md:px-6">

      <NarrativeBlock

        id="control-plane"

        index="01"

        title="Control Plane"

        stage="PLAN"

        intro="Khamseen is an agent operating system: a shared kernel for lifecycle, policy, and audit. Sub-modules plug in on top — any workload you define."

      >

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="max-w-lg space-y-4 text-sm leading-relaxed text-muted">

            <p>

              Human Authority sits at the root. Agents form an organization — not a chat

              thread — with explicit roles, scopes and escalation paths.

            </p>

            <p>

              The control plane coordinates delegation, budgets, permissions and

              observability across the graph. Every edge is a handoff with a contract: who

              acts, what they may touch, and what must be verified before the next stage.

            </p>

            <p>

              The kernel owns scheduling, delegation, and gates. Sub-modules supply

              rosters, skills, and integrations without rewriting orchestration. Mock

              runtime data on this page previews those semantics.

            </p>

          </div>

          <SystemPanel className="p-4">

            <ScrollReactiveGraph

              variant="full"

              pulseEdgeIds={["e-human-nadir", "e-nadir-khepri"]}

              highlightAgentIds={["human", "nadir"]}

            />

          </SystemPanel>

        </div>

        <div className="mt-10">

          <MetricsStrip />

        </div>

      </NarrativeBlock>



      <NarrativeBlock

        id="principles"

        index="02"

        title="Operating Principles"

        stage="REQUEST"

        intro="Four constraints that keep the system honest when agent count scales."

      >

        <PrinciplesGrid />

      </NarrativeBlock>



      <NarrativeBlock

        id="delegate"

        index="03"

        title="Delegate"

        stage="DELEGATE"

        intro="Delegation is a structured packet: outcome, constraints, budget, and reviewers — not a longer system prompt."

      >

        <DelegateExamplePanel />

      </NarrativeBlock>



      <NarrativeBlock

        id="execute"

        index="04"

        title="Execute"

        stage="IMPLEMENT"

        intro="Runs are isolated units of work. Each primitive below is observable in traces and billing."

      >

        <ExecuteGrid />

      </NarrativeBlock>



      <NarrativeBlock

        id="integrations"

        index="05"

        title="Channels & interconnections"

        stage="DELEGATE"

        intro="Adapters connect humans and external systems without bypassing the kernel. Chat, mail, webhooks, and MCP normalize into the same graph."

      >

        <IntegrationsSection />

      </NarrativeBlock>



      <NarrativeBlock

        id="verify"

        index="06"

        title="Verify"

        stage="REVIEW"

        intro="Verification agents never share the implementer's context boundary. Pass/fail is evidence-backed."

      >

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="space-y-4 text-sm text-muted">

            <ul className="space-y-2">

              <li>· Independent reviewers (separate from implementers)</li>

              <li>· Automated tests and QA agents</li>

              <li>· Security scans and policy gates</li>

              <li>· Evidence-based pass / fail — not self-approval</li>

            </ul>

            <p className="leading-relaxed">

              AEGIS-class agents consume artifacts — diffs, test reports, scan output — and

              emit a verdict the graph can route on. Sentinel and Pulse cover security and

              drift without blocking the main delivery path unless policy requires it.

            </p>

          </div>

          <ScrollReactiveGraph

            variant="minimal"

            pulseEdgeIds={["e-khepri-aegis", "e-aegis-human"]}

            highlightAgentIds={["khepri", "aegis"]}

          />

        </div>

      </NarrativeBlock>



      <NarrativeBlock

        id="loops"

        index="07"

        title="Loops"

        stage="REMEDIATE"

        intro="Micro-loops correct a unit of work. The macro-graph decides what runs next when policy or QA fails."

      >

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

            A loop makes a unit of work correct. A graph decides which unit executes next.

            Remediation runs are first-class runs — new cost, new trace, same gates.

          </p>

          <ul className="mt-4 space-y-1 text-xs text-foreground/80 font-sans">

            <li>· Issue detected → routed back to implementer with scoped fix list</li>

            <li>· Re-review mandatory; implementer cannot self-clear QA</li>

            <li>· Repeated fail → escalate to Human Authority or chief-of-staff replan</li>

          </ul>

        </SystemPanel>

      </NarrativeBlock>



      <NarrativeBlock

        id="human-authority"

        index="08"

        title="Human Authority"

        stage="HUMAN_APPROVAL"

        intro="Meaningful gates only — not every token. Agents propose; you authorize outcomes that matter."

      >

        <div className="max-w-3xl space-y-6">

          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">

            Don&apos;t babysit agents. Approve outcomes.

          </h2>

          <p className="text-sm leading-relaxed text-muted">

            Khamseen keeps humans in the loop at meaningful gates — production deploys,

            budget overrides, policy exceptions. Agents execute; humans authorize results.

          </p>

          <SystemPanel className="p-5 font-mono text-xs">

            <p className="text-[10px] tracking-widest text-muted uppercase">Typical approval gates</p>

            <ul className="mt-3 space-y-2 text-foreground/85">

              <li>→ Merge to default branch after QA PASS</li>

              <li>→ Production deploy or infra change</li>

              <li>→ Spend above run or module budget cap</li>

              <li>→ Policy exception (tool, scope, or data class)</li>

              <li>→ External side effect (customer data, payments, listings)</li>

            </ul>

          </SystemPanel>

        </div>

      </NarrativeBlock>



      <NarrativeBlock

        id="organization"

        index="09"

        title="Organization"

        stage="PLAN"

        intro="Each sub-module defines its own hierarchy — chiefs, specialists, workers — mounted under the same Human Authority root."

      >

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

                Attributes: capabilities · scopes · budgets · permissions · models · tools ·

                escalation policy

              </p>

            </>

          )}

        </SystemPanel>

      </NarrativeBlock>



      <NarrativeBlock

        id="modules"

        index="10"

        title="Sub-modules"

        stage="DONE"

        intro="Compose the OS with pluggable modules. Same lifecycle and gates everywhere; each module brings its own skills, data scopes, and chiefs."

      >

        <SubModulesSection />

      </NarrativeBlock>



      <NarrativeBlock id="compare" index="11" title="Not a chat product" stage="PLAN">

        <ComparisonTable />

      </NarrativeBlock>



      <NarrativeBlock id="faq" index="12" title="FAQ">

        <FaqList />

      </NarrativeBlock>



      <NarrativeBlock id="roadmap" index="13" title="Roadmap" stage="QA">

        <RoadmapStrip />

      </NarrativeBlock>



      <NarrativeBlock id="demo" index="—" title="Live execution trace" stage="QA">

        <ExecutionFlow />

      </NarrativeBlock>



      <section className="border-t border-border py-20 text-center">

        <h2 className="text-2xl font-medium md:text-3xl">Mount your modules on one OS.</h2>

        <p className="mx-auto mt-4 max-w-lg text-sm text-muted">

          Explore the kernel narrative, inspect the graph, then follow task KHA-142 through

          delegation, review, remediation, and approval — the same path every module uses.

        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <CtaButton href="#control-plane">ENTER THE SYSTEM →</CtaButton>

          <CtaButton href="#faq">READ FAQ</CtaButton>

        </div>

      </section>

    </div>

  );

}


