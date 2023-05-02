Generator Utilities
====

A utility library for generating and processing sequences based on ES6 generators.

## Usage

Install the package in your project

```sh
npm install --save generator-utilities
```

Use `require` or `import` to use the generator functions you need.

```js
import { iterate, range } from "generator-utilities";
```

Or

```js
const { iterate, range } = require("generator-utilities");
```

Alternatively, if you use the default import, you can take advantage of the chainable iterator functionality.

```js
import { default as chain } from "generator-utilities";
```

Or

```js
const chain = require("generator-utilities").default;
```

See below for explanation of how chaining works.

## Purpose

This contains many generator functions for a range of utilities that are primarily divided into two categories: sequence generators and chainable generators. The sequence generators will take their input, if any, and use it to produce a sequence of values. The chainable generators take as input an iterable object and other parameters and yield (possibly modified) values until either some condition has been met, or the source iterator stops yielding values.

For example, the `range` generator yields a sequence of values between a start and end value.

```js
for (value of range(-10, 11)) {
    console.log(value);
}
```

This will log the integers from -10 up to but not including 11. i.e. -10, -9, -8, ..., 8, 9, 10.

The `take` generator is a chainable generator that takes as input an iterable object, such as another generator or an Array, and yields the specified number of values. The counter sequence generator in this example will yield an infinite series of values from 0.

```js
[...take(counter(), 10)]; // --> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

The reason these are called chainable generators is because they can be used together via the `chain` export.

```
let it = chain.range(1, 10).map(n => n**2);
[...it]; // --> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

The `chain` export provides access to all sequence and chainable generators, and automatically exposes all chainable generators on each iterator returned in the chain.

## Base Iterators

The base iterators simply yield values from a given source object without modifying them in any way.

| Generator | Purpose |
| --------- | ------- |
| `iterate` | Yeilds all values from the given object. Works with iterators, Arrays or Array-like objects.
| `reverse` | Yields values in reverse from the given object. Works with Arrays or Array-like objects.
| `safeIterate` | Like `iterate`, but wraps a given iterator in a way that prevents a call to `return()` from being propagated to the wrapped iterator.

### Illustrating how safeIterate works

e.g. Withinout safeIterate:

```js
let a = counter();
for (let value of a) {
    if (value > 10) break;
}
a.next(); // --> { done: true }
```

With safeIterate:

```js
let b = counter();
for (let value of safeIterate(b)) {
    if (value >= 10) break;
}
b.next(); // --> { value: 11, done: false }
```

> Note: Take care with safeIterate. Use it only where you are sure that you don't want a call to `return()` to be propagated to the wrapped iterator, which ordinarily allows for cleanup procedures to occur when you are finished with it, such as closing open files.

## Sequence Generators

| Generator   | Purpose |
| ----------- | ------- |
| `combination` | Given a finite sequence of values, yields arrays with unique combinations of the specified size.
| `counter` | Yields values starting from the given start value, or 0, incrementing by the specified step.
| `random`    | Yields random integers or floating point numbers, optionally in a given range. |
| `range`       | Yields values from *start* up to but not including *end*, optionally incrementing by the specified step. |
| `repeat`      | Given a generator function or iterable object, yields all values from it and then repeats. |
| `permute`     | Given an Array or Array-like or finitely iterable object, yields arrays with unique permutations of all items. |
| `permutation` | Given an Array or Array-like or finitely iterable object, yields arrays of the specified size, k, with unique permutations of k items. |
| `series`      | Given an initial set of n values and a function, yields values in a series that can be calculated from the n previous values. (see `fibonacci` series). |
| `shuffle`     | Given an array, yields each value  in a random order. |
| `symbols`     | Yields unique Symbol values. |
| `thueMorse`   | Yields binary values in the Thue-Morse sequence. |
| `collatz`     | Given an initial starting value, yields all values in the Collatz sequence until it reaches 1. |
| `fibonacci`   |Generates values in the fibonacci sequence, not exceeding the MAX_SAFE_INTEGER. |
| `fizzBuzz`    | Starting from 1, yields values in the FizzBuzz sequence. |

## Chainable Generators

| Generator | Purpose |
| --------- | ------- |
| `chunk`          | Yields arrays with n values from the given iterator. |
| `compact`        | Removes falsey (`false`, `0`, `NaN`, `""`, `null`, `undefined`) values and yeilds all other values from the given iterator. |
| `concat`         | Yields all values from all given iterators in order |
| `dedupe`         | Removes duplicate values that equal the previously yielded value |
| `difference`     | Yield values that are not included in a given reference array |
| `differenceBy`   | Like `difference`, but maps each value in the given reference array before comparing with values from the generator. |
| `differenceWith` | Yields values that are not included in the given reference array, compared using the given comparison function. |
| `drop`           | Ignore *n* values from the given iterator and yield all subsequent values. |
| `dropUntil`      | Ignore values from the given iterator until a specified condition function returns true, and yield all subsequent values. |
| `dropWhile`      | Ignore values from the given iterator while a given condition function returns true |
| `everyNth`       | Yield every *n*th value from the given iteratable. |
| `filter`         | Yield values from the given iterable that pass a given condition. |
| `flatten`        | Recursively iterate and yield values from nested iterables, up to a specified depth. |
| `forEach`        | Invoke a callback for each value prior to yielding the original value. |
| `fuzz`           | Yield values from the given iterator that have been mapped according to the rules of FizzBuzz. |
| `interlace`      | Alternately yield values from each of the given iterators. |
| `link`           | Link a custom generator function into a chainable sequence. The custom generator function must accept an iterable as its first parameter. |
| `map`            | Invokes a callback with each value from the given iteratable and yields the results. |
| `modulo`         | Yields the value (mod *n*) from the given iterable using Euclidian division. The result is always positive. |
| `pluck`          | Yield values of the specified property from objects yielded by the given iteratable. |
| `take`           | Yield *n* values from the given iterable. |
| `takeUntil`      | Yield values from the given iterable until a given condition returns true. |
| `takeWhile`      | Yield values from the given iterable while a given condition returns true. |
| `unzip`          | Yields arrays ungrouped values from a finite set of groups. |
| `zip`            | Groups values from multiple iterables. |
