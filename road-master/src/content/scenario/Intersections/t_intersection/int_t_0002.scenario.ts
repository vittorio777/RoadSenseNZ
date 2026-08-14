import type {
  ScenarioMeta,
  ScenarioQuestion,
  ScenarioAnimation,
  Scenario,
} from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "int_t_0002",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Intersections",
  stage: "t_intersection",
  tags: ["give-way", "left-turn"],
  articles: ["t_intersection_rules"],
  preview:
    "You are at an uncontrolled T intersection and want to turn left. A vehicle is approaching from the right.",
  location: {
    name: "Example T Intersection",
    address: "Auckland, New Zealand",
    lat: -36.8485,
    lng: 174.7633,
    source: "Scenario inspired by a real T intersection layout",
  }
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should you do before turning left onto the continuing road?",
  options: [
    {
      id: "A",
      text: "Give way to the vehicle from the right, then turn left when safe.",
      isCorrect: true,
    },
    {
      id: "B",
      text: "Turn immediately because you are entering the closest lane.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Proceed slowly and expect the other vehicle to slow down.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Honk the horn and then turn left.",
      isCorrect: false,
    },
  ],
  explanation:
    "At an uncontrolled T intersection, traffic on the continuing road has priority. You must give way before turning.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "T_INTERSECTION_001",
  width: 800,
  height: 600,

  script: {
    introTracks: [
      {
        objectId: "car1",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 400, y: 580 } },
          { t: 1, value: { x: 400, y: 430 } },
        ],
      },
      {
        objectId: "car2",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 680, y: 300 } },
          { t: 1, value: { x: 520, y: 300 } },
        ],
      },
    ],

    introDuration: 1,
    optionDuration: 2.4,

    optionTracks: [
      {
        optionId: "A",
        tracks: [
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 520, y: 300 } },
              { t: 1, value: { x: 80, y: 300 } },
              { t: 2.4, value: { x: -20, y: 300 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 1, value: { x: 400, y: 430 } },
              { t: 1.3, value: { x: 380, y: 370 } },
              { t: 1.7, value: { x: 290, y: 315 } },
              { t: 2.4, value: { x: 170, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "B",
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 0.45, value: { x: 375, y: 365 } },
              { t: 0.95, value: { x: 285, y: 305 } },
              { t: 1.15, value: { x: 245, y: 300 } },
              { t: 2.4, value: { x: 220, y: 345 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 0.8, value: { deg: -160 } },
              { t: 1.15, value: { deg: 180 } },
              { t: 2.4, value: { deg: 132 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 520, y: 300 } },
              { t: 1.15, value: { x: 245, y: 300 } },
              { t: 2.4, value: { x: 205, y: 318 } },
            ],
          },
          {
            objectId: "car2",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 180 } },
              { t: 1.15, value: { deg: 180 } },
              { t: 2.4, value: { deg: 154 } },
            ],
          },
        ],
      },
      {
        optionId: "C",
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 0.55, value: { x: 375, y: 365 } },
              { t: 1.1, value: { x: 295, y: 308 } },
              { t: 1.35, value: { x: 260, y: 300 } },
              { t: 2.4, value: { x: 250, y: 330 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 1, value: { deg: -165 } },
              { t: 1.35, value: { deg: 180 } },
              { t: 2.4, value: { deg: 145 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 520, y: 300 } },
              { t: 1.35, value: { x: 260, y: 300 } },
              { t: 2.4, value: { x: 230, y: 318 } },
            ],
          },
          {
            objectId: "car2",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 180 } },
              { t: 1.35, value: { deg: 180 } },
              { t: 2.4, value: { deg: 158 } },
            ],
          },
        ],
      },
      {
        optionId: "D",
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 2.4, value: { x: 400, y: 430 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 520, y: 300 } },
              { t: 2.4, value: { x: 80, y: 300 } },
            ],
          },
        ],
      },
    ],
  },
};

export const mockScenario: Scenario = {
  meta: mockScenarioMeta,
  questions: mockScenarioQuestion,
  animations: mockScenarioAnimation,
};
