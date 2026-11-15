import type { Deal, DealCategory } from "@/lib/deals/types";
import { dealCategories } from "@/lib/deals/types";

function isCategory(value: unknown): value is DealCategory {
  return typeof value === "string" && (dealCategories as readonly string[]).includes(value);
}

function normalizeDeal(raw: Record<string, unknown>, index: number): Deal | null {
  const id = typeof raw.id === "string" ? raw.id : `json-${index}`;
  const title = typeof raw.title === "string" ? raw.title : null;
  const retailer = typeof raw.retailer === "string" ? raw.retailer : null;
  const url = typeof raw.url === "string" ? raw.url : null;
  const priceNow = typeof raw.priceNow === "number" ? raw.priceNow : null;
  const verifiedAt =
    typeof raw.verifiedAt === "string" ? raw.verifiedAt : new Date().toISOString().slice(0, 10);
  if (!title || !retailer || !url || priceNow === null || !isCategory(raw.category)) {
    return null;
  }

  return {
    id,
    title,
    category: raw.category,
    retailer,
    imageUrl: typeof raw.imageUrl === "string" ? raw.imageUrl : undefined,
    imageTone: typeof raw.imageTone === "string" ? raw.imageTone : "#1a3a4a",
    priceWas: typeof raw.priceWas === "number" ? raw.priceWas : undefined,
    priceNow,
    verifiedAt,
    url,
    source: typeof raw.source === "string" ? raw.source : "feed",
  };
}

export async function fetchJsonDeals(feedUrl: string, limit = 30): Promise<Deal[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });
    if (!response.ok) return [];
    const payload = await response.json();
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.deals)
        ? payload.deals
        : [];
    const deals: Deal[] = [];
    for (const [index, item] of list.entries()) {
      if (!item || typeof item !== "object") continue;
      const deal = normalizeDeal(item as Record<string, unknown>, index);
      if (!deal) continue;
      deals.push(deal);
      if (deals.length >= limit) break;
    }
    return deals;
  } catch {
    return [];
  }
}
