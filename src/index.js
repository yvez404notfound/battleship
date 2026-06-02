import "../src/services/gameboard/gameboard.js";
import "./assets/styles/buttons.css";
import "./assets/styles/components/footer.css";
import "./assets/styles/components/game.css";
import "./assets/styles/components/header.css";
import "./assets/styles/components/modal.css";
import "./assets/styles/light.css";
import "./assets/styles/modern-normalize.css";
import "./assets/styles/resets.css";
import "./index.css";
import "./pages/game/game.css";
import "./pages/home/home.css";
import "./pages/preparation/preparation.css";
import { convertAssetsToInlineSVG } from "./utils/asset.js";

import ScreenManager from "./services/dom/screenManager/screenManager.js";

ScreenManager.renderCurrentPage();

// const modal = document.querySelector(".defeat-modal");
// modal.showModal();
// convertAssetsToInlineSVG();
