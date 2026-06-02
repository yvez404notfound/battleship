import ScreenManager from "../screenManager/screenManager";

class Modal {
	#bodyEl;

	constructor() {
		this.#bodyEl = document.querySelector("body");
	}

	#giveUpEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			ScreenManager.changeState("HOME");
		});
	}

	#tryAgainEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			ScreenManager.changeState("PREPARATION");
		});
	}

	#bindEvents() {
		const giveUpBtn = document.querySelector("button.give-up");
		const tryAgainBtn = document.querySelector("button.try-again");

		this.#giveUpEvent(giveUpBtn);
		this.#tryAgainEvent(tryAgainBtn);
	}

	#renderWinnerUI() {
		return `
		<dialog class="winner-modal">
			<div class="icon" aria-hidden="true">
				<span class="material-symbols-outlined"> military_tech </span>
			</div>
			<div class="header">
				<h2>Battle Won!</h2>
				<p>You destroyed all enemy ships.</p>
			</div>
			<div class="buttons">
				<button class="give-up error-btn-tonal">
					<span class="material-symbols-outlined"> anchor </span>
					<p>Give Up</p>
				</button>
				<button class="try-again primary-btn-filled">
					<span class="material-symbols-outlined"> directions_boat </span>
					<p>Try Again</p>
				</button>
			</div>
		</dialog>
		`;
	}
	renderWinnerModal() {
		this.#bodyEl.innerHTML += this.#renderWinnerUI();

		const modal = this.#bodyEl.querySelector(".winner-modal");
		modal.showModal();

		this.#bindEvents();
	}

	#renderDefeatUI() {
		return `
		<dialog class="defeat-modal">
			<div class="icon" aria-hidden="true">
				<img
					class="svg"
					src="./assets/imgs/game-over.svg"
					alt="Skull and Bones icon" />
			</div>
			<div class="header">
				<h2>Battle Lost.</h2>
				<p>The enemy have destroyed all your ships.</p>
			</div>
			<div class="buttons">
				<button class="give-up error-btn-tonal">
					<span class="material-symbols-outlined"> anchor </span>
					<p>Give Up</p>
				</button>
				<button class="try-again primary-btn-filled">
					<span class="material-symbols-outlined"> directions_boat </span>
					<p>Try Again</p>
				</button>
			</div>
		</dialog>
		`;
	}
	renderDefeatModal() {
		this.#bodyEl.innerHTML += this.#renderDefeatUI();

		const modal = this.#bodyEl.querySelector(".defeat-modal");
		modal.showModal();

		this.#bindEvents();
	}
}

export default Modal;
