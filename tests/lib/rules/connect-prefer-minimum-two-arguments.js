require('babel-eslint');

const rule = require('../../../lib/rules/connect-prefer-minimum-two-arguments');
const RuleTester = require('eslint').RuleTester;
const codeSamples = require('../../code-sanity-samples');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('connect-prefer-minimum-two-arguments', rule, {
  valid: [
    ...codeSamples,
    'withGlobal(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)',
    'withGlobal(mapStateToProps, mapDispatchToProps)(Component)',
    'withGlobal({prop1, prop2}, {action1, action2})(Component)',
  ],
  invalid: [{
    code: 'withGlobal(mapStateToProps)(Component)',
    errors: [
      {
        message: 'Connect function should have at least 2 arguments.',
      },
    ],
  }],
});
