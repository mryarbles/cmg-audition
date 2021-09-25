import AccumulatorAnalyticsPlugin from "./AccumulatorAnalyticsPlugin";
import { SensorLogPipelinePayload } from "../AnalyticsPipeline";
import ISensorAccumulatorPlugin from "./ISensorAccumulatorPlugin";

export const CONFIGURATION_ERROR: string = 'Incorrect configuration';

export const MEASUREMENTS = {
  DISCARD: 'discard',
  KEEP: 'keep',
}

export function getValueRepresentation(values: number[], ref: number): string {
  let i = 0;
  const badResults = values.filter((val: number) => {
    return (Math.abs(ref - val) > 1);
  });
  return badResults.length > 0 ? MEASUREMENTS.DISCARD : MEASUREMENTS.KEEP;

}

export default class HumidityPlugin extends AccumulatorAnalyticsPlugin implements ISensorAccumulatorPlugin {
  constructor(type = 'humidity') {
    super(type,  getValueRepresentation);
  }
}
