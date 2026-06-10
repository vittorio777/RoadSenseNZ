import type {ScenarioMeta, ScenarioQuestion, ScenarioAnimation, Scenario} from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
    scenarioId: "int_t_0001",
    interactionType: "AUTOPLAY_PAUSE_REPLAY",
    stageGroup: "Intersections",
    stage: "t_intersection",
    tags: ["give-way", "right-turn"],
    articles: ["article-001", "article-002"],
    preview: "A car approaches a T-intersection with a give-way sign. The driver intends to make a right turn."
};

const mockScenarioQuestion: ScenarioQuestion = {
    prompt: "What should the driver do at the give-way sign?",
    options: [
        { id: "A", text: "Stop and wait for oncoming traffic to clear before turning.", isCorrect: true },
        { id: "B", text: "Only yield to traffic coming from the right.", isCorrect: false },
        { id: "C", text: "Accelerate to pass without stopping.", isCorrect: false },
        { id: "D", text: "Honk the horn to alert other drivers.", isCorrect: false }
    ],
    explanation: "At a give-way sign, the driver must yield to oncoming traffic and only proceed when it is safe to do so."
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "T_INTERSECTION_001",
  width: 800,
  height: 600,
  script: {
    introTracks: [
      {
        objectId: "car1", // 你：从下方接近 T 路口
        property: "position",
        keyframes: [
          { t: 0, value: { x: 400, y: 580 } },
          { t: 1, value: { x: 400, y: 430 } }
        ]
      },
      {
        objectId: "car2", // 左侧来车，向右直行
        property: "position",
        keyframes: [
          { t: 0, value: { x: 120, y: 300 } },
          { t: 1, value: { x: 320, y: 300 } }
        ]
      },
      {
        objectId: "car3", // 右侧来车，向左直行
        property: "position",
        keyframes: [
          { t: 0, value: { x: 680, y: 300 } },
          { t: 1, value: { x: 480, y: 300 } }
        ]
      }
    ],

  introDuration: 1,

  optionDuration: 2,

  optionTracks: [
    {
      optionId: "A", // 正确：等待两边车辆通过，再右转
      tracks: [
        {
          objectId: "car2",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 320, y: 300 } },
            { t: 1, value: { x: 760, y: 300 } }
          ]
        },
        {
          objectId: "car3",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 480, y: 300 } },
            { t: 1, value: { x: 40, y: 300 } }
          ]
        },
        {
          objectId: "car1",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 400, y: 430 } },
            { t: 1, value: { x: 400, y: 430 } },
            { t: 2, value: { x: 620, y: 300 } }
          ]
        }
      ]
    },
    {
      optionId: "B", // 错误：只让右侧车，之后与左侧车冲突
      tracks: [
        {
          objectId: "car3",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 480, y: 300 } },
            { t: 1, value: { x: 80, y: 300 } }
          ]
        },
        {
          objectId: "car2",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 320, y: 300 } },
            { t: 2, value: { x: 620, y: 300 } }
          ]
        },
        {
          objectId: "car1",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 400, y: 430 } },
            { t: 1, value: { x: 400, y: 430 } },
            { t: 2, value: { x: 620, y: 300 } }
          ]
        }
      ]
    },
    {
      optionId: "C", // 错误：直接加速右转，与右侧车冲突
      tracks: [
        {
          objectId: "car1",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 400, y: 430 } },
            { t: 1, value: { x: 560, y: 300 } }
          ]
        },
        {
          objectId: "car3",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 480, y: 300 } },
            { t: 1, value: { x: 560, y: 300 } }
          ]
        },
        {
          objectId: "car2",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 320, y: 300 } },
            { t: 1, value: { x: 520, y: 300 } }
          ]
        }
      ]
    },
    {
      optionId: "D", // 错误：按喇叭不改变让行义务，车仍停着，其他车通过
      tracks: [
        {
          objectId: "car1",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 400, y: 430 } },
            { t: 2, value: { x: 400, y: 430 } }
          ]
        },
        {
          objectId: "car2",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 320, y: 300 } },
            { t: 2, value: { x: 760, y: 300 } }
          ]
        },
        {
          objectId: "car3",
          property: "position",
          keyframes: [
            { t: 0, value: { x: 480, y: 300 } },
            { t: 2, value: { x: 40, y: 300 } }
          ]
        }
      ]
    }
  ]}
};

export const mockScenario: Scenario = {
    meta: mockScenarioMeta,
    questions: mockScenarioQuestion,
    animations: mockScenarioAnimation
}