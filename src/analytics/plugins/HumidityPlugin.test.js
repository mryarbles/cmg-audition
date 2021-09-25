import Plugin, { getValueRepresentation, MEASUREMENTS } from './HumidityPlugin';

import { getReferenceData } from './ReferencePlugin';

let plugin;
describe('analytics.plugins.HumidityPlugin', () => {

  describe('getValueRepresentation', () => {

    it('should provide correct measurements', () => {
      expect(getValueRepresentation([9.4,9.6,9.8,10,10.2,10.6,10.9, 11], 10)).toBe(MEASUREMENTS.KEEP);
      // expect(getValueRepresentation([70.5,70.3,70.3,70.6,70.2, 71.1], 70)).toBe(MEASUREMENTS.VERY_PRECISE);
      expect(getValueRepresentation([9.4,9.6,9.8,10,10.2,10.6,10.9, 12], 10)).toBe(MEASUREMENTS.DISCARD);
    })
  });

  describe('plugin', () => {

    beforeEach(() => {
      plugin = new Plugin();
    });

    it('allows you to set a action type', () => {
      expect(plugin.type).toBe('humidity');
    });

    it('should provide a value after entries are accumulated', () => {
      const data = getReferenceData(10,11,12);
      const currentPayload = { data, output: { entry: 'hello'}};
      plugin.update('humidity test2');
      plugin.update('123 11');
      plugin.update('123 9');
      plugin.update('123 15');
      plugin.update('123 13');
      const result = plugin.getPayload(currentPayload);
      debugger;
      expect(result).toEqual(Object.assign({...currentPayload}, { output: { entry: 'hello', test2: MEASUREMENTS.DISCARD  }}))
    });

  });
});
