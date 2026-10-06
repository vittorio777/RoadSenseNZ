type Point = {
  x: number;
  y: number;
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type BaseOverlay = {
  id: string;
};

export type FocusMarkerOverlay = BaseOverlay & {
  type: "FocusMarker";
  x: number;
  y: number;
  label?: string;
};

export type HighlightAreaOverlay = BaseOverlay & {
  type: "HighlightArea";
  area: Rect;
  label?: string;
};

export type ConnectorLineOverlay = BaseOverlay & {
  type: "ConnectorLine";
  from: Point;
  to: Point;
};

export type OverlayImageOverlay = BaseOverlay & {
  type: "OverlayImage";
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alt?: string;
};

export type InfoPanelOverlay = BaseOverlay & {
  type: "InfoPanel";
  panel: Rect;
  title?: string;
  lines: string[];
  variant?: "default" | "machineScreen";
};

export type DirectionArrowOverlay = BaseOverlay & {
  type: "DirectionArrow";
  from: Point;
  to: Point;
  label?: string;
};

export type StaticVisualOverlay =
  | FocusMarkerOverlay
  | HighlightAreaOverlay
  | ConnectorLineOverlay
  | OverlayImageOverlay
  | InfoPanelOverlay
  | DirectionArrowOverlay;

export type StaticVisual = {
  width: number;
  height: number;
  image?: string;
  backgroundColor?: string;
  overlays: StaticVisualOverlay[];
};
