import foo from './library.foo';

export function main() {
  console.log(new foo.B().makeA().name());
  console.log(new foo.B().makeC().name());
}

main();