const hit = (state) => ({
	hit() {
		state._length = state._length - 1;
	},
});

const isSunk = (state) => ({
	isSunk() {
		return state._length < 1;
	},
});

const setCoordinates = (state) => ({
	setCoordinates(cellCoordinates) {
		state._coordinates = cellCoordinates;

		state._coordinates.forEach((cell) => {
			cell.setOccupiedByShip(this);
		});
	},
});

const showCoordinates = (state) => ({
	showCoordinates() {
		return state._coordinates;
	},
});

export { hit, isSunk, setCoordinates, showCoordinates };
