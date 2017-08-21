const { iterate } = require("../base-iterators");
const zip = require("./zip");

/**
 *
 * @param {Iterable} it Any iterable object
 */
function* unzip(it) {
	yield* zip(...iterate(it));
}

module.exports = unzip;
