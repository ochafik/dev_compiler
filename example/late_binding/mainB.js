import {B, bind$B} from './class.B';

function main() {
  bind$B();
  console.log(new B().makeA().name());
  console.log(new B().makeC().name());
}

main();