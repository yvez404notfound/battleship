const attack = (state) => ({
	attack(position, enemyGameBoard) {
		state.recordedAttacks.push(position);
		enemyGameBoard.receiveAttack(position);
	},
});

export { attack };
