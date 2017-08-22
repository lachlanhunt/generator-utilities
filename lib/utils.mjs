export const identity = x => x;
export const isEqual = (a, b) => a === b;
export const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
export const randomFloat = (min, max) => Math.random() * (max - min) + min;

export function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}

export function toLength(value) {
    let len = +value || 0;
    return Math.max(
        0,
        Math.min(
            Math.sign(len) * Math.floor(Math.abs(len)),
            Number.MAX_SAFE_INTEGER
        )
    );
}
