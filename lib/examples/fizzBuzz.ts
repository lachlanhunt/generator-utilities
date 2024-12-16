import { fuzz } from "./fuzz";
import { counter } from "../sequences/counter";

/**
 * [fizzBuzz description]
 * @generator
 * @yields {Number|String} Integers or the strings "Fizz", "Buzz" or "FizzBuzz" in the fizzbuzz sequence.
 */
export function* fizzBuzz() {
    yield* fuzz(counter(1));
}
