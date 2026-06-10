import type {Scenario} from '../contracts/scenario'
import type {Location} from "../contracts/scenario";

const PracticeSidePanel = ({currentMockScenarios, currentLocation, progressByScenarioId, handleScenarioChange}: 
        {currentMockScenarios: Scenario[], currentLocation: Location, progressByScenarioId: Record<string, number>, handleScenarioChange: (index: number)=>void}) => {
    
  return (
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
  )
}

export default PracticeSidePanel