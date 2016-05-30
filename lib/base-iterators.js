function* iterate(it) {
	yield* it;
}

function* reverse(arrayLike) {
	for (let i = (+arrayLike.length || 0) - 1; i >= 0; i--) {
		yield arrayLike[i];
	}
}

module.exports = {
	iterate,
	reverse
}
