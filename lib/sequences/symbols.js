function* symbols(name) {
	while (true) {
		yield Symbol(name);
	}
}

module.exports = symbols;
