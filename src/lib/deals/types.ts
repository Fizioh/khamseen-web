export const dealCategories = ["High-tech", "Maison", "Jeux"] as const;
export type DealCategory = (typeof dealCategories)[number];

export type DealSort = "remise" | "date";

export interface Deal {
  id: string;
  title: string;
  category: DealCategory;
  retailer: string;
  imageUrl?: string;
  imageTone: string;
  priceWas?: number;
  priceNow: number;
  verifiedAt: string;
  url: string;
  source?: string;
}

export function discountPercent(deal: Pick<Deal, "priceWas" | "priceNow">): number {
  if (!deal.priceWas || deal.priceWas <= 0 || deal.priceNow >= deal.priceWas) {
    return 0;
  }
  return Math.round(((deal.priceWas - deal.priceNow) / deal.priceWas) * 100);
}
