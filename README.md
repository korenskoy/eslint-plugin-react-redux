# eslint-plugin-teactn

Enforcing best practices for teactn

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-teactn`:

```
$ npm install eslint-plugin-teactn --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-teactn` globally.

## Usage

Add `teactn` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "teactn"
    ],
    "extends": [
        "plugin:teactn/recommended"
    ]
}
```


To configure individual rules:

```json
{
    "rules": {
        "teactn/connect-prefer-named-arguments": 2
    }
}
```

## Supported Rules

* [teactn/connect-prefer-minimum-two-arguments](docs/rules/connect-prefer-minimum-two-arguments.md) Enforces that connect function has at least 2 arguments.
* [teactn/connect-prefer-named-arguments](docs/rules/connect-prefer-named-arguments.md) Enforces that all connect arguments have recommended names.
* [teactn/mapDispatchToProps-returns-object](docs/rules/mapDispatchToProps-returns-object.md) Enforces that mapDispatchToProps returns an object.
* [teactn/mapDispatchToProps-prefer-shorthand](docs/rules/mapDispatchToProps-prefer-shorthand.md)  Enforces that all mapDispatchToProps use a shorthand method to wrap actions in dispatch calls whenever possible.
* [teactn/mapDispatchToProps-prefer-parameters-names](docs/rules/mapDispatchToProps-prefer-parameters-names.md)  Enforces that all mapDispatchToProps parameters have specific names.
* [teactn/mapStateToProps-no-store](docs/rules/mapStateToProps-no-store.md) Prohibits binding a whole store object to a component.
* [teactn/mapStateToProps-prefer-hoisted](docs/rules/mapStateToProps-prefer-hoisted.md) Flags generation of copies of same-by-value but different-by-reference props.
* [teactn/mapStateToProps-prefer-parameters-names](docs/rules/mapStateToProps-prefer-parameters-names.md) Enforces that all mapStateToProps parameters have specific names.
* [teactn/mapStateToProps-prefer-selectors](docs/rules/mapStateToProps-prefer-selectors.md) Enforces that all mapStateToProps properties use selector functions.
* [teactn/useSelector-prefer-selectors](docs/rules/useSelector-prefer-selectors.md) Enforces that all useSelector properties use selector functions.
* [teactn/no-unused-prop-types](docs/rules/no-unused-prop-types.md) Extension of a react's no-unused-prop-types rule filtering out false positive used in redux context.
* [teactn/prefer-separate-component-file](docs/rules/prefer-separate-component-file.md) Enforces that all connected components are defined in a separate file.
