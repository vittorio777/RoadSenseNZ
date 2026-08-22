import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
} from "../../../../contracts/scenario";
import { paidParkingLocation, paidParkingVisual } from "./paidParkingVisual";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "parking_paid_machine_0001",
  interactionType: "STATIC_ONLY",
  stageGroup: "Parking",
  stage: "roadside_parking",
  tags: ["paid-parking", "parking-sign"],
  articles: ["article-paid-parking", "article-parking-signs"],
  preview:
    "A paid parking zone sign says the parking conditions are on the machine and that times may vary.",
  location: paidParkingLocation,
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should the driver do before parking here?",
  options: [
    {
      id: "A",
      text: "Check the parking machine for the current conditions and pay if required.",
      isCorrect: true,
    },
    {
      id: "B",
      text: "Park for free because the sign does not show exact times.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Only look for road markings because the parking machine conditions do not matter.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Leave the car and check the conditions later.",
      isCorrect: false,
    },
  ],
  explanation:
    "The sign indicates a paid parking zone and says the conditions are on the parking machine. Because times and fees can vary, the driver should check the machine before leaving the vehicle and follow the displayed requirements.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "PAID_PARKING_MACHINE_001",
  width: 800,
  height: 600,
  script: {
    introDuration: 0,
    introTracks: [],
    optionDuration: 0,
    optionTracks: [],
  },
};

export const mockScenario: Scenario = {
  meta: mockScenarioMeta,
  questions: mockScenarioQuestion,
  animations: mockScenarioAnimation,
  staticVisual: paidParkingVisual,
};
