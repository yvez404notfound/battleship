import homepageUI from "../../../pages/home";
import ScreenManager from "../screenManager/screenManager";

class HomepageHandler {
	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	renderPage() {
		this.bodyEl.innerHTML = homepageUI();
		this.bodyEl.classList.add("start");
	}

	bindEvents() {
		this.startGameEvent();
	}

	startGameEvent() {
		const startGameBtnEl = this.bodyEl.querySelector(".start-game-btn");

		startGameBtnEl.addEventListener("click", () => {
			console.log("preparation");
			ScreenManager.changeState("PREPARATION");
		});
	}
}

export default HomepageHandler;
