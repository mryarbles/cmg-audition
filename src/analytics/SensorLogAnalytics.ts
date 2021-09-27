import * as fs from 'fs';

import AnalyticsPlugin, { IAnalyticsPlugin } from './plugins/AnalyticsPlugin';

import AnalyticsPipeline, { SensorLogPipelinePayload } from "./AnalyticsPipeline";

export function trimEmpty(arr: any[]): any[] {
  const result = arr.filter((val: any) => {
    return typeof val !== undefined && val !== '';
  });
  return result;
}

interface ISensorLogAnalytics {
  registerPlugin(plugin: IAnalyticsPlugin): void;
  read(log: string): ISensorLogAnalytics;
  output(): string;
}

export default class SensorLogAnalytics {

  protected _output: any = {};
  protected _input?: string[];
  protected _pipeline: AnalyticsPipeline<SensorLogPipelinePayload> = new AnalyticsPipeline();

  public registerPlugin(plugin: IAnalyticsPlugin): void {
    this._pipeline.addPlugin(plugin);
  }

  public read(log: string): ISensorLogAnalytics {
    this._input = trimEmpty(log.split("\n"));
    this._input.forEach((line: string) => {
      this._pipeline.update(line);
    });

    return this;
  }

  public output(): string {
    return JSON.stringify(this._pipeline.output().output);
  }
}
