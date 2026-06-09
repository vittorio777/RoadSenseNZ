import React, {useState} from 'react'
import ScenarioPlayer from './ScenarioPlayer';
import sumMockScenario from '../content/scenario/Intersections/sumMockScenario';


const PracticePage = () => {
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

  return (
    <div>
      <h2>Practice Page</h2>
      
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