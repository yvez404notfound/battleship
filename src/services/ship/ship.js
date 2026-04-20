class Ship {
	constructor(type, length, coordinates) {
		this.type = type;
		this.length = length;
		this.coordinates = coordinates;
	}

	inject(method) {
		Object.assign(this, method(this));
		return this;
	}
}

export default Ship;
