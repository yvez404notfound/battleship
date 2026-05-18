import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import preparationPageUI from "../../../pages/preparation";
import ScreenManager from "../screenManager/screenManager";

class PreparationHandler {
	SHIP_POSITION_VERTICES = {
		aircraftCarrier: [-2, -1, 0, 1, 2],
		battleship: [-1, 0, 1, 2],
		cruiser: [-1, 0, 1],
		submarine: [-1, 0, 1],
		destroyer: [0, 1],
	};

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

	shipPlacement = {
		states: Object.keys(this.userData.shipsData),
		idx: 0,
		axis: "x",
	};

	currentShip = this.shipPlacement.states[this.shipPlacement.idx];

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	renderPage() {
		this.bodyEl.innerHTML = preparationPageUI();
		this.bodyEl.classList.add("preparation");
		this.bodyEl.classList.remove("start", "game");
	}

	nameInputEvent(inputEl) {
		inputEl.setCustomValidity(
			"We must know your name before we battle, Admiral.",
		);

		inputEl.addEventListener("input", (e) => {
			this.userData.name = e.target.value;
			console.log("Name: ", this.userData.name);
		});
	}

	rotateBtnEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			this.shipPlacement.axis = this.shipPlacement.axis === "x" ? "y" : "x";
			console.log("Ship placement axis changed: ", this.shipPlacement.axis);
		});
	}

	undoShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[this.shipPlacement.idx];
		ship.classList.replace("placed", "focused");

		const nextShip = ship.nextElementSibling;
		console.log("Next ship: ", nextShip);

		if (nextShip !== null) nextShip.classList.remove("focused", "placed");
	}

	undoCurrentShipState() {
		if (this.shipPlacement.idx === 0) return;

		const shipsData = Object.values(this.userData.shipsData);

		if (shipsData[shipsData.length - 1].length < 1) this.shipPlacement.idx--;

		this.currentShip = this.shipPlacement.states[this.shipPlacement.idx];
	}

	undoShipDataRecord() {
		this.userData.shipsData[this.currentShip] = [];
	}

	destroyPlacedShips(currShipCoords) {
		let shipLocCells = currShipCoords.map((pos) => {
			const cell = this.bodyEl.querySelector(`.cell[data-position="${pos}"]
			`);

			return cell;
		});

		shipLocCells.forEach((cell) => {
			cell.innerHTML = "";
			cell.classList.remove("placeholder", "ready");
		});
	}

	undoShipPlacement() {
		if (this.shipPlacement.idx === 0) return;

		this.undoCurrentShipState();

		const currShipCoords = this.userData.shipsData[this.currentShip];

		this.undoShipDataRecord();

		this.undoShipIndicators();

		this.destroyPlacedShips(currShipCoords);

		console.log("Ship location removed: ", this.userData.shipsData);
		console.log("Current ship state: ", this.currentShip);
	}

	undoBtnEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			this.undoShipPlacement();
		});
	}

	areAllShipsPlaced() {
		const shipsData = Object.values(this.userData.shipsData);
		// console.log("Ships data fetched: ", shipsData);
		return shipsData[shipsData.length - 1].length > 0;
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

	isPositionOutOfBounds(targetPos, midPos) {
		const MIN = 0;
		const MAX = 99;

		const row = Number(midPos[0] + "0");
		const col = Number(row + 10) - 1;

		if ((targetPos < row || targetPos > col) && this.shipPlacement.axis === "x")
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

	renderCurrentShipToGameboard(position, state) {
		let cellsToBeFilled = [];
		const currentShipPositionVertices =
			this.SHIP_POSITION_VERTICES[this.currentShip];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacement.axis,
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
		const imgSpriteClass = `ship-sprite ${this.shipPlacement.axis}`;
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

	gameboardCellHoverEvent(cell) {
		cell.addEventListener("mouseenter", (e) => {
			if (this.areAllShipsPlaced()) return;

			const position = e.target.dataset.position;
			this.renderCurrentShipToGameboard(position, "placeholder");
		});
	}

	destroyCurrentShipToGameboard(position) {
		const currentShipPositionVertices =
			this.SHIP_POSITION_VERTICES[this.currentShip];
		let cellsToBeDestroyed = [];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacement.axis,
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
			cell.classList.remove("illegal", "placeholder");
		});
	}

	gameboardCellMouseLeaveEvent(cell) {
		cell.addEventListener("mouseleave", (e) => {
			if (this.areAllShipsPlaced()) return;

			const position = e.target.dataset.position;
			this.destroyCurrentShipToGameboard(position);
		});
	}

	updateShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[idx];
		ship.classList.replace("focused", "placed");

		const nextShip = ship.nextElementSibling;
		if (nextShip !== null) nextShip.classList.add("focused");
	}

	updateCurrentShipState() {
		const shipLength = this.shipPlacement.states.length - 1;
		if (this.shipPlacement.idx >= shipLength) return;

		this.shipPlacement.idx++;
		this.currentShip = this.shipPlacement.states[this.shipPlacement.idx];

		console.log("Ship placement updated: ", this.shipPlacement);
		console.log("Current ship: ", this.currentShip);
	}

	recordCurrentShipData(position) {
		if (this.areAllShipsPlaced()) return alert("All ships are already placed.");

		const currentShipPositionVertices =
			this.SHIP_POSITION_VERTICES[this.currentShip];
		let cellsToBeFilled = [];
		let coordinates = [];

		for (let i = 0; i <= currentShipPositionVertices.length - 1; i++) {
			const vertex = currentShipPositionVertices[i];

			const cellPos = this.calculateAxis(
				this.shipPlacement.axis,
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
		this.updateShipIndicators(this.shipPlacement.idx);

		this.userData.shipsData[this.currentShip] = coordinates;

		this.updateCurrentShipState();
		console.log("Ship location inserted: ", this.userData.shipsData);
	}

	gameboardCellClickEvent(cell) {
		cell.addEventListener("click", (e) => {
			let targetEl = e.target;

			if (!targetEl.classList.contains("cell"))
				targetEl = e.target.parentElement;

			const position = targetEl.dataset.position;
			this.recordCurrentShipData(position);
		});
	}

	gameboardCellsEvents(cells) {
		cells.forEach((cell) => {
			this.gameboardCellHoverEvent(cell);
			this.gameboardCellMouseLeaveEvent(cell);
			this.gameboardCellClickEvent(cell);
		});
	}

	confirmPreparationEvent(buttonElement, nameInputEl) {
		buttonElement.addEventListener("click", () => {
			if (!this.areAllShipsPlaced()) return alert("Place all the ships first.");
			if (this.userData.name === "") return nameInputEl.reportValidity();

			console.log("Ready for Battle");

			ScreenManager.changeState("HOME");
		});
	}

	bindEvents() {
		const nameInputEl = this.bodyEl.querySelector("input[name='name']");
		const rotateBtn = this.bodyEl.querySelector(".rotate-btn");
		const undoBtn = this.bodyEl.querySelector(".undo-btn");
		const gameboardCells = this.bodyEl.querySelectorAll(".cell");
		const confirmBtn = this.bodyEl.querySelector(".confirm-preparation");

		this.nameInputEvent(nameInputEl);
		this.rotateBtnEvent(rotateBtn);
		this.undoBtnEvent(undoBtn);
		this.gameboardCellsEvents(gameboardCells);
		this.confirmPreparationEvent(confirmBtn, nameInputEl);
	}
}

export default PreparationHandler;
