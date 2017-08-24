const { forEach } = require("../../");

describe("forEach generator", () => {
    it("should call a callback for each value", () => {
        let source = ["a", "b", "c"];
        let spy = jasmine.createSpy("forEach");
        let iterator = forEach(source, spy);

        for (let i = 0; i < source.length; i++) {
            expect(iterator.next().value).toBe(source[i]);
            expect(spy.calls.mostRecent().args).toEqual([source[i], i]);
        }
    });
});
