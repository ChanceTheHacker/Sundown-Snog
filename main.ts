import "./src/engine/engine";
import { mutePage } from "./src/sounds/sounds";

//add event listeners

const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", mutePage);

console.log(muteBtn);
