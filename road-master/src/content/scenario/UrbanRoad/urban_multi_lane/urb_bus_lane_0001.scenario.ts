import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
} from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "urb_bus_lane_0001",
  interactionType: "STATIC_ONLY",
  stageGroup: "UrbanRoad",
  stage: "bus_lanes",
  tags: ["lane-discipline"],
  articles: ["article-bus-lane", "article-urban-lanes"],
  preview:
    "A driver is travelling on Dominion Road beside a bus lane sign that applies during the weekday evening peak.",
  location: {
    name: "148-164 Dominion Road",
    address: "Mount Eden, Auckland 1024",
    lat: -36.873423,
    lng: 174.751872,
    source: "Real-world reference location for this bus lane scenario",
  },
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "Can a regular car use this bus lane at 5:30 PM on a Tuesday?",
  options: [
    {
      id: "A",
      text: "No. The bus lane restriction applies from 4 PM to 7 PM on weekdays.",
      isCorrect: true,
    },
    {
      id: "B",
      text: "Yes, because the lane can be used by any vehicle outside the morning peak.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Yes, as long as there is no bus currently using the lane.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Only if the driver stays in the bus lane for a short distance.",
      isCorrect: false,
    },
  ],
  explanation:
    "The sign shows the bus lane operates from 4 PM to 7 PM, Monday to Friday. At 5:30 PM on a Tuesday, the restriction is active, so a regular car should not use the bus lane unless a specific permitted exception applies.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "URBAN_BUS_LANE_SIGN_001",
  width: 800,
  height: 600,
  script: {
    introDuration: 0,
    introTracks: [
      {
        objectId: "car1",
        property: "position",
        keyframes: [{ t: 0, value: { x: 499, y: 320 } }],
      },
      {
        objectId: "car1",
        property: "rotation",
        keyframes: [{ t: 0, value: { deg: 90 } }],
      },
    ],
    optionDuration: 0,
    optionTracks: [],
  },
};

export const mockScenario: Scenario = {
  meta: mockScenarioMeta,
  questions: mockScenarioQuestion,
  animations: mockScenarioAnimation,
};
