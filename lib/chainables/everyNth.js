/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 * @param takeFirst
 */
function* everyNth(it, n, takeFirst = false) {
	let i = +!takeFirst;

	for (let value of it) {
		if (i++ % n === 0) {
			yield value;
		}
	}
}

module.exports = everyNth;
