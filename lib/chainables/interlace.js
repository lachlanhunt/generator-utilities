const { iterate } = require("../base-iterators");

/**
 *
 * @param them
 */
function* interlace(...them) {
	let iterators = them.map(iterate);

	while (true) {
		for (iterator of iterators) {
			let next = iterator.next();
			if (next.done) return;
			yield next.value;
		}
	}
}

module.exports = interlace;
