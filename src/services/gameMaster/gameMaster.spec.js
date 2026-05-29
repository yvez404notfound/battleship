import { mockRobotData, mockUserData } from "../../data/player";
import * as randomUtils from "../../utils/random.js";
import GameMaster from "./gameMaster";

describe("Gamemaster class unit tests", () => {
	let gameMaster;
	const mockUserData = {
		name: "Yves",
		shipsData: {
			destroyer: {
				coords: ["00", "01"],
				axis: "x",
			},
		},
	};
	let turnVal;

	beforeEach(() => {
		gameMaster = new GameMaster();

		jest.spyOn(randomUtils, "generateRandVal").mockReturnValue(0);

		turnVal = gameMaster.initGame(mockUserData, mockUserData);
	});

	describe("initGame()", () => {
		test("should create human and robot player", () => {
			const players = gameMaster.getPlayers();
			const [p1, p2] = players;
			expect(players).toHaveLength(2);
			expect(p1.getType()).toBe("human");
			expect(p2.getType()).toBe("robot");
		});

		test("should pick 1 player for 1st turn randomly", () => {
			jest.spyOn(randomUtils, "generateRandVal").mockReturnValue(0);
			const turnVal = gameMaster.decideWhosTurn();
			expect(turnVal).toBe(0);
		});
	});

	describe("takeTurn()", () => {
		describe("Position already attacked", () => {
			test("should return success false if position is already attacked", () => {
				const currentPlayer = gameMaster.getCurrentPlayer();

				jest.spyOn(currentPlayer, "isPositionAttacked").mockReturnValue(true);

				const result = gameMaster.takeTurn("00");

				expect(result.success).toBeFalsy();
			});

			test("should return true if position is new", () => {
				const currentPlayer = gameMaster.getCurrentPlayer();

				jest.spyOn(currentPlayer, "isPositionAttacked").mockReturnValue(false);

				const result = gameMaster.takeTurn("00");

				expect(result.success).toBeTruthy();
			});
		});

		describe("Player attacks", () => {
			describe("Attack missed", () => {
				test("should return result.missed false if attack hit occupied cell", () => {
					const result = gameMaster.takeTurn("00");
					expect(result.missed).toBeFalsy();
				});
				test("should return result.missed true if attack hit unoccupied cell", () => {
					const result = gameMaster.takeTurn("99");
					expect(result.missed).toBeTruthy();
				});
			});

			describe("Attack hit", () => {
				describe("Winner is not found", () => {
					test("should switch the turn", () => {
						const result = gameMaster.takeTurn("00");

						const currentPlayer = gameMaster.getCurrentPlayer();
						expect(currentPlayer.getType()).toBe("robot");
					});

					test("should return null to result winner property", () => {
						const result = gameMaster.takeTurn("00");
						expect(result.winner).toBeNull();
					});
				});

				describe("Winner is found", () => {
					test("should not switch the turn", () => {
						const enemyPlayer = gameMaster.getEnemyPlayer();
						jest.spyOn(enemyPlayer, "isDead").mockReturnValue(true);

						const result = gameMaster.takeTurn("00");

						const currentPlayer = gameMaster.getCurrentPlayer();

						expect(currentPlayer.getType()).toBe("human");
					});

					test("should return winner found result", () => {
						const currentPlayer = gameMaster.getCurrentPlayer();

						const enemyPlayer = gameMaster.getEnemyPlayer();
						jest.spyOn(enemyPlayer, "isDead").mockReturnValue(true);

						const result = gameMaster.takeTurn("00");

						expect(result.winner).toEqual(currentPlayer);
					});
				});
			});
		});
	});
});
