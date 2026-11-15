"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  dealCategories,
  discountPercent,
  type Deal,
  type DealCategory,
  type DealSort,
} from "@/lib/deals/types";
import { DealCard } from "@/components/deals/DealCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DealsCatalogProps {
  deals: Deal[];
  sourceLabel?: string;
}

export function DealsCatalog({ deals, sourceLabel }: DealsCatalogProps) {
  const reduced = usePrefersReducedMotion();
  const [category, setCategory] = useState<DealCategory | "Toutes">("Toutes");
  const [retailer, setRetailer] = useState<string>("Toutes");
  const [sort, setSort] = useState<DealSort>("remise");

  const retailers = useMemo(
    () =>
      Array.from(new Set(deals.map((deal) => deal.retailer))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [deals],
  );

  const filtered = useMemo(() => {
    const list = deals.filter((deal) => {
      if (category !== "Toutes" && deal.category !== category) return false;
      if (retailer !== "Toutes" && deal.retailer !== retailer) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "remise") {
        const diff = discountPercent(b) - discountPercent(a);
        if (diff !== 0) return diff;
        return b.verifiedAt.localeCompare(a.verifiedAt);
      }
      return b.verifiedAt.localeCompare(a.verifiedAt) || discountPercent(b) - discountPercent(a);
    });
  }, [category, deals, retailer, sort]);

  return (
    <section className="border-b border-border/60 py-12 md:py-16" aria-labelledby="offres-heading">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
              Catalogue
            </p>
            <h2 id="offres-heading" className="mt-2 text-2xl font-medium tracking-tight">
              Offres du moment
            </h2>
            {sourceLabel ? (
              <p className="mt-2 text-xs text-muted">{sourceLabel}</p>
            ) : null}
          </div>
          <p className="font-mono text-[11px] text-muted" aria-live="polite">
            {filtered.length} offre{filtered.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="mb-8 grid gap-3 rounded border border-border bg-surface/30 p-3 md:grid-cols-3 md:p-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-wide text-muted uppercase">
              Catégorie
            </span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as DealCategory | "Toutes")
              }
              className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
            >
              <option value="Toutes">Toutes</option>
              {dealCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-wide text-muted uppercase">
              Enseigne
            </span>
            <select
              value={retailer}
              onChange={(event) => setRetailer(event.target.value)}
              className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
            >
              <option value="Toutes">Toutes</option>
              {retailers.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-wide text-muted uppercase">
              Tri
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as DealSort)}
              className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
            >
              <option value="remise">Remise décroissante</option>
              <option value="date">Date de vérification</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded border border-border bg-surface/20 px-4 py-10 text-center text-sm text-muted">
            Aucune offre pour ces filtres. Élargissez la catégorie ou l&apos;enseigne.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {filtered.map((deal, index) => (
              <motion.li
                key={deal.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : Math.min(index * 0.03, 0.3) }}
              >
                <DealCard deal={deal} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
