import type { StaticVisual } from "../../../../contracts/staticVisual";

export const paidParkingVisual: StaticVisual = {
  width: 1536,
  height: 757,
  image: "/scenario-assets/parking-paid-st-paul-placeholder.png",
  overlays: [
    {
      id: "machine-screen-connector",
      type: "ConnectorLine",
      from: { x: 380, y: 342 },
      to: { x: 620, y: 254 },
    },
    {
      id: "machine-screen",
      type: "OverlayImage",
      image: "/scenario-assets/parking-machine-screen-st-paul.png",
      x: 612,
      y: 60,
      width: 532,
      height: 503,
      alt: "Parking machine screen",
    },
    {
      id: "machine-screen-text",
      type: "InfoPanel",
      panel: { x: 720, y: 169, width: 310, height: 190 },
      variant: "machineScreen",
      lines: [
        "AT MACHINE NUMBER: 9527                         03:36",
        "SERVICE: 09 355 3553",
        "Pay by Plate                         E-RECEIPT ONLY",
        "MON-FRI 8AM-6PM: $5.5/H 1ST 2HRS",
        "THEN $9/H",
        "SAT-SUN 8AM-6PM: $3.5/H 1ST 2HRS",
        "THEN $5/H",
        "Use keypad to enter your",
        "licence plate",
        'PRESS "?" FOR HELP',
        "_ _ _ _ _ _",
        "ENTER PLATE AND PRESS ON",
      ],
    },
  ],
};

export const paidParkingLocation = {
  name: "27-21 Princes Street",
  address: "Auckland CBD, Auckland 1010",
  lat: -36.849252,
  lng: 174.769426,
  source: "Reference location for Auckland paid parking signage",
} as const;
