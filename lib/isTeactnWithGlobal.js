module.exports = function (node) {
  return (
    node.callee.name === 'withGlobal'
  );
};
