import {
  cleanDealTitle,
  extractStruckPrice,
  parseEuroAmount,
} from "@/lib/deals/parsePrice";
import type { Deal, DealCategory } from "@/lib/deals/types";

const FEEDS = [
  "https://www.dealabs.com/rss/nouveaux",
  "https://www.dealabs.com/rss/tendance",
] as const;

const CATEGORY_MAP: Record<string, DealCategory> = {
  "High-Tech": "High-tech",
  "Maison & Habitat": "Maison",
  "Jardin & Bricolage": "Maison",
  "Consoles & Jeux vidéo": "Jeux",
};

const TONES = ["#1a3a4a", "#2a2a38", "#1e3344", "#243040", "#2c2438", "#1f2f2a"];

function stripCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[/i, "").replace(/\]\]>$/i, "").trim();
}

function tagValue(block: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = block.match(re);
  return match ? stripCdata(match[1]) : undefined;
}

function attr(block: string, tag: string, name: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*\\s${name}="([^"]*)"`, "i");
  const match = block.match(re);
  return match?.[1];
}

function toIsoDate(pubDate: string | undefined): string {
  if (!pubDate) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function mapItem(block: string, index: number): Deal | null {
  const categoryRaw = tagValue(block, "category");
  if (!categoryRaw) return null;
  const category = CATEGORY_MAP[categoryRaw];
  if (!category) return null;

  const titleRaw = tagValue(block, "title");
  const link = tagValue(block, "link");
  if (!titleRaw || !link) return null;

  const merchant =
    attr(block, "pepper:merchant", "name") ||
    attr(block, "merchant", "name") ||
    "Enseigne";
  const priceAttr =
    attr(block, "pepper:merchant", "price") || attr(block, "merchant", "price");
  const description = tagValue(block, "description") || "";
  const priceNow = parseEuroAmount(priceAttr);
  if (priceNow === undefined) return null;

  const priceWas = extractStruckPrice(`${titleRaw}\n${description}`);
  const imageUrl =
    attr(block, "media:content", "url") || attr(block, "media:thumbnail", "url");
  const verifiedAt = toIsoDate(tagValue(block, "pubDate"));
  const guid = tagValue(block, "guid") || link;

  return {
    id: `dealabs-${Buffer.from(guid).toString("base64url").slice(0, 24)}`,
    title: cleanDealTitle(titleRaw),
    category,
    retailer: merchant,
    imageUrl,
    imageTone: TONES[index % TONES.length],
    priceWas: priceWas && priceWas > priceNow ? priceWas : undefined,
    priceNow,
    verifiedAt,
    url: link,
    source: "Dealabs",
  };
}

async function fetchFeed(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "KhamseenDeals/1.0 (+https://khamseen.tech/deals)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 1800 },
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export async function fetchDealabsDeals(limit = 30): Promise<Deal[]> {
  const bodies = await Promise.all(FEEDS.map((url) => fetchFeed(url)));
  const seen = new Set<string>();
  const deals: Deal[] = [];

  for (const body of bodies) {
    if (!body) continue;
    const items = body.match(/<item\b[\s\S]*?<\/item>/gi) || [];
    for (const item of items) {
      const deal = mapItem(item, deals.length);
      if (!deal) continue;
      if (seen.has(deal.url)) continue;
      seen.add(deal.url);
      deals.push(deal);
      if (deals.length >= limit) return deals;
    }
  }

  return deals;
}
