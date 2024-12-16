import { map } from "../chainables";
import { counter } from "../sequences";

export function* thueMorse(start = 0) {
    const n = Math.max(0, start);

    yield* map(counter(n), (n) => hammingDistance(n) % 2);
}

function hammingDistance(n: number) {
    const m1 = 0x55555555; //binary: 0101...
    const m2 = 0x33333333; //binary: 00110011..
    const m4 = 0x0f0f0f0f; //binary:  4 zeros,  4 ones ...
    const h01 = 0x01010101; //the sum of 256 to the power of 0,1,2,3...

    function hamming32(n: number) {
        n -= (n >> 1) & m1; //put count of each 2 bits into those 2 bits
        n = (n & m2) + ((n >> 2) & m2); //put count of each 4 bits into those 4 bits
        n = (n + (n >> 4)) & m4; //put count of each 8 bits into those 8 bits
        return (n * h01) >> 24; //returns left 8 bits of n + (n<<8) + (n<<16) + (n<<24) + ...
    }

    return hamming32(n & 0xffffffff) + hamming32(Math.floor(n / 0x100000000));
}
