import * as fs from 'fs';

import AnalyticsPlugin, { IAnalyticsPlugin } from './AnalyticsPlugin';

import AnalyticsPipeline from './AnalyticsPipeline';



interface ISensorLogAnalytics {
  addPlugin(plugin: IAnalyticsPlugin): void;
  read(log: string): string;
}

export default class SensorLogAnalytics {

  protected _output: any = {};
  protected _input?: string[];
  protected _pipeline: AnalyticsPipeline = new AnalyticsPipeline();

  constructor() {

  }

  public registerPlugin(plugin: IAnalyticsPlugin): void {
    this._pipeline.addPlugin(plugin);
  }

  public read(log: string): string {
    this._input = log.split("\n");
    this._input.forEach((line: string) => {

    });
    return JSON.stringify(this._output);
  }

  /*protected _setPlugin(name: string): void {
    this._currentPlugin = this._plugins.get(name);
  }

  protected _setReferenceData(temperature: number, humidity: number, carbonMonoxide: number): void {
    this._referenceData = { temperature, humidity, carbonMonoxide };
  }*/

  protected _updateOutput(acc: IPlugin) {
    this._output[acc.name] = acc.value;
  }
}
