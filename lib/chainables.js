let isIterable = require("./isiterable");
let iterate = require("./base-iterators").iterate;

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

function* difference(it, values) {

}

function* differenceBy(it, values, iteratee) {

}

function* differenceWith(it, values, comparitor) {

}

function* dedupe(it, comparator = (a, b) => a === b) {
	let prev;
	let firstValue = true;

	for (let value of it) {
		if (firstValue || !comparator(value, prev)) {
			prev = value;
			yield value;
		}
		firstValue = false;
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

function* everyNth(it, n, takeFirst = false) {
	let i = +!takeFirst;

	for (value of it) {
		if (i++ % n === 0) {
			yield value;
		}
	}
}

function* filter(it, predicate = v => v) {
	let i = 0;
	for (let value of it) {
		if (predicate(value, i++)) {
			yield value;
		}
	}
}

function* forEach(it, fn = () => void 0 ) {
	let index = 0;
	for (value of it) {
		fn(value, index++);
		yield value;
	}
}

function* fuzz(it) {
	for (let value of it) {
		let n = !(value % 3) ? "Fizz" : "";
		n += !(value % 5) ? "Buzz" : "";
		yield n || value;
	}
}

function* link(it, generatorFn, ...args) {
	yield* generatorFn(it, ...args)
}

function* map(it, mapFn) {
	for (let value of it) {
		yield mapFn(value);
	}
}

function* pluck(it, prop) {
	for (value of it) {
		yield value[prop]
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
	chunk,
	compact,
	concat,
	dedupe,
	drop,
	dropUntil,
	dropWhile,
	everyNth,
	filter,
	forEach,
	fuzz,
	link,
	map,
	take,
	takeUntil,
	takeWhile,
	zip,
	unzip
};

/*
 * Potential aliases
 * limit: take,
 * skip: drop,
 * skipUntil: dropUntil,
 * skipWhile: dropWhile,
 */
