const proxy = require("./proxy");
const sequences = require("./sequences");
const chainables = require("./chainables");
const isIterable = require("./isiterable");

function defineSequence(name) {
	return function(...args) {
		return proxy.makeSequence(name, ...args);
	};
}

function defineChainableIterator(name) {
	return function(...args) {
		return proxy.makeChainableIterator(name, ...args);
	};
}

let genUtil = {
	isIterable
};

for (sequence of Reflect.ownKeys(sequences)) {
	Reflect.defineProperty(genUtil, sequence, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: defineSequence(sequence)
	});
}

for (chainable of Reflect.ownKeys(chainables)) {
	Reflect.defineProperty(genUtil, chainable, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: defineChainableIterator(chainable)
	});
}

module.exports = genUtil;
