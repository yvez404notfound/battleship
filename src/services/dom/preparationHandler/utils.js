import { generateRandVal } from "../../../utils/random";

const calculateAxis = (axis, position, vertex) => {
	let pos;

	if (axis === "x") {
		pos = `${+position + vertex}`;
	} else {
		pos = `${+position[0] + vertex}${position[1]}`;
	}

	return pos.padStart(2, "0");
};

const isPositionOutOfBounds = (targetPos, midPos, axis) => {
	const MIN = 0;
	const MAX = 99;

	const row = Number(midPos[0] + "0");
	const col = Number(row + 10) - 1;

	if ((targetPos < row || targetPos > col) && axis === "x") return true;
	if (Number(targetPos) < MIN || Number(targetPos) > MAX) return true;

	return false;
};

const generateRobotPlayerShipData = (
	shipPlacementStates,
	shipPositionVertices,
) => {
	const SHIPS = Object.values(shipPlacementStates);
	const SHIP_VERTICES = Object.values(shipPositionVertices);
	const AXES = ["x", "y"];
	const MAX = 99;

	let occupiedPositions = new Set();
	let data = {};

	let isOutOfBounds = false;
	SHIPS.forEach((ship, i) => {
		while (true) {
			const axis = AXES[generateRandVal(AXES.length - 1)];
			const vertices = SHIP_VERTICES[i];
			let coords = [];

			let midPos = String(generateRandVal(MAX)).padStart(2, "0");

			for (const vertex of vertices) {
				const pos = calculateAxis(axis, midPos, vertex);
				isOutOfBounds =
					isPositionOutOfBounds(pos, midPos, axis) ||
					occupiedPositions.has(pos);

				if (isOutOfBounds) break;

				coords.push(pos);
			}

			if (!isOutOfBounds) {
				coords.forEach((pos) => occupiedPositions.add(pos));

				data[ship] ||= {};

				data[ship].coords = coords;
				data[ship].axis = axis;
				break;
			}
		}
	});

	return data;
};

export { calculateAxis, generateRobotPlayerShipData, isPositionOutOfBounds };
