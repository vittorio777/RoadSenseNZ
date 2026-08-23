import { useEffect, useState } from "react";
import PracticeSidebar from "./PracticeSidebar";
import PracticeSidePanel, { MapPreviewDialog } from "./PracticeSidePanel";
import ScenarioMap, {
  getRegionById,
  type MapViewport,
  type MapRegionId,
} from "./ScenarioMap";
import ScenarioPlayer from "./ScenarioPlayer";
import type {
  Location,
  Scenario,
  Stage,
  StageGroup,
} from "../contracts/scenario";
import { allMockScenario } from "../content/scenario/index";
import { ArrowLeft, MapPinned } from "lucide-react";

export type PracticeMode = "home" | "chapter" | "map";
type ScenarioEntrySource = "chapter" | "map" | null;
const DEFAULT_MAP_REGION_ID: MapRegionId = "new_zealand";
const PROGRESS_STORAGE_KEY = "roadsense.progress.v1";
const PROGRESS_ENABLED_STORAGE_KEY = "roadsense.progress.enabled.v1";
const EMPTY_LOCATION: Location = {
  stageGroup: null,
  stage: null,
  scenarioIndex: 0,
};

function readStoredProgress() {
  if (typeof window === "undefined") return {};
  if (window.localStorage.getItem(PROGRESS_ENABLED_STORAGE_KEY) === "false") {
    return {};
  }

  try {
    const storedProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    return storedProgress ? JSON.parse(storedProgress) : {};
  } catch {
    return {};
  }
}

function readProgressEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(PROGRESS_ENABLED_STORAGE_KEY) !== "false";
}

const PracticePage = () => {
  const [mode, setMode] = useState<PracticeMode>("home");
  const [mapRegionId, setMapRegionId] = useState<MapRegionId>(
    DEFAULT_MAP_REGION_ID,
  );
  const [mapViewport, setMapViewport] = useState<MapViewport>({
    center: getRegionById(DEFAULT_MAP_REGION_ID).center,
    zoom: getRegionById(DEFAULT_MAP_REGION_ID).zoom,
  });
  const [previewScenario, setPreviewScenario] = useState<Scenario | null>(null);
  const [scenarioEntrySource, setScenarioEntrySource] =
    useState<ScenarioEntrySource>(null);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<Location>(EMPTY_LOCATION);
  const [isProgressEnabled, setIsProgressEnabled] =
    useState(readProgressEnabled);
  const [progressByScenarioId, setProgressByScenarioId] =
    useState<Record<string, number>>(readStoredProgress);

  const currentMockScenarios =
    currentLocation.stageGroup && currentLocation.stage
      ? allMockScenario.filter(
          (item) =>
            item.meta.stageGroup === currentLocation.stageGroup &&
            item.meta.stage === currentLocation.stage,
        )
      : [];

  const currentMockScenario =
    currentMockScenarios[currentLocation.scenarioIndex];
  const mapRegion = getRegionById(mapRegionId);
  const isMapScenarioOpen = mode === "map" && scenarioEntrySource === "map";

  function handleModeChange(nextMode: PracticeMode) {
    setMode(nextMode);
    if (nextMode === "map") {
      const defaultRegion = getRegionById(DEFAULT_MAP_REGION_ID);
      setMapRegionId(DEFAULT_MAP_REGION_ID);
      setMapViewport({
        center: defaultRegion.center,
        zoom: defaultRegion.zoom,
      });
      setCurrentLocation(EMPTY_LOCATION);
      setScenarioEntrySource(null);
      setPreviewScenario(null);
      setIsMapPreviewOpen(false);
      return;
    }

    setCurrentLocation(EMPTY_LOCATION);
    setScenarioEntrySource(null);
    setPreviewScenario(null);
    setIsMapPreviewOpen(false);
  }

  function handleHomeClick() {
    setMode("home");
    setCurrentLocation(EMPTY_LOCATION);
    setScenarioEntrySource(null);
    setPreviewScenario(null);
    setIsMapPreviewOpen(false);
  }

  function handleMapRegionChange(regionId: MapRegionId) {
    const nextRegion = getRegionById(regionId);
    setMapRegionId(regionId);
    setMapViewport({ center: nextRegion.center, zoom: nextRegion.zoom });
    setPreviewScenario(null);
    setMode("map");
    setScenarioEntrySource(null);
  }

  function handleScenarioChange(index: number) {
    setCurrentLocation((prev) => ({ ...prev, scenarioIndex: index }));
  }

  function handleUserSelections(optionIndex: number) {
    if (!currentMockScenario) return;

    const scenarioId = currentMockScenario.meta.scenarioId;
    setProgressByScenarioId((prev) => ({
      ...prev,
      [scenarioId]: optionIndex,
    }));
  }

  function handleProgressToggle() {
    setProgressByScenarioId({});
    setIsProgressEnabled((current) => !current);
  }

  function handleStageClick(stageGroup: StageGroup, stage: Stage) {
    setCurrentLocation({ stageGroup, stage, scenarioIndex: 0 });
    setMode("chapter");
    setScenarioEntrySource("chapter");
  }

  function handleMapScenarioSelect(scenario: Scenario) {
    const stageScenarios = allMockScenario.filter(
      (item) =>
        item.meta.stageGroup === scenario.meta.stageGroup &&
        item.meta.stage === scenario.meta.stage,
    );
    const scenarioIndex = Math.max(
      0,
      stageScenarios.findIndex(
        (item) => item.meta.scenarioId === scenario.meta.scenarioId,
      ),
    );

    setCurrentLocation({
      stageGroup: scenario.meta.stageGroup,
      stage: scenario.meta.stage,
      scenarioIndex,
    });
    setMode("map");
    setScenarioEntrySource("map");
    setPreviewScenario(scenario);
  }

  function handleBackToMap() {
    setMode("map");
    setScenarioEntrySource(null);
    setIsMapPreviewOpen(false);
  }

  const showMapCanvas = mode === "map" && scenarioEntrySource !== "map";
  const showHomeCanvas = mode === "home";
  const showRightPanel = mode === "chapter";
  const isWideScenarioLayout =
    mode === "map" || (isLeftCollapsed && isRightCollapsed);
  const gridTemplateColumns = showRightPanel
    ? `${
        isLeftCollapsed ? "56px" : "280px"
      } minmax(0, 1fr) ${isRightCollapsed ? "56px" : "320px"}`
    : `${isLeftCollapsed ? "56px" : "280px"} minmax(0, 1fr)`;

  useEffect(() => {
    window.localStorage.setItem(
      PROGRESS_ENABLED_STORAGE_KEY,
      String(isProgressEnabled),
    );
  }, [isProgressEnabled]);

  useEffect(() => {
    if (!isProgressEnabled) {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(progressByScenarioId),
    );
  }, [isProgressEnabled, progressByScenarioId]);

  return (
    <div className="h-screen overflow-hidden bg-white text-zinc-900">
      <div className="grid h-full" style={{ gridTemplateColumns }}>
        <div className="min-h-0">
          <aside className="h-full min-h-0 border-r border-zinc-200 bg-zinc-50">
            <PracticeSidebar
              mode={mode}
              isCollapsed={isLeftCollapsed}
              selectedRegionId={mapRegionId}
              onToggleCollapse={() => setIsLeftCollapsed((current) => !current)}
              onModeChange={handleModeChange}
              onHomeClick={handleHomeClick}
              onMapRegionClick={handleMapRegionChange}
              onStageClick={handleStageClick}
              isProgressEnabled={isProgressEnabled}
              onToggleProgress={handleProgressToggle}
            />
          </aside>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <div className="w-full pb-4">
            {showHomeCanvas ? (
              <HomeCover />
            ) : showMapCanvas ? (
              <ScenarioMap
                mode="interactive"
                scenarios={allMockScenario}
                region={mapRegion}
                viewport={mapViewport}
                progressByScenarioId={progressByScenarioId}
                previewScenario={previewScenario}
                currentScenarioId={currentMockScenario?.meta.scenarioId}
                onViewportChange={setMapViewport}
                onPreviewScenarioChange={setPreviewScenario}
                onOpenScenario={handleMapScenarioSelect}
              />
            ) : currentMockScenario ? (
              <div className="w-full">
                {isMapScenarioOpen && (
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleBackToMap}
                      className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <ArrowLeft size={16} />
                      Back to map
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMapPreviewOpen(true)}
                      aria-label="Open location map"
                      title="Open location map"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                    >
                      <MapPinned size={17} />
                    </button>
                  </div>
                )}
                <ScenarioPlayer
                  key={currentMockScenario.meta.scenarioId}
                  mockScenario={currentMockScenario}
                  handleUserSelections={handleUserSelections}
                  isWideLayout={isWideScenarioLayout}
                  chapterNavigation={
                    scenarioEntrySource === "chapter"
                      ? {
                          currentIndex: currentLocation.scenarioIndex,
                          total: currentMockScenarios.length,
                          onPrevious: () =>
                            handleScenarioChange(
                              Math.max(0, currentLocation.scenarioIndex - 1),
                            ),
                          onNext: () =>
                            handleScenarioChange(
                              Math.min(
                                currentMockScenarios.length - 1,
                                currentLocation.scenarioIndex + 1,
                              ),
                            ),
                        }
                      : undefined
                  }
                  userSelectedOption={
                    progressByScenarioId[currentMockScenario.meta.scenarioId] ??
                    null
                  }
                />
                {isMapScenarioOpen && isMapPreviewOpen && (
                  <MapPreviewDialog
                    scenario={currentMockScenario}
                    onClose={() => setIsMapPreviewOpen(false)}
                  />
                )}
              </div>
            ) : (
              <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
                <p className="text-sm text-zinc-500">
                  Choose a practice topic from the sidebar to start.
                </p>
              </div>
            )}
          </div>
        </main>

        {showRightPanel && (
          <div className="min-h-0">
            <aside className="h-full min-h-0 border-l border-zinc-200 bg-zinc-50">
              <PracticeSidePanel
                mode={mode}
                isCollapsed={isRightCollapsed}
                showMapDetails={showMapCanvas}
                mapRegion={mapRegion}
                onToggleCollapse={() =>
                  setIsRightCollapsed((current) => !current)
                }
                allScenarios={allMockScenario}
                currentMockScenarios={currentMockScenarios}
                currentScenario={currentMockScenario}
                currentLocation={currentLocation}
                progressByScenarioId={progressByScenarioId}
                handleScenarioChange={handleScenarioChange}
              />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

function HomeCover() {
  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-semibold tracking-normal text-zinc-950">
          RoadSense NZ
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600">
          Learn the road before it tests you.
        </p>
      </div>
    </div>
  );
}

export default PracticePage;
