import { describe, expect, it } from "vitest";
import { cleanDealTitle, extractStruckPrice, parseEuroAmount } from "./parsePrice";

describe("parseEuroAmount", () => {
  it("parses french amounts", () => {
    expect(parseEuroAmount("59,99€")).toBe(59.99);
    expect(parseEuroAmount("1 791€")).toBe(1791);
    expect(parseEuroAmount("899€")).toBe(899);
  });
});

describe("extractStruckPrice", () => {
  it("reads au lieu de", () => {
    expect(extractStruckPrice("Promo au lieu de 1199 €")).toBe(1199);
  });
});

describe("cleanDealTitle", () => {
  it("strips temperature prefix", () => {
    expect(cleanDealTitle("108° - Vinyle Bohemian Rhapsody")).toBe(
      "Vinyle Bohemian Rhapsody",
    );
  });
});
