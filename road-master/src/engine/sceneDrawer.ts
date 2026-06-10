import type * as Template from "../contracts/template";

export function drawSceneTemplate(
  ctx: CanvasRenderingContext2D,
  template: Template.StageTemplateData
) {
  ctx.clearRect(0, 0, template.width, template.height);

  ctx.fillStyle = template.background ?? "#f3f3f3";
  ctx.fillRect(0, 0, template.width, template.height);

  for (const shape of template.shapes) {
    drawShape(ctx, shape);
  }
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Template.StageShape) {
  switch (shape.type) {
    case "rect":
      drawRect(ctx, shape);
      break;

    case "circle":
      drawCircle(ctx, shape);
      break;

    case "line":
      drawLine(ctx, shape);
      break;

    case "path":
      drawPath(ctx, shape);
      break;

    case "text":
      drawText(ctx, shape);
      break;

    default:
      assertNever(shape);
  }
}

function drawRect(ctx: CanvasRenderingContext2D, shape: Template.RectShape) {
  ctx.fillStyle = shape.fill;
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
}

function drawCircle(ctx: CanvasRenderingContext2D, shape: Template.CircleShape) {
  ctx.beginPath();
  ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);

  if (shape.fill) {
    ctx.fillStyle = shape.fill;
    ctx.fill();
  }

  if (shape.stroke) {
    ctx.strokeStyle = shape.stroke;
    ctx.lineWidth = shape.lineWidth ?? 1;
    ctx.setLineDash(shape.dash ?? []);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function drawLine(ctx: CanvasRenderingContext2D, shape: Template.LineShape) {
  ctx.beginPath();
  ctx.moveTo(shape.x1, shape.y1);
  ctx.lineTo(shape.x2, shape.y2);

  ctx.strokeStyle = shape.stroke;
  ctx.lineWidth = shape.lineWidth ?? 1;
  ctx.setLineDash(shape.dash ?? []);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPath(ctx: CanvasRenderingContext2D, shape: Template.PathShape) {
  if (shape.points.length === 0) return;

  ctx.beginPath();
  ctx.moveTo(shape.points[0].x, shape.points[0].y);

  for (let i = 1; i < shape.points.length; i++) {
    ctx.lineTo(shape.points[i].x, shape.points[i].y);
  }

  if (shape.close) {
    ctx.closePath();
  }

  if (shape.fill) {
    ctx.fillStyle = shape.fill;
    ctx.fill();
  }

  if (shape.stroke) {
    ctx.strokeStyle = shape.stroke;
    ctx.lineWidth = shape.lineWidth ?? 1;
    ctx.stroke();
  }
}

function drawText(ctx: CanvasRenderingContext2D, shape: Template.TextShape) {
  ctx.fillStyle = shape.fill;
  ctx.font = shape.font ?? "16px sans-serif";
  ctx.fillText(shape.text, shape.x, shape.y);
}

function assertNever(value: never): never {
  throw new Error(`Unknown shape type: ${JSON.stringify(value)}`);
}