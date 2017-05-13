describe("Sequences", () => {
	const iter = require("../index");

	it("should count from 0", () => {
		let counter = iter.counter();

		expect(counter.next().value).toBe(0);
		expect(counter.next().value).toBe(1);
		expect(counter.next().value).toBe(2);
		expect(counter.next().value).toBe(3);
	});

	it("should count from 10", () => {
		let counter = iter.counter(10);

		expect(counter.next().value).toBe(10);
		expect(counter.next().value).toBe(11);
		expect(counter.next().value).toBe(12);
		expect(counter.next().value).toBe(13);
	});

	it("should generate a range from 0 to 9", () => {
		expect([...iter.range(10)]).toEqual([0,1,2,3,4,5,6,7,8,9]);
	});
});
