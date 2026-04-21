import Player from "./player.js";
import { attack, initShips } from "./playerMethods.js";

const createHumanPlayer = function (name, gameboard) {
	return new Player("human", name, gameboard).inject(attack).inject(initShips);
};

const createRobotPlayer = function (gameboard) {
	return new Player("robot", "bot", gameboard).inject(attack).inject(initShips);
};

export { createHumanPlayer, createRobotPlayer };
