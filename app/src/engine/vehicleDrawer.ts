export type VehiclePalette = {
  body: string;
  roof: string;
  trim: string;
};

export const VEHICLE_COLORS: Record<string, VehiclePalette> = {
  car1: { body: "#2563eb", roof: "#dbeafe", trim: "#1e3a8a" },
  car2: { body: "#dc2626", roof: "#fee2e2", trim: "#7f1d1d" },
  car3: { body: "#16a34a", roof: "#dcfce7", trim: "#14532d" },
};

const DEFAULT_VEHICLE_COLOR: VehiclePalette = {
  body: "#475569",
  roof: "#f8fafc",
  trim: "#1e293b",
};

type DrawVehicleOptions = {
  x: number;
  y: number;
  rotationDeg?: number;
  palette?: VehiclePalette;
};

export function getVehiclePalette(objectId: string): VehiclePalette {
  return VEHICLE_COLORS[objectId] ?? DEFAULT_VEHICLE_COLOR;
}

export function drawVehicle(ctx: CanvasRenderingContext2D, options: DrawVehicleOptions) {
  const { x, y, rotationDeg = 0, palette = DEFAULT_VEHICLE_COLOR } = options;
  const rotation = (rotationDeg * Math.PI) / 180;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.shadowColor = "rgba(15, 23, 42, 0.18)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  roundedRect(ctx, -22, -12, 44, 24, 6);
  ctx.fillStyle = palette.body;
  ctx.fill();

  ctx.shadowColor = "transparent";
  roundedRect(ctx, -12, -7, 16, 14, 4);
  ctx.fillStyle = palette.roof;
  ctx.fill();

  ctx.fillStyle = palette.trim;
  roundedRect(ctx, 4, -7, 8, 14, 3);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.24)";
  roundedRect(ctx, 12, -8, 7, 16, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(248, 250, 252, 0.82)";
  roundedRect(ctx, 18, -6, 2, 12, 1);
  ctx.fill();

  ctx.fillStyle = "#111827";
  ctx.fillRect(-15, -15, 8, 4);
  ctx.fillRect(7, -15, 8, 4);
  ctx.fillRect(-15, 11, 8, 4);
  ctx.fillRect(7, 11, 8, 4);

  ctx.restore();
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
