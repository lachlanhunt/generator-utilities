const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 */
function* fuzz(it) {
	for (let value of iterate(it)) {
		let n = !(value % 3) ? "Fizz" : "";
		n += !(value % 5) ? "Buzz" : "";
		yield n || value;
	}
}

module.exports = fuzz;
