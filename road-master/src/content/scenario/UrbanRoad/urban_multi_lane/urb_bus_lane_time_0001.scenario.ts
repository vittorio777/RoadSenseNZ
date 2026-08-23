import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
} from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "urb_bus_lane_time_0001",
  interactionType: "STATIC_ONLY",
  stageGroup: "UrbanRoad",
  stage: "bus_lanes",
  tags: ["lane-discipline"],
  articles: ["article-bus-lane", "article-urban-lanes"],
  preview:
    "A bus lane sign shows an all-week daytime restriction. The driver needs to decide whether the lane is available.",
  location: {
    name: "Newmarket",
    address: "Auckland",
    lat: -36.871489,
    lng: 174.776953,
    source: "Reference location for Newmarket bus lane signage",
  },
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "At 2:00 PM on a Sunday, can a regular car use this bus lane?",
  options: [
    {
      id: "A",
      text: "No. The bus lane is operating during this time.",
      isCorrect: true,
    },
    {
      id: "B",
      text: "Yes. Bus lanes do not apply on Sundays.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Yes, if there is no bus visible nearby.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Only if the driver keeps the car close to the kerb.",
      isCorrect: false,
    },
  ],
  explanation:
    "The sign says the bus lane operates from 7 AM to 7 PM, Monday to Sunday. 2:00 PM on Sunday is inside that restricted period, so a regular car should not use the bus lane unless a specific allowed exception applies.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "BUS_LANE_TIME_SIGN_001",
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
};
