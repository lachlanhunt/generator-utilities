import { randomInt } from "../utils";
import { range } from "./range";

export function* shuffle(set) {
    // Special undefined value to distingush between undefined values from set and unfilled values in deck;
    const UNDEFINED = Symbol("undefined");
    const src = Array.isArray(set) ? set : Array.from(set);

    const getValue = (a) => (a === undefined ? UNDEFINED : a);

    function pick(index) {
        const a = deck[index];
        const b = src[index];
        return a === undefined ? getValue(b) : a;
    }

    const len = +src.length || 0;
    const deck = new Array(len);

    for (const i of range(len)) {
        const j = randomInt(i, len - 1);
        [deck[i], deck[j]] = [pick(j), pick(i)];

        yield deck[i] === UNDEFINED ? undefined : deck[i];
    }
}
