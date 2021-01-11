#  Enforces that all useSelector hooks use named selector functions. (teactn/useSelector-prefer-selectors)

Using selectors in `useSelector` to pull data from the store or [compute derived data](https://redux.js.org/recipes/computing-derived-data#composing-selectors) allows you to decouple your containers from the state architecture and more easily enable memoization. This rule will ensure that every hook utilizes a named selector.

## Rule details

The following pattern is considered incorrect:

```js
const property = useSelector((global) => global.property)
const property = useSelector(function (global) { return global.property })
```

The following patterns are considered correct:

```js
const selector = (global) => global.property

function Component() {
  const property = useSelector(selector)
  // ...
}
```

## Rule Options

```js
...
"teactn/useSelector-prefer-selectors": [<enabled>, {
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
        "teactn/useSelector-prefer-selectors": ["error", { matching: "^.*Selector$"}]
    }

    // container.js
    const propertyA = useSelector(aSelector) // success
    const propertyB = useSelector(selectB) // failure
```

```js
    // .eslintrc
    {
        "teactn/mapStateToProps-prefer-selectors": ["error", { matching: "^get.*FromState$"}]
    }

    // container.js
    const propertyA = useSelector(getAFromState) // success
    const propertyB = useSelector(getB) // failure
```
