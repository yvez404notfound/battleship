import { createShip } from "../ship/shipFactory.js";

const attack = (state) => ({
	attack(position, enemyGameboard) {
		state._recordedAttacks.push(position);
		enemyGameboard.receiveAttack(position);
	},
});

const initShips = (state) => ({
	initShips(shipsData) {
		Object.entries(shipsData).forEach(([type, data]) => {
			const { coords } = data;

			const ship = createShip(type, coords);
			state._ships.push(ship);

			// state.gameboard.placeShip(ship, ship.coordinates);
		});
	},
});

const placeShipsToGameboard = (state) => ({
	placeShipsToGameboard() {
		console.log(`Ships in Player ${state.name}`);
		console.log(state._ships);
		state._ships.forEach((ship) => {
			state._gameboard.placeShip(ship, ship._coordinates);
		});
	},
});

const getShipsLeft = (ships) => {
	const s = ships.filter((ship) => {
		if (!ship.isSunk()) return ship;
	});

	console.log("Ships left: ", s);

	return s;
};

const isDead = (state) => ({
	isDead() {
		const shipsLeft = getShipsLeft(state._ships);
		return shipsLeft <= 0 ? true : false;
	},
});

const isPositionAttacked = (state) => ({
	isPositionAttacked(position) {
		return state._recordedAttacks.includes(position) ? true : false;
	},
});

export { attack, initShips, isDead, isPositionAttacked, placeShipsToGameboard };
