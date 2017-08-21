const { iterate } = require("../base-iterators");
const { isEqual } = require("../utils");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param comparator
 */
function* dedupe(it, comparator = isEqual) {
	let source = iterate(it);
	let prev;
	let firstValue = true;

	for (let value of source) {
		if (firstValue || !comparator(value, prev)) {
			prev = value;
			yield value;
		}
		firstValue = false;
	}
}

module.exports = dedupe;
