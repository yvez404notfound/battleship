class Player {
	_ships = [];
	_recordedAttacks = [];
	_type;

	constructor(type, name, gameboard) {
		this._type = type;
		this._gameboard = gameboard;

		this.name = name;
	}

	getGameboard() {
		return this._gameboard;
	}

	getType() {
		return this._type;
	}

	inject(method) {
		Object.assign(this, method(this));
		return this;
	}
}

export default Player;
