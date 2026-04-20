class Player {
	ships = [];
	recordedAttacks = [];
	isMyTurn = false;

	constructor(type, name, gameboard) {
		this.type = type;
		this.name = name;
		this.gameboard = gameboard;
	}

	inject(method) {
		Object.assign(this, method(this));
		return this;
	}
}

export default Player;
