# Architecture

RoadSense NZ is a client-side practice app. The repository's top-level `docs/` folder holds the promotional site; `road-master/` holds the React application. These notes describe the application.

## From content to a practice session

1. `src/content/scenario/index.ts` discovers bundled scenario files with Vite's eager `import.meta.glob`.
2. `PracticePage` selects a scenario through chapter navigation or the map. It owns navigation, selected answers, and browser persistence.
3. `ScenarioPlayer` displays questions and explanations and selects the introductory or option-specific animation tracks.
4. `ScenarioCanvas` schedules animation frames. `getFrameStates` calculates object states at a given time; the drawing modules render roads, vehicles, lights, and effects.
5. Static questions use `StaticVisualRenderer` and `OverlayLayer` to combine images with precise text and visual annotations.

## Design choices

**Typed scenario content.** Questions, location metadata, animation tracks, and static visuals live together in TypeScript files. This makes small content changes easy to review and allows type checking and content tests before publishing. Content changes require a new build.

**A separate playback calculation.** The animation engine takes time and tracks as inputs and returns object states. It does not depend on React or Canvas, so interpolation, traffic signal transitions, and vehicle orientation can be tested without rendering pixels.

**Canvas for animated scenes, SVG overlays for static visuals.** Canvas supports repeated frame drawing. Static overlays keep important text and annotations independent of the base image and preserve their coordinates when resized.

**Browser-only progress.** Selected option indexes are saved under stable scenario IDs in local storage. This avoids account and backend setup for the demo, but progress does not sync across devices. Reordering existing answer options can change the meaning of saved indexes and needs a storage migration or reset.

**Map configuration outside the UI.** `src/config/mapConfig.ts` defines region presets and scenario filtering. The map component handles the external MapLibre runtime, markers, viewport events, and cleanup.

## Current limitations

- The content is a small demo set. Some chapter entries are disabled, including the motorway chapter even though motorway content is bundled.
- Map region filtering uses city names in addresses; neighbourhood presets change the viewport rather than applying geographic bounds.
- Map rendering depends on MapTiler styles and tiles. MapLibre and its worker are bundled through Vite. Tests do not establish that those services or a particular API key are working.
- Canvas appearance, real WebGL rendering, and accessibility require browser checks and are not covered by the current automated suite.
- MapLibre is pinned to the patched 6.4.1 release and loaded from the installed package. Vite bundles its module worker with `?worker&url`; the runtime loader shares one import between maps. Regression tests cover attribution sanitization and worker setup.

See [Testing](TESTING.md) for automated checks and the manual smoke test.
