/**
 *
 * @param {Iterable} it Any iterable object
 * @param generatorFn
 * @param args
 */
function* link(it, generatorFn, ...args) {
	yield* generatorFn(it, ...args);
}

module.exports = link;
