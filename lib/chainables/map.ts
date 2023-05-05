import { isIterable, iterate } from "../base-iterators/index";
import { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param it Any iterable object
 * @param mapFn
 */
export default function* map<T, TReturn, TNext, TMapped>(
    it: AnyIterable<T, TReturn, TNext>,
    mapFn: (value: T) => TMapped
): Generator<TMapped, void, TNext> {
    if (isIterable(it)) {
        const iterable = iterate(it);
        try {
            let nextInput: TNext;

            let result: IteratorResult<T, TReturn | void> = iterable.next();
            while (!result.done) {
                nextInput = yield mapFn(result.value);

                result = iterable.next(nextInput);
            }
        } finally {
            iterable.return();
        }
    } else {
        const iterable = iterate(it);

        for (const value of iterable) {
            yield mapFn(value);
        }
    }
}
