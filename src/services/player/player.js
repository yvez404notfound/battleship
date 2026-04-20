class Player {
	ships = [];
	recordedAttacks = [];

	constructor(type, name, gameboard) {
		this.type = type;
		this.name = name;
		this.gameboard = gameboard;
	}

	inject = function (method) {
		Object.assign(this, method);
		return this;
	};
}

export default Player;
