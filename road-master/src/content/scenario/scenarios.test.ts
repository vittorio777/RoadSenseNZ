/// <reference types="node" />
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { allMockScenario } from "./index";
import { STAGE_TREE } from "../../config/stageConfig";
import { STAGE_TEMPLATES } from "../template/sceneTemplate";

describe("bundled scenario content", () => {
  it("discovers scenarios with unique IDs", () => {
    expect(allMockScenario.length).toBeGreaterThan(0);
    const ids = allMockScenario.map((scenario) => scenario.meta.scenarioId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const scenario of allMockScenario) {
    describe(scenario.meta.scenarioId, () => {
      it("is reachable through its chapter and has valid map coordinates", () => {
        const group = STAGE_TREE.find((entry) => entry.group === scenario.meta.stageGroup);
        expect(group?.stages).toContain(scenario.meta.stage);
        expect(scenario.meta.scenarioId.trim()).not.toBe("");
        expect(scenario.meta.preview.trim()).not.toBe("");
        expect(scenario.meta.location.lat).toBeGreaterThanOrEqual(-90);
        expect(scenario.meta.location.lat).toBeLessThanOrEqual(90);
        expect(scenario.meta.location.lng).toBeGreaterThanOrEqual(-180);
        expect(scenario.meta.location.lng).toBeLessThanOrEqual(180);
      });

      it("has one correct answer, an explanation, and contiguous option IDs", () => {
        const { options, prompt, explanation } = scenario.questions;
        expect(prompt.trim()).not.toBe("");
        expect(explanation.trim()).not.toBe("");
        expect(options.length).toBeGreaterThanOrEqual(2);
        expect(options.filter((option) => option.isCorrect)).toHaveLength(1);
        expect(options.map((option) => option.id)).toEqual(["A", "B", "C", "D"].slice(0, options.length));
        for (const option of options) expect(option.text.trim()).not.toBe("");
      });

      it("references existing scenes and ordered, finite animation keyframes", () => {
        const { animations } = scenario;
        expect(animations.width).toBeGreaterThan(0);
        expect(animations.height).toBeGreaterThan(0);
        if (!scenario.staticVisual) expect(animations.template in STAGE_TEMPLATES).toBe(true);
        const { script } = animations;
        expect(script.introDuration).toBeGreaterThanOrEqual(0);
        expect(script.optionDuration).toBeGreaterThanOrEqual(0);
        expect(new Set(script.optionTracks.map((track) => track.optionId)).size).toBe(script.optionTracks.length);
        for (const optionTrack of script.optionTracks) {
          expect(scenario.questions.options.map((option) => option.id)).toContain(optionTrack.optionId);
        }
        const tracks = [...script.introTracks, ...script.optionTracks.flatMap((option) => option.tracks)];
        for (const track of tracks) {
          expect(track.keyframes.length).toBeGreaterThan(0);
          track.keyframes.forEach((frame, index) => {
            expect(Number.isFinite(frame.t)).toBe(true);
            expect(frame.t).toBeGreaterThanOrEqual(index ? track.keyframes[index - 1].t : 0);
            for (const value of Object.values(frame.value)) {
              if (typeof value === "number") expect(Number.isFinite(value)).toBe(true);
            }
          });
        }
      });

      it("ships the images used by its static visual", () => {
        const visual = scenario.staticVisual;
        if (!visual) return;
        expect(visual.width).toBeGreaterThan(0);
        expect(visual.height).toBeGreaterThan(0);
        expect(new Set(visual.overlays.map((overlay) => overlay.id)).size).toBe(visual.overlays.length);
        const images = [visual.image, ...visual.overlays.flatMap((overlay) =>
          overlay.type === "OverlayImage" ? [overlay.image] : [])].filter(Boolean);
        for (const image of images) {
          expect(image).toMatch(/^\/scenario-assets\//);
          expect(existsSync(resolve("public", image!.slice(1)))).toBe(true);
        }
      });
    });
  }
});
