#  Enforces that withGlobal function is provided with at least 2 arguments. (teactn/withGlobal-prefer-minimum-two-arguments)

teactn mapStateToProps

> If you do not supply your own mapReducersToProps function or object full of action creators, the default mapReducersToProps implementation just injects dispatch into your component’s props.

This rule enforces that the second argument is provided explicitly.

## Rule details

The following pattern is considered incorrect:

```js
withGlobal(mapStateToProps)(Component)
```

The following pattern are considered correct:

```js
withGlobal(mapStateToProps, mapReducersToProps)(Component)
```
