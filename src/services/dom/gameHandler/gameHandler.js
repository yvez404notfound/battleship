import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import gameUI from "../../../pages/game";
import GameMaster from "../../gameMaster/gameMaster";
import ScreenManager from "../screenManager/screenManager";

const mockUserData = {
	name: "Yves",
	shipsData: {
		aircraftCarrier: {
			coords: ["21", "22", "23", "24", "25"],
			axis: "x",
		},
		battleship: {
			coords: ["49", "59", "69", "79"],
			axis: "y",
		},
		cruiser: {
			coords: ["62", "63", "64"],
			axis: "x",
		},
		submarine: {
			coords: ["56", "57", "58"],
			axis: "x",
		},
		destroyer: {
			coords: ["18", "28"],
			axis: "y",
		},
	},
};

const mockRobotData = {
	name: "Robot",
	shipsData: {
		aircraftCarrier: {
			coords: ["29", "39", "49", "59", "69"],
			axis: "y",
		},
		battleship: {
			coords: ["25", "35", "45", "55"],
			axis: "y",
		},
		cruiser: {
			coords: ["78", "88", "98"],
			axis: "y",
		},
		submarine: {
			coords: ["41", "51", "61"],
			axis: "y",
		},
		destroyer: {
			coords: ["03", "13"],
			axis: "y",
		},
	},
};

class GameHandler {
	#userData;
	#robotData;
	gameMaster;

	constructor(data) {
		this.bodyEl = document.querySelector("body");
	}

	renderShipsToGameboard(shipsData, playerName, state) {
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

	renderName(name) {
		const playerNameEl = this.bodyEl.querySelector(
			`.player-game-info:${name.toLowerCase() === "robot" ? "last-child" : "first-child"} .player-name > span > p`,
		);

		playerNameEl.textContent = name;
	}

	renderPage() {
		this.bodyEl.innerHTML = gameUI();
		this.bodyEl.classList.add("game");
		this.bodyEl.classList.remove("start", "preparation");

		// this.#userData = ScreenManager.getUserData();
		// this.#robotData = ScreenManager.getRobotData();

		this.gameMaster = new GameMaster();
		this.gameMaster.initGame(mockUserData, mockRobotData);

		this.renderShipsToGameboard(
			mockUserData.shipsData,
			mockUserData.name,
			"placed",
		);
		this.renderName(mockUserData.name);

		this.renderShipsToGameboard(
			mockRobotData.shipsData,
			mockRobotData.name,
			"placed",
		);
		this.renderName(mockRobotData.name);
	}

	gameboardCellsClickEvent(cells) {
		cells.forEach((cell) => {
			cell.addEventListener("click", (e) => {
				const { position } = e.currentTarget.dataset;

				const turnInfo = this.gameMaster.takeTurn(position);
				console.log("\n");
				console.log("Turn info: ", turnInfo);
				console.log("\n");
			});
		});
	}

	bindEvents() {
		const enemyGameboardCells = this.bodyEl.querySelectorAll(
			".player-game-info:last-child > .gameboard .cell",
		);

		this.gameboardCellsClickEvent(enemyGameboardCells);
	}
}

export default GameHandler;
