const identity = require("../utils");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
function* filter(it, predicate = identity) {
	let i = 0;
	for (let value of it) {
		if (predicate(value, i++)) {
			yield value;
		}
	}
}

module.exports = filter;
