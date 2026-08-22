import type { Stage, StageGroup } from "../contracts/scenario";

export const STAGE_TREE: {
  group: StageGroup;
  stages: Stage[];
}[] = [
  {
    group: "Intersections",
    stages: [
      "cross_intersection",
      "t_intersection",
      "roundabout",
    ],
  },
  {
    group: "UrbanRoad",
    stages: [
      "urban_straight",
      "urban_multi_lane",
    ],
  },
  {
    group: "CountryRoad",
    stages: [
      "country_straight",
      "country_uncontrolled_intersection",
    ],
  },
  {
    group: "Motorway",
    stages: [
      "motorway_merge",
      "motorway_exit",
      "motorway_cruising",
    ],
  },
  {
    group: "Parking",
    stages: [
      "roadside_parking",
      "carpark",
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
  UrbanRoad: "Urban Road",
  CountryRoad: "Country Road",
  Motorway: "Motorway",
  Parking: "Parking",
  Hazards: "Hazards",
  Emergency: "Emergency",
};

export const STAGE_LABELS: Record<Stage, string> = {
  cross_intersection: "Crossroad",
  t_intersection: "T junction",
  roundabout: "Roundabout",

  urban_straight: "Straight road",
  urban_multi_lane: "Bus lanes",
  pedestrian_crossing_zone: "Pedestrian",
  school_zone: "School zone",

  country_straight: "Open road",
  country_uncontrolled_intersection: "Uncontrolled junction",

  motorway_merge: "Merging",
  motorway_exit: "Exits",
  motorway_cruising: "Cruising",

  roadside_parking: "Roadside",
  carpark: "Car park",

  roadworks_zone: "Roadworks",
  emergency_vehicle_encounter: "Emergency vehicle",
  school_bus_encounter: "School bus",

  breakdown: "Breakdown",
  accident_scene: "Crash",
  loss_of_control: "Skid",
};
