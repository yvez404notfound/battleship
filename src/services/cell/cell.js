class Cell {
	#isHit = false;
	#occupiedByShip;
	#position;

	constructor(position, occupiedByShip) {
		this.#position = position;
		this.#occupiedByShip = occupiedByShip;
	}

	setOccupiedByShip(ship) {
		this.#occupiedByShip = ship;
	}

	getOccupiedByShip() {
		return this.#occupiedByShip;
	}

	takeHit() {
		this.#isHit = true;
	}

	getIsHit() {
		return this.#isHit;
	}

	isOccupied() {
		return this.#occupiedByShip ? true : false;
	}
}

export default Cell;
