const iter = require("../../index");

describe("Reverse iterating objects", () => {
	it("should yield values from an array in reverse", () => {
		let arr = [10, 20, 30, 40, 50];
		let iterable = iter.reverse(arr);

		for (let i = arr.length - 1; i >= 0; i--) {
			expect(iterable.next().value).toBe(arr[i]);
		}
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

		let iterable = iter.reverse(obj);

		for (let i = obj.length - 1; i >= 0; i--) {
			expect(iterable.next().value).toBe(obj[i]);
		}
	});

	it("should not iterate any object without a length", () => {
		let obj = {
			"0": 10,
			"1": 20,
			"2": 30,
			"3": 40,
			"4": 50
		};

		let result = [...iter.reverse(obj)];
		expect(result).toEqual([]);
	});
});
