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

	setIsHit(bool) {
		this.isHit = bool;
	}
}

export default Cell;
