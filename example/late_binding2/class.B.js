import {A} from './class.A';
export var imports = {};

export class B extends A {
  name() { return 'B'; }
  makeA() { return new A(); }
  makeC() { return new imports.C(); }
}