# Testing

Install dependencies with `npm ci`, then run:

```sh
npm test
npm run test:watch
```

`npm test` runs once; `npm run test:watch` reruns tests while developing. To run all project checks:

```sh
npm run check
```

This runs ESLint, Vitest, and the TypeScript/Vite production build in sequence. The repository's `.github/workflows/checks.yml` runs the same checks on application pushes and pull requests. Automated tests require no MapTiler key.

## What is covered

| Area | Behaviours |
| --- | --- |
| Animation engine | Endpoint clamping, interpolation, direction, explicit rotation, traffic signal changes, stationary pauses, empty and single-frame tracks. |
| Map security | Consecutive dangerous attribution attributes are removed; the shared runtime loader configures the bundled worker. |
| Bundled scenarios | Unique IDs, chapter membership, coordinate ranges, one correct answer, contiguous option IDs, explanations, existing templates and image assets, ordered and finite keyframes. |
| Scenario player | Feedback after answering, changing answers, option-specific playback, replaying the intro, static content, chapter navigation boundaries. |
| Practice page | Saving answers, restoring them on remount, disabling persistence, recovering from malformed JSON, ignoring saved answers when memory is disabled. |

The tests use Vitest, React Testing Library, user-event, and jsdom. UI tests interact through buttons and visible feedback. They replace Canvas rendering and, in the practice-page tests, the external map component. The animation calculation itself is tested separately.

These tests validate application behaviour and content structure. They do not verify the legal accuracy of driving rules, pixel appearance, real Canvas rendering, or WebGL map integration. No coverage percentage is claimed.

## Manual smoke test

Before publishing a changed build:

1. Configure a MapTiler key, start the app, and confirm the map loads. Pan, zoom, switch region presets, select a marker, open a question, and return to the map.
2. Open a chapter, answer correctly and incorrectly, and confirm the explanation matches the selected scenario.
3. Replay an animated setup and select an option with an outcome animation. Check vehicle positions, turning, traffic lights, and the paused decision point.
4. Open a parking question and check that images, machine text, and overlays align at different browser sizes.
5. Reload after answering and confirm progress is restored. Turn memory off, answer again, and reload to confirm it is not saved.
6. Use keyboard navigation to reach chapter controls and answers; check visible focus and narrow-window layouts.

## Adding tests

Place tests next to the relevant module using `.test.ts` or `.test.tsx`. Use public behaviours and observable results rather than snapshots of entire components. New scenario files are picked up automatically by the content checks. Shared cleanup is defined in `src/test/setup.ts`.
