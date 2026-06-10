import {useState} from 'react'
import ScenarioPlayer from './ScenarioPlayer';
import SidebarNav from './SidebarNav'
import type { Stage, StageGroup } from "../contracts/scenario";
import sumMockScenario from '../content/scenario/Intersections/sumMockScenario';
// 编个分章节的数据，然后用group和stage来确定sum，然后接上之前的工作


const PracticePage = () => {
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [currentStageGroup, setCurrentStageGroup] = useState<StageGroup | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userSelectedOptions, setUserSelectedOptions] = useState<(number | null)[]>(Array(sumMockScenario.length).fill(null));

  function handleScenarioChange(index: number) {
    setCurrentScenarioIndex(index);
  }

  function handleUserSelectedOptions(optionIndex: number) {
    // 处理选项选择逻辑，例如记录用户选择、显示解释等
    setUserSelectedOptions(prev => {
        const newSelectedOptions = [...prev];
        newSelectedOptions[currentScenarioIndex] = optionIndex;
        return newSelectedOptions;
    });
  }

  function handleStageClick(stageGroup: StageGroup, stage: Stage) {
    setCurrentStageGroup(stageGroup);
    setCurrentStage(stage);
  }

  return (
    <div>
      <h2>Practice Page</h2>

      <SidebarNav onStageClick={handleStageClick}/>
      
      {/* 切换题目按钮 */}
      <div>
        {sumMockScenario.map((_, index) => {
            return (<button key={index} 
                onClick={() => handleScenarioChange(index)} 
                style={{border: currentScenarioIndex === index ? '2px solid blue' : '2px solid lightgray',
                    backgroundColor:  userSelectedOptions[index] !== null ? 
                    (sumMockScenario[index].questions.options[userSelectedOptions[index]].isCorrect ? 'lightgreen' : 'red') : 'lightgray'}}>{index + 1}
                </button>)
        })}
      </div>
      
      {/* 播放器 */}
      <ScenarioPlayer 
        key={sumMockScenario[currentScenarioIndex].meta.scenarioId} 
        mockScenario={sumMockScenario[currentScenarioIndex]} 
        handleClickOption={handleUserSelectedOptions} 
        userSelectedOption={userSelectedOptions[currentScenarioIndex]}
      />
    </div>
  )
}

export default PracticePage