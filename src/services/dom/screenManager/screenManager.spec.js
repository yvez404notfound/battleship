/**
 * @jest-environment jsdom
 */

import ScreenManager from "./screenManager.js";

import { convertAssetsToInlineSVG } from "../../../utils/asset.js";
import HomepageHandler from "../homepageHandler/homepageHandler.js";
import PreparationHandler from "../preparationHandler/preparationHandler.js";

jest.mock("../../../utils/asset.js");
jest.mock("../homepageHandler/homepageHandler.js", () => {
	return jest.fn().mockImplementation(() => ({
		renderPage: jest.fn(),
		bindEvents: jest.fn(),
	}));
});

describe("Screen Manager unit test", () => {
	beforeEach(() => {});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("renderCurrentPage()", () => {
		beforeEach(() => {
			ScreenManager.renderCurrentPage();
		});

		test("should render the page of current state", () => {
			expect(ScreenManager.currentState.renderPage).toHaveBeenCalled();
		});

		test("should convert assets in dom to inline svg", () => {
			expect(convertAssetsToInlineSVG).toHaveBeenCalled();
		});

		test("should bind events after current state page is rendered", () => {
			expect(ScreenManager.currentState.bindEvents).toHaveBeenCalled();
		});
	});

	describe("changeState()", () => {
		test("should throw an error if state is invalid", () => {
			expect(() => ScreenManager.changeState("omsim barabida")).toThrow(
				"That state doesn't exists",
			);
		});

		test("should change the current state if state is valid", () => {
			ScreenManager.changeState("PREPARATION");
			expect(ScreenManager.currentState).toBeInstanceOf(PreparationHandler);
		});

		test("should render current state page if state is valid", () => {
			jest.spyOn(ScreenManager, "renderCurrentPage");

			ScreenManager.changeState("PREPARATION");
			expect(ScreenManager.renderCurrentPage).toHaveBeenCalled();
		});
	});

	describe("Shared data", () => {
		const mockPlayerData = {
			name: "omsim",
		};

		test("should be able to set and get userData", () => {
			ScreenManager.setUserData(mockPlayerData);
			const playerData = ScreenManager.getUserData();
			expect(playerData.name).toBe("omsim");
		});

		test("should be able to set and get robotData", () => {
			ScreenManager.setRobotData(mockPlayerData);
			const playerData = ScreenManager.getRobotData();
			expect(playerData.name).toBe("omsim");
		});
	});
});
