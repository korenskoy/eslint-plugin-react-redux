require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/mapStateToProps-prefer-parameters-names');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-prefer-parameters-names', rule, {
  valid: [
    ...codeSamples,
    'const mapStateToProps = ({prop1, prop2}, {ownProp1, ownProp2}) => {}',
    'const mapStateToProps = (global, ownProps) => {}',
    'const mapStateToProps = (global) => {}',
    'const mapStateToProps = (global, ownProps, moreArgs) => {}',
    'withGlobal((global) => global, null)(App)',
    'function mapStateToProps(global, ownProps) {}',
    'withGlobal({global}, null)(App)',
    'const mapStateToProps = {}',
    'withGlobal(null, null)(App)',
    'const mapStateToProps = ({prop1, prop2}, ownProps) => {}',
  ],
  invalid: [{
    code: 'const mapStateToProps = (anyOtherName) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named global',
      },
    ],
  }, {
    code: 'const mapStateToProps = (anyOtherName, anyOtherName1) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named global',
      }, {
        message: 'mapStateToProps function parameter #1 should be named ownProps',
      },
    ],
  }, {
    code: 'withGlobal(function(anyOtherName) {}, null)(App)',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named global',
      },
    ],
  }],
});
