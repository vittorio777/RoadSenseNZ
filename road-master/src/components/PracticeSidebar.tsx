import { useEffect, useRef, useState } from "react";
import type { PracticeMode } from "./PracticePage";
import type { MapRegionId } from "../config/mapConfig";
import { getRegionById, MAP_AREA_TREE } from "../config/mapConfig";
import type { Stage, StageGroup } from "../contracts/scenario";
import {
  STAGE_GROUP_LABELS,
  STAGE_LABELS,
  STAGE_TREE,
} from "../config/stageConfig";
import {
  Book,
  ChevronRight,
  HardDrive,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";

const modeButtonClass =
  "relative -mb-px flex min-h-9 w-full items-center justify-center rounded-t-sm border px-2.5 pb-2 pt-1.5 text-sm font-semibold transition";
const activeModeButtonClass =
  "z-10 border-zinc-200/60 border-b-white bg-white text-blue-600 [&_svg]:text-blue-600";
const inactiveModeButtonClass =
  "border-transparent text-zinc-500 hover:text-zinc-900";

const groupButtonClass =
  "flex min-h-10 w-full items-center justify-between gap-2 rounded-md px-4 py-1.5 text-left text-[15px] font-semibold text-zinc-900 hover:bg-zinc-50";
const childButtonBaseClass =
  "relative flex min-h-9 w-full items-center rounded-md px-4 py-1.5 text-left text-sm leading-6 transition";
const activeChildButtonClass =
  "bg-blue-50/45 font-normal text-zinc-950 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-0.5 before:rounded-full before:bg-blue-500";
const inactiveChildButtonClass =
  "font-normal text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900";
const listGroupClass = "mx-4";
const disabledStageGroups = new Set<StageGroup>([
  "CountryRoad",
  "Motorway",
  "Hazards",
  "Emergency",
]);
const disabledStages = new Set<Stage>([
  "urban_general",
  "car_parks",
  "roundabouts",
]);

type SidebarNavProps = {
  mode: PracticeMode;
  isCollapsed: boolean;
  selectedRegionId: MapRegionId;
  onToggleCollapse: () => void;
  onModeChange: (mode: PracticeMode) => void;
  onHomeClick: () => void;
  onMapRegionClick: (regionId: MapRegionId) => void;
  onStageClick: (stageGroup: StageGroup, stage: Stage) => void;
  isProgressEnabled: boolean;
  onToggleProgress: () => void;
};

const PracticeSidebar = ({
  mode,
  isCollapsed,
  selectedRegionId,
  onToggleCollapse,
  onModeChange,
  onHomeClick,
  onMapRegionClick,
  onStageClick,
  isProgressEnabled,
  onToggleProgress,
}: SidebarNavProps) => {
  const [expandedGroups, setExpandedGroups] = useState<StageGroup[]>([]);
  const [expandedMapRegions, setExpandedMapRegions] = useState<MapRegionId[]>(
    ["auckland"],
  );
  const [selectedStage, setSelectedStage] = useState<Stage>();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  function handleGroupClick(group: StageGroup) {
    setExpandedGroups((current) => {
      if (current.includes(group)) {
        return current.filter((item) => item !== group);
      }
      return [...current, group];
    });
  }

  function handleStageClick(stageGroup: StageGroup, stage: Stage) {
    onStageClick(stageGroup, stage);
    setSelectedStage(stage);
  }

  function handleMapGroupClick(regionId: MapRegionId) {
    onMapRegionClick(regionId);
  }

  function handleMapGroupToggle(regionId: MapRegionId) {
    setExpandedMapRegions((current) =>
      current.includes(regionId)
        ? current.filter((item) => item !== regionId)
        : [...current, regionId],
    );
  }

  useEffect(() => {
    if (!isSettingsOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (settingsRef.current?.contains(event.target as Node)) return;
      setIsSettingsOpen(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isSettingsOpen]);

  if (isCollapsed) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center border-r border-zinc-200 bg-zinc-50 pb-3 pt-4">
        <div className="group relative flex h-8 w-full justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-[14px] font-bold tracking-tight text-zinc-900 opacity-100 transition-opacity duration-150 group-hover:opacity-0">
            RS
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="absolute inset-y-0 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-md text-zinc-500 opacity-0 transition-opacity duration-150 hover:bg-zinc-200 hover:text-zinc-900 group-hover:opacity-100"
          >
            <PanelLeftOpen size={20} />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onModeChange("chapter")}
            aria-label="Chapters"
            title="Chapters"
            className={[
              "flex h-10 w-10 items-center justify-center rounded-md transition",
              mode === "chapter"
                ? "bg-zinc-100 text-blue-600"
                : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900",
            ].join(" ")}
          >
            <Book size={19} />
          </button>
          <button
            type="button"
            onClick={() => onModeChange("map")}
            aria-label="Map"
            title="Map"
            className={[
              "flex h-10 w-10 items-center justify-center rounded-md transition",
              mode === "map"
                ? "bg-zinc-100 text-blue-600"
                : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900",
            ].join(" ")}
          >
            <Map size={19} />
          </button>
        </div>

        <div
          ref={settingsRef}
          className="relative mt-auto flex w-full justify-center"
        >
          {isSettingsOpen && (
            <SettingsPanel
              isProgressEnabled={isProgressEnabled}
              onToggleProgress={onToggleProgress}
              isCollapsed
            />
          )}
          <button
            type="button"
            onClick={() => setIsSettingsOpen((current) => !current)}
            aria-label="Settings"
            title="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <header className="flex items-center justify-between px-4 pb-3 pt-4">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            <button
              type="button"
              onClick={onHomeClick}
              className="appearance-none border-0 bg-transparent p-0 text-left text-inherit hover:text-zinc-700"
            >
              RoadSense
            </button>
          </h1>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
          >
            <PanelLeftClose size={20} />
          </button>
        </header>

        <div className="mx-4 mt-3 grid grid-cols-2 gap-0">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => onModeChange("chapter")}
              className={[
                modeButtonClass,
                mode === "chapter"
                  ? activeModeButtonClass
                  : inactiveModeButtonClass,
              ].join(" ")}
            >
              <span className="flex items-center justify-center gap-2">
                <Book size={18} />
                <span>Chapters</span>
              </span>
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onModeChange("map")}
              className={[
                modeButtonClass,
                mode === "map"
                  ? activeModeButtonClass
                  : inactiveModeButtonClass,
              ].join(" ")}
            >
              <span className="flex items-center justify-center gap-2">
                <Map size={18} />
                <span>Map</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {mode === "home" ? (
        <div className="min-h-0 flex-1 px-4 pt-4">
          <p className="text-sm leading-6 text-zinc-500">
            Choose a mode above to begin.
          </p>
        </div>
      ) : (
        <div key={mode} className="mx-4 flex min-h-0 flex-1 flex-col">
          <div
            className={[
              "min-h-0 flex-1 overflow-y-auto border border-zinc-200/60 bg-white px-0 pb-4 pt-5 [scrollbar-gutter:stable]",
              mode === "chapter"
                ? "rounded-r-md rounded-bl-md"
                : "rounded-l-md rounded-br-md",
            ].join(" ")}
          >
            <p className="px-6 pb-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
              {mode === "map" ? "Browse by location" : "Browse by chapter"}
            </p>
            {mode === "chapter" ? (
              <ChapterContent
                expandedGroups={expandedGroups}
                selectedStage={selectedStage}
                onGroupClick={handleGroupClick}
                onStageClick={handleStageClick}
              />
            ) : (
              <MapContent
                expandedRegionIds={expandedMapRegions}
                selectedRegionId={selectedRegionId}
                onMapGroupClick={handleMapGroupClick}
                onMapGroupToggle={handleMapGroupToggle}
                onMapRegionClick={onMapRegionClick}
              />
            )}
          </div>
        </div>
      )}

      <div className="relative shrink-0 px-4 py-3">
        <div ref={settingsRef} className="relative">
          {isSettingsOpen && (
            <SettingsPanel
              isProgressEnabled={isProgressEnabled}
              onToggleProgress={onToggleProgress}
              className="left-0 right-0"
            />
          )}
          <button
            type="button"
            onClick={() => setIsSettingsOpen((current) => !current)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function SettingsPanel({
  isProgressEnabled,
  onToggleProgress,
  isCollapsed = false,
  placement = "top",
  className = "",
}: {
  isProgressEnabled: boolean;
  onToggleProgress: () => void;
  isCollapsed?: boolean;
  placement?: "top" | "side";
  className?: string;
}) {
  return (
    <div
      className={[
        "absolute z-20 rounded-t-md rounded-b-[3px] border border-zinc-200/70 bg-white p-1.5",
        placement === "side"
          ? "bottom-3 left-full ml-2 w-52"
          : isCollapsed
            ? "bottom-full left-2 w-48"
            : `bottom-full ${className || "left-4 right-4"}`,
      ].join(" ")}
    >
      <div className="flex min-h-9 w-full items-center justify-between rounded-sm px-2 py-2 text-sm font-medium text-zinc-600">
        <span className="flex items-center gap-2">
          <HardDrive size={14} strokeWidth={1.8} />
          <span>Memory</span>
        </span>
        <button
          type="button"
          onClick={onToggleProgress}
          aria-label={isProgressEnabled ? "Turn memory off" : "Turn memory on"}
          className={[
            "flex h-4 w-7 items-center rounded-full p-0.5 transition",
            isProgressEnabled ? "bg-blue-500/85" : "bg-zinc-300",
          ].join(" ")}
        >
          <span
            className={[
              "h-3 w-3 rounded-full bg-white shadow-sm transition-transform",
              isProgressEnabled ? "translate-x-3" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
    </div>
  );
}

function ChapterContent({
  expandedGroups,
  selectedStage,
  onGroupClick,
  onStageClick,
}: {
  expandedGroups: StageGroup[];
  selectedStage?: Stage;
  onGroupClick: (group: StageGroup) => void;
  onStageClick: (stageGroup: StageGroup, stage: Stage) => void;
}) {
  return (
    <div className={listGroupClass}>
      {STAGE_TREE.map((groupItem) => {
        const isDisabled = disabledStageGroups.has(groupItem.group);
        const isExpanded = expandedGroups.includes(groupItem.group);

        return (
          <div
            key={groupItem.group}
            className="border-b border-zinc-200/40 py-1.5"
          >
            <button
              type="button"
              onClick={() => {
                if (isDisabled) return;
                onGroupClick(groupItem.group);
              }}
              disabled={isDisabled}
              className={[
                groupButtonClass,
                isDisabled
                  ? "cursor-not-allowed !text-zinc-300 hover:bg-transparent"
                  : "",
              ].join(" ")}
            >
              <span>{STAGE_GROUP_LABELS[groupItem.group]}</span>
              <ChevronRight
                size={16}
                className={`transition-transform duration-200 ${
                  isDisabled ? "text-zinc-300" : "text-zinc-400"
                } ${isExpanded ? "rotate-90" : ""}`}
              />
            </button>
            {isExpanded && (
              <ul className="ml-3 pt-0.5">
                {groupItem.stages.map((stage) => {
                  const isCurrentStage = selectedStage === stage;
                  const isStageDisabled = disabledStages.has(stage);

                  return (
                    <li key={stage}>
                      <button
                        type="button"
                        onClick={() => {
                          if (isStageDisabled) return;
                          onStageClick(groupItem.group, stage);
                        }}
                        disabled={isStageDisabled}
                        className={[
                          childButtonBaseClass,
                          isStageDisabled
                            ? "cursor-not-allowed font-normal text-zinc-300 hover:bg-transparent"
                            : isCurrentStage
                              ? activeChildButtonClass
                              : inactiveChildButtonClass,
                        ].join(" ")}
                      >
                        <span>{STAGE_LABELS[stage]}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MapContent({
  expandedRegionIds,
  selectedRegionId,
  onMapGroupClick,
  onMapGroupToggle,
  onMapRegionClick,
}: {
  expandedRegionIds: MapRegionId[];
  selectedRegionId: MapRegionId;
  onMapGroupClick: (regionId: MapRegionId) => void;
  onMapGroupToggle: (regionId: MapRegionId) => void;
  onMapRegionClick: (regionId: MapRegionId) => void;
}) {
  return (
    <div className={listGroupClass}>
      {MAP_AREA_TREE.map((node) => {
        const region = getRegionById(node.regionId);
        const isExpanded = expandedRegionIds.includes(node.regionId);
        const isSelected = node.regionId === selectedRegionId;

        return (
          <div
            key={node.regionId}
            className="border-b border-zinc-200/40 py-1.5"
          >
            <button
              type="button"
              onClick={() => onMapGroupClick(node.regionId)}
              className={[
                groupButtonClass,
                isSelected ? "bg-zinc-100" : "",
              ].join(" ")}
            >
              <span>{region.label}</span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
                  region.label
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  onMapGroupToggle(node.regionId);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  event.stopPropagation();
                  onMapGroupToggle(node.regionId);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:text-zinc-700"
              >
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>

            {isExpanded && node.children && (
              <ul className="ml-3 pt-0.5">
                {node.children.map((child) => {
                  const childRegion = getRegionById(child.regionId);
                  const isCurrentRegion = child.regionId === selectedRegionId;

                  return (
                    <li key={child.regionId}>
                      <button
                        type="button"
                        onClick={() => onMapRegionClick(child.regionId)}
                        className={[
                          childButtonBaseClass,
                          isCurrentRegion
                            ? activeChildButtonClass
                            : inactiveChildButtonClass,
                        ].join(" ")}
                      >
                        <span>{childRegion.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PracticeSidebar;
