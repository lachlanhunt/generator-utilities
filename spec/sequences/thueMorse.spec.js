const { thueMorse } = require("../../");

describe("ThueMorse sequence", () => {
    it("should ", () => {
        let iterator = thueMorse();
        let expected = [0, 1, 1, 0, 1, 0, 0, 1];
        for (let i = 0; i < expected.length; i++) {
            let result = iterator.next().value;
            expect(result).toBe(expected[i]);
        }
    });
});
