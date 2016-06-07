let chainables = require("./chainables");
let isIterable = require("./isiterable");
let baseIterators = require("./base-iterators");

let iterate = baseIterators.iterate;
let reverse = baseIterators.reverse;

function* combination(set, size) {
	// Clamp value between 1 and the length of set.
	// Default to the set length if size is outside that range.
	let n = Math.min(Math.max(+size, 0) || set.length, set.length);

	function maxValueAt(index) {
		return src.length - seq.length + index;
	}

	let src = Array.isArray(set) ? set : [...set];
	let seq = [...chainables.take(counter(), n)];

	let i = seq.length - 1;
	while (i >= 0) {
		for (++i; i < seq.length; i++) {
			seq[i] = seq[i - 1] + 1;
		}
		i--;

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

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
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

function* shuffle(arrayLike) {
	// Special undefined value to distingush between undefined values from arrayLike and unfilled values in deck;
	const UNDEFINED = Symbol("undefined");

	function getValue(a) {
		return a === undefined ? UNDEFINED : a;
	}

	function pick(index) {
		let a = deck[index];
		let b = arrayLike[index];
		return a === undefined ? getValue(b) : a;
	}

	let len = +arrayLike.length || 0;
	let deck = new Array(len);

	for (let i = 0; i < len; i++) {
		let j = randomInt(i, len - 1);
		[deck[i], deck[j]] = [pick(j), pick(i)];

		yield deck[i] === UNDEFINED ? undefined : deck[i];
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

module.exports = {
	iterate,
	reverse,
	combination,
	counter,
	random,
	range,
	repeat,
	series,
	shuffle,
	symbols,
	collatz,
	fibonacci,
	fizzBuzz
};

/*
 * Potential aliases
 * chain: iterate,
 */
