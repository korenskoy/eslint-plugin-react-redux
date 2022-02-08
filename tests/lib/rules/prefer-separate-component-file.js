require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/prefer-separate-component-file');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('prefer-separate-component-file', rule, {
  valid: [
    ...codeSamples,
    ` import Component from './component';
      withGlobal(mapStateToProps, mapReducersToProps)(Component)`,
    `const Component = require('./component')
     withGlobal(mapStateToProps, mapReducersToProps)(Component)`,
    `import {Component} from './component';
       withGlobal(mapStateToProps, mapReducersToProps)(Component)`,
  ],
  invalid: [{
    code: `const Component = () => {};
          withGlobal(mapStateToProps, null)(Component)`,
    errors: [
      {
        message: 'Connected component should be defined in a separate file.',
      },
    ],
  }],
});
