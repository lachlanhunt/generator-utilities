describe("Sequences", () => {
	const iter = require("../../index");

	it("should generate a range from 0 to 9", () => {
		expect([...iter.range(10)]).toEqual([0,1,2,3,4,5,6,7,8,9]);
	});

	it("should generate a range from 1 to 10", () => {
		expect([...iter.range(1, 11)]).toEqual([1,2,3,4,5,6,7,8,9,10]);
	});
});
