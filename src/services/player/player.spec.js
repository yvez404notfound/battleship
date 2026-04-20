import Player from "./player";
import { createHumanPlayer, createRobotPlayer } from "./playerFactory";

describe("Player class unit tests", () => {
	test("should create 2 types", () => {
		const humanPlayer = createHumanPlayer("Yves");
		const robotPlayer = createRobotPlayer();

		expect(humanPlayer).toBeInstanceOf(Player);
		expect(humanPlayer.type).toBe("human");

		expect(robotPlayer).toBeInstanceOf(Player);
		expect(robotPlayer.type).toBe("robot");
	});
});
