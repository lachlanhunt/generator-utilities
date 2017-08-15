const { fuzz } = require("../chainables");

function* fizzBuzz() {
	yield* fuzz(counter(1));
}

module.exports = fizzBuzz;
