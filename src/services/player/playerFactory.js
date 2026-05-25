import Player from "./player.js";
import {
	attack,
	getGameboard,
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
		.inject(getType);
};

const createRobotPlayer = function (gameboard) {
	return new Player("robot", "Robot", gameboard)
		.inject(attack)
		.inject(initShips)
		.inject(isDead)
		.inject(isPositionAttacked)
		.inject(getGameboard)
		.inject(getType);
};

export { createHumanPlayer, createRobotPlayer };
