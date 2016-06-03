let isIterable = require("./isiterable");
let iterate = require("./base-iterators").iterate;
let identity = x => x;
let isEqual = (a, b) => a === b

/**
 * Takes values from the supplied Iterable and yields Arrays of length n. If the Iterable object is finite, the last
 * chunk yielded will contain as many items as possible.
 *
 * @param {Iterable} it Any iterable object
 * @param {number} n An integer indicating the maximum size of the Arrays to be yielded.
 */
function* chunk(it, n = 1) {
	it = iterate(it);
	while (true) {
		let next = [...take(it, n)];
		if (!next.length) return;
		yield next;
	}
}

/**
 * Takes values from the supplied Iterable and yields only truthy values. The falsey values `false`, `null`, `0`, `""`,
 * `undefined`, and `NaN` will be excluded.
 *
 * @param {Iterable} it Any iterable object
 */
function* compact(it) {
	yield* filter(it, identity);
}

/**
 * Takes any number of parameters and sequentially yields all values from them. If the given object is Iterable,
 * all values from that will be yielded individually. Otherwise, the value will be yielded directly.
 *
 * @param {...()} them Any objects or values
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

function* difference(it, ...values) {
	values = [...flatten(values, 1)];
	for (let value of it) {
		if (!values.includes(value)) {
			yield value;
		}
	}
}

function* differenceBy(it, values, mapFn = identity) {
	values = Array.from(values, mapFn);

	for (let value of it) {
		if (!values.includes(mapFn(value))) {
			yield value;
		}
	}
}

function* differenceWith(it, values, comparator = isEqual) {
	values = [...values];

	for (let value of it) {
		if (!values.some(otherValue => comparator(value, otherValue))) {
			yield value;
		}
	}
}

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

function* drop(it, n = 1) {
	it = iterate(it);
	void [...take(it, n)];
	yield* it;
}

function* dropUntil(it, predicate = identity) {
	for (var value of it) {
		if (predicate(value)) break;
	}
	yield value;
	yield* it;
}

function* dropWhile(it, predicate = identity) {
	for (var value of it) {
		if (!predicate(value)) break;
	}
	yield value;
	yield* it;
}

function* everyNth(it, n, takeFirst = false) {
	let i = +!takeFirst;

	for (let value of it) {
		if (i++ % n === 0) {
			yield value;
		}
	}
}

function* filter(it, predicate = identity) {
	let i = 0;
	for (let value of it) {
		if (predicate(value, i++)) {
			yield value;
		}
	}
}

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

function* forEach(it, fn = identity ) {
	let index = 0;
	for (let value of it) {
		fn(value, index++);
		yield value;
	}
}

function* fuzz(it) {
	for (let value of it) {
		let n = !(value % 3) ? "Fizz" : "";
		n += !(value % 5) ? "Buzz" : "";
		yield n || value;
	}
}

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

function* link(it, generatorFn, ...args) {
	yield* generatorFn(it, ...args)
}

function* map(it, mapFn) {
	for (let value of it) {
		yield mapFn(value);
	}
}

function* pluck(it, prop) {
	for (let value of it) {
		yield value[prop]
	}
}

function* take(it, n = 1) {
	let count = 0;
	if (n <= 0) return;

	for (let value of it) {
		yield value;
		if (++count >= n) return;
	}
}

function* takeUntil(it, predicate = identity) {
	for (let value of it) {
		yield value;
		if (predicate(value)) return;
	}
}

function* takeWhile(it, predicate = identity) {
	for (let value of it) {
		if (!predicate(value)) return value;
		yield value;
	}
}

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

function* unzip(it) {
	yield* zip(...it)
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
