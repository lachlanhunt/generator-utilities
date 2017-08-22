import { takeWhile } from "../chainables/index";
import series from "./series";

export default function* fibonacci() {
    let f = (a, b) => a + b;
    let s = series(f, 1, 1);
    let predicate = n => n < Number.MAX_SAFE_INTEGER;
    yield* takeWhile(s, predicate);
}
