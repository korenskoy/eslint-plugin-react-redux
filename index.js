const rules = {
  'withGlobal-prefer-minimum-two-arguments': require('./lib/rules/withGlobal-prefer-minimum-two-arguments'),
  'withGlobal-prefer-named-arguments': require('./lib/rules/withGlobal-prefer-named-arguments'),
  'mapStateToProps-no-store': require('./lib/rules/mapStateToProps-no-store'),
  'mapStateToProps-prefer-hoisted': require('./lib/rules/mapStateToProps-prefer-hoisted'),
  'mapStateToProps-prefer-parameters-names': require('./lib/rules/mapStateToProps-prefer-parameters-names'),
  'mapStateToProps-prefer-selectors': require('./lib/rules/mapStateToProps-prefer-selectors'),
  'useSelector-prefer-selectors': require('./lib/rules/useSelector-prefer-selectors'),
  'no-unused-prop-types': require('./lib/rules/no-unused-prop-types'),
  'prefer-separate-component-file': require('./lib/rules/prefer-separate-component-file'),
};

function configureAsError() {
  const result = {};
  Object.keys(rules).forEach((key) => {
    result[`teactn/${key}`] = 2;
  });
  return result;
}

const activeRulesConfig = configureAsError();

module.exports = {
  deprecatedRules: [],
  rules,
  configs: {
    recommended: {
      plugins: ['teactn'],
      rules: {
        'teactn/withGlobal-prefer-minimum-two-arguments': 0,
        'teactn/withGlobal-prefer-named-arguments': 0,
        'teactn/mapStateToProps-no-store': 2,
        'teactn/mapStateToProps-prefer-hoisted': 2,
        'teactn/mapStateToProps-prefer-parameters-names': 2,
        'teactn/useSelector-prefer-selectors': 2,
        'teactn/no-unused-prop-types': 2,
        'teactn/prefer-separate-component-file': 1,
      },
    },
    all: {
      plugins: ['teactn'],
      rules: activeRulesConfig,
    },
  },
};
