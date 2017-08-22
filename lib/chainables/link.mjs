import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param generatorFn
 * @param args
 */
export default function* link(it, generatorFn, ...args) {
    yield* generatorFn(iterate(it), ...args);
}
