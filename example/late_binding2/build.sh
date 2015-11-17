#!/bin/bash
#
set -eu

cd $(dirname $0)
[[ -d build ]] || mkdir build

declare -a mains
mains=(
  mainFoo
  mainA
  mainB
  mainC
)
for main in "${mains[@]}" ; do

  # echo "Compiling $main"
    # -O SIMPLE \
    # --formatting=pretty_print \
  out=build/$main.closure.js
  java -jar ~/github/closure-compiler/build/compiler.jar \
    --language_in=ES6 \
    --language_out=ES5 \
    -O ADVANCED \
    class.C.js \
    class.B.js \
    class.A.js \
    library.foo.js \
    $main.js \
    "$@"  > $out
  
  echo "$out: `cat $out | wc -c` bytes, `cat $out | gzip -9 | wc -c` bytes gzipped"
  node --harmony $out

done