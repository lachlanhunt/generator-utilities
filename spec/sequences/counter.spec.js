const { counter } = require("../../index");

describe("Counting sequences", () => {
	it("should count from 0", () => {
		let c = counter();

		for (let i = 0; i <= 100; i++) {
			expect(c.next().value).toBe(i);
		}
	});

	it("should count from 10", () => {
		let c = counter(10);

		for (let i = 10; i <= 100; i++) {
			expect(c.next().value).toBe(i);
		}
	});

	it("should count odd numbers from 3", () => {
		let c = counter(3, 2);

		for (let i = 3; i < 100; i += 2) {
			expect(c.next().value).toBe(i);
		}
	});

	it("should count multiples of 5 starting from -30", () => {
		let c = counter(-30, 5);

		for (let i = -30; i < 100; i += 5) {
			expect(c.next().value).toBe(i);
		}
	});

	it("should count even numbers in reverse from 100 down to -100", () => {
		let c = counter(100, -2);

		for (let i = 100; i >= -100; i -= 2) {
			expect(c.next().value).toBe(i);
		}
	});

	it("should count increments of 0.2 numbers from 0 to 10", () => {
		let c = counter(0, 0.2);

		for (let i = 0; i < 10; i += 0.2) {
			expect(c.next().value).toBe(i);
		}
	});
});
