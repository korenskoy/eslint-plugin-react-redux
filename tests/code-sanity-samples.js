module.exports = [
  'expect(() => useSelector()).toThrow();',
  `const rows = [];
      function mapStateToProps(global, sharedGlobal, ownProps, detachWhenChanged) {
        for (const { value } of rows) {
        }
      }
  `,
  `const mapStateToProps = () => {
    return;
  };`,
];
