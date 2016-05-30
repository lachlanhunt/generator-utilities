let proxy = require("./proxy");
let sequences = require("./sequences");
let chainables = require("./chainables");
let isIterable = require("./isiterable");

function defineSequence(name) {
	return function(...args) {
		return proxy.makeSequence(name, ...args);
	}
}

function defineChainableIterator(name) {
	return function(...args) {
		return proxy.makeChainableIterator(this, name, ...args);
	}
}

let genUtil = {
	isIterable,
	sequences,
	chainables
};

for (sequence of Reflect.ownKeys(sequences)) {
	Reflect.defineProperty(genUtil, sequence, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: defineSequence(sequence)
	})
}

for (chainable of Reflect.ownKeys(chainables)) {
	Reflect.defineProperty(genUtil, chainable, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: defineChainableIterator(chainable)
	})
}

module.exports = genUtil;
