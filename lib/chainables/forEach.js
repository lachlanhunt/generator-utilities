const identity = require("../utils");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param fn
 */
function* forEach(it, fn = identity) {
	let index = 0;
	for (let value of it) {
		fn(value, index++);
		yield value;
	}
}

module.exports = forEach;
