const generateRandVal = function (range) {
	const targetRange = range + 1;
	return Math.floor(Math.random() * targetRange);
};

export { generateRandVal };
