/**
 *
 * @param f
 * @param n
 */
export function* series<T>(f: (...args: T[]) => T, ...n: T[]) {
    if (n.length === 0) {
        throw new Error("At least one argument is required");
    }

    for (const value of n) {
        yield value;
    }

    while (true) {
        const next = f(...n);
        n.shift();
        n.push(next);
        yield next;
    }
}
