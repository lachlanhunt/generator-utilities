import { zip } from "../chainables";
import { fizzBuzz } from "./fizzBuzz";

describe("FizzBuzz sequence", () => {
    it("should generate the FizzBuzz sequence", () => {
        const iterator = fizzBuzz();
        const expected = [
            1,
            2,
            "Fizz", // 3
            4,
            "Buzz", // 5
            "Fizz", // 6
            7,
            8,
            "Fizz", // 9
            "Buzz", // 10
            11,
            "Fizz", // 12
            13,
            14,
            "FizzBuzz", // 15
        ];

        for (const [result, value] of zip(iterator, expected)) {
            expect(result).toBe(value);
        }
    });
});
