const { repeat, take } = require("../../");
const sinon = require("sinon");
require("jasmine-sinon");

describe("Repeat sequence", () => {
    function* test(a = 1, b = 2, c = 3) {
        yield* [a, b, c];
    }

    let generatorFn = sinon.stub();
    generatorFn.callsFake(test);

    beforeEach(() => {
        generatorFn.resetHistory();
    });

    it("should repeatedly yield all values of an array", () => {
        expect([...take(repeat([1, 2, 3]), 7)]).toEqual([1, 2, 3, 1, 2, 3, 1]);
    });

    it("should invoke the supplied generator function on each repetition", () => {
        let result = [...take(repeat(generatorFn), 7)];

        expect(result).toEqual([1, 2, 3, 1, 2, 3, 1]);
        expect(generatorFn).toHaveBeenCalledThrice();
    });

    it("should invoke the supplied generator function with the given arguments on each repetition", () => {
        let result = [...take(repeat(generatorFn, 3, 2, 1), 7)];

        expect(result).toEqual([3, 2, 1, 3, 2, 1, 3]);
        expect(generatorFn).toHaveBeenCalledThrice();
        expect(generatorFn).toHaveBeenAlwaysCalledWith(3, 2, 1);
    });
});
