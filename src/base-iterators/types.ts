// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Iterable<T, TReturn = any, TNext = undefined> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

export type AnyIterable<T, TReturn = void, TNext = void> = Iterable<T, TReturn | void, TNext> | ArrayLike<T>;

export type GeneratorReturnType<TIterable> =
    TIterable extends Iterable<infer TYield, infer TReturn, infer TNext>
        ? Generator<TYield, TReturn | void, TNext>
        : TIterable extends ArrayLike<infer TYield>
          ? Generator<TYield, void, unknown>
          : never;

export type Predicate<T, TResult = unknown> = (value: T) => TResult;
