import { zip } from "../chainables";
import { thueMorse } from "./thueMorse";

describe("ThueMorse sequence", () => {
    it("should generate the thue-morse sequence", () => {
        const iterator = thueMorse();
        const expected = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];

        for (const [result, value] of zip(iterator, expected)) {
            expect(result).toBe(value);
        }
    });
});
