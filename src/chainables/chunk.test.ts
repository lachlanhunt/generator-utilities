import { chunk } from "./chunk";

describe("chunk generator", () => {
    it("should yield 2 values at a time", () => {
        const iterator = chunk([0, 1, 2, 3, 4, 5], 2);

        expect(iterator.next().value).toEqual([0, 1]);
        expect(iterator.next().value).toEqual([2, 3]);
        expect(iterator.next().value).toEqual([4, 5]);
    });
});
