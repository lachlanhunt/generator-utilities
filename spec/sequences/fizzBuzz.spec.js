const { fizzBuzz } = require("../../");

describe("FizzBuzz sequence", () => {
    it("should generate the FizzBuzz sequence", () => {
        let iterator = fizzBuzz();
        let expected = [
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
            "FizzBuzz" // 15
        ];

        for (let i = 0; i < expected.length; i++) {
            expect(iterator.next().value).toBe(expected[i]);
        }
    });
});
