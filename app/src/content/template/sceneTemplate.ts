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

const CROSS_INTERSECTION_RIGHT_TURN_SIGNAL_001 = {
  id: "CROSS_INTERSECTION_RIGHT_TURN_SIGNAL_001",
  width: 800,
  height: 600,
  background: "#c9ddc0",
  shapes: [
    { type: "path", fill: "#cddfc7", points: [{ x: 0, y: 0 }, { x: 258, y: 0 }, { x: 258, y: 132 }, { x: 246, y: 160 }, { x: 220, y: 182 }, { x: 190, y: 190 }, { x: 0, y: 190 }], close: true },
    { type: "path", fill: "#cddfc7", points: [{ x: 542, y: 0 }, { x: 800, y: 0 }, { x: 800, y: 190 }, { x: 610, y: 190 }, { x: 580, y: 182 }, { x: 554, y: 160 }, { x: 542, y: 132 }], close: true },
    { type: "path", fill: "#cddfc7", points: [{ x: 0, y: 410 }, { x: 190, y: 410 }, { x: 220, y: 418 }, { x: 246, y: 440 }, { x: 258, y: 468 }, { x: 258, y: 600 }, { x: 0, y: 600 }], close: true },
    { type: "path", fill: "#cddfc7", points: [{ x: 542, y: 468 }, { x: 554, y: 440 }, { x: 580, y: 418 }, { x: 610, y: 410 }, { x: 800, y: 410 }, { x: 800, y: 600 }, { x: 542, y: 600 }], close: true },

    { type: "path", fill: "#d9cfbd", points: [{ x: 14, y: 18 }, { x: 186, y: 14 }, { x: 210, y: 132 }, { x: 60, y: 160 }, { x: 16, y: 112 }], close: true },
    { type: "path", fill: "#bfc8b4", points: [{ x: 48, y: 42 }, { x: 126, y: 34 }, { x: 150, y: 86 }, { x: 88, y: 112 }, { x: 42, y: 86 }], close: true },
    { type: "path", fill: "#eef0e8", points: [{ x: 44, y: 36 }, { x: 122, y: 28 }, { x: 148, y: 78 }, { x: 88, y: 104 }, { x: 38, y: 80 }], close: true },

    { type: "path", fill: "#d9cfbd", points: [{ x: 590, y: 20 }, { x: 780, y: 16 }, { x: 782, y: 134 }, { x: 622, y: 152 }, { x: 584, y: 96 }], close: true },
    { type: "path", fill: "#b7c0b3", points: [{ x: 650, y: 42 }, { x: 744, y: 42 }, { x: 744, y: 96 }, { x: 708, y: 96 }, { x: 708, y: 120 }, { x: 650, y: 120 }], close: true },
    { type: "path", fill: "#eff0eb", points: [{ x: 642, y: 34 }, { x: 736, y: 34 }, { x: 736, y: 88 }, { x: 700, y: 88 }, { x: 700, y: 112 }, { x: 642, y: 112 }], close: true },

    { type: "path", fill: "#d9cfbd", points: [{ x: 28, y: 438 }, { x: 198, y: 432 }, { x: 224, y: 552 }, { x: 82, y: 574 }, { x: 34, y: 520 }], close: true },
    { type: "path", fill: "#bbc7b1", points: [{ x: 64, y: 466 }, { x: 150, y: 454 }, { x: 170, y: 512 }, { x: 104, y: 538 }, { x: 58, y: 506 }], close: true },
    { type: "path", fill: "#f0f0e8", points: [{ x: 58, y: 458 }, { x: 144, y: 446 }, { x: 166, y: 502 }, { x: 100, y: 528 }, { x: 52, y: 498 }], close: true },

    { type: "path", fill: "#d9cfbd", points: [{ x: 588, y: 430 }, { x: 780, y: 426 }, { x: 784, y: 556 }, { x: 640, y: 574 }, { x: 584, y: 512 }], close: true },
    { type: "path", fill: "#b9c2b5", points: [{ x: 636, y: 456 }, { x: 736, y: 452 }, { x: 742, y: 522 }, { x: 664, y: 540 }, { x: 626, y: 504 }], close: true },
    { type: "path", fill: "#f1f1ec", points: [{ x: 628, y: 448 }, { x: 728, y: 444 }, { x: 734, y: 514 }, { x: 658, y: 532 }, { x: 618, y: 496 }], close: true },

    { type: "circle", x: 184, y: 52, radius: 22, fill: "#62894e" },
    { type: "circle", x: 204, y: 70, radius: 18, fill: "#6f9558" },
    { type: "circle", x: 180, y: 82, radius: 16, fill: "#557f46" },
    { type: "circle", x: 590, y: 156, radius: 24, fill: "#5e864d" },
    { type: "circle", x: 614, y: 174, radius: 18, fill: "#789a5c" },
    { type: "circle", x: 184, y: 418, radius: 24, fill: "#62894e" },
    { type: "circle", x: 214, y: 404, radius: 18, fill: "#75985b" },
    { type: "circle", x: 578, y: 410, radius: 24, fill: "#5a824a" },
    { type: "circle", x: 606, y: 426, radius: 18, fill: "#789a5c" },
    { type: "circle", x: 626, y: 404, radius: 16, fill: "#668f52" },

    {
      type: "path",
      fill: "#4b5563",
      points: [
        { x: 274, y: 0 },
        { x: 526, y: 0 },
        { x: 526, y: 158 },
        { x: 530, y: 178 },
        { x: 542, y: 196 },
        { x: 558, y: 206 },
        { x: 800, y: 206 },
        { x: 800, y: 394 },
        { x: 558, y: 394 },
        { x: 542, y: 404 },
        { x: 530, y: 422 },
        { x: 526, y: 442 },
        { x: 526, y: 600 },
        { x: 274, y: 600 },
        { x: 274, y: 442 },
        { x: 270, y: 422 },
        { x: 258, y: 404 },
        { x: 242, y: 394 },
        { x: 0, y: 394 },
        { x: 0, y: 206 },
        { x: 242, y: 206 },
        { x: 258, y: 196 },
        { x: 270, y: 178 },
        { x: 274, y: 158 },
      ],
      close: true,
    },
    { type: "rect", x: 284, y: 216, width: 232, height: 168, fill: "#525d69" },

    { type: "line", x1: 400, y1: 0, x2: 400, y2: 190, stroke: "#f8fafc", lineWidth: 4 },
    { type: "line", x1: 400, y1: 410, x2: 400, y2: 600, stroke: "#f8fafc", lineWidth: 4 },
    { type: "line", x1: 542, y1: 254, x2: 800, y2: 254, stroke: "#f8fafc", lineWidth: 4 },

    { type: "line", x1: 338, y1: 0, x2: 338, y2: 190, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },
    { type: "line", x1: 462, y1: 0, x2: 462, y2: 190, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },
    { type: "line", x1: 338, y1: 410, x2: 338, y2: 600, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },
    { type: "line", x1: 462, y1: 410, x2: 462, y2: 600, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },
    { type: "line", x1: 0, y1: 300, x2: 258, y2: 300, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },
    { type: "line", x1: 542, y1: 324, x2: 800, y2: 324, stroke: "#e2e8f0", lineWidth: 3, dash: [30, 22] },

    { type: "line", x1: 286, y1: 410, x2: 396, y2: 410, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 404, y1: 190, x2: 514, y2: 190, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 542, y1: 266, x2: 542, y2: 382, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 258, y1: 214, x2: 258, y2: 286, stroke: "#f8fafc", lineWidth: 5 },

    { type: "line", x1: 322, y1: 530, x2: 322, y2: 482, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 322, y1: 498, x2: 304, y2: 498, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 322, y: 462 }, { x: 309, y: 484 }, { x: 335, y: 484 }], close: true },
    { type: "path", fill: "#f8fafc", points: [{ x: 284, y: 498 }, { x: 306, y: 485 }, { x: 306, y: 511 }], close: true },

    { type: "line", x1: 354, y1: 530, x2: 354, y2: 482, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 354, y1: 498, x2: 376, y2: 498, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 354, y: 462 }, { x: 341, y: 484 }, { x: 367, y: 484 }], close: true },
    { type: "path", fill: "#f8fafc", points: [{ x: 396, y: 498 }, { x: 374, y: 485 }, { x: 374, y: 511 }], close: true },

    { type: "line", x1: 444, y1: 70, x2: 444, y2: 118, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 444, y1: 104, x2: 426, y2: 104, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 444, y: 138 }, { x: 431, y: 116 }, { x: 457, y: 116 }], close: true },
    { type: "path", fill: "#f8fafc", points: [{ x: 406, y: 104 }, { x: 428, y: 91 }, { x: 428, y: 117 }], close: true },

    { type: "line", x1: 484, y1: 70, x2: 484, y2: 118, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 484, y1: 104, x2: 502, y2: 104, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 484, y: 138 }, { x: 471, y: 116 }, { x: 497, y: 116 }], close: true },
    { type: "path", fill: "#f8fafc", points: [{ x: 522, y: 104 }, { x: 500, y: 91 }, { x: 500, y: 117 }], close: true },

    { type: "line", x1: 728, y1: 306, x2: 684, y2: 306, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 700, y1: 306, x2: 700, y2: 292, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 664, y: 306 }, { x: 684, y: 294 }, { x: 684, y: 318 }], close: true },
    { type: "path", fill: "#f8fafc", points: [{ x: 700, y: 274 }, { x: 688, y: 294 }, { x: 712, y: 294 }], close: true },

    { type: "line", x1: 728, y1: 352, x2: 700, y2: 352, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 700, y1: 348, x2: 700, y2: 368, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 700, y: 386 }, { x: 688, y: 366 }, { x: 712, y: 366 }], close: true },

  ],
} as const;

const SIGNALISED_OFFSET_LANES_001 = {
  id: "SIGNALISED_OFFSET_LANES_001",
  width: 800,
  height: 600,
  background: "#cddfc7",
  shapes: [
    { type: "path", fill: "#d9cfbd", points: [{ x: 18, y: 18 }, { x: 210, y: 14 }, { x: 220, y: 188 }, { x: 28, y: 204 }], close: true },
    { type: "path", fill: "#eff0eb", points: [{ x: 52, y: 42 }, { x: 166, y: 34 }, { x: 174, y: 136 }, { x: 62, y: 146 }], close: true },
    { type: "path", fill: "#d9cfbd", points: [{ x: 604, y: 22 }, { x: 782, y: 18 }, { x: 780, y: 200 }, { x: 590, y: 182 }], close: true },
    { type: "path", fill: "#f0f0e8", points: [{ x: 642, y: 42 }, { x: 742, y: 40 }, { x: 736, y: 138 }, { x: 628, y: 126 }], close: true },
    { type: "path", fill: "#d9cfbd", points: [{ x: 20, y: 408 }, { x: 220, y: 392 }, { x: 218, y: 582 }, { x: 18, y: 584 }], close: true },
    { type: "path", fill: "#d9cfbd", points: [{ x: 590, y: 402 }, { x: 782, y: 420 }, { x: 780, y: 584 }, { x: 600, y: 584 }], close: true },
    { type: "circle", x: 210, y: 190, radius: 28, fill: "#5e864d" },
    { type: "circle", x: 184, y: 172, radius: 20, fill: "#789a5c" },
    { type: "circle", x: 586, y: 188, radius: 26, fill: "#5a824a" },
    { type: "circle", x: 214, y: 408, radius: 24, fill: "#62894e" },
    { type: "circle", x: 594, y: 402, radius: 28, fill: "#5e864d" },

    { type: "rect", x: 0, y: 220, width: 260, height: 200, fill: "#4b5563" },
    { type: "path", fill: "#4b5563", points: [{ x: 240, y: 600 }, { x: 640, y: 600 }, { x: 640, y: 220 }, { x: 230, y: 220 }, { x: 250, y: 330 }, { x: 240, y: 600 }], close: true },
    { type: "path", fill: "#4b5563", points: [{ x: 230, y: 0 }, { x: 640, y: 0 }, { x: 640, y: 220 }, { x: 230, y: 220 }], close: true },
    { type: "path", fill: "#525d69", points: [{ x: 230, y: 220 }, { x: 640, y: 220 }, { x: 640, y: 382 }, { x: 260, y: 420 }, { x: 260, y: 220 }], close: true },

    { type: "line", x1: 0, y1: 270, x2: 230, y2: 270, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 0, y1: 320, x2: 230, y2: 320, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 0, y1: 370, x2: 230, y2: 370, stroke: "#f8fafc", lineWidth: 4 },
    { type: "line", x1: 320, y1: 600, x2: 320, y2: 420, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 400, y1: 600, x2: 400, y2: 420, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 480, y1: 600, x2: 480, y2: 420, stroke: "#f8fafc", lineWidth: 4 },
    { type: "line", x1: 560, y1: 600, x2: 560, y2: 420, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 325, y1: 0, x2: 325, y2: 220, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },
    { type: "line", x1: 420, y1: 0, x2: 420, y2: 220, stroke: "#f8fafc", lineWidth: 4 },
    { type: "line", x1: 515, y1: 0, x2: 515, y2: 220, stroke: "#e2e8f0", lineWidth: 3, dash: [28, 22] },

    { type: "line", x1: 250, y1: 420, x2: 480, y2: 420, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 420, y1: 220, x2: 628, y2: 220, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 230, y1: 220, x2: 230, y2: 370, stroke: "#f8fafc", lineWidth: 5 },

    { type: "line", x1: 400, y1: 420, x2: 325, y2: 220, stroke: "#f8fafc", lineWidth: 3, dash: [20, 16] },
    { type: "line", x1: 480, y1: 420, x2: 420, y2: 220, stroke: "#f8fafc", lineWidth: 3, dash: [20, 16] },

    { type: "line", x1: 285, y1: 538, x2: 285, y2: 506, stroke: "#f8fafc", lineWidth: 7 },
    { type: "line", x1: 285, y1: 506, x2: 264, y2: 506, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 246, y: 506 }, { x: 266, y: 494 }, { x: 266, y: 518 }], close: true },
    { type: "line", x1: 365, y1: 538, x2: 365, y2: 496, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 365, y: 476 }, { x: 352, y: 498 }, { x: 378, y: 498 }], close: true },
    { type: "line", x1: 445, y1: 538, x2: 445, y2: 496, stroke: "#f8fafc", lineWidth: 7 },
    { type: "path", fill: "#f8fafc", points: [{ x: 445, y: 476 }, { x: 432, y: 498 }, { x: 458, y: 498 }], close: true },

    { type: "line", x1: 106, y1: 245, x2: 150, y2: 245, stroke: "#f8fafc", lineWidth: 6 },
    { type: "line", x1: 150, y1: 245, x2: 150, y2: 234, stroke: "#f8fafc", lineWidth: 6 },
    { type: "path", fill: "#f8fafc", points: [{ x: 150, y: 220 }, { x: 140, y: 236 }, { x: 160, y: 236 }], close: true },
    { type: "line", x1: 106, y1: 295, x2: 150, y2: 295, stroke: "#f8fafc", lineWidth: 6 },
    { type: "line", x1: 150, y1: 295, x2: 150, y2: 284, stroke: "#f8fafc", lineWidth: 6 },
    { type: "path", fill: "#f8fafc", points: [{ x: 150, y: 270 }, { x: 140, y: 286 }, { x: 160, y: 286 }], close: true },
    { type: "line", x1: 106, y1: 345, x2: 150, y2: 345, stroke: "#f8fafc", lineWidth: 6 },
    { type: "line", x1: 150, y1: 345, x2: 150, y2: 356, stroke: "#f8fafc", lineWidth: 6 },
    { type: "path", fill: "#f8fafc", points: [{ x: 150, y: 370 }, { x: 140, y: 354 }, { x: 160, y: 354 }], close: true },
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

const DOMINION_SOURCE_WIDTH = 693;
const DOMINION_SOURCE_HEIGHT = 886;
const DOMINION_CANVAS_WIDTH = 800;
const DOMINION_CANVAS_HEIGHT = 600;

function dx(value: number) {
  return (value / DOMINION_SOURCE_WIDTH) * DOMINION_CANVAS_WIDTH;
}

function dy(value: number) {
  return (value / DOMINION_SOURCE_HEIGHT) * DOMINION_CANVAS_HEIGHT;
}

function dPoint([x, y]: [number, number]) {
  return { x: dx(x), y: dy(y) };
}

function dPath(fill: string, points: [number, number][]) {
  return {
    type: "path",
    fill,
    points: points.map(dPoint),
    close: true,
  } as const;
}

function dLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke = "#f8fafc",
  lineWidth = 3,
  dash?: readonly number[],
) {
  return {
    type: "line",
    x1: dx(x1),
    y1: dy(y1),
    x2: dx(x2),
    y2: dy(y2),
    stroke,
    lineWidth,
    dash,
  } as const;
}

function dCircle(
  x: number,
  y: number,
  radius: number,
  fill: string,
) {
  return {
    type: "circle",
    x: dx(x),
    y: dy(y),
    radius: radius * 0.78,
    fill,
  } as const;
}

function dHatches(
  leftX: number,
  rightX: number,
  y1: number,
  y2: number,
  gaps: { y1: number; y2: number }[] = [],
  spacing = 96,
) {
  const lines = [];

  for (let y = y1; y < y2; y += spacing) {
    const endY = y + rightX - leftX;
    const crossesGap = gaps.some((gap) => y < gap.y2 && endY > gap.y1);
    if (crossesGap) continue;

    lines.push(dLine(leftX + 3, y, rightX - 3, Math.min(y2, endY), "#f8fafc", 7));
  }

  return lines;
}

const dominionRoad = {
  roadLeft: 224,
  busLeft: 224,
  busRight: 274,
  northboundRight: 324,
  medianRight: 358,
  southboundLeftRight: 408,
  roadRight: 458,
  sidewalkLeft: 202,
  sidewalkRight: 485,
  sideRoadTop: 696,
  sideRoadCenter: 746,
  sideRoadBottom: 796,
};

const URBAN_BUS_LANE_SIGN_001 = {
  id: "URBAN_BUS_LANE_SIGN_001",
  width: DOMINION_CANVAS_WIDTH,
  height: DOMINION_CANVAS_HEIGHT,
  background: "#d8e6d0",
  shapes: [
    dPath("#83ad67", [[0, 0], [202, 0], [202, 696], [0, 696]]),
    dCircle(80, 120, 55, "#315b36"),
    dCircle(165, 180, 50, "#416f3f"),
    dCircle(95, 330, 65, "#4f7d46"),
    dCircle(170, 380, 45, "#3f6b3d"),
    dCircle(90, 560, 45, "#456f41"),
    dCircle(165, 620, 35, "#365f38"),

    dPath("#c8b6a2", [[dominionRoad.sidewalkRight, 0], [693, 0], [693, 130], [dominionRoad.sidewalkRight, 130]]),
    dPath("#d3c1ae", [[dominionRoad.sidewalkRight, 130], [693, 130], [693, 320], [dominionRoad.sidewalkRight, 320]]),
    dPath("#c9b8a4", [[dominionRoad.sidewalkRight, 320], [693, 320], [693, 525], [dominionRoad.sidewalkRight, 525]]),
    dPath("#d1bdab", [[dominionRoad.sidewalkRight, 525], [693, 525], [693, 730], [dominionRoad.sidewalkRight, 730]]),
    dPath("#c8b6a2", [[dominionRoad.sidewalkRight, 730], [693, 730], [693, 886], [dominionRoad.sidewalkRight, 886]]),
    dPath("#b79e86", [[510, 45], [548, 45], [548, 75], [510, 75]]),
    dPath("#29333c", [[548, 20], [653, 20], [653, 88], [548, 88]]),
    dPath("#596773", [[575, 88], [625, 88], [625, 112], [575, 112]]),
    dPath("#b79e86", [[dominionRoad.sidewalkRight, 180], [547, 180], [547, 220], [dominionRoad.sidewalkRight, 220]]),
    dPath("#3b4650", [[547, 147], [665, 147], [665, 257], [547, 257]]),
    dPath("#647484", [[570, 257], [635, 257], [635, 287], [570, 287]]),
    dPath("#b79e86", [[dominionRoad.sidewalkRight, 380], [548, 380], [548, 425], [dominionRoad.sidewalkRight, 425]]),
    dPath("#27313a", [[548, 347], [670, 347], [670, 470], [548, 470]]),
    dPath("#566575", [[580, 470], [645, 470], [645, 505], [580, 505]]),
    dPath("#b79e86", [[dominionRoad.sidewalkRight, 590], [550, 590], [550, 635], [dominionRoad.sidewalkRight, 635]]),
    dPath("#526f66", [[550, 560], [672, 560], [672, 682], [550, 682]]),
    dPath("#758b82", [[580, 682], [642, 682], [642, 715], [580, 715]]),
    dPath("#b79e86", [[dominionRoad.sidewalkRight, 790], [555, 790], [555, 830], [dominionRoad.sidewalkRight, 830]]),
    dPath("#36424c", [[555, 755], [675, 755], [675, 856], [555, 856]]),
    dPath("#667783", [[590, 730], [643, 730], [643, 755], [590, 755]]),

    dPath("#4b5563", [[dominionRoad.roadLeft, 0], [dominionRoad.roadRight, 0], [dominionRoad.roadRight, 886], [dominionRoad.roadLeft, 886]]),
    dPath("#4b5563", [[0, dominionRoad.sideRoadTop], [dominionRoad.roadLeft, dominionRoad.sideRoadTop], [dominionRoad.roadLeft, dominionRoad.sideRoadBottom], [0, dominionRoad.sideRoadBottom]]),
    dPath("#bfc8c6", [[dominionRoad.sidewalkLeft, 0], [dominionRoad.roadLeft, 0], [dominionRoad.roadLeft, 696], [dominionRoad.sidewalkLeft, 696]]),
    dPath("#bfc8c6", [[dominionRoad.roadRight, 0], [dominionRoad.sidewalkRight, 0], [dominionRoad.sidewalkRight, 886], [dominionRoad.roadRight, 886]]),
    dPath("#2f9e77", [[dominionRoad.busLeft + 6, 465], [dominionRoad.busRight, 465], [dominionRoad.busRight, 608], [dominionRoad.busLeft + 6, 640]]),
    dPath("#2f9e77", [[dominionRoad.southboundLeftRight + 5, 0], [dominionRoad.roadRight - 6, 0], [dominionRoad.roadRight - 6, 102], [dominionRoad.southboundLeftRight + 5, 102]]),

    dLine(dominionRoad.roadLeft, 0, dominionRoad.roadLeft, 696, "#f8fafc", 4),
    dLine(dominionRoad.busRight, 0, dominionRoad.busRight, 430, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 430, dominionRoad.busRight, 608, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 632, dominionRoad.busRight, 659, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 683, dominionRoad.busRight, 710, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 734, dominionRoad.busRight, 761, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 785, dominionRoad.busRight, 812, "#f8fafc", 3),
    dLine(dominionRoad.busRight, 836, dominionRoad.busRight, 863, "#f8fafc", 3),
    dLine(dominionRoad.southboundLeftRight, 0, dominionRoad.southboundLeftRight, 886, "#f8fafc", 3),
    dLine(dominionRoad.northboundRight, 0, dominionRoad.northboundRight, 660, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 686, dominionRoad.northboundRight, 706, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 730, dominionRoad.northboundRight, 750, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 774, dominionRoad.northboundRight, 794, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 806, dominionRoad.northboundRight, 886, "#f8fafc", 4),
    dLine(dominionRoad.medianRight, 0, dominionRoad.medianRight, 660, "#f8fafc", 4),
    dLine(dominionRoad.medianRight, 686, dominionRoad.medianRight, 706, "#f8fafc", 4),
    dLine(dominionRoad.medianRight, 730, dominionRoad.medianRight, 750, "#f8fafc", 4),
    dLine(dominionRoad.medianRight, 774, dominionRoad.medianRight, 794, "#f8fafc", 4),
    dLine(dominionRoad.medianRight, 836, dominionRoad.medianRight, 886, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 660, dominionRoad.medianRight, 660, "#f8fafc", 4),
    dLine(dominionRoad.northboundRight, 806, dominionRoad.medianRight, 836, "#f8fafc", 4),
    dLine(dominionRoad.roadRight, 0, dominionRoad.roadRight, 886, "#f8fafc", 4),
    dLine(dominionRoad.busRight, 608, dominionRoad.busLeft + 6, 640, "#f8fafc", 2, [10, 8]),
    dLine(0, dominionRoad.sideRoadTop, dominionRoad.roadLeft, dominionRoad.sideRoadTop, "#f8fafc", 3),
    dLine(0, dominionRoad.sideRoadBottom, dominionRoad.roadLeft, dominionRoad.sideRoadBottom, "#f8fafc", 3),
    dLine(0, dominionRoad.sideRoadCenter, dominionRoad.roadLeft - 6, dominionRoad.sideRoadCenter, "#f8fafc", 3),
    dLine(dominionRoad.roadLeft - 6, dominionRoad.sideRoadTop + 6, dominionRoad.roadLeft - 6, dominionRoad.sideRoadBottom - 6, "#f8fafc", 5),

    ...dHatches(dominionRoad.northboundRight, dominionRoad.medianRight, 72, 886, [{ y1: 660, y2: 836 }]),

    { type: "text", x: dx(dominionRoad.busLeft + 10), y: dy(540), text: "LANE", fill: "#f8fafc", font: "18px sans-serif" },
    { type: "text", x: dx(dominionRoad.busLeft + 14), y: dy(570), text: "BUS", fill: "#f8fafc", font: "18px sans-serif" },
    { type: "text", x: dx(433), y: dy(70), text: "LANE", fill: "#f8fafc", font: "19px sans-serif", rotation: 180, align: "center" },
    { type: "text", x: dx(433), y: dy(38), text: "BUS", fill: "#f8fafc", font: "19px sans-serif", rotation: 180, align: "center" },

    {
      type: "vehicle",
      x: dx((dominionRoad.busRight + dominionRoad.northboundRight) / 2),
      y: dy(551),
      rotation: -90,
      palette: { body: "#c47a3a", roof: "#ffedd5", trim: "#7c2d12" },
    },

    dLine(132, 398, 211, 604, "#334155", 2),
    { type: "rect", x: dx(44), y: dy(234), width: dx(124), height: dy(164), fill: "#f8fafc" },
    { type: "rect", x: dx(50), y: dy(240), width: dx(112), height: dy(152), fill: "#ffffff" },
    dLine(50, 240, 162, 240, "#dc2626", 4),
    dLine(162, 240, 162, 392, "#dc2626", 4),
    dLine(162, 392, 50, 392, "#dc2626", 4),
    dLine(50, 392, 50, 240, "#dc2626", 4),
    { type: "rect", x: dx(84), y: dy(264), width: dx(46), height: dy(27), fill: "#111827" },
    { type: "rect", x: dx(90), y: dy(271), width: dx(8), height: dy(8), fill: "#e5e7eb" },
    { type: "rect", x: dx(102), y: dy(271), width: dx(8), height: dy(8), fill: "#e5e7eb" },
    { type: "rect", x: dx(114), y: dy(271), width: dx(8), height: dy(8), fill: "#e5e7eb" },
    dCircle(93, 296, 4, "#111827"),
    dCircle(122, 296, 4, "#111827"),
    { type: "text", x: dx(106), y: dy(340), text: "LANE", fill: "#111827", font: "33px sans-serif", align: "center" },
    { type: "text", x: dx(106), y: dy(366), text: "4 PM - 7 PM", fill: "#111827", font: "14px sans-serif", align: "center" },
    { type: "text", x: dx(106), y: dy(382), text: "MON - FRI", fill: "#111827", font: "12px sans-serif", align: "center" },

    { type: "rect", x: dx(198), y: dy(585), width: dx(26), height: dy(38), fill: "#f8fafc" },
    { type: "rect", x: dx(200), y: dy(587), width: dx(22), height: dy(34), fill: "#ffffff" },
    dLine(200, 587, 222, 587, "#dc2626", 2),
    dLine(222, 587, 222, 621, "#dc2626", 2),
    dLine(222, 621, 200, 621, "#dc2626", 2),
    dLine(200, 621, 200, 587, "#dc2626", 2),
    { type: "rect", x: dx(207), y: dy(591), width: dx(12), height: dy(7), fill: "#111827" },
    dCircle(209, 600, 2, "#111827"),
    dCircle(217, 600, 2, "#111827"),
    { type: "text", x: dx(211), y: dy(613), text: "LANE", fill: "#111827", font: "8px sans-serif", align: "center" },
    { type: "text", x: dx(211), y: dy(620), text: "4-7 PM", fill: "#111827", font: "6px sans-serif", align: "center" },
    dLine(211, 623, 211, 670, "#9ca3af", 5),
  ],
} as const;

const BUS_LANE_TIME_SIGN_001 = {
  id: "BUS_LANE_TIME_SIGN_001",
  width: 800,
  height: 600,
  background: "#eef3ed",
  shapes: [
    { type: "rect", x: 300, y: 92, width: 200, height: 338, fill: "#e5e7eb", radius: 10 },
    { type: "rect", x: 310, y: 102, width: 180, height: 318, fill: "#ffffff", radius: 7 },
    { type: "line", x1: 310, y1: 102, x2: 490, y2: 102, stroke: "#dc2626", lineWidth: 8 },
    { type: "line", x1: 490, y1: 102, x2: 490, y2: 420, stroke: "#dc2626", lineWidth: 8 },
    { type: "line", x1: 490, y1: 420, x2: 310, y2: 420, stroke: "#dc2626", lineWidth: 8 },
    { type: "line", x1: 310, y1: 420, x2: 310, y2: 102, stroke: "#dc2626", lineWidth: 8 },

    { type: "rect", x: 350, y: 138, width: 100, height: 58, fill: "#111827", radius: 4 },
    { type: "rect", x: 363, y: 153, width: 18, height: 17, fill: "#e5e7eb", radius: 2 },
    { type: "rect", x: 391, y: 153, width: 18, height: 17, fill: "#e5e7eb", radius: 2 },
    { type: "rect", x: 419, y: 153, width: 18, height: 17, fill: "#e5e7eb", radius: 2 },
    { type: "circle", x: 370, y: 204, radius: 8, fill: "#111827" },
    { type: "circle", x: 430, y: 204, radius: 8, fill: "#111827" },

    { type: "text", x: 400, y: 284, text: "LANE", fill: "#111827", font: "58px sans-serif", align: "center" },
    { type: "text", x: 400, y: 348, text: "7AM-7PM", fill: "#111827", font: "32px sans-serif", align: "center" },
    { type: "text", x: 400, y: 390, text: "MON-SUN", fill: "#111827", font: "27px sans-serif", align: "center" },

    { type: "line", x1: 400, y1: 430, x2: 400, y2: 540, stroke: "#94a3b8", lineWidth: 10 },
  ],
} as const;

const PAID_PARKING_MACHINE_001 = {
  id: "PAID_PARKING_MACHINE_001",
  width: 800,
  height: 600,
  background: "#e8edf2",
  shapes: [
    { type: "rect", x: 0, y: 0, width: 800, height: 600, fill: "#edf1f5" },
    { type: "path", fill: "#4b5563", points: [{ x: 0, y: 332 }, { x: 442, y: 238 }, { x: 800, y: 300 }, { x: 800, y: 600 }, { x: 0, y: 600 }], close: true },
    { type: "path", fill: "#d7ded6", points: [{ x: 0, y: 262 }, { x: 442, y: 168 }, { x: 800, y: 230 }, { x: 800, y: 300 }, { x: 442, y: 238 }, { x: 0, y: 332 }], close: true },
    { type: "line", x1: 0, y1: 332, x2: 442, y2: 238, stroke: "#f8fafc", lineWidth: 5 },
    { type: "line", x1: 442, y1: 238, x2: 800, y2: 300, stroke: "#f8fafc", lineWidth: 5 },

    { type: "path", fill: "#56616b", points: [{ x: 28, y: 362 }, { x: 186, y: 328 }, { x: 292, y: 384 }, { x: 130, y: 420 }], close: true },
    { type: "path", fill: "#56616b", points: [{ x: 204, y: 324 }, { x: 362, y: 290 }, { x: 468, y: 348 }, { x: 306, y: 382 }], close: true },
    { type: "path", fill: "#56616b", points: [{ x: 380, y: 288 }, { x: 538, y: 254 }, { x: 648, y: 312 }, { x: 484, y: 346 }], close: true },
    { type: "line", x1: 28, y1: 362, x2: 186, y2: 328, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 130, y1: 420, x2: 292, y2: 384, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 204, y1: 324, x2: 362, y2: 290, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 306, y1: 382, x2: 468, y2: 348, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 380, y1: 288, x2: 538, y2: 254, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 484, y1: 346, x2: 648, y2: 312, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 186, y1: 328, x2: 292, y2: 384, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 362, y1: 290, x2: 468, y2: 348, stroke: "#f8fafc", lineWidth: 3 },
    { type: "line", x1: 538, y1: 254, x2: 648, y2: 312, stroke: "#f8fafc", lineWidth: 3 },

    { type: "line", x1: 166, y1: 140, x2: 166, y2: 315, stroke: "#f8fafc", lineWidth: 7 },
    { type: "rect", x: 112, y: 54, width: 108, height: 124, fill: "#e5e7eb", radius: 8 },
    { type: "rect", x: 120, y: 62, width: 92, height: 108, fill: "#1554b7", radius: 5 },
    { type: "text", x: 148, y: 96, text: "P", fill: "#f8fafc", font: "38px sans-serif", align: "center" },
    { type: "text", x: 178, y: 95, text: "$", fill: "#f8fafc", font: "28px sans-serif", align: "center" },
    { type: "text", x: 166, y: 121, text: "Conditions on", fill: "#dbeafe", font: "11px sans-serif", align: "center" },
    { type: "text", x: 166, y: 137, text: "Parking Machine", fill: "#dbeafe", font: "11px sans-serif", align: "center" },
    { type: "text", x: 166, y: 153, text: "Times Vary", fill: "#dbeafe", font: "10px sans-serif", align: "center" },
    { type: "text", x: 166, y: 171, text: "Zone", fill: "#f8fafc", font: "24px sans-serif", align: "center" },

    { type: "rect", x: 246, y: 184, width: 58, height: 184, fill: "#9ca3af", radius: 11 },
    { type: "rect", x: 255, y: 196, width: 40, height: 160, fill: "#7b848c", radius: 7 },
    { type: "rect", x: 261, y: 214, width: 28, height: 42, fill: "#1554b7", radius: 3 },
    { type: "text", x: 275, y: 240, text: "P", fill: "#f8fafc", font: "20px sans-serif", align: "center" },
    { type: "text", x: 275, y: 252, text: "PAY", fill: "#dbeafe", font: "7px sans-serif", align: "center" },
    { type: "text", x: 275, y: 263, text: "HERE", fill: "#dbeafe", font: "7px sans-serif", align: "center" },
    { type: "text", x: 257, y: 298, text: "P01004", fill: "#f8fafc", font: "15px sans-serif", rotation: 90, align: "center" },
    { type: "rect", x: 263, y: 278, width: 25, height: 32, fill: "#2f3740", radius: 4 },

    { type: "line", x1: 289, y1: 293, x2: 454, y2: 184, stroke: "#334155", lineWidth: 2 },
    { type: "rect", x: 452, y: 74, width: 272, height: 296, fill: "#f8fafc", radius: 12 },
    { type: "rect", x: 466, y: 88, width: 244, height: 268, fill: "#1f2937", radius: 8 },
    { type: "rect", x: 486, y: 110, width: 204, height: 150, fill: "#d6d2bf", radius: 6 },
    { type: "text", x: 588, y: 132, text: "AT MACHINE NUMBER: 6311", fill: "#111827", font: "12px sans-serif", align: "center" },
    { type: "text", x: 588, y: 156, text: "Pay by Plate", fill: "#111827", font: "21px sans-serif", align: "center" },
    { type: "text", x: 588, y: 181, text: "MON-FRI 8AM-6PM", fill: "#111827", font: "14px sans-serif", align: "center" },
    { type: "text", x: 588, y: 202, text: "$5.50 / 1ST 2HRS", fill: "#111827", font: "14px sans-serif", align: "center" },
    { type: "text", x: 588, y: 222, text: "$9.00 / 3+ HRS", fill: "#111827", font: "14px sans-serif", align: "center" },
    { type: "text", x: 588, y: 244, text: "SAT-SUN 8AM-6PM  $3.50 / 1ST 2HRS", fill: "#111827", font: "11px sans-serif", align: "center" },
    { type: "text", x: 588, y: 294, text: "Enter plate and press OK", fill: "#e5e7eb", font: "16px sans-serif", align: "center" },
    { type: "circle", x: 675, y: 316, radius: 22, fill: "#84cc16" },
    { type: "text", x: 675, y: 324, text: "OK", fill: "#f8fafc", font: "18px sans-serif", align: "center" },
  ],
} as const;

export const STAGE_TEMPLATES = {
  T_INTERSECTION_001,
  CROSS_INTERSECTION_001,
  CROSS_INTERSECTION_RIGHT_TURN_SIGNAL_001,
  SIGNALISED_OFFSET_LANES_001,
  ROUNDABOUT_001,
  MOTORWAY_MERGE_001,
  URBAN_BUS_LANE_SIGN_001,
  BUS_LANE_TIME_SIGN_001,
  PAID_PARKING_MACHINE_001,
} as const;

export type StageTemplateName = keyof typeof STAGE_TEMPLATES;
