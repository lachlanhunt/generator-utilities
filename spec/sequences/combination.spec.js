const iter = require("../../index");

describe("Combination generator", () => {
	it("should generate unique combinations", () => {
		let source = [0, 1, 2, 3, 4, 5];
		let size = 3;
		let combinations = Array.from(iter.combination(source, size), arr =>
			arr.join("")
		);
		let set = new Set(combinations);

		expect(set.size).toEqual(combinations.length);
		expect(combinations.length).toBe(20);
	});

	it("should generate combinations of 3 values", () => {
		let source = [0, 1, 2, 3, 4, 5];
		let size = 3;
		let combinations = iter.combination(source, size);

		for (c of combinations) {
			expect(c.length).toBe(size);
		}
	});

	it("should generate combinations of 4 values", () => {
		let source = [0, 1, 2, 3, 4, 5];
		let size = 4;
		let combinations = iter.combination(source, size);

		for (c of combinations) {
			expect(c.length).toBe(size);
		}
	});

	it("should work with Array-like objects", () => {
		let source = {
			length: 5,
			"0": 10,
			"1": 20,
			"2": 30,
			"3": 40,
			"4": 50
		};
		let size = 3;
		let combinations = iter.combination(source, size);

		for (c of combinations) {
			expect(c.length).toBe(size);
		}
	});

	it("should work with Iterable objects", () => {
		let source = iter.range(5);
		let size = 3;
		let combinations = iter.combination(source, size);

		for (c of combinations) {
			expect(c.length).toBe(size);
		}
	});

	it("should duplicate any value in a combination", () => {
		let source = iter.range(5);
		let size = 3;
		let combinations = iter.combination(source, size);

		for (c of combinations) {
			// Verify all values are unique within each combination
			expect(new Set(c).size).toBe(size);
		}
	});
});
