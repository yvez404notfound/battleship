const attack = (state) => ({
	attack(position, enemyGameBoard) {
		state.recordedAttacks.push(position);
		enemyGameBoard.receiveAttack(position);
	},
});

const endTurn = (state) => ({
	endTurn() {
		state.isMyTurn = false;
	},
});

const startTurn = (state) => ({
	startTurn() {
		state.isMyTurn = true;
	},
});

export { attack, endTurn, startTurn };
