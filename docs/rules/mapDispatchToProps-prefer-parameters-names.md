#  Enforces that all mapDispatchToProps parameters have specific names. (teactn/mapDispatchToProps-prefer-parameters-names)

teactn mapStateToProps function has 2 optional arguments:
* globalState
* ownProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following pattern is considered incorrect:

```js
const mapDispatchToProps = (anyOtherName) => {}
```

```js
withGlobal((state) => state, (anyOtherName) => {})(App)
```

The following patterns are considered correct:

```js
const mapDispatchToProps = () => {}
```

```js
const mapDispatchToProps = (dispatch, ownProps) => {}
```

```js
const mapDispatchToProps = (dispatch, {prop1, prop2}) => {}
```

```js
const mapDispatchToProps = (dispatch) => {}
```

```js
withGlobal((state) => state, (dispatch, ownProps, moreArgs) => {})(App)
```
