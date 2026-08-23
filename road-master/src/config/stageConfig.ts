import type { Stage, StageGroup } from "../contracts/scenario";

export const STAGE_TREE: {
  group: StageGroup;
  stages: Stage[];
}[] = [
  {
    group: "Intersections",
    stages: [
      "signalised_intersections",
      "unsignalised_intersections",
      "roundabouts",
    ],
  },
  {
    group: "UrbanRoad",
    stages: [
      "urban_general",
      "bus_lanes",
    ],
  },
  {
    group: "CountryRoad",
    stages: ["country_roads"],
  },
  {
    group: "Motorway",
    stages: ["motorways"],
  },
  {
    group: "Parking",
    stages: [
      "roadside_parking",
      "car_parks",
    ],
  },
  {
    group: "Hazards",
    stages: [
      "roadworks_zone",
      "emergency_vehicle_encounter",
      "school_bus_encounter",
    ],
  },
  {
    group: "Emergency",
    stages: [
      "breakdown",
      "accident_scene",
      "loss_of_control",
    ],
  },
];

export const STAGE_GROUP_LABELS: Record<StageGroup, string> = {
  Intersections: "Intersections",
  UrbanRoad: "Urban Roads",
  CountryRoad: "Country Roads",
  Motorway: "Motorways",
  Parking: "Parking",
  Hazards: "Hazards",
  Emergency: "Emergencies",
};

export const STAGE_LABELS: Record<Stage, string> = {
  signalised_intersections: "Signalised",
  unsignalised_intersections: "Unsignalised",
  roundabouts: "Roundabouts",

  urban_general: "General Driving",
  bus_lanes: "Bus Lanes",

  country_roads: "Country Roads",

  motorways: "Motorways",

  roadside_parking: "Roadside",
  car_parks: "Car Parks",

  roadworks_zone: "Roadworks",
  emergency_vehicle_encounter: "Emergency vehicle",
  school_bus_encounter: "School bus",

  breakdown: "Breakdown",
  accident_scene: "Crash",
  loss_of_control: "Skid",
};
