import type { AnyIterable } from "./base-iterators/types";

/**
 * The identity function
 * @param x Any value
 * @returns The value passed in
 * @example
 * identity(1); // 1
 * identity("a"); // "a"
 * identity({ a: 1 }); // { a: 1 }
 */
export const identity = <const T>(x: T): T => x;

/**
 * Checks if two values are equal
 * @param a The first value
 * @param b The second value
 * @returns True if the values are equal, false otherwise
 * @example
 * isEqual("a", "a"); // true
 * isEqual(1, 1); // true
 */
export const isEqual = <T>(a: T, b: T) => a === b;

/**
 * Checks if a value is an array-like object
 * @param o The object to check
 * @returns True if the object is an array-like object, false otherwise
 */
export const isArrayLike = <T>(o: unknown): o is ArrayLike<T> => typeof o === "object" && o !== null && "length" in o;

export const isArray = <T>(o: AnyIterable<T>): o is T[] => Array.isArray(o);

/**
 * Returns a random integer between min and max
 * @param min The minimum value
 * @param max The maximum value
 * @returns A random integer from min to max, where min <= value <= max
 * @example
 * randomInt(1, 10); // 5
 */
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Returns a random floating point value between min and max
 * @param min The minimum value
 * @param max The maximum value
 * @returns A random floating point value between min and max, where min <= value < max
 * @example
 * randomFloat(1, 10); // 5.123
 */
export const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * Swaps two values at the given indicies of an array
 * @param o The array
 * @param i The first index
 * @param j The second index
 * @returns The array with the values swapped
 */
export function swap<T extends unknown[]>(o: T, i: keyof T, j: keyof T) {
    if (Object.hasOwn(o, i) && Object.hasOwn(o, j)) {
        [o[i], o[j]] = [o[j], o[i]];
    }
    return o;
}

/**
 * The ECMS262 toLength function
 * @param value A number
 * @returns A number between 0 and Number.MAX_SAFE_INTEGER
 * @see https://tc39.es/ecma262/#sec-tolength
 * @example
 * toLength(Infinity); // 9007199254740991
 * toLength(-1); // 0
 * toLength(1.5); // 1
 * toLength(1); // 1
 * toLength(0); // 0
 */
export function toLength(value: number) {
    const len = value || 0; // Treat NaN, -0 or 0 as 0
    return Math.max(0, Math.min(Math.sign(len) * Math.floor(Math.abs(len)), Number.MAX_SAFE_INTEGER));
}
