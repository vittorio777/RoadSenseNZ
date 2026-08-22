# Scenario Content Guide

RoadSense uses scenario data as the source of truth. Each scenario should live in the folder that matches its broad road environment, while the UI can use shorter labels for readability.

## Stable Chapter Structure

Keep these top-level `stageGroup` values stable unless the app is intentionally migrated:

- `Intersections`: junctions, roundabouts, give-way or priority decisions at road crossings.
- `UrbanRoad`: city street driving, bus lanes, multi-lane use, crossings, school zones, and common urban decisions.
- `CountryRoad`: rural or open-road situations, including uncontrolled rural intersections.
- `Motorway`: motorway merging, exits, cruising, lane discipline, and high-speed traffic flow.
- `Parking`: roadside parking, paid parking, parking signs, parking machines, and car parks.
- `Hazards`: temporary or unusual hazards such as roadworks, emergency vehicles, and school buses.
- `Emergency`: vehicle control problems, crashes, breakdowns, and urgent response situations.

Do not move or delete existing scenarios when adjusting labels. Existing scenario ids, stage ids, and folders are part of the content contract.

## Stage Labels

The `Stage` ids in `src/contracts/scenario.ts` are stable ids. The short names shown in the sidebar are display labels in `src/config/stageConfig.ts`.

Use short, scannable labels in the UI. If a label changes, prefer updating `STAGE_LABELS` instead of changing the id.

## Choosing A Stage

- If the main decision is at a junction, use `Intersections`.
- If the road is a normal city street and the question is about lane use, bus lanes, crossings, or school zones, use `UrbanRoad`.
- If the question is about parking permissions, fees, parking machines, or marked parking areas, use `Parking`.
- If the setting is an open rural road, use `CountryRoad`.
- If the setting is a motorway or ramp, use `Motorway`.
- If the focus is an unusual external risk, use `Hazards`.
- If the driver or vehicle has already lost normal control, use `Emergency`.

## Interaction Modes

- `AUTOPLAY_PAUSE_REPLAY`: use for animated decision points. The animation plays, pauses at the key moment, then the user chooses.
- `LOOP_WITH_CHOICES`: use for observation tasks where the scene loops and the user can answer at any time.
- `LOOP_GATED_CHOICES`: reserve for timing-window interactions where the same choice may succeed or fail depending on when it is made.
- `STATIC_ONLY`: use for signs, parking machines, road layouts, or still images where no motion is needed.

## Static Visual Rules

Static scenarios should keep real-world visual content and precise learning overlays separate.

The base image can include roads, vehicles, buildings, grass, fences, signs, and machines. Do not rely on the base image for critical text, answer hints, arrows, callouts, or exact pricing/time information.

Use `staticVisual` overlays for:

- `OverlayImage`: placing a supplied screen or detail image into the scene.
- `ConnectorLine`: connecting a real object to a magnified detail.
- `InfoPanel`: exact text such as prices, times, distances, or machine display content.
- `FocusMarker` and `HighlightArea`: drawing attention to a location without becoming an answer hint.
- `DirectionArrow`: direction or movement cues.

`staticVisual.width` and `staticVisual.height` must match the actual pixel size of the base image. This keeps overlay positions stable during browser zoom and responsive resizing.

## Scenario Metadata

Every demo scenario should include:

- A stable `scenarioId`.
- A clear `title`.
- A concise `preview`.
- Real location metadata when available: `name`, `address`, `lat`, and `lng`.
- Options with varied correct-answer positions across the demo set.
- A short explanation that teaches the rule without repeating too much location metadata.

## File Naming

Place scenario files under:

`src/content/scenario/<StageGroup>/<stage>/<scenario_id>.scenario.ts`

Use snake_case ids with a numeric suffix, for example:

- `int_t_0002`
- `urb_bus_lane_time_0001`
- `parking_paid_machine_0003`

When several scenarios share one static image, extract the shared visual and location metadata into a nearby helper file, such as `paidParkingVisual.ts`.
