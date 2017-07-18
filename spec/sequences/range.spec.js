const iter = require("../../index");

describe("Range sequence", () => {
	it("should generate an empty if no parameters are given", () => {
		expect([...iter.range()]).toEqual([]);
	});

	it("should generate a range from 0 to 9", () => {
		expect([...iter.range(10)]).toEqual([0,1,2,3,4,5,6,7,8,9]);
	});

	it("should generate a range from 1 to 10", () => {
		expect([...iter.range(1, 11)]).toEqual([1,2,3,4,5,6,7,8,9,10]);
	});

	it("should count down if a single negative value is given", () => {
		expect([...iter.range(-10)]).toEqual([0,-1,-2,-3,-4,-5,-6,-7,-8,-9]);
	});

	it("should increment by 2", () => {
		expect([...iter.range(0, 11, 2)]).toEqual([0,2,4,6,8,10]);
	});
});
