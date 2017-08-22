const { takeUntil } = require("../../");

describe("takeUntil generator", () => {
	it("should only take items until 5 is yielded", () => {
		let iterator = takeUntil([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n => n === 5);
		let result = [...iterator];
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});
});
