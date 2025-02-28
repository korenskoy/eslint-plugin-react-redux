#  Enforces that mapStateToProps does not bind complete store to a component. (teactn/mapStateToProps-no-store)

Passing whole global state to a component is a bad practice, triggering unnecessary re-renders. Additionally bad is passing around a mutable object that your component critically depends on preventing mutations to.
Instead one should specify the properties actually used by a component.

## Rule details

The following patterns are considered incorrect:

```js
const mapStateToProps = (global) => global
```

```js
const mapStateToProps = global => {
        return {global: global}
      }
```

```js
const mapStateToProps = global => ({...global});
```

```js
withGlobal((global) => global, null)(App)
```

The following patterns are correct:

```js
const mapStateToProps = () => {}
```

```js
const mapStateToProps = (global) => {isActive: global.isActive}
```

```js
const mapStateToProps = ({isActive}) => {isActive}
```

```js
withGlobal((global) => ({isActive: global.isActive}), null)(App)
```

## Not supported use cases.

Please note that the following use case, although common, is not supported due to the nature of static code analysis.

The following would not warn:

```js
const getProps = (global) => global;
const mapStateToProps = (global) => getProps(global);
```
