import { convertAssetsToInlineSVG } from "../../../utils/asset";
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

	constructor() {}

	static renderCurrentPage() {
		ScreenManager.currentState.renderPage();
		convertAssetsToInlineSVG();
		ScreenManager.currentState.bindEvents();
	}

	static changeState(newState) {
		console.log(ScreenManager.#STATES);

		if (!Object.keys(ScreenManager.#STATES).includes(newState))
			throw new Error("That state doesn't exists");
		ScreenManager.currentState = ScreenManager.#STATES[newState];

		console.log(ScreenManager.currentState);

		ScreenManager.renderCurrentPage();
	}

	static setUserData(data) {
		ScreenManager.#userData = data;
	}

	static getUserData(data) {
		return ScreenManager.#userData;
	}

	static setRobotData(data) {
		ScreenManager.#robotData = data;
	}

	static getRobotData(data) {
		return ScreenManager.#robotData;
	}
}

export default ScreenManager;
