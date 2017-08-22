import { randomInt } from "../utils";
import range from "./range";

export default function* shuffle(set) {
    // Special undefined value to distingush between undefined values from set and unfilled values in deck;
    const UNDEFINED = Symbol("undefined");
    let src = Array.isArray(set) ? set : Array.from(set);

    const getValue = a => (a === undefined ? UNDEFINED : a);

    function pick(index) {
        let a = deck[index];
        let b = src[index];
        return a === undefined ? getValue(b) : a;
    }

    let len = +src.length || 0;
    let deck = new Array(len);

    for (let i of range(len)) {
        let j = randomInt(i, len - 1);
        [deck[i], deck[j]] = [pick(j), pick(i)];

        yield deck[i] === UNDEFINED ? undefined : deck[i];
    }
}
