export type Appliance = { name: string; category: string; runningWatts: number; startingWatts: number; labelRequired?: boolean };

export const appliances: Appliance[] = [
  { name: "Refrigerator", category: "Kitchen", runningWatts: 180, startingWatts: 600 },
  { name: "Freezer", category: "Kitchen", runningWatts: 120, startingWatts: 500 },
  { name: "Microwave", category: "Kitchen", runningWatts: 1200, startingWatts: 1200 },
  { name: "Sump Pump", category: "Pumps", runningWatts: 800, startingWatts: 2000 },
  { name: "Well Pump", category: "Pumps", runningWatts: 1000, startingWatts: 3000 },
  { name: "Window Air Conditioner", category: "Cooling", runningWatts: 1200, startingWatts: 3600 },
  { name: "Central Air Conditioner", category: "Cooling", runningWatts: 3500, startingWatts: 10500 },
  { name: "Furnace Blower", category: "Heating", runningWatts: 800, startingWatts: 1600 },
  { name: "Space Heater", category: "Heating", runningWatts: 1500, startingWatts: 1500 },
  { name: "Television", category: "Living", runningWatts: 120, startingWatts: 120 },
  { name: "Desktop Computer", category: "Office", runningWatts: 300, startingWatts: 600 },
  { name: "Laptop", category: "Office", runningWatts: 0, startingWatts: 0, labelRequired: true },
  { name: "Wi-Fi Router", category: "Office", runningWatts: 0, startingWatts: 0, labelRequired: true },
  { name: "LED Lighting", category: "Home", runningWatts: 200, startingWatts: 200 },
  { name: "Coffee Maker", category: "Kitchen", runningWatts: 1000, startingWatts: 1000 },
  { name: "Electric Kettle", category: "Kitchen", runningWatts: 1500, startingWatts: 1500 },
  { name: "Washing Machine", category: "Laundry", runningWatts: 500, startingWatts: 1500 },
  { name: "Garage Door Opener", category: "Home", runningWatts: 500, startingWatts: 1500 },
];
