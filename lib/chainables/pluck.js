const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param prop
 */
function* pluck(it, prop) {
	for (let value of iterate(it)) {
		yield value !== null && value !== undefined ? value[prop] : undefined;
	}
}

module.exports = pluck;
