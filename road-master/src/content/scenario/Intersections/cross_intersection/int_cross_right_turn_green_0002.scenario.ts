import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
  Track,
} from "../../../../contracts/scenario";

const signalPositionTracks: Track[] = [
  {
    objectId: "signalTopLeft",
    property: "position",
    keyframes: [{ t: 0, value: { x: 238, y: 154 } }],
  },
  {
    objectId: "signalTopRight",
    property: "position",
    keyframes: [{ t: 0, value: { x: 562, y: 154 } }],
  },
  {
    objectId: "signalBottomLeft",
    property: "position",
    keyframes: [{ t: 0, value: { x: 238, y: 446 } }],
  },
  {
    objectId: "signalBottomRight",
    property: "position",
    keyframes: [{ t: 0, value: { x: 562, y: 446 } }],
  },
];

const signalRotationTracks: Track[] = [
  {
    objectId: "signalTopLeft",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: 180 } }],
  },
  {
    objectId: "signalTopRight",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: -90 } }],
  },
  {
    objectId: "signalBottomLeft",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: 90 } }],
  },
  {
    objectId: "signalBottomRight",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: 0 } }],
  },
];

const introSignalTracks: Track[] = [
  ...signalPositionTracks,
  ...signalRotationTracks,
  {
    objectId: "signalTopLeft",
    property: "signal",
    keyframes: [
      { t: 0, value: { signal: "red" } },
      { t: 2.6, value: { signal: "green" } },
      { t: 2.7, value: { signal: "green" } },
    ],
  },
  {
    objectId: "signalBottomRight",
    property: "signal",
    keyframes: [
      { t: 0, value: { signal: "red" } },
      { t: 2.6, value: { signal: "green" } },
      { t: 2.7, value: { signal: "green" } },
    ],
  },
  {
    objectId: "signalTopRight",
    property: "signal",
    keyframes: [
      { t: 0, value: { signal: "green" } },
      { t: 0.2, value: { signal: "red" } },
      { t: 2.7, value: { signal: "red" } },
    ],
  },
  {
    objectId: "signalBottomLeft",
    property: "signal",
    keyframes: [
      { t: 0, value: { signal: "green" } },
      { t: 0.2, value: { signal: "red" } },
      { t: 2.7, value: { signal: "red" } },
    ],
  },
];

const activeSignalTracks: Track[] = [
  ...signalPositionTracks,
  ...signalRotationTracks,
  {
    objectId: "signalTopLeft",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "green" } }],
  },
  {
    objectId: "signalBottomRight",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "green" } }],
  },
  {
    objectId: "signalTopRight",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "red" } }],
  },
  {
    objectId: "signalBottomLeft",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "red" } }],
  },
];

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "int_cross_right_turn_green_0002",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Intersections",
  stage: "signalised_intersections",
  tags: ["traffic-light", "right-turn", "give-way", "straight-through"],
  articles: ["article-cross-intersection", "article-right-turn-give-way"],
  preview:
    "A driver is waiting in the right-turn lane at a crossroad. The circular green light comes on while oncoming traffic is going straight.",
  location: {
    name: "Allum Street",
    address: "Kohimarama, Auckland 1071",
    lat: -36.863443,
    lng: 174.841209,
    source: "Real-world reference location for this signalised crossroad scenario",
  },
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "What should the right-turning driver do when the circular light turns green?",
  options: [
    {
      id: "A",
      text: "Start turning as soon as the circular light turns green.",
      isCorrect: false,
    },
    {
      id: "B",
      text: "Wait for the oncoming straight-through traffic to pass, then turn right.",
      isCorrect: true,
    },
    {
      id: "C",
      text: "Move into the middle of the intersection and make oncoming traffic slow down.",
      isCorrect: false,
    },
    {
      id: "D",
      text: "Turn because a green circle gives right-turning traffic priority.",
      isCorrect: false,
    },
  ],
  explanation:
    "A circular green light lets you proceed only when it is safe. Without a protected right-turn arrow, a right-turning driver must give way to oncoming vehicles going straight through.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "CROSS_INTERSECTION_RIGHT_TURN_SIGNAL_001",
  width: 800,
  height: 600,
  script: {
    introDuration: 2.7,
    introTracks: [
      ...introSignalTracks,
      {
        objectId: "car1",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 372, y: 640 } },
          { t: 1.25, value: { x: 376, y: 435 } },
          { t: 2.7, value: { x: 376, y: 435 } },
        ],
      },
      {
        objectId: "car1",
        property: "rotation",
        keyframes: [
          { t: 0, value: { deg: -90 } },
          { t: 2.7, value: { deg: -90 } },
        ],
      },
      {
        objectId: "car2",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 430, y: -60 } },
          { t: 1.75, value: { x: 430, y: 166 } },
          { t: 2.7, value: { x: 430, y: 166 } },
        ],
      },
      {
        objectId: "car2",
        property: "rotation",
        keyframes: [
          { t: 0, value: { deg: 90 } },
          { t: 2.7, value: { deg: 90 } },
        ],
      },
      {
        objectId: "car3",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 486, y: -130 } },
          { t: 2.6, value: { x: 486, y: 150 } },
          { t: 2.7, value: { x: 486, y: 150 } },
        ],
      },
      {
        objectId: "car3",
        property: "rotation",
        keyframes: [
          { t: 0, value: { deg: 90 } },
          { t: 2.7, value: { deg: 90 } },
        ],
      },
    ],
    optionDuration: 3.2,
    optionTracks: [
      {
        optionId: "A",
        tracks: [
          ...activeSignalTracks,
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 376, y: 435 } },
              { t: 0.35, value: { x: 382, y: 390 } },
              { t: 0.7, value: { x: 424, y: 336 } },
              { t: 1.05, value: { x: 500, y: 344 } },
              { t: 1.45, value: { x: 536, y: 388 } },
              { t: 3.2, value: { x: 536, y: 388 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 0.35, value: { deg: -72 } },
              { t: 0.7, value: { deg: -22 } },
              { t: 1.05, value: { deg: 28 } },
              { t: 1.45, value: { deg: 54 } },
              { t: 3.2, value: { deg: 54 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 430, y: 166 } },
              { t: 0.55, value: { x: 430, y: 244 } },
              { t: 0.95, value: { x: 362, y: 330 } },
              { t: 1.45, value: { x: 328, y: 386 } },
              { t: 3.2, value: { x: 328, y: 386 } },
            ],
          },
          {
            objectId: "car2",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 90 } },
              { t: 0.55, value: { deg: 90 } },
              { t: 0.95, value: { deg: 128 } },
              { t: 1.45, value: { deg: 152 } },
              { t: 3.2, value: { deg: 152 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 486, y: 150 } },
              { t: 1.05, value: { x: 486, y: 244 } },
              { t: 1.35, value: { x: 490, y: 258 } },
              { t: 3.2, value: { x: 490, y: 258 } },
            ],
          },
          {
            objectId: "car3",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 1, value: { emotion: "surprised" } },
              { t: 2.2, value: { emotion: "none" } },
            ],
          },
        ],
      },
      {
        optionId: "B",
        tracks: [
          ...activeSignalTracks,
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 430, y: 166 } },
              { t: 1.15, value: { x: 430, y: 640 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 486, y: 150 } },
              { t: 1.65, value: { x: 486, y: 640 } },
            ],
          },
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 376, y: 435 } },
              { t: 1.7, value: { x: 376, y: 435 } },
              { t: 2.05, value: { x: 388, y: 380 } },
              { t: 2.38, value: { x: 438, y: 262 } },
              { t: 2.7, value: { x: 536, y: 238 } },
              { t: 3.2, value: { x: 700, y: 238 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 1.7, value: { deg: -90 } },
              { t: 2.05, value: { deg: -58 } },
              { t: 2.38, value: { deg: -18 } },
              { t: 2.7, value: { deg: 0 } },
              { t: 3.2, value: { deg: 0 } },
            ],
          },
        ],
      },
      {
        optionId: "C",
        tracks: [
          ...activeSignalTracks,
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 376, y: 435 } },
              { t: 0.8, value: { x: 386, y: 378 } },
              { t: 1.25, value: { x: 398, y: 328 } },
              { t: 3.2, value: { x: 398, y: 328 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 1.25, value: { deg: -62 } },
              { t: 3.2, value: { deg: -62 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 430, y: 166 } },
              { t: 1.05, value: { x: 430, y: 282 } },
              { t: 1.45, value: { x: 452, y: 286 } },
              { t: 3.2, value: { x: 452, y: 286 } },
            ],
          },
          {
            objectId: "car2",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 1.35, value: { emotion: "surprised" } },
              { t: 2.5, value: { emotion: "none" } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 486, y: 150 } },
              { t: 3.2, value: { x: 486, y: 610 } },
            ],
          },
        ],
      },
      {
        optionId: "D",
        tracks: [
          ...activeSignalTracks,
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 376, y: 435 } },
              { t: 0.45, value: { x: 376, y: 435 } },
              { t: 0.85, value: { x: 384, y: 388 } },
              { t: 1, value: { x: 390, y: 370 } },
              { t: 1.45, value: { x: 468, y: 328 } },
              { t: 1.85, value: { x: 510, y: 342 } },
              { t: 3.2, value: { x: 510, y: 342 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 0.45, value: { deg: -90 } },
              { t: 0.85, value: { deg: -74 } },
              { t: 1, value: { deg: -46 } },
              { t: 1.45, value: { deg: 8 } },
              { t: 1.85, value: { deg: 22 } },
              { t: 3.2, value: { deg: 22 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 430, y: 166 } },
              { t: 0.75, value: { x: 430, y: 260 } },
              { t: 1.1, value: { x: 430, y: 286 } },
              { t: 1.45, value: { x: 404, y: 292 } },
              { t: 3.2, value: { x: 404, y: 292 } },
            ],
          },
          {
            objectId: "car2",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: 90 } },
              { t: 0.75, value: { deg: 90 } },
              { t: 1.1, value: { deg: 90 } },
              { t: 1.45, value: { deg: 112 } },
              { t: 3.2, value: { deg: 112 } },
            ],
          },
          {
            objectId: "car3",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 486, y: 150 } },
              { t: 1, value: { x: 486, y: 244 } },
              { t: 1.35, value: { x: 492, y: 264 } },
              { t: 3.2, value: { x: 492, y: 264 } },
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
