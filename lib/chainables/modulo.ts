import { iterate } from "../base-iterators/index";
import { AnyIterable } from "../base-iterators/types";

function mod(value: number, n: number) {
    return ((value % n) + n) % n;
}

function bigMod(value: bigint, n: bigint) {
    return ((value % n) + n) % n;
}

/**
 * For dividends generated by `it`, yields the value mod `n` based on floored division.
 * The sign of the result matches the sign of the divisor.
 *
 * @param it An iterable sequence of numbers to be used as the dividend
 * @param n  The divisor
 */
export function modulo<T extends bigint>(it: AnyIterable<T, void, void>, n: T): Generator<T, never, void>;
export function modulo<T extends number>(it: AnyIterable<T, void, void>, n: T): Generator<T, never, void>;
export function* modulo<T extends number | bigint>(it: AnyIterable<T, void, void>, n: T) {
    if (typeof n === "bigint") {
        for (const value of iterate(it) as Iterable<bigint>) {
            yield bigMod(value, n);
        }
    } else if (typeof n === "number") {
        for (const value of iterate(it) as Iterable<number>) {
            yield mod(value, n);
        }
    }
}
