import AnalyticsPlugin, { PLUGIN_UPDATE_OVERRIDE_ERROR } from './AnalyticsPlugin';

let plugin;
describe('analytics.plugins.AnalyticsPlugin', () => {
  describe('construction', () => {

    beforeEach(() => {
      plugin = new AnalyticsPlugin('test');
    });

    it('allows you to set a action type', () => {
      expect(plugin.type).toBe('test');
    });

    it('should require a update method be overridden', () => {
      expect(() => {
        plugin.update('test');
      }).toThrow(PLUGIN_UPDATE_OVERRIDE_ERROR);
    });
  });
});
