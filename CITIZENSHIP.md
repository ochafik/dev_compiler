We want DDC to generate idiomatic ES6+ code that behaves well in a variety of use-case / tooling setups.

# JS Tools

Here are some tools / environments we may want to interface with:
- [node.js](http://nodejs.org)
- [Babel](https://babeljs.io)
- [Closure Compiler](https://developers.google.com/closure/compiler/)
- [Flow](https://flowtype.org)
- [TypeScript](httphttps://babeljs.io://typescriptlang.org)
- [Rollup.js](rollupjs.org)

# Module formats

We currently support the following module formats
- node.js (with `--modules=node`)
- ES6 modules (experimental, with `--modules=es6`)
- Custom Dart modules (default, with `--modules=legacy`)

We hope to be able to default to ES6 modules when browsers (and node.js) support them.

# Types

JavaScript does not currently support static types, but there are a few vendor-specific language extensions that bring static type checks to help validate the code and/or perform type-based optimizations.

## Type syntax

The JS ecosystem is split between the following main type syntaxes:
- No types (ES6, V8)
- Types in comments (Closure, Flow)
- Types in the syntax (Flow, TypeScript, Closure ES6_TYPED, upcoming [V8's SoundScript](https://developers.google.com/v8/experiments))
- Tolerance to types in the syntax (TypeScript)

## Type semantics

### Nullability

There are the differences between the major systems:
- Closure knows nullable & non-nullable types, with primitives non-nullable by default and Object types nullable by default. Any type `t` can be made nullable with `?t` and non-nullable with `!t`.
- Flow knows nullable types: any type `t` can be made nullable with `?t`. All types are non-nullable by default.
- TypeScript does not care about nullability: the `Null` type is a subtype of all types.
- Closure ES6_TYPED does not support type nullability (matches TypeScript syntax in which it cannot be expressed), warns about `null` passed to primitive args.

### Generics

- TypeScript supports "bi-variant" generics, i.e. `List<number>` accepts both `Iterable<number>` and `List<int>`.
- Closure provides "invariant" generics
- TODO(ochafik): describe other systems + Dart.
