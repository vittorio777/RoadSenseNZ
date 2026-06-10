export type Scenario = {
    meta: ScenarioMeta;
    questions: ScenarioQuestion;
    animations: ScenarioAnimation;
};

// 元数据相关类型
export type ScenarioMeta = {
    scenarioId: string;
    interactionType: InteractionType;
    stageGroup: StageGroup;
    stage: Stage;  
    tags: Tag[];
    articles: ArticleId[];
    preview: string;
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


export type Tag =   // Priority
                    "give-way" | "stop-sign" | "traffic-light" | "pedestrian-priority"

                    // Turning
                    | "right-turn" | "left-turn" | "straight-through" | "u-turn"

                    // Lane behaviour
                    | "lane-change" | "merge" | "exit" | "overtaking" | "lane-discipline"

                    // Parking
                    | "parallel-parking" | "angle-parking" | "parking-sign" | "paid-parking"

                    // Hazards
                    | "pedestrian" | "cyclist" | "emergency-vehicle" | "school-bus"

                    // Vehicle control
                    | "skidding" | "breakdown";

export type ArticleId = string;

export type Article = {
    articleId: string;
    type: "guide" | "rule" | "news";
    title: string;
    summary: string;
    content: string;
    relatedScenariosIds: string[]; // Array of related scenario IDs
};

// 问题相关类型
export type ScenarioQuestion = {
    prompt: string;
    options: Option[];
    explanation: string;
};

export type Option = {
    id: "A" | "B" | "C" | "D";
    text: string;
    isCorrect?: boolean; // Optional field to indicate the correct answer
};

// 动画相关类型
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
    optionId:  "A" | "B" | "C" | "D";
    tracks: Track[];
};

export type Track = {
    objectId: string;
    property: "position" | "rotation";
    keyframes: Keyframe[];
};

export type Keyframe = {
    t: number;
    value: KeyframeValue;
};

export type KeyframeValue =
  | { x: number; y: number }
  | { deg: number };


// 用于传递动画参数的简化类型
export type InterScenario = {
    tracks: Track[];
    duration: number;
    width: number;
    height: number;
    templateName: string;
};