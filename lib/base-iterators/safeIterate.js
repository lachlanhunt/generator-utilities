const iterate = require("./iterate");

/**
 * Generator that yields values from the provided object's iterator via [Symbol.iterator],
 * but prevents a return call propagating to the wrapped iterator when when this generator is ended.
 *
 * @generator
 * @param  {Iterable} it Any iterable object
 * @yields {*} Values from the provided object's iterator
 */
function* safeIterate(it) {
	let source = iterate(it);
	let next;

	while (true) {
		let next = source.next();
		if (next.done) return next.value;
		yield next.value;
	}
}

module.exports = safeIterate;
