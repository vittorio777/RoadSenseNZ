import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
} from "../../../../contracts/scenario";
import { paidParkingLocation, paidParkingVisual } from "./paidParkingVisual";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "parking_paid_machine_0002",
  interactionType: "STATIC_ONLY",
  stageGroup: "Parking",
  stage: "roadside_parking",
  tags: ["paid-parking", "parking-sign"],
  articles: ["article-paid-parking", "article-parking-signs"],
  preview:
    "The parking machine screen shows the current time and paid parking conditions.",
  location: paidParkingLocation,
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "It is 3:36 PM on a weekday. Does the driver need to pay to park here?",
  options: [
    {
      id: "A",
      text: "No. Payment only applies after 6 PM.",
      isCorrect: false,
    },
    {
      id: "B",
      text: "No. The driver only needs to pay on weekends.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Yes. Paid parking applies Monday to Friday from 8 AM to 6 PM.",
      isCorrect: true,
    },
    {
      id: "D",
      text: "Only if the driver parks for more than 2 hours.",
      isCorrect: false,
    },
  ],
  explanation:
    "The screen shows the current time as 03:36, and the weekday paid parking period is Monday to Friday from 8 AM to 6 PM. 3:36 PM is inside that period, so the driver needs to pay before leaving the vehicle.",
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
