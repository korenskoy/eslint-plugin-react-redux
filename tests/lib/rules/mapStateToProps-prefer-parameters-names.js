require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/mapStateToProps-prefer-parameters-names');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-prefer-parameters-names', rule, {
  valid: [
    ...codeSamples,
    'const mapStateToProps = ({prop1, prop2}, sharedGlobal, {ownProp1, ownProp2}) => {}',
    'const mapStateToProps = (global, sharedGlobal, ownProps) => {}',
    'const mapStateToProps = (global) => {}',
    'const mapStateToProps = (global, sharedGlobal, ownProps, detachWhenChanged, moreArgs) => {}',
    'withGlobal((global) => global, null)(App)',
    'function mapStateToProps(global, sharedGlobal, ownProps) {}',
    'withGlobal({global}, null)(App)',
    'const mapStateToProps = {}',
    'withGlobal(null, null, null)(App)',
    'const mapStateToProps = ({prop1, prop2}, sharedGlobal, ownProps) => {}',
  ],
  invalid: [{
    code: 'const mapStateToProps = (anyOtherName) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named global',
      },
    ],
  }, {
    code: 'const mapStateToProps = (anyOtherName, anyOtherName1, anyOtherName2, anyOtherName3) => {}',
    errors: [
      {
        message: 'mapStateToProps function parameter #0 should be named global',
      }, {
        message: 'mapStateToProps function parameter #1 should be named sharedGlobal',
      }, {
        message: 'mapStateToProps function parameter #2 should be named ownProps',
      }, {
        message: 'mapStateToProps function parameter #3 should be named detachWhenChanged',
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
