/**
 * @file Iterators that accept one or more iterators as input, and which may be chained.
 * @author Lachlan Hunt <lachlan.hunt@lachy.id.au>
 */

const chunk = require("./chunk");
const compact = require("./compact");
const concat = require("./concat");
const dedupe = require("./dedupe");
const difference = require("./difference");
const differenceBy = require("./differenceBy");
const differenceWith = require("./differenceWith");
const drop = require("./drop");
const dropUntil = require("./dropUntil");
const dropWhile = require("./dropWhile");
const everyNth = require("./everyNth");
const filter = require("./filter");
const flatten = require("./flatten");
const forEach = require("./forEach");
const fuzz = require("./fuzz");
const interlace = require("./interlace");
const link = require("./link");
const map = require("./map");
const modulo = require("./modulo");
const pluck = require("./pluck");
const take = require("./take");
const takeUntil = require("./takeUntil");
const takeWhile = require("./takeWhile");
const unzip = require("./unzip");
const zip = require("./zip");

module.exports = {
	chunk,
	compact,
	concat,
	dedupe,
	difference,
	differenceBy,
	differenceWith,
	drop,
	dropUntil,
	dropWhile,
	everyNth,
	filter,
	flatten,
	forEach,
	fuzz,
	interlace,
	link,
	map,
	modulo,
	pluck,
	take,
	takeUntil,
	takeWhile,
	zip,
	unzip
};

/*
 * Potential aliases
 * limit: take,
 * skip: drop,
 * skipUntil: dropUntil,
 * skipWhile: dropWhile,
 */
