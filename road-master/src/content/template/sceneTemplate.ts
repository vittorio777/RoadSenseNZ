const T_INTERSECTION_001 = {
  id: "T_INTERSECTION_001",
  width: 800,
  height: 600,
  background: "#e7efe3",
  shapes: [
    { type: "rect", x: 0, y: 218, width: 800, height: 164, fill: "#47515c" },
    { type: "rect", x: 318, y: 300, width: 144, height: 300, fill: "#47515c" },
    { type: "circle", x: 390, y: 300, radius: 82, fill: "#47515c" },

    { type: "line", x1: 0, y1: 218, x2: 800, y2: 218, stroke: "#d7ded6", lineWidth: 4 },
    { type: "line", x1: 0, y1: 382, x2: 318, y2: 382, stroke: "#d7ded6", lineWidth: 4 },
    { type: "line", x1: 462, y1: 382, x2: 800, y2: 382, stroke: "#d7ded6", lineWidth: 4 },
    { type: "line", x1: 318, y1: 382, x2: 318, y2: 600, stroke: "#d7ded6", lineWidth: 4 },
    { type: "line", x1: 462, y1: 382, x2: 462, y2: 600, stroke: "#d7ded6", lineWidth: 4 },

    { type: "line", x1: 0, y1: 300, x2: 318, y2: 300, stroke: "#eef2f7", lineWidth: 3, dash: [34, 24] },
    { type: "line", x1: 462, y1: 300, x2: 800, y2: 300, stroke: "#eef2f7", lineWidth: 3, dash: [34, 24] },
    { type: "line", x1: 390, y1: 382, x2: 390, y2: 600, stroke: "#eef2f7", lineWidth: 3, dash: [30, 22] },

    { type: "line", x1: 326, y1: 392, x2: 386, y2: 392, stroke: "#f8fafc", lineWidth: 5 },
    {
      type: "path",
      fill: "#f8fafc",
      points: [
        { x: 342, y: 412 },
        { x: 370, y: 412 },
        { x: 356, y: 436 },
      ],
      close: true,
    },
    {
      type: "path",
      fill: "#47515c",
      points: [
        { x: 350, y: 416 },
        { x: 362, y: 416 },
        { x: 356, y: 427 },
      ],
      close: true,
    },
  ],
} as const;

const CROSS_INTERSECTION_001 = {
  id: "CROSS_INTERSECTION_001",
  width: 800,
  height: 600,
  background: "#f3f3f3",
  shapes: [
    { type: "rect", x: 0, y: 250, width: 800, height: 100, fill: "#555" },
    { type: "rect", x: 350, y: 0, width: 100, height: 600, fill: "#555" },

    { type: "line", x1: 0, y1: 300, x2: 350, y2: 300, stroke: "#f5f5f5", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 450, y1: 300, x2: 800, y2: 300, stroke: "#f5f5f5", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 400, y1: 0, x2: 400, y2: 250, stroke: "#f5f5f5", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 400, y1: 350, x2: 400, y2: 600, stroke: "#f5f5f5", lineWidth: 3, dash: [20, 16] },
  ],
} as const;

const ROUNDABOUT_001 = {
  id: "ROUNDABOUT_001",
  width: 800,
  height: 600,
  background: "#f3f3f3",
  shapes: [
    { type: "rect", x: 345, y: 0, width: 110, height: 165, fill: "#555" },
    { type: "rect", x: 345, y: 435, width: 110, height: 165, fill: "#555" },
    { type: "rect", x: 0, y: 245, width: 265, height: 110, fill: "#555" },
    { type: "rect", x: 535, y: 245, width: 265, height: 110, fill: "#555" },

    { type: "circle", x: 400, y: 300, radius: 150, fill: "#555" },
    { type: "circle", x: 400, y: 300, radius: 75, fill: "#f3f3f3" },
    { type: "circle", x: 400, y: 300, radius: 65, fill: "#7aa35a" },

    { type: "circle", x: 400, y: 300, radius: 112, stroke: "#ddd", lineWidth: 3, dash: [18, 14] },

    { type: "line", x1: 400, y1: 0, x2: 400, y2: 140, stroke: "#ddd", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 400, y1: 460, x2: 400, y2: 600, stroke: "#ddd", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 0, y1: 300, x2: 260, y2: 300, stroke: "#ddd", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 540, y1: 300, x2: 800, y2: 300, stroke: "#ddd", lineWidth: 3, dash: [20, 16] },

    { type: "text", x: 20, y: 30, text: "Roundabout", fill: "#333", font: "16px sans-serif" },
  ],
} as const;

const MOTORWAY_MERGE_001 = {
  id: "MOTORWAY_MERGE_001",
  width: 800,
  height: 600,
  background: "#f3f3f3",
  shapes: [
    { type: "rect", x: 0, y: 210, width: 800, height: 150, fill: "#555" },

    {
      type: "path",
      fill: "#555",
      points: [
        { x: 230, y: 600 },
        { x: 375, y: 600 },
        { x: 580, y: 360 },
        { x: 480, y: 360 },
      ],
      close: true,
    },

    { type: "line", x1: 0, y1: 285, x2: 800, y2: 285, stroke: "#f3f3f3", lineWidth: 4, dash: [36, 26] },
    { type: "line", x1: 325, y1: 600, x2: 540, y2: 360, stroke: "#f3f3f3", lineWidth: 4, dash: [28, 22] },

    { type: "line", x1: 0, y1: 210, x2: 800, y2: 210, stroke: "#ddd", lineWidth: 3 },
    { type: "line", x1: 0, y1: 360, x2: 800, y2: 360, stroke: "#ddd", lineWidth: 3 },

    { type: "line", x1: 570, y1: 360, x2: 680, y2: 360, stroke: "#f3f3f3", lineWidth: 3, dash: [24, 20] },
  ],
} as const;

export const STAGE_TEMPLATES = {
  T_INTERSECTION_001,
  CROSS_INTERSECTION_001,
  ROUNDABOUT_001,
  MOTORWAY_MERGE_001,
} as const;

export type StageTemplateName = keyof typeof STAGE_TEMPLATES;
