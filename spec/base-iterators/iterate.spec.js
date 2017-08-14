const iter = require("../../index");

describe("Iterating objects", () => {
	it("should yield values from an array", () => {
		let arr = [10, 20, 30, 40, 50];
		let iterable = iter.iterate(arr);

		for (let i = 0; i <= arr.length; i++) {
			expect(iterable.next().value).toBe(arr[i]);
		}
	});

	it("should invoke the [Symbol.iterator] method of an object", () => {
		let arr = [10, 20, 30, 40, 50];
		let obj = {
			*[Symbol.iterator]() {
				yield* arr;
			}
		};

		let iterable = iter.iterate(obj);

		for (let i = 0; i <= arr.length; i++) {
			expect(iterable.next().value).toBe(arr[i]);
		}
	});

	it("should finish the wrapped iterator when it returns", () => {
		let counter = iter.counter();
		let iterable = iter.iterate(counter);

		for (value of iterable) {
			if (value > 3) break;
		}
		expect(iterable.next().done).toBe(true);
		expect(counter.next().done).toBe(true);
	});

	it("should work with array-like objects", () => {
		let obj = {
			length: 5,
			"0": 10,
			"1": 20,
			"2": 30,
			"3": 40,
			"4": 50
		};

		let iterable = iter.iterate(obj);

		for (let i = 0; i < obj.length; i++) {
			expect(iterable.next().value).toBe(obj[i]);
		}
	});
});
