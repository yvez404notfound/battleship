import Player from "./player.js";
import {
	attack,
	initShips,
	isDead,
	isPositionAttacked,
	placeShipsToGameboard,
} from "./playerMethods.js";

const createHumanPlayer = function (name, gameboard) {
	return new Player("human", name, gameboard)
		.inject(attack)
		.inject(initShips)
		.inject(placeShipsToGameboard)
		.inject(isDead)
		.inject(isPositionAttacked);
};

const createRobotPlayer = function (gameboard) {
	return new Player("robot", "bot", gameboard)
		.inject(attack)
		.inject(initShips)
		.inject(placeShipsToGameboard)
		.inject(isDead)
		.inject(isPositionAttacked);
};

export { createHumanPlayer, createRobotPlayer };
