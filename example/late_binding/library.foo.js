import {C, bind$C} from './class.C';
import {B, bind$B} from './class.B';
import {A, bind$A} from './class.A';

var a_, b_, c_;

export default class foo {
  static get a() {
    if (a_ === void 0) {
      bind$A();
      a_ = new A();
    }
    return a_;
  }
  static get b() {
    if (b_ === void 0) {
      bind$B();
      b_ = new B();
    }
    return b_;
  }
  static get c() {
    if (c_ === void 0) {
      bind$C();
      c_ = new C();
    }
    return c_;
  }
}