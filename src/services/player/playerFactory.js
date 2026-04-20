import Player from "./player";
import { attack } from "./playerMethods";

const createHumanPlayer = function (name) {
	return new Player("human", name).inject(attack);
};

const createRobotPlayer = function () {
	return new Player("robot", "bot").inject(attack);
};

export { createHumanPlayer, createRobotPlayer };
