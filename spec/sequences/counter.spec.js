describe("Counting sequences", () => {
	const iter = require("../../index");

	it("should count from 0", () => {
		let counter = iter.counter();

		for (let i = 0; i <= 100; i++) {
			expect(counter.next().value).toBe(i);
		}
	});

	it("should count from 10", () => {
		let counter = iter.counter(10);

		for (let i = 10; i <= 100; i++) {
			expect(counter.next().value).toBe(i);
		}
	});

	it("should count odd numbers from 3", () => {
		let counter = iter.counter(3, 2);

		for (let i = 3; i < 100; i += 2) {
			expect(counter.next().value).toBe(i);
		}
	});

	it("should count multiples of 5 starting from -30", () => {
		let counter = iter.counter(-30, 5);

		for (let i = -30; i < 100; i += 5) {
			expect(counter.next().value).toBe(i);
		}
	});

	it("should count even numbers in reverse from 100 down to -100", () => {
		let counter = iter.counter(100, -2);

		for (let i = 100; i >= -100; i -= 2) {
			expect(counter.next().value).toBe(i);
		}
	});

	it("should count increments of 0.2 numbers from 0 to 10", () => {
		let counter = iter.counter(0, 0.2);

		for (let i = 0; i < 10; i += 0.2) {
			expect(counter.next().value).toBe(i);
		}
	});
});
