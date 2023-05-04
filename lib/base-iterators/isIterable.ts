import { Iterable } from "./types";

/**
 * Determines if a given object is iterable. An object is deemed iterable if it has an implementation for the
 * `Symbol.iterator` property.
 * @param o The object to be checked.
 * @returns `true` if the object implements `Symbol.iterator`.
 */
export function isIterable<T, TReturn, TNext>(
    o: Iterable<T, TReturn, TNext> | ArrayLike<T>
): o is Iterable<T, TReturn, TNext> {
    return typeof o === "string" || Reflect.has(o, Symbol.iterator);
}
