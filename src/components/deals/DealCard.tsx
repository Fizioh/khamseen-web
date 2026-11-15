import { discountPercent, type Deal } from "@/data/deals";
import { formatEuro, formatVerifiedDate } from "@/components/deals/format";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const remise = discountPercent(deal);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded border border-border bg-surface/40 transition-colors hover:border-accent/35">
      <div
        className="relative flex aspect-[4/3] items-end p-4"
        style={{
          background: `linear-gradient(145deg, ${deal.imageTone} 0%, #0a0a0c 72%)`,
        }}
        role="img"
        aria-label={deal.title}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div
            className="absolute -right-8 -top-10 h-40 w-40 rounded-full blur-2xl"
            style={{ background: "rgba(232,232,234,0.12)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-24 w-full opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(232,232,234,0.08) 11px, rgba(232,232,234,0.08) 12px)",
            }}
          />
        </div>
        <span className="relative z-10 rounded border border-white/15 bg-black/35 px-2 py-1 font-mono text-[10px] tracking-wide text-foreground backdrop-blur-sm">
          −{remise}&nbsp;%
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {deal.retailer} · {deal.category}
          </p>
          <h3 className="text-sm font-medium leading-snug text-foreground md:text-[15px]">
            {deal.title}
          </h3>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium tracking-tight text-foreground">
              {formatEuro(deal.priceNow)}
            </span>
            <span className="text-sm text-muted line-through">
              {formatEuro(deal.priceWas)}
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-wide text-muted">
            Vérifié le {formatVerifiedDate(deal.verifiedAt)}
          </p>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex w-full items-center justify-center rounded border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Voir l&apos;offre →
          </a>
        </div>
      </div>
    </article>
  );
}
