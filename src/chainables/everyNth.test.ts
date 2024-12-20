import { everyNth } from "./everyNth";

describe("everyNth generator", () => {
    it("should yield every 3rd value from an Array", () => {
        const iterator = everyNth([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
        const result = [...iterator];
        expect(result).toEqual([2, 5, 8]);
    });

    it("should yield every 3rd value from an Array beginning with the first", () => {
        const iterator = everyNth([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, true);
        const result = [...iterator];
        expect(result).toEqual([0, 3, 6, 9]);
    });

    it("should yield every 3rd value from an iterable", () => {
        const iterator = everyNth("abcdefghij", 3);
        const result = [...iterator];
        expect(result).toEqual(["c", "f", "i"]);
    });

    it("should yield every 3rd value from an iterable beginning with the first", () => {
        const iterator = everyNth("abcdefghij", 3, true);
        const result = [...iterator];
        expect(result).toEqual(["a", "d", "g", "j"]);
    });
});
