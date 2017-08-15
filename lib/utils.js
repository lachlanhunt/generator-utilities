function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function swap(a, i, j) {
	[a[i], a[j]] = [a[j], a[i]];
}

module.exports = {
	randomInt,
	randomFloat,
	swap
};
