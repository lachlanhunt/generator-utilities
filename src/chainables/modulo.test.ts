import { modulo } from "./modulo";

describe("modulo generator", () => {
    it("should yield the the value (mod 3) using floored division (always positive)", () => {
        const iterator = modulo([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 3);
        const result = [...iterator];
        expect(result).toEqual([1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]);
    });

    it("should yield the the value (mod -3) using floored division (always negative)", () => {
        const iterator = modulo([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], -3);
        const result = [...iterator];
        expect(result).toEqual([-2, -1, -0, -2, -1, -0, -2, -1, -0, -2, -1]);
    });

    it("should yield the the value (mod 3n) using floored division (always positive) with bigints", () => {
        const iterator = modulo([-5n, -4n, -3n, -2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n], 3n);
        const result = [...iterator];
        expect(result).toEqual([1n, 2n, 0n, 1n, 2n, 0n, 1n, 2n, 0n, 1n, 2n]);
    });

    it("should yield the the value (mod -3n) using floored division (always negative) with bigints", () => {
        const iterator = modulo([-5n, -4n, -3n, -2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n], -3n);
        const result = [...iterator];
        expect(result).toEqual([-2n, -1n, -0n, -2n, -1n, -0n, -2n, -1n, -0n, -2n, -1n]);
    });
});
