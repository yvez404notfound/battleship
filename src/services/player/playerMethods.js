import { createShip } from "../ship/shipFactory.js";

const attack = (state) => ({
	attack(position, enemyGameboard) {
		state.recordedAttacks.push(position);
		enemyGameboard.receiveAttack(position);
	},
});

const initShips = (state) => ({
	initShips(shipsData) {
		Object.entries(shipsData).forEach(([type, coordinates]) => {
			const ship = createShip(type, coordinates);
			state.ships.push(ship);

			state.gameboard.placeShip(ship, ship.coordinates);
		});
	},
});

export { attack, initShips };
