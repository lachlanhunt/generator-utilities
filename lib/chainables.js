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

function* fuzz(it) {
	for (let value of it) {
		let n = !(value % 3) ? "Fizz" : "";
		n += !(value % 5) ? "Buzz" : "";
		yield n || value;
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
	chunk,
	compact,
	concat,
	drop,
	dropUntil,
	dropWhile,
	filter,
	fuzz,
	map,
	take,
	takeUntil,
	takeWhile,
	zip,
	unzip
};
