const mockUserData = {
	name: "Yves",
	shipsData: {
		aircraftCarrier: {
			coords: ["21", "22", "23", "24", "25"],
			axis: "x",
		},
		battleship: {
			coords: ["49", "59", "69", "79"],
			axis: "y",
		},
		cruiser: {
			coords: ["62", "63", "64"],
			axis: "x",
		},
		submarine: {
			coords: ["56", "57", "58"],
			axis: "x",
		},
		destroyer: {
			coords: ["18", "28"],
			axis: "y",
		},
	},
};

const mockRobotData = {
	name: "Robot",
	shipsData: {
		aircraftCarrier: {
			coords: ["29", "39", "49", "59", "69"],
			axis: "y",
		},
		battleship: {
			coords: ["25", "35", "45", "55"],
			axis: "y",
		},
		cruiser: {
			coords: ["78", "88", "98"],
			axis: "y",
		},
		submarine: {
			coords: ["41", "51", "61"],
			axis: "y",
		},
		destroyer: {
			coords: ["03", "13"],
			axis: "y",
		},
	},
};

export { mockRobotData, mockUserData };
