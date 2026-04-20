import Player from "./player.js";
import { attack, endTurn, startTurn } from "./playerMethods.js";

const createHumanPlayer = function (name) {
	return new Player("human", name)
		.inject(attack)
		.inject(endTurn)
		.inject(startTurn);
};

const createRobotPlayer = function () {
	return new Player("robot", "bot")
		.inject(attack)
		.inject(endTurn)
		.inject(startTurn);
};

export { createHumanPlayer, createRobotPlayer };
