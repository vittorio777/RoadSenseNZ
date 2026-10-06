import type { Scenario } from "../contracts/scenario";

export type MapRegionId =
  | "new_zealand"
  | "auckland"
  | "auckland_greenlane"
  | "auckland_cbd"
  | "auckland_newmarket"
  | "auckland_mount_eden"
  | "auckland_manukau"
  | "wellington"
  | "wellington_cbd"
  | "wellington_lower_hutt"
  | "wellington_porirua";

export type MapViewport = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

export type MapRegion = {
  id: MapRegionId;
  label: string;
  subtitle: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

export const MAP_REGIONS: MapRegion[] = [
  {
    id: "new_zealand",
    label: "New Zealand",
    subtitle: "Choose a city or area from the left sidebar",
    center: { lat: -41.2865, lng: 174.7762 },
    zoom: 5,
  },
  {
    id: "auckland",
    label: "Auckland",
    subtitle: "Central Auckland scenarios",
    center: { lat: -36.8485, lng: 174.7633 },
    zoom: 11,
  },
  {
    id: "auckland_greenlane",
    label: "Greenlane",
    subtitle: "Suburban intersections and arterial roads",
    center: { lat: -36.8926, lng: 174.7932 },
    zoom: 14,
  },
  {
    id: "auckland_cbd",
    label: "CBD",
    subtitle: "Dense central city streets",
    center: { lat: -36.8485, lng: 174.7633 },
    zoom: 14,
  },
  {
    id: "auckland_newmarket",
    label: "Newmarket",
    subtitle: "Busy shopping and arterial roads",
    center: { lat: -36.8692, lng: 174.7778 },
    zoom: 14,
  },
  {
    id: "auckland_mount_eden",
    label: "Mount Eden",
    subtitle: "Residential streets and urban intersections",
    center: { lat: -36.8783, lng: 174.7645 },
    zoom: 14,
  },
  {
    id: "auckland_manukau",
    label: "Manukau",
    subtitle: "Suburban arterials and motorway access",
    center: { lat: -36.9928, lng: 174.8797 },
    zoom: 13,
  },
  {
    id: "wellington",
    label: "Wellington",
    subtitle: "Reserved for future Wellington scenarios",
    center: { lat: -41.2865, lng: 174.7762 },
    zoom: 12,
  },
  {
    id: "wellington_cbd",
    label: "CBD",
    subtitle: "Central Wellington streets",
    center: { lat: -41.2865, lng: 174.7762 },
    zoom: 14,
  },
  {
    id: "wellington_lower_hutt",
    label: "Lower Hutt",
    subtitle: "Suburban routes north-east of Wellington",
    center: { lat: -41.2124, lng: 174.9082 },
    zoom: 13,
  },
  {
    id: "wellington_porirua",
    label: "Porirua",
    subtitle: "Northern urban and motorway approaches",
    center: { lat: -41.1332, lng: 174.8403 },
    zoom: 13,
  },
];

export type MapAreaNode = {
  regionId: MapRegionId;
  children?: MapAreaNode[];
};

export const MAP_AREA_TREE: MapAreaNode[] = [
  {
    regionId: "auckland",
    children: [
      { regionId: "auckland_cbd" },
      { regionId: "auckland_greenlane" },
      { regionId: "auckland_newmarket" },
      { regionId: "auckland_mount_eden" },
      { regionId: "auckland_manukau" },
    ],
  },
  {
    regionId: "wellington",
    children: [
      { regionId: "wellington_cbd" },
      { regionId: "wellington_lower_hutt" },
      { regionId: "wellington_porirua" },
    ],
  },
];

export function getRegionById(regionId: MapRegionId) {
  return MAP_REGIONS.find((region) => region.id === regionId) ?? MAP_REGIONS[0];
}

export function getVisibleScenarios(scenarios: Scenario[], region: MapRegion) {
  if (region.id === "new_zealand") {
    return scenarios.filter((scenario) => scenario.meta.location);
  }

  if (region.id.startsWith("wellington")) {
    return scenarios.filter((scenario) =>
      scenario.meta.location.address?.includes("Wellington"),
    );
  }

  return scenarios.filter((scenario) =>
    scenario.meta.location.address?.includes("Auckland"),
  );
}
