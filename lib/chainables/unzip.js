const zip = require("./zip");

/**
 *
 * @param {Iterable} it Any iterable object
 */
function* unzip(it) {
	yield* zip(...it);
}

module.exports = unzip;
