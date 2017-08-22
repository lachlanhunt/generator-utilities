export default function* symbols(name) {
    while (true) {
        yield Symbol(name);
    }
}
