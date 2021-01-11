require('babel-eslint');

const rule = require('../../../lib/rules/withGlobal-prefer-named-arguments');
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

ruleTester.run('withGlobal-prefer-named-arguments', rule, {
  valid: [
    ...codeSamples,
    'export default withGlobal(null, mapReducersToProps)(TodoApp)',
    'withGlobal(mapStateToProps, mapReducersToProps, mergeProps, options)(Component)',
    'withGlobal(mapStateToProps, mapReducersToProps)(Component)',
    'withGlobal()(TodoApp)',
  ],
  invalid: [{
    code: 'withGlobal(() => {}, () => {}, mergeProps, options)(Component)',
    errors: [
      {
        message: 'withGlobal function argument #0 should be named mapStateToProps',
      }, {
        message: 'withGlobal function argument #1 should be named mapReducersToProps',
      },
    ],
  }, {
    code: 'withGlobal({}, {})(Component)',
    errors: [
      {
        message: 'withGlobal function argument #0 should be named mapStateToProps',
      }, {
        message: 'withGlobal function argument #1 should be named mapReducersToProps',
      },
    ],
  }, {
    code: 'withGlobal(state => state)(TodoApp)',
    errors: [
      {
        message: 'withGlobal function argument #0 should be named mapStateToProps',
      },
    ],
  }],
});
