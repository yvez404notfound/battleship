class Ship {
	constructor(type, length, coordinates) {
		this._type = type;
		this._length = length;
		this._coordinates = coordinates;
	}

	inject(method) {
		Object.assign(this, method(this));
		return this;
	}
}

export default Ship;
