import {useRef, useEffect} from 'react'
import type {KeyframeValue, InterScenario} from '../contracts/scenario'
import { getFrameStates } from '../engine/scriptPlayer';
import {drawSceneTemplate} from '../engine/sceneDrawer'
import {STAGE_TEMPLATES} from '../content/template/sceneTemplate'


type Props = {
    scenario: InterScenario;
}

const ScenarioCanvas = ({ scenario }: Props) => {
  const {tracks, duration, width, height, templateName} = scenario;
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

        drawScene(ctx, width, height, templateName);
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

function drawScene(ctx: CanvasRenderingContext2D, width: number, height: number, templateName: string) {
    if (!(templateName in STAGE_TEMPLATES)) {
        throw new Error(`unknown stage template:${templateName}`)
    }

    const template = STAGE_TEMPLATES[templateName as keyof typeof STAGE_TEMPLATES];

    drawSceneTemplate(ctx, template);
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