import {useState} from 'react'
import ScenarioPlayer from './ScenarioPlayer';
import PracticeSidebar from './PracticeSidebar'
import PracticeSidePanel from './PracticeSidePanel'
import type { Stage, StageGroup, Location} from "../contracts/scenario";
import {allMockScenario} from '../content/scenario/index';
import CollapsedPracticeSidebar from './CollapsedPracticeSidebar';
import CollapsedPracticeSidePanel from './CollapsedPracticeSidePanel';

type UiState = {
  isLeftBarCollapsed: boolean,
  isRightPanelCollapsed: boolean,
}

const PracticePage = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({stageGroup: null, stage: null, scenarioIndex: 0});
  const [progressByScenarioId, setProgressByScenarioId] = useState<Record<string, number>>({});
  const [uiState, setUiState] = useState<UiState>({isLeftBarCollapsed: false, isRightPanelCollapsed: false});

  // 当前章节中的全部scenario
  const currentMockScenarios = currentLocation.stageGroup && currentLocation.stage ? allMockScenario.filter((item) => (
    item.meta.stageGroup === currentLocation.stageGroup && item.meta.stage === currentLocation.stage)): [];

  // 当前展示的题的scenario
  const currentMockScenario = currentMockScenarios[currentLocation.scenarioIndex]
  
  // 右侧小方格切换问题
  function handleScenarioChange(index: number) {
    setCurrentLocation((prev) => ({...prev, scenarioIndex: index}));
  }

  // 处理选项选择逻辑，例如记录用户选择、显示解释等
  function handleUserSelections(optionIndex: number) {
    const scenarioId = currentMockScenario.meta.scenarioId;
    setProgressByScenarioId((prev) => ({...prev, [scenarioId]: optionIndex}))
  }

  // 左侧章节切换
  function handleStageClick(stageGroup: StageGroup, stage: Stage) {
    setCurrentLocation({stageGroup, stage, scenarioIndex: 0});
  }


  return (
      <div className="h-screen overflow-hidden bg-white text-zinc-900">
        <div className="grid h-full grid-cols-[280px_minmax(0,1fr)_320px]">

          <div className="min-h-0">
            {/* 展开左侧导航栏 */}
            <aside className="h-full min-h-0 border-r border-zinc-200 bg-zinc-50">
                <PracticeSidebar onStageClick={handleStageClick}/>
            </aside>

            {/* 折叠左侧导航栏
            <aside className="h-full overflow-y-auto border-r bg-zinc-50">
              <div className="p-4">
                <CollapsedPracticeSidebar />
              </div>
            </aside> */}
          </div>

          {/* 中间播放器 */}
          <main className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <div className="mx-auto w-full max-w-[820px] pb-10">
              {currentMockScenario ? (
                <div className="w-full max-w-[900px]">
                  <ScenarioPlayer
                    key={currentMockScenario.meta.scenarioId}
                    mockScenario={currentMockScenario}
                    handleUserSelections={handleUserSelections}
                    userSelectedOption={
                      progressByScenarioId[currentMockScenario.meta.scenarioId]
                    }
                  />
                </div>
              ) : (
                <div className="text-sm text-zinc-500">
                  Select a chapter from the left sidebar.
                </div>
              )}
            </div>
          </main>

          <div className="min-h-0">
            {/* 右侧题目控制面板 */}
            <aside className="h-full min-h-0 border-l border-zinc-200 bg-zinc-50">
                <PracticeSidePanel 
                  currentMockScenarios={currentMockScenarios} 
                  currentLocation={currentLocation} 
                  progressByScenarioId={progressByScenarioId} 
                  handleScenarioChange={handleScenarioChange}
                />
            </aside>

            {/* 折叠右侧控制面板
            <aside className="h-full min-h-0 border-l border-zinc-200 bg-zinc-50">
                <CollapsedPracticeSidePanel />
            </aside>             */}
          </div>

        </div>
      </div>
  )
}


export default PracticePage