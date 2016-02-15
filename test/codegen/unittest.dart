// Copyright (c) 2015, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// TODO(jmesserly): replace this with the real package:test.
// Not possible yet due to various bugs we still have.
library minitest;

import 'dart:async';
import 'package:dom/dom.dart';
import 'package:matcher/matcher.dart';
export 'package:matcher/matcher.dart';

void group(String name, void body()) => (window as dynamic).suite(name, body);

void test(String name, body(), {String skip}) {
  if (skip != null) {
    print('SKIP $name: $skip');
    return;
  }
  (window as dynamic).test(name, (done) {
    _finishTest(f) {
      if (f is Future) {
        f.then(_finishTest);
      } else {
        done();
      }
    }
    _finishTest(body());
  });
}


// TODO(jmesserly): everything below this was stolen from
// package:test/src/frontend/expect.dart

/// An exception thrown when a test assertion fails.
class TestFailure {
  final String message;

  TestFailure(this.message);

  String toString() => message;
}

/// The type used for functions that can be used to build up error reports
/// upon failures in [expect].
typedef String ErrorFormatter(
    actual, Matcher matcher, String reason, Map matchState, bool verbose);

/// Assert that [actual] matches [matcher].
///
/// This is the main assertion function. [reason] is optional and is typically
/// not supplied, as a reason is generated from [matcher]; if [reason]
/// is included it is appended to the reason generated by the matcher.
///
/// [matcher] can be a value in which case it will be wrapped in an
/// [equals] matcher.
///
/// If the assertion fails a [TestFailure] is thrown.
///
/// In some cases extra diagnostic info can be produced on failure (for
/// example, stack traces on mismatched exceptions). To enable these,
/// [verbose] should be specified as `true`.
void expect(actual, matcher,
    {String reason, bool verbose: false, ErrorFormatter formatter}) {

  matcher = wrapMatcher(matcher);
  var matchState = {};
  try {
    if (matcher.matches(actual, matchState)) return;
  } catch (e, trace) {
    if (reason == null) {
      reason = '${(e is String) ? e : e.toString()} at $trace';
    }
  }
  if (formatter == null) formatter = _defaultFailFormatter;
  fail(formatter(actual, matcher, reason, matchState, verbose));
}

/// Convenience method for throwing a new [TestFailure] with the provided
/// [message].
void fail(String message) => throw new TestFailure(message);

// The default error formatter.
String _defaultFailFormatter(
    actual, Matcher matcher, String reason, Map matchState, bool verbose) {
  var description = new StringDescription();
  description.add('Expected: ').addDescriptionOf(matcher).add('\n');
  description.add('  Actual: ').addDescriptionOf(actual).add('\n');

  var mismatchDescription = new StringDescription();
  matcher.describeMismatch(actual, mismatchDescription, matchState, verbose);

  if (mismatchDescription.length > 0) {
    description.add('   Which: ${mismatchDescription}\n');
  }
  if (reason != null) description.add(reason).add('\n');
  return description.toString();
}
