#  Enforces that all mapStateToProps parameters have specific names. (teactn/mapStateToProps-prefer-parameters-names)

teactn mapStateToProps function has 2 optional arguments:
* global
* ownProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following pattern is considered incorrect:

```js
const mapStateToProps = (anyOtherName) => {}
```

```js
withGlobal(function(anyOtherName) {}, null)(App)
```

The following patterns are considered correct:

```js
const mapStateToProps = (global, ownProps) => {}
```

```js
const mapStateToProps = (global) => {}
```

```js
const mapStateToProps = ({isActive}) => {isActive}
```

```js
withGlobal((global) => global, null)(App)
```
