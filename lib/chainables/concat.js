const isIterable = require("../base-iterators");

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

module.exports = concat;
