'use strict';

const noUnusedPropTypesReact = require('eslint-plugin-react').rules['no-unused-prop-types'];
const filterReports = require('../filterReports');
const isTeactnWithGlobal = require('../isTeactnWithGlobal');

const belongsToTeactN = (node, objectName, destrArg) => {
  const checkProp = (thirdArgument) => {
    const thirdArgumentName = thirdArgument && thirdArgument.type === 'Identifier' && thirdArgument.name;
    return (thirdArgumentName === objectName // ownProps.myProp
      || destrArg === thirdArgument // {myProp} in fn argument
      || (destrArg && destrArg.parent.type === 'VariableDeclarator'
        && destrArg.parent.init && destrArg.parent.init.name === thirdArgumentName
      ) // const {myProp} = ownProps;
    );
  };
  let isTeactN = false;
  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((decl) => {
      const name = decl.id && decl.id.name;
      if (name === 'mapStateToProps' || name === 'mapReducersToProps') {
        const thirdArgument = decl.init.params && decl.init.params[2];
        if (checkProp(thirdArgument)) {
          isTeactN = true;
        }
      }
    });
  } else if (node.type === 'FunctionDeclaration') {
    const name = node.id && node.id.name;
    if (name === 'mapStateToProps' || name === 'mapReducersToProps') {
      const thirdArgument = node.params && node.params[2];
      if (checkProp(thirdArgument)) {
        isTeactN = true;
      }
    }
  } else if (node.type === 'CallExpression') {
    if (isTeactnWithGlobal(node)) {
      const check = (mapToProps) => {
        if (mapToProps && mapToProps.body) {
          const thirdArgument = mapToProps.params && mapToProps.params[2];
          if (checkProp(thirdArgument)) {
            isTeactN = true;
          }
        }
      };
      const mapStateToProps = node.arguments && node.arguments[0];
      const mapReducersToProps = node.arguments && node.arguments[1];
      if (mapStateToProps) check(mapStateToProps);
      if (mapReducersToProps) check(mapReducersToProps);
    }
  }
  return isTeactN;
};

const propsUsedInTeactN = function (context) {
  return {
    MemberExpression(node) {
      const nodeName = node.object.name;
      const usedInTeactN = context.getAncestors()
        .some((ancestor) => belongsToTeactN(ancestor, nodeName));
      if (usedInTeactN) {
        context.report(node, `exclude:${node.property.name}`);
      }
    },
    ObjectPattern(node) {
      const usedInTeactN = context.getAncestors()
        .some((ancestor) => belongsToTeactN(ancestor, null, node));
      if (usedInTeactN) {
        node.properties.forEach((prop) => {
          if (prop.type === 'Property' && prop.key && prop.key.name) {
            return context.report(node, `exclude:${prop.key.name}`);
          } if (prop.type === 'ExperimentalRestProperty' && prop.argument && prop.argument.name) {
            return context.report(node, `exclude:${prop.argument.name}`);
          }
          return undefined;
        });
      }
    },
  };
};

const getPropNameFromReactRuleMessage = (message) => message
  .replace(' PropType is defined but prop is never used', '')
  .replace("'", '')
  .replace("'", '');
const getPropNameFromTeactNRuleMessage = (message) => message.replace('exclude:', '');

module.exports = filterReports([
  propsUsedInTeactN,
  noUnusedPropTypesReact,
], getPropNameFromReactRuleMessage, getPropNameFromTeactNRuleMessage);
