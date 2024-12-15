import { fuzz } from "../chainables/index";
import { counter } from "./counter";

/**
 * [fizzBuzz description]
 * @generator
 * @yields {Number|String} Integers or the strings "Fizz", "Buzz" or "FizzBuzz" in the fizzbuzz sequence.
 */
export function* fizzBuzz() {
    yield* fuzz(counter(1));
}
