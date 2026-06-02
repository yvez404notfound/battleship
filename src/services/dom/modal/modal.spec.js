/**
 * @jest-environment jsdom
 */

import ScreenManager from "../screenManager/screenManager.js";
import Modal from "./modal.js";

//#region  Mocks
const winnerModalUI = `
		<dialog class="winner-modal">
			<div class="icon" aria-hidden="true">
				<span class="material-symbols-outlined"> military_tech </span>
			</div>
			<div class="header">
				<h2>Battle Won!</h2>
				<p>You destroyed all enemy ships.</p>
			</div>
			<div class="buttons">
				<button class="error-btn-tonal">
					<span class="material-symbols-outlined"> anchor </span>
					<p>Give Up</p>
				</button>
				<button class="primary-btn-filled">
					<span class="material-symbols-outlined"> directions_boat </span>
					<p>Try Again</p>
				</button>
			</div>
		</dialog>
`;
const defeatModalUI = `
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
				<button class="error-btn-tonal">
					<span class="material-symbols-outlined"> anchor </span>
					<p>Give Up</p>
				</button>
				<button class="primary-btn-filled">
					<span class="material-symbols-outlined"> directions_boat </span>
					<p>Try Again</p>
				</button>
			</div>
		</dialog>
`;
//#endregion

//#region Unit Test
describe("Modal class unit test", () => {
	let modal;

	beforeEach(() => {
		modal = new Modal();
		jest.spyOn(ScreenManager, "changeState");
	});

	describe("renderWinnerModal()", () => {
		beforeEach(() => {
			document.body.innerHTML = winnerModalUI;
			modal.renderWinnerModal();
		});

		test("should render winner modal UI", () => {
			expect(document.body.innerHTML).toContain("winner-modal");
		});

		describe("DOM events", () => {
			describe("Give Up button", () => {
				test("should navigate to homepage", () => {
					const giveUpBtn = document.querySelector("button.give-up");
					giveUpBtn.click();

					expect(ScreenManager.changeState).toHaveBeenCalled();
					expect(document.body.classList.contains("start")).toBeTruthy();
				});
			});

			describe("Try Again button", () => {
				test("should navigate to preparation page", () => {
					const tryAgain = document.querySelector("button.try-again");
					tryAgain.click();

					expect(ScreenManager.changeState).toHaveBeenCalled();
					expect(document.body.classList.contains("preparation")).toBeTruthy();
				});
			});
		});
	});

	describe("renderDefeatModal()", () => {
		beforeEach(() => {
			document.body.innerHTML = defeatModalUI;
			modal.renderDefeatModal();
		});

		test("should render defeat modal UI", () => {
			expect(document.body.innerHTML).toContain("defeat-modal");
		});

		describe("DOM events", () => {
			describe("Give Up button", () => {
				test("should navigate to homepage", () => {
					const giveUpBtn = document.querySelector("button.give-up");
					giveUpBtn.click();

					expect(ScreenManager.changeState).toHaveBeenCalled();
					expect(document.body.classList.contains("start")).toBeTruthy();
				});
			});

			describe("Try Again button", () => {
				test("should navigate to preparation page", () => {
					const tryAgain = document.querySelector("button.try-again");
					tryAgain.click();

					expect(ScreenManager.changeState).toHaveBeenCalled();
					expect(document.body.classList.contains("preparation")).toBeTruthy();
				});
			});
		});
	});
});
//#endregion
