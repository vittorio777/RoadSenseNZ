import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
} from "../../../../contracts/scenario";
import { paidParkingLocation, paidParkingVisual } from "./paidParkingVisual";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "parking_paid_machine_0003",
  interactionType: "STATIC_ONLY",
  stageGroup: "Parking",
  stage: "roadside_parking",
  tags: ["paid-parking", "parking-sign"],
  articles: ["article-paid-parking", "article-parking-signs"],
  preview:
    "The parking machine lists different rates depending on the day and parking duration.",
  location: paidParkingLocation,
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt:
    "It is 3:36 PM on a weekday and the driver wants to park for 90 minutes. Which rate applies?",
  options: [
    {
      id: "A",
      text: "$9 per hour, because the parking period is during the afternoon.",
      isCorrect: false,
    },
    {
      id: "B",
      text: "$5.5 per hour for the first 2 hours.",
      isCorrect: true,
    },
    {
      id: "C",
      text: "$3.5 per hour, because 90 minutes is less than 2 hours.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "$5 per hour, because it is after the first 2 hours.",
      isCorrect: false,
    },
  ],
  explanation:
    "The weekday rate applies because it is 3:36 PM on a weekday. For Monday to Friday, the screen shows $5.5 per hour for the first 2 hours, then $9 per hour after that. A 90-minute stay is within the first 2 hours, so the $5.5 per hour rate applies.",
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
