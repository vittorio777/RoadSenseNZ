import { loadMapLibreRuntime, type MapLibreRuntime } from "../engine/mapRuntime";
import { getVisibleScenarios } from "../config/mapConfig";
import type { MapRegion, MapViewport } from "../config/mapConfig";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  Popup as MapLibrePopup,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Scenario } from "../contracts/scenario";
import { STAGE_LABELS } from "../config/stageConfig";

declare global {
  interface Window {
    maplibregl?: MapLibreRuntime;
  }
}

function loadMapLibre() {
  return loadMapLibreRuntime().then((runtime) => {
    window.maplibregl = runtime;
    return runtime;
  });
}

type InteractiveMapProps = {
  mode: "interactive";
  scenarios: Scenario[];
  region: MapRegion;
  viewport: MapViewport;
  progressByScenarioId: Record<string, number>;
  previewScenario: Scenario | null;
  currentScenarioId?: string;
  onViewportChange: (viewport: MapViewport) => void;
  onPreviewScenarioChange: (scenario: Scenario | null) => void;
  onOpenScenario: (scenario: Scenario) => void;
};

type ReadonlyMapProps = {
  mode: "readonly";
  scenario: Scenario;
  heightClassName?: string;
  zoom?: number;
  showMarkerLabel?: boolean;
  interactive?: boolean;
  minZoom?: number;
  maxZoom?: number;
  showResetControl?: boolean;
};

type ScenarioMapProps = InteractiveMapProps | ReadonlyMapProps;
type MapStatus =
  | "script-loading"
  | "script-loaded"
  | "map-initializing"
  | "map-created"
  | "style-loaded"
  | "loaded"
  | "error";

const mapTilerKey =
  import.meta.env.VITE_MAPTILER_KEY ?? import.meta.env.VITE_MAPTILER_API_KEY;

const mapStyleUrl = mapTilerKey
  ? `https://api.maptiler.com/maps/hybrid/style.json?key=${mapTilerKey}`
  : null;

const ScenarioMap = (props: ScenarioMapProps) => {
  if (!mapStyleUrl) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-6 text-center text-sm text-zinc-500">
        MapTiler key is missing. Set VITE_MAPTILER_KEY to enable the map.
      </div>
    );
  }

  return props.mode === "interactive" ? (
    <InteractiveScenarioMap {...props} />
  ) : (
    <ReadonlyScenarioMap {...props} />
  );
};

function InteractiveScenarioMap({
  scenarios,
  region,
  viewport,
  progressByScenarioId,
  previewScenario,
  currentScenarioId,
  onViewportChange,
  onPreviewScenarioChange,
  onOpenScenario,
}: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<MapLibreMarker[]>([]);
  const popupRef = useRef<MapLibrePopup | null>(null);
  const [initialViewport] = useState(viewport);
  const [mapStatus, setMapStatus] = useState<MapStatus>("script-loading");
  const visibleScenarios = useMemo(
    () => getVisibleScenarios(scenarios, region),
    [scenarios, region],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapStyleUrl) return;

    let isMounted = true;

    setMapStatus("script-loading");

    loadMapLibre()
      .then((maplibregl) => {
        if (!isMounted || !containerRef.current || mapRef.current) return;
        setMapStatus("script-loaded");
        setMapStatus("map-initializing");

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: mapStyleUrl,
          center: [initialViewport.center.lng, initialViewport.center.lat],
          zoom: initialViewport.zoom,
          attributionControl: false,
        });
        setMapStatus("map-created");

        map.addControl(
          new maplibregl.NavigationControl({ visualizePitch: false }),
        );
        map.addControl(new maplibregl.AttributionControl({ compact: true }));
        map.on("load", () => {
          setMapStatus("style-loaded");
          requestAnimationFrame(() => map.resize());
          setMapStatus("loaded");
        });
        map.on("error", (event) => {
          console.error("MapLibre error:", event.error);
          setMapStatus("error");
        });
        map.on("moveend", () => {
          const center = map.getCenter();
          onViewportChange({
            center: { lat: center.lat, lng: center.lng },
            zoom: map.getZoom(),
          });
        });

        mapRef.current = map;
      })
      .catch((error) => {
        console.error("MapLibre loader error:", error);
        setMapStatus("error");
      });

    return () => {
      isMounted = false;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      popupRef.current?.remove();
      popupRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initialViewport, onViewportChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        mapRef.current?.resize();
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const mapRuntime = window.maplibregl;
    if (!map || !mapRuntime) return;

    map.flyTo({
      center: [region.center.lng, region.center.lat],
      zoom: region.zoom,
      essential: true,
    });
  }, [region]);

  useEffect(() => {
    const map = mapRef.current;
    const mapRuntime = window.maplibregl;
    if (!map || !mapRuntime || mapStatus !== "loaded") return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = visibleScenarios.map((scenario) => {
      const markerEl = createMarkerElement(
        getScenarioStatus(scenario, progressByScenarioId),
        scenario.meta.scenarioId === previewScenario?.meta.scenarioId ||
          scenario.meta.scenarioId === currentScenarioId,
      );

      markerEl.addEventListener("click", (event) => {
        event.stopPropagation();
        onPreviewScenarioChange(
          previewScenario?.meta.scenarioId === scenario.meta.scenarioId
            ? null
            : scenario,
        );
      });

      return new mapRuntime.Marker({ element: markerEl, anchor: "bottom" })
        .setLngLat([scenario.meta.location.lng, scenario.meta.location.lat])
        .addTo(map);
    });
  }, [
    currentScenarioId,
    onPreviewScenarioChange,
    previewScenario?.meta.scenarioId,
    progressByScenarioId,
    mapStatus,
    visibleScenarios,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    const mapRuntime = window.maplibregl;
    if (!map || !mapRuntime || mapStatus !== "loaded") return;

    popupRef.current?.remove();
    popupRef.current = null;

    if (!previewScenario) return;

    const contentEl = document.createElement("div");
    contentEl.className = "scenario-map-popup-card";

    const titleEl = document.createElement("h3");
    titleEl.className = "scenario-map-popup-title";
    titleEl.textContent = STAGE_LABELS[previewScenario.meta.stage];

    const previewEl = document.createElement("p");
    previewEl.className = "scenario-map-popup-preview";
    previewEl.textContent = previewScenario.meta.preview;

    const addressEl = document.createElement("p");
    addressEl.className = "scenario-map-popup-address";
    addressEl.textContent = previewScenario.meta.location.name;

    const actionEl = document.createElement("button");
    actionEl.type = "button";
    actionEl.className = "scenario-map-popup-action";
    actionEl.textContent = "Open scenario";
    actionEl.addEventListener("click", () => onOpenScenario(previewScenario));

    contentEl.append(titleEl, previewEl, addressEl, actionEl);

    const popup = new mapRuntime.Popup({
      anchor: "left",
      closeButton: false,
      closeOnClick: false,
      className: "scenario-map-popup",
      offset: [18, -14],
      maxWidth: "300px",
    })
      .setLngLat([
        previewScenario.meta.location.lng,
        previewScenario.meta.location.lat,
      ])
      .setDOMContent(contentEl)
      .addTo(map);

    popupRef.current = popup;

    return () => {
      popup.remove();
      if (popupRef.current === popup) {
        popupRef.current = null;
      }
    };
  }, [mapStatus, onOpenScenario, previewScenario]);

  return (
    <div className="flex h-full min-h-[640px] flex-col">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">
            {region.label}
          </h2>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600">
          {visibleScenarios.length} marker
          {visibleScenarios.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="relative h-[calc(100vh-132px)] min-h-[620px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm">
        <div ref={containerRef} className="absolute inset-0 h-full w-full" />

        {mapStatus !== "loaded" && (
          <div className="absolute left-4 top-4 z-10 rounded-md bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm">
            <div>{getStatusLabel(mapStatus)}</div>
            <div className="mt-1 text-xs text-zinc-500">
              MapTiler key: {mapTilerKey ? "yes" : "no"}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ReadonlyScenarioMap({
  scenario,
  heightClassName = "h-48",
  zoom = 14,
  showMarkerLabel = false,
  interactive = false,
  minZoom,
  maxZoom,
  showResetControl = false,
}: ReadonlyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);
  const [mapStatus, setMapStatus] = useState<MapStatus>("script-loading");

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapStyleUrl) return;

    let isMounted = true;

    setMapStatus("script-loading");

    loadMapLibre()
      .then((maplibregl) => {
        if (!isMounted || !containerRef.current || mapRef.current) return;
        setMapStatus("script-loaded");
        setMapStatus("map-initializing");

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: mapStyleUrl,
          center: [scenario.meta.location.lng, scenario.meta.location.lat],
          zoom,
          minZoom,
          maxZoom,
          interactive,
          attributionControl: false,
        });
        setMapStatus("map-created");

        if (interactive) {
          map.addControl(
            new maplibregl.NavigationControl({ visualizePitch: false }),
          );
        }

        map.on("load", () => {
          setMapStatus("style-loaded");
          requestAnimationFrame(() => map.resize());
          setMapStatus("loaded");
        });
        map.on("error", (event) => {
          console.error("Readonly MapLibre error:", event.error);
          setMapStatus("error");
        });

        markerRef.current = new maplibregl.Marker({
          element: createMarkerElement("current", true),
          anchor: "bottom",
        })
          .setLngLat([scenario.meta.location.lng, scenario.meta.location.lat])
          .addTo(map);

        mapRef.current = map;
      })
      .catch((error) => {
        console.error("Readonly MapLibre loader error:", error);
        setMapStatus("error");
      });

    return () => {
      isMounted = false;
      markerRef.current?.remove();
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [
    interactive,
    maxZoom,
    minZoom,
    scenario.meta.location.lat,
    scenario.meta.location.lng,
    zoom,
  ]);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-md border border-zinc-200 bg-zinc-100",
        heightClassName,
      ].join(" ")}
    >
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      {showMarkerLabel && mapStatus === "loaded" && (
        <div className="absolute left-3 top-3 z-10 rounded-md bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm">
          Scenario location
        </div>
      )}
      {showResetControl && mapStatus === "loaded" && (
        <button
          type="button"
          onClick={() => {
            mapRef.current?.flyTo({
              center: [scenario.meta.location.lng, scenario.meta.location.lat],
              zoom,
              essential: true,
            });
          }}
          className="absolute bottom-3 right-3 z-10 rounded-md bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-100 hover:text-zinc-950"
        >
          Focus location
        </button>
      )}
      {mapStatus === "error" && (
        <div className="absolute left-2 top-2 z-10 rounded bg-white px-2 py-1 text-xs text-zinc-600 shadow-sm">
          {getStatusLabel(mapStatus)}
        </div>
      )}
    </div>
  );
}

function getStatusLabel(status: MapStatus) {
  switch (status) {
    case "script-loading":
      return "Loading MapLibre script...";
    case "script-loaded":
      return "MapLibre script loaded";
    case "map-initializing":
      return "Initializing map...";
    case "map-created":
      return "Map created, loading style...";
    case "style-loaded":
      return "Map style loaded";
    case "loaded":
      return "Map loaded";
    case "error":
      return "Map failed to load. Check browser console.";
  }
}

type ScenarioStatus = "new" | "correct" | "incorrect" | "current";

function getScenarioStatus(
  scenario: Scenario,
  progressByScenarioId: Record<string, number>,
): ScenarioStatus {
  const selectedOptionIndex = progressByScenarioId[scenario.meta.scenarioId];
  if (selectedOptionIndex === undefined) return "new";
  return scenario.questions.options[selectedOptionIndex].isCorrect
    ? "correct"
    : "incorrect";
}

function createMarkerElement(
  status: ScenarioStatus,
  isSelected: boolean,
) {
  const markerEl = document.createElement("button");
  markerEl.type = "button";
  markerEl.className = [
    "scenario-map-marker",
    `scenario-map-marker-${status}`,
    isSelected ? "scenario-map-marker-selected" : "",
  ].join(" ");
  markerEl.setAttribute("aria-label", "Scenario marker");
  return markerEl;
}

export default ScenarioMap;
