import type {Scenario} from '../contracts/scenario'
import type {Location} from "../contracts/scenario";
import {PanelRightClose} from "lucide-react";

const PracticeSidePanel = ({currentMockScenarios, currentLocation, progressByScenarioId, handleScenarioChange}: 
        {currentMockScenarios: Scenario[], currentLocation: Location, progressByScenarioId: Record<string, number>, handleScenarioChange: (index: number)=>void}) => {
    
    const answeredCount = currentMockScenarios.filter((scenario) => {
        const scenarioId = scenario.meta.scenarioId;
        return scenarioId in progressByScenarioId;
    }).length;

    
  return (
    <div className='flex flex-col min-h-0 h-full'>
        <div className='shrink-0'>
            {/* Header */}
            <header className='flex py-4 px-4'>
                <button className='flex cursor-pointer h-8 w-8 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 items-center justify-center rounded-md'>
                    <PanelRightClose size={20}/>
                </button>
                <div className='flex flex-1 justify-between items-center'>
                    <span>题目进度</span>
                    <span>
                        <span className='font-semibold'>{answeredCount}</span>
                        <span> {"/"} {currentMockScenarios.length}</span>
                    </span>
                </div>
            </header>

            {/* Progress grid */}
            <div className="grid grid-cols-5 gap-2 px-4 pl-12">
                {currentMockScenarios.map((scenario, index) => {
                    const scenarioId = scenario.meta.scenarioId;
                    const isCurrentScenario = currentLocation.scenarioIndex === index;
                    const selectedOptionIndex = progressByScenarioId[scenarioId];
                    const isAnswered = selectedOptionIndex !== undefined;
                    const isCorrect = isAnswered ? scenario.questions.options[selectedOptionIndex].isCorrect : false;
                    const statusClass = isAnswered
                        ? isCorrect
                        ? "border-green-300 bg-green-100 text-green-700"
                        : "border-red-300 bg-red-100 text-red-700"
                        : "border-zinc-200 bg-white text-zinc-600";

                    const currentClass = isCurrentScenario
                        ? "ring-2 ring-zinc-400"
                        : "";

                    return (
                        <button 
                            key={index} 
                            onClick={() => handleScenarioChange(index)} 
                            className={[
                                "flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-sm text-zinc-900 font-medium hover:border-zinc-400 transition cursor-pointer",
                                statusClass,
                                currentClass,
                            ].join(" ")}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            {/* legend */}
            <div className='flex gap-2 justify-between px-4 pl-12 pt-4 text-sm'>
                <div className='flex items-center gap-1'>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-green-600"/>
                    <span>Correct</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-300"/>
                    <span>Not answered</span>
                </div>            
                <div className='flex items-center gap-1'>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-red-600"/>
                    <span>Incorrect</span>
                </div>
            </div>
        </div>
        <div className='overflow-y-auto'>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>
            {/* Map */}
            <div className='py-4 px-4 pl-8'>
                地图
            </div>            
        </div>

    </div>
    
  )
}

export default PracticeSidePanel