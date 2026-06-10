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
      "pedestrian_crossing_zone",
      "school_zone",
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
  cross_intersection: "Cross intersection",
  t_intersection: "T intersection",
  roundabout: "Roundabout",

  urban_straight: "Straight urban road",
  urban_multi_lane: "Multi-lane urban road",
  pedestrian_crossing_zone: "Pedestrian crossing zone",
  school_zone: "School zone",

  country_straight: "Straight country road",
  country_uncontrolled_intersection: "Uncontrolled intersection",

  motorway_merge: "Motorway merge / on-ramp",
  motorway_exit: "Motorway exit / off-ramp",
  motorway_cruising: "Motorway cruising",

  roadside_parking: "Roadside parking",
  carpark: "Carpark",

  roadworks_zone: "Roadworks zone",
  emergency_vehicle_encounter: "Emergency vehicle encounter",
  school_bus_encounter: "School bus encounter",

  breakdown: "Breakdown",
  accident_scene: "Accident scene",
  loss_of_control: "Loss of control",
};