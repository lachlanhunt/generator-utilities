const { fuzz } = require("../chainables");
const counter = require("./counter");

/**
 * [fizzBuzz description]
 * @generator
 * @yields {Number|String} Integers or the strings "Fizz", "Buzz" or "FizzBuzz" in the fizzbuzz sequence.
 */
function* fizzBuzz() {
	yield* fuzz(counter(1));
}

module.exports = fizzBuzz;
