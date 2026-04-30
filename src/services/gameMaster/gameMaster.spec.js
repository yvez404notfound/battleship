import GameMaster from "./gameMaster";

describe("Gamemaster class unit tests", () => {
	const mockPlayerShipData = {
		aircraftCarrier: ["00", "01", "02", "03", "04"],
		battleship: ["10", "11", "12", "13"],
		cruiser: ["20", "21", "22"],
		submarine: ["30", "31", "32"],
		destroyer: ["40", "41"],
	};
	const playerName = "Yves";

	const gamemasterTest = new GameMaster();
	gamemasterTest.initGame(playerName, mockPlayerShipData, mockPlayerShipData);

	test("should be able to startTurn when user inputs on UI", () => {
		// mock external inputs
		gamemasterTest.turnValue = 0;
		gamemasterTest.currentTurnPlayer = gamemasterTest.getPlayer(
			gamemasterTest.turnValue,
		);
		const enemyGameboard = gamemasterTest.getPlayer(1).gameboard;

		gamemasterTest.startTurn("00", enemyGameboard);

		const enemyGameboardCell = enemyGameboard.board[0][0];

		expect(enemyGameboardCell.isHit).toBeTruthy();
		expect(enemyGameboardCell.occupiedByShip.length).toBe(4);
	});
});
