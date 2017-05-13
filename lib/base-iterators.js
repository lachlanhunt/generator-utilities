function* iterate(it) {
	yield* it;
}

function* safeIterate(it) {
	it = iterate(it);
	let next;

	while (true) {
		let next = it.next();
		if (next.done) return next.value;
		yield next.value;
	}
}

function* reverse(arrayLike) {
	for (let i = (+arrayLike.length || 0) - 1; i >= 0; i--) {
		yield arrayLike[i];
	}
}

module.exports = {
	iterate,
	safeIterate,
	reverse
};
