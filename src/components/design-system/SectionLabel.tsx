interface SectionLabelProps {
  index: string;
  title: string;
}

export function SectionLabel({ index, title }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
      <span className="text-accent">{index}</span>
      <span className="h-px flex-1 bg-border" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
