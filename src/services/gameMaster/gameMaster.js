import { generateRandVal } from "../../utils/random.js";
import {
	createHumanPlayer,
	createRobotPlayer,
} from "../player/playerFactory.js";

class GameMaster {
	players = [];

	initPlayers = function (humanPlayerName, humanPlayerShipsCoordinates) {
		this.players.push(createHumanPlayer(humanPlayerName));
		this.players.push(createRobotPlayer());
	};

	decideWhosTurn = function () {
		const value = generateRandVal(this.players.length - 1);

		const player = this.getPlayer(value);
		player.startTurn();

		return value;
	};

	getPlayer = function (index) {
		return this.players[index];
	};
}

/* const gamemasterTest = new GameMaster();
gamemasterTest.initPlayers("Yves");
// console.log(gamemasterTest.players);

console.log(gamemasterTest.decideWhosTurn()); */

export default GameMaster;
