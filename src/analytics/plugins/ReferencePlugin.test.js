import ReferencePlugin, { getReferenceData } from './ReferencePlugin';

let plugin;
describe('analytics.plugins.AnalyticsPlugin', () => {
  describe('getReferenceData', () => {
    it('should return a ReferenceData instance', () => {
      const data = getReferenceData(11,12,13);
      expect(data.thermometer).toBe(11);
      expect(data.humidity).toBe(12);
      expect(data.monoxide).toBe(13);
    });
  })

  describe('plugin', () => {

    beforeEach(() => {
      plugin = new ReferencePlugin();
    });

    it('allows you to set a action type', () => {
      expect(plugin.type).toBe('reference');
    });

    it('should return current payload if the current action is not "reference"', () => {
      const currentPayload = { output: 'hello' };
      const payload = plugin.update('123 123', currentPayload);
      expect(payload).toEqual(currentPayload);
    });

    it('should add reference data to payload if action is "reference"', () => {
      const str = 'reference 11 12 13'
      const currentPayload = { output: 'hello' };
      const payload = plugin.update(str, currentPayload);
      expect(payload).toEqual({ output: 'hello', data: getReferenceData(11, 12, 13)});
    });

  });

});
