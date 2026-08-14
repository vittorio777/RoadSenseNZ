import { useState } from "react";
import type { PracticeMode } from "./PracticePage";
import type { MapRegionId } from "./ScenarioMap";
import { getRegionById, MAP_AREA_TREE } from "./ScenarioMap";
import type { Stage, StageGroup } from "../contracts/scenario";
import {
  STAGE_GROUP_LABELS,
  STAGE_LABELS,
  STAGE_TREE,
} from "../config/stageConfig";
import { Book, ChevronRight, Map, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const modeButtonClass =
  "relative flex min-h-10 flex-1 items-center justify-center pb-2.5 pt-1.5 text-sm font-semibold transition";
const activeModeButtonClass =
  "text-blue-600 [&_svg]:text-blue-600";
const inactiveModeButtonClass =
  "text-zinc-500 hover:text-zinc-900";

const groupButtonClass =
  "flex min-h-9 w-full items-center justify-between gap-2 rounded-md px-4 py-1.5 text-left text-[15px] font-semibold text-zinc-900 hover:bg-zinc-100";
const childButtonBaseClass =
  "relative flex min-h-8 w-full items-center rounded-md px-4 py-1.5 text-left text-[13px] leading-5 transition";
const activeChildButtonClass =
  "bg-blue-50/45 font-normal text-zinc-950 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-0.5 before:rounded-full before:bg-blue-500";
const inactiveChildButtonClass =
  "font-normal text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900";
const listGroupClass = "mx-3 border-t border-zinc-200/70";

type SidebarNavProps = {
  mode: PracticeMode;
  isCollapsed: boolean;
  selectedRegionId: MapRegionId;
  onToggleCollapse: () => void;
  onModeChange: (mode: PracticeMode) => void;
  onHomeClick: () => void;
  onMapRegionClick: (regionId: MapRegionId) => void;
  onStageClick: (stageGroup: StageGroup, stage: Stage) => void;
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
}: SidebarNavProps) => {
  const [expandedGroups, setExpandedGroups] = useState<StageGroup[]>([]);
  const [expandedMapRegions, setExpandedMapRegions] = useState<MapRegionId[]>([
    "auckland",
  ]);
  const [selectedStage, setSelectedStage] = useState<Stage>();

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
    setExpandedMapRegions((current) => {
      if (current.includes(regionId)) {
        return current.filter((item) => item !== regionId);
      }
      return [...current, regionId];
    });
    onMapRegionClick(regionId);
  }

  if (isCollapsed) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center border-r border-zinc-200 bg-zinc-50 pb-3 pt-4">
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
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

        <div className="mx-4 grid grid-cols-2 border-b border-zinc-100">
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
            <span className="flex w-28 items-center justify-center gap-2">
              <Book size={18} />
              <span>Chapters</span>
            </span>
            {mode === "chapter" && (
              <span className="absolute bottom-[-1px] left-1/2 h-0.5 w-[72px] -translate-x-1/2 rounded-full bg-blue-600" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onModeChange("map")}
            className={[
              modeButtonClass,
              mode === "map" ? activeModeButtonClass : inactiveModeButtonClass,
            ].join(" ")}
          >
            <span className="flex w-28 -translate-x-1 items-center justify-center gap-2">
              <Map size={18} />
              <span>Map</span>
            </span>
            {mode === "map" && (
              <span className="absolute bottom-[-1px] left-1/2 h-0.5 w-[72px] -translate-x-1/2 rounded-full bg-blue-600" />
            )}
          </button>
        </div>
      </div>

      {mode === "home" ? (
        <p className="px-4 pt-4 text-sm leading-6 text-zinc-500">
          Choose a mode above to begin.
        </p>
      ) : (
        <div key={mode} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-0 pb-4 pt-4 [scrollbar-gutter:stable]">
            <p className="px-6 pb-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
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
                onMapRegionClick={onMapRegionClick}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
        const isExpanded = expandedGroups.includes(groupItem.group);

        return (
          <div key={groupItem.group} className="border-b border-zinc-200/70 py-1.5">
            <button
              type="button"
              onClick={() => onGroupClick(groupItem.group)}
              className={groupButtonClass}
            >
              <span>{STAGE_GROUP_LABELS[groupItem.group]}</span>
              <ChevronRight
                size={16}
                className={`text-zinc-400 transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            </button>
            <ul className="ml-3 pt-0.5">
              {isExpanded &&
                groupItem.stages.map((stage) => {
                  const isCurrentStage = selectedStage === stage;

                  return (
                    <li key={stage}>
                      <button
                        type="button"
                        onClick={() => onStageClick(groupItem.group, stage)}
                        className={[
                          childButtonBaseClass,
                          isCurrentStage
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
  onMapRegionClick,
}: {
  expandedRegionIds: MapRegionId[];
  selectedRegionId: MapRegionId;
  onMapGroupClick: (regionId: MapRegionId) => void;
  onMapRegionClick: (regionId: MapRegionId) => void;
}) {
  return (
    <div className={listGroupClass}>
      {MAP_AREA_TREE.map((node) => {
        const region = getRegionById(node.regionId);
        const isExpanded = expandedRegionIds.includes(node.regionId);
        const isSelected = node.regionId === selectedRegionId;

        return (
          <div key={node.regionId} className="border-b border-zinc-200/70 py-1.5">
            <button
              type="button"
              onClick={() => onMapGroupClick(node.regionId)}
              className={[
                groupButtonClass,
                isSelected ? "bg-zinc-100" : "",
              ].join(" ")}
            >
              <span>{region.label}</span>
              <ChevronRight
                size={16}
                className={`text-zinc-400 transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
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
