import { generateRandVal } from "../../utils/random.js";
import Gameboard from "../gameboard/gameboard.js";
import {
	createHumanPlayer,
	createRobotPlayer,
} from "../player/playerFactory.js";

class GameMaster {
	#players = [];
	#playerInCurrentTurn;
	#turnValue;

	initPlayers(playerName, humanPlayerShipsData, robotPlayerShipsData) {
		const humanPlayer = createHumanPlayer(playerName, new Gameboard());

		humanPlayer.initShips(humanPlayerShipsData);

		const robotPlayer = createRobotPlayer(new Gameboard());

		robotPlayer.initShips(robotPlayerShipsData);

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

	initGame(userData, robotData) {
		this.initPlayers(userData.name, userData.shipsData, robotData.shipsData);
		this.decideWhosTurn();
	}

	getEnemyPlayer() {
		const pl =
			this.#players[this.#playerInCurrentTurn.getType() === "robot" ? 0 : 1];

		return pl;
	}

	didAttackMissed(position, enemyGameboard) {
		const attackedCell = enemyGameboard.getCell(position);
		return attackedCell.isOccupied() ? false : true;
	}

	switchTurn() {
		this.#turnValue = this.#turnValue === 0 ? 1 : 0;

		this.#playerInCurrentTurn = this.#players[this.#turnValue];

		return this.#turnValue;
	}

	checkWinner() {
		const enemyPlayer = this.getEnemyPlayer();

		return enemyPlayer.isDead() ? this.#playerInCurrentTurn : null;
	}

	takeTurn(position) {
		if (this.#playerInCurrentTurn.isPositionAttacked(position))
			return {
				success: false,
				message: "already_attacked",
			};

		const enemyGameboard = this.getEnemyPlayer().getGameboard();
		this.#playerInCurrentTurn.attack(position, enemyGameboard);

		const missed = this.didAttackMissed(position, enemyGameboard);

		const winner = this.checkWinner();
		if (!winner) this.switchTurn();

		return {
			success: true,
			missed,
			winner,
		};
	}

	getCurrentPlayer() {
		return this.#playerInCurrentTurn;
	}

	getPlayers() {
		return this.#players;
	}
}

export default GameMaster;
