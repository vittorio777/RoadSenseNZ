import React from 'react'
import {useRef, useEffect} from 'react'
import type {KeyframeValue, StageScenario} from '../contracts/scenario'
import { getFrameStates } from '../engine/scriptPlayer';


type Props = {
    scenario: StageScenario;
}

const ScenarioCanvas = ({ scenario }: Props) => {
  const {tracks, duration, width, height} = scenario;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;

    const ctx: CanvasRenderingContext2D = rawCtx;

    let animationFrameId: number = 0;
    let startTime: number | null = null;

    function draw(t: number) {
        if (!startTime) startTime = t;
        const elapsed = (t - startTime) / 1000; // Convert to seconds
        const currentTime = Math.min(elapsed, duration);
        const frameStates = getFrameStates(currentTime, tracks);

        drawScene(ctx, width, height);
        drawObjects(ctx, frameStates);

        if (elapsed < duration) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
        cancelAnimationFrame(animationFrameId);
    }

  }, [tracks, duration]);



  return (
    <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid #ccc' }} />
  )
}

function drawScene(ctx: CanvasRenderingContext2D, width: number, height: number, template?: string) {
    ctx.clearRect(0, 0, width, height);

    // background
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(0, 0, width, height);

    // simple T intersection
    ctx.fillStyle = "#555";

    // horizontal road
    ctx.fillRect(0, 250, width, 100);

    // vertical road from bottom to center
    ctx.fillRect(400, 300, 100, height - 300);
}

function drawObjects(ctx: CanvasRenderingContext2D, frameStates: Record<string, KeyframeValue>) {
    for (const [objectId, KeyframeValue] of Object.entries(frameStates)) {
        if (!KeyframeValue) continue;
        const { x, y } = KeyframeValue as { x: number; y: number };
        ctx.fillStyle = objectId === "car1" ? "blue" : objectId === "car2" ? "red" : "green";
        ctx.fillRect(x - 10, y - 10, 20, 20);
    }
}

export default ScenarioCanvas