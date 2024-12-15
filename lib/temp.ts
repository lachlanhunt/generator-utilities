function mod(value: bigint, n: bigint): bigint;
function mod(value: number, n: number): number;

function mod(value: number | bigint, n: number | bigint) {
    if (typeof value === "bigint" && typeof n === "bigint") {
        return ((value % n) + n) % n;
    } else if (typeof value === "number" && typeof n === "number") {
        return ((value % n) + n) % n;
    }
}

const floorMod = (x, y) => x - y * Math.floor(x / y);
const euclidianMod = (x, y) => x - Math.abs(y) * Math.floor(x / Math.abs(y));
const remainder = (x, y) => x % y;

const bigIntMod = (x: bigint, y: bigint) => x - y * (x / y);

for (let i = -4; i <= 5; i++) {
    console.log(floorMod(i, 4));
    console.log(floorMod(i, -4));
    console.log(mod(i, 4));
    console.log(mod(i, -4));
    console.log(euclidianMod(i, 4));
    console.log(euclidianMod(i, -4));
    console.log(remainder(i, 4));
    console.log(remainder(i, -4));
}

// BigInts
for (let i = -4n; i <= 5n; i++) {
    console.log(bigIntMod(i, 4n));
    console.log(bigIntMod(i, -4n));
    console.log(mod(i, 4n));
    console.log(mod(i, -4n));
    console.log(remainder(i, 4n));
    console.log(remainder(i, -4n));
}
