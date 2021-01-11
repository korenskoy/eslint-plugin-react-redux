#  Enforces that connect function is provided with at least 2 arguments. (teactn/connect-prefer-minimum-two-arguments)

teactn mapStateToProps

> If you do not supply your own mapDispatchToProps function or object full of action creators, the default mapDispatchToProps implementation just injects dispatch into your component’s props.

This rule enforces that the second argument is provided explicitly.

## Rule details

The following pattern is considered incorrect:

```js
withGlobal(mapStateToProps)(Component)
```

The following patterns are considered correct:

```js
withGlobal(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
```

```js
withGlobal(mapStateToProps, mapDispatchToProps)(Component)
```
