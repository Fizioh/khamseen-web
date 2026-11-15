import { describe, expect, it } from "vitest";
import { dealCategories, deals, discountPercent, retailersFromDeals } from "./deals";

describe("deals catalog", () => {
  it("exposes between 15 and 30 offers", () => {
    expect(deals.length).toBeGreaterThanOrEqual(15);
    expect(deals.length).toBeLessThanOrEqual(30);
  });

  it("covers high-tech, maison and jeux", () => {
    for (const category of dealCategories) {
      expect(deals.some((deal) => deal.category === category)).toBe(true);
    }
  });

  it("keeps promo prices below struck prices when present", () => {
    for (const deal of deals) {
      if (deal.priceWas === undefined) continue;
      expect(deal.priceNow).toBeLessThan(deal.priceWas);
      expect(discountPercent(deal)).toBeGreaterThan(0);
    }
  });

  it("lists retailers derived from deals", () => {
    expect(retailersFromDeals.length).toBeGreaterThan(1);
  });
});
