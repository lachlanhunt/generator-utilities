import type { AnyIterable } from "../base-iterators/types";
import { isArray, randomInt } from "../utils";
import { range } from "./range";

// Special unfilled value to distingush between undefined values from set and unfilled values in deck;
const UNFILLED = Symbol("unfilled");
type UNFILLED = typeof UNFILLED;

export function* shuffle<T>(set: AnyIterable<T>) {
    const src = isArray(set) ? set : Array.from(set);
    const length = src.length;
    const deck: (T | UNFILLED)[] = Array.from({ length }, () => UNFILLED);

    function pick(index: number) {
        const a = deck[index];
        const b = src[index];
        return a === UNFILLED ? b : a;
    }

    for (const i of range(length)) {
        const j = randomInt(i, length - 1);
        [deck[i], deck[j]] = [pick(j), pick(i)];
        yield deck[i];
    }
}
