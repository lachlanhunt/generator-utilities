const { fuzz, range } = require("../../");

describe("fuzz generator", () => {
    it("should map numbers according to the rules of FizzBuzz", () => {
        let iterator = fuzz(range(1, 16));
        let result = [...iterator];
        expect(result).toEqual([
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
        ]);
    });
});
