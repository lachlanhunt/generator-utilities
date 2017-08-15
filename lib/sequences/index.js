const { iterate, safeIterate, reverse } = require("../base-iterators");
const combination = require("./combination");
const counter = require("./counter");
const random = require("./random");
const range = require("./range");
const repeat = require("./repeat");
const permute = require("./permute");
const permutation = require("./permutation");
const series = require("./series");
const shuffle = require("./shuffle");
const symbols = require("./symbols");
const thueMorse = require("./thueMorse");
const collatz = require("./collatz");
const fibonacci = require("./fibonacci");
const fizzBuzz = require("./fizzBuzz");

// Exports
module.exports = {
	iterate,
	safeIterate,
	reverse,
	combination,
	counter,
	random,
	range,
	repeat,
	permute,
	permutation,
	series,
	shuffle,
	symbols,
	thueMorse,
	collatz,
	fibonacci,
	fizzBuzz
};
