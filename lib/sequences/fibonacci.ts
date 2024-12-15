import { takeWhile } from "../chainables/index";
import { series } from "./series";

export function* fibonacci() {
    const f = (a, b) => a + b;
    const s = series(f, 1, 1);
    const predicate = (n) => n < Number.MAX_SAFE_INTEGER;
    yield* takeWhile(s, predicate);
}
