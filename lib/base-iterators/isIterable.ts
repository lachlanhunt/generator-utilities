/**
 * Determines if a given object is iterable. An object is deemed iterable if it has an implementation for the
 * `Symbol.iterator` property.
 * @param o The object to be checked.
 * @returns `true` if the object implements `Symbol.iterator`.
 */
export function isIterable<T>(o: Iterable<T> | ArrayLike<T>): o is Iterable<T> {
    return typeof o === "string" || Reflect.has(o, Symbol.iterator);
}
