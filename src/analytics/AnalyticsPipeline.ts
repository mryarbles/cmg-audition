import AnalyticsPlugin, { IAnalyticsPlugin } from './plugins/AnalyticsPlugin';
import AccumulatorAnalyticsPlugin from "./plugins/AccumulatorAnalyticsPlugin";

export type ReferenceData = { thermometer: number, humidity: number, monoxide: number };

export type AnalyticsPipelinePayload = {
  output?: {[key: string]: string}
}



export type SensorLogPipelinePayload = AnalyticsPipelinePayload & { data?: ReferenceData };

export interface IAnalyticsPipeline<T> {
  update(line: string): void;
  addPlugin(plugin: IAnalyticsPlugin): void;
  output(): T;
}

export default class AnalyticsPipeline<T> {

  protected _payload: T;
  protected _plugins: Map<string, IAnalyticsPlugin> = new Map();
  protected _currentPlugin?: IAnalyticsPlugin;
  constructor(payload: T = {} as T) {
    this._payload = payload;
  }

  update(line: string): void {
    const [action, ...params] = line.split(' ');
    if (this._plugins.has(action)) {
      // update the payload if the current plugin is an accumlutor plugin.
      this._emptyCurrentPluginIntoPayload();
      // then grab the next plugin
      this._currentPlugin = this._plugins.get(action);
    }

    if (this._currentPlugin) {
      this._payload = this._currentPlugin.update(line, this._payload);
    }
  }

  addPlugin(plugin: IAnalyticsPlugin): void {
    if (!this._plugins.has(plugin.type)) {
      this._plugins.set(plugin.type, plugin);
    } else {
      throw new Error(`plugin ${plugin.type} was already registered`);
    }
  }

  protected _emptyCurrentPluginIntoPayload() {
    if (this._currentPlugin && this._currentPlugin instanceof AccumulatorAnalyticsPlugin) {
      this._payload = this._currentPlugin.getPayload(this._payload) as T;
    }
  }

  output(): T {
    // check to see if the last plugin was accumulator and empty it.
    this._emptyCurrentPluginIntoPayload();
    return this._payload;
  }
}
