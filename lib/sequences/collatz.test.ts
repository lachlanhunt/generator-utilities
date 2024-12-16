import { collatz } from "./collatz";

describe("Collatz sequence", () => {
    it("should yield values in the Collatz sequence", () => {
        let iterator = collatz(10);
        let result = [...iterator];
        expect(result).toEqual([10, 5, 16, 8, 4, 2, 1]);
    });
});
