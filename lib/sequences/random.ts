import { randomInt, randomFloat } from "../utils";

const toMinMax = (a: number, b: number): [number, number] => (a < b ? [a, b] : [b, a]);

export const getVarArgs = (...args: [...number[], boolean] | number[]): [number, number, boolean] => {
    const len = args.length;
    const reversed = [...args].reverse() as [boolean, ...number[]] | number[];

    let min: number;
    let max: number;
    let float: boolean;

    if (len === 0) {
        return [0, 1, false];
    } else if (typeof reversed[0] === "boolean") {
        float = reversed[0];
        [float, max = 1, min = 0] = reversed as [boolean, number, number];
    } else {
        [max = 1, min = 0] = reversed as [number, number];
        float = !(Number.isInteger(min) && Number.isInteger(max));
    }
    return [...toMinMax(min, max), float];
};

/**
 * Generate pseudo-random numbers in the specified range from `min` to `max`. If both `min` and `max` are
 * integers, then integers will be yielded by default. If either `min` or `max` are not integers, or if
 * `float` is set to `true`, then any floating-point numbers in the range will be yielded.
 *
 * When generating integers, the range of random numbers is min <= value <= max.
 * When generating floating-point, the range of random numbers is min <= value < max.
 *
 * @param min The minimum value to yield
 * @param max The maximum value to yield
 * @param float If `true`, yield floating-point numbers instead of integers
 * @yields numbers within the specified range
 */
export function random(min: number, max: number, float: boolean): Generator<number, never, never>;

/**
 * Generate pseudo-random numbers in the specified range from `min` to `max`. If both `min` and `max` are
 * integers, then integers will be yielded by default. If either `min` or `max` are not integers,
 * then any floating-point numbers in the range will be yielded.
 *
 * When generating integers, the range of random numbers is min <= value <= max.
 * When generating floating-point, the range of random numbers is min <= value < max.
 *
 * @param min The minimum value to yield
 * @param max The maximum value to yield
 * @yields numbers within the specified range
 */
export function random(min: number, max: number): Generator<number, never, never>;

/**
 * Generate pseudo-random numbers in the specified range from 0 to `max`. If `max` is an
 * integer, then integers will be yielded by default. If `max` is not an integer, or if
 * `float` is set to `true`, then any floating-point numbers in the range will be yielded.
 *
 * When generating integers, the range of random numbers is min <= value <= max.
 * When generating floating-point, the range of random numbers is min <= value < max.
 *
 * @param max The maximum value to yield
 * @param float If `true`, yield floating-point numbers instead of integers
 * @yields numbers within the specified range
 */
export function random(max: number, float: boolean): Generator<number, never, never>;

/**
 * Generate pseudo-random numbers in the specified range from 0 to `max`. If `max` is an
 * integer, then integers will be yielded by default. If `max` is not an integer,
 * then any floating-point numbers in the range will be yielded.
 *
 * When generating integers, the range of random numbers is min <= value <= max.
 * When generating floating-point, the range of random numbers is min <= value < max.
 *
 * @param max The maximum value to yield
 * @yields numbers within the specified range
 */
export function random(max: number): Generator<number, never, never>;

/**
 * Generate pseudo-random numbers in the specified range from 0 to 1.
 * if `float` is set to `true`, then any floating-point numbers in the range will be yielded.
 *
 * When generating integers, the range of random numbers is min <= value <= max.
 * When generating floating-point, the range of random numbers is min <= value < max.
 *
 * @param float If `true`, yield floating-point numbers instead of integers
 * @yields numbers within the specified range
 */
export function random(float: boolean): Generator<number, never, never>;

/**
 * Generate pseudo-random sequence of 0 and 1.
 *
 * @yields numbers within the specified range
 */
export function random(): Generator<number, never, never>;

export function* random(...args: Parameters<typeof getVarArgs>) {
    const [min, max, float] = getVarArgs(...args);

    if (float) {
        while (true) {
            yield randomFloat(min, max);
        }
    } else {
        while (true) {
            yield randomInt(min, max);
        }
    }
}
