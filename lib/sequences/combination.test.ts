const { combination, range } = require("./");

describe("Combination generator", () => {
    it("should generate unique combinations", () => {
        const source = [0, 1, 2, 3, 4, 5];
        const size = 3;
        const combinations = Array.from(combination(source, size), (arr) => arr.join(""));
        const set = new Set(combinations);

        expect(set.size).toEqual(combinations.length);
        expect(combinations.length).toBe(20);
    });

    it("should generate combinations of 3 values", () => {
        const source = [0, 1, 2, 3, 4, 5];
        const size = 3;
        const combinations = combination(source, size);

        for (const c of combinations) {
            expect(c.length).toBe(size);
        }
    });

    it("should generate combinations of 4 values", () => {
        const source = [0, 1, 2, 3, 4, 5];
        const size = 4;
        const combinations = combination(source, size);

        for (const c of combinations) {
            expect(c.length).toBe(size);
        }
    });

    it("should work with Array-like objects", () => {
        const source = {
            length: 5,
            0: 10,
            1: 20,
            2: 30,
            3: 40,
            4: 50,
        };
        const size = 3;
        const combinations = combination(source, size);

        for (const c of combinations) {
            expect(c.length).toBe(size);
        }
    });

    it("should work with Iterable objects", () => {
        const source = range(5);
        const size = 3;
        const combinations = combination(source, size);

        for (const c of combinations) {
            expect(c.length).toBe(size);
        }
    });

    it("should duplicate any value in a combination", () => {
        const source = range(5);
        const size = 3;
        const combinations = combination(source, size);

        for (const c of combinations) {
            // Verify all values are unique within each combination
            expect(new Set(c).size).toBe(size);
        }
    });
});
