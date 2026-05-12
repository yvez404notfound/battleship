import battleShipImg from "../../assets/imgs/battleship-hero-img.png";
import wavesImg from "../../assets/imgs/waves.svg";

const renderHome = function () {
	const bodyEl = document.querySelector("body");
	bodyEl.classList.add("start");

	return `
  		<main>
			<header class="hero">
				<div class="hero-image">
					<img
						src=${battleShipImg}
						alt="Illustration of a battle ship facing front" />
					<img
						src=${wavesImg}
						alt="Illustration of ocean waves" />
				</div>
				<div class="header">
					<h1>Battleship</h1>
					<p>by Yves</p>
				</div>
			</header>
			<button class="start-game-btn primary-btn-filled">
				<span class="material-symbols-outlined"> joystick </span>
				<span>Start Game</span>
			</button>
		</main>
  `;
};

export { renderHome };
