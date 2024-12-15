import { iterate } from "../base-iterators";
import { getVarArgs, random } from "./random";
// import { range } from "./range";

function range(length: number) {
    return Array.from({ length }, (_, i) => i);
}

describe("getVarArgs", () => {
    it("should return default values when called with no parameters", () => {
        expect(getVarArgs()).toEqual([0, 1, false]);
    });

    it("should return default min/max values and true when called with a single true parameter", () => {
        expect(getVarArgs(true)).toEqual([0, 1, true]);
    });

    it("should return default min/max values and false when called with a single false parameter", () => {
        expect(getVarArgs(false)).toEqual([0, 1, false]);
    });

    it("should return default min and float values when called with a single number parameter", () => {
        expect(getVarArgs(10)).toEqual([0, 10, false]);
    });

    it("should return default min value when called with a single number parameter and a true parameter", () => {
        expect(getVarArgs(10, true)).toEqual([0, 10, true]);
    });

    it("should return default min value when called with a single number parameter and a false parameter", () => {
        expect(getVarArgs(10, false)).toEqual([0, 10, false]);
    });

    it("should return default float value when called with 2 number parameters", () => {
        expect(getVarArgs(10, 20)).toEqual([10, 20, false]);
    });

    it("should return all the same 3 values when called with 2 number parameters and a true parameter", () => {
        expect(getVarArgs(10, 20, true)).toEqual([10, 20, true]);
    });

    it("should return all the same 3 values when called with 2 number parameters and a false parameter", () => {
        expect(getVarArgs(10, 20, false)).toEqual([10, 20, false]);
    });
});

describe("Random sequence", () => {
    const randomValues = [
        0.4812695978780144, 0.23375078716950348, 0.3081782513873721, 0.9218125600417022, 0.48942927731146746,
        0.6419749165461643, 0.4715547934771116, 0.6560471194711377, 0.3844215795271362, 0.7019209869388945,
    ];

    function randomValueToInt(value: number, min = 0, max = 1) {
        return Math.floor(value * (max - min + 1)) + min;
    }

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

    it("should randomly generate 0 or 1 when called with no parameters", () => {
        const gen = random();
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValueToInt(randomValues[i], 0, 1));
        }
    });

    it("should generate random doubles between 0 and 1 when called with a single true parameter", () => {
        const gen = random(true);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValues[i]);
        }
    });

    it("should generate random integers up to the given max value", () => {
        const MAX = 10;
        const gen = random(MAX);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValueToInt(randomValues[i], 0, MAX));
        }
    });

    it("should generate random doubles up to the given max value", () => {
        const MAX = 10;
        const gen = random(MAX, true);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValues[i] * MAX);
        }
    });

    it("should generate random integers between the given range", () => {
        const MIN = 5;
        const MAX = 15;
        const gen = random(MIN, MAX);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValueToInt(randomValues[i], MIN, MAX));
        }
    });

    it("should generate random integers between the given range even when min and max are reversed", () => {
        const MIN = 5;
        const MAX = 15;
        const gen = random(MAX, MIN);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValueToInt(randomValues[i], MIN, MAX));
        }
    });

    it("should generate random doubles between the given range", () => {
        const MIN = 5;
        const MAX = 15;
        const gen = random(MIN, MAX, true);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValues[i] * (MAX - MIN) + MIN);
        }
    });

    it("should generate random doubles between the given range even when min and max are reversed", () => {
        const MIN = 5;
        const MAX = 15;
        const gen = random(MAX, MIN, true);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValues[i] * (MAX - MIN) + MIN);
        }
    });

    it("should generate random integers between the given range even when min and max are reversed", () => {
        const MIN = 5;
        const MAX = 15;
        const gen = random(MAX, MIN, false);
        for (const i of range(randomValues.length)) {
            expect(gen.next().value).toBe(randomValueToInt(randomValues[i], MIN, MAX));
        }
    });
});
