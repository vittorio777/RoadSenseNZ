import { useState } from 'react'
import ScenarioCanvas from './ScenarioCanvas';
import type {StageScenario, Scenario} from '../contracts/scenario';

const ScenarioPlayer = ({mockScenario, handleClickOption, userSelectedOption}: {mockScenario: Scenario, handleClickOption: (optionIndex: number) => void; userSelectedOption:(number | null)}) => {
  const [replayKey, setReplayKey] = useState(0); // 用于重置动画
  const [stageScenario, setStageScenario] = useState<StageScenario>({
      tracks: mockScenario.animations.script.introTracks,
      duration: mockScenario.animations.script.introDuration,
      width: mockScenario.animations.width,
      height: mockScenario.animations.height,
    })

  function handleOptionSelect(optionId: string) {
    const optionIndex = optionId.charCodeAt(0) - 'A'.charCodeAt(0);
    const newStageScenario = {
      tracks: mockScenario.animations.script.optionTracks[optionIndex].tracks,
      duration: mockScenario.animations.script.optionDuration,
      width: mockScenario.animations.width,
      height: mockScenario.animations.height,
    };

    setStageScenario(newStageScenario);
    setReplayKey(prev => prev + 1); // 通过改变 key 来重置动画
    handleClickOption(optionIndex);
  }


  return (
    <div>
      <h2>{mockScenario.questions.prompt}</h2>

      {/* 画布 */}
      <div>
        <ScenarioCanvas key={replayKey} scenario={stageScenario} />
      </div>

      {/* 回答选项 */}
      <div>
        <ul>
          {mockScenario.questions.options.map(option => (
            <li key={option.id} onClick={() => handleOptionSelect(option.id)} 
            style={{cursor: 'pointer', color: userSelectedOption === (option.id.charCodeAt(0) - 'A'.charCodeAt(0)) ? (option.isCorrect ? 'lightgreen' : 'red') : 'lightgray'}}>
              {option.id}. {option.text}
            </li>
          ))}
        </ul>
      </div>

      {/* 问题解析 */}
      <div>
        {userSelectedOption !== null && (
          <div>
            <h3>Explanation:</h3>
            <p>{mockScenario.questions.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScenarioPlayer