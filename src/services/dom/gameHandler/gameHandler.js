import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import gameUI from "../../../pages/game";
import ScreenManager from "../screenManager/screenManager";

class GameHandler {
	#userData;
	#robotData;

	constructor(data) {
		this.bodyEl = document.querySelector("body");
	}

	renderPage() {
		this.bodyEl.innerHTML = gameUI();
		this.bodyEl.classList.add("game");
		this.bodyEl.classList.remove("start", "preparation");

		this.#userData = ScreenManager.getUserData();
		this.#robotData = ScreenManager.getRobotData();

		this.renderShipsToGameboard(
			this.#userData.shipsData,
			this.#userData.name,
			"placed",
		);
		this.renderName(this.#userData.name);

		this.renderShipsToGameboard(
			this.#robotData.shipsData,
			this.#robotData.name,
			"placed",
		);
		this.renderName(this.#robotData.name);
	}

	renderShipsToGameboard(shipsData, playerName, state) {
		const gameboardEl = this.bodyEl.querySelector(
			`.player-game-info:${playerName.toLowerCase() === "robot" ? "last-child" : "first-child"} > .gameboard`,
		);
		const shipDataEntry = Object.entries(shipsData);

		console.log(shipDataEntry);

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

	renderFogOfWarToGameboard() {}

	renderName(name) {
		const playerNameEl = this.bodyEl.querySelector(
			`.player-game-info:${name.toLowerCase() === "robot" ? "last-child" : "first-child"} .player-name > span > p`,
		);

		playerNameEl.textContent = name;
	}

	bindEvents() {}
}

export default GameHandler;
