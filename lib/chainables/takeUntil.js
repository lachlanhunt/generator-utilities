const { identity } = require("../utils");

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

module.exports = takeUntil;
