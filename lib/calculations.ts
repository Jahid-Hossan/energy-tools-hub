export type ElectricalMode = "dc" | "single-phase-ac" | "three-phase-ac";

export const finiteNonNegative = (value: number) => Number.isFinite(value) && value > 0 ? value : 0;
export const clampFraction = (value: number, fallback = 0) => Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : fallback;
export const round = (value: number, digits = 1) => Number.isFinite(value) ? Math.round(value * 10 ** digits) / 10 ** digits : 0;

function phaseFactor(mode: ElectricalMode) {
  return mode === "three-phase-ac" ? Math.sqrt(3) : 1;
}
function powerFactor(mode: ElectricalMode, value: number) {
  return mode === "dc" ? 1 : Math.min(1, Math.max(0.01, Number.isFinite(value) ? value : 1));
}

export function wattsToAmps(watts: number, volts: number, powerFactorValue = 1, mode: ElectricalMode = "dc") {
  const voltage = finiteNonNegative(volts);
  return voltage === 0 ? 0 : finiteNonNegative(watts) / (voltage * phaseFactor(mode) * powerFactor(mode, powerFactorValue));
}
export function ampsToWatts(amps: number, volts: number, powerFactorValue = 1, mode: ElectricalMode = "dc") {
  return finiteNonNegative(amps) * finiteNonNegative(volts) * phaseFactor(mode) * powerFactor(mode, powerFactorValue);
}
export function solveVoltsAmpsWatts(known: { watts?: number; volts?: number; amps?: number; powerFactor?: number; mode: ElectricalMode; unknown: "watts" | "volts" | "amps" }) {
  const pf = powerFactor(known.mode, known.powerFactor ?? 1);
  const factor = phaseFactor(known.mode) * pf;
  const watts = finiteNonNegative(known.watts ?? 0);
  const volts = finiteNonNegative(known.volts ?? 0);
  const amps = finiteNonNegative(known.amps ?? 0);
  if (known.unknown === "watts") return volts * amps * factor;
  if (known.unknown === "volts") return watts === 0 || amps === 0 ? 0 : watts / (amps * factor);
  return watts === 0 || volts === 0 ? 0 : watts / (volts * factor);
}

export function energyKwh(watts: number, hours: number, days = 1) {
  return finiteNonNegative(watts) * finiteNonNegative(hours) * finiteNonNegative(days) / 1000;
}
export function electricityCost(kwh: number, rate: number) {
  return finiteNonNegative(kwh) * finiteNonNegative(rate);
}

export function usableBatteryWh(ampHours: number, volts: number, depthOfDischarge: number, inverterEfficiency: number) {
  return finiteNonNegative(ampHours) * finiteNonNegative(volts) * clampFraction(depthOfDischarge) * clampFraction(inverterEfficiency);
}
export function batteryRuntime(ampHours: number, volts: number, loadWatts: number, depthOfDischarge: number, inverterEfficiency: number) {
  const load = finiteNonNegative(loadWatts);
  return load === 0 ? 0 : usableBatteryWh(ampHours, volts, depthOfDischarge, inverterEfficiency) / load;
}
export function batteryCapacity(loadWatts: number, hours: number, volts: number, depthOfDischarge: number, inverterEfficiency: number) {
  const denominator = finiteNonNegative(volts) * clampFraction(depthOfDischarge) * clampFraction(inverterEfficiency);
  return denominator === 0 ? 0 : finiteNonNegative(loadWatts) * finiteNonNegative(hours) / denominator;
}
export function ahToWh(ampHours: number, volts: number) { return finiteNonNegative(ampHours) * finiteNonNegative(volts); }
export function whToAh(wattHours: number, volts: number) { const voltage = finiteNonNegative(volts); return voltage === 0 ? 0 : finiteNonNegative(wattHours) / voltage; }
export function batteryChargingTime(ampHours: number, volts: number, chargerWatts: number, chargingEfficiency: number) {
  const charger = finiteNonNegative(chargerWatts) * clampFraction(chargingEfficiency);
  return charger === 0 ? 0 : ahToWh(ampHours, volts) / charger;
}

export type GeneratorLoad = { quantity: number; runningWatts: number; startingWatts: number };
export type GeneratorSizingResult = { totalRunningWatts: number; largestStartingSurgeWatts: number; runningCapacityWithHeadroom: number; estimatedPeakWatts: number };
export function calculateGeneratorSizing(loads: GeneratorLoad[], headroomPercent: number): GeneratorSizingResult {
  const headroom = Number.isFinite(headroomPercent) && headroomPercent > 0 ? headroomPercent : 0;
  const normalisedLoads = loads.map((load) => ({ quantity: Math.max(0, Number.isFinite(load.quantity) ? load.quantity : 0), runningWatts: finiteNonNegative(load.runningWatts), startingWatts: finiteNonNegative(load.startingWatts) }));
  const totalRunningWatts = normalisedLoads.reduce((total, load) => total + load.runningWatts * load.quantity, 0);
  const largestStartingSurgeWatts = normalisedLoads.reduce((largest, load) => Math.max(largest, Math.max(0, load.startingWatts - load.runningWatts) * load.quantity), 0);
  return { totalRunningWatts, largestStartingSurgeWatts, runningCapacityWithHeadroom: totalRunningWatts * (1 + headroom / 100), estimatedPeakWatts: totalRunningWatts + largestStartingSurgeWatts };
}
export function generatorWattage(runningWatts: number, startingWatts: number, headroomPercent: number) {
  const running = finiteNonNegative(runningWatts);
  const surge = Math.max(0, finiteNonNegative(startingWatts) - running);
  const headroom = Number.isFinite(headroomPercent) && headroomPercent > 0 ? headroomPercent : 0;
  return { runningWatts: running, startingSurgeWatts: surge, runningCapacityWithHeadroom: running * (1 + headroom / 100), estimatedPeakWatts: running + surge };
}
export function generatorRuntime(fuelGallons: number, fuelConsumptionGallonsPerHour: number) {
  const rate = finiteNonNegative(fuelConsumptionGallonsPerHour);
  return rate === 0 ? 0 : finiteNonNegative(fuelGallons) / rate;
}
export function generatorFuelConsumption(fuelConsumptionGallonsPerHour: number, hours: number) {
  return finiteNonNegative(fuelConsumptionGallonsPerHour) * finiteNonNegative(hours);
}

export function solarPanelSize(dailyEnergyKwh: number, peakSunHours: number, efficiencyFraction: number) {
  const denominator = finiteNonNegative(peakSunHours) * clampFraction(efficiencyFraction);
  return denominator === 0 ? 0 : finiteNonNegative(dailyEnergyKwh) / denominator;
}
export function solarBatteryCapacity(requiredWh: number, volts: number, depthOfDischargeFraction: number, efficiencyFraction: number) {
  const denominator = finiteNonNegative(volts) * clampFraction(depthOfDischargeFraction) * clampFraction(efficiencyFraction);
  return denominator === 0 ? 0 : finiteNonNegative(requiredWh) / denominator;
}
export function solarChargeTime(ampHours: number, volts: number, panelWatts: number, chargingEfficiencyFraction: number) {
  const denominator = finiteNonNegative(panelWatts) * clampFraction(chargingEfficiencyFraction);
  return denominator === 0 ? 0 : ahToWh(ampHours, volts) / denominator;
}
export function solarInverterSize(continuousLoadWatts: number, surgeLoadWatts: number, safetyMarginPercent: number) {
  const margin = Number.isFinite(safetyMarginPercent) && safetyMarginPercent > 0 ? safetyMarginPercent : 0;
  const continuous = finiteNonNegative(continuousLoadWatts);
  const surge = Math.max(continuous, finiteNonNegative(surgeLoadWatts));
  return { recommendedContinuousWatts: continuous * (1 + margin / 100), requiredSurgeWatts: surge * (1 + margin / 100) };
}
