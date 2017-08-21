const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param mapFn
 */
function* map(it, mapFn) {
	for (let value of iterate(it)) {
		yield mapFn(value);
	}
}

module.exports = map;
