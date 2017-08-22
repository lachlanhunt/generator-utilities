const { compact } = require("../../");

describe("compact generator", () => {
	it("should exclude falsey values", () => {
		let iterator = compact([0, null, 1, false, undefined, 2, NaN, "", 3]);
		let result = [...iterator];

		expect(result).toEqual([1, 2, 3]);
	});
});
