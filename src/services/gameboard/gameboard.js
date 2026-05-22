import Cell from "../cell/cell.js";
import { createSubmarine } from "../ship/shipFactory.js";

class Gameboard {
	#board;
	length = 10;

	constructor() {
		this.initBoardCell();
	}

	initBoardCell = function () {
		this.#board = Array.from({ length: this.length }, (_, row) =>
			Array.from({ length: this.length }, (_, col) => new Cell(`${row}${col}`)),
		);
	};

	receiveAttack = function (position) {
		const cell = this.#board[position[0]][position[1]];

		if (cell.getOccupiedByShip() === undefined) return;

		cell.takeHit();

		const shipInCell = cell.getOccupiedByShip();
		shipInCell.hit();
	};

	placeShip = function (ship, coordinates) {
		coordinates.forEach((pos) => {
			const cell = this.#board[pos[0]][pos[1]];
			cell.setOccupiedByShip(ship);
		});

		return;
	};

	getCell(pos) {
		const cell = this.#board[pos[0]][pos[1]];
		return cell;
	}
}

// const gameboardTest = new Gameboard("Yves");

/* 
gameboardTest.initBoardCell();
console.log(gameboardTest.board);

gameboardTest.receiveAttack("00");
gameboardTest.placeShip();
console.log(gameboardTest.board); 
*/

export default Gameboard;
