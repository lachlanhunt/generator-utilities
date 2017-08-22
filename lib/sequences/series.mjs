/**
 *
 * @param f
 * @param n
 */
export default function* series(f, ...n) {
    if (n.length === 0) {
        n = [1];
    }

    for (let value of n) {
        yield value;
    }

    while (true) {
        let next = f(...n);
        n.shift();
        n.push(next);
        yield next;
    }
}
