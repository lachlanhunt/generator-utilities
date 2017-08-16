const { identity } = require("../utils");
const filter = require("./filter");

/**
 * Takes values from the supplied Iterable and yields only truthy values. The falsey values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` will be excluded.
 *
 * @param {Iterable} it Any iterable object
 */
function* compact(it) {
	yield* filter(it, identity);
}

module.exports = compact;
