const { isEqual } = require("../utils");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param values
 * @param comparator
 */
function* differenceWith(it, values, comparator = isEqual) {
	values = [...values];

	for (let value of it) {
		if (!values.some(otherValue => comparator(value, otherValue))) {
			yield value;
		}
	}
}

module.exports = differenceWith;
