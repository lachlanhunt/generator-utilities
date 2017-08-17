const { collatz } = require("../../index");

describe("Collatz sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = collatz(10);

		for (let value of iterator) {
			expect(value).toBe(value);
		}
	});
});
