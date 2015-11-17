import {initializer} from './lazy';

export {B} from './class.B.declaration';
import {imports} from './class.B.declaration';
import {C} from './class.C.declaration';

export var bind$B = initializer(function() {
  imports.C = C;
});