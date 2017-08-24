import { makeChainableIterator, makeSequence } from "./proxy";
import * as sequences from "./sequences/index";
import * as chainables from "./chainables/index";

function defineSequence(name) {
    return function(...args) {
        return makeSequence(name, ...args);
    };
}

function defineChainableIterator(name) {
    return function(...args) {
        return makeChainableIterator(name, ...args);
    };
}

let chain = {};

for (let sequence of Reflect.ownKeys(sequences)) {
    Reflect.defineProperty(chain, sequence, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: defineSequence(sequence)
    });
}

for (let chainable of Reflect.ownKeys(chainables)) {
    Reflect.defineProperty(chain, chainable, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: defineChainableIterator(chainable)
    });
}

export default chain;
