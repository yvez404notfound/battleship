class Cell {
	isHit = false;
	occupiedByShip;

	constructor(position, occupiedByShip) {
		this.position = position;
		this.occupiedByShip = occupiedByShip;
	}

	setOccupiedByShip(ship) {
		this.occupiedByShip = ship;
	}

	takeHit() {
		this.isHit = true;
	}
}

export default Cell;
