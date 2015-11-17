import {A, bind$A} from './class.A';

export function main() {
  bind$A();
  console.log(new A().makeB().name());
  console.log(new A().makeC().name());
}

main();