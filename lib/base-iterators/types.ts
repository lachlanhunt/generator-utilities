// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Iterable<T, TReturn = any, TNext = undefined> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

export type AnyIterable<T, TReturn, TNext> = Iterable<T, TReturn, TNext> | ArrayLike<T> | Generator<T, TReturn, TNext>;
