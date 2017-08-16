const take = require("./take");
const safeIterate = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
function* drop(it, n = 1) {
	void [...take(safeIterate(it), n)]; // Safely iterate to prevent take() from finishing the iterator
	yield* it;
}

module.exports = drop;
