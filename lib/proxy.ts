import * as chainables from "./chainables/"; // Chainables
import * as sequences from "./sequences/"; // Start sequences, non-chainable

const handler = {
    getOwnPropertyDescriptor(target, prop) {
        let descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

        if (descriptor) {
            return descriptor;
        }

        descriptor = Reflect.getOwnPropertyDescriptor(chainables, prop);
        // Properties of chainables have configurable: false.
        // Need to explicitly override the values to avoid violating
        // the invariant regarding reporting non-configurable properties
        // that don't exist as non-configurable own-properties of the target
        return (
            // Not using object spread here due to bug in @std/esm and acorn
            // https://github.com/standard-things/esm/issues/14
            descriptor && {
                value: descriptor.value,
                writable: descriptor.writable,
                enumerable: descriptor.enumerable,
                configurable: true,
            }
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
    },
};

export function makeChainableIterator(name, ...args) {
    return new Proxy(chainables[name](...args), handler);
}

export function makeSequence(name, ...args) {
    return new Proxy(sequences[name](...args), handler);
}
