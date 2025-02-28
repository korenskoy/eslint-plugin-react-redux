require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/mapStateToProps-prefer-hoisted');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const errorMessage = 'constant arrays and objects should be initialized outside of mapStateToProps';

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-prefer-hoisted', rule, {
  valid: [
    ...codeSamples,
    `function mapStateToProps(state) {
      return {};
    }`,
    `const mapStateToProps = state => {
      return {
        a : 1
      };
    };`,
    `const mapStateToProps = state => {
      const a = state.a
      return {
        a
      };
    };`,
    `const mapStateToProps = state => ({
      user: state.user,
      list: [1, 2, state.count]
    });
    `,
    `const mapStateToProps = state => {
      return {
        a: 1,
        b: [state.b, 2]
      };
    };
    `,
    `const mapStateToProps = state => {
      const foo = 'hello';
      return {
        a: 1,
        b: [foo, 2]
      };
    };
    `,
    'export default withGlobal(null, null)(Alert)',
    'withGlobal((state) => ({isActive: state.isActive}), null)(App)',
    'withGlobal(null, null)(App)',
    `withGlobal(
          (state) => {
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `withGlobal(function(state){
              return {
                  isActive: state.isActive
              }
          },
          null
        )(App)
    `,
    `const mapStateToProps = function(state) {
      return {
        a: x
      };
    }`,
    'const mapStateToProps = (state, ownProps) => {}',
    'const mapStateToProps = (state) => {set: [1, 2, 3, state.a]}',
    `const mapStateToProps = (state, ownProps) => {};
      withGlobal(mapStateToProps, null)(Alert);`,
    `const mapStateToProps = ({ header }) => ({
      isLoggedIn: header.user && header.user.isLoggedIn,
    }); `,
    'const mapStateToProps = ({header}, ownProps) => {header};',
    'withGlobal(({header}, ownProps) => {header})(App);',
    'withGlobal(({header}, {ownProp1}) => {header, ownProp1})(App);',
    `const mapStateToProps = ({header}, ownProps) => {
      return {
        props: {
          header,
        }
      }
    };`,
    `const createConnectedToolbarItem = (icon, onClick) => {
      const mapStateToProps = { onClick }

      withGlobal(
        null,
        mapStateToProps
      )(createToolbarItem(icon))
    }`,
  ],
  invalid: [{
    code: `const mapStateToProps = (state) => {
      return {
        foo: {
          a: 1
        }
      }
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
            return {
              foo: [1, 2, 3]
            }
          }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {
        a: []
      };
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `export default withGlobal(
        (state) => {
            return {
                a: {
                  z: 1
                }
            }
        },
        (dispatch) => {
            return {
                actions: bindActionCreators(actions, dispatch)
            }
        }
    )(App)`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
      return {
        a: [1, 2, 3],
      };
    };
    `,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {a : {}};
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return {
        aProp: state.aProp,
        aConstProp: [1, 2, 3]
      };
    }`,
    errors: [
      {
        message: errorMessage,
      },
    ],
  },
  ],
});
