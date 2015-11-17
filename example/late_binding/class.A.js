import {initializer} from './lazy';

export {A} from './class.A.declaration';
import {imports} from './class.A.declaration';
import {B} from './class.B.declaration';
import {C} from './class.C.declaration';

export var bind$A = initializer(function() {
  imports.B = B;
  imports.C = C;
});
