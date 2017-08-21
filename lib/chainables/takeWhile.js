const { iterate } = require("../base-iterators");
const { identity } = require("../utils");
/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 * @returns {*}
 */
function* takeWhile(it, predicate = identity) {
	for (let value of iterate(it)) {
		if (!predicate(value)) return value;
		yield value;
	}
}

module.exports = takeWhile;
