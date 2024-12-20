import { symbols } from "./symbols";

describe("Symbols sequence", () => {
    it("should ", () => {
        const iterator = symbols();
        for (let i = 0; i < 3; i++) {
            expect(typeof iterator.next().value).toBe("symbol");
        }
    });
});
