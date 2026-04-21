import { generateRandVal } from "../../utils/random.js";
import Gameboard from "../gameboard/gameboard.js";
import {
	createHumanPlayer,
	createRobotPlayer,
} from "../player/playerFactory.js";

const mockPlayerShipData = {
	aircraftCarrier: ["00", "01", "02", "03", "04"],
	battleship: ["10", "11", "12", "13"],
	cruiser: ["20", "21", "22"],
	submarine: ["30", "31", "32"],
	destroyer: ["40", "41"],
};

class GameMaster {
	players = [];
	currentTurnPlayer;
	turnValue;

	initGame = function (playerName, humanPlayerShipsData, robotPlayerShipsData) {
		const { humanPlayer, robotPlayer } = this.initPlayers(
			playerName,
			humanPlayerShipsData,
			robotPlayerShipsData,
		);

		this.decideWhosTurn();
	};

	initPlayers = function (
		playerName,
		humanPlayerShipsData,
		robotPlayerShipsData,
	) {
		const humanPlayer = createHumanPlayer(playerName, new Gameboard());
		humanPlayer.initShips(humanPlayerShipsData);

		const robotPlayer = createRobotPlayer(new Gameboard());
		robotPlayer.initShips(robotPlayerShipsData);

		this.players = [humanPlayer, robotPlayer];

		return {
			humanPlayer,
			robotPlayer,
		};
	};

	decideWhosTurn = function () {
		const value = generateRandVal(this.players.length - 1);

		const player = this.getPlayer(value);

		this.currentTurnPlayer = player;
		return (this.turnValue = value);
	};

	switchTurn = function () {
		this.turnValue = this.turnValue === 0 ? 1 : 0;
		this.currentTurnPlayer = this.getPlayer(this.turnValue);
		return this.turnValue;
	};

	startTurn = function (position, enemyGameboard) {
		this.currentTurnPlayer.attack(position, enemyGameboard);
		this.switchTurn();
	};

	getPlayer = function (index) {
		return this.players[index];
	};

	getPlayers = function () {
		return this.players;
	};
}

/*
const gamemasterTest = new GameMaster();
gamemasterTest.initPlayers("Yves", mockPlayerShipData, mockPlayerShipData);
// gamemasterTest.decideWhosTurn();
gamemasterTest.currentTurnPlayer = gamemasterTest.getPlayer(0);

const enemyGameboard = gamemasterTest.getPlayer(1).gameboard;
console.log("Enemy gameboard ", enemyGameboard.board[0][0]);

// debugger;
gamemasterTest.startTurn("00", enemyGameboard);

console.log("Current Game Status: ", gamemasterTest);

// console.log(gamemasterTest.decideWhosTurn());
*/

export default GameMaster;
