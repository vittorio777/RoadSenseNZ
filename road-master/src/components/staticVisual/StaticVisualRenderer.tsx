import type { StaticVisual } from "../../contracts/staticVisual";
import OverlayLayer from "./OverlayLayer";

type Props = {
  visual: StaticVisual;
  isWideLayout?: boolean;
};

const StaticVisualRenderer = ({ visual, isWideLayout = false }: Props) => {
  return (
    <svg
      className={[
        "mx-auto block w-full overflow-hidden rounded-md bg-zinc-100",
        isWideLayout ? "max-h-[62vh]" : "max-h-[52vh]",
      ].join(" ")}
      viewBox={`0 0 ${visual.width} ${visual.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=""
    >
      <SceneImage visual={visual} />
      <OverlayLayer visual={visual} />
    </svg>
  );
};

function SceneImage({ visual }: { visual: StaticVisual }) {
  if (visual.image) {
    return (
      <image
        href={visual.image}
        x={0}
        y={0}
        width={visual.width}
        height={visual.height}
        preserveAspectRatio="none"
      />
    );
  }

  return (
    <rect
      x={0}
      y={0}
      width={visual.width}
      height={visual.height}
      fill={visual.backgroundColor ?? "#e9eef2"}
    />
  );
}

export default StaticVisualRenderer;
