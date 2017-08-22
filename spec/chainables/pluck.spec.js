const { pluck } = require("../../");

describe("pluck generator", () => {
	it("should yeild the value obtained by accessing the specified property on each object", () => {
		let iterator = pluck(
			[{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
			"a"
		);
		let result = [...iterator];
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});
});
