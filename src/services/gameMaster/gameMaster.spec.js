import GameMaster from "./gameMaster";

describe("Gamemaster class unit tests", () => {
	const gameMaster = new GameMaster();
	gameMaster.initPlayers();

	test("should decide who will be the first turn", () => {
		const playerIndex = gameMaster.decideWhosTurn();

		const player = gameMaster.getPlayer(playerIndex);

		expect(player.isMyTurn).toBeTruthy();
	});
});
