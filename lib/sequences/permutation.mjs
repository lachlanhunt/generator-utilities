import ArraySlice from "arrayslice";
import range from "./range";
import { swap } from "../utils";

/**
 * k-permutation generator. Generates permutations of size k from a set of size n.
 * @param set
 * @param size
 */
export default function* permutation(set, size) {
    let src = Array.isArray(set) ? set : Array.from(set);
    let seq = [...range(0, src.length)]; // Sequence

    // Clamp value between 1 and the length of the source array.
    // Default to the source length if size is outside that range.
    let n = src.length;
    let k = Math.min(Math.max(+size, 0) || n, n);
    let edge = k - 1;

    let subset = ArraySlice(seq, 0, k);

    while (true) {
        let i, j, cand;

        yield subset.map(v => src[v]);
        // find j in (k...n-1) where a[j] > aedge
        j = k;
        while (j < n && seq[edge] >= seq[j]) {
            j++;
        }

        if (j < n) {
            swap(seq, edge, j);
        } else {
            // find rightmost ascent to left of edge
            i = edge - 1;
            while (i >= 0 && seq[i] >= seq[i + 1]) {
                --i;
            }

            if (i < 0) return; // no more permutations

            // Search in forwards from edge+1 to find the next highest number
            j = edge + 1;
            while (j < n && seq[j] < seq[i]) {
                j++;
            }

            // If the next number wasn't found, continue search backwards from edge
            if (j === n) {
                j = edge;
                while (j > i && seq[j] < seq[i]) {
                    j--;
                }
            }

            swap(seq, i, j);
            ArraySlice(seq, i + 1).sort((a, b) => a - b);
        }
    }
}
