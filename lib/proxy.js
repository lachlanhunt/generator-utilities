let chainables = require("./chainables"); // Chainables
let sequences = require("./sequences"); // Start sequences, non-chainable

function makeChainableIterator(name, target, ...args) {
	return new Proxy(chainables[name](target, ...args), handler);
}

function makeSequence(name, ...args) {
	return new Proxy(sequences[name](...args), handler);
}

let handler = {
	getOwnPropertyDescriptor(target, prop) {
		return Reflect.getOwnPropertyDescriptor(target, prop)
		    || Reflect.getOwnPropertyDescriptor(chainables, prop);
	},
	has(target, prop) {
		return Reflect.has(target, prop) || chainables.hasOwnProperty(prop);
	},
	get(target, prop, receiver) {
		if (!Reflect.apply(Object.prototype.hasOwnProperty, target, [prop])
		  && Reflect.apply(Object.prototype.hasOwnProperty, chainables, [prop])) {
			return makeChainableIterator.bind(this, prop, target);
		}

		if (target[prop] instanceof Function) {
			return () => target[prop]();
		} else {
			return target[prop];
		}
	},
	ownKeys(target) {
		return [...Reflect.ownKeys(target), ...Reflect.ownKeys(chainables)];
	}
};

module.exports = {
	makeChainableIterator,
	makeSequence,
	handler
};
