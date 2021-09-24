import AnalyticsPlugin, { IAnalyticsPlugin } from './plugins/AnalyticsPlugin';

export type ReferenceData = { temperature: number, humidity: number, carbonMonoxide: number };

export type AnalyticsPipelinePayload = {
  output?: {[key: string]: string}
}

export type SensorLogPipelinePayload = AnalyticsPipelinePayload & { data?: ReferenceData };

export interface IAnalyticsPipeline {
  update(line: string): void;
  addPlugin(plugin: IAnalyticsPlugin): void;
}

export default class AnalyticsPipeline {

  protected _payload?: AnalyticsPipelinePayload;
  protected _plugins: Map<string, IAnalyticsPlugin> = new Map();
  protected _currentPlugin?: IAnalyticsPlugin;
  constructor(payload: AnalyticsPipelinePayload = {}) {
    this._payload = payload;
  }

  update(line: string): void {
    const [action, ...params] = line.split(' ');
    if (this._plugins.has(action)) {
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
}
