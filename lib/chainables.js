const isIterable = require("./isiterable");
const { iterate, safeIterate } = require("./base-iterators");
const identity = x => x;
const isEqual = (a, b) => a === b;

/**
 * Takes values from the supplied Iterable and yields Arrays of length n. If the Iterable object is finite,
 * the last chunk yielded will contain as many items as possible.
 *
 * @param {Iterable} it Any iterable object
 * @param {number} n An integer indicating the maximum size of the Arrays to be yielded.
 */
function* chunk(it, n = 1) {
	try {
		let safeIt = safeIterate(it);
		while (true) {
			let next = [...take(safeIt, n)];
			if (!next.length) return;
			yield next;
		}
	} finally {
		it.return();
	}
}

/**
 * Takes values from the supplied Iterable and yields only truthy values. The falsey values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` will be excluded.
 *
 * @param {Iterable} it Any iterable object
 */
function* compact(it) {
	yield* filter(it, identity);
}

/**
 * Takes any number of parameters and sequentially yields all values from them. If the given object is
 * Iterable, all values from that will be yielded individually. Otherwise, the value will be yielded
 * directly.
 *
 * @param {...(Iterable|*)} them Any objects or values
 */
function* concat(...them) {
	for (let it of them) {
		if (isIterable(it)) {
			yield* it;
		} else {
			yield it;
		}
	}
}

/**
 * Exclude any items from the given Iterable that are also present in the provided values. Any Iterable
 * passed to the values parameter must yield a finite sequence to avoid an infinite loop.
 *
 * @param {Iterable} it Any iterable object
 * @param {Iterable} values One or more arrays or finitely iterable objects containing the set of values
 *         to be excluded by the generator.
 */
function* difference(it, ...values) {
	values = [...flatten(values, 1)];
	for (let value of it) {
		if (!values.includes(value)) {
			yield value;
		}
	}
}

/**
 * Exclude any items from the given Iterable that are also present in the provided values, where each value
 * is mapped using the supplied map function prior to comparing. Any Iterable passed to the values parameter
 * must yield a finite sequence to avoid an infinite loop.
 *
 * @param {Iterable} it Any iterable object
 * @param {Iterable} values An array or finitely iterable object containing the set of values
 *         to be excluded by the generator.
 * @param mapFn
 */
function* differenceBy(it, values, mapFn = identity) {
	values = Array.from(values, mapFn);

	for (let value of it) {
		if (!values.includes(mapFn(value))) {
			yield value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param values
 * @param comparator
 */
function* differenceWith(it, values, comparator = isEqual) {
	values = [...values];

	for (let value of it) {
		if (!values.some(otherValue => comparator(value, otherValue))) {
			yield value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param comparator
 */
function* dedupe(it, comparator = isEqual) {
	let prev;
	let firstValue = true;

	for (let value of it) {
		if (firstValue || !comparator(value, prev)) {
			prev = value;
			yield value;
		}
		firstValue = false;
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
function* drop(it, n = 1) {
	void [...take(safeIterate(it), n)]; // Safely iterate to prevent take() from finishing the iterator
	yield* it;
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
function* dropUntil(it, predicate = identity) {
	let cleanup = true;
	try {
		for (let value of safeIterate(it)) {
			// Safely iterate to prevent for..of from finishing the iterator
			if (predicate(value)) {
				yield value;
				break;
			}
		}
		cleanup = false; // Going to yield next value, no early return
	} finally {
		// If this iterator returned early, call return on the wrapped iterator
		if (cleanup) {
			it.return();
		}
	}
	yield* it;
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
function* dropWhile(it, predicate = identity) {
	let cleanup = true;
	try {
		for (let value of safeIterate(it)) {
			// Safely iterate to prevent for..of from finishing the iterator
			if (!predicate(value)) {
				yield value;
				break;
			}
		}
		cleanup = false; // Going to yield next value, no early return
	} finally {
		// If this iterator returned early, call return on the wrapped iterator
		if (cleanup) {
			it.return();
		}
	}
	yield* it;
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 * @param takeFirst
 */
function* everyNth(it, n, takeFirst = false) {
	let i = +!takeFirst;

	for (let value of it) {
		if (i++ % n === 0) {
			yield value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
function* filter(it, predicate = identity) {
	let i = 0;
	for (let value of it) {
		if (predicate(value, i++)) {
			yield value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param maxDepth
 */
function* flatten(it, maxDepth = Infinity) {
	maxDepth = +maxDepth || 0;

	for (let value of it) {
		if (maxDepth > 0 && typeof value !== "string" && isIterable(value)) {
			yield* flatten(value, maxDepth - 1);
		} else {
			yield value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param fn
 */
function* forEach(it, fn = identity) {
	let index = 0;
	for (let value of it) {
		fn(value, index++);
		yield value;
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 */
function* fuzz(it) {
	for (let value of it) {
		let n = !(value % 3) ? "Fizz" : "";
		n += !(value % 5) ? "Buzz" : "";
		yield n || value;
	}
}

/**
 *
 * @param them
 */
function* interlace(...them) {
	let iterators = them.map(iterate);

	while (true) {
		for (iterator of iterators) {
			let next = iterator.next();
			if (next.done) return;
			yield next.value;
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param generatorFn
 * @param args
 */
function* link(it, generatorFn, ...args) {
	yield* generatorFn(it, ...args);
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param mapFn
 */
function* map(it, mapFn) {
	for (let value of it) {
		yield mapFn(value);
	}
}

/**
 * For dividends generted by `it`, yields the value mod `n` based on Euclidian division.
 * The result is always positive
 *
 * @param  {Iterable}    it An iterable sequence of numbers to be used as the dividend
 * @param  {Number}    n  The divisor
 * @return {Generator}
 */
function* modulo(it, n) {
	for (let value of it) {
		yield (value % n + Math.abs(n)) % n;
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param prop
 */
function* pluck(it, prop) {
	for (let value of it) {
		yield value[prop];
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
function* take(it, n = 1) {
	let count = 0;
	if (n <= 0) return;

	for (let value of it) {
		yield value;
		if (++count >= n) return;
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
function* takeUntil(it, predicate = identity) {
	for (let value of it) {
		yield value;
		if (predicate(value)) return;
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 * @returns {*}
 */
function* takeWhile(it, predicate = identity) {
	for (let value of it) {
		if (!predicate(value)) return value;
		yield value;
	}
}
/**
 *
 * @param them
 */
function* zip(...them) {
	if (!!them.length) {
		let iterators = them.map(iterate);
		while (true) {
			let values = iterators.map(iterator => iterator.next());
			if (values.some(value => value.done)) return;
			yield values.map(value => value.value);
		}
	}
}

/**
 *
 * @param {Iterable} it Any iterable object
 */
function* unzip(it) {
	yield* zip(...it);
}

module.exports = {
	chunk,
	compact,
	concat,
	dedupe,
	difference,
	differenceBy,
	differenceWith,
	drop,
	dropUntil,
	dropWhile,
	everyNth,
	filter,
	flatten,
	forEach,
	fuzz,
	interlace,
	link,
	map,
	modulo,
	take,
	takeUntil,
	takeWhile,
	zip,
	unzip
};

/*
 * Potential aliases
 * limit: take,
 * skip: drop,
 * skipUntil: dropUntil,
 * skipWhile: dropWhile,
 */
