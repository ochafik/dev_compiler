library foo;

class A {
  static makeA() => new A();
  makeB() => new B();
  makeC() => new C();
}

class B extends A {
  makeC() => new C();
}

class C extends B {}

var a = new A();
var b = new B();
var c = new C();
