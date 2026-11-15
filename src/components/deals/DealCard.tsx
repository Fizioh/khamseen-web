import Image from "next/image";
import { discountPercent, type Deal } from "@/lib/deals/types";
import { formatEuro, formatVerifiedDate } from "@/components/deals/format";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const remise = discountPercent(deal);

  return (
    <article className="group flex h-full gap-3 overflow-hidden rounded border border-border bg-surface/40 p-3 transition-colors hover:border-accent/35 sm:gap-4 sm:p-4">
      <div
        className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded border border-border/80 sm:h-28 sm:w-28"
        style={{
          background: `linear-gradient(145deg, ${deal.imageTone} 0%, #0a0a0c 85%)`,
        }}
      >
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt=""
            width={112}
            height={112}
            sizes="112px"
            className="h-full w-full object-contain p-1.5"
            unoptimized
          />
        ) : (
          <span className="font-mono text-[10px] tracking-wide text-muted">
            {deal.category.slice(0, 2).toUpperCase()}
          </span>
        )}
        {remise > 0 ? (
          <span className="absolute left-1 top-1 rounded border border-white/15 bg-black/55 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-foreground">
            −{remise}&nbsp;%
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="space-y-1">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {deal.retailer} · {deal.category}
          </p>
          <h3 className="text-sm font-medium leading-snug text-foreground md:text-[15px]">
            {deal.title}
          </h3>
        </div>

        <div className="mt-auto space-y-2.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-medium tracking-tight text-foreground">
              {formatEuro(deal.priceNow)}
            </span>
            {deal.priceWas && deal.priceWas > deal.priceNow ? (
              <span className="text-sm text-muted line-through">
                {formatEuro(deal.priceWas)}
              </span>
            ) : null}
          </div>
          <p className="font-mono text-[10px] tracking-wide text-muted">
            Vérifié le {formatVerifiedDate(deal.verifiedAt)}
            {deal.source ? ` · ${deal.source}` : ""}
          </p>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex w-full items-center justify-center rounded border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10 sm:w-auto sm:self-start"
          >
            Voir l&apos;offre →
          </a>
        </div>
      </div>
    </article>
  );
}
