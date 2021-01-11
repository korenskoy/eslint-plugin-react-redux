#  Enforces that all connected components are defined in a separate file (teactn/prefer-separate-component-file)

And imports it to the container.

## Rule details

The following pattern is considered incorrect:

```js
const Component = () => {};
withGlobal(mapStateToProps, null)(Component)
```

The following patterns are considered correct:

```js
import Component from './component';
withGlobal(mapStateToProps, mapReducersToProps)(Component)
```

```js
const Component = require('./component')
withGlobal(mapStateToProps, mapReducersToProps)(Component)
```
