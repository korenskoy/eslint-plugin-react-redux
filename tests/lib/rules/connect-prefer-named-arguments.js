require('babel-eslint');

const rule = require('../../../lib/rules/connect-prefer-named-arguments');
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

ruleTester.run('connect-prefer-named-arguments', rule, {
  valid: [
    ...codeSamples,
    'export default withGlobal(null, mapDispatchToProps)(TodoApp)',
    'withGlobal(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)',
    'withGlobal(mapStateToProps, mapDispatchToProps)(Component)',
    'withGlobal()(TodoApp)',
  ],
  invalid: [{
    code: 'withGlobal(() => {}, () => {}, mergeProps, options)(Component)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #1 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: 'withGlobal({}, {})(Component)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      }, {
        message: 'Connect function argument #1 should be named mapDispatchToProps',
      },
    ],
  }, {
    code: 'withGlobal(state => state)(TodoApp)',
    errors: [
      {
        message: 'Connect function argument #0 should be named mapStateToProps',
      },
    ],
  }],
});
