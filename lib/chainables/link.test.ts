const { link, fuzz, range } = require("./");

describe("link generator", () => {
    it("should invoke the given generator function by passing the given iterator and yield the values from it", () => {
        const iterator = link(range(1, 16), fuzz);
        const result = [...iterator];
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
            "FizzBuzz", // 15
        ]);
    });
});
