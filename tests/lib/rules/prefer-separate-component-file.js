require('babel-eslint');

const rule = require('../../../lib/rules/prefer-separate-component-file');
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

ruleTester.run('prefer-separate-component-file', rule, {
  valid: [
    ...codeSamples,
    ` import Component from './component';
      withGlobal(mapStateToProps, mapDispatchToProps)(Component)`,
    `const Component = require('./component')
     withGlobal(mapStateToProps, mapDispatchToProps)(Component)`,
    `import {Component} from './component';
       withGlobal(mapStateToProps, mapDispatchToProps)(Component)`,
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
