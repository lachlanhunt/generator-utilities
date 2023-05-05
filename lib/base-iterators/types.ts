// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Iterable<T, TReturn = any, TNext = undefined> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

export type AnyIterable<T, TReturn, TNext> =
    | Iterable<T, TReturn | void, TNext>
    | ArrayLike<T>
    | Generator<T, TReturn | void, TNext>;

export type GeneratorReturnType<TIterable, TYield, TReturn, TNext> = TIterable extends Generator<TYield, TReturn, TNext>
    ? Generator<TYield, TReturn, TNext>
    : TIterable extends Iterable<TYield, TReturn, TNext>
    ? ReturnType<TIterable[typeof Symbol.iterator]> extends Iterator<infer TYield, infer TReturn, infer TNext>
        ? Generator<TYield, TReturn, TNext>
        : never
    : Generator<TYield, void, undefined>;
