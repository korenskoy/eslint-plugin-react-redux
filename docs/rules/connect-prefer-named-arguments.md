#  Enforces that all connect arguments have recommended names. (teactn/connect-prefer-named-arguments)

teactn connect function has 2 optional arguments:
* mapStateToProps
* mapDispatchToProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following patterns are considered incorrect:

```js
withGlobal(mapStateToProps, actionCreators)(TodoApp)
```

```js
withGlobal(state => state)(TodoApp)
```

The following patterns are considered correct:

```js
withGlobal(mapStateToProps, mapDispatchToProps)(TodoApp)
```

```js
withGlobal()(TodoApp)
```
