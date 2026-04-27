import { renderHome } from "../../pages/home";
import { renderPreparationPage } from "../../pages/preparation";
import { convertAssetsToInlineSVG } from "../../utils/asset";

class DomHandler {
	#STATES = Object.freeze({
		HOME: "home",
		PREPARATION: "preparation",
		GAME: "game",
	});
	currentState = this.#STATES.HOME;

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	changeState = function (newState) {
		if (!Object.values(this.#STATES).includes(newState))
			throw new Error("That state doesn't exists");
		this.currentState = newState;

		this.renderPage();
	};

	renderPage = function () {
		switch (this.currentState) {
			case this.#STATES.HOME:
				this.initHome();
				break;
			case this.#STATES.PREPARATION:
				this.initPreparationPage();
				break;
			case this.#STATES.GAME:
				bodyEl.innerHTML = renderHome();
				break;
			default:
				bodyEl.innerHTML = renderHome();
				break;
		}
	};

	initHome = function () {
		this.bodyEl.innerHTML = renderHome();
		this.addEventListenersToHome();

		convertAssetsToInlineSVG();
	};

	addEventListenersToHome = function () {
		const startGameBtnEl = this.bodyEl.querySelector(".start-game-btn");
		startGameBtnEl.addEventListener("click", () => {
			this.changeState("preparation");
		});
	};

	initPreparationPage = function () {
		this.bodyEl.innerHTML = renderPreparationPage();

		convertAssetsToInlineSVG();
	};

	addEventListenersToPreparationPage = function () {};
}

export default DomHandler;
