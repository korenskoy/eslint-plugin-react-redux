const assert = require('assert');
const fs = require('fs');
const path = require('path');
const plugin = require('..');

const ruleFiles = fs.readdirSync(path.resolve(__dirname, '../lib/rules/'))
  .map((f) => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', () => {
  ruleFiles.forEach((ruleName) => {
    it(`should export ${ruleName}`, () => {
      assert.equal(
        plugin.rules[ruleName],
        // eslint-disable-next-line
        require(path.join('../lib/rules', ruleName))
      );
    });
  });
});

describe('configurations', () => {
  it('should export a \'recommended\' configuration', () => {
    assert(plugin.configs.recommended);
    assert(plugin.configs.recommended.plugins.includes('teactn'));
    Object.keys(plugin.configs.recommended.rules).forEach((configName) => {
      assert.equal(configName.indexOf('teactn/'), 0);
      const ruleName = configName.substring('teactn/'.length);
      assert(plugin.rules[ruleName]);
    });
  });
  it('should export a \'all\' configuration', () => {
    assert(plugin.configs.all);
    assert(plugin.configs.all.plugins.includes('teactn'));
    Object.keys(plugin.configs.all.rules).forEach((configName) => {
      assert.equal(configName.indexOf('teactn/'), 0);
      assert.equal(plugin.configs.all.rules[configName], 2);
    });
    ruleFiles.forEach((ruleName) => {
      const inDeprecatedRules = Boolean(plugin.deprecatedRules[ruleName]);
      const inAllConfig = Boolean(plugin.configs.all.rules[`teactn/${ruleName}`]);
      assert(inDeprecatedRules || inAllConfig);
    });
  });
});
