export const PLUGIN_UPDATE_OVERRIDE_ERROR: string = 'Update method was not implemented in child class';

export interface IAnalyticsPlugin {
  type: string;
  update(line: string, payload: any): any;
}

export default class AnalyticsPlugin implements IAnalyticsPlugin {
  protected _type: string;

  constructor( type: string = '') {
    this._type = type;
  }

  update(line: string, payload: any): any {
    throw new Error(PLUGIN_UPDATE_OVERRIDE_ERROR)
  }

  get type(): string {
    return this._type;
  }


}
