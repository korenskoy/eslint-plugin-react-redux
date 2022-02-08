require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/withGlobal-prefer-minimum-two-arguments');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('withGlobal-prefer-minimum-two-arguments', rule, {
  valid: [
    ...codeSamples,
    'withGlobal(mapStateToProps, mapReducersToProps, mergeProps, options)(Component)',
    'withGlobal(mapStateToProps, mapReducersToProps)(Component)',
    'withGlobal({prop1, prop2}, {action1, action2})(Component)',
  ],
  invalid: [{
    code: 'withGlobal(mapStateToProps)(Component)',
    errors: [
      {
        message: 'withGlobal function should have at least 2 arguments.',
      },
    ],
  }],
});
