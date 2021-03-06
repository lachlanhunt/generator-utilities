/**
 * If called with a generator function, this will invoke the function with the supplied arguments to obtain
 * an iterator, yield all of its values until it ends, and then repeat.
 *
 * If called with an object implementing the Iterable protocol, it will repeatedly iterate it, yielding its
 * values. In this case, any given args are ignored.
 *
 * @param {Iterable|function} generatorFn
 * @param {...*} [args]
 */
export default function* repeat(generatorFn, ...args) {
    while (true) {
        let it =
            typeof generatorFn === "function"
                ? generatorFn(...args)
                : generatorFn;
        let empty = true;

        for (let value of it) {
            empty = false;
            yield value;
        }
        // Guard against empty iterators
        if (empty) return;
    }
}
