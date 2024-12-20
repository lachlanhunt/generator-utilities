import { take } from "../chainables/take";
import { counter } from "./counter";
import { swap } from "../utils";

// Knuth's Algorithm L implementation
export function* permute(set) {
    const src = Array.isArray(set) ? set : Array.from(set);
    const seq = [...take(counter(), src.length)];

    while (true) {
        let j, k, l;

        yield seq.map((value) => src[value]);

        for (j = seq.length - 2; seq[j] >= seq[j + 1]; j--) {
            if (j === 0) return;
        }

        for (l = seq.length - 1; seq[j] >= seq[l]; l--);

        swap(seq, j, l);

        k = j + 1;
        l = seq.length - 1;
        while (k < l) {
            swap(seq, k, l);
            k++;
            l--;
        }
    }
}
