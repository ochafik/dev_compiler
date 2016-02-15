We want DDC to generate idiomatic ES6+ code that behaves well in a variety of use-case / tooling setups.

Here are some tools which we might like to be able to consume DDC's output:

| Tool | Modules | Module Cycles | Type System |
| ---- | ------- | ------------- | ----------- |
| [node.js](http://nodejs.org) | node ([es6](https://github.com/ModuleLoader/es6-module-loader) with polyfill) | yes | n/a |
| [Rollup.js](rollupjs.org) | es6 | yes | n/a |
| [Babel](https://babeljs.io) | node, es6 | ? | Flow |
| [Closure Compiler](https://developers.google.com/closure/compiler/) | closure, es6 | no | Closure |
| Closure+ES6_TYPED | es6 | no | TypeScript |
| [Flow](https://flowtype.org) | es6 | yes | Flow |
| [TypeScript](httphttps://babeljs.io://typescriptlang.org) | TS, es6 | yes? | TypeScript |

Notes:
- DDC has experimental support for node.js (see [example](https://github.com/dart-lang/dev_compiler/blob/master/tool/node_test.sh))
- Rollup supports DDC's es6 output as of version 0.25.4 (see https://github.com/rollup/rollup/pull/506)
- DDC can emit experimental TypeScript types with the `--closure` flag.
- Closure Compiler support is tracked as https://github.com/dart-lang/dev_compiler/issues/312 (simple) and https://github.com/dart-lang/dev_compiler/issues/311 (advanced)

# Module formats

We currently support the following module formats
- Custom Dart modules (_default_, with `--modules=legacy`)
- [node.js modules](https://nodejs.org/api/modules.html) (with `--modules=node`)
- [ES6 modules](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) (experimental, with `--modules=es6`)

We hope to be able to default to ES6 modules when Chrome and node.js support them.

# Types

JavaScript does not currently support static types, but there are a few vendor-specific language extensions allow static type checks  and/or perform type-based optimizations.

| Type System | Generics | Type Syntax | primitive nullable | Object nullable | `?nullable` | `!notNullable` |
| ----------- | -------- | ----------- | ------------------ | --------------- | ----------- | -------------- |
| [Dart](https://www.dartlang.org/docs/spec/) | covariant | Dart | yes | yes | `no(*)` | `no(*)` |
| [Flow](http://flowtype.org/docs/type-annotations.html#_) | ? | TS / comment | non-nullable | non-nullable | [yes](http://flowtype.org/docs/nullable-types.html) | no |
| [TypeScript](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md) | bivariant | TS | nullable | nullable | no | no |
| [Closure](https://developers.google.com/closure/compiler/docs/js-for-compiler) | invariant | comment | non-nullable | nullable | yes | yes |
| [V8's SoundScript](https://developers.google.com/v8/experiments) | ? | TS | ? | ? | ? | ? |

Notes:
- _Type Syntax: TS_ means TypeScript / ActionScript 3 / Scala-like syntax for types:

  ```typescript
    function foo<T>(x: T): void {}
    type SomeCallbackType = (x: Object) => number;
  ```

- `(*)`: Dart will soon support nullable types, although that might be a breaking language change.
- Closure supports a TypeScript-like syntax with `--language_in=ES6_TYPED`, but it still warns about assigning nullable values to primitives.
- There are more differences between these type-systems (intersection types, interface types...) but the ones highlighted above seem the most relevant to Dart -> JS compilation.
- Nullability:

  - `?nullable` means any type `t` can be made nullable as `?t`.
  - `!nullable` means any type `t` can be made non-nullable as `!t`.
  - In TypeScript, the `Null` type is a subtype of all types.

- Generics 101:

  - _bivariant_ means `List<number>` variables accept both `Iterable<number>` and `List<int>` values.
  - _covariant_ means `List<number>` variables accept `List<int>` values but not `Iterable<number>`.
  - _contravariant_ means `List<number>` variables accept `Iterable<number>` values but not `List<int>`.
  - _invariant_ means `List<number>` vars only accept `List<number>` values.