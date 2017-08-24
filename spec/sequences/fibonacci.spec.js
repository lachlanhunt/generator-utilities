const { fibonacci } = require("../../");

describe("Fibonacci sequence", () => {
    it("should ", () => {
        let iterator = fibonacci();

        for (let value of iterator) {
            expect(value).toBe(value);
        }
    });
});
