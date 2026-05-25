import Cell from "../cell/cell.js";
import { createSubmarine } from "../ship/shipFactory.js";

class Gameboard {
	#board;
	length = 10;

	constructor() {
		this.initBoardCell();
	}

	initBoardCell() {
		this.#board = Array.from({ length: this.length }, (_, row) =>
			Array.from({ length: this.length }, (_, col) => new Cell(`${row}${col}`)),
		);
	}

	getCell(pos) {
		const cell = this.#board[pos[0]][pos[1]];
		return cell;
	}

	placeShip = function (ship, coordinates) {
		coordinates.forEach((pos) => {
			const cell = this.#board[pos[0]][pos[1]];
			cell.setOccupiedByShip(ship);
		});

		return;
	};

	receiveAttack(pos) {
		const cell = this.#board[pos[0]][pos[1]];
		cell.takeHit();

		if (!cell.getOccupiedByShip()) return;

		const shipInCell = cell.getOccupiedByShip();
		shipInCell.hit();
	}
}

export default Gameboard;
