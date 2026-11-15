const points = [
  {
    title: "Comparatifs de prix",
    body: "On croise le prix affiché avec d’autres enseignes pour ne garder que les baisses réellement compétitives.",
  },
  {
    title: "Historique",
    body: "Chaque offre est lue contre son historique récent pour éviter les « faux » prix barrés et les pics artificiels.",
  },
  {
    title: "Cumul cashback",
    body: "Quand c’est pertinent, on signale le potentiel de cumul avec des programmes de cashback pour améliorer le prix net.",
  },
] as const;

export function SelectionMethod() {
  return (
    <section
      id="selection"
      className="scroll-mt-24 border-b border-border/60 py-12 md:py-16"
      aria-labelledby="selection-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          Méthode
        </p>
        <h2
          id="selection-heading"
          className="mt-2 max-w-2xl text-2xl font-medium tracking-tight"
        >
          Comment on sélectionne
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {points.map((point, index) => (
            <li key={point.title} className="border-t border-border pt-4">
              <p className="font-mono text-[10px] tracking-wide text-muted">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-base font-medium text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
