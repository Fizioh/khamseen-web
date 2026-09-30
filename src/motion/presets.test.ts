import { describe, expect, it } from "vitest";
import { motionTransition } from "./presets";

describe("motionTransition", () => {
  it("zeroes duration when reduced motion", () => {
    expect(motionTransition(true)).toEqual({ duration: 0 });
  });

  it("uses default easing when motion enabled", () => {
    const t = motionTransition(false);
    expect(t.duration).toBe(0.35);
  });
});
