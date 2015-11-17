Docs:
- [Import syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

General rules:

- Each class `C` is in its own file `class.C.js` (if it was defined in `path/to/mylib.dart`, it is compiled to `path/to/mylib/class.C.js`)
  - It only imports its super class and mixins, and exports an `imports` map that will be used for late bindings.
    - Any reference to any class other than its super class(es) will be qualified from that `imports` object.
- Library exports a default class with static getters. Some return classes (after binding them with their expected `imports`), other return top-level values.

- Outside the library, ES6 imports should always be without curly braces, so as to exercice the getters:

  ```javascript
  import foo from './library.foo';
  new foo.Bar(); // Calls the Bar getter.
  ```
