export default function isIterable(o) {
    return !(!o || typeof o[Symbol.iterator] !== "function");
}
