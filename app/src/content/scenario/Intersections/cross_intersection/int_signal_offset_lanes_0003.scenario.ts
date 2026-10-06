import type {
  Scenario,
  ScenarioAnimation,
  ScenarioMeta,
  ScenarioQuestion,
  Track,
} from "../../../../contracts/scenario";

const signalTracks: Track[] = [
  {
    objectId: "signalBottomLeft",
    property: "position",
    keyframes: [{ t: 0, value: { x: 214, y: 444 } }],
  },
  {
    objectId: "signalBottomRight",
    property: "position",
    keyframes: [{ t: 0, value: { x: 666, y: 444 } }],
  },
  {
    objectId: "signalBottomLeft",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: 0 } }],
  },
  {
    objectId: "signalBottomRight",
    property: "rotation",
    keyframes: [{ t: 0, value: { deg: 0 } }],
  },
  {
    objectId: "signalBottomLeft",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "green" } }],
  },
  {
    objectId: "signalBottomRight",
    property: "signal",
    keyframes: [{ t: 0, value: { signal: "green" } }],
  },
];

const mockScenarioMeta: ScenarioMeta = {
  scenarioId: "int_signal_offset_lanes_0003",
  interactionType: "AUTOPLAY_PAUSE_REPLAY",
  stageGroup: "Intersections",
  stage: "signalised_intersections",
  tags: ["traffic-light", "straight-through", "lane-discipline"],
  articles: ["article-signalised-intersections", "article-lane-discipline"],
  preview:
    "A driver travels through a signalised intersection where the through lanes shift sideways inside the junction.",
  location: {
    name: "Great South Road",
    address: "129-111 Great South Road, Papatoetoe, Auckland 2025",
    lat: -36.968621,
    lng: 174.859798,
    source: "User-provided reference location for this offset-lane signalised intersection",
  },
};

const mockScenarioQuestion: ScenarioQuestion = {
  prompt: "How should the driver continue through this signalised intersection?",
  options: [
    {
      id: "A",
      text: "Continue straight, keeping the car aligned with the road ahead.",
      isCorrect: false,
    },
    {
      id: "B",
      text: "Follow the lane guide lines smoothly through the intersection.",
      isCorrect: true,
    },
  ],
  explanation:
    "At some signalised intersections, the lane you enter from does not line up directly with the lane on the far side. The driver should follow the lane guide lines through the intersection instead of simply aiming straight at the road ahead.",
};

const mockScenarioAnimation: ScenarioAnimation = {
  template: "SIGNALISED_OFFSET_LANES_001",
  width: 800,
  height: 600,
  script: {
    introDuration: 2,
    introTracks: [
      ...signalTracks,
      {
        objectId: "car1",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 360, y: 650 } },
          { t: 1.45, value: { x: 360, y: 458 } },
          { t: 2, value: { x: 360, y: 458 } },
        ],
      },
      {
        objectId: "car1",
        property: "rotation",
        keyframes: [
          { t: 0, value: { deg: -90 } },
          { t: 2, value: { deg: -90 } },
        ],
      },
      {
        objectId: "car2",
        property: "position",
        keyframes: [
          { t: 0, value: { x: 440, y: 700 } },
          { t: 1.7, value: { x: 440, y: 510 } },
          { t: 2, value: { x: 440, y: 510 } },
        ],
      },
      {
        objectId: "car2",
        property: "rotation",
        keyframes: [
          { t: 0, value: { deg: -90 } },
          { t: 2, value: { deg: -90 } },
        ],
      },
    ],
    optionDuration: 3.2,
    optionTracks: [
      {
        optionId: "A",
        tracks: [
          ...signalTracks,
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 458 } },
              { t: 0.8, value: { x: 360, y: 340 } },
              { t: 1.55, value: { x: 360, y: 210 } },
              { t: 2.35, value: { x: 360, y: 70 } },
              { t: 3.2, value: { x: 360, y: -70 } },
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
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 440, y: 510 } },
              { t: 0.9, value: { x: 432, y: 360 } },
              { t: 1.7, value: { x: 420, y: 208 } },
              { t: 3.2, value: { x: 420, y: 208 } },
            ],
          },
          {
            objectId: "car2",
            property: "emotion",
            keyframes: [
              { t: 0, value: { emotion: "none" } },
              { t: 1.35, value: { emotion: "surprised" } },
              { t: 2.4, value: { emotion: "none" } },
            ],
          },
        ],
      },
      {
        optionId: "B",
        tracks: [
          ...signalTracks,
          {
            objectId: "car1",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 360, y: 458 } },
              { t: 0.85, value: { x: 342, y: 356 } },
              { t: 1.6, value: { x: 318, y: 260 } },
              { t: 2.35, value: { x: 286, y: 116 } },
              { t: 3.2, value: { x: 286, y: -70 } },
            ],
          },
          {
            objectId: "car1",
            property: "rotation",
            keyframes: [
              { t: 0, value: { deg: -90 } },
              { t: 0.85, value: { deg: -95 } },
              { t: 1.6, value: { deg: -98 } },
              { t: 2.35, value: { deg: -92 } },
              { t: 3.2, value: { deg: -90 } },
            ],
          },
          {
            objectId: "car2",
            property: "position",
            keyframes: [
              { t: 0, value: { x: 440, y: 510 } },
              { t: 0.95, value: { x: 426, y: 360 } },
              { t: 1.8, value: { x: 398, y: 224 } },
              { t: 2.65, value: { x: 374, y: 40 } },
              { t: 3.2, value: { x: 374, y: -70 } },
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
