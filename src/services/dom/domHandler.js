import { SHIP } from "../../assets/imgs/ships/sprites/shipAssets";
import { renderHome } from "../../pages/home";
import { renderPreparationPage } from "../../pages/preparation";
import { convertAssetsToInlineSVG } from "../../utils/asset";

class DomHandler {
	#STATES = Object.freeze({
		HOME: "home",
		PREPARATION: "preparation",
		GAME: "game",
	});
	currentState = this.#STATES.HOME;

	userData = {
		name,
		shipsData: {
			aircraftCarrier: [],
			battleship: [],
			cruiser: [],
			submarine: [],
			destroyer: [],
		},
	};

	robotData = {
		name: "robot",
		shipsData: {
			aircraftCarrier: [],
			battleship: [],
			cruiser: [],
			submarine: [],
			destroyer: [],
		},
	};

	shipPositionVertices = {
		aircraftCarrier: [-2, -1, 0, 1, 2],
		battleship: [-1, 0, 1, 2],
		cruiser: [-1, 0, 1],
		submarine: [-1, 0, 1],
		destroyer: [0, 1],
	};

	shipPlacementStates = Object.keys(this.userData.shipsData);
	shipPlacementIdx = 0;
	currentShip = this.shipPlacementStates[this.shipPlacementIdx];
	shipPlacementAxis = "x";

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	changeState(newState) {
		if (!Object.values(this.#STATES).includes(newState))
			throw new Error("That state doesn't exists");
		this.currentState = newState;

		this.renderPage();
	}

	updateCurrentShipState() {
		if (this.shipPlacementIdx > this.shipPlacementStates.length - 1) return;
		this.shipPlacementIdx++;
		this.currentShip = this.shipPlacementStates[this.shipPlacementIdx];
	}

	undoCurrentShipState() {
		if (this.shipPlacementIdx === 0) return;
		this.shipPlacementIdx--;
		this.currentShip = this.shipPlacementStates[this.shipPlacementIdx];
	}

	renderPage() {
		switch (this.currentState) {
			case this.#STATES.HOME:
				this.initHome();
				break;
			case this.#STATES.PREPARATION:
				this.initPreparationPage();
				break;
			case this.#STATES.GAME:
				bodyEl.innerHTML = renderHome();
				break;
			default:
				bodyEl.innerHTML = renderHome();
				break;
		}
	}

	initHome() {
		this.bodyEl.innerHTML = renderHome();
		this.addEventListenersToHome();
		convertAssetsToInlineSVG();
	}

	addEventListenersToHome() {
		const startGameBtnEl = this.bodyEl.querySelector(".start-game-btn");
		startGameBtnEl.addEventListener("click", () => {
			this.changeState("preparation");
		});
	}

	initPreparationPage() {
		this.bodyEl.innerHTML = renderPreparationPage();
		this.addEventListenersToPreparationPage();
		convertAssetsToInlineSVG();
	}

	addEventListenersToPreparationPage() {
		const preparationEditorEl = this.bodyEl.querySelector(
			".preparation-editor",
		);

		const nameInputEl = preparationEditorEl.querySelector("input[name='name']");
		nameInputEl.addEventListener("input", (e) => {});

		const rotateBtn = preparationEditorEl.querySelector(".rotate-btn");
		rotateBtn.addEventListener("click", () => {
			this.shipPlacementAxis = this.shipPlacementAxis === "x" ? "y" : "x";
			console.log("Ship axis: ", this.shipPlacementAxis);
		});

		const undoBtn = preparationEditorEl.querySelector(".undo-btn");
		undoBtn.addEventListener("click", () => {
			this.undoShipPlacement();
		});

		const gameboardCells =
			preparationEditorEl.querySelectorAll(".gameboard > .cell");

		gameboardCells.forEach((cell) => {
			cell.addEventListener("click", (e) => {
				let targetEl = e.target;

				if (!targetEl.classList.contains("cell"))
					targetEl = e.target.parentElement;

				const position = targetEl.dataset.position;
				this.recordCurrentShipData(position);
			});

			cell.addEventListener("mouseenter", (e) => {
				if (this.areAllShipsPlaced()) return;

				const position = e.target.dataset.position;
				this.renderCurrentShipToGameboard(position, "placeholder");
			});

			cell.addEventListener("mouseleave", (e) => {
				if (this.areAllShipsPlaced()) return;

				const position = e.target.dataset.position;
				this.destroyCurrentShipToGameboard(position);
			});
		});
	}

	areAllShipsPlaced() {
		return this.shipPlacementIdx > this.shipPlacementStates.length - 1;
	}

	recordCurrentShipData(position) {
		if (this.areAllShipsPlaced()) return alert("All ships are already placed.");

		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];
		let cellsToBeFilled = [];
		let coordinates = [];

		for (let i = 0; i <= currentShipPositionVertices.length - 1; i++) {
			const vertex = currentShipPositionVertices[i];

			const cellPos = this.calculateAxis(
				this.shipPlacementAxis,
				position,
				vertex,
			);

			if (this.isPositionOutOfBounds(cellPos, position))
				return alert("This ship is out of bounds.");

			const cell = this.bodyEl.querySelector(
				`.cell[data-position='${cellPos}']`,
			);

			cellsToBeFilled.push(cell);
			coordinates.push(cellPos);
		}

		if (this.areCellsOccupied(cellsToBeFilled))
			return alert("Coordinates already occupied by other ship.");

		this.renderCurrentShipToGameboard(position, "ready");

		this.updateShipIndicators(this.shipPlacementIdx);

		this.userData.shipsData[this.currentShip] = coordinates;

		this.updateCurrentShipState();
		console.log("Ship location inserted: ", this.userData.shipsData);
	}

	renderCurrentShipToGameboard(position, state) {
		let cellsToBeFilled = [];
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacementAxis,
				position,
				vertex,
			);

			if (this.isPositionOutOfBounds(cellPos, position)) {
				cellsToBeFilled.push(null);
				return;
			}

			cellsToBeFilled.push(
				this.bodyEl.querySelector(`.cell[data-position='${cellPos}']`),
			);
		});

		const imgSpritePaths = SHIP[this.currentShip];
		const imgSpriteClass = `ship-sprite ${this.shipPlacementAxis}`;
		const isOutOfBounds = cellsToBeFilled.includes(null);
		const areCellsOccupied = this.areCellsOccupied(cellsToBeFilled);

		cellsToBeFilled.forEach((cell, i) => {
			if (cell === null) return;

			const isCellReady = cell.classList.contains("ready");

			cell.classList.add(state);
			if ((areCellsOccupied && !isCellReady) || isOutOfBounds)
				cell.classList.add("illegal");

			if (isCellReady) cell.classList.remove("illegal");

			const img = document.createElement("img");
			img.classList = imgSpriteClass;
			img.src = imgSpritePaths[i];
			cell.appendChild(img);
		});
	}

	isPositionOutOfBounds(targetPos, midPos) {
		const MIN = 0;
		const MAX = 99;

		const row = Number(midPos[0] + "0");
		const col = Number(row + 10) - 1;

		if ((targetPos < row || targetPos > col) && this.shipPlacementAxis === "x")
			return true;
		if (targetPos < MIN || targetPos > MAX) return true;

		return false;
	}

	areCellsOccupied(cells) {
		const hasChild = cells.some((cell) => {
			if (cell === null) return;
			const child = cell.querySelector("img");
			if (child !== null) return cell.classList.contains("ready");
		});

		return hasChild;
	}

	calculateAxis(axis, position, vertex) {
		let pos;

		if (axis === "x") {
			pos = `${+position + vertex}`;
		} else {
			pos = `${+position[0] + vertex}${position[1]}`;
			pos = Number(pos[0]) === 0 ? pos[1] : pos;
		}

		return pos < 10 && pos >= 0 ? `0${pos}` : pos;
	}

	destroyCurrentShipToGameboard(position) {
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];
		let cellsToBeDestroyed = [];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacementAxis,
				position,
				vertex,
			);

			if (this.isPositionOutOfBounds(cellPos, position)) {
				cellsToBeDestroyed.push(null);
				return;
			}

			cellsToBeDestroyed.push(
				this.bodyEl.querySelector(`.cell[data-position='${cellPos}']`),
			);
		});

		cellsToBeDestroyed.forEach((cell) => {
			if (cell === null || cell.classList.contains("ready")) return;
			cell.innerHTML = "";
			cell.classList.remove("illegal");
		});
	}

	updateShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[idx];
		ship.classList.replace("focused", "placed");

		const nextShip = ship.nextElementSibling;
		nextShip !== null && nextShip.classList.add("focused");
	}

	undoShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[this.shipPlacementIdx];
		ship.classList.remove("focused");

		const previousShip = ship.previousElementSibling;

		previousShip !== null &&
			previousShip.classList.replace("placed", "focused");
	}

	destroyPlacedShips(shipLocations) {
		let currentShipCoords = this.userData.shipsData[this.currentShip];

		const shipLocCells = currentShipCoords.map((pos) => {
			const cell = this.bodyEl.querySelector(`.cell[data-position="${pos}"]
			`);

			return cell;
		});

		shipLocCells.forEach((cell) => {
			cell.innerHTML = "";
			cell.classList.remove("placeholder", "ready");
		});

		this.userData.shipsData[this.currentShip] = [];
	}

	undoShipPlacement() {
		if (this.shipPlacementIdx === 0) return;
		this.undoShipIndicators();
		this.undoCurrentShipState();
		this.destroyPlacedShips();

		console.log("Ship location removed: ", this.userData.shipsData);
	}
}

export default DomHandler;
