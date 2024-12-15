/**
 *
 * @param f
 * @param n
 */
export function* series(f, ...n) {
    if (n.length === 0) {
        n = [1];
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
