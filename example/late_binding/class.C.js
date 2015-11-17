import {initializer} from './lazy';

export {C} from './class.C.declaration';
import {imports} from './class.C.declaration';
import {A} from './class.A.declaration';

export var bind$C = initializer(function() {
  imports.A = A;
});