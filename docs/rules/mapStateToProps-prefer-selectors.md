#  Enforces that all mapStateToProps properties use selector functions. (teactn/mapStateToProps-prefer-selectors)

Using selectors in `mapStateToProps` to pull data from the store or [compute derived data](https://redux.js.org/recipes/computing-derived-data#composing-selectors) allows you to uncouple your containers from the state architecture and more easily enable memoization. This rule will ensure that every prop utilizes a selector.

## Rule details

The following pattern is considered incorrect:

```js
const mapStateToProps = (global) => { x: global.property }
```

```js
withGlobal(function(global) {
    return {
        y: global.other.property
    }
}, null)(App)
```

The following patterns are considered correct:

```js
const propertySelector = (global) => global.property
const mapStateToProps = (global) => { x: propertySelector(global) }
```

```js
const getOtherProperty = (global) => global.other.property
withGlobal(function(global) {
    return {
        y: getOtherProperty(global)
    }
}, null)(App)
```

## Rule Options

```js
...
"teactn/mapStateToProps-prefer-selectors": [<enabled>, {
  "matching": <string>
  "validateParams": <boolean>
}]
...
```

### `matching`
If provided, validates the name of the selector functions against the RegExp pattern provided.

```js
    // .eslintrc
    {
        "teactn/mapStateToProps-prefer-selectors": ["error", { matching: "^.*Selector$"}]
    }

    // container.js
    const mapStateToProps = (global) => {
        x: xSelector(global), // success
        y: selectY(global), // failure
    }
```

```js
    // .eslintrc
    {
        "teactn/mapStateToProps-prefer-selectors": ["error", { matching: "^get.*FromState$"}]
    }

    // container.js
    const mapStateToProps = (global) => {
        x: getXFromState(global), // success
        y: getY(global), // failure
    }
```

### `validateParams`
Boolean to determine if the selectors use the correct params (`<selectorFunction>(global, ownProps)`, where both params are optional). Defaults to true.

```js
    // .eslintrc
    {
        "teactn/mapStateToProps-prefer-selectors": ["error", { validateParams: true }]
    }

    // container.js
    const mapStateToProps = (global, ownProps) => {
        x: xSelector(global), // success
        y: ySelector(global, ownProps), // sucess
        z: zSelector(), // success
        a: aSelector(ownProps, global), // failure
        b: bSelector(global, someOtherValue) // failure
    }
```
