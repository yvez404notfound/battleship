import ATTACK_INDICATORS from "../../../assets/imgs/indicators/attackIndicators";
import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import { mockRobotData, mockUserData } from "../../../data/player";
import gameUI from "../../../pages/game";
import { generateRandVal } from "../../../utils/random";
import GameMaster from "../../gameMaster/gameMaster";
import Modal from "../modal/modal";
import ScreenManager from "../screenManager/screenManager";

class GameHandler {
	#userData;
	#robotData;
	#gameMaster;
	#modalHandler;

	constructor(data) {
		this.bodyEl = document.querySelector("body");
		this.#modalHandler = new Modal();
	}

	#renderShipsToGameboard(shipsData, playerName, state) {
		const gameboardEl = this.bodyEl.querySelector(
			`.player-game-info:${playerName.toLowerCase() === "robot" ? "last-child" : "first-child"} > .gameboard`,
		);
		const shipDataEntry = Object.entries(shipsData);

		shipDataEntry.forEach(([name, data]) => {
			const imgSpritePaths = SHIP[name];
			const [coords, axis] = Object.values(data);

			coords.forEach((pos, i) => {
				const cell = gameboardEl.querySelector(`.cell[data-position='${pos}']`);
				const img = document.createElement("img");
				img.classList = `ship-sprite ${axis} ${name} ${state}`;
				img.src = imgSpritePaths[i];
				cell.append(img);
			});
		});
	}

	#renderName(name) {
		const playerNameEl = this.bodyEl.querySelector(
			`.player-game-info:${name.toLowerCase() === "robot" ? "last-child" : "first-child"} .player-name > span > p`,
		);

		playerNameEl.textContent = name;
	}

	#renderTurnIndicator() {
		const currentPlayerType = this.#gameMaster.getCurrentPlayer().getType();

		const playerTurnIndicatorEl = this.bodyEl.querySelector(
			`.player-game-info:first-child .player-name > span > .turn-indicator`,
		);
		const enemyTurnIndicatorEl = this.bodyEl.querySelector(
			`.player-game-info:last-child .player-name > span > .turn-indicator`,
		);

		if (currentPlayerType === "human") {
			playerTurnIndicatorEl.classList.remove("hidden");
			enemyTurnIndicatorEl.classList.add("hidden");
		} else {
			enemyTurnIndicatorEl.classList.remove("hidden");
			playerTurnIndicatorEl.classList.add("hidden");
		}
	}

	renderPage() {
		this.bodyEl.innerHTML = gameUI();
		this.bodyEl.classList.add("game");
		this.bodyEl.classList.remove("start", "preparation");

		this.#userData = ScreenManager.getUserData();
		this.#robotData = ScreenManager.getRobotData();

		this.#gameMaster = new GameMaster();
		this.#gameMaster.initGame(this.#userData, this.#robotData);

		this.#renderShipsToGameboard(
			this.#userData.shipsData,
			this.#userData.name,
			"placed",
		);
		this.#renderName(this.#userData.name);

		this.#renderShipsToGameboard(
			this.#robotData.shipsData,
			this.#robotData.name,
			"placed",
		);
		this.#renderName(this.#robotData.name);

		this.#renderTurnIndicator();

		if (this.#gameMaster.getCurrentPlayer().getType() === "robot")
			this.#takeTurnRobot();
	}

	#renderCellStatus(missed, cell) {
		const { hit, miss } = ATTACK_INDICATORS;
		const className = Object.keys(ATTACK_INDICATORS);

		const img = document.createElement("img");
		img.src = missed ? miss : hit;
		img.alt = "Ship indicator";
		img.className = `attack-indicator ${missed ? className[1] : className[0]}`;

		cell.replaceChildren(img);
	}

	#updateShipIndicators(shipsLeft, shipIndicators) {
		const shipTypesLeft = Object.values(shipsLeft).map((ship) =>
			ship._type.toLowerCase().replace(" ", "-"),
		);

		shipIndicators.forEach((ship) => {
			if (!shipTypesLeft.includes(ship.classList[1]))
				ship.classList.replace("focused", "destroyed");
		});
	}

	#renderShipsLeft() {
		const [p1, p2] = this.#gameMaster.getPlayers();

		const p1ShipsLeft = p1.getShipsLeft();
		const p1ShipIndicators = this.bodyEl.querySelectorAll(
			`.player-game-info:first-child > .ships-indicator > .ships .ship`,
		);
		this.#updateShipIndicators(p1ShipsLeft, p1ShipIndicators);

		const p2ShipsLeft = p2.getShipsLeft();
		const p2ShipsIndicators = this.bodyEl.querySelectorAll(
			`.player-game-info:last-child > .ships-indicator > .ships .ship`,
		);
		this.#updateShipIndicators(p2ShipsLeft, p2ShipsIndicators);
	}

	#updatePage(turnInfo, cell) {
		this.#renderTurnIndicator();
		this.#renderCellStatus(turnInfo.missed, cell);

		this.#renderShipsLeft();

		if (!turnInfo.winner) return;

		const winnerType = turnInfo.winner.getType();

		if (winnerType === "human") {
			this.#modalHandler.renderWinnerModal();
		} else {
			this.#modalHandler.renderDefeatModal();
		}
	}

	#takeTurnRobot() {
		let turnInfo;
		let pos;

		setTimeout(() => {
			while (!turnInfo?.success || !turnInfo) {
				pos = String(generateRandVal(99)).padStart(2, "0");
				console.log("Generated random value: ", pos);

				turnInfo = this.#gameMaster.takeTurn(pos);
				console.log("Turn Info robot again: ", turnInfo);
			}

			const cell = this.bodyEl.querySelector(
				`.player-game-info:first-child .gameboard > .cell[data-position='${pos}']`,
			);

			this.#updatePage(turnInfo, cell);
		}, 1500);

		return turnInfo;
	}

	#gameboardCellsClickEvent(cells) {
		cells.forEach((cell) => {
			cell.addEventListener("click", (e) => {
				let currentPlayerType = this.#gameMaster.getCurrentPlayer().getType();
				if (currentPlayerType === "robot") return;

				const { position } = e.currentTarget.dataset;

				const turnInfo = this.#gameMaster.takeTurn(position);
				console.log("Turn info: ", turnInfo);
				this.#updatePage(turnInfo, cell);

				currentPlayerType = this.#gameMaster.getCurrentPlayer().getType();
				if (currentPlayerType === "robot") this.#takeTurnRobot();
			});
		});
	}

	#forfeitBtnClickEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			const forfeitModal = this.bodyEl.querySelector(".forfeit-modal");

			if (forfeitModal) {
				forfeitModal.showModal();
			} else {
				this.#modalHandler.renderForfeitModal();
			}
		});
	}

	bindEvents() {
		const enemyGameboardCells = this.bodyEl.querySelectorAll(
			".player-game-info:last-child > .gameboard > .cell",
		);

		const forfeitBtn = this.bodyEl.querySelector(
			".player-game-info:first-child .forfeit-btn",
		);

		this.#gameboardCellsClickEvent(enemyGameboardCells);
		this.#forfeitBtnClickEvent(forfeitBtn);
	}
}

export default GameHandler;
