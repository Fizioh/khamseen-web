interface PageIntroProps {
  label: string;
  title: string;
  description: string;
}

export function PageIntro({ label, title, description }: PageIntroProps) {
  return (
    <div className="border-b border-border/60 bg-surface/20 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">{label}</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
