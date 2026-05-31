import Player from "./player.js";
import {
	attack,
	getGameboard,
	getShipsLeft,
	getType,
	initShips,
	isDead,
	isPositionAttacked,
} from "./playerMethods.js";

const createHumanPlayer = function (name, gameboard) {
	return new Player("human", name, gameboard)
		.inject(attack)
		.inject(initShips)
		.inject(isDead)
		.inject(isPositionAttacked)
		.inject(getGameboard)
		.inject(getType)
		.inject(getShipsLeft);
};

const createRobotPlayer = function (gameboard) {
	return new Player("robot", "Robot", gameboard)
		.inject(attack)
		.inject(initShips)
		.inject(isDead)
		.inject(isPositionAttacked)
		.inject(getGameboard)
		.inject(getType)
		.inject(getShipsLeft);
};

export { createHumanPlayer, createRobotPlayer };
