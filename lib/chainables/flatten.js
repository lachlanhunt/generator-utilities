const identity = require("../utils");
const { isIterable } = require("../base-iterators");

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

module.exports = flatten;
