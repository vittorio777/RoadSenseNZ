type Point = {
  x: number;
  y: number;
};

export type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

export type CircleShape = {
  type: "circle";
  x: number;
  y: number;
  radius: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  dash?: readonly number[];
};

export type LineShape = {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  lineWidth?: number;
  dash?: readonly number[];
};

export type PathShape = {
  type: "path";
  points: readonly Point[];
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  close?: boolean;
};

export type TextShape = {
  type: "text";
  x: number;
  y: number;
  text: string;
  fill: string;
  font?: string;
};

export type StageShape =
  | RectShape
  | CircleShape
  | LineShape
  | PathShape
  | TextShape;

export type StageTemplateData = {
  id: string;
  width: number;
  height: number;
  background?: string;
  shapes: readonly StageShape[];
};