import { SensorLogPipelinePayload } from "../AnalyticsPipeline";

export default interface ISensorAccumulatorPlugin {
  setTag(tag: string): void;
  update(line: string, payload: SensorLogPipelinePayload): SensorLogPipelinePayload;
  getPayload(payload: SensorLogPipelinePayload): SensorLogPipelinePayload;
}
