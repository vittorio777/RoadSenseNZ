import { describe, expect, it, vi } from "vitest";
import { loadMapLibreRuntime } from "./mapRuntime";

const workerSetup = vi.hoisted(() => vi.fn());

vi.mock("maplibre-gl", () => ({ setWorkerUrl: workerSetup }));
vi.mock("maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url", () => ({
  default: "/assets/map-worker.js",
}));

describe("map runtime loading", () => {
  it("shares one module load across maps and sets the bundled worker URL", async () => {
    const first = loadMapLibreRuntime();
    const second = loadMapLibreRuntime();
    expect(second).toBe(first);
    const [firstRuntime, secondRuntime] = await Promise.all([first, second]);
    expect(secondRuntime).toBe(firstRuntime);
    expect(workerSetup).toHaveBeenCalledExactlyOnceWith("/assets/map-worker.js");
  });
});
