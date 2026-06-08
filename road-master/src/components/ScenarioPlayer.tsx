import React, { useEffect, useRef, useState } from 'react'
import ScenarioCanvas from './ScenarioCanvas';
import type {StageScenario} from '../contracts/scenario';
import {mockScenario} from '../content/scenario/mockScenario';

const ScenarioPlayer = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  let stageScenario: StageScenario;
  
  if (selectedOptionId === null) {
    // 还未选择，展示 intro 动画
    stageScenario = {
      tracks: mockScenario.animations.script.introTracks,
      duration: mockScenario.animations.script.introDuration,
      width: mockScenario.animations.width,
      height: mockScenario.animations.height,
    }
  } else {
    // 已选择，展示对应选项动画
    stageScenario = {
      tracks: mockScenario.animations.script.optionTracks[selectedOptionId].tracks,
      duration: mockScenario.animations.script.optionDuration,
      width: mockScenario.animations.width,
      height: mockScenario.animations.height,
    };
  }


  return (
    <div>
      <h2>{mockScenario.questions.prompt}</h2>

      <div>
        <ScenarioCanvas scenario={stageScenario} />
      </div>

      <div>
        <ul>
          {mockScenario.questions.options.map(option => (
            <li key={option.id} onClick={() => setSelectedOptionId(option.id.charCodeAt(0) - 'A'.charCodeAt(0))}>
              {option.id}. {option.text}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {selectedOptionId !== null && (
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