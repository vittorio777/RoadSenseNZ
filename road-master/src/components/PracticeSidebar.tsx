import {useState} from 'react'
import type { Stage, StageGroup } from "../contracts/scenario";
import {STAGE_TREE, STAGE_GROUP_LABELS, STAGE_LABELS} from '../config/stageConfig'
import { ChevronRight } from "lucide-react";
import {PanelLeftOpen, PanelLeftClose, PanelRightOpen, PanelRightClose} from "lucide-react";
import {Map, Book} from "lucide-react"

type SidebarNavProps = {
  onStageClick: (stageGroup: StageGroup, stage: Stage) => void;
};


const PracticeSidebar = ({onStageClick}: SidebarNavProps) => {
  const [expandedGroups, setExpandedGroups] = useState<StageGroup[]>([]);
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

  return (
    <div className='flex flex-col min-h-0 h-full'>
        <div className='shrink-0'>
            <header className="flex items-center justify-between px-4 py-4">
                <h1 className="cursor-pointer text-2xl font-semibold tracking-tight text-zinc-900">
                    RoadSense
                </h1>
                <button
                    type="button"
                    // onClick={handleCollapseSidebar}
                    aria-label="Collapse sidebar"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
                >
                    <PanelLeftClose size={20} />
                </button>
            </header>

            <div className="px-4 py-4 flex gap-2 cursor-pointer hover:bg-zinc-200 rounded-md">
                <Map /> 
                <span>地图模式</span>
            </div>
            <div className="px-4 py-2 flex gap-2 cursor-default">
                <Book />
                <span>章节学习</span>
            </div>
        </div>
        <div className='min-h-0 flex-1 overflow-y-auto pb-4 pl-1 [scrollbar-gutter:stable]'>

            {STAGE_TREE.map((groupItem) => {
                const isExpanded = expandedGroups.includes(groupItem.group);
                return (
                    <div key={groupItem.group}>
                        <button 
                            onClick={() => handleGroupClick(groupItem.group)} 
                            className="flex w-full items-center gap-2 justify-between rounded-md px-4 py-2 text-left text-sm font-semibold text-zinc-900 hover:bg-zinc-200 cursor-pointer"
                        >
                            <span>{STAGE_GROUP_LABELS[groupItem.group]}</span>
                            <ChevronRight
                                size={16}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                                }`}
                            />
                        </button>
                        <ul>
                            {isExpanded &&
                            groupItem.stages.map((stage) => {
                                const isCurrentStage = selectedStage === stage;

                                return (
                                <li key={stage}>
                                    <button
                                    onClick={() => handleStageClick(groupItem.group, stage)}
                                    className={
                                        isCurrentStage
                                        ? "flex w-full cursor-pointer items-center gap-2 rounded-md bg-zinc-200 px-2 py-2 pl-8 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-200"
                                        : "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 pl-4 text-left text-sm font-normal text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                                    }
                                    >
                                    <span
                                        className={
                                        isCurrentStage
                                            ? "h-2 w-2 shrink-0 rounded-full bg-blue-500"
                                            : "h-2 w-2 shrink-0 rounded-full bg-transparent"
                                        }
                                    />

                                    <span>{STAGE_LABELS[stage]}</span>
                                    </button>
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default PracticeSidebar