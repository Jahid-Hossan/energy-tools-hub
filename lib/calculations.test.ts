import { describe, expect, it } from "vitest";
import {
  ahToWh,
  ampsToWatts,
  batteryCapacity,
  batteryChargingTime,
  batteryRuntime,
  calculateGeneratorSizing,
  electricityCost,
  energyKwh,
  generatorFuelConsumption,
  generatorRuntime,
  generatorWattage,
  solarBatteryCapacity,
  solarChargeTime,
  solarInverterSize,
  solarPanelSize,
  solveVoltsAmpsWatts,
  wattsToAmps,
  whToAh,
} from "./calculations";

describe("generator calculators", () => {
  it("calculates generator wattage with separate running and peak values", () => expect(generatorWattage(1500, 3000, 20)).toEqual({ runningWatts: 1500, startingSurgeWatts: 1500, runningCapacityWithHeadroom: 1800, estimatedPeakWatts: 3000 }));
  it("rejects invalid generator wattage inputs", () => expect(generatorWattage(-100, -50, -20)).toEqual({ runningWatts: 0, startingSurgeWatts: 0, runningCapacityWithHeadroom: 0, estimatedPeakWatts: 0 }));
  it("calculates runtime from explicit fuel rate", () => expect(generatorRuntime(5, 0.5)).toBe(10));
  it("prevents infinite runtime for zero consumption rate", () => expect(generatorRuntime(5, 0)).toBe(0));
  it("calculates fuel use from rate and hours", () => expect(generatorFuelConsumption(0.5, 8)).toBe(4));
  it("rejects negative fuel use inputs", () => expect(generatorFuelConsumption(-0.5, 8)).toBe(0));
  it("calculates multiple generator loads without summing every startup wattage", () => expect(calculateGeneratorSizing([{ quantity: 1, runningWatts: 1500, startingWatts: 1500 }, { quantity: 1, runningWatts: 800, startingWatts: 2000 }], 20)).toMatchObject({ totalRunningWatts: 2300, largestStartingSurgeWatts: 1200, runningCapacityWithHeadroom: 2760, estimatedPeakWatts: 3500 }));
  it("handles a resistive load with zero startup surge and custom quantity", () => expect(calculateGeneratorSizing([{ quantity: 2, runningWatts: 750, startingWatts: 750 }], 20)).toEqual({ totalRunningWatts: 1500, largestStartingSurgeWatts: 0, runningCapacityWithHeadroom: 1800, estimatedPeakWatts: 1500 }));
  it("clamps invalid load values to zero", () => expect(calculateGeneratorSizing([{ quantity: -2, runningWatts: -100, startingWatts: -50 }], 20)).toEqual({ totalRunningWatts: 0, largestStartingSurgeWatts: 0, runningCapacityWithHeadroom: 0, estimatedPeakWatts: 0 }));
});

describe("electrical calculators", () => {
  it("calculates DC watts to amps", () => expect(wattsToAmps(1200, 120, 1, "dc")).toBe(10));
  it("calculates single-phase AC watts to amps with PF", () => expect(wattsToAmps(1080, 120, 0.9, "single-phase-ac")).toBe(10));
  it("calculates three-phase AC watts to amps using sqrt 3", () => expect(wattsToAmps(2078.460969, 240, 0.9, "three-phase-ac")).toBeCloseTo(5.5556, 4));
  it("calculates inverse amps to watts", () => expect(ampsToWatts(10, 120, 0.9, "single-phase-ac")).toBe(1080));
  it("returns zero for zero voltage", () => expect(wattsToAmps(1200, 0, 0.9, "single-phase-ac")).toBe(0));
  it("solves each volts amps watts unknown", () => {
    expect(solveVoltsAmpsWatts({ watts: 1080, volts: 120, amps: 10, powerFactor: 0.9, mode: "single-phase-ac", unknown: "watts" })).toBe(1080);
    expect(solveVoltsAmpsWatts({ watts: 1080, volts: 0, amps: 10, powerFactor: 0.9, mode: "single-phase-ac", unknown: "volts" })).toBe(120);
    expect(solveVoltsAmpsWatts({ watts: 1080, volts: 120, amps: 0, powerFactor: 0.9, mode: "single-phase-ac", unknown: "amps" })).toBe(10);
  });
});

describe("energy and cost calculators", () => {
  it("calculates daily and period kWh", () => expect(energyKwh(1000, 2, 30)).toBe(60));
  it("calculates appliance wattage through the electrical utility", () => expect(ampsToWatts(5, 120, 1, "dc")).toBe(600));
  it("calculates electricity cost from kWh and rate", () => expect(electricityCost(60, 0.18)).toBeCloseTo(10.8, 10));
  it("prevents negative energy and cost", () => { expect(energyKwh(-1000, 2, 30)).toBe(0); expect(electricityCost(-60, -0.18)).toBe(0); });
});

describe("battery calculators", () => {
  it("returns 8.64 hours for 100 Ah, 12 V, 80% DoD, 90% efficiency, and 100 W load", () => expect(batteryRuntime(100, 12, 100, 0.8, 0.9)).toBeCloseTo(8.64, 10));
  it("calculates battery runtime with DoD and efficiency", () => expect(batteryRuntime(100, 12, 120, 0.8, 0.9)).toBe(7.2));
  it("prevents infinite runtime for zero load", () => expect(batteryRuntime(100, 12, 0, 0.8, 0.9)).toBe(0));
  it("calculates required nominal battery capacity", () => expect(batteryCapacity(120, 8, 12, 0.8, 0.9)).toBeCloseTo(111.1111, 4));
  it("returns zero capacity for invalid efficiency boundaries", () => expect(batteryCapacity(120, 8, 12, 0, 0.9)).toBe(0));
  it("converts Ah to Wh", () => expect(ahToWh(100, 12)).toBe(1200));
  it("converts Wh to Ah", () => expect(whToAh(1200, 12)).toBe(100));
  it("prevents division by zero in Wh to Ah", () => expect(whToAh(1200, 0)).toBe(0));
  it("calculates charging time with efficiency", () => expect(batteryChargingTime(100, 12, 500, 0.9)).toBeCloseTo(2.6667, 4));
  it("prevents meaningless charging time for zero charger power", () => expect(batteryChargingTime(100, 12, 0, 0.9)).toBe(0));
});

describe("solar calculators", () => {
  it("calculates solar panel size", () => expect(solarPanelSize(10, 5, 0.8)).toBe(2.5));
  it("returns zero solar panel size for invalid sun or efficiency", () => expect(solarPanelSize(10, 0, 0.8)).toBe(0));
  it("calculates solar battery capacity", () => expect(solarBatteryCapacity(2400, 24, 0.8, 0.9)).toBeCloseTo(138.8889, 4));
  it("returns zero solar battery capacity for invalid voltage", () => expect(solarBatteryCapacity(2400, 0, 0.8, 0.9)).toBe(0));
  it("calculates solar charge time", () => expect(solarChargeTime(100, 12, 300, 0.8)).toBe(5));
  it("returns zero solar charge time for invalid panel power", () => expect(solarChargeTime(100, 12, 0, 0.8)).toBe(0));
  it("calculates inverter continuous and surge requirements with margin", () => expect(solarInverterSize(2000, 3000, 20)).toEqual({ recommendedContinuousWatts: 2400, requiredSurgeWatts: 3600 }));
  it("handles negative inverter inputs without negative requirements", () => expect(solarInverterSize(-2000, -3000, -20)).toEqual({ recommendedContinuousWatts: 0, requiredSurgeWatts: 0 }));
});
