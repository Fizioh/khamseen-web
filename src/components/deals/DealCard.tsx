import Image from "next/image";
import { discountPercent, type Deal } from "@/lib/deals/types";
import { formatEuro, formatVerifiedDate } from "@/components/deals/format";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const remise = discountPercent(deal);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded border border-border bg-surface/40 transition-colors hover:border-accent/35">
      <div
        className="relative flex aspect-[4/3] items-end overflow-hidden p-4"
        style={{
          background: `linear-gradient(145deg, ${deal.imageTone} 0%, #0a0a0c 72%)`,
        }}
      >
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
            <div
              className="absolute -right-8 -top-10 h-40 w-40 rounded-full blur-2xl"
              style={{ background: "rgba(232,232,234,0.12)" }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        {remise > 0 ? (
          <span className="relative z-10 rounded border border-white/15 bg-black/45 px-2 py-1 font-mono text-[10px] tracking-wide text-foreground backdrop-blur-sm">
            −{remise}&nbsp;%
          </span>
        ) : null}
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
            className="inline-flex w-full items-center justify-center rounded border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Voir l&apos;offre →
          </a>
        </div>
      </div>
    </article>
  );
}
