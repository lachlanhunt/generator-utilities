/**
 *
 * @param {Iterable} it Any iterable object
 * @param comparator
 */
function* dedupe(it, comparator = isEqual) {
	let prev;
	let firstValue = true;

	for (let value of it) {
		if (firstValue || !comparator(value, prev)) {
			prev = value;
			yield value;
		}
		firstValue = false;
	}
}

module.exports = dedupe;
