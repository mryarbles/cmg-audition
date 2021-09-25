import * as math from 'mathjs';

import AnalyticsPlugin from "./AnalyticsPlugin";
import { ReferenceData, SensorLogPipelinePayload } from "../AnalyticsPipeline";
import ISensorAccumulatorPlugin from "./ISensorAccumulatorPlugin";

export const CONFIGURATION_ERROR: string = 'Incorrect configuration';

export default class AccumulatorAnalyticsPlugin extends AnalyticsPlugin implements ISensorAccumulatorPlugin {

  protected _tag: string = '';
  protected _entries: number[] = [];
  protected _getValue: Function;

  constructor(type = 'abstract', getValueRepresentation: (values: number[], ref: number) => string) {
    super(type);
    this._getValue = getValueRepresentation.bind(this);
  }

  update(line: string, payload: SensorLogPipelinePayload): SensorLogPipelinePayload {
    const [action, ...params] = line.split(' ');
    if (params.length !== 1) throw new Error(CONFIGURATION_ERROR);
    if (action === this._type) {
      this.setTag(params[0]);
    } else {
      this._entries.push(parseFloat(params[0]));
    }
    return payload;
  }

  setTag(tag: string): void {
    this._tag = tag;
  }

  getPayload(payload: SensorLogPipelinePayload): SensorLogPipelinePayload {
    const ref: number | undefined = payload.data && payload.data[this._type as keyof ReferenceData];
    if (typeof ref === undefined) throw new Error('Reference data is unavailable');
    const measurement: string = this._getValue(this._entries, ref as number);
    const result: SensorLogPipelinePayload = {...payload, output: { ...payload.output,[this._tag]: measurement}};
    this._reset();
    return result;
  }

  protected _reset() {
    this._tag = '';
    this._entries = [];
  }


}
