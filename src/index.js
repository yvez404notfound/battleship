import "../src/services/gameboard/gameboard.js";
import "./assets/styles/buttons.css";
import "./assets/styles/light.css";
import "./assets/styles/modern-normalize.css";
import "./assets/styles/resets.css";
import "./index.css";
import "./pages/home/home.css";
import "./pages/preparation/preparation.css";

import ScreenManager from "./services/dom/screenManager/screenManager.js";

/*
const domHandler = new DomHandler();
console.log(domHandler.currentState);
domHandler.changeState("preparation");


domHandler.changeState("preparation");
console.log(domHandler.currentState);
*/

// const screenManager = new ScreenManager();
ScreenManager.renderCurrentPage();
