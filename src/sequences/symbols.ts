export function* symbols(description?: Parameters<typeof Symbol>[0]) {
    while (true) {
        yield Symbol(description);
    }
}
