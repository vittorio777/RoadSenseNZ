import type { ScenarioMeta, ScenarioQuestion, ScenarioAnimation, Scenario } from "../../../../contracts/scenario";

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "int_t_0001",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Intersections",
  stage: "t_intersection",
  tags: ["give-way", "right-turn"],
  articles: ["article-001", "article-002"],
  preview: "A car approaches a T-intersection with a give-way sign. The driver intends to make a right turn.",
  location: {
    name: "5-1 Kentucky Street",
    address: "Ellerslie, Auckland 1051",
    lat: -36.892527,
    lng: 174.806599,
    source: "Real-world reference location for this scenario",
  },
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should the driver do at the give-way sign?",
  options: [
    { id: "A", text: "Stop and wait for oncoming traffic to clear before turning.", isCorrect: true },
    { id: "B", text: "Only yield to traffic coming from the right.", isCorrect: false },
    { id: "C", text: "Accelerate to pass without stopping.", isCorrect: false },
    { id: "D", text: "Honk the horn to alert other drivers.", isCorrect: false },
  ],
  explanation: "At a give-way sign, the driver must yield to oncoming traffic and only proceed when it is safe to do so.",
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
          { t: 0, value: { x: 355, y: 580 } },
          { t: 1.2, value: { x: 355, y: 420 } },
        ],
      },
      {
        objectId: "car2",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 80, y: 260 } },
          { t: 1.2, value: { x: 250, y: 260 } },
        ],
      },
      {
        objectId: "car3",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 720, y: 340 } },
          { t: 1.2, value: { x: 540, y: 340 } },
        ],
      },
    ],
    introDuration: 1.2,
    optionDuration: 3.2,
    optionTracks: [
      {
        optionId: "A",
        tracks: [
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 250, y: 260 } },
              { t: 1.35, value: { x: 760, y: 260 } },
              { t: 3.2, value: { x: 860, y: 260 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 540, y: 340 } },
              { t: 1.35, value: { x: 40, y: 340 } },
              { t: 3.2, value: { x: -80, y: 340 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 355, y: 420 } },
              { t: 1.4, value: { x: 355, y: 420 } },
              { t: 1.72, value: { x: 356, y: 382 } },
              { t: 2.05, value: { x: 372, y: 330 } },
              { t: 2.45, value: { x: 455, y: 272 } },
              { t: 2.75, value: { x: 535, y: 260 } },
              { t: 3.2, value: { x: 655, y: 260 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 1.4, value: { deg: -90 } },
              { t: 2.05, value: { deg: -48 } },
              { t: 2.45, value: { deg: -10 } },
              { t: 2.75, value: { deg: 0 } },
              { t: 3.2, value: { deg: 0 } },
            ],
          },
          {
            objectId: "car1",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 2.75, value: { emotion: "happy" } },
              { t: 3.2, value: { emotion: "happy" } },
            ],
          },
        ],
      },
      {
        optionId: "B",
        tracks: [
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 540, y: 340 } },
              { t: 1.05, value: { x: 80, y: 340 } },
              { t: 3.2, value: { x: -80, y: 340 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 95, y: 260 } },
              { t: 0.7, value: { x: 205, y: 260 } },
              { t: 1.35, value: { x: 315, y: 260 } },
              { t: 1.85, value: { x: 410, y: 260 } },
              { t: 2.08, value: { x: 446, y: 260 } },
              { t: 2.28, value: { x: 472, y: 252 } },
              { t: 3.2, value: { x: 492, y: 248 } },
            ],
          },
          {
            objectId: "car2",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 0 } },
              { t: 2.08, value: { deg: 0 } },
              { t: 2.28, value: { deg: -8 } },
              { t: 3.2, value: { deg: -10 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 355, y: 420 } },
              { t: 1.1, value: { x: 355, y: 420 } },
              { t: 1.42, value: { x: 355, y: 388 } },
              { t: 1.68, value: { x: 374, y: 342 } },
              { t: 1.92, value: { x: 430, y: 294 } },
              { t: 2.08, value: { x: 482, y: 282 } },
              { t: 2.28, value: { x: 504, y: 304 } },
              { t: 3.2, value: { x: 520, y: 326 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 1.1, value: { deg: -90 } },
              { t: 1.42, value: { deg: -90 } },
              { t: 1.68, value: { deg: -52 } },
              { t: 1.92, value: { deg: -18 } },
              { t: 2.08, value: { deg: 0 } },
              { t: 2.28, value: { deg: 24 } },
              { t: 3.2, value: { deg: 34 } },
            ],
          },
          {
            objectId: "car1",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 2.08, value: { emotion: "surprised" } },
              { t: 2.45, value: { emotion: "sad" } },
              { t: 3.2, value: { emotion: "sad" } },
            ],
          },
          {
            objectId: "car2",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 2.08, value: { emotion: "surprised" } },
              { t: 2.45, value: { emotion: "sad" } },
              { t: 3.2, value: { emotion: "sad" } },
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
              { t: 0, value: { x: 355, y: 420 } },
              { t: 0.28, value: { x: 356, y: 386 } },
              { t: 0.58, value: { x: 378, y: 356 } },
              { t: 0.82, value: { x: 404, y: 364 } },
              { t: 1.15, value: { x: 426, y: 386 } },
              { t: 1.55, value: { x: 432, y: 398 } },
              { t: 3.2, value: { x: 432, y: 398 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 0.58, value: { deg: -42 } },
              { t: 0.82, value: { deg: 0 } },
              { t: 1.15, value: { deg: 42 } },
              { t: 1.55, value: { deg: 58 } },
              { t: 3.2, value: { deg: 58 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 540, y: 340 } },
              { t: 0.82, value: { x: 432, y: 340 } },
              { t: 1.15, value: { x: 405, y: 328 } },
              { t: 1.55, value: { x: 394, y: 324 } },
              { t: 3.2, value: { x: 394, y: 324 } },
            ],
          },
          {
            objectId: "car3",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 180 } },
              { t: 0.82, value: { deg: 180 } },
              { t: 1.15, value: { deg: 158 } },
              { t: 1.55, value: { deg: 150 } },
              { t: 3.2, value: { deg: 150 } },
            ],
          },
          {
            objectId: "car1",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 1.05, value: { emotion: "surprised" } },
              { t: 1.65, value: { emotion: "sad" } },
              { t: 3.2, value: { emotion: "sad" } },
            ],
          },
          {
            objectId: "car3",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 1.05, value: { emotion: "surprised" } },
              { t: 1.65, value: { emotion: "sad" } },
              { t: 3.2, value: { emotion: "sad" } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 250, y: 260 } },
              { t: 3.2, value: { x: 860, y: 260 } },
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
              { t: 0, value: { x: 355, y: 420 } },
              { t: 0.75, value: { x: 355, y: 420 } },
              { t: 0.82, value: { x: 352, y: 420 } },
              { t: 0.9, value: { x: 358, y: 420 } },
              { t: 0.98, value: { x: 355, y: 420 } },
              { t: 3.2, value: { x: 355, y: 420 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 3.2, value: { deg: -90 } },
            ],
          },
          {
            objectId: "car1",
            property: "horn",
            keyframes: [
              { t: 0, value: { level: 0 } },
              { t: 0.65, value: { level: 0 } },
              { t: 0.76, value: { level: 1 } },
              { t: 1.08, value: { level: 1 } },
              { t: 1.22, value: { level: 0 } },
              { t: 3.2, value: { level: 0 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 250, y: 260 } },
              { t: 1.2, value: { x: 430, y: 260 } },
              { t: 2.1, value: { x: 610, y: 260 } },
              { t: 3.2, value: { x: 860, y: 260 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 540, y: 340 } },
              { t: 0.8, value: { x: 432, y: 340 } },
              { t: 1.6, value: { x: 324, y: 340 } },
              { t: 3.2, value: { x: -80, y: 340 } },
            ],
          },
          {
            objectId: "car3",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 180 } },
              { t: 0.82, value: { deg: 180 } },
              { t: 0.98, value: { deg: 177 } },
              { t: 1.16, value: { deg: 183 } },
              { t: 1.34, value: { deg: 180 } },
              { t: 3.2, value: { deg: 180 } },
            ],
          },
          {
            objectId: "car3",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 0.86, value: { emotion: "surprised" } },
              { t: 1.8, value: { emotion: "none" } },
              { t: 3.2, value: { emotion: "none" } },
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
