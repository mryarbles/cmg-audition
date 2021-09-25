import Plugin, { getValueRepresentation, MEASUREMENTS } from './ThermometerPlugin';

import { getReferenceData } from './ReferencePlugin';

let plugin;
describe('analytics.plugins.ThermometerPlugin', () => {


  describe('getValueRepresentation', () => {

    it('should provide correct measurements', () => {
      expect(getValueRepresentation([72.4,76,79.1,75.6, 69.7, 68.4], 70)).toBe(MEASUREMENTS.PRECISE);
      // expect(getValueRepresentation([70.5,70.3,70.3,70.6,70.2, 71.1], 70)).toBe(MEASUREMENTS.VERY_PRECISE);
      expect(getValueRepresentation([70.4,70.1,70.3,70.6,70.2, 70.1], 70)).toBe(MEASUREMENTS.ULTRA);
    })


  });

  describe('plugin', () => {

    beforeEach(() => {
      plugin = new Plugin();
    });

    it('allows you to set a action type', () => {
      expect(plugin.type).toBe('thermometer');
    });

    it('should provide a value after entries are accumulated', () => {
      const data = getReferenceData(10,11,12);
      const currentPayload = { data, output: { entry: 'hello'}};
      plugin.update('thermometer test2');
      plugin.update('123 11');
      plugin.update('123 9');
      plugin.update('123 1');
      plugin.update('123 3');
      const result = plugin.getPayload(currentPayload);
      expect(result).toEqual(Object.assign({...currentPayload}, { output: { entry: 'hello', test2: 'precise'  }}))
    });

    it('should provide a value after only 1 entry is accumulated', () => {
      const data = getReferenceData(10,11,12);
      const currentPayload = { data, output: { entry: 'hello'}};
      plugin.update('thermometer test2');
      plugin.update('123 11');
      const result = plugin.getPayload(currentPayload);
      expect(result).toEqual(Object.assign({...currentPayload}, { output: { entry: 'hello', test2: 'precise'  }}))
    });



  });

});
