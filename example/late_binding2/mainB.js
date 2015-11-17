import foo from './library.foo';

export function main() {
  console.log(new foo.B().makeA().name());
  console.log(new foo.B().makeA().makeC().name());
  console.log(new foo.B().makeC().name());
  console.log(new foo.B().makeC().makeA().name());
}

main();