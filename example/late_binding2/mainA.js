import foo from './library.foo';

export function main() {
  console.log(new foo.A().makeB().name());
  console.log(new foo.A().makeB().makeC().name());
  console.log(new foo.A().makeC().name());
  console.log(new foo.A().makeC().makeB().name());
}

main();