import Ship from "./ship";
import { createShip } from "./shipFactory";
import { getHP, hit, isSunk } from "./shipMethods";

describe("Ship class test", () => {
	let ship;

	describe("Ship methods", () => {
		beforeEach(() => {
			ship = new Ship("Test ship", 2, ["00", "01"])
				.inject(getHP)
				.inject(hit)
				.inject(isSunk);
		});

		describe("hit()", () => {
			test("should reduce HP when hit", () => {
				ship.hit();
				expect(ship.getHP()).toBe(1);
			});
		});

		describe("isSunk()", () => {
			test("should return false when ship has HP", () => {
				ship.hit();
				expect(ship.isSunk()).toBeFalsy();
			});

			test("should return true when ship has no HP", () => {
				ship.hit();
				ship.hit();
				expect(ship.isSunk()).toBeTruthy();
			});
		});
	});
});

describe("Ship Factory test", () => {
	let ship;
	const coords = ["00", "01"];
	const SHIP_TYPES = Object.freeze({
		aircraftCarrier: {
			type: "Aircraft Carrier",
			length: 5,
		},
		battleship: {
			type: "Battleship",
			length: 4,
		},
		cruiser: {
			type: "Cruiser",
			length: 3,
		},
		submarine: {
			type: "Submarine",
			length: 3,
		},
		destroyer: {
			type: "Destroyer",
			length: 2,
		},
	});

	describe("createShip()", () => {
		const shipKeys = Object.keys(SHIP_TYPES);
		test("should create Aircraft Carrier with correct length and Type", () => {
			ship = createShip(shipKeys[0], coords);

			expect(ship._type).toBe(SHIP_TYPES.aircraftCarrier.type);
			expect(ship._length).toBe(SHIP_TYPES.aircraftCarrier.length);
		});

		test("should create Battleship with correct length and Type", () => {
			ship = createShip(shipKeys[1], coords);

			expect(ship._type).toBe(SHIP_TYPES.battleship.type);
			expect(ship._length).toBe(SHIP_TYPES.battleship.length);
		});

		test("should create Cruiser with correct length and Type", () => {
			ship = createShip(shipKeys[2], coords);

			expect(ship._type).toBe(SHIP_TYPES.cruiser.type);
			expect(ship._length).toBe(SHIP_TYPES.cruiser.length);
		});

		test("should create Submarine with correct length and Type", () => {
			ship = createShip(shipKeys[3], coords);

			expect(ship._type).toBe(SHIP_TYPES.submarine.type);
			expect(ship._length).toBe(SHIP_TYPES.submarine.length);
		});

		test("should create Destroyer with correct length and Type", () => {
			ship = createShip(shipKeys[4], coords);

			expect(ship._type).toBe(SHIP_TYPES.destroyer.type);
			expect(ship._length).toBe(SHIP_TYPES.destroyer.length);
		});

		test("should return undefined on incorrect ship type", () => {
			ship = createShip("Blah blah", coords);

			expect(ship).toBeUndefined();
		});
	});
});
