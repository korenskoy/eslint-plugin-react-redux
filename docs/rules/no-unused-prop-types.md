#  Extension of a react's no-unused-prop-types rule filtering out false positive used in teactn context. (teactn/no-unused-prop-types)

[react/no-unused-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md)

# Rule details

 This rule fixes some of the false positive reported by the react rule

 In below example `react/no-unused-prop-types` would report  `myProp PropType is defined but prop is never used` while `teactn/no-unused-prop-types` would correctly detect the usage of this prop within  `mapStateToProps`.

 ```js
  export const mapStateToProps = (global, ownProps) => ({
    myData: getMyData(global, ownProps.myProp),
  });

  export class MyComponent extends Component {
    render() {
      return <div>{this.props.myData}</div>;
    }
  }

  MyComponent.propTypes = {
    myProp: PropTypes.string.isRequired
  };

  export default withGlobal(mapStateToProps)(MyComponent);
 ```

 # Implementation details and Limitations

 The rule actually runs `react/no-unused-prop-types` rule and then filters out the reports of props that are used within teactn's `mapStateToProps` or `mapReducersToProps`.
 The rule only works within a context of a single file. So it would only work properly if compoent and container (react connect fucntion) are defined within the same file.

 # Configuration

 You'd want to disable `react/no-unused-prop-types` if you using this rule.
