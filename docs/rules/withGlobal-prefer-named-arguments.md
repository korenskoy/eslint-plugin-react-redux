#  Enforces that all withGlobal arguments have recommended names. (teactn/withGlobal-prefer-named-arguments)

teactn withGlobal function has 2 optional arguments:
* mapStateToProps
* mapReducersToProps

This rule enforces that all of the provided parameters should follow the above naming conventions.

## Rule details

The following patterns are considered incorrect:

```js
withGlobal(mapStateToProps, actionCreators)(TodoApp)
```

```js
withGlobal(global => global)(TodoApp)
```

The following patterns are considered correct:

```js
withGlobal(mapStateToProps, mapReducersToProps)(TodoApp)
```

```js
withGlobal()(TodoApp)
```
