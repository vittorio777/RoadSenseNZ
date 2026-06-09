import type {
  ScenarioMeta,
  ScenarioQuestion,
  ScenarioAnimation,
  Scenario,
} from "../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "scenario-002",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Intersections",
  stage: "cross_intersection",
  tags: ["left-turn", "pedestrian-priority"],
  articles: ["article-pedestrian-priority", "article-cross-intersection"],
  preview:
    "You are approaching a cross intersection and intend to turn left. A pedestrian is crossing the road ahead.",
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should the driver do before turning left?",
  options: [
    {
      id: "A",
      text: "Turn left quickly before the pedestrian reaches the lane.",
      isCorrect: false,
    },
    {
      id: "B",
      text: "Give way to the pedestrian and turn only when it is safe.",
      isCorrect: true,
    },
    {
      id: "C",
      text: "Stop in the middle of the intersection and wait.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Honk to warn the pedestrian and continue turning.",
      isCorrect: false,
    },
  ],
  explanation:
    "Drivers must give way to pedestrians who are crossing or about to cross the road they are turning into. Turn only when the crossing path is clear.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "template_cross_intersection",
  width: 800,
  height: 600,
  script: {
    introTracks: [
      {
        objectId: "car1", // 你：从下方接近十字路口，准备左转
        property: "position",
        keyframes: [
          { t: 0, value: { x: 400, y: 580 } },
          { t: 1, value: { x: 400, y: 430 } },
        ],
      },
      {
        objectId: "pedestrian1", // 行人：从左向右过马路
        property: "position",
        keyframes: [
          { t: 0, value: { x: 260, y: 260 } },
          { t: 1, value: { x: 360, y: 260 } },
        ],
      },
      {
        objectId: "car2", // 横向车流，增加场景差异
        property: "position",
        keyframes: [
          { t: 0, value: { x: 120, y: 300 } },
          { t: 1, value: { x: 300, y: 300 } },
        ],
      },
    ],

    introDuration: 1,

    optionDuration: 2,

    optionTracks: [
      {
        optionId: "A", // 错误：直接左转，与行人冲突
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 1, value: { x: 300, y: 300 } },
              { t: 2, value: { x: 260, y: 300 } },
            ],
          },
          {
            objectId: "pedestrian1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 260 } },
              { t: 1, value: { x: 300, y: 260 } },
              { t: 2, value: { x: 300, y: 260 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 300 } },
              { t: 2, value: { x: 700, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "B", // 正确：等待行人通过后再左转
        tracks: [
          {
            objectId: "pedestrian1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 260 } },
              { t: 1, value: { x: 520, y: 260 } },
              { t: 2, value: { x: 620, y: 260 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 1, value: { x: 400, y: 430 } },
              { t: 2, value: { x: 260, y: 300 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 300 } },
              { t: 2, value: { x: 700, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "C", // 错误：停在路口中间
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 1, value: { x: 350, y: 360 } },
              { t: 2, value: { x: 350, y: 360 } },
            ],
          },
          {
            objectId: "pedestrian1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 260 } },
              { t: 2, value: { x: 620, y: 260 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 300 } },
              { t: 2, value: { x: 700, y: 300 } },
            ],
          },
        ],
      },
      {
        optionId: "D", // 错误：按喇叭不改变让行义务
        tracks: [
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 400, y: 430 } },
              { t: 2, value: { x: 400, y: 430 } },
            ],
          },
          {
            objectId: "pedestrian1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 260 } },
              { t: 2, value: { x: 620, y: 260 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 300, y: 300 } },
              { t: 2, value: { x: 700, y: 300 } },
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