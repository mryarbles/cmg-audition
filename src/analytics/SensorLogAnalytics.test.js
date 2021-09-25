import { trimEmpty } from './SensorLogAnalytics';

describe('analytics.SensorLogAnalytics', () => {
  describe('trimEmpty', () => {
    it('should remove empty indexes from array', () => {
      const source = [1,2,3,4,''];
      const result = trimEmpty(source);
      expect(source.length).toBe(5);
      expect(result).toEqual([1,2,3,4]);
    });
  });

});
