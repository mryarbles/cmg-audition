import * as math from 'mathjs';

import AnalyticsPlugin from "./AnalyticsPlugin";
import { SensorLogPipelinePayload } from "../AnalyticsPipeline";
import ISensorAccumulatorPlugin from "./ISensorAccumulatorPlugin";
import AccumulatorAnalyticsPlugin from "./AccumulatorAnalyticsPlugin";

export const CONFIGURATION_ERROR: string = 'Incorrect configuration';

export const MEASUREMENTS = {
  ULTRA: 'ultra precise',
  VERY_PRECISE: 'very precise',
  PRECISE: 'precise'
}

export function getValueRepresentation(values: number[], ref: number): string {
  const mean: number = math.mean(values);
  const diff: number = Math.abs(mean - ref);
  const deviation: number = math.std(values);
  if (diff <= .5 && deviation < 3) return MEASUREMENTS.ULTRA;
  if (diff <= .5 && deviation < 5) return MEASUREMENTS.VERY_PRECISE;
  return MEASUREMENTS.PRECISE;
}

export default class ThermometerPlugin extends AccumulatorAnalyticsPlugin implements ISensorAccumulatorPlugin {

  constructor(type = 'thermometer') {
    super(type, getValueRepresentation);
  }
}
