const { take } = require("./take");
const { safeIterate } = require("../base-iterators");

/**
 * Takes values from the supplied Iterable and yields Arrays of length n. If the Iterable object is finite,
 * the last chunk yielded will contain as many items as possible.
 *
 * @param {Iterable} it Any iterable object
 * @param {number} n An integer indicating the maximum size of the Arrays to be yielded.
 */
function* chunk(it, n = 1) {
	try {
		while (true) {
			let next = [...take(safeIterate(it), n)];
			if (!next.length) return;
			yield next;
		}
	} finally {
		it.return();
	}
}

module.exports = chunk;
