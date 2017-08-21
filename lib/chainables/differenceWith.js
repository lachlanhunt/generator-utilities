const { iterate } = require("../base-iterators");
const { isEqual } = require("../utils");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param values
 * @param comparator
 */
function* differenceWith(it, values, comparator = isEqual) {
	let source = iterate(it);
	let exclusions = Array.from(values);

	for (let value of source) {
		if (!exclusions.some(otherValue => comparator(value, otherValue))) {
			yield value;
		}
	}
}

module.exports = differenceWith;
