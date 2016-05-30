// Sequence Generators
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

	yield* takeWhile(count, predicate);
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
	yield* takeUntil(s, predicate);
}

function* fibonacci(a, b) {
	let f = (a, b) => a + b;
	let s = series(f, 1, 1);
	let predicate = n => n < Number.MAX_SAFE_INTEGER;
	yield* takeWhile(s, predicate);
}

// Modifiers
function* fuzz(it) {
	for (let value of it) {
			let n = !(value % 3) ? "Fizz" : "";
			n += !(value % 5) ? "Buzz" : "";
			yield n || value;
	}
}

function* chunk(it, n = 1) {
	it = iterate(it);
	while (true) {
		let next = [...take(it, n)]
		if (!next.length) return;
		yield next;
	}
}

function* compact(it) {
	yield* filter(it, value => !!value);
}

function* concat(...them) {
	for (let it of them) {
		if (isIterable(it)) {
			yield* it;
		} else {
			yield it;
		}
	}
}

function* drop(it, n = 1) {
	it = iterate(it);
	void [...take(it, n)];
	yield* it;
}

function* dropUntil(it, predicate = v => v) {
	for (var value of it) {
		if (predicate(value)) break;
	}
	yield value;
	yield* it;
}

function* dropWhile(it, predicate = v => v) {
	for (var value of it) {
		if (!predicate(value)) break;
	}
	yield value;
	yield* it;
}

function* filter(it, predicate = v => v) {
	let i = 0;
	for (let value of it) {
		if (predicate(value, i++)) {
			yield value;
		}
	}
}

function* map(it, mapFn) {
	for (let value of it) {
		yield mapFn(value);
	}
}

function* take(it, n = 1) {
	let count = 0;
	for (let value of it) {
		yield value;
		if (++count >= n) return;
	}
}

function* takeUntil(it, predicate = v => v) {
	for (let value of it) {
		yield value;
		if (predicate(value)) return;
	}
}

function* takeWhile(it, predicate = v => v) {
	for (let value of it) {
		if (!predicate(value)) return value;
		yield value;
	}
}

function* zip(...iterables) {
	let iterators = iterables.map(iterate);

	while (true) {
		let values = iterators.map(iterator => iterator.next());
		if (values.some(value => value.done)) return;
		yield values.map(value => value.value);
	}
}

function* unzip(it) {
	yield* zip(...it)
}

module.exports = {
	isIterable,
	iterate,
	counter,
	range,
	random,
	collatz,
	fibonacci,
	fuzz,
	chunk,
	compact,
	concat,
	drop,
	dropUntil,
	dropWhile,
	filter,
	map,
	take,
	takeUntil,
	takeWhile,
	zip,
	unzip
};
