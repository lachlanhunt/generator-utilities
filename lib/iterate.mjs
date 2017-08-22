import { makeChainableIterator, makeSequence } from "./proxy";
import * as sequences from "./sequences/index";
import * as chainables from "./chainables/index";
import { isIterable } from "./base-iterators/index";

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

let genUtil = {
    isIterable
};

for (let sequence of Reflect.ownKeys(sequences)) {
    Reflect.defineProperty(genUtil, sequence, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: defineSequence(sequence)
    });
}

for (let chainable of Reflect.ownKeys(chainables)) {
    Reflect.defineProperty(genUtil, chainable, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: defineChainableIterator(chainable)
    });
}

export default genUtil;
