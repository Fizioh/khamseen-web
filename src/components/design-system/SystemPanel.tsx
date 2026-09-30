import type { HTMLAttributes, ReactNode } from "react";

interface SystemPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function SystemPanel({ children, className = "", ...rest }: SystemPanelProps) {
  return (
    <div
      className={`rounded-md border border-border bg-surface/80 backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
