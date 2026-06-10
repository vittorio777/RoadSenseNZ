import {useState} from 'react'
import ScenarioPlayer from './ScenarioPlayer';
import SidebarNav from './PracticeSidebar'
import type { Stage, StageGroup, Location} from "../contracts/scenario";
import {allMockScenario} from '../content/scenario/index';

const PracticePage = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({stageGroup: null, stage: null, scenarioIndex: 0});
  const [progressByScenarioId, setProgressByScenarioId] = useState<Record<string, number>>({})

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
    <div>
      <h2>Practice Page</h2>

      <SidebarNav onStageClick={handleStageClick}/>
      
      {/* 切换题目按钮 */}
      <div>
        {currentMockScenarios.map((scenario, index) => {
            const scenarioId = scenario.meta.scenarioId;
            const isCurrentScenario = currentLocation.scenarioIndex === index;
            const selectedOptionIndex = progressByScenarioId[scenarioId];
            const isAnswered = selectedOptionIndex !== undefined;
            const isCorrect = isAnswered ? scenario.questions.options[selectedOptionIndex].isCorrect : false;
            const border = isCurrentScenario ? '2px solid blue' : '2px solid lightgray';
            const backgroundColor = isAnswered ? (isCorrect ? 'lightgreen' : 'red') : 'lightgray';

            return (
                <button 
                    key={index} 
                    onClick={() => handleScenarioChange(index)} 
                    style={{border,backgroundColor}}
                >
                    {index + 1}
                </button>
            );
        })}
      </div>
      
      {/* 播放器 */}
      {currentMockScenario && (
        <ScenarioPlayer 
            key={currentMockScenario.meta.scenarioId} 
            mockScenario={currentMockScenario} 
            handleUserSelections={handleUserSelections} 
            userSelectedOption={
                progressByScenarioId[currentMockScenario.meta.scenarioId]
            }
        />
      )}
    </div>
  )
}

export default PracticePage