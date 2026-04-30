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

	gameboardEdges = {
		upper: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		right: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
		left: [0, 10, 20, 30, 40, 50, 60, 60, 80, 90],
		down: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
	};

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	changeState = function (newState) {
		if (!Object.values(this.#STATES).includes(newState))
			throw new Error("That state doesn't exists");
		this.currentState = newState;

		this.renderPage();
	};

	updateCurrentShipState = function () {
		if (this.shipPlacementIdx > this.shipPlacementStates.length - 1) return;
		this.shipPlacementIdx++;
		this.currentShip = this.shipPlacementStates[this.shipPlacementIdx];
	};

	renderPage = function () {
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
	};

	initHome = function () {
		this.bodyEl.innerHTML = renderHome();
		this.addEventListenersToHome();
		convertAssetsToInlineSVG();
	};

	addEventListenersToHome = function () {
		const startGameBtnEl = this.bodyEl.querySelector(".start-game-btn");
		startGameBtnEl.addEventListener("click", () => {
			this.changeState("preparation");
		});
	};

	initPreparationPage = function () {
		this.bodyEl.innerHTML = renderPreparationPage();
		this.addEventListenersToPreparationPage();
		convertAssetsToInlineSVG();
	};

	addEventListenersToPreparationPage = function () {
		const preparationEditorEl = this.bodyEl.querySelector(
			".preparation-editor",
		);

		const nameInputEl = preparationEditorEl.querySelector("input[name='name']");
		nameInputEl.addEventListener("input", (e) => {
			this.userData.name = e.target.value;
			//console.log(this.userData.name);
		});

		const shipIndicators =
			preparationEditorEl.querySelectorAll(".ships > .ship");

		const rotateBtn = preparationEditorEl.querySelector(".rotate-btn");
		rotateBtn.addEventListener("click", () => {
			this.shipPlacementAxis = this.shipPlacementAxis === "x" ? "y" : "x";
			console.log("Ship axis: ", this.shipPlacementAxis);
		});

		const gameboardCells =
			preparationEditorEl.querySelectorAll(".gameboard > .cell");

		gameboardCells.forEach((cell) => {
			cell.addEventListener("click", (e) => {
				this.recordCurrentShipData(e.target.dataset.position, shipIndicators);
			});

			cell.addEventListener("mouseenter", (e) => {
				const position = e.target.dataset.position;

				if (this.isCurrentShipPositionOutOfBounds(position)) return;

				this.renderCurrentShipToGameboard(position);
			});

			cell.addEventListener("mouseleave", (e) => {
				const position = e.target.dataset.position;

				if (this.isCurrentShipPositionOutOfBounds(position)) {
					console.log("Ship out of bounds");
					return;
				}

				if (position) this.destroyCurrentShipToGameboard(position);

				console.log("cursor left", e.target.dataset.position);
			});
		});
	};

	recordCurrentShipData = function (startingPosition, shipIndicators) {
		if (this.shipPlacementIdx > this.shipPlacementStates.length - 1)
			return alert("All ships are already placed.");

		this.userData.shipsData[this.currentShip] = startingPosition;
		updateShipIndicators(shipIndicators, this.shipPlacementIdx);

		this.updateCurrentShipState();
		console.log("Current State: ", this);
	};

	renderCurrentShipToGameboard = function (position) {
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];

		const cellsToBeFilled = currentShipPositionVertices.map((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacementAxis,
				position,
				vertex,
			);
			return this.bodyEl.querySelector(
				`.cell[data-position='${cellPos < 10 ? `0${cellPos}` : cellPos}']`,
			);
		});
		console.log("cells to be filled", cellsToBeFilled);

		const imgSpritePaths = SHIP[this.currentShip];
		const imgSpriteClass = `ship-sprite ${this.shipPlacementAxis}`;

		cellsToBeFilled.forEach((cell, i) => {
			const img = document.createElement("img");
			img.classList = imgSpriteClass;
			img.src = imgSpritePaths[i];
			cell.appendChild(img);
		});
	};

	isCurrentShipPositionOutOfBounds = function (position) {
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];

		const shipPosition = currentShipPositionVertices.map((vertex) => {
			return this.calculateAxis(this.shipPlacementAxis, position, vertex);
		});

		console.log("Ship Position: ", shipPosition);

		let isOutOfBounds = shipPosition.some((pos) =>
			this.isPositionOutOfBounds(this.shipPlacementAxis, pos, position),
		);

		return isOutOfBounds;
	};

	isPositionOutOfBounds = function (axis, targetPos, midPos) {
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];

		const xEdges = [
			Number(`${midPos[0]}0`) - 1,
			Number(+midPos[0] + 1 + `0`) - 1,
		];
		const yEdges = [
			Number(+midPos[0] + currentShipPositionVertices[0] + `${midPos[1]}`) - 1,
			Number(
				+midPos[0] +
					currentShipPositionVertices[currentShipPositionVertices.length - 1] +
					`${midPos[1]}`,
			) + 1,
		];

		console.log("X Edges: ", yEdges);
		console.log("Y Edges: ", yEdges);

		switch (axis) {
			case "x":
				return (
					targetPos < xEdges[0] ||
					targetPos > xEdges[1] ||
					targetPos < 0 ||
					targetPos > 99
				);
			case "y":
				return (
					targetPos < yEdges[0] ||
					targetPos > yEdges[1] ||
					targetPos < 0 ||
					targetPos > 99
				);
			default:
				return;
		}
	};

	calculateAxis = function (axis, position, vertex) {
		switch (axis) {
			case "x":
				return +position + vertex;
			case "y":
				return `${+position[0] + vertex}${position[1]}`;
			default:
				return;
		}
	};

	destroyCurrentShipToGameboard = function (position) {
		const currentShipPositionVertices =
			this.shipPositionVertices[this.currentShip];

		const cellsToBeFilled = currentShipPositionVertices.map((vertex) => {
			const cellPos = this.calculateAxis(
				this.shipPlacementAxis,
				position,
				vertex,
			);
			// console.log("celpos: ", cellPos);
			return this.bodyEl.querySelector(
				`.cell[data-position='${cellPos < 10 ? `0${cellPos}` : cellPos}']`,
			);
		});

		cellsToBeFilled.forEach((cell) => {
			cell.innerHTML = "";
		});
	};
}

const updateShipIndicators = function (shipIndicators, idx) {
	const ship = shipIndicators[idx];
	ship.classList.replace("focused", "placed");

	const nextShip = ship.nextElementSibling;
	if (nextShip !== null) nextShip.classList.add("focused");
};

export default DomHandler;
