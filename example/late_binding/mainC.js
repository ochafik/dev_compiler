import {C, bind$C} from './class.C';

function main() {
  bind$C();
  console.log(new C().makeA().name());
  console.log(new C().makeB().name());
}

main();