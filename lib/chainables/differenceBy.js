const { iterate } = require("../base-iterators");
const { identity } = require("../utils");

/**
 * Exclude any items from the given Iterable that are also present in the provided values, where each value
 * is mapped using the supplied map function prior to comparing. Any Iterable passed to the values parameter
 * must yield a finite sequence to avoid an infinite loop.
 *
 * @param {Iterable} it Any iterable object
 * @param {Iterable} values An array or finitely iterable object containing the set of values
 *         to be excluded by the generator.
 * @param mapFn
 */
function* differenceBy(it, values, mapFn = identity) {
	let source = iterate(it);
	let exclusions = Array.from(values, mapFn);

	for (let value of source) {
		if (!exclusions.includes(mapFn(value))) {
			yield value;
		}
	}
}

module.exports = differenceBy;
