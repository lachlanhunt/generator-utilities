/**
 * @file Base utilities used to provide simple iteration of iterable objects
 * @author Lachlan Hunt <lachlan.hunt@lachy.id.au>
 */

const isIterable = require("./isiterable");
const iterate = require("./iterate");
const reverse = require("./reverse");
const safeIterate = require("./safeIterate");

module.exports = {
	isIterable,
	iterate,
	reverse,
	safeIterate
};
