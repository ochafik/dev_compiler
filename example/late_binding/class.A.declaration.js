export var imports = {};

export class A {
  name() { return 'A'; }
  static makeA() { return new A() };
  makeB() { return new imports.B(); }
  makeC() { return new imports.C(); }
}