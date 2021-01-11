module.exports = [
  'expect(() => useSelector()).toThrow();',
  `const rows = [];
      function mapStateToProps(global, ownProps) {
        for (const { value } of rows) {
        }
      }
  `,
  `const mapStateToProps = () => {
    return;
  };`,
];
