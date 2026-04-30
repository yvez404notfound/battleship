import Ship from "./ship.js";
import { hit, isSunk, setCoordinates, showCoordinates } from "./shipMethods.js";

const createAircraftCarrier = function (coordinates) {
	return new Ship("Aircraft Carrier", 5, coordinates)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createBattleship = function (coordinates) {
	const ship = new Ship("Battleship", 4, coordinates)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);

	return ship;
};

const createCruiser = function (coordinates) {
	return new Ship("Cruiser", 3, coordinates)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createSubmarine = function (coordinates) {
	return new Ship("Submarine", 3, coordinates)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createDestroyer = function (coordinates) {
	return new Ship("Destroyer", 2, coordinates)
		.inject(hit)
		.inject(isSunk)
		.inject(setCoordinates)
		.inject(showCoordinates);
};

const createShip = function (type, coordinates) {
	switch (type) {
		case "aircraftCarrier":
			return createAircraftCarrier(coordinates);
		case "battleship":
			return createBattleship(coordinates);
		case "cruiser":
			return createCruiser(coordinates);
		case "submarine":
			return createSubmarine(coordinates);
		case "destroyer":
			return createDestroyer(coordinates);
		default:
			return;
	}
};

export {
	createAircraftCarrier,
	createBattleship,
	createCruiser,
	createDestroyer,
	createShip,
	createSubmarine,
};
