import type { StaticVisual } from "./staticVisual";

export type Scenario = {
  meta: ScenarioMeta;
  questions: ScenarioQuestion;
  animations: ScenarioAnimation;
  staticVisual?: StaticVisual;
};

// Scenario metadata.
export type ScenarioMeta = {
  scenarioId: string;
  interactionType: InteractionType;
  stageGroup: StageGroup;
  stage: Stage;
  tags: Tag[];
  articles: ArticleId[];
  preview: string;
  location: RealLocation;
};

export type InteractionType =
  | "AUTOPLAY_PAUSE_REPLAY"
  | "LOOP_WITH_CHOICES"
  | "LOOP_GATED_CHOICES"
  | "STATIC_ONLY";

export type StageGroup =
  | "Intersections"
  | "UrbanRoad"
  | "CountryRoad"
  | "Motorway"
  | "Parking"
  | "Hazards"
  | "Emergency";

export type Stage =
  | "cross_intersection"
  | "t_intersection"
  | "roundabout"
  | "urban_straight"
  | "urban_multi_lane"
  | "pedestrian_crossing_zone"
  | "school_zone"
  | "country_straight"
  | "country_uncontrolled_intersection"
  | "motorway_merge"
  | "motorway_exit"
  | "motorway_cruising"
  | "roadside_parking"
  | "carpark"
  | "roadworks_zone"
  | "emergency_vehicle_encounter"
  | "school_bus_encounter"
  | "breakdown"
  | "accident_scene"
  | "loss_of_control";

export type Tag =
  // Priority
  | "give-way"
  | "stop-sign"
  | "traffic-light"
  | "pedestrian-priority"

  // Turning
  | "right-turn"
  | "left-turn"
  | "straight-through"
  | "u-turn"

  // Lane behaviour
  | "lane-change"
  | "merge"
  | "exit"
  | "overtaking"
  | "lane-discipline"

  // Parking
  | "parallel-parking"
  | "angle-parking"
  | "parking-sign"
  | "paid-parking"

  // Hazards
  | "pedestrian"
  | "cyclist"
  | "emergency-vehicle"
  | "school-bus"

  // Vehicle control
  | "skidding"
  | "breakdown";

export type ArticleId = string;

export type Article = {
  articleId: string;
  type: "guide" | "rule" | "news";
  title: string;
  summary: string;
  content: string;
  relatedScenariosIds: string[];
};

export type RealLocation = {
  name: string;
  address?: string;
  lat: number;
  lng: number;
  source?: string;
};

// Question data.
export type ScenarioQuestion = {
  prompt: string;
  options: Option[];
  explanation: string;
};

export type Option = {
  id: "A" | "B" | "C" | "D";
  text: string;
  isCorrect?: boolean;
};

// Animation data.
export type ScenarioAnimation = {
  template: string;
  width: number;
  height: number;
  script: ScriptType;
};

export type ScriptType = {
  introTracks: Track[];
  introDuration: number;
  optionTracks: OptionTrack[];
  optionDuration: number;
};

export type OptionTrack = {
  optionId: "A" | "B" | "C" | "D";
  tracks: Track[];
};

export type Track = {
  objectId: string;
  property: "position" | "rotation" | "emotion" | "horn" | "signal";
  keyframes: Keyframe[];
};

export type Keyframe = {
  t: number;
  value: KeyframeValue;
};

export type DriverEmotion = "none" | "happy" | "sad" | "surprised" | "annoyed" | "alert";
export type TrafficSignal = "red" | "green";

export type KeyframeValue =
  | { x: number; y: number }
  | { deg: number }
  | { emotion: DriverEmotion }
  | { level: number }
  | { signal: TrafficSignal };

// Simplified animation payload passed to the canvas player.
export type InterScenario = {
  tracks: Track[];
  duration: number;
  width: number;
  height: number;
  templateName: string;
};

export type Location = {
  stageGroup: StageGroup | null;
  stage: Stage | null;
  scenarioIndex: number;
};
