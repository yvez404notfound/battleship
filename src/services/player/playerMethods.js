import { createShip } from "../ship/shipFactory.js";

const initShips = (state) => ({
	initShips(shipsData) {
		Object.entries(shipsData).forEach(([type, data]) => {
			const { coords } = data;

			const ship = createShip(type, coords);
			state._ships.push(ship);

			// Place ship to gameboard
			state._gameboard.placeShip(ship, ship._coordinates);
		});
	},
});

const attack = (state) => ({
	attack(position, enemyGameboard) {
		state._recordedAttacks.push(position);
		enemyGameboard.receiveAttack(position);
	},
});

const getShipsLeft = (ships) => {
	const s = ships.filter((ship) => {
		if (!ship.isSunk()) return ship;
	});
	return s;
};

const isDead = (state) => ({
	isDead() {
		const shipsLeft = getShipsLeft(state._ships);
		return shipsLeft.length <= 0 ? true : false;
	},
});

const isPositionAttacked = (state) => ({
	isPositionAttacked(position) {
		return state._recordedAttacks.includes(position) ? true : false;
	},
});

const getGameboard = (state) => ({
	getGameboard() {
		return state._gameboard;
	},
});

const getType = () => ({
	getType() {
		return this._type;
	},
});

export { attack, getGameboard, getType, initShips, isDead, isPositionAttacked };
