import * as chainables from "./chainables/index"; // Chainables
import * as sequences from "./sequences/index"; // Start sequences, non-chainable

const handler = {
    getOwnPropertyDescriptor(target, prop) {
        return (
            Reflect.getOwnPropertyDescriptor(target, prop) ||
            Reflect.getOwnPropertyDescriptor(chainables, prop)
        );
    },
    has(target, prop) {
        return Reflect.has(target, prop) || chainables.hasOwnProperty(prop);
    },
    get(target, prop, receiver) {
        if (
            !Reflect.apply(Object.prototype.hasOwnProperty, target, [prop]) &&
            Reflect.apply(Object.prototype.hasOwnProperty, chainables, [prop])
        ) {
            return makeChainableIterator.bind(this, prop, target);
        }

        if (target[prop] instanceof Function) {
            return () => target[prop]();
        } else {
            return Reflect.get(target, prop, receiver);
        }
    },
    ownKeys(target) {
        return [...Reflect.ownKeys(target), ...Reflect.ownKeys(chainables)];
    }
};

export function makeChainableIterator(name, ...args) {
    return new Proxy(chainables[name](...args), handler);
}

export function makeSequence(name, ...args) {
    return new Proxy(sequences[name](...args), handler);
}
