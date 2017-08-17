const { symbols } = require("../../index");

describe("Symbols sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = symbols();
		let i = 0;

		for (let value of iterator) {
			expect(value).toBe(value);
			if (++i > 100) break;
		}
	});
});
