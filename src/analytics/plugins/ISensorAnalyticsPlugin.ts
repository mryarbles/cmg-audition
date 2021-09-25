import { IAnalyticsPlugin } from "./AnalyticsPlugin";
import { SensorLogPipelinePayload } from "../AnalyticsPipeline";

export default interface ISensorAnalyticsPlugin extends IAnalyticsPlugin {
  update(line: string, payload: SensorLogPipelinePayload): SensorLogPipelinePayload;
}
