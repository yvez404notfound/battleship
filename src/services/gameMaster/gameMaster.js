import { generateRandVal } from "../../utils/random.js";
import Gameboard from "../gameboard/gameboard.js";
import {
	createHumanPlayer,
	createRobotPlayer,
} from "../player/playerFactory.js";

// const mockPlayerShipData = {
// 	aircraftCarrier: ["00", "01", "02", "03", "04"],
// 	battleship: ["10", "11", "12", "13"],
// 	cruiser: ["20", "21", "22"],
// 	submarine: ["30", "31", "32"],
// 	destroyer: ["40", "41"],
// };

class GameMaster {
	#players = [];
	#playerInCurrentTurn;
	#turnValue;

	initGame(userData, robotData) {
		const { humanPlayer, robotPlayer } = this.initPlayers(
			userData.name,
			userData.shipsData,
			robotData.shipsData,
		);

		this.decideWhosTurn();

		console.log("Game master initiated...");
		console.log("Current turn: ", this.#playerInCurrentTurn.name);
		// console.log("Next turn: ", this.getEnemyPlayer().name);
		console.log("Game state: ", this);
		console.log("\n");
	}

	initPlayers(playerName, humanPlayerShipsData, robotPlayerShipsData) {
		const humanPlayer = createHumanPlayer(playerName, new Gameboard());
		humanPlayer.initShips(humanPlayerShipsData);
		humanPlayer.placeShipsToGameboard();

		const robotPlayer = createRobotPlayer(new Gameboard());
		robotPlayer.initShips(robotPlayerShipsData);
		robotPlayer.placeShipsToGameboard();

		this.#players = [humanPlayer, robotPlayer];

		return {
			humanPlayer,
			robotPlayer,
		};
	}

	decideWhosTurn() {
		const value = generateRandVal(this.#players.length - 1);

		const player = this.#players[value];

		this.#playerInCurrentTurn = player;
		return (this.#turnValue = value);
	}

	switchTurn() {
		this.#turnValue = this.#turnValue === 0 ? 1 : 0;

		this.#playerInCurrentTurn = this.#players[this.#turnValue];

		return this.#turnValue;
	}

	getEnemyPlayer() {
		const pl =
			this.#players[this.#playerInCurrentTurn.getType() === "robot" ? 0 : 1];

		return pl;
	}

	willAttackMiss(position, enemyGameboard) {
		const attackedCell = enemyGameboard.getCell(position);
		return attackedCell.isOccupied() ? false : true;
	}

	checkWinner() {
		const enemyPlayer = this.getEnemyPlayer();

		return enemyPlayer.isDead() ? this.#playerInCurrentTurn : null;
	}

	takeTurn(position) {
		console.log(
			`Player ${this.#playerInCurrentTurn.name} attacked ${this.getEnemyPlayer().name} gameboard at position ${position}`,
		);

		if (this.#playerInCurrentTurn.isPositionAttacked(position))
			return {
				sucess: false,
				message: "already_attacked",
			};

		const enemyGameboard = this.getEnemyPlayer().getGameboard();

		const willMiss = this.willAttackMiss(position, enemyGameboard);

		if (!willMiss) this.#playerInCurrentTurn.attack(position, enemyGameboard);

		console.log(`Attacked Player: ${this.getEnemyPlayer().name}`);
		console.log(`Attacked Player status`, this.getEnemyPlayer());

		const winner = this.checkWinner();
		if (!winner) this.switchTurn();

		console.log("\n");
		console.log("Current turn: ", this.#playerInCurrentTurn.name);
		console.log("Next turn: ", this.getEnemyPlayer().name);
		console.log("\n");

		return {
			success: true,
			missed: willMiss,
			winner,
		};
	}

	getPlayer(index) {
		return this.#players[index];
	}

	getPlayers() {
		return this.#players;
	}
}

/*
const gamemasterTest = new GameMaster();
gamemasterTest.initPlayers("Yves", mockPlayerShipData, mockPlayerShipData);
// gamemasterTest.decideWhosTurn();
gamemasterTest.playerInCurrentTurn = gamemasterTest.getPlayer(0);

const enemyGameboard = gamemasterTest.getPlayer(1).gameboard;
console.log("Enemy gameboard ", enemyGameboard.board[0][0]);

// debugger;
gamemasterTest.startTurn("00", enemyGameboard);

console.log("Current Game Status: ", gamemasterTest);

// console.log(gamemasterTest.decideWhosTurn());
*/

export default GameMaster;
