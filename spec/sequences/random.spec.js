const iter = require("../../index");
const sinon = require("sinon");
require("jasmine-sinon");

describe("Random sequence", () => {
	const randomValues = [
		0.4812695978780144,
		0.23375078716950348,
		0.3081782513873721,
		0.9218125600417022,
		0.48942927731146746,
		0.6419749165461643,
		0.4715547934771116,
		0.6560471194711377,
		0.3844215795271362,
		0.7019209869388945
	];

	function randomIntFrom(value, min = 0, max = 1) {
		return Math.floor(value * (max - min + 1)) + min;
	}

	beforeEach(() => {
		spyOn(Math, 'random').and.returnValues(...randomValues);
	});

	it("should randomly generate 0 or 1 when called with no parameters", () => {
		let gen = iter.random();
		for (let i of iter.range(randomValues.length)) {
			expect(gen.next().value).toBe(randomIntFrom(randomValues[i], 0, 1));
		}
	});

	it("should generate random doubles between 0 and 1 when called with a single true parameter", () => {
		let gen = iter.random(true);
		for (let i of iter.range(randomValues.length)) {
			expect(gen.next().value).toBe(randomValues[i]);
		}
	});

	it("should generate random integers up to the given max value", () => {
		const MAX = 10;
		let gen = iter.random(MAX);
		for (let i of iter.range(randomValues.length)) {
			expect(gen.next().value).toBe(randomIntFrom(randomValues[i], 0, MAX));
		}
	});

	it("should generate random integers between the given range", () => {
		const MIN = 5;
		const MAX = 15;
		let gen = iter.random(MIN, MAX);
		for (let i of iter.range(randomValues.length)) {
			expect(gen.next().value).toBe(randomIntFrom(randomValues[i], MIN, MAX));
		}
	});

	it("should generate random integers between the given range even when min and max are reversed", () => {
		const MIN = 5;
		const MAX = 15;
		let gen = iter.random(MAX, MIN);
		for (let i of iter.range(randomValues.length)) {
			expect(gen.next().value).toBe(randomIntFrom(randomValues[i], MIN, MAX));
		}
	});
});
