const { take } = require("../chainables");
const counter = require("./counter");
const { swap } = require("../utils");

// Knuth's Algorithm L implementation
function* permute(set) {
	let src = Array.isArray(set) ? set : Array.from(set);
	let seq = [...take(counter(), src.length)];

	while (true) {
		let j, k, l;

		yield seq.map(value => src[value]);

		for (j = seq.length - 2; seq[j] >= seq[j + 1]; j--) {
			if (j === 0) return;
		}

		for (l = seq.length - 1; seq[j] >= seq[l]; l--);

		swap(seq, j, l);

		k = j + 1;
		l = seq.length - 1;
		while (k < l) {
			swap(seq, k, l);
			k++;
			l--;
		}
	}
}

module.exports = permute;
