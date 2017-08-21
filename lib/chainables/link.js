const { iterate } = require("../base-iterators");

/**
 *
 * @param {Iterable} it Any iterable object
 * @param generatorFn
 * @param args
 */
function* link(it, generatorFn, ...args) {
	yield* generatorFn(iterate(it), ...args);
}

module.exports = link;
