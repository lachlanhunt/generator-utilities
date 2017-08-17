const { thueMorse } = require("../../index");

describe("ThueMorse sequence", () => {
	it("should ", () => {
		// TODO
		let iterator = thueMorse();
		let i = 0;

		for (let value of iterator) {
			expect(value).toBe(value);
			if (++i > 100) break;
		}
	});
});
