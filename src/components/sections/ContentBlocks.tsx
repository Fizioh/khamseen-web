"use client";

import { SystemPanel } from "@/components/design-system/SystemPanel";
import {
  delegateExample,
  executionPrimitives,
  osKernelLifecycle,
  subModuleDefines,
  subModuleExamples,
  faqItems,
  integrationIntro,
  principles,
  roadmapTeaser,
  systemMetrics,
  vsChatRows,
} from "@/data/landing-content";
import { integrationScenarios } from "@/data/integrations";
import { IntegrationHub } from "@/components/graph/IntegrationHub";

export function MetricsStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {systemMetrics.map((m) => (
        <SystemPanel key={m.label} className="px-4 py-3">
          <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{m.label}</p>
          <p className="mt-1 text-xl font-medium text-foreground">{m.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{m.detail}</p>
        </SystemPanel>
      ))}
    </div>
  );
}

export function PrinciplesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {principles.map((p) => (
        <SystemPanel key={p.id} className="p-5">
          <p className="font-mono text-xs text-accent">{p.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
        </SystemPanel>
      ))}
    </div>
  );
}

export function DelegateExamplePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SystemPanel className="space-y-2 p-6 font-mono text-sm">
        <div className="space-y-2 text-foreground/90">
          <p>Human</p>
          <p className="pl-4 text-muted">↓ outcome specified</p>
          <p>Chief of Staff</p>
          <p className="pl-4 text-muted">↓ plan + delegate</p>
          <p>Agent Graph</p>
          <p className="pl-8 text-muted">→ specialists execute in parallel</p>
        </div>
        <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted font-sans">
          You specify outcomes. The system routes work through the topology — not hand-authored
          prompt chains.
        </p>
      </SystemPanel>
      <SystemPanel className="p-6 font-mono text-xs">
        <p className="text-[10px] tracking-widest text-muted uppercase">Example delegation</p>
        <p className="mt-3 text-sm text-foreground">{delegateExample.outcome}</p>
        <p className="mt-4 text-[10px] tracking-widest text-muted uppercase">Constraints</p>
        <ul className="mt-2 space-y-1 text-muted">
          {delegateExample.constraints.map((c) => (
            <li key={c}>· {c}</li>
          ))}
        </ul>
        <p className="mt-4 text-[10px] tracking-widest text-muted uppercase">Routing</p>
        <ul className="mt-2 space-y-1 text-foreground/85">
          {delegateExample.routing.map((r) => (
            <li key={r}>→ {r}</li>
          ))}
        </ul>
      </SystemPanel>
    </div>
  );
}

export function ExecuteGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {executionPrimitives.map((item) => (
        <SystemPanel key={item.name} className="px-4 py-3">
          <p className="font-mono text-xs text-foreground/90">{item.name}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{item.desc}</p>
        </SystemPanel>
      ))}
    </div>
  );
}

export function SubModulesSection() {
  return (
    <div className="space-y-6">
      <SystemPanel className="p-5">
        <p className="font-mono text-[10px] tracking-widest text-muted uppercase">OS kernel (shared)</p>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-accent md:text-xs">
          {osKernelLifecycle}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Every sub-module inherits this lifecycle and the same Human Authority gates. Modules
          differ in agents, skills, tools, and data — not in orchestration semantics.
        </p>
      </SystemPanel>
      <div className="grid gap-3 md:grid-cols-2">
        {subModuleDefines.map((item) => (
          <SystemPanel key={item.label} className="px-4 py-3">
            <p className="font-mono text-xs text-foreground/90">{item.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{item.detail}</p>
          </SystemPanel>
        ))}
      </div>
      <div>
        <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">
          Illustrative slots (yours can be anything)
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {subModuleExamples.map((m) => (
            <SystemPanel key={m.name} className="px-4 py-3">
              <p className="font-mono text-xs text-foreground/90">{m.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{m.detail}</p>
            </SystemPanel>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">{integrationIntro}</p>
      <IntegrationHub />
      <div className="grid gap-4 md:grid-cols-3">
        {integrationScenarios.map((s) => (
          <SystemPanel key={s.id} className="p-4">
            <p className="font-mono text-xs text-accent">{s.title}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-muted">
              {s.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </SystemPanel>
        ))}
      </div>
    </div>
  );
}

export function ComparisonTable() {
  return (
    <SystemPanel className="overflow-x-auto p-0">
      <table className="w-full min-w-[520px] text-left font-mono text-xs">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="px-4 py-3 font-normal tracking-wide">Axis</th>
            <th className="px-4 py-3 font-normal tracking-wide">Typical chat</th>
            <th className="px-4 py-3 font-normal tracking-wide text-accent">Khamseen</th>
          </tr>
        </thead>
        <tbody>
          {vsChatRows.map((row) => (
            <tr key={row.axis} className="border-b border-border/60 last:border-0">
              <td className="px-4 py-3 text-foreground/80">{row.axis}</td>
              <td className="px-4 py-3 text-muted">{row.chat}</td>
              <td className="px-4 py-3 text-foreground/90">{row.khamseen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SystemPanel>
  );
}

export function FaqList() {
  return (
    <div className="space-y-3">
      {faqItems.map((item) => (
        <SystemPanel key={item.q} className="p-5">
          <p className="text-sm font-medium text-foreground">{item.q}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
        </SystemPanel>
      ))}
    </div>
  );
}

export function RoadmapStrip() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {roadmapTeaser.map((r) => (
        <SystemPanel key={r.phase} className="px-4 py-4">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-accent">{r.phase}</span>
            <span
              className={
                r.status === "live"
                  ? "text-signal-ok"
                  : r.status === "next"
                    ? "text-signal-active"
                    : "text-muted"
              }
            >
              {r.status}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">{r.label}</p>
        </SystemPanel>
      ))}
    </div>
  );
}
