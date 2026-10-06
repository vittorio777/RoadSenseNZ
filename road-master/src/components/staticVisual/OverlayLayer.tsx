import type {
  ConnectorLineOverlay,
  DirectionArrowOverlay,
  HighlightAreaOverlay,
  InfoPanelOverlay,
  OverlayImageOverlay,
  StaticVisual,
  StaticVisualOverlay,
} from "../../contracts/staticVisual";

type Props = {
  visual: StaticVisual;
};

const OverlayLayer = ({ visual }: Props) => {
  const lineOverlays = visual.overlays.filter(isLineOverlay);
  const otherOverlays = visual.overlays.filter((overlay) => !isLineOverlay(overlay));

  return (
    <>
      {otherOverlays.map((overlay) => renderOverlay(overlay, visual))}
      {lineOverlays.map((overlay) => renderOverlay(overlay, visual))}
    </>
  );
};

function isLineOverlay(
  overlay: StaticVisualOverlay,
): overlay is ConnectorLineOverlay | DirectionArrowOverlay {
  return overlay.type === "ConnectorLine" || overlay.type === "DirectionArrow";
}

function renderOverlay(overlay: StaticVisualOverlay, visual: StaticVisual) {
  switch (overlay.type) {
    case "OverlayImage":
      return <OverlayImage key={overlay.id} overlay={overlay} />;
    case "ConnectorLine":
      return <ConnectorLine key={overlay.id} overlay={overlay} />;
    case "InfoPanel":
      return <InfoPanel key={overlay.id} overlay={overlay} />;
    case "HighlightArea":
      return <HighlightArea key={overlay.id} overlay={overlay} />;
    case "FocusMarker":
      return (
        <g key={overlay.id}>
          <circle cx={overlay.x} cy={overlay.y} r={10} fill="#2563eb" stroke="#ffffff" strokeWidth={3} />
          {overlay.label && (
            <text x={overlay.x + 16} y={overlay.y + 4} fill="#18181b" fontSize={14} fontWeight={600}>
              {overlay.label}
            </text>
          )}
        </g>
      );
    case "DirectionArrow":
      return <DirectionArrow key={overlay.id} overlay={overlay} visual={visual} />;
    default:
      return null;
  }
}

function OverlayImage({ overlay }: { overlay: OverlayImageOverlay }) {
  return (
    <image
      href={overlay.image}
      x={overlay.x}
      y={overlay.y}
      width={overlay.width}
      height={overlay.height}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

function ConnectorLine({ overlay }: { overlay: ConnectorLineOverlay }) {
  return (
    <g>
      <line
        x1={overlay.from.x}
        y1={overlay.from.y}
        x2={overlay.to.x}
        y2={overlay.to.y}
        stroke="rgba(37, 99, 235, 0.82)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={overlay.from.x} cy={overlay.from.y} r={5} fill="#2563eb" stroke="#ffffff" strokeWidth={2} />
      <circle cx={overlay.to.x} cy={overlay.to.y} r={5} fill="#2563eb" stroke="#ffffff" strokeWidth={2} />
    </g>
  );
}

function HighlightArea({ overlay }: { overlay: HighlightAreaOverlay }) {
  return (
    <g>
      <rect
        x={overlay.area.x}
        y={overlay.area.y}
        width={overlay.area.width}
        height={overlay.area.height}
        rx={8}
        fill="rgba(37, 99, 235, 0.1)"
        stroke="rgba(37, 99, 235, 0.9)"
        strokeWidth={2}
      />
      {overlay.label && (
        <text x={overlay.area.x + 10} y={overlay.area.y + 22} fill="#18181b" fontSize={14} fontWeight={600}>
          {overlay.label}
        </text>
      )}
    </g>
  );
}

function InfoPanel({ overlay }: { overlay: InfoPanelOverlay }) {
  if (overlay.variant === "machineScreen") {
    const rows = overlay.lines.map((line) => ({ line, style: getMachineScreenLineStyle(line) }));
    const nodes = rows.map(({ line, style }, index) => {
      const precedingHeight = rows.slice(0, index).reduce((height, row, rowIndex) =>
        height + row.style.lineHeight + (rowIndex === 0 ? 0 : row.style.gapBefore), 0);
      const y = overlay.panel.y + precedingHeight + (index === 0 ? 0 : style.gapBefore);
      return renderMachineScreenLine(line, index, y, overlay, style);
    });
    return (
      <g fill="#1f1f1b" fontFamily='Consolas, "Courier New", monospace'>
        {nodes}
      </g>
    );
  }

  return (
    <g>
      <rect
        x={overlay.panel.x}
        y={overlay.panel.y}
        width={overlay.panel.width}
        height={overlay.panel.height}
        rx={8}
        fill="rgba(255, 255, 255, 0.95)"
        stroke="#e4e4e7"
      />
      {overlay.title && (
        <text x={overlay.panel.x + 12} y={overlay.panel.y + 24} fill="#71717a" fontSize={13} fontWeight={700}>
          {overlay.title}
        </text>
      )}
      {overlay.lines.map((line, index) => (
        <text
          key={`${line}-${index}`}
          x={overlay.panel.x + 12}
          y={overlay.panel.y + 48 + index * 20}
          fill="#27272a"
          fontSize={15}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function renderMachineScreenLine(
  line: string,
  index: number,
  y: number,
  overlay: InfoPanelOverlay,
  style: ReturnType<typeof getMachineScreenLineStyle>,
) {
  const leftX = overlay.panel.x;
  const rightX = overlay.panel.x + overlay.panel.width;
  const centerX = overlay.panel.x + overlay.panel.width / 2;
  const key = `${line}-${index}`;

  if (line.startsWith("AT MACHINE")) {
    return (
      <g key={key}>
        <text x={leftX} y={y} fontSize={style.fontSize} fontWeight={style.fontWeight}>
          AT MACHINE NUMBER: 9527
        </text>
        <text x={rightX} y={y} textAnchor="end" fontSize={18} fontWeight={700}>
          03:36
        </text>
      </g>
    );
  }

  if (line.startsWith("Pay by Plate")) {
    return (
      <g key={key}>
        <text x={leftX} y={y} fontSize={style.fontSize} fontWeight={style.fontWeight}>
          Pay by Plate
        </text>
        <text x={rightX} y={y} textAnchor="end" fontSize={13} fontWeight={700}>
          E-RECEIPT ONLY
        </text>
      </g>
    );
  }

  if (line.startsWith("Use keypad") || line === "licence plate") {
    return (
      <text
        key={key}
        x={centerX}
        y={y}
        textAnchor="middle"
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
      >
        {line}
      </text>
    );
  }

  if (line.startsWith("PRESS") || line.startsWith("ENTER") || line.startsWith("_")) {
    return (
      <text
        key={key}
        x={centerX}
        y={y}
        textAnchor="middle"
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
      >
        {line}
      </text>
    );
  }

  return (
    <text
      key={key}
      x={leftX}
      y={y}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
    >
      {line}
    </text>
  );
}

function getMachineScreenLineStyle(line: string) {
  if (line.startsWith("AT MACHINE") || line.startsWith("SERVICE")) {
    return { fontSize: 11, fontWeight: 600, lineHeight: 12, gapBefore: 4 };
  }

  if (line.startsWith("Pay by Plate")) {
    return { fontSize: 20, fontWeight: 700, lineHeight: 14, gapBefore: 5 };
  }

  if (line.startsWith("Use keypad") || line === "licence plate") {
    return { fontSize: 20, fontWeight: 700, lineHeight: 16, gapBefore: 4 };
  }

  if (line.startsWith("PRESS") || line.startsWith("ENTER") || line.startsWith("_")) {
    return { fontSize: 13, fontWeight: 600, lineHeight: 10, gapBefore: 4 };
  }

  return { fontSize: 15, fontWeight: 650, lineHeight: 12, gapBefore: 4 };
}

function DirectionArrow({ overlay }: { overlay: DirectionArrowOverlay; visual: StaticVisual }) {
  const markerId = `arrow-${overlay.id}`;

  return (
    <g>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(37, 99, 235, 0.86)" />
        </marker>
      </defs>
      <line
        x1={overlay.from.x}
        y1={overlay.from.y}
        x2={overlay.to.x}
        y2={overlay.to.y}
        stroke="rgba(37, 99, 235, 0.86)"
        strokeWidth={3}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
      {overlay.label && (
        <text
          x={(overlay.from.x + overlay.to.x) / 2}
          y={(overlay.from.y + overlay.to.y) / 2 - 10}
          fill="#18181b"
          fontSize={14}
          fontWeight={700}
        >
          {overlay.label}
        </text>
      )}
    </g>
  );
}

export default OverlayLayer;
