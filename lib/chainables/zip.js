const { iterate } = require("../base-iterators");

/**
 *
 * @param them
 */
function* zip(...them) {
	if (!!them.length) {
		let iterators = them.map(iterate);
		while (true) {
			let values = iterators.map(iterator => iterator.next());
			if (values.some(value => value.done)) return;
			yield values.map(value => value.value);
		}
	}
}

module.exports = zip;
