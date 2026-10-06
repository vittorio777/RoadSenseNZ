import { describe, expect, it } from "vitest";
import { getFrameStates } from "./scriptPlayer";
import type { Track } from "../contracts/scenario";

const movement: Track = {
  objectId: "car",
  property: "position",
  keyframes: [
    { t: 1, value: { x: 0, y: 0 } },
    { t: 3, value: { x: 100, y: 0 } },
  ],
};

describe("animation playback", () => {
  it("holds the endpoints outside the track's time range", () => {
    expect(getFrameStates(0, [movement]).car.position).toEqual({ x: 0, y: 0 });
    expect(getFrameStates(10, [movement]).car.position).toEqual({ x: 100, y: 0 });
  });

  it("interpolates movement and points the vehicle along its path", () => {
    expect(getFrameStates(2, [movement]).car).toEqual({
      position: { x: 50, y: 0 }, rotation: { deg: 0 },
    });
    const vertical: Track = { ...movement, keyframes: [
      { t: 0, value: { x: 0, y: 0 } },
      { t: 2, value: { x: 0, y: 100 } },
    ] };
    expect(getFrameStates(1, [vertical]).car.rotation?.deg).toBeCloseTo(90);
  });

  it("honours explicit rotation regardless of track order", () => {
    const rotation: Track = { objectId: "car", property: "rotation", keyframes: [
      { t: 1, value: { deg: 0 } }, { t: 3, value: { deg: 90 } },
    ] };
    for (const tracks of [[movement, rotation], [rotation, movement]]) {
      expect(getFrameStates(2, tracks).car.rotation?.deg).toBeCloseTo(45);
    }
  });

  it("switches traffic signals at the keyframe, without interpolation", () => {
    const signal: Track = { objectId: "light", property: "signal", keyframes: [
      { t: 0, value: { signal: "red" } },
      { t: 2, value: { signal: "green" } },
    ] };
    expect(getFrameStates(1.99, [signal]).light.signal?.signal).toBe("red");
    expect(getFrameStates(2, [signal]).light.signal?.signal).toBe("green");
  });

  it("keeps a stopped vehicle still through a multi-keyframe pause", () => {
    const paused: Track = { ...movement, keyframes: [
      { t: 0, value: { x: 0, y: 0 } },
      { t: 1, value: { x: 100, y: 0 } },
      { t: 3, value: { x: 100, y: 0 } },
      { t: 4, value: { x: 200, y: 0 } },
    ] };
    expect(getFrameStates(2, [paused]).car).toEqual({
      position: { x: 100, y: 0 }, rotation: { deg: 0 },
    });
  });

  it("handles empty and single-keyframe tracks", () => {
    expect(getFrameStates(1, [{ ...movement, keyframes: [] }])).toEqual({});
    expect(getFrameStates(10, [{ ...movement, keyframes: movement.keyframes.slice(0, 1) }]))
      .toEqual({ car: { position: { x: 0, y: 0 } } });
  });
});
