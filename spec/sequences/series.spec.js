const { series } = require("../../index");

describe("Series sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = series();

		for (let value of iterator) {
			expect(value).toBe(value);
			break;
		}
	});
});
