/**
 * @file Base utilities used to provide simple iteration of iterable objects
 * @author Lachlan Hunt <lachlan.hunt@lachy.id.au>
 */

const isIterable = require("./isiterable");

function toLength(value) {
	let len = +value || 0;
	return Math.max(
		0,
		Math.min(
			Math.sign(len) * Math.floor(Math.abs(len)),
			Number.MAX_SAFE_INTEGER
		)
	);
}

/**
 * Generator that delegates iteration to the provided object's iterator via [Symbol.iterator].
 *
 * @generator
 * @param  {Iterable}    it Any iterable object
 * @yields {*} Values from the provided object's iterator
 */
function* iterate(it) {
	if (isIterable(it)) {
		yield* it;
	} else {
		// Treat as array-like
		let len = toLength(it.length);
		for (let i = 0; i < len; i++) {
			yield it[i];
		}
	}
}

/**
 * Generator that yields values from the provided object's iterator via [Symbol.iterator],
 * but prevents a return call propagating to the wrapped iterator when when this generator is ended.
 *
 * @generator
 * @param  {Iterable} it Any iterable object
 * @yields {*} Values from the provided object's iterator
 */
function* safeIterate(it) {
	it = iterate(it);
	let next;

	while (true) {
		let next = it.next();
		if (next.done) return next.value;
		yield next.value;
	}
}

/**
 * Generator that yields values from an array-like object in reverse, beginning
 * from the last item until the first
 *
 * @generator
 * @param  {ArrayLike} arrayLike An Array or Array-like object with a length property and
 *                                  numeric properties.
 * @yields {*} Values from an Array or Array-like object beginning from the highest index
 */
function* reverse(arrayLike) {
	for (let i = toLength(arrayLike.length) - 1; i >= 0; i--) {
		yield arrayLike[i];
	}
}

module.exports = {
	iterate,
	safeIterate,
	reverse
};
