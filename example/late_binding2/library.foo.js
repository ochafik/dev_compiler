import {A, imports as A$imports} from './class.A';
import {B, imports as B$imports} from './class.B';
import {C, imports as C$imports} from './class.C';

var A$bound, B$bound, C$bound;
var a$value, b$value, c$value;

export default class foo {

  static get A() {
    if (!A$bound) {
      A$bound = true;

      A$imports.B = B;
      A$imports.C = C;
    }
    return A;
  }

  static get B() {
    if (!B$bound) {
      B$bound = true;

      B$imports.C = C;
    }
    return B;
  }

  static get C() {
    if (!C$bound) {
      C$bound = true;

      C$imports.A = A;
    }
    return C;
  }

  static get a() {
    if (a$value === undefined) {
      a$value = new foo.A();
    }
    return a$value;
  }

  static get b() {
    if (b$value === undefined) {
      b$value = new foo.B();
    }
    return b$value;
  }

  static get c() {
    if (c$value === undefined) {
      c$value = new foo.C();
    }
    return c$value;
  }
}