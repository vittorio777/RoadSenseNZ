import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

export type MapLibreRuntime = typeof import("maplibre-gl");

let runtimePromise: Promise<MapLibreRuntime> | null = null;

export function loadMapLibreRuntime(): Promise<MapLibreRuntime> {
  runtimePromise ??= import("maplibre-gl")
    .then((runtime) => {
      runtime.setWorkerUrl(workerUrl);
      return runtime;
    })
    .catch((error: unknown) => {
      runtimePromise = null;
      throw error;
    });
  return runtimePromise;
}
