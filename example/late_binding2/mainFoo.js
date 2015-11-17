// Note: importing the default object: no braces.
import foo from './library.foo';

function main() {
  console.log(foo.a.name());
  console.log(foo.b.name());
  console.log(foo.c.name());
}

main();