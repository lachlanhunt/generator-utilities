import { forEach } from "./forEach";
import { zip } from "./zip";

describe("forEach generator", () => {
    it("should call a callback for each value", () => {
        const source = ["a", "b", "c"];
        const spy = vi.fn();
        const iterator = forEach(source, spy);

        for (const [result, value] of zip(iterator, source)) {
            expect(result).toBe(value);
            expect(spy).toHaveBeenCalledWith(value);
        }
    });
});
