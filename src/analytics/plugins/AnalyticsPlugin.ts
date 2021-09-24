import { AnalyticsPipelinePayload } from "../AnalyticsPipeline";

export interface IAnalyticsPlugin {
  type: string;
  update(line: string, payload: AnalyticsPipelinePayload): void;
  getValue(): string;
}

export default class AnalyticsPlugin implements IAnalyticsPlugin {
  protected _type: string;
  protected _value: string = '';

  constructor( type: string = '') {
    this._type = type;
  }

  update(line: string, payload: AnalyticsPipelinePayload): void {
    throw new Error('Update method was not implemented in child class')
  }

  get type(): string {
    return this._type;
  }

  getValue(): string {
    return this._value;
  }
}
