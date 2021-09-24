import AnalyticsPlugin from './AnalyticsPlugin';

let plugin;
describe('analytics.plugins.AnalyticsPlugin', () => {
  describe('construction', () => {

    beforeEach(() => {
      plugin = new AnalyticsPlugin('test');
    });

    it('allows you to set a action type', () => {
      expect(plugin.type).toBe('test');
    });
  });

});
