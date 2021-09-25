import AccumulatorAnalyticsPlugin from "./AccumulatorAnalyticsPlugin";
import ISensorAccumulatorPlugin from "./ISensorAccumulatorPlugin";

export const MEASUREMENTS = {
  DISCARD: 'discard',
  KEEP: 'keep',
}

export function getValueRepresentation(values: number[], ref: number): string {
  const badResults = values.filter((val: number) => {
    return (Math.abs(ref - val) > 3);
  });
  return badResults.length > 0 ? MEASUREMENTS.DISCARD : MEASUREMENTS.KEEP;

}

export default class MonoxidePlugin extends AccumulatorAnalyticsPlugin implements ISensorAccumulatorPlugin {
  constructor(type = 'monoxide') {
    super(type, getValueRepresentation);
  }
}
