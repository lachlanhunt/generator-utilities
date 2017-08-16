const flatten = require("./flatten");

/**
 * Exclude any items from the given Iterable that are also present in the provided values. Any Iterable
 * passed to the values parameter must yield a finite sequence to avoid an infinite loop.
 *
 * @param {Iterable} it Any iterable object
 * @param {Iterable} values One or more arrays or finitely iterable objects containing the set of values
 *         to be excluded by the generator.
 */
function* difference(it, ...values) {
	values = [...flatten(values, 1)];
	for (let value of it) {
		if (!values.includes(value)) {
			yield value;
		}
	}
}

module.exports = difference;
