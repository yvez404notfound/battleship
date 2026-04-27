import aircraftCarrierIcon from "../../assets/imgs/ships/aircraft-carrier.svg";
import battleshipIcon from "../../assets/imgs/ships/battleship.svg";
import cruiserShip from "../../assets/imgs/ships/cruiser.svg";
import destroyerIcon from "../../assets/imgs/ships/destroyer.svg";
import submarineIcon from "../../assets/imgs/ships/submarine.svg";
import strategyIcon from "../../assets/imgs/strategy-icon.svg";

const renderPreparationPage = function () {
	const bodyEl = document.querySelector("body");
	bodyEl.classList.add("preparation");
	bodyEl.classList.remove("start");

	return `
  		<header class="hero">
        <div class="header">
          <h1>Battleship</h1>
          <p>by Yves</p>
        </div>
      </header>
      <main>
        <div class="gamestate-header">
          <img
            class="svg"
            src="${strategyIcon}"
            alt="A circle with a flag in the middle" />
          <h2>Preparation</h2>
        </div>
        <form class="preparation-editor">
          <div class="name-field">
            <label for="name">What's your name, Admiral?</label>
            <input
              type="text"
              name="name"
              placeholder="Garp"
              id="name" 
              required/>
          </div>

          <div class="ship-placement-editor">
            <p>Place your ships</p>

            <div class="ship-indicators">
              <div class="ships">
                <div class="ship">
                  <img
                    class="svg"
                    src="${aircraftCarrierIcon}"
                    alt="Icon of an aircraft carrier" />
                  <p>Aircraft<br />carrier</p>
                </div>
                <div class="ship">
                  <img
                    class="svg"
                    src="${battleshipIcon}"
                    alt="Icon of a Battleship" />
                  <p>Battleship</p>
                </div>
                <div class="ship">
                  <img
                    class="svg"
                    src="${cruiserShip}"
                    alt="Icon of a cruiser ship" />
                  <p>Cruiser</p>
                </div>
                <div class="ship">
                  <img
                    class="svg"
                    src="${submarineIcon}"
                    alt="Icon of a submarine" />
                  <p>Submarine</p>
                </div>
                <div class="ship">
                  <img
                    class="svg"
                    src="${destroyerIcon}"
                    alt="Icon of a destroyer ship" />
                  <p>Destroyer</p>
                </div>
              </div>

              <div class="helper-btns">
                <button class="secondary-btn-filled">
                  <span class="material-symbols-outlined">
                    rotate_90_degrees_cw
                  </span>
                  <span>Rotate</span>
                </button>
                <button class="error-btn-tonal">
                  <span class="material-symbols-outlined"> undo </span
                  ><span>Undo</span>
                </button>
              </div>
            </div>

            <div class="gameboard">
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>

              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
            </div>
          </div>

          <button class="confirm-preparation primary-btn-filled" type="submit">Confirm</button>
        </form>
      </main>
      <footer></footer>
  `;
};

export { renderPreparationPage };
