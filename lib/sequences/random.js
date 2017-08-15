const { randomInt, randomFloat } = require("../utils");

/**
 * Generate pseudo-random numbers in the specified range from `min` to `max`. If both `min` and `max` are
 * integers, then integers will be yielded by default. If either `min` or `max` are not integers, or if
 * `float` is set to `true`, then any floating-point numbers in the range will be yielded.
 *
 * @generator
 * @param {number} min
 * @param {number} max
 * @param {boolean} float
 * @yeilds numbers within the specified range
 */
function* random(min = 0, max = 1, float = false) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			if (typeof min === "boolean") {
				float = min;
			} else {
				max = +min || 0;
			}
			min = 0;
			break;
		case 2:
			if (typeof max === "boolean") {
				float = max;
				max = +min || 0;
				min = 0;
				break;
			}
		/* falls through */
		default:
			min = +min || 0;
			max = +max || 0;
	}

	if (min > max) {
		[min, max] = [max, min];
	}

	float = float || !!(min % 1) || !!(max % 1);

	if (float) {
		while (true) {
			yield randomFloat(min, max);
		}
	} else {
		while (true) {
			yield randomInt(min, max);
		}
	}
}

module.exports = random;
