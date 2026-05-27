import { convertAssetsToInlineSVG } from "../../../utils/asset.js";
import GameHandler from "../gameHandler/gameHandler";
import HomepageHandler from "../homepageHandler/homepageHandler";
import PreparationHandler from "../preparationHandler/preparationHandler";

class ScreenManager {
	static #STATES = {
		HOME: new HomepageHandler(),
		PREPARATION: new PreparationHandler(),
		GAME: new GameHandler(),
	};

	static currentState = ScreenManager.#STATES.HOME;

	static #userData;
	static #robotData;

	static renderCurrentPage() {
		ScreenManager.currentState.renderPage();
		convertAssetsToInlineSVG();
		ScreenManager.currentState.bindEvents();
	}

	static changeState(newState) {
		const stateKeys = Object.keys(ScreenManager.#STATES);

		if (!stateKeys.includes(newState))
			throw new Error("That state doesn't exists");

		ScreenManager.currentState = ScreenManager.#STATES[newState];

		ScreenManager.renderCurrentPage();
	}

	static setUserData(data) {
		ScreenManager.#userData = data;
	}

	static setRobotData(data) {
		ScreenManager.#robotData = data;
	}

	static getUserData(data) {
		return ScreenManager.#userData;
	}

	static getRobotData(data) {
		return ScreenManager.#robotData;
	}
}

export default ScreenManager;
