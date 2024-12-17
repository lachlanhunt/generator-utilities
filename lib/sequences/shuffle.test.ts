import { iterate } from "../base-iterators";
import { shuffle } from "./shuffle";

describe("Shuffle sequence", () => {
    const randomValues = [
        0.4812695978780144, 0.23375078716950348, 0.3081782513873721, 0.9218125600417022, 0.48942927731146746,
        0.6419749165461643, 0.4715547934771116, 0.6560471194711377, 0.3844215795271362, 0.7019209869388945,
    ];

    beforeEach(() => {
        const mathRandom = iterate<number>(randomValues);
        vi.spyOn(Math, "random").mockImplementation((): number => {
            const { value, done } = mathRandom.next();
            if (!done) {
                return value;
            }
            return 0;
        });
    });

    it("should randomly yield values", () => {
        const iterator = shuffle([1, 2, 3, 4]);
        const result = [...iterator];
        expect(result).toEqual([2, 1, 3, 4]);
    });
});
