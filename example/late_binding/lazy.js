export function initializer(f) {
  var done = false;
  return function() {
    if (done) return;
    done = true;
    f();
  };
}