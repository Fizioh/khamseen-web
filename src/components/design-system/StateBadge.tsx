import type { RuntimeState } from "@/types/runtime";

const stateStyles: Record<RuntimeState, string> = {
  IDLE: "text-muted border-border",
  RUNNING: "text-signal-active border-signal-active/40 bg-signal-active/10",
  REVIEWING: "text-signal-warn border-signal-warn/40 bg-signal-warn/10",
  BLOCKED: "text-signal-danger border-signal-danger/40 bg-signal-danger/10",
  RETRYING: "text-signal-warn border-signal-warn/40",
  HUMAN_REQUIRED: "text-accent border-accent/40 bg-accent/10",
  COMPLETED: "text-signal-ok border-signal-ok/40 bg-signal-ok/10",
};

export function StateBadge({ state }: { state: RuntimeState }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wider ${stateStyles[state]}`}
    >
      {state}
    </span>
  );
}
