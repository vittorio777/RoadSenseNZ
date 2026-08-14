import type { DriverEmotion, Keyframe, KeyframeValue, Track } from "../contracts/scenario";

type Position = {
  x: number;
  y: number;
};

type Rotation = {
  deg: number;
};

type Emotion = {
  emotion: DriverEmotion;
};

type Horn = {
  level: number;
};

export type FrameObjectState = {
  position?: Position;
  rotation?: Rotation;
  emotion?: Emotion;
  horn?: Horn;
};

const EPSILON = 0.0001;
const DIRECTION_SAMPLE_SECONDS = 0.04;

function isPosition(value: KeyframeValue): value is Position {
  return "x" in value && "y" in value;
}

function isRotation(value: KeyframeValue): value is Rotation {
  return "deg" in value;
}

function isEmotion(value: KeyframeValue): value is Emotion {
  return "emotion" in value;
}

function isHorn(value: KeyframeValue): value is Horn {
  return "level" in value;
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function findFrameIndex(t: number, keyframes: Keyframe[]) {
  if (keyframes.length <= 1 || t <= keyframes[0].t) return 0;

  for (let index = 0; index < keyframes.length - 1; index += 1) {
    if (t >= keyframes[index].t && t < keyframes[index + 1].t) {
      return index;
    }
  }

  return keyframes.length - 2;
}

function interpolateNumber(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function interpolatePosition(
  previous: Position,
  start: Position,
  end: Position,
  next: Position,
  progress: number,
): Position {
  const t2 = progress * progress;
  const t3 = t2 * progress;
  const padding = 18;

  const position = {
    x:
      0.5 *
      (2 * start.x +
        (-previous.x + end.x) * progress +
        (2 * previous.x - 5 * start.x + 4 * end.x - next.x) * t2 +
        (-previous.x + 3 * start.x - 3 * end.x + next.x) * t3),
    y:
      0.5 *
      (2 * start.y +
        (-previous.y + end.y) * progress +
        (2 * previous.y - 5 * start.y + 4 * end.y - next.y) * t2 +
        (-previous.y + 3 * start.y - 3 * end.y + next.y) * t3),
  };

  return {
    x: Math.max(Math.min(start.x, end.x) - padding, Math.min(Math.max(start.x, end.x) + padding, position.x)),
    y: Math.max(Math.min(start.y, end.y) - padding, Math.min(Math.max(start.y, end.y) + padding, position.y)),
  };
}

function sampleTrack(t: number, track: Track): KeyframeValue | null {
  const { keyframes, property } = track;
  if (keyframes.length === 0) return null;
  if (keyframes.length === 1 || t <= keyframes[0].t) return keyframes[0].value;
  if (t >= keyframes[keyframes.length - 1].t) return keyframes[keyframes.length - 1].value;

  const frameIndex = findFrameIndex(t, keyframes);
  const startFrame = keyframes[frameIndex];
  const endFrame = keyframes[frameIndex + 1];
  const startTime = startFrame.t;
  const endTime = endFrame.t;
  const progress = clamp01((t - startTime) / Math.max(EPSILON, endTime - startTime));

  if (property === "rotation" && isRotation(startFrame.value) && isRotation(endFrame.value)) {
    const rotationProgress = easeInOut(progress);

    return {
      deg: interpolateNumber(startFrame.value.deg, endFrame.value.deg, rotationProgress),
    };
  }

  if (property === "position" && isPosition(startFrame.value) && isPosition(endFrame.value)) {
    const previousFrame = keyframes[Math.max(0, frameIndex - 1)];
    const nextFrame = keyframes[Math.min(keyframes.length - 1, frameIndex + 2)];
    const previous = isPosition(previousFrame.value) ? previousFrame.value : startFrame.value;
    const next = isPosition(nextFrame.value) ? nextFrame.value : endFrame.value;

    if (keyframes.length > 2) {
      return interpolatePosition(previous, startFrame.value, endFrame.value, next, progress);
    }

    return {
      x: interpolateNumber(startFrame.value.x, endFrame.value.x, progress),
      y: interpolateNumber(startFrame.value.y, endFrame.value.y, progress),
    };
  }

  return startFrame.value;
}

function directionFromTrack(t: number, track: Track): Rotation | null {
  const before = sampleTrack(t - DIRECTION_SAMPLE_SECONDS, track);
  const after = sampleTrack(t + DIRECTION_SAMPLE_SECONDS, track);

  if (!before || !after || !isPosition(before) || !isPosition(after)) return null;

  const dx = after.x - before.x;
  const dy = after.y - before.y;
  if (Math.abs(dx) + Math.abs(dy) < EPSILON) return null;

  return {
    deg: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

export function getFrameStates(t: number, tracks: Track[]): Record<string, FrameObjectState> {
  const currentStates: Record<string, FrameObjectState> = {};
  const hasExplicitRotation = new Set(
    tracks.filter((track) => track.property === "rotation").map((track) => track.objectId),
  );

  tracks.forEach((track) => {
    const value = sampleTrack(t, track);
    if (!value) return;

    currentStates[track.objectId] ??= {};

    if (track.property === "position" && isPosition(value)) {
      currentStates[track.objectId].position = value;
    }

    if (track.property === "rotation" && isRotation(value)) {
      currentStates[track.objectId].rotation = value;
    }

    if (track.property === "emotion" && isEmotion(value)) {
      currentStates[track.objectId].emotion = value;
    }

    if (track.property === "horn" && isHorn(value)) {
      currentStates[track.objectId].horn = value;
    }
  });

  tracks.forEach((track) => {
    if (track.property !== "position" || hasExplicitRotation.has(track.objectId)) return;

    const rotation = directionFromTrack(t, track);
    if (!rotation) return;

    currentStates[track.objectId] ??= {};
    currentStates[track.objectId].rotation = rotation;
  });

  return currentStates;
}
