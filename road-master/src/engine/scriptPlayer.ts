import type { Keyframe, KeyframeValue, Track } from "../contracts/scenario";

type Position = {
  x: number;
  y: number;
};


function calFrameState(t:number, keyframes:Keyframe[]):KeyframeValue {
  const startFrame = keyframes[0];
  const endFrame = keyframes[1];
  
  const startTime = startFrame.t;
  const endTime = endFrame.t;

  const startValue = startFrame.value as Position;
  const endValue = endFrame.value as Position;

  const currentX = (endValue.x - startValue.x) / (endTime - startTime) * (t - startTime) + startValue.x;
  const currentY = (endValue.y - startValue.y) / (endTime - startTime) * (t - startTime) + startValue.y;
  return { x: currentX, y: currentY };
}

export function getFrameStates(t:number, tracks:Track[]): Record<string, KeyframeValue> {
  const currentStates: Record<string, KeyframeValue> = {};

  tracks.forEach(track => {
    const { objectId, property, keyframes } = track;
    keyframes.forEach((frame, index) => {
      if (t >= frame.t && t < keyframes[index + 1]?.t) {
        currentStates[objectId] = calFrameState(t, [frame, keyframes[index + 1]]);
      } else if (t >= keyframes[keyframes.length - 1].t) {
        currentStates[objectId] = keyframes[keyframes.length - 1].value;
      }
    });
  });
  return currentStates;
}