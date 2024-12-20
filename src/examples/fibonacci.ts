import { takeWhile } from "../chainables/";
import { series } from "../sequences/series";

export function* fibonacci() {
    const f = (a: number, b: number) => a + b;
    const s = series(f, 1, 1);
    const predicate = (n: number) => n < Number.MAX_SAFE_INTEGER;
    yield* takeWhile(s, predicate);
}
