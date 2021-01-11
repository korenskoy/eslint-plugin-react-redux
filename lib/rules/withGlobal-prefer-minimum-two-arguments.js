const isTeactnWithGlobal = require('../isTeactnWithGlobal');

const report = function (context, node) {
  context.report({
    message: 'withGlobal function should have at least 2 arguments.',
    node,
  });
};

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isTeactnWithGlobal(node)) {
        if (node.arguments.length < 2) {
          report(context, node);
        }
      }
    },
  };
};
