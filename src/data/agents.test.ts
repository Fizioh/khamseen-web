import { describe, expect, it } from "vitest";
import { agents, agentMap } from "./agents";
import { topologyEdges } from "./topology";

describe("agent topology data", () => {
  it("includes human authority root", () => {
    expect(agentMap.human.tier).toBe("human");
    expect(agentMap.human.codename).toBe("HUMAN AUTHORITY");
  });

  it("wires edges only between known agents", () => {
    const ids = new Set(agents.map((a) => a.id));
    for (const edge of topologyEdges) {
      expect(ids.has(edge.from)).toBe(true);
      expect(ids.has(edge.to)).toBe(true);
    }
  });
});
