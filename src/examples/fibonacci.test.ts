import { fibonacci } from "./fibonacci";

describe("Fibonacci sequence", () => {
    it("should ", () => {
        const iterator = fibonacci();

        for (const value of iterator) {
            expect(value).toBe(value);
        }
    });
});
