// Private properties
let props = new WeakMap();

/**
 * Verify that the the length value is within the permissable range. The value must
 * be within the valid 32 bit unsigned int range permitted for use with JS Arrays
 * when added to the given start value, which must itself be valid.
 *
 * @param start The value given as the starting index.
 * @param length The value given as the length of the array slice.
 * @returns {Array<Number>} The start and length values cast to integers.
 * @throws {RangeError} Will throw if start or length values are not integers between 0 and 2^32-1.
 */
function validateLength(start, length) {
	start = +start;
	length = +length;

	let intStart = start >>> 0;
	let intLen = length >>> 0;

	if (intStart !== start) {
		throw new RangeError("Invalid start index");
	}

	if (intLen !== length ||
		((intLen + start) >>> 0) !== (intLen + start)) {
		throw new RangeError("Invalid array length");
	}

	return [intStart, intLen];
}

function ArraySlice(array = [], start = 0, length) {
	if (!Array.isArray(array)) {
		throw new TypeError(String(array) + " is not an Array");
	}


	length = (length === undefined) ? array.length - start : length;

	[start, length] = validateLength(start, length)
	let proxy = new Proxy(array, handler);

	props.set(proxy, {
		array: array,
		length: length,
		start: start
	});

	return proxy;
}

let handler = {
	get(target, property, receiver) {
		// console.log("get intercepted", property);

		let p = props.get(receiver);

		if (typeof property !== "symbol" &&
		    Number.isInteger(+property) && +property >= 0) {

			let start = p.start;
			let index = start + (+property);
			return target[index];

		} else if (property === "length") {
			return p.length;
		}

		return Reflect.get(target, property, receiver);
	},

	set(target, property, value, receiver) {
		let p = props.get(receiver);

		if (property === "length") {
			let length = validateLength(p.start, value);
			p.length = length;
			return true;
		} else if (typeof property !== "symbol" &&
			Number.isInteger(+property) && +property >= 0) {
			property = p.start + (+property);
		}

		return Reflect.set(target, property, value, receiver);
	}
};

module.exports = ArraySlice;
//export default ArraySlice;
