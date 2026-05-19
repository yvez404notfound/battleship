import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import gameUI from "../../../pages/game";
import ScreenManager from "../screenManager/screenManager";

class GameHandler {
	shipsData = {
		aircraftCarrier: {
			coords: ["22", "23", "24", "25", "26"],
			axis: "x",
		},
		battleship: {
			coords: ["38", "48", "58", "68"],
			axis: "y",
		},
		cruiser: {
			coords: ["62", "63", "64"],
			axis: "x",
		},
		submarine: {
			coords: ["66", "76", "86"],
			axis: "y",
		},
		destroyer: {
			coords: ["92", "93"],
			axis: "x",
		},
	};
	// x y x y x

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	renderPage() {
		this.bodyEl.innerHTML = gameUI();
		this.bodyEl.classList.add("game");
		this.bodyEl.classList.remove("start", "preparation");

		this.renderShipsToGameboard();
	}

	renderShipsToGameboard(shipsData) {
		const shipDataEntry = Object.entries(this.shipsData);

		console.log(shipDataEntry);

		shipDataEntry.forEach(([name, data]) => {
			const imgSpritePaths = SHIP[name];

			const [coords, axis] = Object.values(data);

			coords.forEach((pos, i) => {
				const cell = this.bodyEl.querySelector(`.cell[data-position='${pos}']`);
				const img = document.createElement("img");
				img.classList = `ship-sprite ${axis} ${name}`;
				img.src = imgSpritePaths[i];
				cell.append(img);
			});
		});
	}

	robotShipsData = {
		aircraftCarrier: {
			coords: [],
			axis: "",
		},
		battleship: {
			coords: [],
			axis: "",
		},
		cruiser: {
			coords: [],
			axis: "",
		},
		submarine: {
			coords: [],
			axis: "",
		},
		destroyer: {
			coords: [],
			axis: "",
		},
	};

	bindEvents() {}
}

export default GameHandler;
