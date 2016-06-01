let chainables = require("./chainables");
let baseIterators = require("./base-iterators");

let iterate = baseIterators.iterate;
let reverse = baseIterators.reverse;

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
			} else {
				min = +min || 0;
				max = +max || 0;
			}
			break;
		default:
			min = +min || 0;
			max = +max || 0;
	}

	if (min > max) {
		[min, max] = [max, min];
	}

	float = float || !!(min % 1) || !!(max % 1)

	//console.log("Settings:", min, max, float);
	if (float) {
		while (true) {
			yield Math.random() * (max - min) + min;
		}
	} else {
		while (true) {
			yield Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
}

function* series(f, ...n) {
	var value;

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
	counter,
	range,
	random,
	series,
	collatz,
	fibonacci,
	fizzBuzz
};

/*
 * Potential aliases
 * chain: iterate,
 */
