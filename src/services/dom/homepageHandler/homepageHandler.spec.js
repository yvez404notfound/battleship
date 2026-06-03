/**
 * @jest-environment jsdom
 */

import ScreenManager from "../screenManager/screenManager";
import HomepageHandler from "./homepageHandler";

jest.mock("../../../utils/asset.js");
jest.mock("../../../pages/home", () => ({
	__esModule: true,
	default: () => `
  <main>
    <button class="start-game-btn">Start Game</button>
  </main>
  `,
}));

describe("Homepage Handler unit test", () => {
	let homepageHandler;

	beforeEach(() => {
		document.body.innerHTML = "";

		homepageHandler = new HomepageHandler();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("renderPage()", () => {
		test("should render the homepage ui ", () => {
			homepageHandler.renderPage();

			const startGameBtn = document.querySelector(".start-game-btn");
			expect(startGameBtn).not.toBeNull();
		});
		test("should add the homepage state to body class", () => {
			homepageHandler.renderPage();

			const bodyClasslist = document.body.classList;

			expect(bodyClasslist.contains("start")).toBeTruthy();
			expect(bodyClasslist.contains("preparation", "game")).toBeFalsy();
		});
	});

	describe("startGameEvent()", () => {
		test("should change screen state when start game btn is clicked", () => {
			const changeStateSpy = jest.spyOn(ScreenManager, "changeState");

			homepageHandler.renderPage();
			homepageHandler.bindEvents();

			const startBtn = document.querySelector(".start-game-btn");

			startBtn.click();

			expect(changeStateSpy).toHaveBeenCalledWith("PREPARATION");
		});
	});
});
