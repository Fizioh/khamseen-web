import { deals as seedDeals } from "@/data/deals";
import { fetchDealabsDeals } from "@/lib/deals/dealabsFeed";
import { fetchJsonDeals } from "@/lib/deals/jsonFeed";
import type { Deal } from "@/lib/deals/types";

export type DealsSource = "json" | "dealabs" | "seed";

export interface DealsResult {
  deals: Deal[];
  source: DealsSource;
}

export async function getDeals(): Promise<DealsResult> {
  const customFeed = process.env.DEALS_FEED_URL?.trim();
  if (customFeed) {
    const fromJson = await fetchJsonDeals(customFeed);
    if (fromJson.length >= 8) {
      return { deals: fromJson, source: "json" };
    }
  }

  const fromDealabs = await fetchDealabsDeals(30);
  if (fromDealabs.length >= 8) {
    return { deals: fromDealabs, source: "dealabs" };
  }

  return { deals: seedDeals, source: "seed" };
}

export function retailersFromDeals(deals: Deal[]): string[] {
  return Array.from(new Set(deals.map((deal) => deal.retailer))).sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}
