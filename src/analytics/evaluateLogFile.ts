import SensorLogAnalytics from "./SensorLogAnalytics";
import ReferencePlugin from "./plugins/ReferencePlugin";
import HumidityPlugin from "./plugins/HumidityPlugin";
import ThermometerPlugin from "./plugins/ThermometerPlugin";
import MonoxidePlugin from "./plugins/MonoxidePlugin";

export default function evaluateLogFile(logContentsStr: string): string {
  const analytics = new SensorLogAnalytics();
  analytics.registerPlugin(new ReferencePlugin());
  analytics.registerPlugin(new HumidityPlugin());
  analytics.registerPlugin(new ThermometerPlugin());
  analytics.registerPlugin(new MonoxidePlugin());
  return analytics.read(logContentsStr).output();
}
