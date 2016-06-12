// Private properties
let props = new WeakMap();

/**
 * Implementation of the ECMAScript ToObject abstract operation
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is null or undefined.
 */
function toObject(arg) {
	if (arg === null || arg === undefined) {
		throw new TypeError(`Can't convert ${arg} to object`);
	}

	switch (typeof arg) {
		case "boolean":
			return new Boolean(arg);
		case "number":
			return new Number(arg);
		case "string":
			return new String(arg);
		default: // "symbol" or "object" or "function"
			return arg;
	}
}

/**
 * Implementation of the ECMAScript ToInteger abstract operation
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is null or undefined.
 */
function toInteger(arg) {
	let number = +arg;
	if (Object.is(number, NaN)) {
		return 0;
	} else if (number === 0 || number === Infinity || number === -Infinity) {
		return number;
	} else {
		return Math.sign(number) * Math.floor(Math.abs(number));
	}
}

/**
 *
 * @param array
 * @param start
 * @param end
 * @returns {Proxy}
 * @constructor
 */

function ArraySlice(array = [], start = 0, end) {
	// The following implements steps 1 to 6 of the ECMAScript Array.prototype.slice algorithm
	// for determing the starting and ending indicies
	let o = toObject(array);
	let len = o.length;

	let relativeStart = toInteger(start);
	let k = (relativeStart < 0) ?
		Math.max((len + relativeStart), 0) :
		Math.min(relativeStart, len);

	let relativeEnd = (end === undefined) ? len : toInteger(end);
	let final = relativeEnd < 0 ?
		Math.max((len + relativeEnd), 0) :
		Math.min(relativeEnd, len);

	// Take the absolute value of the difference in order to support reverse sequences
	let length = Math.abs(final - k);

	let proxy = new Proxy(o, handler);

	props.set(proxy, {
		object: o,
		length: length,
		start: k,
		end: final,
		reverse: k > final
	});

	return proxy;
}

let handler = {
	get(target, property, receiver) {
		let p = props.get(receiver);

		if (typeof property !== "symbol" &&
			Number.isInteger(+property) && +property >= 0) {

			property = p.reverse ? p.start - (+property) - 1 : p.start + (+property);

			if (p.reverse ? property < p.end : property >= p.end) {
				return undefined;
			}
		} else if (property === "length") {
			return p.length;
		}

		return Reflect.get(target, property, receiver);
	},

	set(target, property, value, receiver) {
		let p = props.get(receiver);

		if (typeof property !== "symbol" &&
			Number.isInteger(+property) && +property >= 0) {

			property = p.reverse ? p.start - (+property) - 1 : p.start + (+property);

			if (p.reverse ? property < p.end : property >= p.end) {
				throw new RangeError("Cannot modify original array out of bounds")
			}
		} else if (property === "length") {
			let intLen = value >>> 0;

			if (intLen !== +value) {
				throw new RangeError("Invalid array length");
			}

			if (p.reverse) {
				let relativeEnd = p.start - intLen;
				p.end = Math.max(relativeEnd, 0)
			} else {
				let relativeEnd = p.start + intLen;
				p.end = Math.min(relativeEnd, p.object.length)
			}

			p.length = Math.abs(p.end - p.start);
			return true;
		}

		return Reflect.set(target, property, value, receiver);
	}
};

module.exports = ArraySlice;
//export default ArraySlice;
