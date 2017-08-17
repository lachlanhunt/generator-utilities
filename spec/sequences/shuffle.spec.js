const { shuffle } = require("../../index");

describe("Shuffle sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = shuffle([1, 2, 3, 4]);

		for (let value of iterator) {
			expect(value).toBe(value);
		}
	});
});
