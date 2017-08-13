/**
 * Generator that delegates iteration to the provided object's iterator via [Symbol.iterator].
 *
 * @param  {Iterable}    it Any iterable object
 * @return {Generator}    A generator with iteration delegated to the provided object's iterator
 */
function* iterate(it) {
	yield* it;
}

/**
 * Generator that yields values from the provided object's iterator via [Symbol.iterator],
 * but prevents a return call propagating to the wrapped iterator when when this generator is ended.
 *
 * @param  {Iterable}    it Any iterable object
 * @return {Generator}   A generator that yields values from the provided object's iterator
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
 * @param  {ArrayLike}    arrayLike An Array or Array-like object with a length property and
 *                                  numeric properties.
 * @return {Generator}           A generator that yields values in reverse from an Array or Array-like object
 */
function* reverse(arrayLike) {
	for (let i = (+arrayLike.length || 0) - 1; i >= 0; i--) {
		yield arrayLike[i];
	}
}

module.exports = {
	iterate,
	safeIterate,
	reverse
};
