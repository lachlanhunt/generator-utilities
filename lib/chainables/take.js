const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
function* take(it, n = 1) {
	let count = 0;
	if (n <= 0) return;

	for (let value of iterate(it)) {
		yield value;
		if (++count >= n) return;
	}
}

module.exports = take;
