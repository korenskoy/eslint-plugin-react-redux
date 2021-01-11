require('babel-eslint');

const rule = require('../../../lib/rules/mapDispatchToProps-prefer-parameters-names');
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

ruleTester.run('mapDispatchToProps-prefer-parameters-names', rule, {
  valid: [
    ...codeSamples,
    'const mapDispatchToProps = (dispatch, ownProps) => {}',
    'const mapDispatchToProps = (dispatch, {prop1, prop2}) => {}',
    'const mapDispatchToProps = (dispatch) => {}',
    'const mapDispatchToProps = (dispatch, ownProps, moreArgs) => {}',
    'const mapDispatchToProps = {anAction: anAction}',
    'withGlobal((state) => state, {anAction: anAction})(App)',
    'withGlobal(null, null)(App)',
    'withGlobal((state) => state, (dispatch, ownProps, moreArgs) => {})(App)',
    'function mapDispatchToProps(dispatch, ownProps) {}',

  ],
  invalid: [{
    code: 'const mapDispatchToProps = (anyOtherName) => {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }, {
    code: 'const mapDispatchToProps = (anyName, anyOtherName) => {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      }, {
        message: 'mapDispatchToProps function parameter #1 should be named ownProps',
      },
    ],
  }, {
    code: 'function mapDispatchToProps(anyOtherName) {}',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }, {
    code: 'withGlobal((state) => state, (anyOtherName) => {})(App)',
    errors: [
      {
        message: 'mapDispatchToProps function parameter #0 should be named dispatch',
      },
    ],
  }],
});
