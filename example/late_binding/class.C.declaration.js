import {B} from './class.B.declaration';
// Actually, could just import A directly since it's B's direct parent.
export var imports = {};

export class C extends B {
  name() { return 'C'; }
  makeA() { return new imports.A(); }
  makeB() { return new B(); }
}
