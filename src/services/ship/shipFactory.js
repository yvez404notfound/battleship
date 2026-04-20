import Ship from "./ship.js";
import { hit, isSunk, setCoordinates, showCoordinates } from "./shipMethods.js";

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

export {
	createAircraftCarrier,
	createBattleship,
	createCruiser,
	createDestroyer,
	createSubmarine,
};
