import type {Scenario} from '../../contracts/scenario'




const modules = import.meta.glob('./**/*.scenario.ts', {eager: true}) as Record<string, {mockScenario: Scenario}>;

export const allMockScenario: Scenario[] = Object.values(modules).map((module) => module.mockScenario).filter(Boolean);

// export const ScenarioIdArray: Record<string, number | null> = Object.fromEntries(allMockScenario.map((senario) => [senario.meta.scenarioId, null]))