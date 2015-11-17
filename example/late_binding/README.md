Docs:
- [Import syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

General rules:

- Each class `C` is in its own file `class.C.declaration.js` (if it was defined in `path/to/mylib.dart`, it is compiled to `path/to/mylib/class.C.js`)
  - It only imports its super class and mixins, and exports an `imports` map that will be used for late bindings.
    - Any reference to any class other than its super class(es) will be qualified from that `imports` object.
  - It has a binding companion file `class.C.js`, which defines an idempotent `bind$C` function that fills in `imports` with the bindings, and re-exports the `C` declaration.
    - `bind$C` must be called before any static operation on `C` (instantiation, static reference, (passing type literal around?))

- All other top-levels from a library `foo` end up in a `library.foo.js` file, which exports a default class with static getters.
- Each block of code must start by calling the class initializers of:
  - Any instantiated class,
  - Any class on which a static getter / setter / method was called.
- Imports:
  - Of a library: there's only one file anyway
  - Of a class: if it's the super class of the class being defined, import from './class.Foo', otherwise from './class.Foo.soft'

  import {Foo, Foo$bind} from './class.Foo';
  import {Bar, Bar$bind} from './class.Bar';

  function foo() {
    Foo$bind();
    return new Foo();
  }
  function bar() {
    Bar$bind();
    return Bar.baz();
  }