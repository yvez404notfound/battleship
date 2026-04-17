import Cell from "../gameboard/cell/cell.js";

//#region Base Class
class Ship {
	constructor(type, length, coordinates) {
		this.type = type;
		this.length = length;
		this.coordinates = coordinates;
	}

	inject(method) {
		Object.assign(this, method(this));
		return this;
	}
}
//#endregion

//#region Methods
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

//#endregion

//#region Role Factories
const createAircraftCarrier = function () {
	return new Ship("Aircraft Carrier", 5)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createBattleship = function () {
	const ship = new Ship("Battleship", 4)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);

	return ship;
};

const createCruiser = function () {
	return new Ship("Cruiser", 3)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createSubmarine = function () {
	return new Ship("Submarine", 3)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createDestroyer = function () {
	return new Ship("Destroyer", 2)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};
//#endregion

/* 
const submarine = createSubmarine();
submarine.setCoordinates([new Cell("A1"), new Cell("A2"), new Cell("A3")]);
submarine.hit();
console.log(submarine);
console.log("submarine sunk: ", submarine.isSunk()); 
*/

export {
	createAircraftCarrier,
	createBattleship,
	createCruiser,
	createDestroyer,
	createSubmarine,
};
