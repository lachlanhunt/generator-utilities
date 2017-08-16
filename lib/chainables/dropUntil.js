const { identity } = require("../utils");
const safeIterate = require("../base-iterators");

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

module.exports = dropUntil;
