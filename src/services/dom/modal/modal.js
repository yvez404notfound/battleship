import ScreenManager from "../screenManager/screenManager";

class Modal {
	#bodyEl;

	constructor() {
		this.#bodyEl = document.querySelector("body");
	}

	#closeModalEvent(buttonEl, modalEl) {
		buttonEl.addEventListener("click", () => {
			modalEl.close();
		});
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
		const closeBtn = document.querySelector("button.close-modal");

		if (closeBtn) {
			const modal = this.#bodyEl.querySelector(".forfeit-modal");
			this.#closeModalEvent(closeBtn, modal);
		}

		this.#giveUpEvent(giveUpBtn);
		this.#tryAgainEvent(tryAgainBtn);
	}

	#renderWinnerUI() {
		return `
		<dialog class="winner-modal">
			<form method="dialog">
				<div class="icon" aria-hidden="true">
					<span class="material-symbols-outlined"> military_tech </span>
				</div>
				<div class="header">
					<h2>Battle Won!</h2>
					<p>You destroyed all enemy ships.</p>
				</div>
				<div class="buttons">
					<button type="button" class="give-up error-btn-tonal">
						<span class="material-symbols-outlined"> anchor </span>
						<p>Give Up</p>
					</button>
					<button type="button" class="try-again primary-btn-filled">
						<span class="material-symbols-outlined"> directions_boat </span>
						<p>Try Again</p>
					</button>
				</div>
			</form>
		</dialog>
		`;
	}

	renderWinnerModal() {
		this.#bodyEl.insertAdjacentHTML("beforeend", this.#renderWinnerUI());

		const modal = this.#bodyEl.querySelector(".winner-modal");
		modal.showModal();

		this.#bindEvents();
	}

	#renderDefeatUI() {
		return `
		<dialog class="defeat-modal">
			<form method="dialog">
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
					<button type="button" class="give-up error-btn-tonal">
						<span class="material-symbols-outlined"> anchor </span>
						<p>Give Up</p>
					</button>
					<button type="button" class="try-again primary-btn-filled">
						<span class="material-symbols-outlined"> directions_boat </span>
						<p>Try Again</p>
					</button>
				</div>
			</form>
		</dialog>
		`;
	}

	renderDefeatModal() {
		this.#bodyEl.insertAdjacentHTML("beforeend", this.#renderDefeatUI());

		const modal = this.#bodyEl.querySelector(".defeat-modal");
		modal.showModal();

		this.#bindEvents();
	}

	#renderForfeitUI() {
		return `
		<dialog class="forfeit-modal">
			<form method="dialog">
				<button type="button" class="close-modal secondary-btn-filled">
					<span class="material-symbols-outlined"> close </span>
				</button>

				<div class="icon" aria-hidden="true">
					<span class="material-symbols-outlined filled"> flag </span>
				</div>
				<div class="header">
					<h2>Forfeit Battle?</h2>
					<p>We can always go back, Captain.</p>
				</div>
				<div class="buttons">
					<button type="button" class="give-up error-btn-tonal">
						<span class="material-symbols-outlined"> anchor </span>
						<p>Give Up</p>
					</button>
					<button type="button" class="try-again primary-btn-filled">
						<span class="material-symbols-outlined"> directions_boat </span>
						<p>Try Again</p>
					</button>
				</div>
			</form>
		</dialog>
		`;
	}

	renderForfeitModal() {
		this.#bodyEl.insertAdjacentHTML("beforeend", this.#renderForfeitUI());

		const modal = this.#bodyEl.querySelector(".forfeit-modal");
		modal.showModal();

		this.#bindEvents();
	}
}

export default Modal;
