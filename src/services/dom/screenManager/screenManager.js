import { convertAssetsToInlineSVG } from "../../../utils/asset.js";
import GameHandler from "../gameHandler/gameHandler";
import HomepageHandler from "../homepageHandler/homepageHandler";
import PreparationHandler from "../preparationHandler/preparationHandler";

class ScreenManager {
	static #STATES = {
		HOME: null,
		PREPARATION: null,
		GAME: null,
	};

	static currentState;

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

		switch (newState) {
			case "HOME":
				this.#STATES.HOME = new HomepageHandler();
				break;
			case "PREPARATION":
				this.#STATES.PREPARATION = new PreparationHandler();
				break;
			case "GAME":
				this.#STATES.GAME = new GameHandler();
				break;
		}

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
