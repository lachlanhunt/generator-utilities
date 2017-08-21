const { iterate, safeIterate } = require("../base-iterators");
const take = require("./take");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
function* drop(it, n = 1) {
	let source = iterate(it);
	void [...take(safeIterate(source), n)]; // Safely iterate to prevent take() from finishing the iterator
	yield* source;
}

module.exports = drop;
