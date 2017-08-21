const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param prop
 */
function* pluck(it, prop) {
	for (let value of iterate(it)) {
		yield value[prop];
	}
}

module.exports = pluck;
