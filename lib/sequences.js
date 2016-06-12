let chainables = require("./chainables");
let isIterable = require("./isiterable");
let baseIterators = require("./base-iterators");
let ArraySlice = require("./array-slice");

let iterate = baseIterators.iterate;
let reverse = baseIterators.reverse;

// Sequence Generators
function* combination(set, size) {
	let src = Array.isArray(set) ? set : [...set]; // Source

	// Clamp value between 1 and the length of the source array.
	// Default to the source length if size is outside that range.
	let n = Math.min(Math.max(+size, 0) || src.length, src.length);
	let m = n - 1;

	let seq = [...chainables.take(counter(), n)];  // Sequence

	function maxValueAt(index) {
		return src.length - seq.length + index;
	}

	let i = m;
	while (i >= 0) {

		while (i < m) {
			i++;
			seq[i] = seq[i - 1] + 1;
		}

		while (seq[i] < src.length) {
			yield seq.map(v => src[v]);
			seq[i]++;
		}

		while(--i >= 0 && seq[i] > maxValueAt(i));

		if (i >= 0) seq[i]++;
	}
}

function* counter(start = 0, step = 1) {
	while (true) {
		yield start;
		start += step;
	}
}

function* range(start = 0, stop = (() => {
	let stop = start;
	start = 0;
	return stop;
})(), step = 1) {
	let count = counter(start, step);

	let predicate = (Math.sign(step) < 0)
		? v => v > stop
		: v => v < stop;

	yield* chainables.takeWhile(count, predicate);
}

function* random(min = 0, max = 1, float = false) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			if (typeof min === "boolean") {
				float = min;
			} else {
				max = +min || 0;
			}
			min = 0;
			break;
		case 2:
			if (typeof max === "boolean") {
				float = max;
				max = +min || 0;
				min = 0;
				break;
			}
			/* falls through */
		default:
			min = +min || 0;
			max = +max || 0;
	}

	if (min > max) {
		[min, max] = [max, min];
	}

	float = float || !!(min % 1) || !!(max % 1);

	if (float) {
		while (true) {
			yield randomFloat(min, max);
		}
	} else {
		while (true) {
			yield randomInt(min, max);
		}
	}
}

function* repeat(generatorFn, ...args) {
	while (true) {
		let it = (typeof generatorFn === "function") ? generatorFn(...args) : generatorFn;
		let empty = true;

		for (let value of it) {
			empty = false;
			yield value;
		}
		// Guard against empty iterators
		if (empty) return;
	}
}

function* series(f, ...n) {
	if (n.length === 0) {
		n = [1];
	}

	for (let value of n) {
		yield value;
	}

	while (true) {
		let next = f(...n);
		n.shift();
		n.push(next);
		yield next;
	}
}

function* shuffle(set) {
	// Special undefined value to distingush between undefined values from set and unfilled values in deck;
	const UNDEFINED = Symbol("undefined");
	let src = Array.isArray(set) ? set : [...set]; // Source

	function getValue(a) {
		return a === undefined ? UNDEFINED : a;
	}

	function pick(index) {
		let a = deck[index];
		let b = src[index];
		return a === undefined ? getValue(b) : a;
	}

	let len = +src.length || 0;
	let deck = new Array(len);

	for (let i = 0; i < len; i++) {
		let j = randomInt(i, len - 1);
		[deck[i], deck[j]] = [pick(j), pick(i)];

		yield deck[i] === UNDEFINED ? undefined : deck[i];
	}
}

function* thueMorse(start = 0) {
	let n = Math.max(0, start);

	do {
		yield hammingDistance(n) % 2;
	} while (++n);
}

// Knuth's Algorithm L implementation
function* permute(set) {
	let src = Array.isArray(set) ? set : Array.from(set);
	let seq = [...chainables.take(counter(), src.length)];

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

/**
 * k-permutation generator. Generates permutations of size k from a set of size n.
 * @param set
 * @param size
 */
function* permutation(set, size) {
	let src = Array.isArray(set) ? set : [...set]; // Source
	let seq = [...range(0, src.length)];  // Sequence

	// Clamp value between 1 and the length of the source array.
	// Default to the source length if size is outside that range.
	let n = src.length;
	let k = Math.min(Math.max(+size, 0) || n, n);
	let edge = k - 1;

	let subset = ArraySlice(seq, 0, k);

	while(true) {
		let i, j, cand;

		yield subset.map(v => src[v]);
		// find j in (k...n-1) where a[j] > aedge
		j = k;
		while (j < n && seq[edge] >= seq[j]) {
			j++
		}

		if (j < n) {
			swap(seq, edge, j);
		} else {
			// find rightmost ascent to left of edge
			i = edge - 1;
			while (i >= 0 && seq[i] >= seq[i + 1]) {
				--i;
			}

			if (i < 0) return; // no more permutations

			// Search in forwards from edge+1 to find the next highest number
			j = edge + 1;
			while (j < n && seq[j] < seq[i]) {
				j++
			}

			// If the next number wasn't found, continue search backwards from edge
			if (j === n) {
				j = edge;
				while(j > i && seq[j] < seq[i]) {
					j--;
				}
			}

			swap(seq, i, j);
			ArraySlice(seq, i + 1).sort(compareNumbers);
		}
	}
}

function* symbols(name) {
	while (true) {
		yield Symbol(name);
	}
}

function* collatz(n) {
	if (n < 1 || n % 1) return;

	let f = n => n % 2 ? n * 3 + 1 : n / 2;
	let s = series(f, n);
	let predicate = n => n === 1;
	yield* chainables.takeUntil(s, predicate);
}

function* fibonacci() {
	let f = (a, b) => a + b;
	let s = series(f, 1, 1);
	let predicate = n => n < Number.MAX_SAFE_INTEGER;
	yield* chainables.takeWhile(s, predicate);
}

function* fizzBuzz() {
	yield* chainables.fuzz(counter(1));
}

// Utility Functions
function compareNumbers(a, b) {
	return a - b;
}

function hammingDistance(n) {
	const m1  = 0x55555555; //binary: 0101...
	const m2  = 0x33333333; //binary: 00110011..
	const m4  = 0x0f0f0f0f; //binary:  4 zeros,  4 ones ...
	const h01 = 0x01010101; //the sum of 256 to the power of 0,1,2,3...

	function hamming32(n) {
		n -= (n >> 1) & m1;             //put count of each 2 bits into those 2 bits
		n = (n & m2) + ((n >> 2) & m2); //put count of each 4 bits into those 4 bits
		n = (n + (n >> 4)) & m4;        //put count of each 8 bits into those 8 bits
		return (n * h01) >> 24;  //returns left 8 bits of n + (n<<8) + (n<<16) + (n<<24) + ...
	}

	return hamming32(n & 0xFFFFFFFF) +
		hamming32(Math.floor(n / 0x100000000));
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function swap(a, i, j) {
	[a[i], a[j]] = [a[j], a[i]];
}

// Exports
module.exports = {
	iterate,
	reverse,
	combination,
	counter,
	random,
	range,
	repeat,
	permutation,
	series,
	shuffle,
	symbols,
	thueMorse,
	collatz,
	fibonacci,
	fizzBuzz
};

/*
 * Potential aliases
 * chain: iterate,
 */
