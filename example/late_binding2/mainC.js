import foo from './library.foo';

function main() {
  console.log(new foo.C().makeA().name());
  console.log(new foo.C().makeA().makeB().name());
  console.log(new foo.C().makeB().name());
  console.log(new foo.C().makeB().makeA().name());
}

main();