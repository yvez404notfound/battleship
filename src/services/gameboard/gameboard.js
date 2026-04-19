import { createSubmarine } from "../ship/ship.js";
import Cell from "./cell/cell.js";

class Gameboard {
	board;
	length = 10;

	constructor(assignedTo, ships) {
		this.assignedTo = assignedTo;
	}

	initBoardCell = function () {
		this.board = Array.from({ length: this.length }, (_, row) =>
			Array.from({ length: this.length }, (_, col) => new Cell(`${row}${col}`)),
		);
	};

	receiveAttack = function (position) {
		const cell = this.board[position[0]][position[1]];
		cell.setOccupiedByShip(createSubmarine());
		const shipInCell = cell.occupiedByShip;

		cell.takeHit();
		shipInCell.hit();
	};

	placeShip = function (
		ship = createSubmarine(),
		coordinates = ["00", "01", "03"],
	) {
		coordinates.forEach((pos) => {
			const cell = this.board[pos[0]][pos[1]];

			cell.setOccupiedByShip(ship);
		});

		return;
	};
}

const gameboardTest = new Gameboard("Yves");

gameboardTest.initBoardCell();
console.log(gameboardTest.board);

gameboardTest.receiveAttack("00");
gameboardTest.placeShip();
console.log(gameboardTest.board);

export default Gameboard;
