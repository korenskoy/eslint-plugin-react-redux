require('babel-eslint');

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/mapStateToProps-no-store');
const codeSamples = require('../../code-sanity-samples');
const parserOptions = require('../../parser-options');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('mapStateToProps-no-store', rule, {
  valid: [
    ...codeSamples,
    ` const mapStateToProps = state => ({
       ...getSomeStateFromASelector(state),
       showDefaultHeader: showDefaultHeader(state),
      });
    `,
    ` const mapStateToProps = state => ({
        aField: getSomeStateFromASelector(state),
      });
    `,
    'export default function observeStore(store) {return store;}',
    'export default withGlobal(() => {})(Alert)',
    'export default withGlobal(() => {})(Alert)',
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
    `function mapStateToProps(state) {
      return {};
    }`,
    `const mapStateToProps = function(state) {
      return state.isActive;
    }`,
    'const mapStateToProps = (state, sharedGlobal, ownProps) => {}',
    'const mapStateToProps = (state) => {isActive: state.isActive}',
    `const mapStateToProps = (state, sharedGlobal, ownProps) => {};
      withGlobal(mapStateToProps, null)(Alert);`,
    `const mapStateToProps = ({ header }) => ({
      isLoggedIn: header.user && header.user.isLoggedIn,
    }); `,
    'const mapStateToProps = ({header}, sharedGlobal, ownProps) => {header};',
    'withGlobal(({header}, sharedGlobal, ownProps, detachWhenChanged) => {header})(App);',
    'withGlobal(({header}, sharedGlobal, {ownProp1}) => {header, ownProp1})(App);',
  ],
  invalid: [{
    code: 'const mapStateToProps = (state) => state',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `const mapStateToProps = state => {
            return {state: state}
          }`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `function mapStateToProps(state) {
      return state;
    }`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `export default withGlobal(
        (state) => {
            return {
                state: state
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
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: 'withGlobal((state) => state, null)(App)',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: `const mapStateToProps = (state, sharedGlobal, ownProps) => state;
      withGlobal(mapStateToProps, null)(Alert);`,
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: 'const mapStateToProps = state => ({...state});',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }, {
    code: 'withGlobal((state) => ({...state}), null)(App)',
    errors: [
      {
        message: 'mapStateToProps should not return complete store object',
      },
    ],
  }],
});
