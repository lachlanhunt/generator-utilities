const { fizzBuzz } = require("../../index");

describe("FizzBuzz sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = fizzBuzz();
		let i = 0;
		for (let value of iterator) {
			expect(value).toBe(value);
			if (++i > 100) break;
		}
	});
});
