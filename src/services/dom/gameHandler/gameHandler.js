import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import { mockRobotData, mockUserData } from "../../../data/player";
import gameUI from "../../../pages/game";
import GameMaster from "../../gameMaster/gameMaster";
import ScreenManager from "../screenManager/screenManager";

class GameHandler {
	#userData;
	#robotData;
	#gameMaster;

	constructor(data) {
		this.bodyEl = document.querySelector("body");
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

		console.log("Current Player Type", currentPlayerType);

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
	}

	#gameboardCellsClickEvent(cells) {
		cells.forEach((cell) => {
			cell.addEventListener("click", (e) => {
				const { position } = e.currentTarget.dataset;

				const turnInfo = this.#gameMaster.takeTurn(position);
				console.log("\n");
				console.log("Turn info: ", turnInfo);
				console.log("\n");

				this.#renderTurnIndicator();
			});
		});
	}

	bindEvents() {
		const enemyGameboardCells = this.bodyEl.querySelectorAll(
			".player-game-info:last-child > .gameboard > .cell",
		);

		this.#gameboardCellsClickEvent(enemyGameboardCells);
	}
}

export default GameHandler;
