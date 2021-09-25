import AnalyticsPlugin, {
} from "./AnalyticsPlugin";
import { ReferenceData, SensorLogPipelinePayload } from "../AnalyticsPipeline";
import ISensorAnalyticsPlugin from "./ISensorAnalyticsPlugin";

export const CONFIGURATION_ERROR: string = 'Incorrect configuration';

export function getReferenceData(thermometer: number, humidity: number, monoxide: number): ReferenceData {
  return { thermometer, humidity, monoxide };
}

export default class ReferencePlugin extends AnalyticsPlugin implements ISensorAnalyticsPlugin {

  constructor(type = 'reference') {
    super(type);
  }

  update(line: string, payload: SensorLogPipelinePayload): SensorLogPipelinePayload {
    const [action, ...params] = line.split(' ');
    if (action === this._type) {
      if (params.length !== 3) throw new Error(CONFIGURATION_ERROR);
      const data: ReferenceData = getReferenceData(parseFloat(params[0]), parseFloat(params[1]), parseFloat(params[2]));
      return {...payload, data };
    }
    return payload;
  }

}
