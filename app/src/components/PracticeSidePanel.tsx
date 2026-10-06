import { useEffect, useState } from "react";
import type { PracticeMode } from "./PracticePage";
import type { MapRegion } from "../config/mapConfig";
import { getVisibleScenarios } from "../config/mapConfig";
import ScenarioMap from "./ScenarioMap";
import type { Location, Scenario } from "../contracts/scenario";
import {
  MapPinned,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
  X,
} from "lucide-react";
import { STAGE_LABELS } from "../config/stageConfig";

const MAP_DIALOG_MARGIN = 16;
const MAP_DIALOG_MIN_WIDTH = 420;
const MAP_DIALOG_MIN_HEIGHT = 360;

const PracticeSidePanel = ({
  mode,
  isCollapsed,
  showMapDetails,
  mapRegion,
  onToggleCollapse,
  allScenarios,
  currentMockScenarios,
  currentScenario,
  currentLocation,
  progressByScenarioId,
  handleScenarioChange,
}: {
  mode: PracticeMode;
  isCollapsed: boolean;
  showMapDetails: boolean;
  mapRegion: MapRegion;
  onToggleCollapse: () => void;
  allScenarios: Scenario[];
  currentMockScenarios: Scenario[];
  currentScenario?: Scenario;
  currentLocation: Location;
  progressByScenarioId: Record<string, number>;
  handleScenarioChange: (index: number) => void;
}) => {
  const shouldShowMapDetails = mode === "map" && showMapDetails;
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);

  if (isCollapsed) {
    return (
      <>
        <CollapsedQuestionTools
          currentMockScenarios={currentMockScenarios}
          currentLocation={currentLocation}
          currentScenario={currentScenario}
          progressByScenarioId={progressByScenarioId}
          onToggleCollapse={onToggleCollapse}
          handleScenarioChange={handleScenarioChange}
          onOpenMap={() => setIsMapPreviewOpen(true)}
        />
        {currentScenario && isMapPreviewOpen && (
          <MapPreviewDialog
            scenario={currentScenario}
            onClose={() => setIsMapPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  if (shouldShowMapDetails) {
    return (
      <MapDetailsPanel
        region={mapRegion}
        scenarios={allScenarios}
        onToggleCollapse={onToggleCollapse}
      />
    );
  }

  return (
    <QuestionProgressPanel
      onToggleCollapse={onToggleCollapse}
      currentMockScenarios={currentMockScenarios}
      currentLocation={currentLocation}
      currentScenario={currentScenario}
      progressByScenarioId={progressByScenarioId}
      handleScenarioChange={handleScenarioChange}
      isMapPreviewOpen={isMapPreviewOpen}
      setIsMapPreviewOpen={setIsMapPreviewOpen}
    />
  );
};

function CollapsedQuestionTools({
  currentMockScenarios,
  currentLocation,
  currentScenario,
  progressByScenarioId,
  onToggleCollapse,
  handleScenarioChange,
  onOpenMap,
}: {
  currentMockScenarios: Scenario[];
  currentLocation: Location;
  currentScenario?: Scenario;
  progressByScenarioId: Record<string, number>;
  onToggleCollapse: () => void;
  handleScenarioChange: (index: number) => void;
  onOpenMap: () => void;
}) {
  const previewQuestionCount = currentMockScenarios.length;

  return (
    <div className="flex h-full min-h-0 flex-col items-center border-l border-zinc-200 bg-zinc-50 pb-3 pt-4">
      <div className="flex w-full justify-center">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label="Expand right panel"
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
        >
          <PanelRightOpen size={20} />
        </button>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 [scrollbar-width:none]">
        <div className="flex flex-col items-center gap-1.5 border-y border-zinc-200 py-3">
          {Array.from({ length: previewQuestionCount }, (_, index) => {
            const scenario = currentMockScenarios[index];
            if (!scenario) {
              return (
                <button
                  key={`collapsed-placeholder-${index}`}
                  type="button"
                  disabled
                  className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-md border border-zinc-200/70 bg-white/60 text-[11px] font-medium text-zinc-300"
                >
                  {index + 1}
                </button>
              );
            }

            const scenarioId = scenario.meta.scenarioId;
            const isCurrentScenario = currentLocation.scenarioIndex === index;
            const selectedOptionIndex = progressByScenarioId[scenarioId];
            const isAnswered = selectedOptionIndex !== undefined;
            const isCorrect = isAnswered
              ? scenario.questions.options[selectedOptionIndex].isCorrect
              : false;
            const statusClass = isAnswered
              ? isCorrect
                ? "border-green-300 bg-green-100 text-green-700"
                : "border-red-300 bg-red-100 text-red-700"
              : "border-zinc-200 bg-white text-zinc-600";

            return (
              <button
                key={scenarioId}
                type="button"
                onClick={() => handleScenarioChange(index)}
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-md border text-[11px] font-medium transition hover:border-zinc-400",
                  statusClass,
                  isCurrentScenario
                    ? "ring-2 ring-zinc-400 ring-offset-1 ring-offset-zinc-50"
                    : "",
                ].join(" ")}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenMap}
        disabled={!currentScenario}
        aria-label="Open location map"
        title="Open location map"
        className="mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MapPinned size={20} />
      </button>
    </div>
  );
}

function QuestionProgressPanel({
  onToggleCollapse,
  currentMockScenarios,
  currentLocation,
  currentScenario,
  progressByScenarioId,
  handleScenarioChange,
  isMapPreviewOpen,
  setIsMapPreviewOpen,
}: {
  onToggleCollapse: () => void;
  currentMockScenarios: Scenario[];
  currentLocation: Location;
  currentScenario?: Scenario;
  progressByScenarioId: Record<string, number>;
  handleScenarioChange: (index: number) => void;
  isMapPreviewOpen: boolean;
  setIsMapPreviewOpen: (isOpen: boolean) => void;
}) {
  const answeredCount = currentMockScenarios.filter((scenario) => {
    const scenarioId = scenario.meta.scenarioId;
    return scenarioId in progressByScenarioId;
  }).length;
  const previewQuestionCount = currentMockScenarios.length;
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <header className="py-4 pl-6 pr-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-zinc-950">
                Question progress
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-600">
                  <span className="font-semibold">{answeredCount}</span>
                  <span> / {currentMockScenarios.length}</span>
                </span>
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                >
                  <PanelRightClose size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="ml-4 grid w-[260px] grid-cols-5 gap-2 px-0">
          {Array.from({ length: previewQuestionCount }, (_, index) => {
            const scenario = currentMockScenarios[index];
            if (!scenario) {
              return (
                <button
                  key={`placeholder-${index}`}
                  type="button"
                  disabled
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center justify-self-center rounded-md border border-zinc-200 bg-white text-sm font-medium text-zinc-300"
                >
                  {index + 1}
                </button>
              );
            }

            const scenarioId = scenario.meta.scenarioId;
            const isCurrentScenario = currentLocation.scenarioIndex === index;
            const selectedOptionIndex = progressByScenarioId[scenarioId];
            const isAnswered = selectedOptionIndex !== undefined;
            const isCorrect = isAnswered
              ? scenario.questions.options[selectedOptionIndex].isCorrect
              : false;
            const statusClass = isAnswered
              ? isCorrect
                ? "border-green-300 bg-green-100 text-green-700"
                : "border-red-300 bg-red-100 text-red-700"
              : "border-zinc-200 bg-white text-zinc-600";

            const currentClass = isCurrentScenario
              ? "ring-2 ring-zinc-400"
              : "";

            return (
              <button
                key={scenarioId}
                onClick={() => handleScenarioChange(index)}
                className={[
                  "flex h-9 w-9 cursor-pointer items-center justify-center justify-self-center rounded-md border border-zinc-200 text-sm font-medium text-zinc-900 transition hover:border-zinc-400",
                  statusClass,
                  currentClass,
                ].join(" ")}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="ml-4 flex w-[260px] items-center justify-center gap-3 pt-4 text-xs text-zinc-600">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-300" />
            <span>Not answered</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-600" />
            <span>Incorrect</span>
          </div>
        </div>
      </div>

      {currentScenario && (
        <div className="mt-auto shrink-0 py-5 pl-5 pr-4">
          <p className="pl-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Location preview
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="flex items-start justify-between gap-3 px-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-950">
                  {currentScenario.meta.location.name}
                </p>
                <p className="mt-1 text-sm leading-5 text-zinc-600">
                  {currentScenario.meta.location.address}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapPreviewOpen(true)}
                title="Expand map"
                aria-label="Expand map"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMapPreviewOpen(true)}
              className="block w-full px-3 pb-3 text-left"
            >
              <div className="overflow-hidden rounded-md border border-zinc-200">
                <ScenarioMap
                  mode="readonly"
                  scenario={currentScenario}
                  heightClassName="h-48"
                  zoom={15}
                />
              </div>
            </button>
          </div>
        </div>
      )}

      {currentScenario && isMapPreviewOpen && (
        <MapPreviewDialog
          scenario={currentScenario}
          onClose={() => setIsMapPreviewOpen(false)}
        />
      )}
    </div>
  );
}

export function MapPreviewDialog({
  scenario,
  onClose,
}: {
  scenario: Scenario;
  onClose: () => void;
}) {
  const [size, setSize] = useState(() => ({
    width: Math.min(760, window.innerWidth - 48),
    height: Math.min(680, window.innerHeight - 48),
  }));
  const [position, setPosition] = useState(() => ({
    left: Math.max(
      24,
      (window.innerWidth - Math.min(760, window.innerWidth - 48)) / 2,
    ),
    top: Math.max(24, (window.innerHeight - 680) / 2),
  }));

  useEffect(() => {
    function keepDialogInView() {
      setSize((currentSize) => {
        const nextSize = {
          width: Math.min(
            Math.max(
              MAP_DIALOG_MIN_WIDTH,
              window.innerWidth - MAP_DIALOG_MARGIN * 2,
            ),
            currentSize.width,
          ),
          height: Math.min(
            Math.max(
              MAP_DIALOG_MIN_HEIGHT,
              window.innerHeight - MAP_DIALOG_MARGIN * 2,
            ),
            currentSize.height,
          ),
        };

        return nextSize.width === currentSize.width &&
          nextSize.height === currentSize.height
          ? currentSize
          : nextSize;
      });

      setPosition((currentPosition) => {
        const nextPosition = clampMapDialogPosition(currentPosition, size);
        return nextPosition.left === currentPosition.left &&
          nextPosition.top === currentPosition.top
          ? currentPosition
          : nextPosition;
      });
    }

    keepDialogInView();
    window.addEventListener("resize", keepDialogInView);

    return () => {
      window.removeEventListener("resize", keepDialogInView);
    };
  }, [size]);

  function handleDragStart(event: React.PointerEvent<HTMLElement>) {
    const dialog = event.currentTarget.closest("[data-map-dialog]");
    if (!(dialog instanceof HTMLElement)) return;

    const rect = dialog.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = rect.left;
    const startTop = rect.top;

    event.currentTarget.setPointerCapture(event.pointerId);

    function handleMove(moveEvent: PointerEvent) {
      setPosition(
        clampMapDialogPosition(
          {
            left: startLeft + moveEvent.clientX - startX,
            top: startTop + moveEvent.clientY - startY,
          },
          size,
        ),
      );
    }

    function handleUp() {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  function handleResizeStart(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    event.currentTarget.setPointerCapture(event.pointerId);

    function handleMove(moveEvent: PointerEvent) {
      const maxWidth = Math.max(
        MAP_DIALOG_MIN_WIDTH,
        window.innerWidth - position.left - MAP_DIALOG_MARGIN,
      );
      const maxHeight = Math.max(
        MAP_DIALOG_MIN_HEIGHT,
        window.innerHeight - position.top - MAP_DIALOG_MARGIN,
      );

      setSize({
        width: Math.min(
          maxWidth,
          Math.max(
            MAP_DIALOG_MIN_WIDTH,
            startWidth + moveEvent.clientX - startX,
          ),
        ),
        height: Math.min(
          maxHeight,
          Math.max(
            MAP_DIALOG_MIN_HEIGHT,
            startHeight + moveEvent.clientY - startY,
          ),
        ),
      });
    }

    function handleUp() {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        data-map-dialog
        className="pointer-events-auto fixed flex min-h-0 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl"
        style={{
          left: position.left,
          top: position.top,
          width: size.width,
          height: size.height,
        }}
      >
        <div
          onPointerDown={handleDragStart}
          className="flex h-5 cursor-move touch-none items-center justify-center"
          aria-label="Drag map window"
          title="Drag map window"
        >
          <span className="h-1 w-10 rounded-full bg-zinc-300" />
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-sm leading-5 text-zinc-700">
              {scenario.meta.location.name}, {scenario.meta.location.address}
            </p>
            <p className="mt-1 text-xs leading-4 text-zinc-500">
              {scenario.meta.location.lat.toFixed(5)},{" "}
              {scenario.meta.location.lng.toFixed(5)}
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              aria-label="Close map"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 p-5">
          <ScenarioMap
            mode="readonly"
            scenario={scenario}
            heightClassName="h-full"
            zoom={17}
            interactive
            minZoom={12}
            maxZoom={19}
            showResetControl
          />
        </div>
        <button
          type="button"
          onPointerDown={handleResizeStart}
          aria-label="Resize map window"
          title="Resize map window"
          className="absolute bottom-1 right-1 h-5 w-5 cursor-nwse-resize rounded-sm text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
        >
          <span className="absolute bottom-1 right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-current" />
        </button>
      </div>
    </div>
  );
}

function clampMapDialogPosition(
  position: { left: number; top: number },
  size: { width: number; height: number },
) {
  const minLeft = -size.width / 2;
  const maxLeft = window.innerWidth - size.width / 2;
  const maxTop = window.innerHeight - size.height / 2;

  return {
    left: Math.min(maxLeft, Math.max(minLeft, position.left)),
    top: Math.min(maxTop, Math.max(MAP_DIALOG_MARGIN, position.top)),
  };
}

function MapDetailsPanel({
  region,
  scenarios,
  onToggleCollapse,
}: {
  region: MapRegion;
  scenarios: Scenario[];
  onToggleCollapse: () => void;
}) {
  const visibleScenarios = getVisibleScenarios(scenarios, region);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="shrink-0 py-4 pl-6 pr-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Current map area
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-950">
              {region.label}
            </h2>
            <p className="mt-1 text-sm leading-5 text-zinc-600">
              {region.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
          >
            <PanelRightClose size={20} />
          </button>
        </div>
      </header>

      <div className="border-y border-zinc-200 px-4 py-3 text-sm text-zinc-600">
        {visibleScenarios.length} marker
        {visibleScenarios.length === 1 ? "" : "s"} in this area
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {visibleScenarios.length > 0 ? (
          visibleScenarios.map((scenario, index) => (
            <div
              key={scenario.meta.scenarioId}
              className="border-b border-zinc-200 px-4 py-3 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-950">
                    {STAGE_LABELS[scenario.meta.stage]}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-zinc-600">
                    {scenario.meta.location.name}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="px-4 py-4 text-sm text-zinc-500">
            No scenario markers are available here yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default PracticeSidePanel;
