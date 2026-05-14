import { convertAssetsToInlineSVG } from "../../../utils/asset";
import HomepageHandler from "../homepageHandler/homepageHandler";
import PreparationHandler from "../preparationHandler/preparationHandler";

class ScreenManager {
	static STATES = {
		HOME: new HomepageHandler(),
		PREPARATION: new PreparationHandler(),
		GAME: "game",
	};

	static currentState = ScreenManager.STATES.HOME;

	constructor() {}

	static renderCurrentPage() {
		ScreenManager.currentState.renderPage();
		convertAssetsToInlineSVG();
		ScreenManager.currentState.bindEvents();
		// console.log(STATES);
	}

	static changeState(newState) {
		console.log(ScreenManager.STATES);

		if (!Object.keys(ScreenManager.STATES).includes(newState))
			throw new Error("That state doesn't exists");
		ScreenManager.currentState = ScreenManager.STATES[newState];

		console.log(ScreenManager.currentState);

		ScreenManager.renderCurrentPage();
	}
}

export default ScreenManager;
