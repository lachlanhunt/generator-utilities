const identity = x => x;
const isEqual = (a, b) => a === b;
const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;

function swap(a, i, j) {
	[a[i], a[j]] = [a[j], a[i]];
}

function toLength(value) {
	let len = +value || 0;
	return Math.max(
		0,
		Math.min(
			Math.sign(len) * Math.floor(Math.abs(len)),
			Number.MAX_SAFE_INTEGER
		)
	);
}

module.exports = {
	identity,
	isEqual,
	randomInt,
	randomFloat,
	swap,
	toLength
};
