const hit = (state) => ({
	hit() {
		state._length = state._length - 1;
	},
});

const getHP = (state) => ({
	getHP() {
		return state._length;
	},
});

const isSunk = (state) => ({
	isSunk() {
		return state._length < 1;
	},
});

export { getHP, hit, isSunk };
