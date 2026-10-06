import { useEffect, useRef } from "react";
import type { InterScenario } from "../contracts/scenario";
import { getFrameStates, type FrameObjectState } from "../engine/scriptPlayer";
import { drawSceneTemplate } from "../engine/sceneDrawer";
import { STAGE_TEMPLATES } from "../content/template/sceneTemplate";
import { drawVehicle, getVehiclePalette } from "../engine/vehicleDrawer";

type Props = {
  scenario: InterScenario;
  isWideLayout?: boolean;
  playback?: "once" | "loop" | "static";
};

const ScenarioCanvas = ({
  scenario,
  isWideLayout = false,
  playback = "once",
}: Props) => {
  const { tracks, duration, width, height, templateName } = scenario;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;

    const ctx: CanvasRenderingContext2D = rawCtx;

    let animationFrameId = 0;
    let startTime: number | null = null;

    function drawAt(currentTime: number) {
      const frameStates = getFrameStates(currentTime, tracks);

      drawScene(ctx, templateName);
      drawTrafficSignals(ctx, frameStates);
      drawHornEffects(ctx, frameStates);
      drawObjects(ctx, frameStates);
      drawDriverEmotions(ctx, frameStates);
    }

    if (playback === "static" || duration <= 0) {
      drawAt(0);
      return;
    }

    function draw(t: number) {
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) / 1000;
      const currentTime =
        playback === "loop" ? elapsed % duration : Math.min(elapsed, duration);

      drawAt(currentTime);

      if (playback === "loop" || elapsed < duration) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, playback, templateName, tracks]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={[
        "mx-auto h-auto w-full object-contain",
        isWideLayout ? "max-h-[62vh]" : "max-h-[52vh]",
      ].join(" ")}
    />
  );
};

function drawScene(ctx: CanvasRenderingContext2D, templateName: string) {
  if (!(templateName in STAGE_TEMPLATES)) {
    throw new Error(`unknown stage template:${templateName}`);
  }

  const template = STAGE_TEMPLATES[templateName as keyof typeof STAGE_TEMPLATES];

  drawSceneTemplate(ctx, template);
}

function drawObjects(ctx: CanvasRenderingContext2D, frameStates: Record<string, FrameObjectState>) {
  for (const [objectId, state] of Object.entries(frameStates)) {
    if (!state.position) continue;
    if (state.signal) continue;

    if (objectId.startsWith("pedestrian")) {
      drawPedestrian(ctx, state.position.x, state.position.y);
      continue;
    }

    drawScenarioVehicle(ctx, objectId, state);
  }
}

function drawTrafficSignals(
  ctx: CanvasRenderingContext2D,
  frameStates: Record<string, FrameObjectState>,
) {
  for (const state of Object.values(frameStates)) {
    if (!state.position || !state.signal) continue;

    drawTrafficSignal(
      ctx,
      state.position.x,
      state.position.y,
      state.signal.signal,
      state.rotation?.deg,
    );
  }
}

function drawTrafficSignal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  signal: NonNullable<FrameObjectState["signal"]>["signal"],
  rotationDeg = 0,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotationDeg * Math.PI) / 180);

  ctx.shadowColor = "rgba(15, 23, 42, 0.18)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;

  roundedRect(ctx, -15, -29, 30, 58, 8);
  ctx.fillStyle = "#1f2937";
  ctx.fill();

  ctx.shadowColor = "transparent";

  ctx.fillStyle = signal === "red" ? "#ef4444" : "#4b5563";
  ctx.beginPath();
  ctx.arc(0, -13, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = signal === "green" ? "#22c55e" : "#4b5563";
  ctx.beginPath();
  ctx.arc(0, 13, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawScenarioVehicle(ctx: CanvasRenderingContext2D, objectId: string, state: FrameObjectState) {
  if (!state.position) return;

  drawVehicle(ctx, {
    x: state.position.x,
    y: state.position.y,
    rotationDeg: state.rotation?.deg,
    palette: getVehiclePalette(objectId),
  });
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawPedestrian(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#14532d";
  ctx.fillStyle = "#22c55e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, -11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.lineTo(0, 8);
  ctx.moveTo(-8, 0);
  ctx.lineTo(8, 0);
  ctx.moveTo(0, 8);
  ctx.lineTo(-7, 17);
  ctx.moveTo(0, 8);
  ctx.lineTo(7, 17);
  ctx.stroke();
  ctx.restore();
}

function drawHornEffects(ctx: CanvasRenderingContext2D, frameStates: Record<string, FrameObjectState>) {
  for (const state of Object.values(frameStates)) {
    if (!state.position || !state.horn || state.horn.level <= 0) continue;

    const rotation = ((state.rotation?.deg ?? 0) * Math.PI) / 180;
    const level = Math.max(0, Math.min(1, state.horn.level));

    ctx.save();
    ctx.translate(state.position.x, state.position.y);
    ctx.rotate(rotation);
    ctx.strokeStyle = `rgba(37, 99, 235, ${0.44 + level * 0.46})`;
    ctx.lineWidth = 2.6;
    ctx.lineCap = "round";

    for (let i = 0; i < 2; i += 1) {
      ctx.beginPath();
      ctx.arc(34 + i * 9, 0, 9 + i * 6, -0.9, 0.9);
      ctx.stroke();
    }

    ctx.fillStyle = `rgba(37, 99, 235, ${0.32 + level * 0.34})`;
    ctx.beginPath();
    ctx.moveTo(24, -5);
    ctx.lineTo(32, -10);
    ctx.lineTo(32, 10);
    ctx.lineTo(24, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function drawDriverEmotions(ctx: CanvasRenderingContext2D, frameStates: Record<string, FrameObjectState>) {
  for (const state of Object.values(frameStates)) {
    if (!state.position || !state.emotion || state.emotion.emotion === "none") continue;

    drawEmotionBubble(ctx, state.position.x, state.position.y - 42, state.emotion.emotion);
  }
}

function drawEmotionBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  emotion: NonNullable<FrameObjectState["emotion"]>["emotion"],
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "rgba(15, 23, 42, 0.12)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.beginPath();
  ctx.ellipse(0, -1, 13.5, 13, 0, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-3, 10);
  ctx.quadraticCurveTo(0, 15, 4, 10);
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = "transparent";

  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.arc(-4.3, -5.4, 1.35, 0, Math.PI * 2);
  ctx.arc(4.3, -5.4, 1.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 1.7;
  ctx.lineCap = "round";
  ctx.beginPath();

  if (emotion === "happy") {
    ctx.arc(0, -2.2, 5.9, 0.22, Math.PI - 0.22);
  } else if (emotion === "surprised" || emotion === "alert") {
    ctx.arc(0, 2.7, 2.35, 0, Math.PI * 2);
  } else if (emotion === "sad") {
    ctx.moveTo(-5.5, 5.6);
    ctx.quadraticCurveTo(0, 1.8, 5.5, 5.6);
  } else {
    ctx.moveTo(-5.6, 4.6);
    ctx.quadraticCurveTo(0, 1, 5.6, 4.6);
  }

  ctx.stroke();

  if (emotion === "annoyed") {
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(-6.8, -8);
    ctx.lineTo(-2, -6);
    ctx.moveTo(6.8, -8);
    ctx.lineTo(2, -6);
    ctx.stroke();
  }

  ctx.restore();
}

export default ScenarioCanvas;
