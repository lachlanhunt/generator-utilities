import { forEach } from "./forEach";

describe("forEach generator", () => {
    it("should call a callback for each value", () => {
        const source = ["a", "b", "c"];
        const spy = jasmine.createSpy("forEach");
        const iterator = forEach(source, spy);

        for (let i = 0; i < source.length; i++) {
            expect(iterator.next().value).toBe(source[i]);
            expect(spy.calls.mostRecent().args).toEqual([source[i], i]);
        }
    });
});
