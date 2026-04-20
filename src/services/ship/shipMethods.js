const hit = (state) => ({
	hit() {
		state.length = state.length - 1;
	},
});

const isSunk = (state) => ({
	isSunk() {
		return state.length < 1;
	},
});

const setCoordinates = (state) => ({
	setCoordinates(cellCoordinates) {
		state.coordinates = cellCoordinates;

		state.coordinates.forEach((cell) => {
			cell.setOccupiedByShip(this);
		});
	},
});

const showCoordinates = (state) => ({
	showCoordinates() {
		return state.coordinates;
	},
});

export { hit, isSunk, setCoordinates, showCoordinates };
