import type {
  ScenarioMeta,
  ScenarioQuestion,
  ScenarioAnimation,
  Scenario,
} from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "mwy_merge_0001",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Motorway",
  stage: "motorway_merge",
  tags: ["merge", "lane-discipline"],
  articles: ["article-motorway-merge", "article-lane-discipline"],
  preview:
    "You are entering the motorway from an on-ramp. A vehicle is already travelling in the left lane.",
  location: {
    name: "Example Highway",
    address: "Auckland, New Zealand",
    lat: -33.8485,
    lng: 173.7633,
    source: "Scenario inspired by a real Motorway layout",
  }
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should you do when merging onto the motorway?",
  options: [
    {
      id: "A",
      text: "Adjust your speed and merge only when there is a safe gap.",
      isCorrect: true,
    },
    {
      id: "B",
      text: "Move into the motorway lane immediately because traffic must give way to you.",
      isCorrect: false,
    },
    {
      id: "C",
      text: "Stop at the end of the on-ramp and wait for a completely empty road.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Drive along the shoulder until someone lets you in.",
      isCorrect: false,
    },
  ],
  explanation:
    "When merging, you must adjust your speed and enter the lane only when there is a safe gap. Do not assume motorway traffic will give way to you.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "MOTORWAY_MERGE_001",
  width: 800,
  height: 600,
  script: {
    introTracks: [
      {
        objectId: "car1", // 你：从匝道进入
        property: "position",
        keyframes: [
          { t: 0, value: { x: 120, y: 520 } },
          { t: 1, value: { x: 300, y: 420 } },
        ],
      },
      {
        objectId: "car2", // 主路车辆
        property: "position",
        keyframes: [
          { t: 0, value: { x: 260, y: 300 } },
          { t: 1, value: { x: 460, y: 300 } },
        ],
      },
      {
        objectId: "car3", // 后方车辆
        property: "position",
        keyframes: [
          { t: 0, value: { x: 80, y: 300 } },
          { t: 1, value: { x: 260, y: 300 } },
        ],
      },
    ],

    introDuration: 1,

    optionDuration: 2,

    optionTracks: [
      {
        optionId: "A", // 正确：调整速度，找安全间隙并入
        tracks: [
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 460, y: 300 } },
              { t: 2, value: { x: 760, y: 300 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 260, y: 300 } },
              { t: 2, value: { x: 520, y: 300 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 420 } },
              { t: 1, value: { x: 380, y: 360 } },
              { t: 2, value: { x: 620, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "B", // 错误：强行并入，与主路车冲突
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 420 } },
              { t: 1, value: { x: 470, y: 300 } },
              { t: 2, value: { x: 500, y: 300 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 460, y: 300 } },
              { t: 1, value: { x: 500, y: 300 } },
              { t: 2, value: { x: 500, y: 300 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 260, y: 300 } },
              { t: 2, value: { x: 520, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "C", // 错误：在匝道末端停住，造成危险
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 420 } },
              { t: 2, value: { x: 340, y: 420 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 460, y: 300 } },
              { t: 2, value: { x: 760, y: 300 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 260, y: 300 } },
              { t: 2, value: { x: 600, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "D", // 错误：沿路肩继续行驶
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 420 } },
              { t: 2, value: { x: 680, y: 420 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 460, y: 300 } },
              { t: 2, value: { x: 760, y: 300 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 260, y: 300 } },
              { t: 2, value: { x: 600, y: 300 } },
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
    animations: mockScenarioAnimation
}